// RUTA: src/app/[locale]/layout.tsx
/**
 * @file layout.tsx
 * @description Layout localizado que actúa como proveedor de contexto para i18n y React Query.
 * @version 8.3.0 (Next.js 15 Signature Alignment): Se refactoriza la firma del componente
 *              para desestructurar `params` directamente, cumpliendo con las nuevas reglas de
 *              renderizado de Next.js 15 y resolviendo el error crítico de runtime.
 * @author L.I.A. Legacy
 */
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { isValidLocale, type Locale } from '../../i18n.config';
import { ReactQueryProvider } from '@/components/containers/ReactQueryProvider';
import { logger } from '@/shared/logging';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: Locale };
}

export default async function LocaleLayout({
  children,
  // --- LA CORRECCIÓN SOBERANA ---
  // Se desestructura el `locale` directamente en la firma del componente.
  params: { locale },
}: LocaleLayoutProps) {
  if (!isValidLocale(locale)) {
    logger.warn(`[I18N-VALIDATION] Locale no soportado: "${locale}".`, { requested: locale });
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </NextIntlClientProvider>
  );
}
