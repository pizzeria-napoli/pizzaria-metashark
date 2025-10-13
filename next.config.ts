// RUTA: next.config.ts (NIVELADO CON EL PLUGIN SOBERANO)
/**
 * @file next.config.ts
 * @description Configuración soberana de Next.js.
 * @version 5.0.0 (NextIntl Plugin Integration): Se integra el plugin de `next-intl`
 *              para conectar nuestra configuración de i18n (`src/i18n.ts`) con el
 *              proceso de build de Next.js. Esto es crucial para que las funciones
 *              del lado del servidor como `getMessages` funcionen correctamente.
 * @version 5.0.0
 * @author L.I.A. Legacy
 */
import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

// Se importa el plugin de next-intl.
const withNextIntl = createNextIntlPlugin(
  // Se especifica la ruta a nuestro archivo de configuración de i18n.
  // Esta es la conexión que resuelve el error.
  './src/i18n.ts'
);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

// Se envuelve nuestra configuración de Next.js con el plugin de i18n.
export default withNextIntl(nextConfig);
