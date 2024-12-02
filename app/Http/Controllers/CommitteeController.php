<?php

namespace App\Http\Controllers;

use App\Models\Committee;
use App\Http\Requests\CommitteeRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommitteeController extends Controller
{
    /**
     * Listar los comités.
     */
    public function index(Request $request)
    {
        $committees = Committee::all(); // Obtener todos los comités

        return Inertia::render('Committees/Index', [
            'committees' => $committees,
        ]);
    }

    /**
     * Muestra el formulario para crear un nuevo comité.
     */
    public function create()
    {
        return Inertia::render('Committees/Create'); // Sin necesidad de pasar `types`
    }

    /**
     * Almacena un comité recién creado en la base de datos.
     */
    public function store(CommitteeRequest $request)
    {
        // Validación ya realizada por CommitteeRequest
        $validated = $request->validated();

        // Agregar datos adicionales
        $validated['created_by'] = auth()->id();

        // Crear el comité
        Committee::create($validated);

        // Redirigir con un mensaje de éxito
        return redirect()->route('committees.index')->with('message', 'Comité creado exitosamente.');
    }

    /**
     * Muestra el formulario para editar un comité existente.
     */
    public function edit(Committee $committee)
    {
        return Inertia::render('Committees/Edit', [
            'committee' => $committee,
        ]);
    }

    /**
     * Actualiza la información de un comité existente.
     */
    public function update(Request $request, Committee $committee)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'description' => 'required|string|max:255',
            'code' => 'nullable|string|max:20|unique:committees,code,' . $committee->id,
            'status' => 'required|in:active,inactive',
            'effective_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:effective_date',
        ]);

        $validated['updated_by'] = auth()->id();

        $committee->update($validated);

        return redirect()->route('committees.index')->with('message', 'Comité actualizado exitosamente.');
    }

    /**
     * Elimina un comité existente.
     */
    public function destroy(Committee $committee)
    {
        $committee->delete();

        return redirect()->route('committees.index')->with('message', 'Comité eliminado exitosamente.');
    }
}
