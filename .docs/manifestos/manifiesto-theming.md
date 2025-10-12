Manifiesto de Theming: Tailwind CSS v4.2 en Pizzeria MetaShark

Visión

Theming como "reloj suizo": Preciso, accesible, performant. CSS-first (@theme extend defaults). Plugins: typography, forms, animate. Dark mode híbrido. Accesibilidad: OKLCH contrasts, reduced-motion, high-contrast.

Configs





globals.css v4.2: Namespaces extendidos (--text-, --font-weight-, --blur-*, etc.). @keyframes custom. Layers: base (globals/prose), components (card/btn-primary/input-primary), utilities (text-gradient/overlay-blur).



tailwind.config.ts v4.1: Plugins JS (typography/forms/animate). DarkMode: 'class'.



stylelintrc.json v1.1: Ignora @theme/@apply para linter.



postcss.config.mjs: @tailwindcss/postcss + autoprefixer.

Uso en Componentes





Clases: .card (shadow/radius), .btn-primary (transition/animate), .prose (descripciones), .input-primary (forms), .fade-in/bounce (animate), .text-gradient (títulos), .overlay-blur (overlays).



Tipografías: text-xl font-weight-bold tracking-tight en títulos.



Dark Mode: Toggle en Header (localStorage + prefers). Overrides en .dark/@media.

Best Practices





Extiende no override defaults.



Performance: Inline @theme, static vars.



Accesibilidad: WCAG contrasts, motion prefs.



Futuro: Agregar container-queries para responsive.

Auditoría: Todo cuadrado – tests validan, no regresiones.

---


