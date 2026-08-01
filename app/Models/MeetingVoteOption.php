<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MeetingVoteOption extends Model
{
    /** @use HasFactory<\Database\Factories\MeetingVoteOptionFactory> */
    use HasFactory;

    protected $fillable = [
        'meeting_vote_id',
        'label',
        'position',
    ];

    public function vote()
    {
        return $this->belongsTo(MeetingVote::class, 'meeting_vote_id');
    }

    /**
     * Individual ballots cast for this option. Named to avoid colliding
     * with Eloquent's own casts() attribute-casting method.
     */
    public function ballots()
    {
        return $this->hasMany(MeetingVoteCast::class);
    }
}
