<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TaskStoreRequest;
use App\Http\Requests\TaskStoreInfoRequest;
use App\Http\Resources\TaskResource;
use App\Services\TaskService;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TaskController extends Controller
{
    private TaskService $service;

    public function __construct(TaskService $service)
    {
        $this->service = $service;
    }

    public function index(): JsonResponse
    {
        $tasks = $this->service->getAllTasks();

        return $tasks->isEmpty()
            ? response()->json(['message' => 'No hay tareas registradas', 'data' => []])
            : response()->json(TaskResource::collection($tasks));
    }

    public function store(TaskStoreRequest $request): TaskResource
    {
        $task = $this->service->createTask($request->validated());
        return new TaskResource($task);
    }

    public function show($id): JsonResponse|TaskResource
    {
        try {
            $task = $this->service->getTask($id);
            return new TaskResource($task);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Tarea no encontrada'], 404);
        }
    }

    public function update(TaskStoreInfoRequest $request, $id): JsonResponse|TaskResource
    {
        try {
            $task = $this->service->updateTask($id, $request->validated());
            return new TaskResource($task);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Tarea no encontrada'], 404);
        }
    }

    public function destroy($id): JsonResponse
    {
        try {
            $this->service->deleteTask($id);
            return response()->json(['message' => 'Tarea eliminada'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Tarea no encontrada'], 404);
        }
    }
}