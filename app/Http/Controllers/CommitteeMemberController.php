<?php

namespace App\Http\Controllers;

use App\Models\CommitteeMember;
use App\Models\Committee;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommitteeMemberController extends Controller
{
    public function index()
    {
        $committeeMembers = CommitteeMember::with(['committee', 'user'])->get();

        return Inertia::render('CommitteeMembers/Index', [
            'committeeMembers' => $committeeMembers,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $committees = Committee::active()->get(['id', 'name']);
        $users = User::all(['id', 'name']);

        return Inertia::render('CommitteeMembers/Create', [
            'committees' => $committees,
            'users' => $users,
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'committee_id' => 'required|exists:committees,id',
            'user_id' => 'required|exists:users,id',
            'status' => 'required|in:active,inactive',
            'joined_date' => 'required|date',
            'left_date' => 'nullable|date|after_or_equal:joined_date',
        ]);

        CommitteeMember::create($validated);

        return redirect()->route('committee-members.index')->with('message', 'Miembro agregado exitosamente.');
    }

    /**
     * Show the specified resource.
     */
    public function show(CommitteeMember $committeeMember)
    {
        return Inertia::render('CommitteeMembers/Show', [
            'committeeMember' => $committeeMember->load(['user', 'committee']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CommitteeMember $committeeMember)
    {
        $committees = Committee::active()->get();
        $users = User::all();

        return Inertia::render('CommitteeMembers/Edit', [
            'committeeMember' => $committeeMember->load(['user', 'committee']),
            'committees' => $committees,
            'users' => $users,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CommitteeMember $committeeMember)
    {
        $validated = $request->validate([
            'committee_id' => 'required|exists:committees,id',
            'user_id' => 'required|exists:users,id',
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
        $committeeMember->delete();

        return redirect()->route('committee-members.index')->with('message', 'Miembro eliminado exitosamente.');
    }
}
