<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Committee extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'created_by',
        'updated_by',
        'neighborhood_association_id',
    ];

    public function neighborhoodAssociation()
    {
        return $this->belongsTo(NeighborhoodAssociation::class);
    }

    public function members()
    {
        return $this->hasMany(CommitteeMember::class);
    }
}
