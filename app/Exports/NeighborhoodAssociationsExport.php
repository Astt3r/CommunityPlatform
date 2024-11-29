<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use App\Models\NeighborhoodAssociation;
use Maatwebsite\Excel\Concerns\FromCollection;

class NeighborhoodAssociationsExport implements FromCollection, WithHeadings, WithMapping
{
    protected $filter; // Propiedad para el filtro

    public function __construct($filter = [])
    {
        $this->filter = $filter; // Asigna el filtro pasado al constructor
    }

    public function collection()
    {
        $query = NeighborhoodAssociation::query();

        if (!empty($this->filter['latest'])) {
            $query->latest()->take((int) $this->filter['latest']);
        }

        return $query->get();
    }


    public function headings(): array
    {
        return ['ID', 'Nombre', 'Dirección', 'Teléfono', 'Correo', 'Fecha de Fundación', 'Activo'];
    }

    public function map($neighborhood): array
    {
        return [
            $neighborhood->id ?? 'N/A',
            $neighborhood->name ?? 'N/A',
            $neighborhood->address ?? 'N/A',
            $neighborhood->phone ?? 'N/A',
            $neighborhood->email ?? 'N/A',
            $neighborhood->date_of_funding ? \Carbon\Carbon::parse($neighborhood->date_of_funding)->format('Y-m-d') : 'N/A',
            $neighborhood->is_active ? 'Sí' : 'No',
        ];
    }

}
