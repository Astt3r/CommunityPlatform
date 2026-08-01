<?php

namespace Database\Factories;

use App\Models\Neighbor;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Fee>
 */
class FeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = $this->faker->randomElement(['pending', 'paid', 'overdue']);

        return [
            'amount' => $this->faker->numberBetween(3000, 15000),
            'due_date' => $this->faker->dateTimeBetween('-2 months', '+1 month'),
            'paid_date' => $status === 'paid' ? $this->faker->dateTimeBetween('-2 months', 'now') : null,
            'status' => $status,
            'neighbor_id' => Neighbor::factory(),
        ];
    }
}
