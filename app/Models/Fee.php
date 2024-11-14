<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fee extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'amount',
        'due_date',
        'paid_date',
        'status',
        'neighbor_id',
    ];

    /**
     * Get the neighbor that this fee belongs to.
     */
    public function neighbor()
    {
        return $this->belongsTo(Neighbor::class);
    }
}
