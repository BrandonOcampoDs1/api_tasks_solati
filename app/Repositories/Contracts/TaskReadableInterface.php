<?php

namespace App\Repositories\Contracts;

interface TaskReadableInterface {
    public function all();
    public function find(int $id);
}