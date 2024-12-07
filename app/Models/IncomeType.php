<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IncomeType extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "description",
        "code",
        "status",
        "created_by",
        "updated_by",
        "effective_date",
        "end_date",
        "association_id", // Nuevo campo
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function association()
    {
        return $this->belongsTo(NeighborhoodAssociation::class, 'association_id');
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}

