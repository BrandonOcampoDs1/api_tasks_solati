<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\ApiClient;

class ApiTokenAuth
{
    public function handle(Request $request, Closure $next)
    {
        $token = $request->header('Authorization');

        if (!$token) {
            return response()->json(['message' => 'Token no provisto'], 401);
        }

        // Si viene como "Bearer XXXXXX"
        if (str_starts_with($token, 'Bearer ')) {
            $token = substr($token, 7);
        }

        $client = ApiClient::where('token', $token)->first();

        if (!$client) {
            return response()->json(['message' => 'Token inválido'], 401);
        }

        // Inyectamos el cliente al request por si se necesita
        $request->merge(['api_client' => $client]);

        return $next($request);
    }
}