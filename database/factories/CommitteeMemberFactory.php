<?php

namespace Database\Factories;

use App\Models\Committee;
use App\Models\Neighbor;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CommitteeMember>
 */
class CommitteeMemberFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'committee_id' => Committee::factory(),
            'neighbor_id' => Neighbor::factory(),
            'status' => 'active',
            'joined_date' => $this->faker->dateTimeBetween('-2 years', 'now'),
            'left_date' => null,
        ];
    }
}
