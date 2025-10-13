// RUTA: scripts/generation/json-merger.ts (NUEVO ARCHIVO)
/**
 * @file json-merger.ts
 * @description Utilidad pura y atómica para descubrir y fusionar archivos .json.
 * @version 1.0.0
 * @author L.I.A. Legacy
 */
import { promises as fs } from 'fs';
import * as path from 'path';
import chalk from 'chalk';

/**
 * Recorre recursivamente un directorio y fusiona el contenido de todos los archivos .json
 * que encuentra en un único objeto.
 * @param directory La ruta al directorio a escanear.
 * @returns Una promesa que resuelve a un objeto con todo el contenido fusionado.
 */
export async function mergeJsonFiles(directory: string): Promise<Record<string, unknown>> {
  const mergedContent: Record<string, unknown> = {};

  async function walker(currentDir: string) {
    try {
      const entries = await fs.readdir(currentDir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name);
        if (entry.isDirectory()) {
          await walker(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.json')) {
          try {
            const contentString = await fs.readFile(fullPath, 'utf-8');
            Object.assign(mergedContent, JSON.parse(contentString));
          } catch (_error) {
            console.warn(
              chalk.yellow(`   [ADVERTENCIA] No se pudo leer o parsear ${path.relative(process.cwd(), fullPath)}. Se omitirá.`)
            );
          }
        }
      }
    } catch (_err) {
      // Ignorar directorios que no se pueden leer (puede ser intencional)
    }
  }

  await walker(directory);
  return mergedContent;
}
