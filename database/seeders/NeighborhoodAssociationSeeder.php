<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Neighbor;
use App\Models\NeighborhoodAssociation;
use App\Models\User;
use Carbon\Carbon;
use Faker\Factory as Faker;

class NeighborhoodAssociationSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        // Crear un usuario administrador si no existe
        $adminUser = User::firstOrCreate([
            'email' => 'admin@example.com'
        ], [
            'name' => 'Admin User',
            'password' => bcrypt('password'),
            'role' => 'admin'
        ]);

        // Crear una junta de vecinos asociada al administrador
        $adminAssociation = NeighborhoodAssociation::factory()->withCreator($adminUser->id)->create();

        // Crear vecinos asociados a la junta de vecinos del administrador
        for ($i = 0; $i < 3; $i++) {
            $user = User::factory()->create();
            Neighbor::factory()->create([
                'neighborhood_association_id' => $adminAssociation->id,
                'user_id' => $user->id,
                'address' => $faker->address,
                'identification_number' => $this->generateRut(),
                'registration_date' => now(),
                'birth_date' => Carbon::parse('1980-01-01')->addYears(rand(0, 40)),
                'status' => $faker->randomElement(['active', 'inactive']),
            ]);
        }

        // Crear un miembro de la directiva si no existe
        $boardMemberUser = User::firstOrCreate([
            'email' => 'board_member@example.com'
        ], [
            'name' => 'Board Member User',
            'password' => bcrypt('password'),
            'role' => 'board_member'
        ]);

        // Crear una junta de vecinos asociada al miembro de la directiva
        $boardMemberAssociation = NeighborhoodAssociation::factory()->withCreator($boardMemberUser->id)->create();

        // Crear vecinos asociados a la junta de vecinos del miembro de la directiva
        for ($i = 0; $i < 3; $i++) {
            $user = User::factory()->create();
            Neighbor::factory()->create([
                'neighborhood_association_id' => $boardMemberAssociation->id,
                'user_id' => $user->id,
                'address' => $faker->address,
                'identification_number' => $this->generateRut(),
                'registration_date' => now(),
                'birth_date' => Carbon::parse('1980-01-01')->addYears(rand(0, 40)),
                'status' => $faker->randomElement(['active', 'inactive']),
            ]);
        }

        // Crear vecinos adicionales asignándoles una asociación de vecinos aleatoria
        $associations = NeighborhoodAssociation::all();
        $users = User::factory()->count(50)->create();

        foreach ($users as $user) {
            Neighbor::factory()->create([
                'neighborhood_association_id' => $associations->random()->id,
                'user_id' => $user->id,
                'address' => $faker->address,
                'identification_number' => $this->generateRut(),
                'registration_date' => now(),
                'birth_date' => Carbon::parse('1980-01-01')->addYears(rand(0, 40)),
                'status' => $faker->randomElement(['active', 'inactive']),
            ]);
        }
    }

    /**
     * Generate a random RUT in the Chilean format (e.g., 12.345.678-9).
     *
     * @return string
     */
    private function generateRut()
    {
        $number = rand(1000000, 25000000); // Generar un número aleatorio entre 1.000.000 y 25.000.000
        $formattedNumber = number_format($number, 0, '', '.');
        $verifier = $this->calculateVerifier($number);

        return $formattedNumber . '-' . $verifier;
    }

    /**
     * Calculate the RUT verifier digit.
     *
     * @param int $number
     * @return string
     */
    private function calculateVerifier($number)
    {
        $multiplier = 2;
        $sum = 0;

        while ($number > 0) {
            $digit = $number % 10;
            $sum += $digit * $multiplier;
            $number = (int)($number / 10);
            $multiplier = $multiplier == 7 ? 2 : $multiplier + 1;
        }

        $remainder = $sum % 11;
        $verifier = 11 - $remainder;

        if ($verifier == 11) {
            return '0';
        } elseif ($verifier == 10) {
            return 'K';
        } else {
            return (string)$verifier;
        }
    }
}
