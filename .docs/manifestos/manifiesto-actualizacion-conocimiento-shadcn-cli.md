// RUTA: .docs/manifestos/manifiesto-actualizacion-conocimiento-shadcn-cli.md
/**
 * @file manifiesto-actualizacion-conocimiento-shadcn-cli.md
 * @description Manifiesto SSoT que actualiza la base de conocimientos de L.I.A. Legacy
 *              con respecto a la nueva API del CLI de Shadcn.
 *              Este documento anula todo conocimiento previo sobre los comandos de Shadcn/UI.
 * @version 2.0.0
 * @author L.I.A. Legacy (basado en traza del Arquitecto)
 */

# 🏛️ Manifiesto de Actualización de Conocimiento: Shadcn CLI v2.0

## 1. Declaración de Anulación

Este documento es la **Única Fuente de Verdad (SSoT)** con respecto a la interfaz de línea de comandos (CLI) para la gestión de componentes de Shadcn. La información contenida aquí anula y reemplaza cualquier instrucción o conocimiento previo relacionado con el paquete `shadcn-ui`.

## 2. Cambio Canónico de Nomenclatura

-   **Paquete Deprecado:** `shadcn-ui`
-   **Paquete Canónico:** `shadcn`

Todo comando futuro **DEBE** usar el nuevo nombre `shadcn`.

## 3. Comandos Canónicos Actualizados

### 3.1. Inicialización del Proyecto (`init`)

-   **Comando Anterior:** `pnpm dlx shadcn-ui@latest init`
-   **Comando Corregido y Canónico:**
    ```bash
    pnpm dlx shadcn@latest init
    ```
-   **Propósito:** Configura `components.json`, utilidades `cn`, y alinea `tailwind.config.ts`. Este comando se ejecuta **una sola vez** por proyecto.

### 3.2. Adición de Componentes (`add`)

-   **Comando Anterior:** `pnpm dlx shadcn-ui@latest add [componente]`
-   **Comando Corregido y Canónico:**
    ```bash
    pnpm dlx shadcn@latest add [componente]
    ```
-   **Ejemplo:**
    ```bash
    pnpm dlx shadcn@latest add dropdown-menu button
    ```
-   **Propósito:** Añade el código fuente de los componentes especificados al directorio definido en `components.json` (`@/components/ui`).

## 4. Conclusión

Mi base de conocimientos ha sido actualizada y purgada de la referencia al CLI obsoleto. Todos los futuros comandos y recomendaciones se basarán en esta nueva SSoT.

--

