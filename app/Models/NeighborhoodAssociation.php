<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class NeighborhoodAssociation extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'address',
        'phone',
        'email',
        'website_url',
        'number_of_members',
        'date_of_funding',
        'is_active',
        'created_by',
        'updated_by',
    ];

    /**
     * The user who created the neighborhood association.
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * The user who last updated the neighborhood association.
     */
    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    /**
     * Scope for active neighborhood associations.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }


}
