<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JuntaDeVecino extends Model
{
    use HasFactory;

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
        return $this->hasMany(related: Vecino::class);
    }

}