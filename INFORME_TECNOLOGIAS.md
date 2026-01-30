# INFORME TÉCNICO DE TECNOLOGÍAS - GYMAI COACH

Este informe detalla el stack tecnológico (tecnologías utilizadas) para el desarrollo de la aplicación web GymAI Coach, dividida en Frontend, Backend y Servicios de Infraestructura.

---

### **1. FRONTEND (Interfaz de Usuario)**
El frontend ha sido desarrollado bajo un enfoque de **SPA (Single Page Application)** moderno, priorizando la velocidad y la experiencia de usuario (UX) premium.

*   **React (v18.2):** Biblioteca principal de JavaScript para la construcción de interfaces basadas en componentes. Permite una actualización eficiente de la interfaz sin recargar la página.
*   **Vite:** Herramienta de construcción (build tool) ultra rápida que gestiona el entorno de desarrollo y la compilación final del proyecto.
*   **Tailwind CSS:** Framework de diseño basado en utilidades para proporcionar estilos personalizados, glassmorphism y una interfaz responsiva adaptable a móviles y escritorio.
*   **React Router DOM (v6):** Sistema de enrutamiento para la navegación entre las diferentes secciones (Dashboard, Perfil, Chat IA, etc.).
*   **Recharts:** Biblioteca de visualización de datos utilizada para generar los gráficos dinámicos de constancia y rendimiento.
*   **Lucide React:** Set de iconos premium vectoriales para mejorar la navegación visual y estética del sistema.

---

### **2. BACKEND (Lógica de Negocio)**
El backend gestiona la comunicación con la base de datos y la integración con modelos de lenguaje.

*   **Node.js & Express:** Entorno de ejecución y framework web utilizado para construir la API REST que comunica el frontend con la lógica del servidor.
*   **OpenAI API:** Integración con modelos de lenguaje avanzados (GPT) para proporcionar la funcionalidad del "Coach IA" (generación de rutinas y consultas).
*   **CORS:** Middleware para permitir de forma segura las peticiones desde el dominio del frontend hacia el servidor de API.
*   **Dotenv:** Gestión segura de variables de entorno y claves de API.

---

### **3. INFRAESTRUCTURA Y SERVICIOS (BaaS & PaaS)**
Se utiliza un enfoque de **Backend as a Service (BaaS)** y **Platform as a Service (PaaS)** para maximizar la seguridad y escalabilidad garantizando que la aplicación esté disponible 24/7.

*   **Supabase (PostgreSQL):** Base de datos relacional de alto rendimiento utilizada para almacenar perfiles de usuario, rutinas, historiales y métricas.
*   **Supabase Auth:** Sistema de autenticación robusto que gestiona el registro de usuarios, login seguro y recuperación de contraseñas.
*   **Supabase Storage (Buckets):** Servicio de almacenamiento de objetos utilizado para guardar de forma segura las "Progress Photos" (Selfies) de los usuarios.
*   **Railway:** Plataforma de despliegue PaaS utilizada para el hosting del **servidor Backend (Node.js/Express)**, permitiendo que la API y la IA estén siempre activas y accesibles.
*   **Vercel:** Plataforma Cloud utilizada para el despliegue dinámico y hosting de la **aplicación Frontend (React)**, permitiendo actualizaciones continuas mediante la integración con Git.
*   **GitHub:** Servicio de hosting para el control de versiones, facilitando la integración continua (CI/CD) con Vercel y Railway para despliegues automáticos.

---

### **4. HERRAMIENTAS DE DESARROLLO**
*   **Git & GitHub:** Control de versiones para el seguimiento de cambios y colaboración.
*   **ESLint:** Herramienta de análisis estático de código para asegurar la calidad y buenas prácticas en JavaScript.
*   **PostCSS & Autoprefixer:** Procesamiento de CSS para asegurar compatibilidad total con todos los navegadores modernos.
