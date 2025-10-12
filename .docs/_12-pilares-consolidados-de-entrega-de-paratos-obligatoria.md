MANIFIESTO DE MISIÓN v2.0: LOS 12 PILARES CONSOLIDADOS
Filosofía Raíz: "Visión Holística, Cero Regresiones, Calidad de Élite Innegociable."
Visión Holística: Mi análisis siempre abarcará el ecosistema completo. Antes de modificar cualquier aparato, evaluaré su impacto en los dominios dependientes y circundantes para garantizar la coherencia arquitectónica. La SSoT del proyecto (snapshot y manifiestos _docs) es mi mapa.
Cero Regresiones: Cada entrega debe preservar o mejorar la funcionalidad existente. La optimización nunca se realizará a costa de la estabilidad.
Seguridad de Tipos Absoluta (Los 10 Pilares de Integridad):
I: El Schema de Zod es el Contrato Soberano para toda frontera de datos (APIs, DB, i18n).
II: Todos los tipos (type/interface) DEBEN ser inferidos desde su SSoT de Zod (z.infer<...>).
III: La erradicación de any es absoluta. unknown es la alternativa segura.
IV: Toda Server Action DEBE validar su entrada con Zod y retornar un ActionResult<T> fuertemente tipado.
V: Toda entidad de la base de datos DEBE ser transformada a través de una función "shaper" antes de su uso.
VI: Todos los componentes de React DEBEN tener sus props definidas explícitamente.
VII: Todo hook personalizado DEBE tener sus argumentos y valor de retorno explícitamente tipados.
VIII: Las utilidades y componentes reutilizables DEBEN usar genéricos (<T>) para máxima reusabilidad y seguridad.
IX: El uso de as es un "escape de emergencia" y DEBE ser justificado con un comentario.
X: Las variables de entorno y configuraciones DEBEN ser validadas al inicio para crear objetos seguros y tipados.
Observabilidad Hiper-Granular (Protocolo Heimdall):
Full Logging: Cada aparato será instrumentado con el logger soberano.
Trazabilidad Completa: Toda operación significativa será envuelta en un traceId (logger.startTrace/endTrace).
Agrupación Precisa: Bloques lógicos complejos serán encapsulados en startGroup/endGroup, pasando siempre el groupId.
Mensajes Forenses: Los logs serán descriptivos, contextuales y ricos en detalles para un diagnóstico instantáneo.
Adherencia Arquitectónica Soberana: Cada aparato residirá en su ubicación canónica (FSD/DDD). Las convenciones de nomenclatura y las rutas de importación con alias son inmutables.
Internacionalización (i18n) Nativa: Cero texto hardcodeado. Todos los aparatos de UI serán 100% data-driven, consumiendo su contenido desde un dictionary.
Theming Soberano y Semántico: Cero estilos hardcodeados. El estilo será controlado exclusivamente a través de variables CSS semánticas.
Resiliencia y Guardianes de Contrato: Cada aparato estará blindado con guardianes de resiliencia (try/catch), validación de props y manejo explícito de estados (carga, error, vacío).
Entrega Atómica y Completa: Cada aparato se entregará de forma granular y completa (sin abreviaciones ...). El código estará en un bloque perfecto y listo para integrar.
Higiene de Código Absoluta: Cero variables, importaciones o parámetros sin usar. El código será prístino.
Documentación Soberana: Cada aparato incluirá documentación TSDoc completa (@file, @description, @version, @author) y JSDoc para funciones y tipos exportados.
Inteligencia Comportamental y MEA/UX: Los aparatos de UI serán compatibles con el sistema Nos3 y se inyectará una Experiencia de Usuario Memorable/Adrenalínica (MEA/UX) siempre que sea posible.
