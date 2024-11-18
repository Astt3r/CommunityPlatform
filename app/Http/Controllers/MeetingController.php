<?php

namespace App\Http\Controllers;

use App\Models\Meeting;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MeetingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $meetings = Meeting::orderBy("created_at", "desc")->paginate(10);

        return Inertia::render("Meetings/Index", [
            'meetings' => $meetings, // Devuelve todo el objeto de paginación
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Meetings/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar los datos recibidos
        $validated = $request->validate([
            'meeting_date' => 'required|date',
            'main_topic' => 'required|string|max:100',
            'description' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'organized_by' => 'nullable|string|max:100',
            'result' => 'nullable|string|max:255',
            'status' => 'required|in:scheduled,completed,canceled', // Validar el estado
        ]);

        // Crear la reunión con los datos validados
        Meeting::create($validated);

        return redirect()->route('meetings.index')->with('success', 'Reunión creada exitosamente.');
    }


    /**
     * Display the specified resource.
     */
    public function show(Meeting $meeting)
    {
        $meeting = Meeting::findOrFail(intval($meeting->id));

        Carbon::setLocale('es');
        $meeting->meeting_date = Carbon::parse($meeting->meeting_date)->translatedFormat('d \d\e F \d\e Y');

        return Inertia::render('Meetings/Show', [
            'meeting' => $meeting,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Meeting $meeting)
    {
        return Inertia::render('Meetings/Edit', [
            'meeting' => $meeting, // Se pasa directamente al componente Edit.jsx
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Meeting $meeting)
    {
        // Validar los datos del formulario
        $validated = $request->validate([
            'meeting_date' => 'required|date',
            'main_topic' => 'required|string|max:100',
            'description' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'organized_by' => 'nullable|string|max:100',
            'result' => 'nullable|string|max:255',
            'status' => 'required|in:scheduled,completed,canceled', // Incluir el estado
        ]);

        // Actualizar la reunión con los datos validados
        $meeting->update($validated);

        return redirect()->route('meetings.index')->with('success', 'Reunión actualizada exitosamente.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Meeting $meeting)
    {
        $meeting->delete();

        return redirect()->route('meetings.index')->with('success', 'Reunión eliminada exitosamente.');
    }
}
