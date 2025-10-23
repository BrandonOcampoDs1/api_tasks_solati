<?php

namespace Database\Seeders;

use App\Models\ApiClient;
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
    }
}