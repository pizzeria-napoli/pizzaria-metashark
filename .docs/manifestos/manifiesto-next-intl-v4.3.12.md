// RUTA: .docs/manifestos/manifiesto-next-intl-v4.3.12.md (ACTUALIZADO CON LA VERDAD FINAL)
/**
 * @file manifiesto-next-intl-v4.3.12.md
 * @description Manifiesto Canónico y SSoT que define el uso correcto de `next-intl@4.3.12`.
 *              Anula todo conocimiento previo sobre la API de navegación.
 * @version 3.0.0 (Forensic Truth Aligned)
 * @author L.I.A. Legacy
 */

# 🏛️ Manifiesto de Conocimiento y Uso: `next-intl@4.3.12`

## 1. Declaración de Soberanía del Error

Este documento es la **Única Fuente de Verdad (SSoT)** para la navegación en el proyecto. Un análisis forense ha demostrado que el submódulo `next-intl/navigation` **NO ES UN PUNTO DE ENTRADA IMPORTABLE** en la versión `4.3.12`. Cualquier intento de importar desde él resultará en un error de compilación o de resolución de módulos.

## 2. El Protocolo de Navegación Canónico: Abrazar la API Nativa de Next.js

-   **Directiva Soberana:** Toda la navegación **DEBE** utilizar los componentes y hooks nativos de Next.js (`next/link`, `next/navigation`).
-   **Justificación:** El `middleware` de `next-intl` se encarga de la internacionalización de las rutas de forma transparente. Nuestro código debe permanecer agnóstico a esta lógica, interactuando únicamente con la API de navegación estable y oficial de Next.js.
-   **Prohibición Absoluta:** Queda estrictamente prohibido intentar importar `Link`, `redirect`, `usePathname`, o `useRouter` desde `'next-intl'` o cualquiera de sus submódulos.

## 3. La Arquitectura de Fronteras Explícitas

Para garantizar el cumplimiento y la higiene del código, se mantiene la segregación de las importaciones de navegación:
-   **`src/navigation.ts`:** Para utilidades isomórficas (`Link`, `redirect`) importadas desde `next/link` y `next/navigation`.
-   **`src/navigation.client.ts`:** Para hooks de cliente (`usePathname`, `useRouter`) importados desde `next/navigation` y marcados con `"use client"`.
