import { setToken } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const generar_token = document.getElementById("generar_token");

    // 🔥 BOTÓN GENERAR TOKEN (Muestra token en un modal, NO redirige)
    generar_token.addEventListener("click", async () => {
        const identifier = document.getElementById("identifierInput").value.trim();
        if (!identifier) {
            return Swal.fire({ icon: "warning", title: "Ingresa tu cédula" });
        }

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({ identifier }),
            });

            const data = await res.json();

            if (!res.ok) {
                return Swal.fire({ icon: "error", title: "Cédula no válida" });
            }

            setToken(data.token);

            Swal.fire({
                icon: "success",
                title: "Token generado ✅",
                html: `
                    <p><strong>${data.name}</strong></p>
                    <p style="margin-top:10px;font-size:14px;">Copia tu token:</p>
                    <pre style="background:#eee;padding:10px;border-radius:8px;word-break:break-all;">${data.token}</pre>
                `
            }).then(() => {
                navigator.clipboard.writeText(data.token);
            });

        } catch (error) {
            Swal.fire({ icon: "error", title: "Error", text: "No se pudo conectar con el servidor" });
        }
    });

    // ✅ BOTÓN INGRESAR (Redirige a /tasks)
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const identifier = document.getElementById("identifierInput").value.trim();
        if (!identifier) {
            return Swal.fire({ icon: "warning", title: "Ingresa tu cédula" });
        }

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({ identifier }),
            });

            const data = await res.json();

            if (!res.ok) {
                return Swal.fire({ icon: "error", title: "Cédula no válida" });
            }

            setToken(data.token);

            Swal.fire({
                icon: "success",
                title: "¡Bienvenido " + data.name + "!",
                timer: 1500,
                showConfirmButton: false,
            });

            setTimeout(() => {
                window.location.href = "/tasks";
            }, 1500);

        } catch (error) {
            Swal.fire({ icon: "error", title: "Error", text: "No se pudo conectar con el servidor" });
        }
    });
});