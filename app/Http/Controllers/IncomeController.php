<?php

namespace App\Http\Controllers;

use App\Models\Income;
use App\Models\IncomeType;
use App\Models\Neighbor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IncomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $isAdmin = $user->role === 'admin'; // Verificar si el usuario es administrador

        if (!$isAdmin) {
            // Verificar si el usuario pertenece a una asociación vecinal
            $neighbor = Neighbor::where('user_id', $user->id)->first();

            if (!$neighbor || !$neighbor->neighborhoodAssociation) {
                abort(403, 'El usuario no pertenece a ninguna junta de vecinos.');
            }

            $associationId = $neighbor->neighborhoodAssociation->id; // Obtener el ID de la asociación
        }

        $query = Income::with('type', 'association'); // Cargar relaciones necesarias

        if (!$isAdmin) {
            $query->where('association_id', $associationId); // Filtrar por asociación
        }

        $incomes = $query->latest()->paginate(10);

        return Inertia::render('Finance/Incomes/Index', [
            'incomes' => $incomes,
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
                return redirect()->route('incomes.index')
                    ->withErrors(['message' => 'No estás asociado a ninguna junta de vecinos.']);
            }

            $associationId = $neighbor->neighborhood_association_id;

            // Filtrar los tipos de ingreso por la asociación
            $incomeTypes = IncomeType::where('association_id', $associationId)->get();
        } else {
            // Los administradores pueden ver todos los tipos de ingreso
            $incomeTypes = IncomeType::all();
        }

        return Inertia::render('Finance/Incomes/Create', [
            'incomeTypes' => $incomeTypes,
        ]);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $neighbor = Neighbor::where('user_id', auth()->id())->first();

        if (!$neighbor || !$neighbor->neighborhood_association_id) {
            return redirect()->route('incomes.index')
                ->withErrors(['message' => 'No estás asociado a ninguna junta de vecinos.']);
        }

        // Validar los datos del formulario
        $validated = $request->validate([
            'source' => 'required|string|max:255',
            'responsible' => 'required|string|max:100',
            'date' => 'required|date',
            'amount' => 'required|integer|min:0', // Validar como entero
            'type_id' => 'required|exists:income_types,id',
            'status' => 'required|in:active,inactive',
        ]);

        // Asignar automáticamente la asociación
        $validated['association_id'] = $neighbor->neighborhood_association_id;

        // Crear el ingreso
        Income::create($validated);

        return redirect()->route('incomes.index')->with('message', 'Ingreso creado exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Income $income, Request $request)
    {
        $user = $request->user();
        $isAdmin = $user->role === 'admin';

        if (!$isAdmin) {
            $neighbor = Neighbor::where('user_id', $user->id)->first();

            if (!$neighbor || $income->association_id !== $neighbor->neighborhoodAssociation->id) {
                abort(403, 'No tienes permiso para ver este ingreso.');
            }
        }

        $income->load('type', 'association'); // Cargar relaciones necesarias

        return Inertia::render('Finance/Incomes/Show', [
            'income' => $income,
        ]);
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
