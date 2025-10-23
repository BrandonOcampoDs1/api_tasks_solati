<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\AuthController;

Route::middleware('api.token')->prefix('v1')->group(function () {
    Route::apiResource('tasks', TaskController::class);
});

Route::post('/login', [AuthController::class, 'login']);