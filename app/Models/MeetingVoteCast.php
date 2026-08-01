<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MeetingVoteCast extends Model
{
    /** @use HasFactory<\Database\Factories\MeetingVoteCastFactory> */
    use HasFactory;

    protected $fillable = [
        'meeting_vote_id',
        'meeting_vote_option_id',
        'neighbor_id',
    ];

    public function vote()
    {
        return $this->belongsTo(MeetingVote::class, 'meeting_vote_id');
    }

    public function option()
    {
        return $this->belongsTo(MeetingVoteOption::class, 'meeting_vote_option_id');
    }

    public function neighbor()
    {
        return $this->belongsTo(Neighbor::class);
    }
}
