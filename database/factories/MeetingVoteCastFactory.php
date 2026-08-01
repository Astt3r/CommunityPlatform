<?php

namespace Database\Factories;

use App\Models\MeetingVote;
use App\Models\MeetingVoteOption;
use App\Models\Neighbor;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MeetingVoteCast>
 */
class MeetingVoteCastFactory extends Factory
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
            'meeting_vote_option_id' => MeetingVoteOption::factory(),
            'neighbor_id' => Neighbor::factory(),
        ];
    }
}
