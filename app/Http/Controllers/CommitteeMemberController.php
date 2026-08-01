<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommitteeMemberRequest;
use App\Models\Committee;
use App\Models\CommitteeMember;
use App\Models\Neighbor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommitteeMemberController extends Controller
{
    public function index()
    {
        $committeeMembers = CommitteeMember::with(['committee', 'neighbor.user'])->get();

        return Inertia::render('CommitteeMembers/Index', [
            'committeeMembers' => $committeeMembers,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $committees = Committee::get(['id', 'name']);
        $neighbors = Neighbor::with('user:id,name,email')->get(['id', 'user_id']);

        return Inertia::render('CommitteeMembers/Create', [
            'committees' => $committees,
            'neighbors' => $neighbors,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CommitteeMemberRequest $request)
    {
        $this->authorize('create', CommitteeMember::class);
        // Los datos ya están validados por CommitteeMemberRequest
        $validated = $request->validated();

        // Crear el miembro del comité
        CommitteeMember::create($validated);

        // Redirigir con un mensaje de éxito
        return redirect()->route('committee-members.index')->with('message', 'Miembro agregado exitosamente.');
    }

    /**
     * Show the specified resource.
     */
    public function show(CommitteeMember $committeeMember)
    {
        $this->authorize('view', $committeeMember);

        return Inertia::render('CommitteeMembers/Show', [
            'committeeMember' => $committeeMember->load(['neighbor.user', 'committee']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CommitteeMember $committeeMember)
    {
        $this->authorize('update', $committeeMember);
        $committees = Committee::get();
        $neighbors = Neighbor::with('user:id,name,email')->get(['id', 'user_id']);

        return Inertia::render('CommitteeMembers/Edit', [
            'committeeMember' => $committeeMember->load(['neighbor.user', 'committee']),
            'committees' => $committees,
            'neighbors' => $neighbors,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CommitteeMember $committeeMember)
    {
        $this->authorize('update', $committeeMember);
        $validated = $request->validate([
            'committee_id' => 'required|exists:committees,id',
            'neighbor_id' => 'required|exists:neighbors,id',
            'status' => 'required|in:active,inactive',
            'joined_date' => 'required|date',
            'left_date' => 'nullable|date|after_or_equal:joined_date',
        ]);

        $committeeMember->update($validated);

        return redirect()->route('committee-members.index')->with('message', 'Miembro actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CommitteeMember $committeeMember)
    {
        $this->authorize('delete', $committeeMember);
        $committeeMember->delete();

        return redirect()->route('committee-members.index')->with('message', 'Miembro eliminado exitosamente.');
    }
}
