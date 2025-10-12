// RUTA: middleware.ts
/**
 * @file middleware.ts
 * @description Middleware de enrutamiento para la internacionalización.
 *              Actúa como la Única Fuente de Verdad para la configuración de idiomas.
 */
import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { logger } from '@/shared/logging';

// --- MANIFIESTO DE INTERNACIONALIZACIÓN: CONFIGURACIÓN CENTRAL ---
// Nomenclatura estricta: 'language-REGION' (ej. 'es-ES').
export const locales = ['en-US', 'es-ES', 'pt-BR', 'it-IT'];

// El idioma por defecto se lee desde el entorno para flexibilidad.
// Si no está definido, se usa 'es-ES' como respaldo seguro.
export const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'es-ES';

if (!locales.includes(defaultLocale)) {
  // Este log se ejecutará en tiempo de build si la configuración es inválida.
  logger.error(`[I18N-CONFIG-ERROR] El defaultLocale "${defaultLocale}" no está en la lista de locales soportados.`, {
    supportedLocales: locales
  });
}
// ------------------------------------------------------------------

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  logger.info(`[Middleware] Request received for: ${pathname}`);
  try {
    const response = intlMiddleware(request);
    const redirectedUrl = response.headers.get('x-middleware-rewrite') || response.headers.get('Location');

    if (redirectedUrl) {
      logger.success(`[Middleware] Request to "${pathname}" is being redirected/rewritten to "${redirectedUrl}"`);
    } else {
      logger.info(`[Middleware] Request to "${pathname}" processed without redirection.`);
    }

    return response;
  } catch (error) {
    logger.error('[Middleware] An unexpected error occurred during i18n processing.', {
      pathname,
      error,
    });
    // En caso de un error inesperado, dejamos pasar la petición para no bloquear el sitio.
    // Next.js manejará el error en una capa superior.
    return;
  }
}

export const config = {
  // Rutas que activarán este middleware. Se excluyen carpetas de sistema y archivos estáticos.
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
