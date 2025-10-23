{{-- resources/views/background.blade.php --}}
<!doctype html>
<html lang="es">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>TASKS SOLATI</title>
    <link rel="icon" type="image/png" href="{{ asset('img/logo_ts.png') }}">
    <script src="https://cdn.tailwindcss.com"></script>

    <style>
        /* Fallback / mejora: usamos la URL generada por asset() */
        body.bg-hero {
            background-image: url("{{ asset('img/logo_ts.png') }}");
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
        }

        /* Si quieres desenfocar el fondo detrás de la tarjeta */
        .backdrop-blur-hero {
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
        }

        /* Asegurar altura mínima en móviles */
        .min-h-screen-fix {
            min-height: 100vh;
        }
    </style>
</head>

<body class="bg-hero min-h-screen-fix flex items-center justify-center">

    {{-- Overlay oscuro para legibilidad --}}
    <div class="absolute inset-0 bg-black/50"></div>

    {{-- Contenedor principal --}}
    <main class="relative z-10 w-full max-w-3xl mx-4">
        <div class="mx-auto bg-white/80 dark:bg-gray-900/70 rounded-3xl shadow-2xl overflow-hidden">
            <div class="grid grid-cols-1 md:grid-cols-2">
                {{-- Lado izquierdo: tarjeta informativa --}}
                <section class="p-8 md:p-10 flex flex-col gap-6 justify-center">
                    <img src="{{ asset('img/logo_ts.png') }}" alt="Logo"
                        class="w-28 h-28 object-contain rounded-md shadow-sm">

                    <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                        Bienvenido
                    </h1>

                    <p class="text-gray-700 dark:text-gray-200">
                        Ingresa la cedula registrada para generar el token y activar el api
                    </p>

                    <button id="generar_token"
                        class="w-full py-3 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700 transition">
                        Generar Token
                    </button>
                </section>

                {{-- Lado derecho: ejemplo de formulario --}}
                <aside class="p-8 md:p-10 bg-white/60 dark:bg-black/40 flex items-center justify-center">
                    <form id="loginForm"
                        class="w-full max-w-sm bg-white/90 dark:bg-gray-800/80 p-6 rounded-2xl shadow-md backdrop-blur-hero">
                        <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Acceso</h2>

                        <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">Cédula</label>
                        <span class="block m-2">123456789</span>
                        <input id="identifierInput" type="text" placeholder="Ingrese su cédula"
                            class="w-full mb-4 p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400" />

                        <button type="submit"
                            class="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                            Ingresar
                        </button>

                    </form>

                </aside>
            </div>
        </div>

        {{-- Pie simple --}}
        <footer class="text-center mt-6 text-sm text-white/80">
            © {{ date('Y') }} — Brandon Ocampo - Desarrollador
        </footer>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script type="module" src="{{ asset('js/login.js') }}"></script>

</body>

</html>