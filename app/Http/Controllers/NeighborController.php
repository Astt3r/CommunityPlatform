<?php

namespace App\Http\Controllers;

use App\Models\Neighbor;
use App\Models\NeighborhoodAssociation;
use App\Models\Committee;
use App\Models\CommitteeMember;
use App\Http\Requests\NeighborRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;


class NeighborController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $isAdmin = $user->role === 'admin';

        if (!$isAdmin) {
            $neighbor = Neighbor::where('user_id', $user->id)->first();

            if (!$neighbor || !$neighbor->neighborhoodAssociation) {
                abort(403, 'El usuario no pertenece a ninguna junta de vecinos.');
            }

            $neighborhoodAssociationId = $neighbor->neighborhoodAssociation->id;
        }

        $query = Neighbor::with(['user', 'neighborhoodAssociation']);

        if (!$isAdmin) {
            $query->where('neighborhood_association_id', $neighborhoodAssociationId);
        }

        if ($request->has("name")) {
            $query->whereHas('user', function ($query) use ($request) {
                $query->where('name', 'like', '%' . $request->input('name') . '%');
            });
        }

        // If the user is a resident, only show active neighbors
        if ($user->role === 'resident') {
            $query->where('status', 'active');
        }

        $neighbors = $query->paginate(10)->withQueryString();
        $juntasDeVecinos = NeighborhoodAssociation::all();

        return Inertia::render("Neighbor/Index", [
            'neighbors' => $neighbors->through(function ($neighbor) {
                $isBoardMember = $neighbor->user && $neighbor->user->role === 'board_member';

                return [
                    'id' => $neighbor->id,
                    'address' => $neighbor->address,
                    'identification_number' => $neighbor->identification_number,
                    'registration_date' => Carbon::parse($neighbor->registration_date)->format('Y-m-d'),
                    'birth_date' => Carbon::parse($neighbor->birth_date)->format('Y-m-d'),
                    'status' => $neighbor->status,
                    'last_participation_date' => $neighbor->last_participation_date,
                    'neighborhood_association' => $neighbor->neighborhoodAssociation ? [
                        'id' => $neighbor->neighborhoodAssociation->id,
                        'name' => $neighbor->neighborhoodAssociation->name,
                    ] : null,
                    'user' => $neighbor->user ? [
                        'id' => $neighbor->user->id,
                        'name' => $neighbor->user->name,
                        'email' => $neighbor->user->email,
                        'role' => $neighbor->user->role,
                    ] : null,
                    'is_board_member' => $isBoardMember,
                ];
            }),
            'filters' => $request->only('name', 'junta_de_vecino_id', 'is_board_member'),
            'juntasDeVecinos' => $juntasDeVecinos,
        ]);
    }











    public function store(NeighborRequest $request)
    {
        $validatedData = $request->validated();
        $user = $request->user();

        // Verificar si el usuario es board_member
        if ($user->role === 'board_member') {
            $neighbor = Neighbor::where('user_id', $user->id)->first();
            if ($neighbor && $neighbor->neighborhoodAssociation) {
                $associationId = $neighbor->neighborhoodAssociation->id;

                // Validar que la asociación asignada corresponda a la del board_member
                if ($validatedData['neighborhood_association_id'] != $associationId) {
                    abort(403, 'No puedes asignar vecinos a otra asociación.');
                }
            } else {
                abort(403, 'No tienes una asociación asignada como miembro de la directiva.');
            }
        }

        // Administradores no tienen restricciones, proceden con normalidad
        DB::transaction(function () use ($validatedData) {
            // Crear el usuario
            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
                'role' => $validatedData['role'] ?? 'resident',
            ]);

            // Crear el vecino
            $neighbor = Neighbor::create([
                'user_id' => $user->id,
                'address' => $validatedData['address'],
                'identification_number' => $validatedData['identification_number'],
                'registration_date' => $validatedData['registration_date'],
                'birth_date' => $validatedData['birth_date'],
                'status' => $validatedData['status'],
                'neighborhood_association_id' => $validatedData['neighborhood_association_id'],
            ]);

            // Actualizar el número de miembros de la asociación
            $neighbor->neighborhoodAssociation->updateNumberOfMembers();
        });

        return redirect()->route('neighbors.index')->with('success', 'Vecino y usuario creados exitosamente.');
    }









    public function create(Request $request)
    {
        $user = $request->user();
        $userAssociationId = null;
        $userAssociationName = null;

        if ($user->role === 'board_member') {
            $neighbor = Neighbor::where('user_id', $user->id)->first();
            if ($neighbor && $neighbor->neighborhoodAssociation) {
                $userAssociationId = $neighbor->neighborhoodAssociation->id;
                $userAssociationName = $neighbor->neighborhoodAssociation->name;
            } else {
                abort(403, 'No tienes una asociación asignada como miembro de la directiva.');
            }
        }

        $associations = $user->role === 'admin'
            ? NeighborhoodAssociation::all(['id', 'name'])
            : [];

        return Inertia::render('Neighbor/Create', [
            'associations' => $associations,
            'userAssociationId' => $userAssociationId,
            'userAssociationName' => $userAssociationName,
        ]);
    }


    public function show($id)
    {
        $neighbor = Neighbor::with('user', 'neighborhoodAssociation', 'meetingAttendances.meeting')->findOrFail($id);

        // Filtrar las asistencias válidas (relacionadas con reuniones existentes)
        $validAttendances = $neighbor->meetingAttendances->filter(function ($attendance) {
            return $attendance->meeting !== null; // Validar que la reunión existe
        });

        // Calcular las asistencias y el total de reuniones válidas
        $totalMeetings = $validAttendances->count();
        $attendedMeetings = $validAttendances->where('attended', 1)->count(); // Suponiendo que 'attended' es booleano

        // Calcular el porcentaje de asistencia
        $attendancePercentage = $totalMeetings > 0 ? round(($attendedMeetings / $totalMeetings) * 100, 2) : 0;

        return Inertia::render('Neighbor/Show', [
            'neighbor' => [
                'id' => $neighbor->id,
                'user_name' => $neighbor->user ? $neighbor->user->name : 'N/A',
                'user_email' => $neighbor->user ? $neighbor->user->email : 'N/A',
                'user_role' => $neighbor->user ? $neighbor->user->role : 'N/A',
                'address' => $neighbor->address,
                'identification_number' => $neighbor->identification_number,
                'registration_date' => $neighbor->registration_date,
                'birth_date' => $neighbor->birth_date,
                'status' => $neighbor->status,
                'last_participation_date' => $neighbor->last_participation_date,
                'neighborhood_association_name' => $neighbor->neighborhoodAssociation ? $neighbor->neighborhoodAssociation->name : 'N/A',
            ],
            'attendanceSummary' => [
                'totalMeetings' => $totalMeetings,
                'attendedMeetings' => $attendedMeetings,
                'attendancePercentage' => $attendancePercentage,
            ],
        ]);
    }








    public function edit($id)
    {
        $neighbor = Neighbor::with('user', 'neighborhoodAssociation')->findOrFail($id);

        // Obtener el rol activo del vecino en una directiva
        $activeCommitteeMembership = $neighbor->committeeMemberships()
            ->where('status', 'active')
            ->with('committee')
            ->first();


        // Verificar que el usuario autenticado no pueda editar su propio registro
        if (Auth::id() === $neighbor->user_id) {
            return redirect()->route('neighbors.index')->with('error', 'No puedes editar tu propio registro.');
        }

        $associations = NeighborhoodAssociation::all(['id', 'name']);

        $committees = Committee::all(['id', 'name']); // Directivas disponibles

        $users = User::all(['id', 'name', 'email']); // Obtenemos todos los usuarios con su ID, nombre y correo electrónico

        return Inertia::render('Neighbor/Edit', [
            'neighbor' => [
                'id' => $neighbor->id,
                'address' => $neighbor->address,
                'identification_number' => $neighbor->identification_number,
                'registration_date' => $neighbor->registration_date,
                'birth_date' => $neighbor->birth_date,
                'status' => $neighbor->status,
                'last_participation_date' => $neighbor->last_participation_date,
                'neighborhood_association_id' => $neighbor->neighborhood_association_id,
                'user' => $neighbor->user ? [
                    'name' => $neighbor->user->name,
                    'email' => $neighbor->user->email,
                    'id' => $neighbor->user->id,
                    'role' => $neighbor->user->role, // Agregar rol del usuario
                ] : null,
                'committee_id' => $activeCommitteeMembership?->committee_id,
                'committee_role' => $activeCommitteeMembership?->role, // Rol actual en la directiva
                'joined_date' => $activeCommitteeMembership?->joined_date,
                'left_date' => $activeCommitteeMembership?->left_date,
            ],
            'associations' => $associations,
            'committees' => $committees,
            'users' => $users, // Enviamos los usuarios para el dropdown
        ]);
    }

    public function update(NeighborRequest $request, Neighbor $neighbor)
    {
        $validatedData = $request->validated();

        DB::transaction(function () use ($validatedData, $neighbor) {
            // Actualizar el usuario relacionado
            $neighbor->user->update([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'role' => $validatedData['role'],
            ]);

            // Actualizar información del vecino
            $neighbor->update([
                'address' => $validatedData['address'],
                'identification_number' => $validatedData['identification_number'],
                'registration_date' => $validatedData['registration_date'],
                'birth_date' => $validatedData['birth_date'],
                'status' => $validatedData['status'],
                'neighborhood_association_id' => $validatedData['neighborhood_association_id'],
            ]);

            // Gestionar relación con la directiva
            if (!empty($validatedData['committee_id'])) {
                // Si selecciona una directiva, actualizar o crear registro en `CommitteeMember`
                $committeeMember = CommitteeMember::updateOrCreate(
                    [
                        'user_id' => $neighbor->user_id,
                        'committee_id' => $validatedData['committee_id'],
                    ],
                    [
                        'status' => 'active',
                        'joined_date' => now(),
                        'left_date' => null, // Restablecer si previamente tenía una fecha de salida
                    ]
                );

                // Cambiar rol del usuario a 'board_member'
                $neighbor->user->update(['role' => 'board_member']);
            } else {
                // Si desmarca la opción "Es directiva", marcar registros como inactivos
                CommitteeMember::where('user_id', $neighbor->user_id)
                    ->where('status', 'active')
                    ->update([
                        'status' => 'inactive',
                        'left_date' => now(),
                    ]);

                // Verificar si tiene otros registros activos
                $hasActiveRoles = CommitteeMember::where('user_id', $neighbor->user_id)
                    ->where('status', 'active')
                    ->exists();

                // Si no tiene otros cargos activos, cambiar rol a 'resident'
                if (!$hasActiveRoles) {
                    $neighbor->user->update(['role' => 'resident']);
                }
            }
        });

        return redirect()->route('neighbors.index')->with('success', 'Vecino y usuario actualizados exitosamente.');
    }


    public function destroy(Neighbor $neighbor)
    {
        // Verificar que el usuario autenticado no pueda eliminar su propio registro
        if (Auth::id() === $neighbor->user_id) {
            return redirect()->route('neighbors.index')->with('error', 'No puedes eliminar tu propio registro.');
        }

        // Verificar si el vecino pertenece a la directiva
        if ($neighbor->user && $neighbor->user->role === 'board_member') {
            return redirect()->route('neighbors.index')->with('error', 'No puedes eliminar un miembro de la directiva.');
        }

        // Si pasa todas las validaciones, eliminar
        $association = $neighbor->neighborhoodAssociation;

        DB::transaction(function () use ($neighbor, $association) {
            if ($neighbor->user) {
                $neighbor->user->delete();
            }
            $neighbor->delete();
            $association->updateNumberOfMembers();
        });

        return redirect()->route('neighbors.index')->with('success', 'Vecino eliminado correctamente.');
    }





    private function isValidRUT($rut)
    {
        // Lógica para validar el formato del RUT chileno
        $rut = preg_replace('/[^k0-9]/i', '', $rut);
        $dv = substr($rut, -1);
        $numero = substr($rut, 0, strlen($rut) - 1);
        $i = 2;
        $suma = 0;
        foreach (array_reverse(str_split($numero)) as $v) {
            if ($i == 8) {
                $i = 2;
            }
            $suma += $v * $i;
            ++$i;
        }
        $dvr = 11 - ($suma % 11);
        if ($dvr == 11) {
            $dvr = 0;
        }
        if ($dvr == 10) {
            $dvr = 'K';
        }
        if ((string) $dvr === strtoupper($dv)) {
            return true;
        } else {
            return false;
        }
    }





}