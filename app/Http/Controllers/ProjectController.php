<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\File;
use App\Models\Neighbor;
use App\Models\NeighborhoodAssociation;
use Illuminate\Http\Request;
use App\Http\Requests\ProjectRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::with('files')->latest()->paginate(10);

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
        ]);
    }




    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $neighbor = Neighbor::where('user_id', auth()->id())->first();

        // Verificar que el vecino esté asociado a una junta
        if (!$neighbor || !$neighbor->neighborhood_association_id) {
            return redirect()->route('projects.index')
                ->withErrors(['message' => 'No estás asociado a ninguna junta de vecinos.']);
        }

        return Inertia::render('Projects/Create');
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(ProjectRequest $request)
    {
        // Obtener el vecino asociado al usuario autenticado
        $neighbor = Neighbor::where('user_id', auth()->id())->first();

        // Validar si el vecino está asociado a una junta
        if (!$neighbor || !$neighbor->neighborhood_association_id) {
            return redirect()->route('projects.index')
                ->withErrors(['message' => 'No estás asociado a ninguna junta de vecinos.']);
        }

        // Validar los datos usando ProjectRequest (ya validado automáticamente)
        $validated = $request->validated();

        // Asignar automáticamente la asociación del vecino
        $validated['association_id'] = $neighbor->neighborhood_association_id;

        // Crear el proyecto
        $project = Project::create($validated);

        // Manejar el archivo si se sube
        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('project_files', 'public'); // Asegúrate de usar el disco 'public'
            File::create([
                'project_id' => $project->id,
                'file_path' => $path, // Almacena el path generado
            ]);
        }

        // Redirigir con mensaje de éxito
        return redirect()->route('projects.index')->with('success', 'Proyecto creado exitosamente.');
    }




    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $project->load('files'); // Cargar relación de archivos asociados

        return Inertia::render('Projects/Show', ['project' => $project]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        $associations = NeighborhoodAssociation::all(['id', 'name']); // Si aplica asociaciones

        return Inertia::render('Projects/Edit', [
            'project' => [
                'id' => $project->id,
                'name' => $project->name,
                'description' => $project->description,
                'issue' => $project->issue,
                'start_date' => $project->start_date,
                'end_date' => $project->end_date,
                'status' => $project->status,
                'responsible' => $project->responsible,
                'budget' => $project->budget,
                'association_id' => $project->association_id,
                'files' => $project->files->map(fn($file) => [
                    'id' => $file->id,
                    'file_path' => $file->file_path,
                ]),
            ],
            'associations' => $associations,
        ]);
    }





    /**
     * Update the specified resource in storage.
     */
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        // Validar solo los campos presentes en la solicitud
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:500',
            'issue' => 'nullable|string|max:1000',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'status' => 'nullable|string|max:100',
            'responsible' => 'nullable|string|max:255',
            'budget' => 'nullable|numeric|min:0',
            'file' => 'nullable|file|mimes:pdf,doc,docx,jpg,png|max:20480',
        ]);

        // Si se sube un archivo nuevo, manejar la lógica de la relación
        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('project_files', 'public');

            // Actualizar o crear el archivo asociado
            $project->files()->updateOrCreate(
                ['project_id' => $project->id],
                ['file_path' => $path]
            );
        }

        // Actualizar los demás campos
        $project->update($validated);

        return redirect()->route('projects.index')->with('success', 'Proyecto actualizado correctamente.');
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
