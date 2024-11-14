<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contribution extends Model
{
    use HasFactory;

    protected $fillable = [
        'amount',
        'neighbor_id',
        'project_id',
    ];

    public function neighbor()
    {
        return $this->belongsTo(Neighbor::class, 'neighbor_id');
    }

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }
}
