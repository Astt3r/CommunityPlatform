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

        // Verificar el vecino asociado al usuario actual
        $neighbor = Neighbor::where('user_id', $user->id)->first();

        if (!$neighbor) {
            abort(403, 'No estás asociado a ninguna junta de vecinos.');
        }

        // Obtener vecinos según el rol del usuario
        if ($user->role === 'board_member') {
            // Vecinos asociados a la misma asociación vecinal
            $neighbors = Neighbor::where('neighborhood_association_id', $neighbor->neighborhood_association_id)
                ->with('user:id,name') // Relación con el modelo User
                ->get()
                ->map(function ($neighbor) {
                    return [
                        'id' => $neighbor->id,
                        'name' => $neighbor->user->name,
                    ];
                });
        } elseif ($user->role === 'admin') {
            // Todos los vecinos
            $neighbors = Neighbor::with('user:id,name')
                ->get()
                ->map(function ($neighbor) {
                    return [
                        'id' => $neighbor->id,
                        'name' => $neighbor->user->name,
                    ];
                });
        } else {
            abort(403, 'No tienes permiso para crear proyectos.');
        }

        // Renderizar la vista con los datos necesarios
        return Inertia::render('Projects/Create', [
            'user' => $user,
            'neighbors' => $neighbors,
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user();


        // Reglas de validación
        $rules = [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:500',
            'issue' => 'required|string|max:1000',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'budget' => 'required|numeric|min:0',
            'is_for_all_neighbors' => 'required|boolean',
            'neighbor_ids' => 'nullable|array',
            'neighbor_ids.*' => 'exists:neighbors,id',
        ];

        // Mensajes de validación
        $messages = [
            'name.required' => 'El nombre del proyecto es obligatorio.',
            'name.string' => 'El nombre del proyecto debe ser una cadena de texto.',
            'name.max' => 'El nombre del proyecto no puede exceder los 255 caracteres.',
            'description.required' => 'La descripción es obligatoria.',
            'description.string' => 'La descripción debe ser una cadena de texto.',
            'description.max' => 'La descripción no puede exceder los 500 caracteres.',
            'issue.required' => 'El problema a resolver es obligatorio.',
            'issue.string' => 'El problema a resolver debe ser una cadena de texto.',
            'issue.max' => 'El problema a resolver no puede exceder los 1000 caracteres.',
            'start_date.required' => 'La fecha de inicio es obligatoria.',
            'start_date.date' => 'La fecha de inicio debe ser una fecha válida.',
            'end_date.date' => 'La fecha de finalización debe ser una fecha válida.',
            'end_date.after_or_equal' => 'La fecha de finalización debe ser igual o posterior a la fecha de inicio.',
            'budget.required' => 'El presupuesto es obligatorio.',
            'budget.numeric' => 'El presupuesto debe ser un número.',
            'budget.min' => 'El presupuesto no puede ser negativo.',
        ];

        // Ajustar la validación para los board_members
        if ($user->role === 'board_member') {
            $rules['neighbor_ids.*'] .= '|exists:neighbors,id';
        }
        // Validar la solicitud
        $validated = $request->validate($rules, $messages);

        $validated['status'] = 'planeado';


        // Asignar automáticamente la junta vecinal
        if ($user->role === 'board_member') {
            $neighbor = Neighbor::where('user_id', $user->id)->first();
            $validated['association_id'] = $neighbor->neighborhood_association_id;
        }

        // Inicializar changes con fecha de creacion y fase incial
        $validated['changes'] = "Proyecto creado el " . now()->format('Y-m-d H:i:s');

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
        // Cargar relaciones necesarias
        $project->load(['files', 'neighbors.user']); // Cargar vecinos y los datos de usuario asociados

        return Inertia::render('Projects/Show', [
            'project' => $project, // Incluir todo el objeto del proyecto
        ]);
    }




    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        $associations = NeighborhoodAssociation::all(['id', 'name']);
        $neighbors = Neighbor::where('neighborhood_association_id', $project->association_id)
            ->with('user') // Asegúrate de cargar la relación `user`
            ->get();

        // Vecinos asignados al proyecto
        $assignedNeighborIds = $project->neighbors()->pluck('neighbors.id')->toArray();

        return Inertia::render('Projects/Edit', [
            'project' => $project->load('files'),
            'associations' => $associations,
            'neighbors' => $neighbors,
            'assignedNeighborIds' => $assignedNeighborIds, // Pasar los IDs asignados
        ]);
    }





    /**
     * Actualiza un proyecto existente.
     */
    public function update(Request $request, Project $project)
    {
        // Validar los datos entrantes
        $validated = $request->validate(
            [
                'name' => 'required|string|max:255',
                'description' => 'required|string|max:500',
                'issue' => 'required|string|max:1000',
                'start_date' => 'required|date',
                'end_date' => 'nullable|date|after_or_equal:start_date',
                'budget' => 'required|numeric|min:0',
                'is_for_all_neighbors' => 'required|boolean',
                'neighbor_ids' => 'nullable|array',
                'neighbor_ids.*' => 'exists:neighbors,id',
                'status' => 'nullable|string|in:planeado,aprobado,en proceso,completado,cancelado,rechazado', // Ahora es nullable
                'observation' => 'nullable|string|max:255',
            ],
            [
                'name.required' => 'El nombre del proyecto es obligatorio.',
                'description.required' => 'La descripción del proyecto es obligatoria.',
                'issue.required' => 'El problema que aborda el proyecto es obligatorio.',
                'start_date.required' => 'La fecha de inicio es obligatoria.',
                'start_date.date' => 'La fecha de inicio debe ser una fecha válida.',
                'end_date.date' => 'La fecha de fin debe ser una fecha válida.',
                'end_date.after_or_equal' => 'La fecha de fin debe ser igual o posterior a la fecha de inicio.',
                'budget.required' => 'El presupuesto es obligatorio.',
                'budget.numeric' => 'El presupuesto debe ser un número.',
                'is_for_all_neighbors.required' => 'Debe especificar si el proyecto es para todos los vecinos.',
                'neighbor_ids.*.exists' => 'Algunos vecinos seleccionados no son válidos.',
                'status.in' => 'El estado seleccionado no es válido.',
            ]
        );


        // Verificar restricciones según el estado actual del proyecto
        if (isset($validated['status']) && $validated['status'] !== $project->status) {
            switch ($project->status) {
                case 'planeado':
                    if (!in_array($validated['status'], ['aprobado', 'rechazado'])) {
                        return response()->json([
                            'message' => 'Solo puedes cambiar el estado de "Planeado" a "Aprobado" o "Rechazado".'
                        ], 403);
                    }
                    break;

                case 'aprobado':
                    if ($validated['status'] !== 'en proceso') {
                        return response()->json([
                            'message' => 'Solo puedes cambiar el estado de "Aprobado" a "En Proceso".'
                        ], 403);
                    }
                    break;

                case 'en proceso':
                    if (!in_array($validated['status'], ['completado', 'cancelado'])) {
                        return response()->json([
                            'message' => 'Solo puedes cambiar el estado de "En Proceso" a "Completado" o "Cancelado".'
                        ], 403);
                    }
                    break;

                case 'completado':
                case 'cancelado':
                case 'rechazado':
                    return response()->json([
                        'message' => 'No puedes editar un proyecto en estado "Completado", "Cancelado" o "Rechazado".'
                    ], 403);
            }

            $currentDateTime = now()->format('Y-m-d H:i:s');

            // Construir el mensaje del cambio de estado
            $newChange = "Estado cambiado de '{$project->status}' a '{$validated['status']}' el {$currentDateTime}";

            // Si existe una observación, agregarla como una nueva línea indentada
            if (!empty($validated['observation'])) {
                $newChange .= "\n    {$validated['observation']}";
            }

            // Concatenar el nuevo cambio al historial existente
            $project->changes .= ($project->changes ? "\n" : "") . $newChange;
        }


        // Actualizar los campos del proyecto
        $project->update($validated);

        // Sincronizar vecinos si se incluye `neighbor_ids`
        if (isset($validated['neighbor_ids'])) {
            $project->neighbors()->sync($validated['neighbor_ids']);
        } else {
            $project->neighbors()->detach();
        }

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

    public function neighborsByProject($projectId)
    {
        try {
            $project = Project::findOrFail($projectId);

            if ($project->is_for_all_neighbors) {
                $neighbors = Neighbor::where('neighborhood_association_id', $project->association_id)
                    ->with('user')
                    ->get();
            } else {
                $neighbors = $project->neighbors()->with('user')->get();
            }

            return response()->json(
                $neighbors->map(function ($neighbor) {
                    return [
                        'id' => $neighbor->id,
                        'name' => $neighbor->user->name ?? 'Sin nombre',
                    ];
                }),
                200
            );
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al cargar los vecinos del proyecto.',
                'error' => $e->getMessage(),
            ], 500);
        }
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
