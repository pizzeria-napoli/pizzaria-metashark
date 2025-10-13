/**
 * @file postcss.config.mjs
 * @description Configuración de PostCSS para Tailwind CSS v4 en Next.js.
 *              Esta es la Única Fuente de Verdad para plugins de post-procesado.
 *              Alineado con docs oficiales: solo @tailwindcss/postcss (v4 integra autoprefixer nativamente).
 * @version 4.1.14 (Tailwind v4 Stable)
 * @see https://tailwindcss.com/docs/guides/nextjs
 */

const config = {
  plugins: {
    '@tailwindcss/postcss': {},  // Plugin dedicado para Tailwind v4 (Oxide engine)
  },
};

export default config;
