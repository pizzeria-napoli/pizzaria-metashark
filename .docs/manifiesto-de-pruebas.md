## 🧪 Manifiesto de Pruebas de Software

La calidad no es un acto, es un hábito. Para garantizar la robustez, prevenir regresiones y facilitar la evolución del código con confianza, este proyecto se adhiere a un estricto manifiesto de pruebas.

### Pilar 1: La Filosofía - "Prueba como un Usuario"

1.  **Enfócate en el Comportamiento, no en la Implementación:** Las pruebas **NO DEBEN** acceder a los estados internos o a los métodos de ciclo de vida de un componente. En su lugar, **DEBEN** encontrar elementos en el DOM de la misma forma que lo haría un usuario (por texto, por rol, por etiqueta) e interactuar con ellos (clic, escritura).
2.  **Accesibilidad como Base:** Priorizar los selectores de React Testing Library que son accesibles (`getByRole`, `getByLabelText`) no solo hace las pruebas más robustas, sino que nos empuja a construir una aplicación más accesible.

### Pilar 2: La Estructura - "Ruta Espejo Centralizada"

1.  **Directorio Raíz `tests/`:** Todas las pruebas **DEBEN** residir en una única carpeta `tests` en la raíz del proyecto. Esto mantiene el código fuente (`src`) completamente limpio de artefactos de prueba.
2.  **Estructura de Espejo:** La estructura de directorios dentro de `tests/` **DEBE** replicar exactamente la estructura de `src/`.
    *   **Ejemplo:** La prueba para `src/components/ui/Card.tsx` **DEBE** estar en `tests/components/ui/Card.test.tsx`.
3.  **Convención de Nomenclatura:** Los archivos de prueba **DEBEN** usar el sufijo `.test.ts` (para lógica pura) o `.test.tsx` (para componentes de React).

### Pilar 3: Las Herramientas y Reglas

1.  **Motor de Pruebas: Vitest:** Utilizamos Vitest por su velocidad, su API moderna y su compatibilidad nativa con TypeScript y ES Modules.
2.  **Librería de Componentes: React Testing Library (RTL):** Es el estándar para aplicar nuestra filosofía de "probar como un usuario".
3.  **Aislamiento y Mocks:** Las pruebas unitarias **DEBEN** ser herméticas. Toda dependencia externa (llamadas a API, hooks de `react-query`, funciones de `next-intl`) **DEBE** ser mockeada para que la prueba se centre únicamente en la unidad bajo prueba.
4.  **Librería de Mocks Centralizada:** Para fomentar la reutilización y la consistencia, los datos de mock complejos (ej. un array de `MenuItems`) **DEBEN** residir en la carpeta `tests/mocks/`.
2. Implementación Técnica del Entorno de Pruebas
Paso 1: Instalar las Dependencias de Desarrollo
Ejecuta este comando en tu terminal para instalar Vitest, React Testing Library y todo lo necesario.
code
Bash
pnpm add -D vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
vitest: El motor de pruebas.
@vitest/ui: Una interfaz gráfica para ver los resultados de tus pruebas.
jsdom: Simula un entorno de navegador (DOM) para que las pruebas se puedan ejecutar en Node.js.
@testing-library/react: La librería principal para renderizar y consultar componentes.
@testing-library/jest-dom: Añade "matchers" súper útiles como .toBeInTheDocument().
@testing-library/user-event: La mejor librería para simular interacciones de usuario realistas.

---

