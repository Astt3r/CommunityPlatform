<?php

namespace Database\Factories;

use App\Models\NeighborhoodAssociation;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Committee>
 */
class CommitteeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => ucfirst($this->faker->unique()->words(2, true)),
            'description' => $this->faker->sentence(),
            'neighborhood_association_id' => NeighborhoodAssociation::factory(),
            'created_by' => User::factory(),
        ];
    }
}
