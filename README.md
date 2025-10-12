# 🍕 Pizzeria MetaShark - El Sabor del Futuro, Entregado Hoy

![Pizzeria MetaShark Logo Placeholder](https://via.placeholder.com/1200x630/1A202C/FFFFFF?text=Pizzeria%20MetaShark)

**Pizzeria MetaShark** no es solo una aplicación para pedir pizza. Es el prototipo de una plataforma de comercio electrónico de alimentos, diseñada desde el día cero con una arquitectura de élite para garantizar un rendimiento impecable, una experiencia de usuario nativa y una escalabilidad sin precedentes.

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-cyan?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-10-orange?style=for-the-badge&logo=firebase&logoColor=white)](https://firebase.google.com/)
[![DDD](https://img.shields.io/badge/Architecture-DDD-purple?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0wIDE4Yy00LjQxIDAtOC0zLjU5LTgtOHMzLjU5LTggOC04IDggMy41OSA4IDh6bS0xLTguNWg0djJoLTR2LTJ6bS00IDBoNHYyaC00di0yem0yIDJoMnYyaC0ydi0yem0yLTZoMnYyaC0ydi0yeiIvPjwvc3ZnPg==)](https://martinfowler.com/bliki/DomainDrivenDesign.html)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

---

## 📜 Tabla de Contenidos

1.  [🌟 **Visión del Proyecto**](#-visión-del-proyecto)
2.  [🚀 **Funcionalidades Clave (MVP)**](#-funcionalidades-clave-mvp)
3.  [🏗️ **Visión Arquitectónica: Domain-Driven Design (DDD)**](#️-visión-arquitectónica-domain-driven-design-ddd)
4.  [🛠️ **Stack Tecnológico**](#️-stack-tecnológico)
5.  [📚 **Bibliotecas Clave y Su Propósito**](#-bibliotecas-clave-y-su-propósito)
6.  [📈 **Proyección a Futuro (Roadmap)**](#-proyección-a-futuro-roadmap)
7.  [⚙️ **Instalación y Uso Local**](#️-instalación-y-uso-local)
8.  [📄 **Licencia**](#-licencia)

---

## 🌟 Visión del Proyecto

El objetivo es construir una **Progressive Web App (PWA)** que ofrezca a los clientes de una pizzería una experiencia de pedido online superior a la de cualquier competidor. La aplicación debe sentirse nativa, funcionar offline y ser increíblemente rápida.

La arquitectura subyacente está diseñada no solo para una pizzería, sino como la **base de una plataforma multi-restaurante** (estilo iFood/Uber Eats), permitiendo una expansión futura con una fricción técnica mínima.

## 🚀 Funcionalidades Clave (MVP)

La primera versión se centra en una experiencia de cliente completa y pulida:

-   **📱 Interfaz "Mobile-First" y Adaptativa:** Diseño impecable en cualquier dispositivo.
-   **🛒 Menú Dinámico y Pedidos:** Los productos se obtienen en tiempo real desde una base de datos, permitiendo al restaurante gestionar su menú sin tocar el código.
-   **⚡ Experiencia PWA Completa:**
    -   **Instalable:** Se puede añadir a la pantalla de inicio como una aplicación nativa.
    -   **Acceso Offline:** El menú y la estructura de la app son accesibles sin conexión a internet.
    -   **Rendimiento Extremo:** Carga casi instantánea gracias al pre-renderizado de Next.js y estrategias de caché avanzadas.
-   **🟢 Checkout Simplificado por WhatsApp:** El proceso de pedido culmina con un mensaje de WhatsApp pre-rellenado y listo para enviar, agilizando la operación para el MVP.
-   **🔒 Validación de Datos Robusta:** Toda la información, tanto la que viene del backend como la que introduce el usuario, es rigurosamente validada para garantizar la integridad del sistema.

## 🏗️ Visión Arquitectónica: Domain-Driven Design (DDD)

Para garantizar la escalabilidad y mantenibilidad, el proyecto está estructurado siguiendo los principios de DDD y la Arquitectura Limpia (Clean Architecture). La lógica de negocio está completamente aislada de la tecnología.

**La Regla de las Dependencias:** Las flechas solo apuntan hacia adentro. El Dominio (el corazón del negocio) no sabe nada sobre Firebase, React o Next.js.

```mermaid
graph TD
    subgraph A [Capa de Presentación (UI)]
        direction LR
        Next_Pages[Páginas / Server Components] --> React_Components[Componentes de React]
    end

    subgraph B [Capa de Aplicación]
        direction LR
        Use_Cases[Casos de Uso (Ej: get-full-menu)]
    end

    subgraph C [Capa de Dominio (Núcleo del Negocio)]
        direction LR
        Entities[Entidades (Ej: MenuItem, Order)] --> Repositories[Interfaces de Repositorio (Ej: IMenuRepository)]
    end

    subgraph D [Capa de Infraestructura]
        direction LR
        Firebase_Repo[FirebaseRepository] --> Firebase_SDK[Firebase SDK]
        Next_API[Next.js API Routes]
    end

    A -- Llama a --> B
    B -- Orquesta --> C
    D -- Implementa --> Repositories

    style C fill:#333,stroke:#A68B5C,stroke-width:3px,color:#fff
Esta separación nos permite cambiar la base de datos, el framework de UI o cualquier detalle de infraestructura sin afectar la lógica de negocio, preparando el terreno para una evolución a microservicios en el futuro.
🛠️ Stack Tecnológico
Tecnología	Propósito
Next.js	Framework de React: SSR y SSG para un rendimiento y SEO de élite. App Router para una estructura moderna.
React	Biblioteca de UI: Para construir interfaces de usuario declarativas y componentizadas.
TypeScript	Superset de JavaScript: Tipado estático para un código robusto, escalable y libre de errores comunes.
Tailwind CSS	Framework de CSS "Utility-First": Permite construir diseños complejos rápidamente y de forma consistente.
Firebase	Backend-as-a-Service (BaaS): Provee la base de datos en tiempo real (Firestore) para el MVP.
Vercel	Plataforma de Despliegue: Optimización y despliegue continuo de clase mundial para proyectos Next.js.
📚 Bibliotecas Clave y Su Propósito
Biblioteca	Propósito

Zod	Validación de Esquemas: Nuestro "guardia de seguridad" para garantizar la integridad de los datos.

Tailwind Merge	Utilidad de Estilos: Combina clases de Tailwind de forma inteligente sin conflictos.

Tailwindcss Animate	Plugin de Animaciones: Integra animaciones predefinidas y personalizables fácilmente.]

TSX	Ejecutor de TypeScript: Permite ejecutar scripts de TS (como el de seeding) directamente.

📈 Proyección a Futuro (Roadmap)
La arquitectura actual es la Fase 1 de un plan mucho más grande.


graph TD
    subgraph Phase1 [Fase 1: PWA para Cliente (MVP)]
        PWA[Cliente PWA] --> FB[Firebase]
    end

    subgraph Phase2 [Fase 2: Panel de Gestión]
        AdminPanel[Panel del Restaurante] -- Gestiona --> FB
    end

    subgraph Phase3 [Fase 3: Plataforma Multi-App]
        CustomBackend[Backend Dedicado (Node.js/Go)]
        DeliveryApp[App de Repartidores] --> CustomBackend
        PWA -- Migra a --> CustomBackend
        AdminPanel -- Migra a --> CustomBackend
    end

    Phase1 --> Phase2 --> Phase3


Fase 1: MVP (Actual): PWA funcional para el cliente, conectada a Firebase, con checkout por WhatsApp.

Fase 2: Panel de Gestión: Creación de una aplicación web separada para que el personal del restaurante gestione pedidos, actualice el menú y vea estadísticas en tiempo real.

Fase 3: Ecosistema de Plataforma: Migración a un backend propio y robusto, y desarrollo de nuevas aplicaciones, como la app para repartidores y un panel de administración central para la plataforma.

⚙️ Instalación y Uso Local
Sigue estos pasos para levantar el proyecto en tu entorno de desarrollo.
Clonar el repositorio:


git clone https://github.com/tu-usuario/pizzeria-metashark.git

cd pizzeria-metashark

Instalar dependencias:
code
Bash
npm install
Configurar Variables de Entorno:
Crea un archivo .env.local en la raíz del proyecto.
Copia el contenido de .env.example (si existe) o usa la siguiente plantilla, rellenando con tus claves de Firebase:
code
Env
# Firebase Config
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSy...xxxxxxxxxxxx"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="tu-proyecto.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="tu-proyecto"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="tu-proyecto.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="1234567890"
NEXT_PUBLIC_FIREBASE_APP_ID="1:1234567890:web:...

Poblar la Base de Datos (Seeding):
Ejecuta el script de seeding para llenar tu Firestore con los productos del menú.

Bash
npm run db:seed
Iniciar el servidor de desarrollo:

Bash
npm run dev

Abre http://localhost:3000 en tu navegador para ver la aplicación en acción.

### ⚙️ Manifiesto de Configuración por Entorno

La configuración de una aplicación es todo aquello que puede variar entre despliegues. Para adherirnos a las mejores prácticas de la industria (principios de Twelve-Factor App), este proyecto sigue un estricto manifiesto de configuración.

#### Las Reglas de Oro

1.  **Separación Estricta de Código y Configuración:** El código base es idéntico en todos los entornos. El comportamiento específico de un entorno (desarrollo, producción) se controla **exclusivamente** a través de variables de entorno.
2.  **Fuente Única de Verdad (`.env`):** Todas las variables de configuración deben residir en archivos `.env`. Las claves secretas (`.env.local`) **NUNCA** deben ser versionadas en el control de código fuente (Git).
3.  **Prefijo `NEXT_PUBLIC_` para Exposición al Cliente:** Cualquier variable que necesite ser accesible desde el navegador **DEBE** comenzar con el prefijo `NEXT_PUBLIC_`. Las variables sin este prefijo solo son accesibles en el lado del servidor, protegiendo así la información sensible.
4.  **Variables Explícitas y Descriptivas:** Los nombres de las variables deben ser claros y autoexplicativos (ej. `MAINTENANCE_MODE` en lugar de `MM`).

📄 Licencia
Este proyecto está "UNLICENSED"
