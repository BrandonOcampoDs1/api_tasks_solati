import { api } from "../api.js";
import { getToken } from "../auth.js";

export async function createTask(data) {
    try {
        const token = getToken();
        const json = await api.post(data, token);

        if (typeof Swal !== "undefined") {
            Swal.fire({
                icon: "success",
                title: "Tarea creada",
                text: `"${
                    json.data?.title || "Sin título"
                }" se creó correctamente.`,
                timer: 1500,
                showConfirmButton: false,
            });
        }
        return json;
    } catch (err) {
        console.error("Error al crear tarea:", err);
        if (typeof Swal !== "undefined") {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo crear la tarea.",
            });
        }
        return null;
    }
}