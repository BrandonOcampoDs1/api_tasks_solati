export const TOKEN_KEY = "api_token";

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
    if (token) {
        localStorage.setItem(TOKEN_KEY, token);
    } else {
        localStorage.removeItem(TOKEN_KEY);
    }
}

export async function ensureToken() {
    let token = getToken();
    if (token) return token;

    const identifier = prompt("Por favor, ingresa tu cédula:");
    if (!identifier) return null;

    try {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ identifier }),
        });

        const json = await res.json();

        if (res.ok && json.token) {
            setToken(json.token);
            if (typeof Swal !== "undefined") {
                Swal.fire({
                    icon: "success",
                    title: "¡Token obtenido!",
                    text: "Ya puedes usar la app",
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
            return json.token;
        } else {
            if (typeof Swal !== "undefined") {
                Swal.fire({
                    icon: "error",
                    title: "Cédula no válida",
                });
            }
            return null;
        }
    } catch (err) {
        console.error("Login error:", err);
        if (typeof Swal !== "undefined") {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo obtener token",
            });
        }
        return null;
    }
}