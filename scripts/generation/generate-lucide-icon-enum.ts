// RUTA: scripts/generation/generate-lucide-icon-enum.ts
/**
 * @file generate-lucide-icon-enum.ts
 * @description Script de automatización de élite para la DX.
 *              v7.0.0 (Dynamic Import Refactor): Reemplaza el frágil parseo con regex
 *              por una importación dinámica del módulo, haciéndolo resiliente a los
 *              cambios de formato interno de la biblioteca 'lucide-react'.
 * @version 7.0.0
 * @author RaZ Podestá & L.I.A. Legacy
 */
import * as fs from 'fs';
import { createRequire } from 'module';
import * as path from 'path';
import chalk from 'chalk';
import { pathToFileURL } from 'url';

const customRequire = createRequire(import.meta.url);

const OUTPUT_FILE = path.resolve(
  process.cwd(),
  'src',
  'shared',
  'lib',
  'config',
  'lucide-icon-names.ts'
);

function kebabToPascal(str: string): string {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// --- PILAR DE RESILIENCIA: La función main ahora es asíncrona ---
async function main() {
  console.log(
    chalk.blue.bold(
      '🚀 Iniciando generación del Zod Enum para iconos de Lucide (v7.0)...'
    )
  );

  try {
    const lucideManifestPath = customRequire.resolve(
      'lucide-react/dynamicIconImports'
    );
    console.log(
      chalk.gray(
        `   Manifiesto de iconos encontrado en: ${path.relative(
          process.cwd(),
          lucideManifestPath
        )}`
      )
    );

    // --- LA CORRECCIÓN CLAVE: De Regex a Importación Dinámica ---
    // En lugar de leer el archivo, lo importamos como un módulo de JS.
    // Esto es robusto y no depende del formato del texto (comillas, espacios, etc.).
    // pathToFileURL es necesario para asegurar la compatibilidad en Windows.
    const manifestModule = await import(pathToFileURL(lucideManifestPath).href);
    const iconKeys = Object.keys(manifestModule.default || manifestModule);

    if (iconKeys.length === 0) {
      throw new Error(
        'El manifiesto de iconos se importó pero no contiene claves. La estructura del módulo de lucide-react puede haber cambiado drásticamente.'
      );
    }

    const pascalCaseIconNames = iconKeys.map(kebabToPascal);

    const fileContent = `// RUTA: src/shared/lib/config/lucide-icon-names.ts
/**
 * @file lucide-icon-names.ts
 * @description Manifiesto de Nombres de Iconos de Lucide y SSoT.
 *              ESTE ARCHIVO ES GENERADO AUTOMÁTICAMENTE. NO LO EDITE MANUALMENTE.
 *              Ejecute 'pnpm gen:icons' para actualizarlo.
 * @author Script de Generación Automática
 * @version ${new Date().toISOString()}
 */
import { z } from 'zod';

// Este array contiene todos los nombres de iconos de Lucide en formato PascalCase.
export const lucideIconNames = ${JSON.stringify(
      pascalCaseIconNames,
      null,
      2
    )} as const;

// Este es el esquema de Zod que valida que un string es un nombre de icono de Lucide válido.
export const LucideIconNameSchema = z.enum(lucideIconNames);

// Este es el tipo de TypeScript inferido que representa un nombre de icono de Lucide válido.
export type LucideIconName = z.infer<typeof LucideIconNameSchema>;
`;

    console.log(
      chalk.cyan(
        `   Escribiendo manifiesto en la ruta SSoT: ${chalk.yellow(
          path.relative(process.cwd(), OUTPUT_FILE)
        )}`
      )
    );

    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, fileContent, 'utf-8');

    console.log(
      chalk.green(
        `✅ Zod Enum y Tipo generados con éxito con ${pascalCaseIconNames.length} iconos registrados.`
      )
    );
  } catch (error) {
    console.error(
      chalk.red.bold('🔥 Error crítico durante la generación del enum:'),
      error
    );
    process.exit(1);
  }
}

main();
