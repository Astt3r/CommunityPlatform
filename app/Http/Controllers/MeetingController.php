<?php

namespace App\Http\Controllers;

use App\Models\Meeting;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Requests\MeetingRequest;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use App\Models\NeighborhoodAssociation;
use App\Models\Neighbor;

class MeetingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $filters = $request->only('main_topic', 'status', 'neighborhood_association_id');

        $meetingsQuery = Meeting::query()
            ->when($filters['main_topic'] ?? null, function ($query, $main_topic) {
                $query->where('main_topic', 'like', "%$main_topic%");
            })
            ->when($filters['status'] ?? null, function ($query, $status) {
                $query->where('status', $status);
            });

        if ($user->role === 'board_member') {
            // Acceder al vecino asociado al usuario
            $neighbor = $user->neighbor()->with('neighborhoodAssociation')->first();

            if ($neighbor && $neighbor->neighborhoodAssociation) {
                $associationId = $neighbor->neighborhoodAssociation->id;

                // Filtrar reuniones de la junta del vecino y reuniones generales
                $meetingsQuery->where(function ($query) use ($associationId) {
                    $query->where('neighborhood_association_id', $associationId)
                        ->orWhereNull('neighborhood_association_id');
                });
            } else {
                // Si no tiene una junta asignada, mostrar solo reuniones generales
                $meetingsQuery->whereNull('neighborhood_association_id');
            }

            $allAssociations = collect(); // No mostrar el dropdown para board_members
        } else {
            // Filtrar por neighborhood_association_id si está presente
            if ($filters['neighborhood_association_id'] ?? null) {
                $meetingsQuery->where('neighborhood_association_id', $filters['neighborhood_association_id']);
            }
            $allAssociations = NeighborhoodAssociation::select('id', 'name')->get();
        }

        $meetings = $meetingsQuery->paginate(10);

        return inertia('Meetings/Index', [
            'meetings' => $meetings,
            'filters' => $filters,
            'allAssociations' => $allAssociations,
            'userRole' => $user->role,
        ]);
    }




    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $user = $request->user();

        // Obtener el vecino asociado al usuario (si aplica)
        $neighbor = Neighbor::where('user_id', $user->id)->first();

        if ($user->role === 'board_member') {
            // Solo cargar la asociación asignada al vecino
            if (!$neighbor || !$neighbor->neighborhood_association_id) {
                abort(403, 'No tienes una asociación asignada.');
            }

            $association = NeighborhoodAssociation::find($neighbor->neighborhood_association_id, ['id', 'name']);
            if (!$association) {
                abort(403, 'No tienes una asociación válida.');
            }

            $associations = collect([$association]); // Convertir a colección

        } elseif ($user->role === 'admin') {
            // Los administradores pueden ver todas las asociaciones
            $associations = NeighborhoodAssociation::all(['id', 'name']);
        } else {
            abort(403, 'No tienes permiso para crear reuniones.');
        }

        return Inertia::render('Meetings/Create', [
            'userRole' => $user->role, // Pasar el rol del usuario
            'associations' => $associations,
        ]);
    }




    public function store(Request $request)
    {
        $user = $request->user();

        // Obtener el vecino asociado al usuario
        $neighbor = Neighbor::where('user_id', $user->id)->first();

        if (!$neighbor) {
            abort(403, 'No estás asociado a ninguna junta de vecinos.');
        }

        $rules = [
            'meeting_date' => 'required|date|after:now',
            'main_topic' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'location' => 'required|string|max:255',
            'organized_by' => 'required|string|max:255',
            'result' => 'nullable|string|max:1000',
            'status' => 'required|in:scheduled,completed,canceled',
            'neighborhood_association_id' => 'required|exists:neighborhood_associations,id',
        ];

        // Ajustar validación para los board_members
        if ($user->role === 'board_member') {
            $rules['neighborhood_association_id'] .= '|in:' . $neighbor->neighborhood_association_id;
        }

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        // Crear reunión
        $meeting = new Meeting();
        $meeting->meeting_date = Carbon::parse($request->input('meeting_date'))->toDateTimeString();
        $meeting->main_topic = $request->input('main_topic');
        $meeting->description = $request->input('description');
        $meeting->location = $request->input('location');
        $meeting->organized_by = $request->input('organized_by');
        $meeting->result = $request->input('result');
        $meeting->status = $request->input('status');
        $meeting->neighborhood_association_id = $request->input('neighborhood_association_id');
        $meeting->save();

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
        $meeting = Meeting::findOrFail($id);
        $associations = NeighborhoodAssociation::all(['id', 'name']);
        $userRole = auth()->user()->role;

        return Inertia::render('Meetings/Edit', [
            'meeting' => $meeting,
            'associations' => $associations,
            'userRole' => $userRole, // Enviar el rol del usuario
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $meeting = Meeting::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'meeting_date' => 'required|date|after:now',
            'main_topic' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'location' => 'required|string|max:255',
            'organized_by' => 'required|string|max:255',
            'result' => 'nullable|string|max:1000',
            'status' => 'required|in:scheduled,completed,canceled',
            'neighborhood_association_id' => 'required|exists:neighborhood_associations,id',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        // Prevenir cambios de la junta de vecinos para board_member
        if (auth()->user()->role === 'board_member') {
            $request->merge([
                'neighborhood_association_id' => $meeting->neighborhood_association_id,
            ]);
        }

        $meeting->update($request->all());

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
