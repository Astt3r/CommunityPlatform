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
use App\Http\Requests\ExpenseRequest;





class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index(Request $request)
    {
        $user = $request->user();
        $isAdmin = $user->role === 'admin'; // Asegúrate de que 'role' esté correctamente implementado

        if (!$isAdmin) {
            $neighbor = Neighbor::where('user_id', $user->id)->first();

            if (!$neighbor || !$neighbor->neighborhoodAssociation) {
                abort(403, 'El usuario no pertenece a ninguna junta de vecinos.');
            }

            $associationId = $neighbor->neighborhoodAssociation->id; // Obtener el ID de la asociación
        }

        $query = Expense::with('type', 'association'); // Carga relaciones necesarias

        if (!$isAdmin) {
            $query->where('association_id', $associationId); // Filtrar por asociación
        }

        $expenses = $query->latest()->paginate(10);

        return Inertia::render('Finance/Expenses/Index', [
            'expenses' => $expenses,
        ]);
    }




    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $user = $request->user();
        $isAdmin = $user->role === 'admin'; // Verificar si el usuario es administrador

        if (!$isAdmin) {
            // Verificar si el usuario pertenece a una asociación vecinal
            $neighbor = Neighbor::where('user_id', $user->id)->first();

            if (!$neighbor || !$neighbor->neighborhood_association_id) {
                return redirect()->route('expenses.index')
                    ->withErrors(['message' => 'No estás asociado a ninguna junta de vecinos.']);
            }

            $associationId = $neighbor->neighborhood_association_id;

            // Filtrar los tipos de gasto por la asociación
            $expenseTypes = ExpenseType::where('association_id', $associationId)->get();
        } else {
            // Los administradores pueden ver todos los tipos de gasto
            $expenseTypes = ExpenseType::all();
        }

        return Inertia::render('Finance/Expenses/Create', [
            'expenseTypes' => $expenseTypes,
        ]);
    }





    /**
     * Store a newly created resource in storage.
     */
    public function store(ExpenseRequest $request)
    {
        // Obtener el vecino asociado al usuario autenticado
        $neighbor = Neighbor::where('user_id', auth()->id())->first();

        // Validar que el vecino exista y esté asociado a una junta
        if (!$neighbor || !$neighbor->neighborhood_association_id) {
            return redirect()->route('expenses.index')
                ->withErrors(['message' => 'No estás asociado a ninguna junta de vecinos.']);
        }

        // Validación ya realizada por ExpenseRequest
        $validated = $request->validated();

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
    public function show(Expense $expense, Request $request)
    {
        $user = $request->user();
        $isAdmin = $user->role === 'admin';

        if (!$isAdmin) {
            $neighbor = Neighbor::where('user_id', $user->id)->first();

            if (!$neighbor || $expense->association_id !== $neighbor->neighborhoodAssociation->id) {
                abort(403, 'No tienes permiso para ver este gasto.');
            }
        }

        $expense->load('type', 'association'); // Cargar relaciones necesarias

        return Inertia::render('Finance/Expenses/Show', [
            'expense' => $expense,
        ]);
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

    public function edit(Expense $expense, Request $request)
    {
        $user = $request->user();
        $isAdmin = $user->role === 'admin';

        if (!$isAdmin) {
            $neighbor = Neighbor::where('user_id', $user->id)->first();

            if (
                !$neighbor ||
                $expense->association_id !== $neighbor->neighborhoodAssociation->id
            ) {
                abort(403, 'No tienes permiso para editar este gasto.');
            }
        }

        $expense->load('type'); // Cargar relación de tipo de gasto

        $expenseTypes = ExpenseType::where('association_id', $expense->association_id)->get();

        // Añadir los posibles estados al formulario
        $statuses = ['approved', 'pending', 'rejected'];

        return Inertia::render('Finance/Expenses/Edit', [
            'expense' => $expense,
            'expenseTypes' => $expenseTypes,
            'statuses' => $statuses, // Enviar los estados posibles
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(ExpenseRequest $request, Expense $expense)
    {
        $user = $request->user();
        $isAdmin = $user->role === 'admin';

        if (!$isAdmin) {
            $neighbor = Neighbor::where('user_id', $user->id)->first();

            if (
                !$neighbor ||
                $expense->association_id !== $neighbor->neighborhoodAssociation->id
            ) {
                abort(403, 'No tienes permiso para actualizar este gasto.');
            }
        }

        $validated = $request->validated();

        // Manejar archivo de recibo (opcional)
        if ($request->hasFile('receipt')) {
            $validated['receipt'] = $request->file('receipt')->store('receipts', 'public');
        }

        $expense->update($validated);

        return redirect()->route('expenses.index')->with('message', 'Gasto actualizado correctamente.');
    }

}


