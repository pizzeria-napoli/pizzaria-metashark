## 📐 Manifiesto de Esquemas de Validación (Zod) - v2.0

Este manifiesto establece las reglas de oro para la creación y gestión de esquemas de validación con Zod, combinando cohesión arquitectónica y una robusta seguridad de tipos.

### Regla #1: Adherirse a la Co-ubicación (Ruta Espejo)

> El esquema Zod de una entidad o DTO **DEBE** residir en el mismo directorio que su archivo de definición principal, bajo el sufijo `.schema.ts`.

*   **Ejemplo:** `MenuItem.ts` y `MenuItem.schema.ts` deben vivir juntos. `login.dto.ts` (si existiera) y `login.schema.ts` también. Siguiendo esta regla, `login.schema.ts` debería estar en `src/auth/domain/login.schema.ts`.

### Regla #2: El Esquema es la Única Fuente de Verdad (`z.infer`)

> Todo archivo de esquema (`.schema.ts`) **DEBE** exportar el tipo inferido de TypeScript usando `z.infer<typeof NombreDelSchema>`. Este tipo, y no una interfaz manual, será el que se use en el resto de la aplicación para esos datos.

*   **Ejemplo:**
    ```typescript
    import { z } from "zod";

    // 1. Se define el esquema
    export const LoginSchema = z.object({
      email: z.string().email(),
      password: z.string().min(1),
    });

    // 2. Se exporta el tipo inferido
    export type LoginFormData = z.infer<typeof LoginSchema>;
    ```

### Regla #3: Doble Capa de Documentación

> Todo archivo de esquema **DEBE** tener una cabecera de archivo que describa su propósito general, y cada esquema exportado **DEBE** tener un comentario TSDoc que explique su uso.

*   **Ejemplo:**
    ```typescript
    // RUTA: src/auth/domain/login.schema.ts
    /**
     * @file login.schema.ts
     * @description Define el contrato de datos para el formulario de inicio de sesión.
     * @author Tu Nombre
     */
    import { z } from "zod";

    /**
     * Valida los campos de email y contraseña para el inicio de sesión.
     * Se utiliza para validar la entrada del usuario en el cliente y en el servidor.
     */
    export const LoginSchema = z.object({
      // ...
    });


    ---

    
