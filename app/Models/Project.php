<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    /**
     * Campos que pueden ser llenados en masa.
     */
    protected $fillable = [
        'name',
        'description',
        'issue', // Agregar el campo issue
        'is_for_all_neighbors',
        'start_date',
        'end_date',
        'status',
        'budget',
        'association_id', // Asociación del proyecto
        'changes', // Historial de cambios
    ];

    /**
     * Relación con los archivos asociados al proyecto.
     */
    public function files()
    {
        return $this->hasMany(File::class, 'project_id', 'id');
    }

    /**
     * Relación con las contribuciones.
     */
    public function contributions()
    {
        return $this->hasMany(Contribution::class);
    }

    /**
     * Relación con la junta de vecinos asociada.
     */
    public function neighborhoodAssociation()
    {
        return $this->belongsTo(NeighborhoodAssociation::class);
    }

    /**
     * Relación con los vecinos asociados al proyecto.
     */
    public function neighbors()
    {
        return $this->belongsToMany(Neighbor::class, 'neighbor_project')
            ->withTimestamps();
    }

    /**
     * Determina si el proyecto es para todos los vecinos.
     */
    public function isForAllNeighbors()
    {
        return $this->is_for_all_neighbors;
    }

    /**
     * Mutador para eliminar espacios en blanco del campo changes.
     */
    public function setChangesAttribute($value)
    {
        $this->attributes['changes'] = trim($value);
    }
}
