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
            'neighborhood_association_id' => 'required|exists:neighborhood_associations,id',
            'user_id' => 'required|exists:users,id',
        ]);

        Resident::create($validated);

        // Redirige a la lista de residentes con un mensaje de éxito
        return redirect()->route('residents.index')->with('success', 'Residente creado exitosamente.');
    }

    public function show($id)
    {
        $resident = Resident::with('user', 'neighborhoodAssociation')->findOrFail($id);

        return Inertia::render('Resident/Show', [
            'resident' => [
                'id' => $resident->id,
                'user_name' => $resident->user ? $resident->user->name : 'N/A',
                'address' => $resident->address,
                'identification_number' => $resident->identification_number,
                'registration_date' => $resident->registration_date,
                'birth_date' => $resident->birth_date,
                'status' => $resident->status,
                'last_participation_date' => $resident->last_participation_date,
                'neighborhood_association_name' => $resident->neighborhoodAssociation ? $resident->neighborhoodAssociation->name : 'N/A',
            ],
        ]);
    }

    public function edit($id)
    {
        $resident = Resident::with('user', 'neighborhoodAssociation')->findOrFail($id);

        return Inertia::render('Resident/Edit', [
            'resident' => [
                'id' => $resident->id,
                'address' => $resident->address,
                'identification_number' => $resident->identification_number,
                'registration_date' => $resident->registration_date,
                'birth_date' => $resident->birth_date,
                'status' => $resident->status,
                'last_participation_date' => $resident->last_participation_date,
                'user_name' => $resident->user ? $resident->user->name : null,
                'neighborhood_association_name' => $resident->neighborhoodAssociation ? $resident->neighborhoodAssociation->name : null,
            ],
        ]);
    }




    public function update(Request $request, Resident $resident)
    {
        $validated = $request->validate([
            'address' => 'sometimes|string|max:255',
            'identification_number' => 'sometimes|string|max:255|unique:residents,identification_number,' . $resident->id,
            'registration_date' => 'sometimes|date',
            'birth_date' => 'sometimes|date',
            'status' => 'sometimes|string|max:50',
            'last_participation_date' => 'sometimes|date',
            'neighborhood_association_id' => 'sometimes|exists:neighborhood_associations,id',
            'user_id' => 'sometimes|exists:users,id',
        ]);

        $resident->update($validated);

        // Redirige a la lista de residentes con un mensaje de éxito
        return redirect()->route('residents.index')->with('success', 'Residente actualizado exitosamente.');
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
