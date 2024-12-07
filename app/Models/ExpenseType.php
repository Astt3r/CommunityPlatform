<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExpenseType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'code',
        'status',
        'effective_date',
        'end_date',
        'created_by',
        'association_id', // Asegúrate de que este campo esté aquí
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

    public function expenses()
    {
        return $this->hasMany(Expense::class, 'type_id');
    }

}
