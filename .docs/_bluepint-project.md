Blueprint Maestro: Pizzeria MetaShark - v1.0
Fecha de Creación: 11 de Octubre de 2025
Autores: IA Gemini & El Arquitecto del Proyecto
Estado: Activo

SECCIÓN 1: VISIÓN Y MANIFIESTO
1.1. Propósito de este Documento
Este Blueprint es la Única Fuente de la Verdad (SSoT) para el proyecto Pizzeria MetaShark. Su propósito es definir de manera inequívoca los pilares filosóficos, arquitectónicos y técnicos sobre los cuales se construirá esta aplicación de élite. Sirve como guía para todas las decisiones de desarrollo, asegurando que cada línea de código contribuya a la visión a largo plazo.

1.2. Manifiesto del Proyecto: Los 4 Pilares
Éxito Mundial como Premisa: No estamos construyendo una web. Estamos construyendo el prototipo de una plataforma global. Cada decisión técnica debe responder a la pregunta: ¿Esto escalará a un millón de usuarios y mil restaurantes?

La Arquitectura es la Estrategia: El código de negocio (Dominio) es el activo más valioso. Debe ser puro, agnóstico a la tecnología y estar protegido de los detalles de implementación (frameworks, bases de datos). La tecnología es una herramienta desechable; la lógica de negocio es el imperio.

Experiencia de Usuario Nativa: La aplicación debe ser indistinguible de una app nativa. Rendimiento instantáneo, funcionamiento offline y una interfaz pulida no son lujos, son el estándar mínimo.
Calidad de Código No Negociable: Automatizamos la calidad a través de linters, formateadores y tipado estricto. Un entorno de desarrollo limpio y sin advertencias es el reflejo de una mente de ingeniería clara y enfocada.

1.3. Fusión Inspiradora: El ADN de los Proyectos Anteriores
Pizzeria MetaShark nace de la síntesis de dos proyectos predecesores, tomando lo mejor de cada uno para crear una entidad superior:
De resturant-pizza (El Cerebro):
La Lógica de Negocio: Heredamos el modelo conceptual de Productos, Órdenes y Usuarios.
La Base Arquitectónica: Adoptamos y elevamos su enfoque en la separación de responsabilidades, formalizándolo en una arquitectura DDD estricta.
La Conexión al Backend: Su uso de Firebase como un BaaS (Backend-as-a-Service) es el punto de partida perfecto para nuestro MVP.

De napoli (El Alma):
La Estética de Élite: Heredamos su dirección de arte: un diseño oscuro, elegante, con tipografía audaz y una paleta de colores cálida y profesional.
Los Patrones de UI/UX: Adoptamos su layout de "pantalla dividida", el diseño de sus componentes visuales (Card, NavigationFooter) y su enfoque en el impacto visual.

El Stack Frontend Moderno: Su elección de Next.js con App Router y Tailwind CSS es ratificada como la base de nuestra capa de presentación.

SECCIÓN 2: ARQUITECTURA DE SOFTWARE - EL PILAR DE LA ESCALABILIDAD
2.1. Arquitectura de Dominio (Domain-Driven Design)
El proyecto está rigurosamente estructurado siguiendo los principios de Domain-Driven Design (DDD) y la Arquitectura Limpia. Esto garantiza que la lógica de negocio esté aislada y sea el centro del universo de la aplicación.

La Regla de Oro de las Dependencias: Todas las dependencias apuntan hacia el centro (Dominio). La infraestructura depende del dominio, no al revés.

Mermaid
graph TD
    subgraph A [Capa de Presentación (UI)]
        direction LR
        Next_Pages[Páginas / Server Components] --> React_Components[Componentes React (UI Pura)]
    end

    subgraph B [Capa de Aplicación]
        direction LR
        Use_Cases[Casos de Uso (Orquestadores)]
    end

    subgraph C [Capa de Dominio (Núcleo del Negocio)]
        direction LR
        Entities[Entidades y Value Objects] --> Schemas[Esquemas de Validación (Zod)] --> Interfaces[Interfaces de Repositorio]
    end

    subgraph D [Capa de Infraestructura]
        direction LR
        Firebase_Repo[Implementación de Repositorio (Firebase)] --> Firebase_SDK[SDKs Externos (Firebase)]
        External_Services[Servicios Externos (WhatsApp)]
    end

    A -- Llama a --> B
    B -- Usa --> Interfaces
    D -- Implementa --> Interfaces
    B -- No conoce --> D
    C -- No conoce --> A, B, D

    style C fill:#333,stroke:#FFC107,stroke-width:4px,color:#fff
Beneficio Estratégico: Esta separación nos permitirá en el futuro reemplazar Firebase por un backend propio, añadir una app de repartidores o crear un panel de administración como módulos independientes que interactúan con el mismo Dominio, sin necesidad de reescribir la lógica de negocio central.

2.2. Estructura de Directorios (Árbol de Élite)
La estructura de carpetas refleja directamente la arquitectura DDD.
code
Code
/
├── .docs/                # Documentación, manifiestos y blueprints.
├── scripts/              # Scripts de utilidad (ej. seeding de la BD).
├── src/
│   ├── app/              # Rutas de Next.js (Capa de Presentación).
│   ├── components/       # Componentes de React.
│   │   ├── business/     # Componentes con lógica de negocio de UI (ej. ProductCard).
│   │   ├── layout/       # Componentes estructurales (MainLayout, Header).
│   │   └── ui/           # "Lego Bricks" puros y reutilizables (Card, Button).
│   │
│   ├── menu/             # BOUNDED CONTEXT: Todo lo relacionado con el menú.
│   │   ├── application/  # Casos de Uso (GetFullMenu).
│   │   ├── domain/       # Lógica de Negocio Pura (MenuItem, IMenuRepository, MenuItemSchema).
│   │   └── infrastructure/ # Implementación técnica (FirebaseMenuRepository).
│   │
│   ├── ordering/         # BOUNDED CONTEXT: Todo sobre el proceso de pedido (Futuro).
│   │
│   └── shared/           # Código compartido entre contextos.
│       └── infrastructure/ # Configuración de herramientas (ej. conexión a Firebase).
│
├── .env.local            # Variables de entorno locales (NUNCA en Git).
├── tailwind.config.ts    # Configuración del Sistema de Diseño.
└── package.json          # Manifiesto de dependencias.

SECCIÓN 3: STACK TECNOLÓGICO Y BIBLIOTECAS
La selección de cada herramienta ha sido deliberada para cumplir con los pilares del manifiesto: rendimiento, escalabilidad y calidad.

3.1. Stack Principal
Tecnología	Versión	Rol Estratégico
Next.js	~14.2	Motor del Frontend. Se utiliza por su renderizado híbrido (SSR/SSG), optimizaciones automáticas y su ecosistema robusto con Vercel. El App Router es la base de nuestra arquitectura de UI.
React	~18.0	Biblioteca de UI. La base para construir nuestra interfaz de usuario componentizada y declarativa.
TypeScript	~5.0	Superset de JavaScript. No negociable. Provee tipado estático para eliminar clases enteras de errores, facilitar el refactor y permitir un escalado seguro del equipo de desarrollo.
Tailwind CSS	~3.4	Motor del Sistema de Diseño. Se eligió la versión 3 (estable) por su madurez y ecosistema. Su enfoque "utility-first" y su configuración basada en variables CSS nos dan velocidad y consistencia.
Firebase	~10.12	Backend para el MVP. Firestore nos provee una base de datos NoSQL, en tiempo real y escalable sin la necesidad de gestionar servidores. Es el andamio perfecto para validar el modelo de negocio.
PNPM	~10.11	Gestor de Paquetes. Se prefiere sobre NPM/Yarn por su eficiencia en el uso de disco y velocidad de instalación, gracias a su sistema de node_modules no planos. Fomenta un entorno de desarrollo más rápido.
Vercel	N/A	Plataforma de Despliegue. El hogar natural de Next.js. Nos proporciona despliegues atómicos, una CDN global y CI/CD integrado directamente con nuestro repositorio de Git.
Zustand para la persistencia de estados y relacionados.

3.2. Bibliotecas de Soporte Clave
Biblioteca	Rol en el Ecosistema
Zod	Guardián del Dominio. Valida todos los datos que entran y salen de la aplicación, garantizando la integridad de la lógica de negocio. Es nuestra primera línea de defensa contra datos corruptos.
ESLint	Inspector de Calidad de Código. Configurado con reglas estrictas para TypeScript, React y Next.js, asegura que todo el código cumpla con las mejores prácticas y previene errores comunes.
Prettier	Estilista de Código Automático. Elimina el debate sobre el formato del código. Mantiene una consistencia visual absoluta en toda la base de código, sin importar quién la escriba.
TSX	Ejecutor de Scripts de Alto Nivel. Permite ejecutar nuestros scripts de mantenimiento (como el seeding) escritos en TypeScript directamente, sin pasos de compilación intermedios.
Tailwind Merge	Fusionador de Clases Inteligente. Utilidad esencial para crear componentes de UI reutilizables, permitiendo la sobreescritura y combinación de clases de Tailwind sin conflictos.
Tailwindcss Animate	Plugin de Animaciones. Provee una forma declarativa y consistente de añadir micro-interacciones y animaciones, alineado con nuestro sistema de diseño.

SECCIÓN 4: EL SISTEMA DE DISEÑO (TAILWIND CSS)
Nuestro sistema de diseño es una implementación directa de nuestro manifiesto: una SSoT visual basada en tokens.

4.1. Filosofía y Flujo
El flujo de un estilo es unidireccional y predecible, garantizando el control centralizado.

Mermaid
graph TD
    A["<b>1. Definición de Tokens</b><br/><code>src/app/globals.css</code><br/>Se definen todas las variables CSS (<code>--primary</code>, <code>--background</code>, etc.) para el tema por defecto (oscuro)."]
    B["<b>2. Configuración de Tailwind</b><br/><code>tailwind.config.ts</code><br/>Se leen las variables CSS y se mapean a las utilidades de Tailwind (ej. <code>bg-primary</code>)."]
    C["<b>3. Consumo en Componentes</b><br/><code>src/components/**/*.tsx</code><br/>Los componentes usan exclusivamente las utilidades semánticas (<code>bg-primary</code>), nunca colores literales."]

    A --> B --> C

4.2. Paleta de Colores Semántica
La paleta se inspira en el proyecto "Napoli", priorizando un tema oscuro, elegante y con acentos cálidos.
Token Semántico	Valor (Variable CSS)	Propósito Estratégico
bg-background	hsl(var(--background))	El color de fondo principal de toda la aplicación.
text-foreground	hsl(var(--foreground))	El color del texto principal.
bg-card / text-card-fg	hsl(var(--card))	Colores para superficies elevadas como tarjetas o modales.
bg-primary / text-primary-fg	hsl(var(--primary))	El color de la marca. Para botones, enlaces y acentos.
border	hsl(var(--border))	El color para bordes y separadores sutiles.
ring	hsl(var(--ring))	El color del anillo de enfoque (focus-visible).

4.3. Tipografía
Heredamos y formalizamos el sistema de fuentes de los proyectos anteriores para una jerarquía visual clara.
font-sans (Roboto): Utilizada para todo el texto de la interfaz, párrafos y elementos funcionales. Optimizada para la legibilidad.
font-serif (Dancing Script): Utilizada exclusivamente para títulos principales y elementos de marca de alto impacto. Aporta personalidad y elegancia.

SECCIÓN 5: PREFERENCIAS Y CONVENCIONES DE CÓDIGO
Esta sección captura las preferencias implícitas del arquitecto para garantizar la consistencia.
Nomenclatura:
Archivos: kebab-case.ts (ej. get-full-menu.ts).
Componentes: PascalCase.tsx (ej. ProductCard.tsx).
Variables y Funciones: camelCase.
Comentarios: Se fomenta el uso de comentarios JSDoc para explicar el "porqué" de un bloque de código, no el "qué". Cada archivo debe tener un comentario de encabezado siguiendo el formato establecido.
Importaciones: Se deben agrupar y ordenar: 1. Librerías externas, 2. Alias de importación (@/), 3. Importaciones relativas (../).
Formato de Código: No hay debate. La configuración de Prettier es la ley. Se debe usar el script npm run format o configurar el formateo al guardar en el editor.
Lógica de Negocio: Toda la lógica de negocio pura (cálculos, validaciones complejas, reglas de estado) DEBE residir dentro de las clases de Entidad en la capa de Dominio. Los Casos de Uso son solo orquestadores.

SECCIÓN 6: LÓGICA DE NEGOCIO Y BOUNDED CONTEXTS
La complejidad de la plataforma se gestiona dividiendo el sistema en "Bounded Contexts" claros, cada uno con su propio vocabulario y responsabilidades.
6.1. Bounded Context: Menu (Implementado)
Responsabilidad: Es la fuente única de la verdad para todo lo relacionado con los productos que se pueden vender.
Entidades Clave:
MenuItem: Representa un producto individual (una pizza, una bebida). Contiene sus propiedades (nombre, precio) y lógica de negocio asociada (ej. formateo de precios).

Casos de Uso (MVP):
GetFullMenu: Obtiene la lista completa de todos los productos disponibles.
GetMenuItemById: Obtiene los detalles de un producto específico.
Flujo de Datos: Las páginas (Server Components) llaman al caso de uso, que utiliza la IMenuRepository para solicitar los datos. La implementación FirebaseMenuRepository traduce esta solicitud en una consulta a la colección products en Firestore.

6.2. Bounded Context: Ordering (Diseño Futuro)
Responsabilidad: Gestiona el ciclo de vida de un pedido, desde la creación del carrito hasta la confirmación final.

Entidades Clave:
Order (Aggregate Root): Representa el pedido completo de un cliente. Contiene una lista de OrderItems.
OrderItem: Un ítem dentro del pedido (ej. 2 pizzas Margherita). Contiene una referencia al MenuItem y la cantidad.
Customer: Representa al cliente que realiza el pedido.

Casos de Uso Futuros:
AddItemToActiveOrder: Añade un producto al carrito del usuario.
UpdateOrderItemQuantity: Modifica la cantidad de un producto en el carrito.
PlaceOrder: Finaliza el pedido y lo marca para su procesamiento.
GetOrderHistory: Obtiene la lista de pedidos pasados de un usuario.
Reglas de Negocio a Implementar:
Un usuario solo puede tener una "orden activa" (carrito) a la vez.
El precio total del pedido se calcula automáticamente y no puede ser modificado externamente.
No se pueden añadir productos que no existan en el Bounded Context de Menu.

6.3. Bounded Context: Delivery (Proyección a Futuro)
Responsabilidad: Gestionará la logística de entrega. Este contexto nacerá cuando integremos la app de repartidores.
Entidades Clave:
DeliveryJob: Un trabajo de entrega asociado a una Order.
Driver: Un repartidor.
Route: La ruta optimizada para la entrega.
Comunicación entre Contextos: Este contexto se activará mediante eventos. Cuando una Order en el contexto de Ordering se marca como "Lista para entregar", se emitirá un evento OrderReadyForPickup que creará un nuevo DeliveryJob.

SECCIÓN 7: PROYECCIÓN A FUTURO Y HOJA DE RUTA (ROADMAP)
La arquitectura actual es la base para las siguientes fases de expansión.

Mermaid
graph TD
    subgraph "Fase 1: MVP - PWA para Cliente (Actual)"
        A[PWA del Cliente] --> B{Firebase Firestore}
        C[Seeding Manual] --> B
        D[Checkout vía WhatsApp]
        A --> D
    end

    subgraph "Fase 2: Plataforma Operativa"
        E[Panel de Gestión para Restaurante] -- Lee/Escribe --> B
        F[Sistema de Autenticación de Empleados] --> E
        G[Gestión de Menú desde UI] --> B
        H[Dashboard de Pedidos en Tiempo Real] --> B
    end

    subgraph "Fase 3: Ecosistema de Delivery"
        I[Backend Dedicado (Node.js/Go)]
        J[Migración de Datos: Firebase a Backend]
        K[App de Repartidores (React Native/Flutter)] --> I
        L[Sistema de Tracking GPS en Tiempo Real] --> I
        M[Pasarela de Pagos Online]
        A -- Refactoriza API a --> I
        E -- Refactoriza API a --> I
        A --> M
    end

    A --> E
    E --> I


Fase 1 (Completada en MVP): Establecer la PWA para el cliente con la lógica de menú conectada a Firebase. Proceso de pedido finaliza con un "escape" a WhatsApp. Base de datos poblada con scripts manuales.
Fase 2 (Siguiente Paso Inmediato): Desarrollar una aplicación web separada (protegida por login) para el personal del restaurante. Esta app les permitirá:

Ver los pedidos entrantes en tiempo real.
Gestionar el menú (añadir/editar/eliminar productos) sin tocar la base de datos a mano.
Cambiar el estado de un pedido (Recibido, En preparación, Listo).

Fase 3 (Expansión a Plataforma):
Construir un Backend Dedicado: Reemplazar la dependencia directa de Firebase en el frontend por un backend propio que actúe como intermediario. Esto nos da control total sobre la lógica y la seguridad.
Integrar Pasarela de Pagos: Implementar pagos con tarjeta directamente en la PWA.
Desarrollar la App de Repartidores: Crear una app móvil para que los repartidores puedan aceptar y gestionar trabajos de entrega, con tracking GPS.

SECCIÓN 8: GUÍA DE INICIO RÁPIDO Y SCRIPTS
8.1. Configuración del Entorno
Clonar: git clone https://github.com/tu-usuario/pizzeria-metashark.git
Instalar: cd pizzeria-metashark && npm install (o pnpm install).
Configurar Claves: Crear .env.local a partir de .env.example y añadir las claves de Firebase.

8.2. Scripts Esenciales del package.json
Comando	Descripción
npm run dev	Inicia el servidor de desarrollo en localhost:3000.
npm run build	Compila la aplicación para producción.
npm run lint	Ejecuta ESLint para analizar el código en busca de errores y problemas de calidad.
npm run format	Ejecuta Prettier para formatear automáticamente todo el código del proyecto.
npm run db:seed	¡Crítico! Limpia la colección products en Firestore y la puebla con los datos de scripts/seed-data.ts.

---


