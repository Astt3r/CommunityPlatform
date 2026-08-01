<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meeting extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'meeting_date',
        'main_topic',
        'description',
        'location',
        'result',
        'status',
        'neighborhood_association_id',
    ];

    public function attendances()
    {
        return $this->hasMany(MeetingAttendance::class);
    }

    public function votes()
    {
        return $this->hasMany(MeetingVote::class);
    }

    public function openVote()
    {
        return $this->belongsTo(MeetingVote::class, 'open_vote_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($meeting) {
            $meeting->attendances()->delete(); // Eliminar asistencias asociadas antes de eliminar la reunión
        });
    }

    public function neighborhoodAssociation()
    {
        return $this->belongsTo(NeighborhoodAssociation::class);
    }

    // Define any relationships, if needed, such as with attendees or minutes
}
