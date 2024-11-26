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
        return ['ID', 'Nombre', 'Dirección', 'Teléfono', 'Correo', 'Fecha de Fundación', 'Estado Activo'];
    }

    public function map($neighborhood): array
    {
        return [
            $neighborhood->id,
            $neighborhood->name,
            $neighborhood->address,
            $neighborhood->phone,
            $neighborhood->email,
            $neighborhood->date_of_funding,
            $neighborhood->is_active ? 'Sí' : 'No',
        ];
    }
}
