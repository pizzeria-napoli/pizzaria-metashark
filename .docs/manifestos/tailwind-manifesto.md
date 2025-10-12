// .docs/manifestos/tailwind-manifesto.md
# 🍕 Manifiesto del Sistema de Diseño - Pizzeria MetaShark
## Potenciado por Tailwind CSS v4

### I. Visión Filosófica

Este documento establece los principios y reglas para la implementación del sistema de diseño de Pizzeria MetaShark. Nuestro enfoque no es simplemente "usar Tailwind", sino aprovechar su nueva arquitectura basada en variables para crear un sistema de diseño **robusto, escalable, mantenible y agnóstico al tema**.

El objetivo es que nuestros componentes de React no tomen decisiones de diseño; solo deben consumir tokens semánticos. La verdad visual reside en el CSS, no en el JavaScript.

---

### II. Principios Fundamentales

#### 1. **`globals.css` es la Única Fuente de la Verdad (SSoT) Visual**
   Toda la identidad visual de la marca (colores, tipografía, espaciado, radios de borde) **DEBE** definirse como variables CSS (`--variable`) dentro de la capa `@layer base` en `src/app/globals.css`. El archivo `tailwind.config.ts` se convierte en un consumidor de estas variables, no en su definidor.

   *   **Razón:** Centraliza el diseño, facilita la creación de temas (claro/oscuro) y permite que el sistema de diseño evolucione sin tocar la configuración de la herramienta.

#### 2. **Abstracción Semántica sobre Clases Literales**
   Los componentes **NUNCA** deben usar colores literales. En lugar de `bg-amber-500`, se **DEBE** usar una clase semántica como `bg-primary`.

   *   **Correcto:** `<button className="bg-primary text-primary-foreground">`
   *   **Incorrecto:** `<button className="bg-amber-500 text-gray-900">`

   *   **Razón:** Esto desacopla el componente de la paleta de colores. Si mañana el color primario cambia de ámbar a rojo, solo se modifica una línea en `globals.css` y toda la aplicación se actualiza. Esto es escalabilidad.

#### 3. **Componentes Agnósticos al Tema**
   Nuestros componentes de React son "daltónicos". No saben si están en modo claro u oscuro. Simplemente consumen tokens semánticos como `bg-card` o `text-foreground`. El cambio de tema es una responsabilidad exclusiva del CSS, gestionado por la clase `dark` o `light` en el `<html>`.

   *   **Razón:** Mantiene la lógica de los componentes limpia y enfocada en su funcionalidad, no en su apariencia condicional.

#### 4. **Composición de Componentes sobre Cadenas de Clases Extensas**
   Se debe priorizar la creación de pequeños componentes de UI reutilizables (como nuestro `<Card />`) en lugar de repetir largas cadenas de clases de utilidad en el JSX.

   *   **Razón:** Fomenta la reutilización (DRY - Don't Repeat Yourself), mejora la legibilidad y crea una biblioteca de "Lego bricks" predecible y consistente para toda la aplicación.

---

### III. El Flujo de Vida de un Estilo

El siguiente diagrama ilustra cómo un token de diseño fluye a través de nuestro sistema, desde su definición hasta su consumo.

```mermaid
graph TD
    A["<b>1. Definición (SSoT)</b><br/><code>src/app/globals.css</code><br/>--primary: 40 96% 56%;"]
    B["<b>2. Mapeo en Configuración</b><br/><code>tailwind.config.ts</code><br/>primary: 'hsl(var(--primary))'"]
    C["<b>3. Generación de Clase</b><br/>Motor de Tailwind<br/>.bg-primary { background-color: hsl(var(--primary)); }"]
    D["<b>4. Consumo en Componente</b><br/><code>ProductCard.tsx</code><br/>&lt;button className='bg-primary'&gt;"]

    A --> B --> C --> D

    style A fill:#020817,stroke:#A68B5C,stroke-width:2px,color:#fff
    style B fill:#020817,stroke:#A68B5C,stroke-width:2px,color:#fff
    style C fill:#020817,stroke:#A68B5C,stroke-width:2px,color:#fff
    style D fill:#020817,stroke:#A68B5C,stroke-width:2px,color:#fff

    Al adherirnos a este manifiesto, garantizamos que nuestro sistema de diseño no solo sea hermoso y consistente, sino que esté arquitectónicamente preparado para el crecimiento exponencial y los desafíos de una plataforma de éxito mundial.

---

Tailwind CSS ha evolucionado hacia un enfoque "CSS-first" para la configuración del tema.[1][2][3][4] Esto significa que, en lugar de definir tus colores, fuentes y otros tokens de diseño en un archivo tailwind.config.ts, la práctica moderna es hacerlo directamente en tu archivo CSS principal usando la nueva directiva @theme.[2][3][5][6]
El problema de estilos que estás experimentando se debe a que tu proyecto sigue la metodología anterior, mezclando definiciones en tailwind.config.ts y el uso de variables CSS en globals.css de una manera que ya no es la recomendada.
Para modernizar tu proyecto, solucionar los problemas de estilos y alinearlo con las mejores prácticas actuales de Tailwind, te propongo la siguiente actualización.
Manifiesto de Actualización de Estilos
Aquí tienes una versión actualizada y corregida de tu archivo src/app/globals.css. Este cambio centralizará toda tu configuración de diseño en un solo lugar, haciendo tu sistema de estilos más limpio, mantenible y alineado con la nueva filosofía de Tailwind.

---
