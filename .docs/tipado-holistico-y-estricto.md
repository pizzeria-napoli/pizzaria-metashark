## 🛡️ Manifiesto de Tipado Holístico y Estricto

La integridad de los datos es la base de la confianza en el software. Este proyecto impone un sistema de tipado estricto para garantizar la robustez, prevenir errores en tiempo de ejecución y mejorar la experiencia del desarrollador.

#### Las Reglas de Oro

1.  **Cero Tolerancia al `any` Explícito:** El uso del tipo `any` está prohibido. En su lugar, se **DEBE** usar `unknown` cuando un tipo no se conoce de antemano, forzando una verificación de tipo segura antes de su uso.
2.  **Blindaje en las Fronteras del Sistema:** Toda data que ingresa al sistema desde una fuente externa (APIs, bases de datos, `localStorage`, etc.) **DEBE** ser tratada como no confiable. **DEBE** pasar por un proceso de validación (Zod) y ser parseada a un tipo conocido antes de que la lógica de negocio la utilice.
3.  **Tipos Primitivos de Dominio (Branded Types):** Para evitar errores de lógica (ej. pasar un `UserId` en lugar de un `ProductId`), se **DEBE** usar "branded types" para todos los identificadores únicos del dominio.
4.  **Inferencia de Tipos como Única Fuente de Verdad:** Los tipos para DTOs y entidades **DEBEN** ser inferidos desde sus esquemas Zod (`z.infer`) para eliminar la posibilidad de desincronización entre la validación y el contrato de TypeScript.
5.  **Especificidad en las Firmas:** Las firmas de funciones y métodos **DEBEN** ser lo más específicas posible. Las interfaces de repositorio y los contratos de casos de uso son la primera línea de defensa del tipado estricto.
