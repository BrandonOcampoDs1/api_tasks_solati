import { ensureToken, getToken } from "./auth.js";
import { fetchTasks, initDragAndDrop } from "./Tasks/renderTasks.js";
import { createTask } from "./Tasks/createTasks.js";
import { deleteTask } from "./Tasks/deleteTasks.js";
import { editTask, updateStatus } from "./Tasks/updateTasks.js";
import { validateTaskForm } from "./validate.js";

const taskForm = document.getElementById("taskForm");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

async function boot() {
    const token = await ensureToken();
    if (!token) {
        console.warn("Sin token, la app no cargará tareas.");
        return;
    }

    initDragAndDrop(async (id, newStatus) => {
        const ok = await updateStatus(id, newStatus);
        if (!ok) {
            await fetchTasks();
        } else {
            const el = document.querySelector(`[data-id="${id}"]`);
            if (el) el.dataset.status = newStatus;
        }
    });

    await fetchTasks();
    attachDelegation();
    attachForm();
}

function attachDelegation() {
    [pendingTasks, completedTasks].forEach((container) => {
        container.addEventListener("click", async (e) => {
            const btn = e.target.closest("button[data-action]");
            if (!btn) return;

            const action = btn.dataset.action;
            const id = btn.dataset.id;
            if (action === "delete") {
                const removed = await deleteTask(id);
                if (removed) await fetchTasks();
            } else if (action === "edit") {
                // lee atributos para prellenar modal
                const title = btn.dataset.title || "";
                const description = btn.dataset.description || "";
                const status = btn.dataset.status || "pendiente";
                const updated = await editTask(id, title, description, status);
                if (updated) await fetchTasks();
            }
        });
    });
}


function attachForm() {
    const taskForm = document.getElementById("taskForm");
    if (!taskForm) return;

    taskForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!validateTaskForm(taskForm)) return;

        const data = Object.fromEntries(new FormData(taskForm));
        await createTask(data);
        taskForm.reset();
        await fetchTasks();

        if (typeof Swal !== "undefined") {
            Swal.fire({
                icon: "success",
                title: "¡Tarea creada!",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    });
}

boot();