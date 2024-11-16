<?php

namespace App\Http\Controllers;

use App\Models\Neighbor;
use App\Models\NeighborhoodAssociation;
use Illuminate\Http\Request;
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
                'status' => $neighbor->status,
                'last_participation_date' => $neighbor->last_participation_date,
                'neighborhood_association_id' => $neighbor->neighborhood_association_id,
                'user_name' => $neighbor->user ? $neighbor->user->name : null,
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
            'user_id' => 'required|exists:users,id',
        ]);

        Neighbor::create($validated);

        return redirect()->route('neighbors.index')->with('success', 'Neighbor created successfully.');
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
            ],
            'associations' => $associations,
        ]);
    }

    public function update(Request $request, Neighbor $neighbor)
    {
        $validated = $request->validate([
            'address' => 'sometimes|string|max:255',
            'identification_number' => 'sometimes|string|max:255|unique:neighbors,identification_number,' . $neighbor->id,
            'registration_date' => 'sometimes|date',
            'birth_date' => 'sometimes|date',
            'status' => 'sometimes|string|max:50',
            'last_participation_date' => 'sometimes|date',
            'neighborhood_association_id' => 'sometimes|exists:neighborhood_associations,id',
            'user_id' => 'nullable|exists:users,id',
        ]);

        $neighbor->update($validated);

        return redirect()->route('neighbors.index')->with('success', 'Neighbor updated successfully.');
    }

    public function destroy(Neighbor $neighbor)
    {
        $neighbor->delete();

        return response()->json(null, 204);
    }

    public function create()
    {
        $associations = NeighborhoodAssociation::all(['id', 'name']);
        return Inertia::render('Neighbor/Create', [
            'associations' => $associations,
        ]);
    }
}