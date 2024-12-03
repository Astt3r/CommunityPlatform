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
            'neighbor_id' => Neighbor::where('user_id', auth('web')->id())->first()->id, // Encuentra al vecino por user_id
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
        // Verificar que el proyecto exista y esté activo
        $project = Project::findOrFail($projectId);

        // Obtener contribuciones relacionadas con el proyecto
        $contributions = Contribution::where('project_id', $projectId)
            ->with('neighbor') // Si tienes relación con Neighbor
            ->get();

        return response()->json($contributions);
    }

}
