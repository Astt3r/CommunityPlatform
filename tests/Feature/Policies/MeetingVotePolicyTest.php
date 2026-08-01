<?php

use App\Models\Meeting;
use App\Models\Neighbor;
use App\Models\NeighborhoodAssociation;
use App\Models\User;

beforeEach(function () {
    $this->associationA = NeighborhoodAssociation::factory()->create();
    $this->associationB = NeighborhoodAssociation::factory()->create();

    $this->admin = User::factory()->create(['role' => 'admin']);

    $this->boardMemberA = User::factory()->create(['role' => 'board_member']);
    Neighbor::factory()->create([
        'user_id' => $this->boardMemberA->id,
        'neighborhood_association_id' => $this->associationA->id,
    ]);

    $this->residentA = User::factory()->create(['role' => 'resident']);
    Neighbor::factory()->create([
        'user_id' => $this->residentA->id,
        'neighborhood_association_id' => $this->associationA->id,
    ]);

    $this->inactiveResidentA = User::factory()->create(['role' => 'resident']);
    Neighbor::factory()->create([
        'user_id' => $this->inactiveResidentA->id,
        'neighborhood_association_id' => $this->associationA->id,
        'status' => 'inactive',
    ]);

    $this->residentB = User::factory()->create(['role' => 'resident']);
    Neighbor::factory()->create([
        'user_id' => $this->residentB->id,
        'neighborhood_association_id' => $this->associationB->id,
    ]);
});

test('admin can open and close votes but cannot cast one (no neighbor record)', function () {
    $meeting = Meeting::factory()->create(['neighborhood_association_id' => $this->associationA->id]);

    expect($this->admin->can('openVote', $meeting))->toBeTrue()
        ->and($this->admin->can('closeVote', $meeting))->toBeTrue()
        ->and($this->admin->can('castVote', $meeting))->toBeFalse();
});

test('board member can open and close votes only within their own association', function () {
    $meetingA = Meeting::factory()->create(['neighborhood_association_id' => $this->associationA->id]);
    $meetingB = Meeting::factory()->create(['neighborhood_association_id' => $this->associationB->id]);

    expect($this->boardMemberA->can('openVote', $meetingA))->toBeTrue()
        ->and($this->boardMemberA->can('closeVote', $meetingA))->toBeTrue()
        ->and($this->boardMemberA->can('openVote', $meetingB))->toBeFalse()
        ->and($this->boardMemberA->can('closeVote', $meetingB))->toBeFalse();
});

test('resident cannot open or close votes', function () {
    $meeting = Meeting::factory()->create(['neighborhood_association_id' => $this->associationA->id]);

    expect($this->residentA->can('openVote', $meeting))->toBeFalse()
        ->and($this->residentA->can('closeVote', $meeting))->toBeFalse();
});

test('an active neighbor of the meeting association can cast a vote', function () {
    $meeting = Meeting::factory()->create(['neighborhood_association_id' => $this->associationA->id]);

    expect($this->residentA->can('castVote', $meeting))->toBeTrue()
        ->and($this->boardMemberA->can('castVote', $meeting))->toBeTrue();
});

test('a neighbor from a different association cannot cast a vote on a scoped meeting', function () {
    $meeting = Meeting::factory()->create(['neighborhood_association_id' => $this->associationA->id]);

    expect($this->residentB->can('castVote', $meeting))->toBeFalse();
});

test('any active neighbor can cast a vote on a general meeting', function () {
    $generalMeeting = Meeting::factory()->create(['neighborhood_association_id' => null]);

    expect($this->residentA->can('castVote', $generalMeeting))->toBeTrue()
        ->and($this->residentB->can('castVote', $generalMeeting))->toBeTrue();
});

test('an inactive neighbor cannot cast a vote', function () {
    $meeting = Meeting::factory()->create(['neighborhood_association_id' => $this->associationA->id]);

    expect($this->inactiveResidentA->can('castVote', $meeting))->toBeFalse();
});
