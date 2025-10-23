export function validateTaskForm(form) {
    const title = form.title.value.trim();
    const prioridad = form.prioridad.value;
    const status = form.status.value;
    const errors = {};

    if (!title) errors.title = "El título es obligatorio.";
    if (!prioridad) errors.prioridad = "Debe seleccionar una prioridad.";
    if (!status) errors.status = "Debe seleccionar un estado.";

    form.querySelectorAll(".error-message").forEach((e) => e.remove());
    form.querySelectorAll(".error-field").forEach((field) => {
        field.classList.remove("border-red-500", "focus:ring-red-500");
    });

    if (Object.keys(errors).length > 0) {
        Object.keys(errors).forEach((key) => {
            const field = form[key];
            if (!field) return;

            field.classList.add("border-red-500", "focus:ring-red-500");

            const message = document.createElement("p");
            message.className = "error-message text-red-500 text-sm mt-1";
            message.textContent = errors[key];
            field.insertAdjacentElement("afterend", message);
        });

        return false;
    }

    return true;
}