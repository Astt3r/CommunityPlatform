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
        'organized_by',
        'result',
        'status',
    ];

    // Define any relationships, if needed, such as with attendees or minutes
}
