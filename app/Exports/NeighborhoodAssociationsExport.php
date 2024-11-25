<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use App\Models\NeighborhoodAssociation; // Importar el modelo
use Maatwebsite\Excel\Concerns\FromCollection;


class NeighborhoodAssociationsExport implements FromCollection, WithHeadings, WithMapping
{
    public function collection()
    {
        return NeighborhoodAssociation::all();
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
