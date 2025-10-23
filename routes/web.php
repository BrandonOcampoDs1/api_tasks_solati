<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('acces');
});

Route::get('/tasks', function () {
    return view('tasks.index');
})->name('tasks.view');