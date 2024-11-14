<?php

namespace App\Http\Controllers;

use App\Models\Meeting;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MeetingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $meetings = Meeting::orderBy("created_at","desc")->paginate(10);
        return Inertia::render("Meetings/Index", [
            'meetings' => $meetings,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Meetings/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'meeting_date' => 'required|date',
            'main_topic' => 'required|string|max:100',
            'description' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'organized_by' => 'nullable|string|max:100',
            'result' => 'nullable|string|max:255',
        ]);

        Meeting::create($validated);

        return redirect()->route('meetings.index')->with('success', 'Reunión creada exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Meeting $meeting)
    {
        $meeting = Meeting::findOrFail(intval($meeting->id));

        Carbon::setLocale('es');
        $meeting->meeting_date = Carbon::parse($meeting->meeting_date)->translatedFormat('d \d\e F \d\e Y');

        return Inertia::render('Meetings/Show', [
            'meeting' => $meeting,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Meeting $meeting)
    {
        $meeting = Meeting::findOrFail(intval($meeting->id));
        
        return Inertia::render('Meetings/Edit', [
            'meeting' => $meeting,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Meeting $meeting)
    {
        $validated = $request->validate([
            'meeting_date' => 'required|date',
            'main_topic' => 'required|string|max:100',
            'description' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'organized_by' => 'nullable|string|max:100',
            'result' => 'nullable|string|max:255',
        ]);

        $meeting->update($validated);

        return redirect()->route('meetings.index')->with('success', 'Reunión actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Meeting $meeting)
    {
        $meeting->delete();

        return redirect()->route('meetings.index')->with('success', 'Reunión eliminada exitosamente.');
    }
}
