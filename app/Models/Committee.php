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
        'code',
        'status',
        'effective_date',
        'end_date',
        'neighborhood_association_id',
        'created_by',
    ];



    public function user()
    {
        return $this->belongsTo(User::class);
        // return $this->belongsTo(User::class, 'created_by');
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope para filtrar por tipo de comité.
     */
    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    /**
     * Scope para filtrar presidentes.
     */
    public function scopePresidents($query)
    {
        return $query->byType('president');
    }

    /**
     * Scope para filtrar tesoreros.
     */
    public function scopeTreasurers($query)
    {
        return $query->byType('treasurer');
    }

    /**
     * Scope para filtrar secretarios.
     */
    public function scopeSecretaries($query)
    {
        return $query->byType('secretary');
    }
}
