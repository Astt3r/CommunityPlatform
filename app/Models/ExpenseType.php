<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExpenseType extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "description",
        "code",
        "status",
        "created_by",
        "updated_by",
        "effective_date",
        "end_date",
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
}
