// RUTA: src/shared/lib/i18n/i18n.config.ts
/**
 * @file i18n.config.ts
 * @description Motor de Configuración Soberano para i18n.
 * @version 1.0.0
 * @author L.I.A. Legacy (adaptado de 'meame')
 */
import { z } from "zod";
import { IMPLEMENTED_LOCALES } from "./implemented-locales.manifest";

export const ROUTING_LOCALES = IMPLEMENTED_LOCALES;
export type Locale = (typeof ROUTING_LOCALES)[number];

const LocaleEnum = z.enum(ROUTING_LOCALES);

function getValidatedDefaultLocale(): Locale {
  const envLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE;

  if (envLocale) {
    const validation = LocaleEnum.safeParse(envLocale);
    if (validation.success) {
      console.log(`[i18n.config] Locale por defecto validado desde ENV: ${validation.data}`);
      return validation.data;
    } else {
      console.warn(`[i18n.config] ADVERTENCIA: El locale en ENV ('${envLocale}') no es un locale implementado. Usando fallback.`);
    }
  }
  return "es-ES";
}

export const defaultLocale: Locale = getValidatedDefaultLocale();
