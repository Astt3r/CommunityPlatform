<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Minutes extends Model
{
    use HasFactory;

    protected $fillable = [
        'content',
        'created_date',
        'signed_by',
        'approved_by',
        'meeting_id',
    ];

    /**
     * Get the meeting that this minutes belongs to.
     */
    public function meeting()
    {
        return $this->belongsTo(Meeting::class);
    }
}