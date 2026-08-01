<?php

namespace Database\Factories;

use App\Models\NeighborhoodAssociation;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Neighbor>
 */
class NeighborFactory extends Factory
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
            'registration_date' => $this->faker->dateTimeBetween('-3 years', 'now'),
            'birth_date' => $this->faker->dateTimeBetween('-80 years', '-18 years'),
            'status' => 'active',
            'last_participation_date' => $this->faker->optional()->dateTimeBetween('-1 year', 'now'),
            'user_id' => User::factory(),
            'neighborhood_association_id' => NeighborhoodAssociation::factory(),
        ];
    }
}
