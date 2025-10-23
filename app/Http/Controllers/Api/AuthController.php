<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ApiClient;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'identifier' => 'required|string',
        ]);

        $client = ApiClient::where('identifier', $request->identifier)->first();

        if (!$client) {
            return response()->json(['message' => 'Cédula no encontrada'], 404);
        }

        return response()->json([
            'name' => $client->name,
            'identifier' => $client->identifier,
            'token' => $client->token,
        ]);
    }
}