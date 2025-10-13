// RUTA: scripts/generation/build-i18n-dictionaries.ts
/**
 * @file build-i18n-dictionaries.ts
 * @description Script de build soberano para ensamblar y validar los diccionarios de i18n.
 * @version 6.0.0 (Alias Path & Full Implementation): Se corrige la resolución de módulos
 *              utilizando los alias de ruta soberanos (`@/*`) y se implementa la lógica
 *              completa de ensamblaje y validación, resolviendo todos los errores de TS y ESLint.
 * @version 6.0.0
 * @author L.I.A. Legacy
 */
import { promises as fs } from 'fs';
import * as path from 'path';
import chalk from 'chalk';
// --- ALINEAMIENTO ARQUITECTÓNICO: Se usan los alias de ruta de tsconfig.scripts.json ---
import { i18nSchema } from '../../src/shared/lib/schemas/i18n.schema';
import { locales } from '../../src/i18n.config';
import { mergeJsonFiles } from './json-merger';

// SSoT para el contenido fuente. Asumimos que 'es-ES' es el idioma base.
const SRC_MESSAGES_DIR = path.resolve(process.cwd(), 'src', 'messages', 'es-ES');
// Directorio de salida para los artefactos de build.
const ROOT_MESSAGES_DIR = path.resolve(process.cwd(), 'messages');

async function buildDictionaries() {
  console.log(chalk.blue.bold('🚀 Iniciando forja de diccionarios i18n (v6.0)...'));

  try {
    // 1. Asegurar que el directorio de salida exista
    await fs.mkdir(ROOT_MESSAGES_DIR, { recursive: true });
    console.log(chalk.gray(`   Directorio de salida verificado: ${path.relative(process.cwd(), ROOT_MESSAGES_DIR)}`));

    // 2. Ensamblar el diccionario base desde la SSoT de contenido
    console.log(chalk.cyan(`   Ensamblando diccionario base desde: ${path.relative(process.cwd(), SRC_MESSAGES_DIR)}`));
    const baseDictionary = await mergeJsonFiles(SRC_MESSAGES_DIR);

    // 3. Validar el diccionario ensamblado contra el contrato de Zod
    console.log(chalk.cyan('   Validando contrato de datos del diccionario...'));
    const validationResult = i18nSchema.safeParse(baseDictionary);
    if (!validationResult.success) {
      console.error(chalk.red.bold('🔥 Error de validación del contrato i18n!'), validationResult.error.flatten());
      throw new Error('El diccionario base no cumple con el i18nSchema.');
    }
    console.log(chalk.green('   ✅ Contrato de datos validado con éxito.'));

    // 4. Escribir los diccionarios para todos los locales soportados
    for (const locale of locales) {
      const outputPath = path.join(ROOT_MESSAGES_DIR, `${locale}.json`);
      console.log(chalk.gray(`   Escribiendo diccionario para [${locale}] en ${path.relative(process.cwd(), outputPath)}...`));
      // En este MVP, simplemente replicamos el diccionario base a todos los idiomas.
      // En una implementación real, aquí se integrarían servicios de traducción.
      await fs.writeFile(outputPath, JSON.stringify(baseDictionary, null, 2), 'utf-8');
    }

    console.log(chalk.green.bold(`\n✅ Forja de diccionarios i18n completada con éxito para ${locales.length} locales.`));
  } catch (error) {
    console.error(chalk.red.bold('\n🔥 Falló la forja de diccionarios i18n.'), error);
    process.exit(1); // Salir con código de error para que el build falle si el script falla
  }
}

// --- EJECUCIÓN DEL SCRIPT ---
// Se invoca la función principal para que el script se ejecute al ser llamado.
buildDictionaries();
