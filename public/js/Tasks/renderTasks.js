import { api } from "../api.js";
import { getToken } from "../auth.js";
import { API_URL } from "../api.js";

const pendingTasksEl = document.getElementById("pendingTasks");
const completedTasksEl = document.getElementById("completedTasks");

let draggedEl = null;

export async function fetchTasks() {
    try {
        const token = getToken();
        const json = await api.get(token);
        const tasks = json.data || json.tasks || json || [];

        pendingTasksEl.innerHTML = "";
        completedTasksEl.innerHTML = "";

        if (!Array.isArray(tasks) || tasks.length === 0) {
            pendingTasksEl.innerHTML = `<p class="text-center text-gray-500 italic mt-4">No hay tareas registradas.</p>`;
            completedTasksEl.innerHTML = `<p class="text-center text-gray-500 italic mt-4">No hay tareas completadas.</p>`;
            return tasks;
        }

        tasks.forEach((task) => {
            const node = createTaskNode(task);
            if (task.status === "pendiente") pendingTasksEl.appendChild(node);
            else completedTasksEl.appendChild(node);
        });

        return tasks;
    } catch (err) {
        console.error("Error al obtener tareas:", err);
        if (typeof Swal !== "undefined") {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudieron cargar las tareas",
            });
        }
        return [];
    }
}

function createTaskNode(task = {}) {
    const el = document.createElement("div");
    el.className =
        "bg-gray-50 p-4 rounded-2xl shadow flex justify-between items-center cursor-grab task-draggable";
    el.setAttribute("draggable", "true");
    el.dataset.id = task.id;
    el.dataset.status = task.status;

    const prioridadColor = prioridadClass(task.prioridad);

    el.innerHTML = `
        <div>
        <h3 class="font-semibold">${escapeHtml(task.title || "")}</h3>
        <p class="text-sm text-gray-600">${escapeHtml(task.description || "")}</p>
        <span class="${prioridadColor} font-semibold">Prioridad: ${escapeHtml(
            task.prioridad || "N/A"
        )}</span>
        </div>
        <div class="flex gap-2">
        <button data-action="edit" data-id="${task.id}" data-title="${escapeAttr(
            task.title
        )}" data-description="${escapeAttr(
            task.description
        )}" data-status="${escapeAttr(
            task.status
        )}" class="btn-edit bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Editar</button>
        <button data-action="delete" data-id="${
            task.id
        }" class="btn-delete bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Eliminar</button>
        </div>
    `;

    el.addEventListener("dragstart", (e) => {
        draggedEl = e.currentTarget;
        draggedEl.classList.add("task-dragging", "opacity-50");
    });

    el.addEventListener("dragend", () => {
        if (draggedEl) {
            draggedEl.classList.remove("task-dragging", "opacity-50");
            draggedEl = null;
        }
    });

    return el;
}

function prioridadClass(prioridad) {
    switch (prioridad) {
        case "baja":
            return "text-green-500";
        case "media":
            return "text-yellow-500";
        case "alta":
            return "text-red-500";
        default:
            return "text-gray-500";
    }
}

function escapeHtml(str) {
    if (!str) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function escapeAttr(str) {
    if (!str) return "";
    return String(str).replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

export function initDragAndDrop(onDropCallback) {
    [pendingTasksEl, completedTasksEl].forEach((container) => {
        container.addEventListener("dragover", (e) => e.preventDefault());
        container.addEventListener("drop", async (e) => {
            e.preventDefault();
            if (!draggedEl) return;

            if (e.currentTarget !== draggedEl.parentNode) {
                e.currentTarget.appendChild(draggedEl);
                const newStatus =
                    e.currentTarget.id === "pendingTasks"
                        ? "pendiente"
                        : "completada";
                const id = draggedEl.dataset.id;
                if (typeof onDropCallback === "function") {
                    await onDropCallback(id, newStatus);
                }
            }
        });
    });
}