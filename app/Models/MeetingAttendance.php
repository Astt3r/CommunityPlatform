<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MeetingAttendance extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'meeting_id',
        'neighbor_id',
        'attended',
        'absence_reason',
    ];

    /**
     * Get the meeting associated with this attendance record.
     */
    public function meeting()
    {
        return $this->belongsTo(Meeting::class);
    }

    /**
     * Get the neighbor associated with this attendance record.
     */
    public function neighbor()
    {
        return $this->belongsTo(Neighbor::class);
    }
}