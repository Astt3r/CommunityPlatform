<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\NeighborhoodAssociation;
use Illuminate\Support\Carbon;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Resident>
 */
class ResidentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'address' => $this->faker->address,
            'identification_number' => $this->faker->unique()->numerify('#########-#'),
            'registration_date' => Carbon::now(),
            'birth_date' => $this->faker->dateTimeBetween('-80 years', '-18 years'),
            'status' => 'active',
            'last_participation_date' => Carbon::now()->subMonths(rand(1, 12)),
            'neighborhood_association_id' => NeighborhoodAssociation::inRandomOrder()->first()->id ?? NeighborhoodAssociation::factory(),
            'user_id' => User::inRandomOrder()->first()->id ?? User::factory(),
        ];
    }
}
