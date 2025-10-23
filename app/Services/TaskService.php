<?php

namespace App\Services;

use App\Repositories\Contracts\TaskReadableInterface;
use App\Repositories\Contracts\TaskWritableInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TaskService
{
    private TaskReadableInterface $readRepository;
    private TaskWritableInterface $writeRepository;

    public function __construct(TaskReadableInterface $readRepository, TaskWritableInterface $writeRepository)
    {
        $this->readRepository = $readRepository;
        $this->writeRepository = $writeRepository;
    }

    public function getAllTasks()
    {
        $tasks = $this->readRepository->all();

        return $tasks->isEmpty() ? collect() : $tasks;
    }

    public function getTask(int $id)
    {
        $task = $this->readRepository->find($id);

        if (!$task) {
            throw new ModelNotFoundException('Tarea no encontrada');
        }

        return $task;
    }

    public function createTask(array $data)
    {
        return $this->writeRepository->create($data);
    }

    public function updateTask(int $id, array $data)
    {
        $task = $this->readRepository->find($id);

        if (!$task) {
            throw new ModelNotFoundException('Tarea no encontrada para actualizar');
        }

        if (empty($data)) {
            throw new \InvalidArgumentException('No se enviaron campos válidos para actualizar');
        }

        return $this->writeRepository->update($id, $data);
    }

    public function deleteTask(int $id)
    {
        $task = $this->readRepository->find($id);

        if (!$task) {
            throw new ModelNotFoundException('Tarea no encontrada para eliminar');
        }

        return $this->writeRepository->delete($id);
    }
}