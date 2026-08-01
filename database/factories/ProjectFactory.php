<?php

namespace Database\Factories;

use App\Models\NeighborhoodAssociation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = $this->faker->dateTimeBetween('-1 year', 'now');

        return [
            'name' => ucfirst($this->faker->words(3, true)),
            'description' => $this->faker->paragraph(),
            'issue' => $this->faker->sentence(),
            'is_for_all_neighbors' => $this->faker->boolean(70),
            'start_date' => $startDate,
            'end_date' => $this->faker->boolean(60)
                ? $this->faker->dateTimeBetween($startDate, '+1 year')
                : null,
            'status' => $this->faker->randomElement([
                'planeado', 'aprobado', 'en proceso', 'completado', 'cancelado', 'rechazado',
            ]),
            'budget' => $this->faker->numberBetween(100000, 5000000),
            'changes' => '',
            'association_id' => NeighborhoodAssociation::factory(),
        ];
    }
}
