import { api } from "../api.js";
import { getToken } from "../auth.js";

export async function editTask(
    id,
    title = "",
    description = "",
    status = "pendiente"
) {
    return Swal.fire({
        title: "Editar Tarea",
        html: `
            <div class="flex flex-col gap-4 text-left">
                <input id="swal-title" class="border rounded-xl p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Título" value="${escapeHtml(
                    title
                )}">
                <textarea id="swal-description" class="border rounded-xl p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Descripción">${escapeHtml(
                    description
                )}</textarea>
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
            document.getElementById("swal-title").focus();
        },
        preConfirm: () => {
            const newTitle = document.getElementById("swal-title").value.trim();
            const newDescription = document
                .getElementById("swal-description")
                .value.trim();
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
        if (!result.isConfirmed) return null;
        const {
            title: newTitle,
            description: newDescription,
            status: newStatus,
        } = result.value;
        try {
            const token = getToken();
            await api.put(
                id,
                {
                    title: newTitle,
                    description: newDescription,
                    status: newStatus,
                },
                token
            );
            Swal.fire({
                icon: "success",
                title: "¡Tarea actualizada!",
                timer: 1200,
                showConfirmButton: false,
            });
            return {
                id,
                title: newTitle,
                description: newDescription,
                status: newStatus,
            };
        } catch (err) {
            console.error("Error actualizando tarea:", err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo actualizar la tarea",
            });
            return null;
        }
    });
}

export async function updateStatus(id, newStatus) {
    try {
        const token = getToken();
        await api.put(id, { status: newStatus }, token);
        if (typeof Swal !== "undefined") {
            Swal.fire({
                icon: "success",
                title: "¡Estado actualizado!",
                text: `La tarea ahora está ${newStatus}`,
                timer: 1200,
                showConfirmButton: false,
            });
        }
        return true;
    } catch (err) {
        console.error("Error actualizando estado:", err);
        if (typeof Swal !== "undefined") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se pudo actualizar el estado",
            });
        }
        return false;
    }
}

function escapeHtml(str) {
    if (!str) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}