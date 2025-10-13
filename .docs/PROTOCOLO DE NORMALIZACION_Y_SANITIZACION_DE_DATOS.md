# MANIFIESTO SOBERANO 008: PROTOCOLO DE NORMALIZACIÓN Y SANITIZACIÓN DE DATOS

## 1. Visión y Propósito

Este manifiesto establece la Única Fuente de Verdad (SSoT) para el procesamiento de entradas de texto del usuario en todo el ecosistema `meame`. Su propósito es garantizar la **consistencia**, **seguridad** y **previsibilidad** de los datos que se utilizan para generar identificadores, slugs de URL y otras cadenas críticas.

## 2. Principios Fundamentales

- **Seguridad por Defecto:** Toda entrada del usuario que pueda ser utilizada en una URL, nombre de archivo o identificador debe ser sanitizada para prevenir ataques de inyección de rutas (Path Traversal) y Cross-Site Scripting (XSS).
- **Consistencia Predictiva:** La misma entrada de texto debe producir siempre la misma salida normalizada, sin importar dónde se procese.
- **Inmutabilidad de la Fuente:** Las funciones de normalización deben ser puras. Nunca deben modificar el estado original de la entrada del usuario, sino devolver una nueva cadena transformada.

## 3. Convenciones de Normalización

Se define la siguiente función de normalización estándar, a ser implementada en `src/shared/lib/utils/text-processing/normalization.ts`.

### `normalizeStringForId(input: string): string`

Esta función aplicará las siguientes transformaciones en estricto orden:

1.  **Conversión a Minúsculas:** `input.toLowerCase()`
    - **Justificación:** Garantiza la consistencia y evita problemas de distinción entre mayúsculas y minúsculas en URLs y sistemas de archivos.

2.  **Reemplazo de Espacios y Caracteres Especiales:** Reemplazar todos los espacios en blanco (`\s+`) y caracteres no alfanuméricos (excepto guiones) por un único guion (`-`).
    - **Implementación:** `input.replace(/[\s_]+/g, '-').replace(/[^a-z0-9-]/g, '')`
    - **Justificación:** Crea slugs legibles y seguros para URLs.

3.  **Eliminación de Guiones Múltiples:** Reemplazar secuencias de dos o más guiones por un único guion.
    - **Implementación:** `input.replace(/-+/g, '-')`
    - **Justificación:** Mejora la legibilidad y evita URLs malformadas.

4.  **Recorte de Guiones en Extremos:** Eliminar cualquier guion al principio o al final de la cadena.
    - **Implementación:** `input.replace(/^-+|-+$/g, '')`
    - **Justificación:** Asegura que los identificadores y slugs no comiencen ni terminen con separadores.

## 4. Protocolo de Sanitización

Además de la normalización, se debe aplicar una capa de sanitización para eliminar cualquier carácter que pueda ser utilizado en un ataque. La expresión regular `/[^a-z0-9-]/g` en el paso de normalización cumple esta función al eliminar todo lo que no sea una letra minúscula, un número o un guion.

## 5. Aplicación en el Ecosistema

- **Formularios de la SDC:** Los campos que generan slugs (como `campaignName` y `seoKeywords`) deben utilizar estas utilidades para transformar la entrada del usuario antes de guardarla en el estado del borrador.
- **Generadores de SSG:** El Motor de Forja debe confiar en que los datos del borrador ya están normalizados y puede utilizarlos directamente para generar nombres de archivo y rutas.

---


