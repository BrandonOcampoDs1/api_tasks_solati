# ApiRestFull Tareas

API RESTful para la gestión de tareas (CRUD) desarrollada en **PHP**, siguiendo principios **SOLID** y una arquitectura limpia basada en capas **Services** y **Repositories**.  
El proyecto implementa el patrón **MVC**, validaciones de datos, manejo adecuado de errores y persistencia en **PostgreSQL**, priorizando buenas prácticas de diseño, escalabilidad y mantenibilidad del código.

---

## 🧩 Arquitectura General

- **Controller:** Recibe las solicitudes HTTP, coordina con la capa de servicio y devuelve las respuestas en formato JSON.  
- **Service:** Contiene la lógica de negocio (por ejemplo, crear, actualizar o marcar una tarea como completada).  
- **Repository (DAO):** Gestiona la comunicación directa con la base de datos (consultas, inserts, updates y deletes en PostgreSQL).  
- **Model:** Define la estructura de la entidad `Task` y sus propiedades (id, título, descripción, estado).

---