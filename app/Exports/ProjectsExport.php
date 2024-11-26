<?php

namespace App\Exports;

use App\Models\Project;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class ProjectsExport implements FromCollection, WithHeadings, WithMapping
{
    protected $filter;

    public function __construct($filter = [])
    {
        $this->filter = $filter;
    }

    public function collection()
    {
        $query = Project::query();

        // Aplica el filtro si existe
        if (!empty($this->filter['latest'])) {
            $query->latest()->take((int) $this->filter['latest']);
        }

        return $query->get();
    }

    public function headings(): array
    {
        return ['ID', 'Nombre', 'Descripción', 'Estado', 'Fecha de Creación'];
    }

    public function map($project): array
    {
        return [
            $project->id,
            $project->name,
            $project->description,
            $project->status,
            $project->created_at,
        ];
    }
}
