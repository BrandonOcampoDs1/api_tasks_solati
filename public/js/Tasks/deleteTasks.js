import { api } from "../api.js";
import { getToken } from "../auth.js";

export async function deleteTask(id) {
    const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return false;

    try {
        const token = getToken();
        await api.del(id, token);

        if (typeof Swal !== "undefined") {
            Swal.fire({
                icon: "success",
                title: "¡Eliminada!",
                timer: 1500,
                showConfirmButton: false,
            });
        }
        return true;
    } catch (err) {
        console.error("Error al eliminar tarea:", err);
        if (typeof Swal !== "undefined") {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo eliminar la tarea",
            });
        }
        return false;
    }
}