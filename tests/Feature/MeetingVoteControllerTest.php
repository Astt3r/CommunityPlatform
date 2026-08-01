<?php

use App\Events\MeetingVoteCast as MeetingVoteCastEvent;
use App\Events\MeetingVoteClosed;
use App\Events\MeetingVoteOpened;
use App\Models\Meeting;
use App\Models\MeetingVote;
use App\Models\MeetingVoteCast;
use App\Models\MeetingVoteOption;
use App\Models\Neighbor;
use App\Models\NeighborhoodAssociation;
use App\Models\User;
use Illuminate\Support\Facades\Event;

beforeEach(function () {
    Event::fake([MeetingVoteOpened::class, MeetingVoteCastEvent::class, MeetingVoteClosed::class]);

    $this->associationA = NeighborhoodAssociation::factory()->create();
    $this->associationB = NeighborhoodAssociation::factory()->create();

    $this->boardMemberA = User::factory()->create(['role' => 'board_member']);
    Neighbor::factory()->create([
        'user_id' => $this->boardMemberA->id,
        'neighborhood_association_id' => $this->associationA->id,
    ]);

    $this->residentA = User::factory()->create(['role' => 'resident']);
    $this->neighborA = Neighbor::factory()->create([
        'user_id' => $this->residentA->id,
        'neighborhood_association_id' => $this->associationA->id,
    ]);

    $this->residentA2 = User::factory()->create(['role' => 'resident']);
    Neighbor::factory()->create([
        'user_id' => $this->residentA2->id,
        'neighborhood_association_id' => $this->associationA->id,
    ]);

    $this->residentB = User::factory()->create(['role' => 'resident']);
    Neighbor::factory()->create([
        'user_id' => $this->residentB->id,
        'neighborhood_association_id' => $this->associationB->id,
    ]);

    $this->meeting = Meeting::factory()->create([
        'neighborhood_association_id' => $this->associationA->id,
        'status' => 'scheduled',
    ]);
});

function openVote($meeting, $question = '¿Aprueban el presupuesto?', $options = ['Sí', 'No']): array
{
    return ['question' => $question, 'options' => $options];
}

test('board member can open a vote, which flips the meeting to in_progress', function () {
    $response = $this->actingAs($this->boardMemberA)
        ->post(route('meetings.votes.store', $this->meeting), openVote($this->meeting));

    $response->assertRedirect(route('meetings.show', $this->meeting));

    $this->meeting->refresh();

    expect($this->meeting->status)->toBe('in_progress')
        ->and($this->meeting->open_vote_id)->not->toBeNull();

    $this->assertDatabaseHas('meeting_votes', [
        'meeting_id' => $this->meeting->id,
        'question' => '¿Aprueban el presupuesto?',
        'status' => 'open',
    ]);
    $this->assertDatabaseCount('meeting_vote_options', 2);

    Event::assertDispatched(MeetingVoteOpened::class, fn ($e) => $e->vote->question === '¿Aprueban el presupuesto?');
});

test('cannot open a second vote while one is already open', function () {
    $this->actingAs($this->boardMemberA)->post(route('meetings.votes.store', $this->meeting), openVote($this->meeting));

    $response = $this->actingAs($this->boardMemberA)
        ->post(route('meetings.votes.store', $this->meeting), openVote($this->meeting, 'Otra pregunta'));

    $response->assertStatus(409);
    $this->assertDatabaseCount('meeting_votes', 1);
});

test('resident cannot open a vote', function () {
    $this->actingAs($this->residentA)
        ->post(route('meetings.votes.store', $this->meeting), openVote($this->meeting))
        ->assertForbidden();

    $this->assertDatabaseCount('meeting_votes', 0);
});

test('cannot open a vote on a canceled or completed meeting', function () {
    $this->meeting->update(['status' => 'canceled']);

    $this->actingAs($this->boardMemberA)
        ->post(route('meetings.votes.store', $this->meeting), openVote($this->meeting))
        ->assertRedirect();

    $this->assertDatabaseCount('meeting_votes', 0);
});

test('an active neighbor can cast a vote exactly once', function () {
    $this->actingAs($this->boardMemberA)->post(route('meetings.votes.store', $this->meeting), openVote($this->meeting));
    $this->meeting->refresh();
    $option = MeetingVoteOption::where('meeting_vote_id', $this->meeting->open_vote_id)->first();

    $response = $this->actingAs($this->residentA)
        ->post(route('meetings.votes.cast', $this->meeting), ['option_id' => $option->id]);

    $response->assertRedirect();
    $this->assertDatabaseHas('meeting_vote_casts', [
        'meeting_vote_id' => $this->meeting->open_vote_id,
        'meeting_vote_option_id' => $option->id,
        'neighbor_id' => $this->neighborA->id,
    ]);

    Event::assertDispatched(MeetingVoteCastEvent::class, function ($e) use ($option) {
        $tally = $e->tallies->firstWhere('id', $option->id);

        return $tally->ballots_count === 1;
    });
});

test('the same neighbor cannot cast a vote twice', function () {
    $this->actingAs($this->boardMemberA)->post(route('meetings.votes.store', $this->meeting), openVote($this->meeting));
    $this->meeting->refresh();
    $option = MeetingVoteOption::where('meeting_vote_id', $this->meeting->open_vote_id)->first();

    $this->actingAs($this->residentA)->post(route('meetings.votes.cast', $this->meeting), ['option_id' => $option->id]);
    $this->actingAs($this->residentA)->post(route('meetings.votes.cast', $this->meeting), ['option_id' => $option->id]);

    $this->assertDatabaseCount('meeting_vote_casts', 1);
});

test('a neighbor from a different association cannot cast a vote on a scoped meeting', function () {
    $this->actingAs($this->boardMemberA)->post(route('meetings.votes.store', $this->meeting), openVote($this->meeting));
    $this->meeting->refresh();
    $option = MeetingVoteOption::where('meeting_vote_id', $this->meeting->open_vote_id)->first();

    $this->actingAs($this->residentB)
        ->post(route('meetings.votes.cast', $this->meeting), ['option_id' => $option->id])
        ->assertForbidden();

    $this->assertDatabaseCount('meeting_vote_casts', 0);
});

test('casting after the vote is closed is rejected', function () {
    $this->actingAs($this->boardMemberA)->post(route('meetings.votes.store', $this->meeting), openVote($this->meeting));
    $this->meeting->refresh();
    $option = MeetingVoteOption::where('meeting_vote_id', $this->meeting->open_vote_id)->first();

    $this->actingAs($this->boardMemberA)->post(route('meetings.votes.close', $this->meeting));

    $this->actingAs($this->residentA)
        ->post(route('meetings.votes.cast', $this->meeting), ['option_id' => $option->id])
        ->assertRedirect();

    $this->assertDatabaseCount('meeting_vote_casts', 0);
});

test('board member can close a vote and the meeting keeps no open vote pointer', function () {
    $this->actingAs($this->boardMemberA)->post(route('meetings.votes.store', $this->meeting), openVote($this->meeting));
    $this->meeting->refresh();
    $voteId = $this->meeting->open_vote_id;
    $option = MeetingVoteOption::where('meeting_vote_id', $voteId)->first();
    $this->actingAs($this->residentA)->post(route('meetings.votes.cast', $this->meeting), ['option_id' => $option->id]);

    $response = $this->actingAs($this->boardMemberA)->post(route('meetings.votes.close', $this->meeting));
    $response->assertRedirect(route('meetings.show', $this->meeting));

    $this->meeting->refresh();
    expect($this->meeting->open_vote_id)->toBeNull();

    $this->assertDatabaseHas('meeting_votes', ['id' => $voteId, 'status' => 'closed']);

    Event::assertDispatched(MeetingVoteClosed::class, function ($e) use ($option) {
        $tally = $e->tallies->firstWhere('id', $option->id);

        return $tally->ballots_count === 1;
    });
});

test('broadcast payloads never contain neighbor identity, only aggregate counts', function () {
    $this->actingAs($this->boardMemberA)->post(route('meetings.votes.store', $this->meeting), openVote($this->meeting));
    $this->meeting->refresh();
    $option = MeetingVoteOption::where('meeting_vote_id', $this->meeting->open_vote_id)->first();
    $this->actingAs($this->residentA)->post(route('meetings.votes.cast', $this->meeting), ['option_id' => $option->id]);
    $this->actingAs($this->boardMemberA)->post(route('meetings.votes.close', $this->meeting));

    Event::assertDispatched(MeetingVoteCastEvent::class, function ($e) {
        $payload = $e->broadcastWith();

        expect(json_encode($payload))->not->toContain('neighbor_id');
        foreach ($payload['tallies'] as $tally) {
            expect(array_keys($tally))->toEqualCanonicalizing(['option_id', 'label', 'count']);
        }

        return true;
    });

    Event::assertDispatched(MeetingVoteClosed::class, function ($e) {
        $payload = $e->broadcastWith();

        expect(json_encode($payload))->not->toContain('neighbor_id');

        return true;
    });
});

test('MeetingVote::tallies computes correct counts per option', function () {
    $vote = MeetingVote::factory()->create(['meeting_id' => $this->meeting->id]);
    $optionA = MeetingVoteOption::factory()->create(['meeting_vote_id' => $vote->id, 'label' => 'Sí', 'position' => 0]);
    $optionB = MeetingVoteOption::factory()->create(['meeting_vote_id' => $vote->id, 'label' => 'No', 'position' => 1]);

    MeetingVoteCast::factory()->count(3)->create(['meeting_vote_id' => $vote->id, 'meeting_vote_option_id' => $optionA->id]);
    MeetingVoteCast::factory()->count(1)->create(['meeting_vote_id' => $vote->id, 'meeting_vote_option_id' => $optionB->id]);

    $tallies = $vote->tallies();

    expect($tallies->firstWhere('id', $optionA->id)->ballots_count)->toBe(3)
        ->and($tallies->firstWhere('id', $optionB->id)->ballots_count)->toBe(1);
});
