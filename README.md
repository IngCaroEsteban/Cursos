# 🎓 Sistema de Gestión Educativa

Aplicativo para la gestión de cursos y lecciones, desarrollado como un sistema completo de gestión educativa.

## 🌟 Visión General

Esta aplicación permite gestionar cursos y sus respectivas lecciones de manera eficiente. Se desarrolló utilizando una arquitectura moderna y escalable, con un backend en Django REST Framework y un frontend en Angular. El sistema implementa principios de diseño como **Clean Code** y **SOLID**, asegurando una separación clara entre la lógica de negocio y la presentación.

Se utilizó Docker Compose para orquestar los servicios, facilitando el despliegue y pruebas locales consistentes.

---

## 💡 Arquitectura y Tecnologías

- **Backend Django REST Framework**: Framework robusto y maduro para APIs RESTful.
    - **Models**: Define las entidades y reglas del negocio.
    - **Views**: Implementa la lógica de negocio y manejo de peticiones.
    - **Serializers**: Maneja la serialización/deserialización de datos.
    - **URLs**: Define las rutas de la API.
- **Frontend Angular**: Framework completo para aplicaciones web modernas.
    - **Components**: Componentes reutilizables y modulares.
    - **Services**: Servicios para manejo de estado y comunicación con el backend.
    - **Routing**: Navegación entre vistas.
- **Bootstrap**: Framework CSS para diseño responsive y moderno.
- **Docker Compose**: Para orquestar servicios de PostgreSQL + Backend + Frontend.
- **PostgreSQL**: Base de datos relacional robusta y escalable.

---

## 🚀 Guía de Instalación y Despliegue

1. **Clona el repositorio**:

```bash
git clone <https://github.com/IngCaroEsteban/Cursos.git>
cd <nombre-del-directorio>
```

2. **Levanta los contenedores**:

```bash
docker-compose up --build -d
```

3. **Accede a la Aplicación**:

- Frontend: [http://localhost:4200](http://localhost:4200)
- Backend API: [http://localhost:8000/api](http://localhost:8000/api)

---

## 🔌 Documentación de la API

### 📚 Gestión de Cursos

- `GET /api/cursos/`  
  Lista todos los cursos.

- `POST /api/cursos/`  
  Crea un nuevo curso.  
  Requiere: `titulo`, `descripcion`, `instructor`.

- `GET /api/cursos/{id}/`  
  Obtiene los detalles de un curso.

- `PUT /api/cursos/{id}/`  
  Actualiza un curso existente.

- `DELETE /api/cursos/{id}/`  
  Elimina un curso.

---

### 📺 Gestión de Lecciones

- `GET /api/leccion/`  
  Lista todas las lecciones.

- `POST /api/leccion/`  
  Crea una nueva lección.  
  Requiere: `titulo`, `descripcion`, `video_url`, `curso`.

- `GET /api/leccion/{id}/`  
  Obtiene una lección específica.

- `PUT /api/leccion/{id}/`  
  Actualiza una lección.

- `DELETE /api/leccion/{id}/`  
  Elimina una lección.

---

## 📁 Organización del Código

```
.
├── backend
│   ├── api/            # Aplicación principal de Django
│   │   ├── models.py   # Modelos de datos
│   │   ├── views.py    # Vistas y lógica de negocio
│   │   ├── urls.py     # Configuración de URLs
│   │   └── serializers.py # Serializadores
│   ├── core/           # Configuración del proyecto
│   └── requirements.txt # Dependencias de Python
└── frontend
    └── src
        ├── app/        # Componentes y servicios
        │   ├── components/ # Componentes de la aplicación
        │   ├── services/   # Servicios para API
        │   └── models/     # Interfaces y tipos
        ├── assets/     # Recursos estáticos
        └── styles/     # Estilos globales
```

---

## 🛠️ Stack Tecnológico

- **Backend**:
  - Django
  - Django REST Framework
  - PostgreSQL
  - Docker

- **Frontend**:
  - Angular
  - Bootstrap
  - TypeScript
  - HTML5/CSS3

- **DevOps**:
  - Docker
  - Docker Compose
  - Git

---

## 📝 Características y Consideraciones

- El sistema utiliza Bootstrap para un diseño responsive y moderno.
- Los videos de las lecciones se integran mediante URLs de YouTube.
- La aplicación implementa validaciones tanto en frontend como en backend.
- Se utiliza TypeScript para un desarrollo más robusto y mantenible.
