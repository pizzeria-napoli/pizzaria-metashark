// RUTA: src/i18n.config.ts (NIVELADO)
/**
 * @file i18n.config.ts
 * @description Única Fuente de Verdad (SSoT) para la configuración de internacionalización.
 *              v3.0.0 (Sovereign Unification): Consolida todas las definiciones de locales,
 *              tipos y validadores en un único aparato soberano.
 * @version 3.0.0
 * @author L.I.A. Legacy
 */

// La SSoT para los locales soportados reside aquí.
export const locales = ['en-US', 'es-ES', 'pt-BR', 'it-IT'] as const;

// El tipo `Locale` se infiere directamente de la SSoT.
export type Locale = (typeof locales)[number];

// El locale por defecto también debe cumplir el contrato.
export const defaultLocale: Locale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE && locales.includes(process.env.NEXT_PUBLIC_DEFAULT_LOCALE as Locale)
  ? process.env.NEXT_PUBLIC_DEFAULT_LOCALE as Locale
  : 'es-ES';

/**
 * Type guard soberano que verifica si un valor es un `Locale` válido.
 * @param locale El valor a verificar.
 * @returns `true` si el valor es un string y está en la lista de locales.
 */
export function isValidLocale(locale: unknown): locale is Locale {
  return locales.includes(locale as Locale);
}
