<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MeetingVote extends Model
{
    /** @use HasFactory<\Database\Factories\MeetingVoteFactory> */
    use HasFactory;

    protected $fillable = [
        'meeting_id',
        'opened_by',
        'question',
        'status',
        'opened_at',
        'closed_by',
        'closed_at',
    ];

    protected $casts = [
        'opened_at' => 'datetime',
        'closed_at' => 'datetime',
    ];

    public function meeting()
    {
        return $this->belongsTo(Meeting::class);
    }

    public function openedBy()
    {
        return $this->belongsTo(User::class, 'opened_by');
    }

    public function closedBy()
    {
        return $this->belongsTo(User::class, 'closed_by');
    }

    public function options()
    {
        return $this->hasMany(MeetingVoteOption::class)->orderBy('position');
    }

    /**
     * Options with their live vote counts, ordered for display.
     */
    public function tallies()
    {
        return $this->options()->withCount('ballots')->get();
    }
}
