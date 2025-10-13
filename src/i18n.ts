// RUTA: i18n.ts
/**
 * @file i18n.ts
 * @description Orquestador soberano para next-intl, forjado con un contrato
 *              de tipos estricto y seguridad absoluta.
 * @version 8.1.0 (Code Hygiene Alignment): Se elimina la importación no utilizada
 *              del tipo `Locale`, ya que la seguridad es garantizada por el type guard
 *              `isValidLocale`, logrando una higiene de código perfecta.
 * @author L.I.A. Legacy
 */
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
// --- ALINEAMIENTO DE HIGIENE SOBERANO ---
// Se importa únicamente el type guard `isValidLocale`, ya que es el único miembro
// utilizado directamente en este archivo. El tipo `Locale` no es necesario aquí.
import { isValidLocale } from './i18n.config';
import type { AbstractIntlMessages } from 'next-intl';

type Messages = AbstractIntlMessages;

export default getRequestConfig(async ({ locale }) => {
  // El guardián de tipo `isValidLocale` valida y estrecha el tipo de `locale`
  // de 'string' a 'Locale' de forma implícita y segura. Si la validación
  // falla, la ejecución se detiene, garantizando que solo locales válidos procedan.
  if (!isValidLocale(locale)) {
    notFound();
  }

  return {
    locale,
    // TypeScript puede inferir con seguridad que `locale` es un `Locale` válido aquí,
    // permitiendo la importación dinámica del diccionario correcto.
    messages: (await import(`./messages/${locale}.json`)).default as Messages,
  };
});
