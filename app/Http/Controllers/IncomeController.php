<?php

namespace App\Http\Controllers;

use App\Models\Income;
use App\Models\IncomeType;
use App\Models\Neighbor;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\IncomeRequest;
class IncomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $incomes = Income::with('type')->paginate(10); // Carga la relación 'type' y aplica paginación
        return Inertia::render('Finance/Incomes/Index', [
            'incomes' => $incomes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Obtener el vecino asociado al usuario autenticado
        $neighbor = Neighbor::where('user_id', auth()->id())->first();

        // Validar si el vecino está asociado a una junta
        if (!$neighbor || !$neighbor->neighborhood_association_id) {
            return redirect()->route('incomes.index')
                ->withErrors(['message' => 'No estás asociado a ninguna junta de vecinos.']);
        }

        return Inertia::render('Finance/Incomes/Create', [
            'incomeTypes' => IncomeType::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(IncomeRequest $request)
    {
        // Obtener el vecino asociado al usuario autenticado
        $neighbor = Neighbor::where('user_id', auth()->id())->first();

        // Validar que el vecino esté asociado a una junta
        if (!$neighbor || !$neighbor->neighborhood_association_id) {
            return redirect()->route('incomes.index')
                ->withErrors(['message' => 'No estás asociado a ninguna junta de vecinos.']);
        }

        // Validar y asignar datos
        $validated = $request->validated();
        $validated['association_id'] = $neighbor->neighborhood_association_id;

        // Crear el ingreso
        Income::create($validated);

        return redirect()->route('incomes.index')->with('message', 'Ingreso creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Income $income)
    {
        $income = Income::with('type', 'association')->findOrFail($income->id);
        return Inertia::render('Finance/Incomes/Show', ['income' => $income]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Income $income)
    {
        return Inertia::render('Finance/Incomes/Edit', [
            'income' => $income,
            'incomeTypes' => IncomeType::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Income $income)
    {
        // Validar los datos del formulario
        $validated = $request->validate([
            'source' => 'required|string|max:255',
            'responsible' => 'required|string|max:100',
            'date' => 'required|date',
            'amount' => 'required|numeric|min:0',
            'type_id' => 'required|exists:income_types,id',
            'status' => 'required|in:active,inactive',
        ]);

        // Actualizar el ingreso
        $income->update($validated);

        return redirect()->route('incomes.index')->with('message', 'Ingreso actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $income = Income::findOrFail($id);
        $income->delete();

        return redirect()->route('incomes.index')->with('message', 'Ingreso eliminado correctamente.');
    }
}
