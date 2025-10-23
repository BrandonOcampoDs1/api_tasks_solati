# 🧩 TASKS SOLATI API

Una API RESTful desarrollada en **Laravel 12**, enfocada en la gestión de tareas con autenticación mediante tokens personalizados con seguridad media.  
El proyecto sigue principios **SOLID** y el patrón de diseño **Repository**, con una arquitectura limpia y separada por responsabilidades.

---

## 🚀 Características principales

- **Autenticación por token** (vía `/api/login`).
- CRUD completo de **tareas** (`/api/v1/tasks`).
- **Validaciones estrictas** con `FormRequest`.
- **Middleware** de autenticación personalizada (`ApiTokenAuth`).
- **Patrón Repository** aplicado para separación de lectura/escritura.
- **Respuestas estandarizadas** con `ApiResponse` trait.
- **Frontend básico** en `resources/views` y JS (login + consumo API).

---

## 📥 Descargar Base de Datos

Puedes descargar el archivo de respaldo de la base de datos desde el siguiente enlace:

👉 [Descargar psql_tasks.sql](./database/psql_tasks.sql)

## 🧱 Arquitectura y patrones usados

### 🔹 Patrón MVC + Repository
Eestructura de Laravel (MVC), se desacopla la lógica de negocio con un **servicio** (`TaskService`) y un **Repository**, cumpliendo principios de responsabilidad única.

```
Controller → Service → Repository → Model → Database
```

### 🔹 SOLID aplicado
- **S**ingle Responsibility: cada clase cumple una única función.
- **O**pen/Closed: se pueden extender repositorios sin modificar código existente.
- **L**iskov Substitution: interfaces `TaskReadableInterface` y `TaskWritableInterface` aseguran compatibilidad.
- **I**nterface Segregation: separamos lectura y escritura en interfaces distintas.
- **D**ependency Inversion: los controladores dependen de abstracciones, no implementaciones.

---

## ⚙️ Instalación y configuración
```
Para agilidad use PHP HERD para correr el proyecto, sin embargo se puede usar en la opción que desees
```
### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/BrandonOcampoDs1/api_tasks_solati.git
cd api_tasks_solati
```

### 2️⃣ Instalar dependencias

```bash
composer install
npm install
```

### 3️⃣ Configurar entorno

```bash
cp .env.example .env
php artisan key:generate
```

Configura la conexión a base de datos en el `.env` (PostgreSQL) PGADMIN 4.

```bash
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=postgres
DB_USERNAME=postgres
DB_PASSWORD=12345678
```

### 4️⃣ Ejecutar migraciones y seeders

```bash
php artisan migrate --seed
```

Esto creará la tabla `api_clients` con usuarios de prueba y `tasks` para gestionar tareas.

### 5️⃣ Iniciar el servidor

```bash
php artisan serve
```

Abre en tu navegador:  
👉 http://api_tasks_solati.test/

---

## 🔐 Autenticación

1️⃣ Entra al frontend en `/` o `/login`.  
2️⃣ Ingresa la **cédula registrada el seeder registra por defecto 123456789**.  
3️⃣ Obtendrás un **token de acceso**.  
4️⃣ Usa ese token en **Postman** para consumir `/api/v1/tasks`.

### Ejemplo de headers en Postman:

```
Authorization: Bearer TU_TOKEN
Content-Type: application/json
Accept: application/json
```

---

## 🧩 Endpoints principales

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/login` | Genera token por cédula |
| GET | `/api/v1/tasks` | Listar todas las tareas |
| POST | `/api/v1/tasks` | Crear nueva tarea |
| PUT | `/api/v1/tasks/{id}` | Actualizar tarea existente |
| DELETE | `/api/v1/tasks/{id}` | Eliminar tarea |

---

## 🧠 Flujo del sistema

1️⃣ **Login** → Valida cédula → Devuelve token.  
2️⃣ **Middleware** (`ApiTokenAuth`) intercepta peticiones → valida token.  
3️⃣ **Controller** invoca al **Service** → este usa los **Repositories**.  
4️⃣ **Repository** accede al modelo y devuelve datos.  
5️⃣ **ApiResponse Trait** unifica estructura de respuesta JSON.

---


## 📦 Tecnologías usadas

- **Laravel 12**
- **PHP 8.2+**
- **PostgreSQL / PGADMIN4**
- **TailwindCSS**
- **JavaScript**
- **SweetAlert2**

---

## 📚 Ejemplo de flujo (desde el login hasta CRUD)

1. Usuario ingresa su **cédula** → `/api/login`
2. Backend responde con su **token**
3. Token se guarda en localStorage → `auth.js`
4. JS usa ese token para interactuar con `/api/v1/tasks`
5. El Middleware valida el token antes de cada operación CRUD

---

## ✨ Autor

**Brandon Steven Ocampo Álvarez**  