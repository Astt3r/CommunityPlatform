<?php

namespace Database\Seeders;

use App\Models\NeighborhoodAssociation;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Crear un usuario de tipo admin
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'role' => 'admin',
            'password' => bcrypt('password'), // Cambia la contraseña por algo seguro en producción
        ]);

        // Crear un usuario de tipo board_member
        User::factory()->create([
            'name' => 'Board Member User',
            'email' => 'board_member@example.com',
            'role' => 'board_member',
            'password' => bcrypt('password'),
        ]);

        // Crear un usuario de tipo resident
        User::factory()->create([
            'name' => 'Resident User',
            'email' => 'resident@example.com',
            'role' => 'resident',
            'password' => bcrypt('password'),
        ]);

    }
}
