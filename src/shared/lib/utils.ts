// RUTA: src/shared/lib/utils.ts
/**
 * @file utils.ts
 * @description Aparato de utilidad SSoT para funciones compartidas.
 *              v2.2.0 (Regex Fix): Se corrige la expresión regular de
 *              'pascalToKebabCase' para manejar correctamente la primera
 *              letra mayúscula y evitar guiones iniciales.
 * @version 2.2.0
 * @author L.I.A. Legacy
 */
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Fusiona clases de Tailwind de forma segura, resolviendo conflictos.
 * @param inputs - Clases a fusionar.
 * @returns Un string de clases fusionadas.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convierte un string de PascalCase a kebab-case.
 * Ejemplo: "ShoppingCart" -> "shopping-cart"
 * @param str - El string en PascalCase a convertir.
 * @returns El string convertido a kebab-case.
 */
export function pascalToKebabCase(str: string): string {
  // --- LA CORRECCIÓN CLAVE ---
  // Esta expresión regular robusta maneja correctamente el inicio de la cadena.
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}
