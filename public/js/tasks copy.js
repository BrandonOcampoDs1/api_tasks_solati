let TOKEN = localStorage.getItem("api_token");

if (!TOKEN) {
    const identifier = prompt("Por favor, ingresa tu cédula:");
    if (identifier) {
        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ identifier }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.token) {
                    TOKEN = data.token;
                    localStorage.setItem("api_token", TOKEN);
                    Swal.fire({
                        icon: "success",
                        title: "¡Token obtenido!",
                        text: "Ya puedes usar la app",
                        timer: 1500,
                        showConfirmButton: false,
                    });
                    fetchTasks(); // ahora sí carga
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Cédula no válida",
                    });
                }
            });
    }
}

const taskForm = document.getElementById("taskForm");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");
const API_URL = "/api/v1/tasks";

// 🚀 Fetch y mostrar tareas
const fetchTasks = async () => {
    try {
        const res = await fetch(API_URL, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${TOKEN}`,
            },
        });

        if (!res.ok) {
            // Si la API devuelve un error 401, 403, etc.
            if (res.status === 401) {
                Swal.fire({
                    icon: "warning",
                    title: "Token inválido o expirado",
                    text: "Por favor, vuelve a iniciar sesión.",
                });
                localStorage.removeItem("api_token");
                return;
            }

            throw new Error("Error al obtener tareas");
        }

        const json = await res.json();
        const tasks = json.data || [];

        // Limpiar contenedores
        pendingTasks.innerHTML = "";
        completedTasks.innerHTML = "";

        if (tasks.length === 0) {
            // ✅ Mensaje si no hay tareas, sin error
            pendingTasks.innerHTML = `
                <p class="text-center text-gray-500 italic mt-4">No hay tareas registradas.</p>
            `;
            completedTasks.innerHTML = `
                <p class="text-center text-gray-500 italic mt-4">No hay tareas completadas.</p>
            `;
            return;
        }

        // ✅ Renderizar tareas
        tasks.forEach((task) => {
            const taskEl = document.createElement("div");
            taskEl.className =
                "bg-gray-50 p-4 rounded-2xl shadow flex justify-between items-center cursor-grab task-draggable";
            taskEl.setAttribute("draggable", "true");
            taskEl.dataset.id = task.id;
            taskEl.dataset.status = task.status;

            taskEl.innerHTML = `
                <div>
                    <h3 class="font-semibold">${task.title}</h3>
                    <p class="text-sm text-gray-600">${
                        task.description || ""
                    }</p>
                </div>
                <div class="flex gap-2">
                    <button onclick="editTask(${task.id}, '${task.title}', '${
                task.description
            }', '${
                task.status
            }')" class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Editar</button>
                    <button onclick="deleteTask(${
                        task.id
                    })" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Eliminar</button>
                </div>
            `;

            // Eventos de drag
            taskEl.addEventListener("dragstart", dragStart);
            taskEl.addEventListener("dragend", dragEnd);

            // Agregar al contenedor correcto
            if (task.status === "pendiente") {
                pendingTasks.appendChild(taskEl);
            } else {
                completedTasks.appendChild(taskEl);
            }
        });
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudieron cargar las tareas",
        });
    }
};


// 🟢 Crear tarea
const createTask = async (data) => {
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${TOKEN}`, // ✅ token del login
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error("Error al crear tarea:", errorText);

            // Si el token expiró o es inválido
            if (res.status === 401) {
                Swal.fire({
                    icon: "warning",
                    title: "Token inválido o expirado",
                    text: "Por favor, vuelve a iniciar sesión.",
                });
                localStorage.removeItem("api_token");
                return null;
            }

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo crear la tarea.",
            });
            return null;
        }

        const json = await res.json();

        Swal.fire({
            icon: "success",
            title: "Tarea creada",
            text: `“${json.data?.title || "Sin título"}” se creó correctamente.`,
            timer: 1500,
            showConfirmButton: false,
        });

        return json;
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ocurrió un problema al crear la tarea.",
        });
    }
};


// 🟢 Actualizar tarea
function editTask(id, title, description, status) {
    Swal.fire({
        title: "Editar Tarea",
        html: `
            <div class="flex flex-col gap-4 text-left">
                <input id="swal-title" class="border rounded-xl p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Título" value="${title}">
                <textarea id="swal-description" class="border rounded-xl p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Descripción">${description}</textarea>
                <select id="swal-status" class="border rounded-xl p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option value="pendiente" ${
                        status === "pendiente" ? "selected" : ""
                    }>Pendiente</option>
                    <option value="completada" ${
                        status === "completada" ? "selected" : ""
                    }>Completada</option>
                </select>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: "Actualizar",
        cancelButtonText: "Cancelar",
        focusConfirm: false,
        didOpen: () => {
            // Opcional: focus inicial en el título
            document.getElementById("swal-title").focus();
        },
        preConfirm: () => {
            const newTitle = document.getElementById("swal-title").value;
            const newDescription =
                document.getElementById("swal-description").value;
            const newStatus = document.getElementById("swal-status").value;
            if (!newTitle) {
                Swal.showValidationMessage("El título es obligatorio");
                return false;
            }
            return {
                title: newTitle,
                description: newDescription,
                status: newStatus,
            };
        },
    }).then(async (result) => {
        if (result.isConfirmed) {
            const { title, description, status } = result.value; // ✅ destructuring del objeto retornado
            try {
                const res = await fetch(`${API_URL}/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "X-CSRF-TOKEN": document
                            .querySelector('meta[name="csrf-token"]')
                            .getAttribute("content"),
                    },
                    body: JSON.stringify({ title, description, status }), // ahora sí funciona
                });
                if (!res.ok) throw new Error("Error al actualizar la tarea");
                Swal.fire({
                    icon: "success",
                    title: "¡Tarea actualizada!",
                    timer: 1200,
                    showConfirmButton: false,
                });
                fetchTasks();
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudo actualizar la tarea",
                });
            }
        }
    });
}

// ❌ Eliminar tarea
const deleteTask = async (id) => {
    const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
            });
            if (!res.ok) throw new Error("Error al eliminar la tarea");

            await fetchTasks();
            Swal.fire({
                icon: "success",
                title: "¡Eliminada!",
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo eliminar la tarea",
            });
        }
    }
};

// 📝 Formulario crear tarea
taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(taskForm));
    await createTask(data);
    taskForm.reset();
    fetchTasks();
    Swal.fire({
        icon: "success",
        title: "¡Tarea creada!",
        showConfirmButton: false,
        timer: 1500,
    });
});

// 🔹 Drag & Drop
let dragged;

function dragStart(e) {
    dragged = e.currentTarget;
    dragged.classList.add("task-dragging", "opacity-50"); // cursor mientras arrastras
}

function dragEnd(e) {
    dragged.classList.remove("task-dragging", "opacity-50");
}

[pendingTasks, completedTasks].forEach((container) => {
    container.addEventListener("dragover", (e) => e.preventDefault());
    container.addEventListener("drop", async (e) => {
        e.preventDefault();
        if (dragged && e.currentTarget !== dragged.parentNode) {
            e.currentTarget.appendChild(dragged);

            // Actualizar estado en la API
            const newStatus =
                e.currentTarget.id === "pendingTasks"
                    ? "pendiente"
                    : "completada";
            const id = dragged.dataset.id;

            try {
                const res = await fetch(`${API_URL}/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "X-CSRF-TOKEN": document
                            .querySelector('meta[name="csrf-token"]')
                            .getAttribute("content"),
                    },
                    body: JSON.stringify({ status: newStatus }),
                });

                if (!res.ok) throw new Error("Error al actualizar estado");

                dragged.dataset.status = newStatus;

                // ✅ Mostrar alerta de éxito
                Swal.fire({
                    icon: "success",
                    title: "¡Estado actualizado!",
                    text: `La tarea ahora está ${newStatus}`,
                    timer: 1200,
                    showConfirmButton: false,
                });
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "No se pudo actualizar el estado",
                });

                // Revertir visualmente
                fetchTasks();
            }
        }
    });
});

// Cargar tareas al inicio
fetchTasks();