<?php

namespace Database\Factories;

use App\Models\IncomeType;
use App\Models\NeighborhoodAssociation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Income>
 */
class IncomeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'source' => $this->faker->sentence(3),
            'date' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'responsible' => $this->faker->name,
            'amount' => $this->faker->numberBetween(5000, 500000),
            'status' => 'active',
            'type_id' => IncomeType::factory(),
            'association_id' => NeighborhoodAssociation::factory(),
        ];
    }
}
