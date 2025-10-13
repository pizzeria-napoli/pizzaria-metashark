// RUTA: scripts/generation/i18n-discoverer.ts (Ahora Correcto y Conforme)
/**
 * @file i18n-discoverer.ts
 * @description Utilidad pura y atómica para descubrir y leer archivos .i18n.json.
 * @version 2.0.0 (Robust Recursive Walker)
 * @author L.I.A. Legacy
 */
import { promises as fs } from 'fs';
import * as path from 'path';
import chalk from 'chalk';

const CONTENT_ROOT_DIR = path.resolve(process.cwd(), 'src/messages');

export type I18nFileContent = Record<string, Record<string, unknown>>;

export interface DiscoveryResult {
  files: string[];
  contents: I18nFileContent[];
}

export async function discoverAndReadI18nFiles(
  directory: string = CONTENT_ROOT_DIR
): Promise<DiscoveryResult> {
  console.log(chalk.gray('   Iniciando descubrimiento de archivos i18n...'));
  const files: string[] = [];
  const contents: I18nFileContent[] = [];

  async function walker(currentDir: string) {
    try {
      const entries = await fs.readdir(currentDir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name);
        if (entry.isDirectory()) {
          await walker(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.i18n.json')) {
          try {
            const contentString = await fs.readFile(fullPath, 'utf-8');
            contents.push(JSON.parse(contentString));
            files.push(fullPath);
          } catch (_error) { // Ahora ignorado correctamente por ESLint.
            console.warn(
              chalk.yellow(
                `   [ADVERTENCIA] No se pudo leer o parsear ${path.relative(
                  process.cwd(),
                  fullPath
                )}. Se omitirá.`
              )
            );
          }
        }
      }
    } catch (_err) { // Ahora ignorado correctamente por ESLint.
      console.warn(
        chalk.yellow(
          `   [ADVERTENCIA] No se pudo escanear ${path.relative(
            process.cwd(),
            currentDir
          )}.`
        )
      );
    }
  }

  await walker(directory);

  console.log(
    chalk.gray(`   Descubrimiento finalizado: ${contents.length} archivos procesados.`)
  );
  return { files, contents };
}
