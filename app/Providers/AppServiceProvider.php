<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Contracts\TaskReadableInterface;
use App\Repositories\Contracts\TaskWritableInterface;
use App\Repositories\Eloquent\TaskRepository;

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(\App\Repositories\Contracts\TaskReadableInterface::class, \App\Repositories\Eloquent\TaskRepository::class);
        $this->app->bind(\App\Repositories\Contracts\TaskWritableInterface::class, \App\Repositories\Eloquent\TaskRepository::class);
    }
}