<?php

namespace Database\Factories;

use App\Models\MeetingVote;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MeetingVoteOption>
 */
class MeetingVoteOptionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'meeting_vote_id' => MeetingVote::factory(),
            'label' => ucfirst($this->faker->unique()->word()),
            'position' => 0,
        ];
    }
}
