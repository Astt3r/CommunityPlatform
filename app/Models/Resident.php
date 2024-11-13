<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resident extends Model
{
    use HasFactory;

    protected $fillable = [
        'address',
        'identification_number',
        'registration_date',
        'birth_date',
        'status',
        'last_participation_date',
        'neighborhood_association_id',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function neighborhoodAssociation()
    {
        return $this->belongsTo(NeighborhoodAssociation::class, 'neighborhood_association_id');
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}
