// RUTA: tailwind.config.ts
/**
 * @file tailwind.config.ts
 * @description Configuración de Tailwind CSS. Post-naturalización de Shadcn,
 *              este archivo delega toda la lógica de theming y plugins al
 *              SSoT en 'globals.css'.
 * @version 2.0.0 (CSS-first Aligned)
 * @author L.I.A. Legacy
 */
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // El theme está intencionalmente vacío. La SSoT vive en globals.css.
    // Shadcn extiende este objeto en memoria con las variables que mapeamos.
  },
  plugins: [
    // El plugin 'tailwindcss-animate' ha sido movido a globals.css.
    // Mantenemos este array vacío.
  ],
};

export default config;
