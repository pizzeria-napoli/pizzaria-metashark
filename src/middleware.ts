// RUTA SOBERANA: src/middleware.ts
/**
 * @file middleware.ts
 * @description Middleware Soberano de Internacionalización, alineado con la SSoT de `next-intl`.
 *              Utiliza el constructor de middleware de la biblioteca para manejar
 *              la detección de locale y el prefijo de rutas de forma automática y resiliente.
 *
 * @justification_arquitectonica La documentación oficial de Next.js exige que el middleware
 *              resida dentro del directorio `src` si la carpeta `app` también está en `src`.
 *              Este archivo implementa el patrón `createIntlMiddleware` recomendado por la
 *              documentación de `next-intl` para una gestión de enrutamiento robusta.
 *
 * @version 7.1.0 (Sovereign Path & Docs Justification)
 * @author L.I.A. Legacy
 */
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { locales, defaultLocale } from './i18n.config';
import { logger } from '@/shared/logging';

export default function middleware(request: NextRequest) {
  const group = logger.startGroup('middleware.intl');
  logger.info(`Petición entrante: ${request.method} ${request.nextUrl.pathname}`, { path: request.nextUrl.pathname }, group.groupId);

  const handleI18nRouting = createIntlMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'as-needed',
  });

  const response = handleI18nRouting(request);

  logger.info(`Respuesta del middleware i18n`, { status: response.status }, group.groupId);
  logger.endGroup(group.groupId);

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)',
  ],
};
