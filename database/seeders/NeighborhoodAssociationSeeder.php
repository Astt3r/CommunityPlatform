<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\NeighborhoodAssociation;

class NeighborhoodAssociationSeeder extends Seeder
{
    public function run()
    {
        // Crea 50 asociaciones de vecinos usando la fábrica
        NeighborhoodAssociation::factory()->count(50)->create();
    }
}
