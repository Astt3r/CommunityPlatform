<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommitteeMember extends Model
{
    use HasFactory;

    protected $fillable = [
        "committee_id",
        "user_id",
        "status",
        "joined_date",
        "left_date",
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function committee()
    {
        return $this->belongsTo(Committee::class);
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

}
