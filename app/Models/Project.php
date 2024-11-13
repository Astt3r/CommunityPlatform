<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'descripcion',
        'problema',
        'fecha_inicio',
        'fecha_fin',
        'estado',
        'responsable',
        'presupuesto',
    ];

    public function files()
    {
        return $this->hasMany(File::class, 'project_id', 'id_proyecto'); // Relación basada en `id_proyecto`
    }
    protected $primaryKey = 'id_proyecto';
}
