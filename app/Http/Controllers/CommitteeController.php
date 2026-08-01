<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommitteeRequest;
use App\Models\Committee;
use App\Models\Neighbor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommitteeController extends Controller
{
    /**
     * Listar los comités.
     */
    public function index(Request $request)
    {
        $neighbor = Neighbor::where('user_id', auth()->id())->first();

        if (! $neighbor) {
            return redirect()->route('dashboard')
                ->withErrors(['message' => 'No tienes un perfil de vecino asociado.']);
        }

        if (! $neighbor->neighborhood_association_id) {
            return redirect()->route('dashboard')
                ->withErrors(['message' => 'No estás asociado a ninguna junta de vecinos.']);
        }

        $committees = Committee::where('neighborhood_association_id', $neighbor->neighborhood_association_id)->get();

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
        $this->authorize('create', Committee::class);
        // Obtener al vecino asociado al usuario autenticado
        $neighbor = Neighbor::where('user_id', auth()->id())->first();

        // Validar si el vecino pertenece a una junta de vecinos
        if (! $neighbor || ! $neighbor->neighborhood_association_id) {
            return redirect()->route('committees.index')
                ->withErrors(['message' => 'No puedes crear un comité si no perteneces a una junta de vecinos.']);
        }

        // Validar los datos enviados en la solicitud
        $validated = $request->validated();

        // Agregar automáticamente la asociación del vecino al comité
        $validated['neighborhood_association_id'] = $neighbor->neighborhood_association_id;
        $validated['created_by'] = auth()->id();

        // Crear el comité
        Committee::create($validated);

        return redirect()->route('committees.index')->with('success', 'Comité creado exitosamente.');
    }

    /**
     * Muestra el formulario para editar un comité existente.
     */
    public function edit(Committee $committee)
    {
        // Obtener al vecino asociado al usuario autenticado
        $neighbor = Neighbor::where('user_id', auth()->id())->first();

        // Verificar si el vecino pertenece a la misma junta de vecinos que el comité
        if (! $neighbor || $committee->neighborhood_association_id !== $neighbor->neighborhood_association_id) {
            abort(403, 'No tienes permiso para acceder a este comité.');
        }

        return Inertia::render('Committees/Edit', [
            'committee' => $committee,
        ]);
    }

    /**
     * Actualiza la información de un comité existente.
     */
    public function update(Request $request, Committee $committee)
    {
        $this->authorize('update', $committee);

        $validated = $request->validate([
            'name' => 'required|string|max:50|unique:committees,name,'.$committee->id,
            'description' => 'required|string|max:255',
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
        $this->authorize('delete', $committee);
        $committee->delete();

        return redirect()->route('committees.index')->with('message', 'Comité eliminado exitosamente.');
    }
}
