// .docs/manifestos/quality-and-reach-manifesto.md
# 🏛️ Manifiesto de Calidad de Datos, Globalización y Alcance
## Pizzeria MetaShark

### I. Visión Filosófica

Para alcanzar el éxito mundial, nuestra aplicación debe ser más que funcional y rápida; debe ser **confiable, inclusiva y visible**. Este manifiesto establece los estándares no negociables para la gestión de datos, la preparación para una audiencia global, la accesibilidad universal y la optimización para motores de búsqueda (SEO).

Estos no son "extras", son pilares fundamentales de nuestra ingeniería de producto.

---

### II. Pilar 1: La Santidad de los Datos (Estructura de Esquemas)

#### 1. **Estructura Espejo en `src/schemas`**
   Toda validación de datos de entrada/salida **DEBE** definirse utilizando esquemas de **Zod**. Estos esquemas residirán en una carpeta dedicada `src/schemas`. La estructura de directorios dentro de `src/schemas` **DEBE** ser un espejo exacto de la estructura de los `Bounded Contexts`.

   *   **Ejemplo:**
       *   La lógica de negocio para `MenuItem` vive en `src/menu/domain/`.
       *   Por lo tanto, su esquema de validación **DEBE** vivir en `src/schemas/menu/MenuItemSchema.ts`.

   *   **Razón Estratégica:** Esta convención crea un sistema predecible y localizable. Cuando un desarrollador necesita entender la "forma" de un dato, sabe exactamente dónde mirar, desacoplando la definición de la validación de su implementación en el dominio.

#### 2. **Zod como Única Fuente de la Verdad para Tipos de Datos (DTOs)**
   Los tipos de TypeScript para objetos de transferencia de datos (DTOs) **DEBEN** ser inferidos directamente de los esquemas de Zod, utilizando `z.infer<typeof schema>`.

   *   **Razón Estratégica:** Garantiza que nuestras validaciones en tiempo de ejecución y nuestros tipos en tiempo de compilación nunca se desincronicen. Se elimina la duplicación y se reduce la posibilidad de errores.

---

### III. Pilar 2: Preparados para el Mundo (Internacionalización - i18n)

#### 1. **Abstracción de Todo el Texto Visible**
   Ningún texto visible para el usuario (etiquetas de botones, títulos, descripciones, mensajes de error) **DEBE** estar "hardcodeado" en los componentes JSX. Todo el texto **DEBE** ser abstraído a través de una función o componente de traducción.

   *   **Ejemplo de Diseño Futuro:**
       *   **Incorrecto:** `<h1>Nuestro Menú</h1>`
       *   **Correcto:** `<h1>{t('menu.title')}</h1>`

#### 2. **Estructura de Archivos de Traducción Cimentada**
   Aunque no implementemos la lógica de i18n en el MVP, cimentaremos su futura estructura. Se creará una carpeta `src/locales`. Dentro de ella, los archivos de traducción seguirán una estructura anidada que refleje los `Bounded Contexts`.

   *   **Estructura Futura:**
       ```plaintext
       src/locales/
       ├── es/
       │   ├── menu.json
       │   └── ordering.json
       └── en/
           ├── menu.json
           └── ordering.json
       ```

   *   **Razón Estratégica:** Al seguir esta disciplina desde el principio, la tarea de traducir la aplicación en el futuro se convierte en un simple ejercicio de rellenar archivos JSON, en lugar de una dolorosa refactorización de toda la base de código.

---

### IV. Pilar 3: Una App para Todos (Accesibilidad - a11y)

#### 1. **Cumplimiento del Estándar WCAG 2.1 AA**
   Todos los componentes y páginas **DEBEN** aspirar a cumplir, como mínimo, con el nivel AA de las Web Content Accessibility Guidelines (WCAG) 2.1.

#### 2. **Prácticas No Negociables (La Santísima Trinidad de a11y)**
   *   **HTML Semántico Siempre:** Usar `button` para acciones, `a` para navegación, `nav`, `main`, `header`, `footer` para la estructura. Un `div` con un `onClick` no es un botón.
   *   **Todo lo Visualmente Oculto debe ser Accesible:** Los elementos interactivos sin texto visible (ej. botones con solo un ícono) **DEBEN** tener una etiqueta accesible a través de `aria-label` o texto visualmente oculto.
   *   **Todo lo Interactivo debe ser Enfocable y Operable por Teclado:** El usuario debe poder navegar y operar toda la aplicación usando solo la tecla `Tab`, `Enter` y `Espacio`. Los anillos de enfoque (`focus-visible`) **NUNCA** deben ser eliminados.

   *   **Razón Estratégica:** La accesibilidad no es una característica, es un requisito fundamental para el éxito mundial. Una aplicación accesible expande nuestro mercado potencial, mejora la experiencia para todos los usuarios y es un factor positivo para el SEO.

---

### V. Pilar 4: Ser Encontrado (SEO Compliance)

#### 1. **Renderizado en el Servidor como Estándar**
   Siempre que sea posible, las páginas **DEBEN** ser renderizadas en el servidor (SSR/SSG) usando Server Components de Next.js. Esto asegura que los motores de búsqueda reciban un HTML completo y rico en contenido, no una página vacía que depende de JavaScript para renderizarse.

#### 2. **Metadatos de Élite**
   Cada página **DEBE** exportar un objeto `metadata` de Next.js. Este objeto **DEBE** contener, como mínimo:
   *   `title`: Un título único y descriptivo para la página.
   *   `description`: Una descripción concisa y atractiva.
   *   `openGraph`: Metadatos para una correcta visualización al compartir en redes sociales (Facebook, LinkedIn, etc.).

#### 3. **SEO Técnico y Estructural**
   *   **Jerarquía de Encabezados:** Cada página debe tener un solo `<h1>` y una estructura lógica de `<h2>`, `<h3>`, etc.
   *   **Atributos `alt` en Imágenes:** Todas las imágenes renderizadas con `next/image` **DEBEN** tener un atributo `alt` descriptivo.
   *   **Datos Estructurados (Futuro):** Para páginas clave como el menú, se planifica la implementación de JSON-LD para describir nuestros productos (pizzas, precios) de una forma que Google pueda entender directamente y mostrar en resultados enriquecidos.

   *   **Razón Estratégica:** No importa cuán buena sea nuestra PWA si nadie puede encontrarla. Un SEO impecable es el motor de adquisición de usuarios orgánico y sostenible que impulsará nuestro crecimiento global.

   ---

   
