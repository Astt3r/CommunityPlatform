<?php

namespace App\Http\Controllers;

use App\Models\ExpenseType;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Http\Requests\ExpenseTypeRequest;
use Inertia\Inertia;
use App\Models\Neighbor;


class ExpenseTypeController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $isAdmin = $user->role === 'admin';

        if (!$isAdmin) {
            $neighbor = Neighbor::where('user_id', $user->id)->first();

            if (!$neighbor || !$neighbor->neighborhoodAssociation) {
                abort(403, 'No estás asociado a ninguna junta de vecinos.');
            }

            $associationId = $neighbor->neighborhoodAssociation->id;

            // Filtrar tipos de gasto por asociación
            $expenseTypes = ExpenseType::where('association_id', $associationId)
                ->latest()
                ->paginate(10);
        } else {
            // Administradores ven todos los tipos, incluso los sin asociación
            $expenseTypes = ExpenseType::latest()->paginate(10);
        }

        return Inertia::render('Finance/ExpenseTypes/Index', [
            'expenseTypes' => $expenseTypes,
        ]);
    }










    public function create()
    {
        return Inertia::render('Finance/ExpenseTypes/Create');
    }

    public function store(ExpenseTypeRequest $request)
    {
        $user = $request->user();

        // Determinar si el usuario es admin o pertenece a una asociación
        $associationId = null; // Por defecto, null para administradores

        if ($user->role !== 'admin') {
            $neighbor = Neighbor::where('user_id', $user->id)->first();

            if (!$neighbor || !$neighbor->neighborhoodAssociation) {
                abort(403, 'No estás asociado a ninguna junta de vecinos.');
            }

            $associationId = $neighbor->neighborhoodAssociation->id;
        }

        // Validar los datos
        $validated = $request->validated();

        // Asignar el creador y la asociación
        $validated['created_by'] = auth()->id();
        $validated['association_id'] = $associationId;

        // Crear el tipo de gasto
        ExpenseType::create($validated);

        return redirect()->route('expense-types.index')->with('message', 'Tipo de gasto creado exitosamente.');
    }




    public function edit(ExpenseType $expenseType)
    {
        return Inertia::render('Finance/ExpenseTypes/Edit', [
            'expenseType' => $expenseType,
        ]);
    }

    public function update(Request $request, ExpenseType $expenseType)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'description' => 'nullable|string|max:255',
            'code' => 'required|string|max:20|unique:expense_types,code,' . $expenseType->id,
            'status' => 'required|in:active,inactive',
            'effective_date' => 'nullable|date',
            'end_date' => 'nullable|date|after:effective_date',
        ]);

        $expenseType->update($validated);

        return redirect()->route('expense-types.index')->with('message', 'Tipo de gasto actualizado exitosamente.');
    }

    public function destroy(ExpenseType $expenseType)
    {
        $expenseType->delete();

        return redirect()->route('expense-types.index')->with('message', 'Tipo de gasto eliminado exitosamente.');
    }
}
