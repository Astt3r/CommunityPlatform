<?php

namespace App\Http\Controllers;

use App\Models\Contribution;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Neighbor;

class ContributionController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'project_id' => 'required|exists:projects,id',
            'neighbor_id' => 'required|exists:neighbors,id',
            'amount' => 'required|integer|min:1', // Solo números enteros
        ]);

        $project = Project::findOrFail($request->project_id);

        // Verificar si el vecino ya tiene una contribución en este proyecto
        $existingContribution = Contribution::where('project_id', $project->id)
            ->where('neighbor_id', $request->neighbor_id)
            ->first();

        if ($existingContribution) {
            return response()->json(['message' => 'El vecino ya ha registrado una contribución para este proyecto.'], 400);
        }

        // Calcular contribución individual como entero
        $neighborsCount = $project->is_for_all_neighbors
            ? Neighbor::where('neighborhood_association_id', $project->association_id)->count()
            : $project->neighbors()->count();

        if ($neighborsCount === 0) {
            return response()->json(['message' => 'No hay vecinos asignados al proyecto.'], 400);
        }

        $individualContribution = (int) ceil($project->budget / $neighborsCount);

        if ((int) $request->amount !== $individualContribution) {
            return response()->json([
                'message' => "El monto debe ser igual a la contribución individual de $individualContribution.",
            ], 400);
        }

        // Registrar la contribución
        $contribution = Contribution::create([
            'neighbor_id' => $request->neighbor_id,
            'project_id' => $project->id,
            'amount' => $request->amount,
        ]);

        return response()->json(['message' => 'Contribución registrada con éxito.', 'contribution' => $contribution], 201);
    }

    /**
     * Display a listing of contributions by project.
     */
    public function indexByProject($projectId)
    {
        $contributions = Contribution::with('neighbor.user')
            ->where('project_id', $projectId)
            ->get()
            ->map(function ($contribution) {
                return [
                    'id' => $contribution->id,
                    'neighbor_name' => $contribution->neighbor->user->name,
                    'amount' => (int) $contribution->amount, // Convertir a entero
                    'created_at' => $contribution->created_at,
                ];
            });

        return response()->json($contributions);
    }

    /**
     * Calculate individual contribution for a project.
     */
    public function individualContribution($projectId)
    {
        try {
            $project = Project::findOrFail($projectId);

            $totalBudget = $project->budget;
            $totalNeighbors = $project->is_for_all_neighbors
                ? Neighbor::where('neighborhood_association_id', $project->association_id)->count()
                : $project->neighbors()->count();

            if ($totalNeighbors === 0) {
                throw new \Exception('No hay vecinos asociados al proyecto.');
            }

            $individualContribution = (int) ceil($totalBudget / $totalNeighbors);

            return response()->json(['individual_contribution' => $individualContribution], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al calcular la contribución individual.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get neighbors associated with a project.
     */
    public function neighborsByProject($projectId)
    {
        try {
            $project = Project::findOrFail($projectId);

            if ($project->is_for_all_neighbors) {
                $neighbors = Neighbor::where('neighborhood_association_id', $project->association_id)
                    ->with('user')
                    ->get();
            } else {
                $neighbors = $project->neighbors()
                    ->with('user')
                    ->get();
            }

            $response = $neighbors->map(function ($neighbor) {
                return [
                    'id' => $neighbor->id,
                    'name' => $neighbor->user->name ?? 'Sin nombre',
                ];
            });

            return response()->json($response, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al cargar los vecinos del proyecto.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $contribution = Contribution::findOrFail($id);
            $contribution->delete();

            return response()->json(['message' => 'Contribución eliminada con éxito.'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al eliminar la contribución.', 'error' => $e->getMessage()], 500);
        }
    }

}
