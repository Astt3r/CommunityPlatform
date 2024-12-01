<?php

namespace App\Http\Controllers;

use App\Models\Meeting;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Requests\MeetingRequest;
use Illuminate\Support\Facades\Validator;
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
        // Validar los datos ingresados
        $validator = Validator::make($request->all(), [
            'meeting_date' => 'required|date|after:now',
            'main_topic' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'location' => 'required|string|max:255',
            'organized_by' => 'required|string|max:255',
            'result' => 'nullable|string|max:1000',
            'status' => 'required|in:scheduled,completed,canceled',
        ]);

        // Enviar respuesta con error si falla la validación
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        // Crear la nueva reunión
        $meeting = new Meeting();
        $meeting->meeting_date = Carbon::parse($request->input('meeting_date'))->toDateTimeString();
        $meeting->main_topic = $request->input('main_topic');
        $meeting->description = $request->input('description');
        $meeting->location = $request->input('location');
        $meeting->organized_by = $request->input('organized_by');
        $meeting->result = $request->input('result');
        $meeting->status = $request->input('status');
        $meeting->save();

        // Redirigir con un mensaje de éxito
        return redirect()->route('meetings.index')->with('success', 'Reunión creada exitosamente.');
    }





    /**
     * Display the specified resource.
     */
    public function show(Meeting $meeting)
    {
        return Inertia::render('Meetings/ShowMeeting', [
            'meeting' => [
                'id' => $meeting->id,
                'main_topic' => $meeting->main_topic,
                'meeting_date' => $meeting->meeting_date, // Enviamos el valor original de la base de datos
                'location' => $meeting->location,
                'description' => $meeting->description,
                'organized_by' => $meeting->organized_by,
                'status' => $meeting->status,
                'result' => $meeting->result,
                'attendees' => $meeting->attendees, // Asegúrate de incluir esta relación si es necesaria.
            ],
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
    public function update(Request $request, $id)
{
    // Buscar la reunión que se va a actualizar
    $meeting = Meeting::findOrFail($id);

    // Validar los datos ingresados
    $validator = Validator::make($request->all(), [
        'meeting_date' => 'required|date|after:now',
        'main_topic' => 'required|string|max:255',
        'description' => 'nullable|string|max:1000',
        'location' => 'required|string|max:255',
        'organized_by' => 'required|string|max:255',
        'result' => 'nullable|string|max:1000',
        'status' => 'required|in:scheduled,completed,canceled',
    ]);

    // Enviar respuesta con error si falla la validación
    if ($validator->fails()) {
        return redirect()->back()->withErrors($validator)->withInput();
    }

    // Actualizar los campos de la reunión
    $meeting->meeting_date = Carbon::parse($request->input('meeting_date'))->toDateTimeString();
    $meeting->main_topic = $request->input('main_topic');
    $meeting->description = $request->input('description');
    $meeting->location = $request->input('location');
    $meeting->organized_by = $request->input('organized_by');
    $meeting->result = $request->input('result');
    $meeting->status = $request->input('status');
    $meeting->save();

    // Redirigir con un mensaje de éxito
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
