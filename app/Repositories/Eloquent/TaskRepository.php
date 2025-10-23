<?php

namespace App\Repositories\Eloquent;

use App\Models\Task;
use App\Repositories\Contracts\TaskReadableInterface;
use App\Repositories\Contracts\TaskWritableInterface;

class TaskRepository implements TaskReadableInterface, TaskWritableInterface
{
    public function all()
    {
        return Task::orderBy('created_at', 'desc')->get();
    }

    public function find(int $id)
    {
        return Task::find($id);
    }

    public function create(array $data)
    {
        return Task::create($data);
    }

    public function update(int $id, array $data)
    {
        $task = Task::find($id);
        if (!$task) return null;

        $task->update($data);
        return $task;
    }


    public function delete(int $id)
    {
        $task = Task::findOrFail($id);
        return $task->delete();
    }
}