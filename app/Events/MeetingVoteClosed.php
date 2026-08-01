<?php

namespace App\Events;

use App\Models\MeetingVote;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection;

class MeetingVoteClosed implements ShouldBroadcastNow
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
        return 'vote.closed';
    }

    /**
     * Only aggregate counts go over the wire — never the identity of who
     * voted for what.
     *
     * @return array<string, mixed>
     */
    public function broadcastWith(): array
    {
        return [
            'vote_id' => $this->vote->id,
            'status' => 'closed',
            'closed_at' => $this->vote->closed_at?->toIso8601String(),
            'tallies' => $this->tallies->map(fn ($option) => [
                'option_id' => $option->id,
                'label' => $option->label,
                'count' => $option->ballots_count,
            ])->values(),
            'total_votes' => $this->tallies->sum('ballots_count'),
        ];
    }
}
