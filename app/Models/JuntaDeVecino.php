<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JuntaDeVecino extends Model
{
    use HasFactory;

    protected $table = 'junta_de_vecino';

    protected $fillable = [
        'nombre',
        'direccion',
        'telefono',
        'email',
        'fecha_fundacion',
        'estado',
    ];
    

    public function vecinos(): HasMany
    {
        return $this->hasMany(Vecino::class);
    }
}
