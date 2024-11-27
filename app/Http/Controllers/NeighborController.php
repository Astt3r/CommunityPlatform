<?php

namespace App\Http\Controllers;

use App\Models\Neighbor;
use App\Models\NeighborhoodAssociation;
use App\Http\Requests\NeighborRequest;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;


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



    public function store(NeighborRequest $request)
    {
        // Validar los datos
        $validated = $request->validated();

        // Crear un nuevo vecino
        $neighbor = Neighbor::create($validated);

        // Actualizar el número de miembros de la asociación
        $neighbor->neighborhoodAssociation->updateNumberOfMembers();

        // Redirigir con un mensaje de éxito
        return redirect()->route('neighbors.index')->with('success', 'Vecino creado exitosamente.');
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


    public function update(Request $request, Neighbor $neighbor)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'nullable|unique:neighbors,user_id,' . $neighbor->id,
            'address' => 'required|string|max:255',
            'identification_number' => 'required|string|max:255',
            'registration_date' => 'required|date',
            'birth_date' => 'required|date',
            'status' => 'required|string',
            'last_participation_date' => 'nullable|date',
            'neighborhood_association_id' => 'required|exists:neighborhood_associations,id',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        // Guardar la asociación anterior para actualizarla si cambió
        $oldAssociation = $neighbor->neighborhoodAssociation;

        // Actualizar el vecino
        $neighbor->update($request->all());

        // Actualizar el número de miembros de la asociación antigua si cambió
        if ($oldAssociation->id !== $neighbor->neighborhood_association_id) {
            $oldAssociation->updateNumberOfMembers();
        }

        // Actualizar el número de miembros de la nueva asociación
        $neighbor->neighborhoodAssociation->updateNumberOfMembers();

        return redirect()->route('neighbors.index')->with('success', 'Vecino actualizado exitosamente.');
    }




    public function destroy(Neighbor $neighbor)
    {
        // Obtener la asociación antes de eliminar el vecino
        $association = $neighbor->neighborhoodAssociation;

        // Eliminar el vecino
        $neighbor->delete();

        // Actualizar el número de miembros de la asociación
        $association->updateNumberOfMembers();

        return redirect()->route('neighbors.index')->with('success', 'Vecino eliminado exitosamente');
    }



}