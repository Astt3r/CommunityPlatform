<?php

namespace App\Http\Controllers;

use App\Models\Resident;
use App\Models\NeighborhoodAssociation;
use Illuminate\Http\Request;
use Inertia\Inertia;


class ResidentController extends Controller
{
    public function index(Request $request)
    {
        $query = Resident::with('user'); // Cargar la relación 'user'

        if ($request->has("name")) {
            $query->whereHas('user', function ($query) use ($request) {
                $query->where('name', 'like', '%' . $request->input('name') . '%');
            });
        }

        $residents = $query->paginate(10)->withQueryString();

        return Inertia::render("Resident/Index", [
            'residents' => $residents->through(fn($resident) => [
                'id' => $resident->id,
                'address' => $resident->address,
                'identification_number' => $resident->identification_number,
                'registration_date' => $resident->registration_date,
                'birth_date' => $resident->birth_date,
                'status' => $resident->status,
                'last_participation_date' => $resident->last_participation_date,
                'neighborhood_association_id' => $resident->neighborhood_association_id,
                'user_name' => $resident->user ? $resident->user->name : null, // Obtener el nombre del usuario asociado
            ]),
            'filters' => $request->only('name'),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'address' => 'required|string|max:255',
            'identification_number' => 'required|string|max:255|unique:residents',
            'registration_date' => 'required|date',
            'birth_date' => 'required|date',
            'status' => 'required|string|max:50',
            'last_participation_date' => 'required|date',
            'neighborhood_association_id' => 'required|exists:neighborhood_associations,id', // Validación de clave foránea
            'user_id' => 'required|exists:users,id',
        ]);

        $resident = Resident::create($validated);

        return response()->json($resident, 201);
    }


    public function update(Request $request, Resident $Resident)
    {
        $validated = $request->validate([
            'address' => 'sometimes|string|max:255',
            'identification_number' => 'sometimes|string|max:255|unique:Residents,identification_number,' . $Resident->id,
            'registration_date' => 'sometimes|date',
            'birth_date' => 'sometimes|date',
            'status' => 'sometimes|string|max:50',
            'last_participation_date' => 'sometimes|date',
            'Residenthood_association_id' => 'sometimes|exists:NeighborhoodAssociations,id',
            'user_id' => 'sometimes|exists:users,id',
        ]);

        $Resident->update($validated);

        return response()->json($Resident);
    }

    public function destroy(Resident $Resident)
    {
        $Resident->delete();

        return response()->json(null, 204);
    }
    
    public function create()
    {
        $associations = NeighborhoodAssociation::all(['id', 'name']);
        return Inertia::render('Resident/Create', [
            'associations' => $associations,
        ]);
    }

}
