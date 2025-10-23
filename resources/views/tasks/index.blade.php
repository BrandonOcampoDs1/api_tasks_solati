<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Gestor de Tareas</title>
    <link rel="icon" type="image/png" href="{{ asset('img/logo_ts.png') }}">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>

<body class="bg-gray-100 p-10 flex flex-col items-center justify-center min-h-screen">

    <h1 class="text-5xl font-extrabold mb-10 text-gray-800">Gestor de Tareas</h1>
    <span class="text-gray-500 text-sm italic m-5">
        Arrastre una tarea para completarla o ponerla en pendiente, o edítela directamente
    </span>
    <div class="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8">

        {{-- Formulario de nueva tarea --}}
        <div class="col-span-1 flex justify-center">
            <form id="taskForm"
                class="bg-white p-8 rounded-3xl shadow-xl flex flex-col justify-between gap-4 w-full max-w-sm">
                <input name="title" placeholder="Título"
                    class="border border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required>
                <textarea name="description" placeholder="Descripción"
                    class="border border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea>
                <div class="flex gap-3 items-center mt-4">
                    <span class="font-semibold text-gray-700">Prioridad:</span>

                    <label class="cursor-pointer">
                        <input type="radio" name="prioridad" class="peer hidden" value="baja" checked>
                        <span
                            class="px-4 py-2 rounded-full border border-gray-300 text-gray-700 bg-white peer-checked:bg-green-500 peer-checked:text-white transition-colors duration-200">
                            Baja
                        </span>
                    </label>

                    <label class="cursor-pointer">
                        <input type="radio" name="prioridad" class="peer hidden" value="media">
                        <span
                            class="px-4 py-2 rounded-full border border-yellow-400 text-yellow-700 bg-yellow-50 peer-checked:bg-yellow-500 peer-checked:text-white transition-colors duration-200">
                            Media
                        </span>
                    </label>

                    <label class="cursor-pointer">
                        <input type="radio" name="prioridad" class="peer hidden" value="alta">
                        <span
                            class="px-4 py-2 rounded-full border border-red-500 text-red-700 bg-red-50 peer-checked:bg-red-600 peer-checked:text-white transition-colors duration-200">
                            Alta
                        </span>
                    </label>
                </div>


                <select name="status"
                    class="border border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option value="pendiente">Pendiente</option>
                    <option value="completada">Completada</option>
                </select>
                <button type="submit"
                    class="bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition">Guardar</button>
            </form>
        </div>

        {{-- Contenedores Drag & Drop --}}
        {{-- Pendientes --}}
        <div class="col-span-1 bg-white rounded-3xl shadow-xl p-6 flex flex-col">
            <h2 class="text-2xl font-bold mb-4 text-gray-700">Pendientes</h2>
            <div class="overflow-y-auto max-h-[calc(5*80px)] flex flex-col gap-3 min-h-[200px]" id="pendingTasks"></div>
        </div>

        {{-- Completadas --}}
        <div class="col-span-1 bg-white rounded-3xl shadow-xl p-6 flex flex-col">
            <h2 class="text-2xl font-bold mb-4 text-gray-700">Completadas</h2>
            <div class="overflow-y-auto max-h-[calc(5*80px)] flex flex-col gap-3 min-h-[200px]" id="completedTasks">
            </div>
        </div>
    </div>

    <script src="{{ asset('js/tasks.js') }}"></script>
</body>

</html>
