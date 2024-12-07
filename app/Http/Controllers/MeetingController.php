<?php

namespace App\Http\Controllers;

use App\Models\Meeting;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Requests\MeetingRequest;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use App\Models\NeighborhoodAssociation;

class MeetingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filters = $request->only('main_topic', 'status', 'neighborhood_association_id');

        $meetingsQuery = Meeting::query()
            ->when($filters['main_topic'] ?? null, function ($query, $main_topic) {
                $query->where('main_topic', 'like', "%$main_topic%");
            })
            ->when($filters['status'] ?? null, function ($query, $status) {
                $query->where('status', $status);
            });

        // Filtrar por neighborhood_association_id si el filtro está presente
        if ($filters['neighborhood_association_id'] ?? null) {
            $meetingsQuery->where('neighborhood_association_id', $filters['neighborhood_association_id']);
        }

        $meetings = $meetingsQuery->paginate(10);
        $allAssociations = NeighborhoodAssociation::select('id', 'name')->get();

        return inertia('Meetings/Index', [
            'meetings' => $meetings,
            'filters' => $filters,
            'allAssociations' => $allAssociations,
        ]);
    }




    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $associations = NeighborhoodAssociation::all(['id', 'name']); // Solo los campos necesarios
        return Inertia::render('Meetings/Create', [
            'associations' => $associations,
        ]);
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
            'neighborhood_association_id' => 'required|exists:neighborhood_associations,id', // Validación de la asociación
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
        $meeting->neighborhood_association_id = $request->input('neighborhood_association_id'); // Asignar la ID de la junta vecinal
        $meeting->save();

        // Redirigir con un mensaje de éxito
        return redirect()->route('meetings.index')->with('success', 'Reunión creada exitosamente.');
    }






    /**
     * Display the specified resource.
     */
    public function show(Meeting $meeting)
    {
        $meeting->load('neighborhoodAssociation'); // Cargar la relación con la junta vecinal

        return Inertia::render('Meetings/ShowMeeting', [
            'meeting' => [
                'id' => $meeting->id,
                'main_topic' => $meeting->main_topic,
                'meeting_date' => $meeting->meeting_date,
                'location' => $meeting->location,
                'description' => $meeting->description,
                'organized_by' => $meeting->organized_by,
                'status' => $meeting->status,
                'result' => $meeting->result,
                'neighborhood_association' => $meeting->neighborhoodAssociation ? $meeting->neighborhoodAssociation->name : null, // Junta vecinal o null
            ],
        ]);
    }






    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        // Encuentra la reunión por su ID
        $meeting = Meeting::findOrFail($id);

        // Obtén todas las juntas vecinales para el dropdown
        $associations = NeighborhoodAssociation::all(['id', 'name']);

        // Pasa los datos de la reunión y las juntas vecinales a la vista
        return inertia('Meetings/Edit', [
            'meeting' => $meeting,
            'associations' => $associations,
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
            'neighborhood_association_id' => 'nullable|exists:neighborhood_associations,id', // Permitir nulo
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
        $meeting->neighborhood_association_id = $request->input('neighborhood_association_id'); // Asignar null si no se selecciona
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

        // Eliminar las asistencias relacionadas
        $meeting->attendances()->delete();

        // Eliminar la reunión
        $meeting->delete();

        return back()->with('success', 'La reunión fue eliminada correctamente.');
    }

}
