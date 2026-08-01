<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommitteeMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'committee_id',
        'neighbor_id',
        'status',
        'joined_date',
        'left_date',
    ];

    public function neighbor()
    {
        return $this->belongsTo(Neighbor::class);
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
