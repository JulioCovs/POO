Backend para Herramienta Web de Operaciones Aritméticas
Este repositorio contiene el backend para la herramienta web educativa destinada a ayudar a estudiantes a resolver operaciones aritméticas básicas y acceder a recursos de aprendizaje.
Tecnologías Utilizadas

Node.js: Entorno de ejecución para JavaScript
Express.js: Framework web para Node.js
JWT: Para autenticación de usuarios
bcryptjs: Para hash de contraseñas
Cors: Para manejo de Cross-Origin Resource Sharing

Estructura del Proyecto
backend/
│
├── config/               # Configuración de la aplicación
├── controllers/          # Controladores para la lógica de negocio
│   ├── operationsController.js    # Controlador para operaciones aritméticas
│   ├── resourcesController.js     # Controlador para recursos educativos
│   └── usersController.js         # Controlador para sistema de usuarios
│
├── models/               # Modelos de datos (para implementación con DB)
├── routes/               # Definición de rutas API
│   ├── operations.js     # Rutas para operaciones aritméticas
│   ├── resources.js      # Rutas para recursos educativos
│   └── users.js          # Rutas para sistema de usuarios
│
├── .env.example          # Plantilla para variables de entorno
├── package.json          # Dependencias del proyecto
├── server.js             # Punto de entrada del servidor
└── README.md             # Este archivo
API Endpoints
Operaciones Aritméticas

POST /api/operations/calculate - Calcular resultado de operación aritmética

Recursos Educativos

GET /api/resources/videos - Obtener videos por categoría/dificultad
GET /api/resources/activities - Obtener actividades interactivas

Usuarios (Opcional)

POST /api/users/register - Registrar nuevo usuario
POST /api/users/login - Iniciar sesión
GET /api/users/progress - Obtener progreso del usuario (protegido)
PUT /api/users/progress - Actualizar progreso del usuario (protegido)

Requisitos

Node.js >= 14.0.0
npm >= 6.0.0

Instalación

Clonar el repositorio:
bashgit clone <url-del-repositorio>
cd <nombre-del-repositorio>

Instalar dependencias:
bashnpm install

Configurar variables de entorno:
bashcp .env.example .env
# Editar .env con los valores correspondientes

Iniciar el servidor:
bash# Para desarrollo
npm run dev

# Para producción
npm start


Despliegue
Opción 1: GitHub Pages + Serverless

Para el frontend: Seguir la guía de despliegue de GitHub Pages
Para el backend: Convertir las funciones a formato serverless y desplegar en Netlify o Vercel

Opción 2: Replit

Subir el código a Replit y configurar según la documentación

Testing
Para ejecutar las pruebas:
bashnpm test
Contribución

Crear una rama para tu funcionalidad (git checkout -b feature/nueva-funcionalidad)
Hacer commit de tus cambios (git commit -m 'Agregar nueva funcionalidad')
Push a la rama (git push origin feature/nueva-funcionalidad)
Crear un Pull Request

Licencia
MIT

Desarrollado por el Equipo 5 - UANL - Taller de Programación Orientada a Objetos