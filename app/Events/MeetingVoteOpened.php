<?php

namespace App\Events;

use App\Models\MeetingVote;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MeetingVoteOpened implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public MeetingVote $vote)
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
        return 'vote.opened';
    }

    /**
     * @return array<string, mixed>
     */
    public function broadcastWith(): array
    {
        return [
            'vote_id' => $this->vote->id,
            'question' => $this->vote->question,
            'status' => $this->vote->status,
            'options' => $this->vote->options->map(fn ($option) => [
                'id' => $option->id,
                'label' => $option->label,
                'count' => 0,
            ])->values(),
        ];
    }
}
