<?php

namespace App\Events;

use App\Models\MeetingVote;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection;

class MeetingVoteCast implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * @param  Collection<int, \App\Models\MeetingVoteOption>  $tallies  options loaded with a ballots_count aggregate
     */
    public function __construct(public MeetingVote $vote, public Collection $tallies)
    {
        //
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('meeting.'.$this->vote->meeting_id),
        ];
    }

    public function broadcastAs(): string
    {
        return 'vote.tally-updated';
    }

    /**
     * Only aggregate counts go over the wire — never the identity of who
     * voted for what, even though meeting_vote_casts.neighbor_id records it
     * for the double-vote constraint/audit trail.
     *
     * @return array<string, mixed>
     */
    public function broadcastWith(): array
    {
        return [
            'vote_id' => $this->vote->id,
            'tallies' => $this->tallies->map(fn ($option) => [
                'option_id' => $option->id,
                'label' => $option->label,
                'count' => $option->ballots_count,
            ])->values(),
            'total_votes' => $this->tallies->sum('ballots_count'),
        ];
    }
}
