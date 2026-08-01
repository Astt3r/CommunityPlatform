<?php

namespace Database\Factories;

use App\Models\Meeting;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MeetingVote>
 */
class MeetingVoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'meeting_id' => Meeting::factory(),
            'opened_by' => User::factory(),
            'question' => ucfirst($this->faker->sentence(6)).'?',
            'status' => 'open',
            'opened_at' => now(),
            'closed_by' => null,
            'closed_at' => null,
        ];
    }

    public function closed(): static
    {
        return $this->state(fn () => [
            'status' => 'closed',
            'closed_by' => User::factory(),
            'closed_at' => now(),
        ]);
    }
}
