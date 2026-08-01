<?php

namespace App\Http\Controllers;

use App\Events\MeetingVoteCast as MeetingVoteCastEvent;
use App\Events\MeetingVoteClosed;
use App\Events\MeetingVoteOpened;
use App\Models\Meeting;
use App\Models\MeetingVote;
use App\Models\MeetingVoteCast;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class MeetingVoteController extends Controller
{
    /**
     * Abrir una votación en vivo para la reunión.
     */
    public function store(Request $request, Meeting $meeting)
    {
        $this->authorize('openVote', $meeting);

        if (in_array($meeting->status, ['completed', 'canceled'])) {
            return redirect()->back()->with('error', 'No puedes abrir una votación en una reunión completada o cancelada.');
        }

        $validated = $request->validate([
            'question' => 'required|string|max:255',
            'options' => 'required|array|min:2|max:6',
            'options.*' => 'required|string|max:100|distinct:ignore_case',
        ]);

        $vote = DB::transaction(function () use ($request, $meeting, $validated) {
            $meeting = Meeting::whereKey($meeting->id)->lockForUpdate()->firstOrFail();

            if ($meeting->open_vote_id !== null) {
                abort(409, 'Ya hay una votación abierta para esta reunión.');
            }

            $vote = MeetingVote::create([
                'meeting_id' => $meeting->id,
                'opened_by' => $request->user()->id,
                'question' => $validated['question'],
                'status' => 'open',
                'opened_at' => now(),
            ]);

            foreach (array_values($validated['options']) as $position => $label) {
                $vote->options()->create(['label' => $label, 'position' => $position]);
            }

            $meeting->open_vote_id = $vote->id;
            if ($meeting->status === 'scheduled') {
                $meeting->status = 'in_progress';
            }
            $meeting->save();

            return $vote;
        });

        event(new MeetingVoteOpened($vote->load('options')));

        return redirect()->route('meetings.show', $meeting)->with('success', 'Votación abierta.');
    }

    /**
     * Registrar el voto del vecino autenticado en la votación abierta.
     */
    public function cast(Request $request, Meeting $meeting)
    {
        $this->authorize('castVote', $meeting);

        if ($meeting->open_vote_id === null) {
            return redirect()->back()->with('error', 'No hay ninguna votación abierta en este momento.');
        }

        $validated = $request->validate([
            'option_id' => [
                'required',
                Rule::exists('meeting_vote_options', 'id')->where('meeting_vote_id', $meeting->open_vote_id),
            ],
        ]);

        $neighbor = $request->user()->neighbor;

        $alreadyVoted = MeetingVoteCast::where('meeting_vote_id', $meeting->open_vote_id)
            ->where('neighbor_id', $neighbor->id)
            ->exists();

        if ($alreadyVoted) {
            return redirect()->back()->with('error', 'Ya registraste tu voto en esta votación.');
        }

        try {
            MeetingVoteCast::create([
                'meeting_vote_id' => $meeting->open_vote_id,
                'meeting_vote_option_id' => $validated['option_id'],
                'neighbor_id' => $neighbor->id,
            ]);
        } catch (QueryException $e) {
            return redirect()->back()->with('error', 'Ya registraste tu voto en esta votación.');
        }

        $vote = MeetingVote::findOrFail($meeting->open_vote_id);
        event(new MeetingVoteCastEvent($vote, $vote->tallies()));

        return redirect()->back()->with('success', 'Voto registrado.');
    }

    /**
     * Cerrar la votación abierta de la reunión.
     */
    public function close(Request $request, Meeting $meeting)
    {
        $this->authorize('closeVote', $meeting);

        if ($meeting->open_vote_id === null) {
            return redirect()->back()->with('error', 'No hay ninguna votación abierta en este momento.');
        }

        $vote = MeetingVote::findOrFail($meeting->open_vote_id);

        $vote->update([
            'status' => 'closed',
            'closed_by' => $request->user()->id,
            'closed_at' => now(),
        ]);

        $meeting->open_vote_id = null;
        $meeting->save();

        event(new MeetingVoteClosed($vote, $vote->tallies()));

        return redirect()->route('meetings.show', $meeting)->with('success', 'Votación cerrada.');
    }
}
