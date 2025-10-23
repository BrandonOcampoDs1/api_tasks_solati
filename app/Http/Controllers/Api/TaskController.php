<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TaskStoreRequest;
use App\Http\Requests\TaskUpdateRequest;
use App\Http\Resources\TaskResource;
use App\Services\TaskService;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Traits\ApiResponse;

class TaskController extends Controller
{
    use ApiResponse;

    private TaskService $service;

    public function __construct(TaskService $service)
    {
        $this->service = $service;
    }

    public function index(): JsonResponse
    {
        $tasks = $this->service->getAllTasks();
        if ($tasks->isEmpty()) {
            return $this->successResponse([], 'No hay tareas registradas', 200);
        }
        return $this->successResponse(TaskResource::collection($tasks), 'Tareas listadas', 200);
    }

    public function store(TaskStoreRequest $request): JsonResponse
    {
        $task = $this->service->createTask($request->validated());
        return $this->successResponse(new TaskResource($task), 'Tarea creada', 201);
    }

    public function show($id): JsonResponse
    {
        try {
            $task = $this->service->getTask($id);
            return $this->successResponse(new TaskResource($task), 'Tarea obtenida', 200);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse('Tarea no encontrada', null, 404);
        }
    }

    public function update(TaskUpdateRequest $request, $id): JsonResponse
    {
        try {
            $task = $this->service->updateTask($id, $request->validated());
            return $this->successResponse(new TaskResource($task), 'Tarea actualizada', 200);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse('Tarea no encontrada', null, 404);
        }
    }

    public function destroy($id): JsonResponse
    {
        try {
            $this->service->deleteTask($id);
            return $this->successResponse(null, 'Tarea eliminada', 200);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse('Tarea no encontrada', null, 404);
        }
    }
}