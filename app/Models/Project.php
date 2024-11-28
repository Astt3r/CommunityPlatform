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
        'description',  // Descripción del proyecto
        'name',         // Nombre del proyecto
        'issue',        // Problema abordado por el proyecto
        'start_date',   // Fecha de inicio
        'end_date',     // Fecha de finalización
        'status',       // Estado del proyecto (por ejemplo, activo, completado)
        'responsible',  // Responsable del proyecto
        'budget',       // Presupuesto
        'association_id', // Relación con la tabla 'neighborhood_associations'
    ];

    /**
     * Relación con los archivos asociados al proyecto.
     */
    public function files()
    {
        return $this->hasMany(File::class, 'project_id', 'id');
    }

}
