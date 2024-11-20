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
    public function index(Request $request)
    {
        $filters = $request->only('main_topic', 'status');
        $meetings = Meeting::query()
            ->when($filters['main_topic'] ?? null, function ($query, $main_topic) {
                $query->where('main_topic', 'like', "%$main_topic%");
            })
            ->when($filters['status'] ?? null, function ($query, $status) {
                $query->where('status', $status);
            })
            ->paginate(10);

        return inertia('Meetings/Index', [
            'meetings' => $meetings,
            'filters' => $filters,
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
        // Registra el valor recibido
        logger()->info('Valor de status:', ['status' => $request->input('status')]);

        $validated = $request->validate([
            'meeting_date' => 'required|date',
            'main_topic' => 'required|string|max:100',
            'description' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'organized_by' => 'nullable|string|max:100',
            'result' => 'nullable|string|max:255',
            'status' => 'required|in:scheduled,completed,canceled',
        ]);

        Meeting::create($validated);

        return redirect()->route('meetings.index')->with('success', 'Reunión creada correctamente.');
    }




    /**
     * Display the specified resource.
     */
    public function show(Meeting $meeting)
    {
        $meeting = Meeting::findOrFail(intval($meeting->id));

        Carbon::setLocale('es');
        $meeting->meeting_date = Carbon::parse($meeting->meeting_date)->translatedFormat('d \d\e F \d\e Y');

        return Inertia::render('Meetings/ShowMeeting', [
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
    public function destroy($id)
    {
        $meeting = Meeting::findOrFail($id);
        $meeting->delete();

        return back()->with('success', 'La reunión fue eliminada correctamente.');
    }
}
