export const API_URL = "/api/v1/tasks";

async function request(method, path = "", body = null, token = null) {
    const headers = {
        Accept: "application/json",
    };

    if (body && !(body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
    }

    if (token) headers["Authorization"] = `Bearer ${token}`;

    const options = {
        method,
        headers,
        body: body && !(body instanceof FormData) ? JSON.stringify(body) : body,
    };

    const res = await fetch(path ? `${API_URL}/${path}` : API_URL, options);

    if (res.status === 401) {
        localStorage.removeItem("api_token");
        if (typeof Swal !== "undefined") {
            Swal.fire({
                icon: "warning",
                title: "Token inválido o expirado",
                text: "Por favor, vuelve a iniciar sesión.",
            });
        }
        throw new Error("Unauthorized");
    }

    if (!res.ok) {
        const text = await res.text();
        const err = new Error("HTTP error");
        err.status = res.status;
        err.body = text;
        throw err;
    }

    const text = await res.text();
    try {
        return JSON.parse(text || "{}");
    } catch {
        return text;
    }
}

export const api = {
    get: (token) => request("GET", "", null, token),
    post: (data, token) => request("POST", "", data, token),
    put: (id, data, token) => request("PUT", `${id}`, data, token),
    del: (id, token) => request("DELETE", `${id}`, null, token),
};