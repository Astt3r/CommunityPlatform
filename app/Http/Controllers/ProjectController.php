<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Project;
use App\Models\File; // Cambia a `App\Models\File` con la A en mayúscula

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::all();
        return Inertia::render('Project/ReadProject', ['projects' => $projects]);
    }

    public function create()
    {
        return Inertia::render('Project/CreateProject');

    }


    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre' => 'required|string',
            'descripcion' => 'required|string',
            'problema' => 'nullable|string',
            'fecha_inicio' => 'nullable|date',
            'fecha_fin' => 'nullable|date',
            'estado' => 'nullable|string',
            'responsable' => 'nullable|string',
            'presupuesto' => 'nullable|numeric',
            'file' => 'nullable|file|mimes:pdf,doc,docx,jpg,png|max:2048',
        ]);
        // Crear el proyecto
        $project = Project::create($data);

        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('project_files', 'local');

            // Guardar el archivo en la base de datos
            File::create([
                'project_id' => $project->id_proyecto,
                'file_path' => $path, // Almacena la ruta relativa
            ]);
        }

        Project::create($request->all());

        return redirect()->route('project.index')->with('success', 'Proyecto creado exitosamente.');
    }

    public function show($id)
    {
        $project = Project::with('files')->findOrFail($id);
        return view('projects.show', compact('project'));
    }

    public function edit($id)
    {
        $project = Project::findOrFail($id);
        return inertia('Project/EditProject', ['project' => $project]);
    }

    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);

        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'problema' => 'required|string',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date',
            'estado' => 'required|string|max:255',
            'responsable' => 'required|string|max:255',
            'presupuesto' => 'required|string|max:255',
        ]);

        $project->update($request->all());

        return redirect()->route('project.index')->with('success', 'Proyecto actualizada correctamente');
    }

    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        $project->delete();

        return redirect()->route('project.index')->with('success', 'Proyecto eliminado correctamente');
    }

}