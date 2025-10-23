<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    protected $middleware = [
        // Global middleware
        \Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode::class,
        \App\Http\Middleware\ApiExceptionHandler::class
    ];

    protected $middlewareGroups = [
        'api' => [
            'throttle:api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
            // No StartSession ni cookies
        ],
    ];

    protected $routeMiddleware = [
        'api.token' => \App\Http\Middleware\ApiTokenAuth::class,
    ];

}