<?php

namespace App\Http\Controllers;

use App\Models\Neighbor;
use App\Models\NeighborhoodAssociation;
use App\Http\Requests\NeighborRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
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



    public function store(Request $request)
    {
        $validatedData = $request->validate([
            // User fields
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|confirmed|min:8',
            
            // Neighbor fields
            'address' => 'required|string|max:255',
            'identification_number' => 'required|string|max:50',
            'registration_date' => 'required|date',
            'birth_date' => 'required|date',
            'status' => 'required|string',
            'neighborhood_association_id' => 'required|exists:neighborhood_associations,id',
        ]);

        DB::transaction(function () use ($validatedData) {
            // Create User
            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
            ]);

            // Create Neighbor
            Neighbor::create([
                'user_id' => $user->id,
                'address' => $validatedData['address'],
                'identification_number' => $validatedData['identification_number'],
                'registration_date' => $validatedData['registration_date'],
                'birth_date' => $validatedData['birth_date'],
                'status' => $validatedData['status'],
                'neighborhood_association_id' => $validatedData['neighborhood_association_id'],
            ]);
        });

        return redirect()->route('neighbors.index')->with('success', 'Vecino y usuario creados exitosamente.');
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
                'user' => $neighbor->user ? [
                    'name' => $neighbor->user->name,
                    'email' => $neighbor->user->email,
                    'id' => $neighbor->user->id,
                ] : null,
            ],
            'associations' => $associations,
            'users' => $users, // Enviamos los usuarios para el dropdown
        ]);
    }



    public function update(Request $request, Neighbor $neighbor)
    {
        $validatedData = $request->validate([
            // Campos de User
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $neighbor->user_id,

            // Campos de Neighbor
            'address' => 'required|string|max:255',
            'identification_number' => 'required|string|max:50',
            'registration_date' => 'required|date',
            'birth_date' => 'required|date',
            'status' => 'required|string',
            'neighborhood_association_id' => 'required|exists:neighborhood_associations,id',
        ]);

        DB::transaction(function () use ($validatedData, $neighbor) {
            // Actualizar el usuario relacionado
            $user = $neighbor->user;
            $user->update([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
            ]);

            // Actualizar el vecino
            $neighbor->update([
                'address' => $validatedData['address'],
                'identification_number' => $validatedData['identification_number'],
                'registration_date' => $validatedData['registration_date'],
                'birth_date' => $validatedData['birth_date'],
                'status' => $validatedData['status'],
                'neighborhood_association_id' => $validatedData['neighborhood_association_id'],
            ]);
        });

        return redirect()->route('neighbors.index')->with('success', 'Vecino y usuario actualizados exitosamente.');
    }


    public function destroy(Neighbor $neighbor)
    {
        // Obtener la asociación antes de eliminar el vecino
        $association = $neighbor->neighborhoodAssociation;

        // Eliminar el usuario asociado, si existe
        if ($neighbor->user) {
            $neighbor->user->delete();
        }

        // Eliminar el vecino
        $neighbor->delete();

        // Actualizar el número de miembros de la asociación
        $association->updateNumberOfMembers();

        return redirect()->route('neighbors.index')->with('success', 'Vecino y usuario asociado eliminados exitosamente');
    }




}