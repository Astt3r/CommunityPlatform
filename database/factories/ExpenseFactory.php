<?php

namespace Database\Factories;

use App\Models\ExpenseType;
use App\Models\NeighborhoodAssociation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Expense>
 */
class ExpenseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'concept' => $this->faker->sentence(3),
            'responsible' => $this->faker->name,
            'date' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'amount' => $this->faker->numberBetween(5000, 500000),
            'receipt' => null,
            'status' => $this->faker->randomElement(['approved', 'pending', 'rejected']),
            'type_id' => ExpenseType::factory(),
            'association_id' => NeighborhoodAssociation::factory(),
        ];
    }
}
