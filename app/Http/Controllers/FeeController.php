<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Neighbor;
use Inertia\Inertia;
use App\Models\Fee;

class FeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $isAdmin = $user->role === 'admin';

        if (!$isAdmin) {
            $neighbor = Neighbor::with('neighborhoodAssociation')->where('user_id', $user->id)->first();

            if (!$neighbor || !$neighbor->neighborhoodAssociation) {
                abort(403, 'The user does not belong to any neighborhood association.');
            }

            $associationId = $neighbor->neighborhoodAssociation->id;

            $fees = Fee::with('neighbor.user') // Load the neighbor and user relations
                ->whereHas('neighbor.neighborhoodAssociation', function ($query) use ($associationId) {
                    $query->where('id', $associationId);
                })->latest()->paginate(10);
        } else {
            $fees = Fee::with('neighbor.user') // Load the neighbor and user relations
                ->latest()->paginate(10);
        }

        return Inertia::render('Finance/Fees/Index', [
            'fees' => $fees,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $neighbor = Neighbor::where('user_id', $request->user()->id)->first();

        if (!$neighbor || !$neighbor->neighborhoodAssociation) {
            return redirect()->route('fees.index')
                ->withErrors(['message' => 'No estás asociado a ninguna junta de vecinos.']);
        }

        $rules = [
            'amount' => 'required|integer|min:1',
            'due_date' => 'required|date',
            'status' => 'required|in:pending,paid,overdue',
            'paid_date' => 'nullable|date',
            'neighbor_id' => 'required|exists:neighbors,id', // Add validation for neighbor_id
        ];

        $messages = [
            'amount.required' => 'El monto es obligatorio.',
            'amount.integer' => 'El monto debe ser un número entero.',
            'amount.min' => 'El monto debe ser mayor que 0.',
            'due_date.required' => 'La fecha de vencimiento es obligatoria.',
            'due_date.date' => 'La fecha de vencimiento debe ser una fecha válida.',
            'status.required' => 'El estado es obligatorio.',
            'status.in' => 'El estado debe ser uno de los siguientes: pendiente, pagado, atrasado.',
            'paid_date.date' => 'La fecha de pago debe ser una fecha válida.',
            'neighbor_id.required' => 'Debe seleccionar un vecino.',
            'neighbor_id.exists' => 'El vecino seleccionado no es válido.',
        ];

        $validated = $request->validate($rules, $messages);

        // Assign association_id based on the neighbor
        $selectedNeighbor = Neighbor::find($validated['neighbor_id']);
        if (!$selectedNeighbor || !$selectedNeighbor->neighborhoodAssociation) {
            return redirect()->route('fees.index')
                ->withErrors(['message' => 'El vecino seleccionado no está asociado a ninguna junta de vecinos.']);
        }

        $validated['association_id'] = $selectedNeighbor->neighborhoodAssociation->id;

        Fee::create($validated); // Save using validated data

        return redirect()->route('fees.index')->with('message', 'Cuota creada exitosamente.');
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = request()->user();
        $isAdmin = $user->role === 'admin';

        if (!$isAdmin) {
            $neighbor = Neighbor::where('user_id', $user->id)->first();
            if (!$neighbor || !$neighbor->neighborhoodAssociation) {
                abort(403, 'No tienes permiso para crear una cuota.');
            }
            $neighbors = Neighbor::where('neighborhood_association_id', $neighbor->neighborhoodAssociation->id)
                ->with('user') // Eager load the User relationship
                ->get();
        } else {
            $neighbors = Neighbor::all()->with('user');
        }


        return Inertia::render('Finance/Fees/Create', [
            'neighbors' => $neighbors,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Fee $fee, Request $request)
    {
        $user = $request->user();
        $isAdmin = $user->role === 'admin';

        if (!$isAdmin) {
            $neighbor = Neighbor::where('user_id', $user->id)->first();
            if (!$neighbor || $fee->association_id !== $neighbor->neighborhoodAssociation->id) {
                abort(403, 'No tienes permiso para ver esta cuota.');
            }
        }

        return Inertia::render('Finance/Fees/Show', [
            'fee' => $fee,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Fee $fee)
    {
        $user = $request->user();
        $isAdmin = $user->role === 'admin';

        if (!$isAdmin) {
            $neighbor = Neighbor::where('user_id', $user->id)->first();
            if (!$neighbor || $fee->association_id !== $neighbor->neighborhoodAssociation->id) {
                abort(403, 'No tienes permiso para actualizar esta cuota.');
            }
        }

        $validated = $request->validate([
            'amount' => 'required|integer|min:0',
            'due_date' => 'required|date',
            // Add other validations as necessary
        ]);

        $fee->update($validated);

        return redirect()->route('fees.index')->with('message', 'Cuota actualizada correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */

    public function destroy(Fee $fee)
    {
        $user = request()->user();
        $isAdmin = $user->role === 'admin';

        if (!$isAdmin) {
            $neighbor = Neighbor::with('neighborhoodAssociation')
                ->where('user_id', $user->id)
                ->first();

            if (!$neighbor || !$fee->neighbor || !$fee->neighbor->neighborhoodAssociation) {
                abort(403, 'No tienes permiso para eliminar esta cuota.');
            }

            $associationId = $neighbor->neighborhoodAssociation->id;

            // Check if the fee's neighbor's association matches the user's association
            if ($fee->neighbor->neighborhoodAssociation->id !== $associationId) {
                abort(403, 'No tienes permiso para eliminar esta cuota.');
            }
        }

        $fee->delete();

        return redirect()->route('fees.index')->with('success', 'Cuota eliminada correctamente.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Fee $fee)
    {
        $user = request()->user();
        $isAdmin = $user->role === 'admin';

        if (!$isAdmin) {
            $neighbor = Neighbor::where('user_id', $user->id)->first();
            if (!$neighbor || $fee->neighbor->neighborhoodAssociation->id !== $neighbor->neighborhoodAssociation->id) {
                abort(403, 'No tienes permiso para editar esta cuota.');
            }
        }

        // Retrieve neighbors for the dropdown selection
        if ($isAdmin) {
            $neighbors = Neighbor::with('user')->get();
        } else {
            $neighbors = Neighbor::where('neighborhood_association_id', $neighbor->neighborhoodAssociation->id)
                ->with('user')
                ->get();
        }

        return Inertia::render('Finance/Fees/Edit', [
            'fee' => $fee->load('neighbor.user'), // Ensure the fee includes neighbor and user
            'neighbors' => $neighbors,
        ]);
    }
}