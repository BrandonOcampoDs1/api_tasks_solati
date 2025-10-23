<?php

namespace App\Services;
use App\Repositories\Contracts\TaskRepositoryInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TaskService
{
    private TaskRepositoryInterface $repository;

    public function __construct(TaskRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function getAllTasks()
    {
        $tasks = $this->repository->all();

        // Si no hay tareas, devolvemos colección vacía
        if ($tasks->isEmpty()) {
            return collect(); 
        }

        return $tasks;
    }

    public function getTask(int $id)
    {
        $task = $this->repository->find($id);

        if (!$task) {
            throw new ModelNotFoundException('Tarea no encontrada');
        }

        return $task;
    }

    public function createTask(array $data)
    {
        return $this->repository->create($data);
    }

    public function updateTask(int $id, array $data)
    {
        $task = $this->repository->find($id);

        if (!$task) {
            throw new ModelNotFoundException('Tarea no encontrada para actualizar');
        }

        return $this->repository->update($id, $data);
    }

    public function deleteTask(int $id)
    {
        $task = $this->repository->find($id);

        if (!$task) {
            throw new ModelNotFoundException('Tarea no encontrada para eliminar');
        }

        return $this->repository->delete($id);
    }
}