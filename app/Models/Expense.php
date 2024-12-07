<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'concept',
        'responsible',
        'date',
        'amount',
        'receipt',
        'status',
        'type_id',
        'association_id',
    ];

    /**
     * Get the type of this income.
     */
    /**
     * Get the type of this expense.
     */
    public function type()
    {
        return $this->belongsTo(ExpenseType::class, 'type_id');
    }


    /**
     * Get the association that this income belongs to.
     */
    public function association()
    {
        return $this->belongsTo(NeighborhoodAssociation::class, 'association_id');
    }

}