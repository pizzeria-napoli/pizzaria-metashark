// RUTA: src/app/[locale]/(status)/layout.tsx (NIVELADO)
/**
 * @file layout.tsx
 * @description Layout para las páginas de estado (404, 500, mantenimiento).
 *              Proporciona un contenedor centrado y minimalista.
 * @version 2.0.0 (Sovereign i18n Metadata): Refactorizado para generar metadatos
 *              localizados, resolviendo las advertencias de ESLint.
 * @author L.I.A. Legacy
 */
import { getTranslations } from 'next-intl/server';

// La función ahora es `async` y utiliza `getTranslations` y `locale`.
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'StatusLayout' });
  return {
    title: t('metadataTitle'),
  };
}

export default function StatusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
      <div className="text-center p-8">{children}</div>
    </div>
  );
}
