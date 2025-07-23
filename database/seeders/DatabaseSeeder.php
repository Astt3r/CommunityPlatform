<?php

namespace Database\Seeders;

use App\Models\Neighbor;
use App\Models\NeighborhoodAssociation;
use App\Models\User;
use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Create an admin user if it doesn't exist
        $adminUser = User::firstOrCreate([
            'email' => 'admin@example.com'
        ], [
            'name' => 'Admin User',
            'password' => bcrypt('password'),
            'role' => 'admin'
        ]);

        // Create a neighborhood association for the admin
        $adminAssociation = NeighborhoodAssociation::factory()->withCreator($adminUser->id)->create();

        // Create a neighbor record for the admin user  
        Neighbor::factory()->create([
            'neighborhood_association_id' => $adminAssociation->id,
            'user_id' => $adminUser->id,
            'address' => $faker->address,
            'identification_number' => $this->generateRut(),
            'registration_date' => now(),
            'birth_date' => Carbon::parse('1980-01-01')->addYears(rand(0, 40)),
            'status' => 'active',
        ]);

        // Create neighbors associated with the admin's neighborhood association
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

        // Create a board member user if it doesn't exist
        $boardMemberUser = User::firstOrCreate([
            'email' => 'board_member@example.com'
        ], [
            'name' => 'Board Member User',
            'password' => bcrypt('password'),
            'role' => 'board_member'
        ]);

        // Create a neighborhood association for the board member
        $boardMemberAssociation = NeighborhoodAssociation::factory()->withCreator($boardMemberUser->id)->create();

        // Create a neighbor record for the board member user
        Neighbor::factory()->create([
            'neighborhood_association_id' => $boardMemberAssociation->id,
            'user_id' => $boardMemberUser->id,
            'address' => $faker->address,
            'identification_number' => $this->generateRut(),
            'registration_date' => now(),
            'birth_date' => Carbon::parse('1980-01-01')->addYears(rand(0, 40)),
            'status' => 'active',
        ]);

        // Create neighbors associated with the board member's neighborhood association
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

        // Create additional neighbors assigned to random neighborhood associations
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
        $number = rand(1000000, 25000000); // Generate a random number between 1,000,000 and 25,000,000
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
            $number = (int) ($number / 10);
            $multiplier = $multiplier == 7 ? 2 : $multiplier + 1;
        }

        $remainder = $sum % 11;
        $verifier = 11 - $remainder;

        if ($verifier == 11) {
            return '0';
        } elseif ($verifier == 10) {
            return 'K';
        } else {
            return (string) $verifier;
        }
    }
}
