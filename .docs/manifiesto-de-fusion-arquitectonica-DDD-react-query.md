## 🏗️ Manifiesto de Fusión Arquitectónica: DDD + React Query

Este proyecto evoluciona para adoptar una arquitectura híbrida que combina la robustez de Domain-Driven Design (DDD) con la eficiencia y la experiencia de usuario de una librería de gestión de estado del servidor moderna.

### Pilar 1: Lo que Conservamos (El Núcleo DDD)

-   **La Arquitectura en Capas (Presentación, Aplicación, Dominio, Infraestructura) es innegociable.** Sigue siendo la columna vertebral del proyecto.
-   **La Regla de las Dependencias se Mantiene:** La UI llama a los casos de uso, los casos de uso orquestan el dominio, y la infraestructura implementa las interfaces del dominio.
-   **Zod como Única Fuente de Verdad (SSoT)** para el tipado y la validación sigue siendo un principio fundamental.
-   **La Internacionalización (i18n)** y la configuración por entorno son la base de nuestra plataforma global.

### Pilar 2: Lo que Adoptamos (El Músculo de `resturant-pizza`)

-   **`@tanstack/react-query` (anteriormente React Query) se convierte en el estándar para la comunicación entre la Capa de Presentación (UI) y la Capa de Aplicación.**
-   **Justificación:** `react-query` nos proporciona de forma gratuita y declarativa:
    -   **Gestión de estados de carga (`isLoading`) y error (`isError`)**.
    -   **Caching inteligente** para evitar peticiones de red innecesarias.
    -   **Actualizaciones en segundo plano (`refetching`)** para mantener los datos frescos.
    -   Una experiencia de usuario (UX) mucho más fluida y profesional.
-   **Hooks de Dominio:** Crearemos hooks personalizados (ej. `useMenu`) que encapsularán la lógica de `useQuery` y llamarán a nuestros casos de uso de la capa de aplicación. Esto mantiene nuestra arquitectura limpia y desacoplada.

### Pilar 3: Lo que Descartamos (Lecciones Aprendidas)

-   **Datos Estáticos (`napoli`):** Rechazamos el uso de datos "hardcodeados" en archivos `.ts`. Nuestra aplicación será 100% dinámica, alimentada por una fuente de datos externa (Firebase).
-   **Estilos en Línea y Lógica Mezclada (`napoli`):** Mantenemos una estricta separación de responsabilidades, evitando estilos en línea y lógica compleja directamente en los componentes de la página.
-   **Llamadas a `fetch` Manuales en la UI:** El patrón `await getFullMenu.execute()` en los Server Components será reemplazado por el uso de hooks de `react-query` en Client Components para una mejor UX.

---


