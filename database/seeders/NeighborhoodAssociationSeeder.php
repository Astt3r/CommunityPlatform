<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\NeighborhoodAssociation;
use App\Models\User;
use App\Models\Resident;

class NeighborhoodAssociationSeeder extends Seeder
{
    public function run()
    {
        // Crear un usuario administrador
        $adminUser = User::factory()->admin('admin@example.com', 'password')->create();

        // Crear una junta de vecinos asociada al administrador
        $adminAssociation = NeighborhoodAssociation::factory()->withCreator($adminUser->id)->create();

        // Crear un miembro de la directiva
        $boardMemberUser = User::factory()->boardMember('board_member@example.com', 'password')->create();

        // Crear una junta de vecinos asociada al miembro de la directiva
        $boardMemberAssociation = NeighborhoodAssociation::factory()->withCreator($boardMemberUser->id)->create();

        // Crear vecinos asociados a la junta de vecinos del administrador
        Resident::factory()->count(3)->create([
            'neighborhood_association_id' => $adminAssociation->id,
            'user_id' => $adminUser->id,
        ]);

        // Crear vecinos asociados a la junta de vecinos del miembro de la directiva
        Resident::factory()->count(3)->create([
            'neighborhood_association_id' => $boardMemberAssociation->id,
            'user_id' => $boardMemberUser->id,
        ]);

        // Crear un vecino (usuario común) con credenciales específicas
        $neighborUser = User::factory()->resident('neighbor@example.com', 'password')->create();

        // Asignar el vecino a una junta de vecinos
        Resident::factory()->create([
            'neighborhood_association_id' => $adminAssociation->id,
            'user_id' => $neighborUser->id,
        ]);

        // Crea 50 asociaciones de vecinos usando la fábrica
        NeighborhoodAssociation::factory()->count(50)->create();

        User::factory()->count(50)->create();

        Resident::factory()->count(50)->create();

    }
}
