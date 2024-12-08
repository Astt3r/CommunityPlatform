<?php

namespace App\Http\Controllers;

use App\Models\MeetingAttendance;
use App\Models\Neighbor;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\Meeting;

class MeetingAttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    public function storeAttendance(Request $request, $meetingId)
    {
        Log::info($request->all()); // Registrar los datos recibidos para depuración

        $validated = $request->validate([
            'attendance' => 'required|array',
            'attendance.*' => 'boolean', // Cada valor debe ser booleano
            'absenceReasons' => 'required|array',
            'absenceReasons.*' => 'nullable|string', // Cada motivo de ausencia puede ser nulo o una cadena de texto
        ]);

        // Obtener IDs de vecinos activos
        $activeNeighborIds = Neighbor::where('status', 'active')->pluck('id')->toArray();

        // Limpiar registros existentes para vecinos inactivos
        MeetingAttendance::where('meeting_id', $meetingId)
            ->whereNotIn('neighbor_id', $activeNeighborIds)
            ->delete();

        // Guardar los nuevos registros de asistencia
        foreach ($validated['attendance'] as $neighborId => $attended) {
            if (in_array($neighborId, $activeNeighborIds)) {
                MeetingAttendance::updateOrCreate(
                    ['meeting_id' => $meetingId, 'neighbor_id' => $neighborId],
                    [
                        'attended' => $attended ? 1 : 0,
                        'absence_reason' => $attended ? null : ($validated['absenceReasons'][$neighborId] ?? null),
                    ]
                );
            }
        }

        return redirect()->route('meetings.attendance', $meetingId)
            ->with('message', 'Asistencias registradas correctamente.');
    }

    public function showAttendance($meetingId)
    {
        $meeting = Meeting::findOrFail($meetingId);

        // Obtener vecinos activos de la misma junta de vecinos de la reunión
        $neighbors = Neighbor::where('neighborhood_association_id', $meeting->neighborhood_association_id)
                             ->active() // Filtro de vecinos activos
                             ->with('user:id,name') // Cargar usuario relacionado
                             ->get();

        return inertia('MeetingAttendance/ShowAttendance', [
            'meetingId' => $meetingId,
            'neighbors' => $neighbors,
        ]);
    }

    public function showSummary($meetingId)
    {
        $meeting = Meeting::findOrFail($meetingId);

        // Filtrar asistencias por vecinos de la misma junta de vecinos
        $attendances = MeetingAttendance::where('meeting_id', $meetingId)
            ->whereHas('neighbor', function ($query) use ($meeting) {
                $query->where('neighborhood_association_id', $meeting->neighborhood_association_id);
            })
            ->with('neighbor.user') // Cargar datos del vecino y usuario relacionado
            ->get();

        return inertia('MeetingAttendance/ShowAttendanceSummary', [
            'meetingId' => $meetingId,
            'attendances' => $attendances,
        ]);
    }




    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MeetingAttendance $meetingAttendance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MeetingAttendance $meetingAttendance)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MeetingAttendance $meetingAttendance)
    {
        //
    }
    
}
