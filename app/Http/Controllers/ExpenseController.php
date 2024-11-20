<?php

namespace App\Http\Controllers;


use App\Models\Expense;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\NeighborhoodAssociation; // Asegúrate de importar este modelo
use App\Models\ExpenseType; // Asegúrate de importar este modelo
use App\Models\Neighbor; // Asegúrate de importar este modelo
use App\Models\User; // Asegúrate de importar este modelo





class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $expenses = Expense::with('type')->paginate(10); // Carga relación 'type' y paginación
        return Inertia::render('Finance/Expenses/Index', [
            'expenses' => $expenses,
        ]);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Obtener el vecino asociado al usuario autenticado
        $neighbor = Neighbor::where('user_id', auth()->id())->first();

        // Validar si existe un vecino asociado a una junta
        if (!$neighbor || !$neighbor->neighborhood_association_id) {
            return redirect()->route('expenses.index')
                ->withErrors(['message' => 'No estás asociado a ninguna junta de vecinos.']);
        }

        return Inertia::render('Finance/Expenses/Create', [
            'expenseTypes' => ExpenseType::all(),
        ]);
    }




    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Obtener el vecino asociado al usuario autenticado
        $neighbor = Neighbor::where('user_id', auth()->id())->first();

        // Validar que el vecino exista y esté asociado a una junta
        if (!$neighbor || !$neighbor->neighborhood_association_id) {
            return redirect()->route('expenses.index')
                ->withErrors(['message' => 'No estás asociado a ninguna junta de vecinos.']);
        }

        // Validar los datos del formulario
        $validated = $request->validate([
            'concept' => 'required|string|max:255',
            'responsible' => 'required|string|max:100',
            'date' => 'required|date',
            'amount' => 'required|numeric|min:0',
            'type_id' => 'required|exists:expense_types,id',
            'receipt' => 'nullable|file',
            'status' => 'required|in:approved,pending,rejected',
        ]);

        // Manejar archivo de recibo (opcional)
        if ($request->hasFile('receipt')) {
            $validated['receipt'] = $request->file('receipt')->store('receipts', 'public');
        }

        // Asignar automáticamente la asociación
        $validated['association_id'] = $neighbor->neighborhood_association_id;

        // Crear el gasto
        Expense::create($validated);

        return redirect()->route('expenses.index')->with('message', 'Gasto creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Expense $expense)
    {
        $expense = Expense::with('type', 'association')->findOrFail($expense->id);
        return Inertia::render('Finance/Expenses/Show', ['expense' => $expense]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $expense = Expense::findOrFail($id);
        $expense->delete();

        return redirect()->route('expenses.index')->with('message', 'Gasto eliminado correctamente.');
    }

}
