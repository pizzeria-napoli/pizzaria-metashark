// RUTA: .docs/manifestos/manifiesto-iconografia.md
/**
 * @file manifiesto-iconografia.md
 * @description Manifiesto Canónico y SSoT para el Sistema de Iconografía.
 *              Define los principios para el uso de iconos, asegurando consistencia,
 *              performance, accesibilidad y una DX de élite.
 * @version 1.0.0
 * @author L.I.A. Legacy
 */

# 🏛️ Manifiesto del Sistema de Iconografía

## 1. Visión Filosófica: "Iconos como un Lenguaje: Claros, Consistentes y Performantes."

Este documento es la Única Fuente de Verdad (SSoT) que rige el uso de la iconografía en Pizzeria MetaShark. Los iconos no son meros adornos; son una parte integral del lenguaje de nuestra interfaz. Deben ser utilizados para mejorar la claridad, guiar al usuario y reforzar la identidad visual de la marca, sin comprometer jamás el rendimiento.

---

## 2. Pilares Fundamentales

### Pilar I: La Única Biblioteca Permitida (`lucide-react`)

-   **Directiva:** `lucide-react` es la **única** biblioteca de iconos aprobada para este proyecto. Queda estrictamente prohibido el uso de SVGs en línea, otras bibliotecas de iconos o imágenes de mapa de bits para iconografía.
-   **Justificación:** Garantiza una cohesión visual absoluta y mantiene el control sobre el rendimiento del bundle.

### Pilar II: La SSoT Tipada como Contrato Inmutable

-   **Directiva:** El archivo `src/shared/lib/config/lucide-icon-names.ts` es la **Única Fuente de Verdad** sobre los iconos disponibles. Toda referencia a un icono en el código **DEBE** usar el tipo `LucideIconName` exportado desde este archivo.
-   **Justificación:** Erradica los "magic strings", proporciona autocompletado en el IDE y habilita la detección de errores en tiempo de compilación.

### Pilar III: El Componente `<Icon />` como Único Punto de Entrada

-   **Directiva:** La renderización de iconos **DEBE** realizarse exclusivamente a través del componente genérico `<Icon />`. Queda prohibida la importación directa de componentes de icono individuales (ej. `import { Pizza } from 'lucide-react'`) dentro de los componentes de UI.
-   **Justificación:**
    -   **Performance:** El componente `<Icon />` utiliza importaciones dinámicas, asegurando que solo el código del icono solicitado se cargue en el cliente (lazy-loading).
    -   **Consistencia:** Centraliza la lógica de renderizado, permitiendo aplicar props por defecto (como `strokeWidth`) a nivel de proyecto.
    -   **DX de Élite:** Simplifica el uso de iconos a una sola línea declarativa: `<Icon name="Pizza" />`.

### Pilar IV: Consistencia Visual a Través de Propiedades Controladas

-   **Directiva:** Los iconos deben adherirse a las siguientes reglas de propiedades:
    -   **Color:** Los iconos **NUNCA** deben tener un color hardcodeado. Su color **DEBE** ser controlado por el CSS del contenedor padre a través de `currentColor`.
    -   **Tamaño (`size`):** Se deben favorecer tamaños predefinidos (ej. 16, 20, 24) para mantener la consistencia.
    -   **Grosor (`strokeWidth`):** Se debe usar un grosor por defecto (ej. `2.5`) en toda la aplicación para una estética unificada.
-   **Justificación:** Mantiene una apariencia predecible y profesional, y se alinea perfectamente con nuestro manifiesto de Theming.

### Pilar V: Accesibilidad No Negociable

-   **Directiva:**
    -   Si un icono es puramente **decorativo** y está acompañado de texto visible, **DEBE** ser ocultado de los lectores de pantalla.
    -   Si un icono es **interactivo** (ej. un botón que solo tiene un icono), **DEBE** tener una etiqueta accesible proporcionada a través de un `aria-label` en el elemento interactivo padre.
-   **Justificación:** Cumple con nuestro pilar de una App para Todos (a11y).

### Pilar VI: Proceso de Actualización Sincronizada

-   **Directiva:** Cada vez que la dependencia `lucide-react` se actualice, el desarrollador **DEBE** ejecutar el comando `pnpm gen:icons` para regenerar la SSoT y asegurar que el sistema de tipos refleje los iconos disponibles.
-   **Justificación:** Mantiene la integridad del sistema a lo largo del tiempo.

---


