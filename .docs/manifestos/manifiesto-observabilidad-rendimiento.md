### 📐 Manifiesto de Observabilidad y Rendimiento (O&R)

Un sistema que no se puede medir, no se puede mejorar. La observabilidad es un pilar no negociable de nuestra arquitectura.

#### Las Reglas de Oro

1.  **Medir Todas las Operaciones Críticas:** Toda operación que involucre I/O (lecturas/escrituras de base de datos, llamadas a APIs externas) **DEBE** ser medida. El sistema de logging debe registrar el inicio, el fin y la **duración total** de la operación.
2.  **Contexto es Rey:** Cada log de rendimiento **DEBE** incluir un contexto rico y estructurado (ej. IDs de documentos, nombres de funciones) que permita un análisis detallado sin necesidad de replicar el escenario.
3.  **Encapsular la Lógica de Medición:** La lógica para medir el tiempo y registrar los eventos de inicio/fin debe estar centralizada en el aparato de `logging` para evitar duplicación de código y garantizar consistencia.

---```

#### Manifiesto de Resiliencia y Manejo de Errores

```markdown
### 💪 Manifiesto de Resiliencia y Manejo de Errores

El sistema **DEBE** anticipar el fallo y estar diseñado para sobrevivir a él. La resiliencia no es una ocurrencia tardía, es una característica fundamental del diseño.

#### Las Reglas de Oro

1.  **Envoltura `try/catch` Obligatoria:** Toda operación que pueda fallar (especialmente las operaciones medidas por el manifiesto O&R) **DEBE** estar envuelta en un bloque `try/catch`.
2.  **No Lanzar Errores a la UI:** Las capas de infraestructura (repositorios) y aplicación (casos de uso) **NUNCA DEBEN** lanzar excepciones que puedan llegar a la capa de presentación (UI). Su responsabilidad es atrapar el error.
3.  **Registrar el Fallo con Detalle:** Al atrapar un error, la operación **DEBE** usar el aparato de `logging` para registrar el error con un contexto completo, incluyendo el stack trace y los parámetros de entrada.
4.  **Devolver un Estado Seguro:** Tras registrar el fallo, la operación **DEBE** devolver un valor "seguro" o "nulo" que la capa superior pueda manejar sin crashear. Para una función que devuelve un array, será un array vacío (`[]`). Para una que devuelve un objeto, será `null`. Esto previene fallos en cascada.

---


