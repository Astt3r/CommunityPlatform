<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\File;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::with('files')->orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
        ]);
    }

    public function create()
    {
        return Inertia::render('Projects/Create');
    }

    public function store(Request $request)
    {
        $validated = $this->validateProject($request);

        $project = Project::create($validated);

        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('project_files', 'local');
            File::create([
                'project_id' => $project->id,
                'file_path' => $path,
            ]);
        }

        return redirect()->route('projects.index')->with('success', __('messages.project.created'));
    }

    public function show(Project $project)
    {
        $project->load('files');

        return Inertia::render('Projects/Show', [
            'project' => $project,
        ]);
    }

    public function edit(Project $project)
    {
        return Inertia::render('Projects/Edit', [
            'project' => $project,
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $this->validateProject($request);

        $project->update($validated);

        return redirect()->route('projects.index')->with('success', __('messages.project.updated'));
    }

    public function destroy(Project $project)
    {
        foreach ($project->files as $file) {
            \Storage::delete($file->file_path);
        }

        $project->files()->delete();
        $project->delete();

        return redirect()->route('projects.index')->with('success', __('messages.project.deleted'));
    }

    private function validateProject(Request $request)
    {
        return $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:500',
            'issue' => 'nullable|string|max:1000',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'status' => 'required|string|max:100',
            'responsible' => 'nullable|string|max:255',
            'budget' => 'required|numeric',
            'file' => 'nullable|file|mimes:pdf,doc,docx,jpg,png|max:2048',
        ]);
    }
}
