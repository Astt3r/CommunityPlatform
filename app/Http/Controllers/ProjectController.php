<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\File;
use App\Models\Neighbor;
use App\Models\NeighborhoodAssociation;
use App\Http\Requests\UpdateProjectRequest;

use Illuminate\Http\Request;
use App\Http\Requests\ProjectRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $isAdmin = $user->role === 'admin'; // Cambia 'role' por tu lógica real para roles

        if (!$isAdmin) {
            $neighbor = Neighbor::where('user_id', $user->id)->first();

            if (!$neighbor || !$neighbor->neighborhoodAssociation) {
                abort(403, 'El usuario no pertenece a ninguna junta de vecinos.');
            }

            $associationId = $neighbor->neighborhoodAssociation->id; // Cambiar a association_id
        }

        $query = Project::with('files');

        if (!$isAdmin) {
            $query->where('association_id', $associationId); // Usar la columna correcta
        }

        $projects = $query->latest()->paginate(10);

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
        ]);
    }







    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $user = $request->user();

        // Verificar el vecino asociado
        $neighbor = Neighbor::where('user_id', $user->id)->first();

        if (!$neighbor) {
            abort(403, 'No estás asociado a ninguna junta de vecinos.');
        }

        // Obtener vecinos según el rol del usuario
        if ($user->role === 'board_member') {
            $neighbors = Neighbor::where('neighborhood_association_id', $neighbor->neighborhood_association_id)
                ->get(['id', 'name']);
        } elseif ($user->role === 'admin') {
            $neighbors = Neighbor::all(['id', 'name']);
        } else {
            abort(403, 'No tienes permiso para crear proyectos.');
        }

        return Inertia::render('Projects/Create', [
            'user' => $user,
            'neighbors' => $neighbors, // Asegúrate de enviar esto
        ]);
    }












    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user();

        $rules = [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:500',
            'issue' => 'required|string|max:1000',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'status' => 'required|string|in:planeado,aprovado,en_proceso,completado,cancelado',
            'budget' => 'required|numeric|min:0',
            'is_for_all_neighbors' => 'required|boolean',
            'neighbor_ids' => 'nullable|array',
            'neighbor_ids.*' => 'exists:neighbors,id',
        ];

        // Ajustar la validación para los board_members
        if ($user->role === 'board_member') {
            $rules['neighbor_ids.*'] .= '|exists:neighbors,id';
        }

        $validated = $request->validate($rules);

        // Asignar automáticamente la junta vecinal
        if ($user->role === 'board_member') {
            $neighbor = Neighbor::where('user_id', $user->id)->first();
            $validated['association_id'] = $neighbor->neighborhood_association_id;
        }

        // Crear el proyecto
        $project = Project::create($validated);

        // Manejar relaciones con la tabla intermedia
        if (!$validated['is_for_all_neighbors'] && isset($validated['neighbor_ids'])) {
            foreach ($validated['neighbor_ids'] as $neighborId) {
                $project->neighbors()->attach($neighborId, ['access_type' => 'viewer']);
            }
        }

        // Manejar archivo adjunto
        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('project_files', 'public');
            File::create([
                'project_id' => $project->id,
                'file_path' => $path,
            ]);
        }

        return redirect()->route('projects.index')->with('success', 'Proyecto creado exitosamente.');
    }










    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $project->load('files'); // Cargar relación de archivos asociados

        return Inertia::render('Projects/Show', [
            'project' => $project,
            'changes' => nl2br($project->changes), // Mostrar cambios con saltos de línea
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        $associations = NeighborhoodAssociation::all(['id', 'name']);
        $neighbors = Neighbor::where('neighborhood_association_id', $project->association_id)
            ->with('user') // Asegúrate de cargar la relación con los usuarios
            ->get();
        $assignedNeighbors = $project->neighbors()->get();

        return Inertia::render('Projects/Edit', [
            'project' => $project->load('files'),
            'associations' => $associations,
            'neighbors' => $neighbors, // Aquí se pasan los vecinos
            'assignedNeighbors' => $assignedNeighbors,
        ]);
    }



    /**
     * Actualiza un proyecto existente.
     */
    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
            'issue' => 'nullable|string|max:1000',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'status' => 'nullable|string|max:100',
            'budget' => 'nullable|numeric|min:0',
            'association_id' => 'nullable|exists:neighborhood_associations,id',
        ]);

        // Verificar si el estado ha cambiado
        if (isset($validated['status']) && $validated['status'] !== $project->status) {
            $currentDateTime = now()->format('Y-m-d H:i:s');
            $newChange = "Estado cambiado de '{$project->status}' a '{$validated['status']}' el {$currentDateTime}";

            // Concatenar el nuevo cambio al historial existente
            $project->changes .= ($project->changes ? "\n" : "") . $newChange;
        }

        // Actualizar el proyecto con los nuevos datos
        $project->update($validated);

        return response()->json(['message' => 'Proyecto actualizado correctamente.'], 200);
    }



    public function uploadFile(Request $request, Project $project)
    {
        $validated = $request->validate([
            'file' => 'required|file|mimes:pdf,doc,docx,jpg,png|max:20480',
        ]);

        // Eliminar archivos anteriores
        foreach ($project->files as $file) {
            if (Storage::exists($file->file_path)) {
                Storage::delete($file->file_path);
            }
            $file->delete();
        }

        // Subir el nuevo archivo
        $path = $request->file('file')->store('project_files', 'public');
        $project->files()->create(['file_path' => $path]);

        // Respuesta JSON clara
        return response()->json(['message' => 'Archivo subido correctamente.'], 200);
    }




























    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        // Eliminar archivos físicos y registros asociados
        foreach ($project->files as $file) {
            if (Storage::exists($file->file_path)) {
                Storage::delete($file->file_path);
            }
        }

        $project->files()->delete(); // Eliminar registros de archivos
        $project->delete(); // Eliminar el proyecto

        return redirect()->route('projects.index')->with('success', 'Proyecto eliminado correctamente.');
    }
}
