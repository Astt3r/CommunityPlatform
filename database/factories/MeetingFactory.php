<?php

namespace Database\Factories;

use App\Models\NeighborhoodAssociation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Meeting>
 */
class MeetingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'meeting_date' => $this->faker->dateTimeBetween('-6 months', '+2 months'),
            'main_topic' => ucfirst($this->faker->sentence(4)),
            'description' => $this->faker->paragraph(),
            'location' => $this->faker->address,
            'result' => null,
            'status' => $this->faker->randomElement(['scheduled', 'completed', 'canceled']),
            'neighborhood_association_id' => NeighborhoodAssociation::factory(),
        ];
    }
}
