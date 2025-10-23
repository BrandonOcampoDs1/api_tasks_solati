<?php

namespace App\Traits;

trait ApiResponse
{
    protected function successResponse($data = null, string $message = '', int $status = 200)
    {
        return response()->json([
            'success' => true,
            'message' => $message ?: 'OK',
            'data' => $data,
            'errors' => null
        ], $status);
    }

    protected function errorResponse(string $message = '', $errors = null, int $status = 400)
    {
        return response()->json([
            'success' => false,
            'message' => $message ?: 'Error',
            'data' => null,
            'errors' => $errors
        ], $status);
    }
}