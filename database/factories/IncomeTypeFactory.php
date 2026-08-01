<?php

namespace Database\Factories;

use App\Models\NeighborhoodAssociation;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\IncomeType>
 */
class IncomeTypeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->randomElement([
                'Cuotas sociales', 'Donaciones', 'Subvención municipal', 'Arriendo de espacios', 'Eventos',
            ]).' '.$this->faker->unique()->numberBetween(1, 1000),
            'description' => $this->faker->sentence(),
            'code' => strtoupper($this->faker->unique()->bothify('IN-###')),
            'status' => 'active',
            'created_by' => User::factory(),
            'updated_by' => null,
            'association_id' => NeighborhoodAssociation::factory(),
            'effective_date' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'end_date' => null,
        ];
    }
}
