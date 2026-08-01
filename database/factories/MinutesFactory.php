<?php

namespace Database\Factories;

use App\Models\Meeting;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Minutes>
 */
class MinutesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'content' => $this->faker->paragraphs(3, true),
            'created_date' => $this->faker->dateTimeBetween('-6 months', 'now'),
            'signed_by' => $this->faker->name,
            'approved_by' => $this->faker->name,
            'meeting_id' => Meeting::factory(),
        ];
    }
}
