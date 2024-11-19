<?php

namespace App\Http\Controllers;


use App\Models\Expense;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\NeighborhoodAssociation; // Asegúrate de importar este modelo



class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $expenses = Expense::paginate(10); // 10 por página
        return Inertia::render('Finance/Expenses/Index', [
            'expenses' => $expenses,
        ]);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Finance/Expenses/Create', [
            // 'expenseTypes' => ExpenseType::all(),
            'associations' => NeighborhoodAssociation::all(),
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Expense $expense)
    {
        $expense = Expense::with('type', 'association')->findOrFail($id);
        return Inertia::render('finance/expenses/Show', ['expense' => $expense]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Expense $expense)
    {
        // $expense = Expense::findOrFail($id);
        // $types = ExpenseType::all();
        // $associations = NeighborhoodAssociation::all();
        // return Inertia::render('finance/expenses/Edit', [
        //     'expense' => $expense,
        //     'types' => $types,
        //     'associations' => $associations,
        // ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Expense $expense)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $expense = Expense::findOrFail($id); // Aquí `$id` debe ser proporcionado por la ruta

        $expense->delete();

        return redirect()->route('expenses.index')->with('success', 'Gasto eliminado correctamente.');
    }

}
