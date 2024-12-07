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
        'name',
        'description',
        'issue',
        'start_date',
        'end_date',
        'status',
        'budget',
        'changes',
        'association_id',
    ];

    /**
     * Relación con los archivos asociados al proyecto.
     */
    public function files()
    {
        return $this->hasMany(File::class, 'project_id', 'id');
    }

    public function contributions()
    {
        return $this->hasMany(Contribution::class);
    }

    public function neighborhoodAssociation()
    {
        return $this->belongsTo(NeighborhoodAssociation::class);
    }

    public function neighbors()
    {
        return $this->belongsToMany(Neighbor::class, 'neighbor_project');
    }
    public function isForAllNeighbors()
    {
        return $this->is_for_all_neighbors;
    }
    public function setChangesAttribute($value)
    {
        $this->attributes['changes'] = trim($value);
    }


}
