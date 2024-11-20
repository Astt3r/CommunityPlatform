<?php

namespace App\Http\Controllers;

use App\Models\ExpenseType;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use Inertia\Inertia;


class ExpenseTypeController extends Controller
{
    public function index()
    {
        $expenseTypes = ExpenseType::paginate(10);
        return Inertia::render('Finance/ExpenseTypes/Index', [
            'expenseTypes' => $expenseTypes,
        ]);
    }

    public function create()
    {
        return Inertia::render('Finance/ExpenseTypes/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'description' => 'nullable|string|max:255',
            'code' => 'required|string|max:20|unique:expense_types,code',
            'status' => 'required|in:active,inactive',
            'effective_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:effective_date',
        ]);

        // Agregar el campo `created_by` automáticamente
        $validated['created_by'] = auth()->id();

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
