// RUTA: tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {}, // Correcto: Todo en globals.css.
  plugins: [
    // --- ESTA ES LA ÚNICA Y CORRECTA FORMA DE REGISTRAR PLUGINS ---
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};

export default config;
