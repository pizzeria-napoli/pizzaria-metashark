// RUTA: src/app/[locale]/layout.tsx
/**
 * @file layout.tsx
 * @description Layout raíz localizado. Es el corazón de la aplicación que orquesta
 *              todos los proveedores de contexto globales, la internacionalización,
 *              el theming, el modo mantenimiento y la gestión de errores a nivel raíz.
 * @version 4.0.0 (Holistic & Resilient Architecture)
 * @author RaZ Podestá - MetaShark Tech
 */

// --- 1. IMPORTACIONES ---
// Se organizan por tipo para mayor claridad.

// Importaciones de Next.js y React
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Roboto, Dancing_Script } from 'next/font/google';

// Importaciones de librerías de terceros
import { twMerge } from 'tailwind-merge';
import { NextIntlClientProvider, useMessages, AbstractIntlMessages } from 'next-intl';

// Importaciones de aparatos internos del proyecto
import { ReactQueryProvider } from '@/components/containers/ReactQueryProvider';
import { locales } from '../../../middleware'; // SSoT para los locales soportados
import { logger } from '@/shared/logging';
import './globals.css';

// --- 2. CONFIGURACIÓN A NIVEL DE MÓDULO ---

// ============================================================================
// MANIFIESTO DE THEMING: FUENTES COMO ÚNICA FUENTE DE VERDAD (SSOT)
// ============================================================================
// Centralizamos la carga de fuentes aquí para optimización automática de Next.js.
// Las fuentes se asignan a variables CSS (--font-sans, --font-serif)
// que son consumidas por Tailwind en `globals.css`.
// ----------------------------------------------------------------------------
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dancing-script',
});

// ============================================================================
// METADATA (SEO)
// ============================================================================
// Esta metadata será común para todas las páginas, pero puede ser sobreescrita
// en páginas específicas.
export const metadata: Metadata = {
  title: 'Pizzeria MetaShark - El Sabor del Futuro',
  description: 'La mejor pizza, entregada con la mejor tecnología.',
  // TODO: Añadir metadatos para Open Graph (redes sociales) y PWA manifest.
};

// --- 3. COMPONENTES AUXILIARES DE ESTADO ---

/**
 * @description Componente autocontenido que se renderiza en toda la pantalla
 *              cuando la aplicación está en modo mantenimiento.
 */
function MaintenancePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground text-center p-4">
      <h1 className="text-4xl md:text-5xl font-bold text-primary font-serif mb-4">
        Estamos Mejorando para Ti
      </h1>
      <p className="text-lg max-w-2xl">
        Pizzeria MetaShark está actualmente en mantenimiento para traerte una experiencia aún más deliciosa.
        Volveremos a estar en línea en breve. ¡Gracias por tu paciencia!
      </p>
    </div>
  );
}

/**
 * @description Componente de fallback para errores críticos que ocurran durante
 *              la inicialización del layout, previniendo una pantalla blanca.
 */
function GlobalErrorFallback() {
   return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground text-center p-4">
      <h1 className="text-4xl md:text-5xl font-bold text-red-500 font-serif mb-4">
        ¡Ups! Algo salió muy mal
      </h1>
      <p className="text-lg max-w-2xl">
        Ocurrió un error crítico al cargar la aplicación. Nuestro equipo técnico ha sido notificado.
        Por favor, intenta refrescar la página en unos momentos.
      </p>
    </div>
  );
}


// --- 4. COMPONENTE PRINCIPAL: ROOT LAYOUT LOCALIZADO ---

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  logger.info(`[RootLayout] Rendering for locale: "${locale}"`);

  // ============================================================================
  // MANIFIESTO DE RESILIENCIA Y SEGURIDAD
  // ============================================================================
  // Este bloque try-catch protege toda la inicialización de la aplicación.
  // ----------------------------------------------------------------------------
  try {
    // 1. Validación del Idioma (Fail-Fast)
    // Se verifica si el locale de la URL es uno de los soportados.
    // Si no lo es, se interrumpe el renderizado y se muestra un 404.
    if (!locales.includes(locale)) {
      logger.warn(`[I18N-VALIDATION] Intento de acceso con locale no soportado: "${locale}". Redirigiendo a 404.`, {
        supportedLocales: locales,
        requestedLocale: locale,
      });
      notFound();
    }
    logger.success(`[I18N-VALIDATION] Locale "${locale}" es válido.`);

    // 2. Carga de Recursos Globales
    // Se obtienen los mensajes de traducción para el idioma actual.
    const messages: AbstractIntlMessages | undefined = useMessages();
    if (!messages) {
        throw new Error(`[I18N-ERROR] No se pudieron cargar los mensajes para el locale: "${locale}". Verifica que el archivo "messages/${locale}.json" exista y no esté vacío.`);
    }

    // 3. Verificación de Modos de Operación
    // Se lee la variable de entorno para determinar el estado de mantenimiento.
    const isInMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
    if (isInMaintenanceMode) {
      logger.warn('[MAINTENANCE-MODE] La aplicación se está renderizando en modo mantenimiento.');
    }

    // ============================================================================
    // MANIFIESTO DE ARQUITECTURA: ORQUESTACIÓN DE PROVEEDORES
    // ============================================================================
    // Se anidan todos los proveedores de contexto en el orden correcto.
    // ReactQueryProvider debe ser externo para que el proveedor de i18n pueda
    // usar hooks que realicen peticiones si fuera necesario.
    // ----------------------------------------------------------------------------
    return (
      <html lang={locale} className="dark">
        <body
          className={twMerge(
            'min-h-screen bg-background font-sans antialiased',
            roboto.variable,
            dancingScript.variable
          )}
        >
          <ReactQueryProvider>
            {isInMaintenanceMode ? (
              <MaintenancePage />
            ) : (
              <NextIntlClientProvider locale={locale} messages={messages}>
                {children}
              </NextIntlClientProvider>
            )}
          </ReactQueryProvider>
        </body>
      </html>
    );
  } catch (error) {
    // Si cualquier parte de la inicialización falla, se captura el error aquí.
    logger.error('[RootLayout-CRITICAL] Fallo crítico durante la inicialización del layout.', {
      locale,
      error,
    });

    // Se renderiza un fallback seguro para el usuario final en lugar de una pantalla de error de Next.js.
    return (
       <html lang={locale || 'es-ES'} className="dark">
         <body className={twMerge('min-h-screen bg-background font-sans antialiased', roboto.variable)}>
            <GlobalErrorFallback />
         </body>
       </html>
    );
  }
}
