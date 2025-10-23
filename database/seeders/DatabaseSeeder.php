<?php

namespace Database\Seeders;

use App\Models\ApiClient;
use App\Models\Task;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        ApiClient::create([
            'name' => 'Desarrollador',
            'identifier' => 123456789,
            'token' => Str::random(60),
        ]);

        Task::create([
            "title" => "Hacer commits",
            "description" => "Realizar commits de lo que tengo",
            "prioridad" => "media",
            "status" => "pendiente"
        ]);

        Task::create([
            "title" => "Revisar documentación",
            "description" => "Leer y organizar la documentación del proyecto",
            "prioridad" => "alta",
            "status" => "completada"
        ]);
    }
}