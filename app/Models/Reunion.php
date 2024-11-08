<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reunion extends Model
{
    use HasFactory;

    // Define los campos que se pueden asignar en masa
    protected $fillable = [
        'fecha_reunion',
        'tema_principal',
        'descripcion',
        'lugar',
        'convocada_por',
        'resultado',
        'estado',
    ];

    // Opcional: Si tu tabla en la base de datos se llama de otra manera, especifica el nombre aquí.
    // protected $table = 'nombre_de_tu_tabla';

    // Opcional: Si tu clave primaria no es 'id', define el nombre de la clave primaria aquí.
    // protected $primaryKey = 'id_reunion';

    // Opcional: Si no usas marcas de tiempo (created_at, updated_at), puedes desactivarlas.
    // public $timestamps = false;
}
