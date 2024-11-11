<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Project;

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

        Project::create($request->all());

        return redirect()->route('project.index')->with('success', 'Proyecto creado exitosamente.');
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