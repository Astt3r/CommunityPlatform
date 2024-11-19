<?php

namespace App\Http\Controllers;

use App\Models\Neighbor;
use App\Models\NeighborhoodAssociation;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class NeighborController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Neighbor::with('user');

        if ($request->has("name")) {
            $query->whereHas('user', function ($query) use ($request) {
                $query->where('name', 'like', '%' . $request->input('name') . '%');
            });
        }

        $neighbors = $query->paginate(10)->withQueryString();

        return Inertia::render("Neighbor/Index", [
            'neighbors' => $neighbors->through(fn($neighbor) => [
                'id' => $neighbor->id,
                'address' => $neighbor->address,
                'identification_number' => $neighbor->identification_number,
                'registration_date' => $neighbor->registration_date,
                'birth_date' => $neighbor->birth_date,
                'status' => $neighbor->status, // Enviar el estado directamente
                'last_participation_date' => $neighbor->last_participation_date,
                'neighborhood_association_id' => $neighbor->neighborhood_association_id,
                'user' => $neighbor->user ? [
                    'id' => $neighbor->user->id,
                    'name' => $neighbor->user->name,
                    'email' => $neighbor->user->email,
                ] : null,
            ]),
            'filters' => $request->only('name'),
        ]);
    }




    public function store(Request $request)
    {
        $validated = $request->validate([
            'address' => 'required|string|max:255',
            'identification_number' => 'required|string|max:255|unique:neighbors',
            'registration_date' => 'required|date',
            'birth_date' => 'required|date',
            'status' => 'required|string|max:50',
            'last_participation_date' => 'required|date',
            'neighborhood_association_id' => 'required|exists:neighborhood_associations,id',
            'user_id' => 'nullable|exists:users,id', // Hacemos que user_id sea opcional
        ]);

        Neighbor::create($validated);

        return redirect()->route('neighbors.index')->with('success', 'Neighbor created successfully.');
    }



    public function create()
    {
        $associations = NeighborhoodAssociation::all(['id', 'name']);
        $users = User::all(['id', 'name', 'email']); // Obtenemos todos los usuarios con su ID, nombre y correo electrónico

        return Inertia::render('Neighbor/Create', [
            'associations' => $associations,
            'users' => $users, // Enviamos los usuarios para el dropdown
        ]);
    }


    

    public function show($id)
    {
        $neighbor = Neighbor::with('user', 'neighborhoodAssociation')->findOrFail($id);

        return Inertia::render('Neighbor/Show', [
            'neighbor' => [
                'id' => $neighbor->id,
                'user_name' => $neighbor->user ? $neighbor->user->name : 'N/A',
                'address' => $neighbor->address,
                'identification_number' => $neighbor->identification_number,
                'registration_date' => $neighbor->registration_date,
                'birth_date' => $neighbor->birth_date,
                'status' => $neighbor->status,
                'last_participation_date' => $neighbor->last_participation_date,
                'neighborhood_association_name' => $neighbor->neighborhoodAssociation ? $neighbor->neighborhoodAssociation->name : 'N/A',
            ],
        ]);
    }



    public function edit($id)
    {
        $neighbor = Neighbor::with('user', 'neighborhoodAssociation')->findOrFail($id);
        $associations = NeighborhoodAssociation::all(['id', 'name']);
        $users = User::all(['id', 'name', 'email']); // Obtenemos todos los usuarios con su ID, nombre y correo electrónico

        return Inertia::render('Neighbor/Edit', [
            'neighbor' => [
                'id' => $neighbor->id,
                'address' => $neighbor->address,
                'identification_number' => $neighbor->identification_number,
                'registration_date' => $neighbor->registration_date,
                'birth_date' => $neighbor->birth_date,
                'status' => $neighbor->status,
                'last_participation_date' => $neighbor->last_participation_date,
                'neighborhood_association_id' => $neighbor->neighborhood_association_id,
                'user_name' => $neighbor->user ? $neighbor->user->name : null,
                'user_id' => $neighbor->user_id, // Aseguramos incluir la ID del usuario asignado
            ],
            'associations' => $associations,
            'users' => $users, // Enviamos los usuarios para el dropdown
        ]);
    }


    public function update(Request $request, $id)
    {
        $neighbor = Neighbor::findOrFail($id);

        $validatedData = $request->validate([
            'address' => 'required|string|max:255',
            'identification_number' => 'required|string|max:255',
            'registration_date' => 'required|date',
            'birth_date' => 'required|date',
            'status' => 'required|string',
            'last_participation_date' => 'nullable|date',
            'neighborhood_association_id' => 'required|exists:neighborhood_associations,id',
            'user_id' => 'nullable|exists:users,id',
        ]);

        // Actualizar los campos del modelo Neighbor
        $neighbor->update($validatedData);

        return redirect()->route('neighbors.index')->with('success', 'Vecino actualizado con éxito.');
    }


    public function destroy(Neighbor $neighbor)
    {
        $neighbor->delete();

        return response()->json(null, 204);
    }

    
}