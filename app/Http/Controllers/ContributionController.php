<?php

namespace App\Http\Controllers;

use App\Models\Contribution;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Neighbor;
use Illuminate\Support\Facades\Validator;

class ContributionController extends Controller
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
        $validator = Validator::make($request->all(), [
            'project_id' => 'required|exists:projects,id',
            'amount' => 'required|numeric|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors(),
            ], 400);
        }

        $contribution = Contribution::create([
            'neighbor_id' => Neighbor::where('user_id', operator: auth('web')->id())->first()->id, // Encuentra al vecino por user_id
            'project_id' => $request->project_id,
            'amount' => $request->amount,
        ]);


        return response()->json([
            'message' => 'Contribución creada exitosamente',
            'contribution' => $contribution,
        ]);
    }




    /**
     * Display the specified resource.
     */
    public function show(Contribution $contribution)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contribution $contribution)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Contribution $contribution)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contribution $contribution)
    {
        //
    }

    public function indexByProject($projectId)
    {
        // Verificar que el proyecto exista
        $project = Project::findOrFail($projectId);

        // Verificar si el usuario es board_member
        $isBoardMember = \App\Models\User::find(auth()->id())->role === 'board_member';

        // Obtener contribuciones con la relación cargada
        $contributions = Contribution::where('project_id', $projectId)
            ->with(['neighbor.user']) // Cargar la relación hasta el modelo User
            ->get()
            ->map(function ($contribution) use ($isBoardMember) {
                return [
                    'id' => $contribution->id,
                    'amount' => $contribution->amount,
                    'created_at' => $contribution->created_at->format('Y-m-d'),
                    'neighbor_name' => $isBoardMember && $contribution->neighbor ? optional($contribution->neighbor->user)->name : "Anónimo", // Obtener el nombre del usuario relacionado
                ];
            });

        return response()->json($contributions);
    }






}
