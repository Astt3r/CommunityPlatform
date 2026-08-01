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
});

test('admin can manage any meeting', function () {
    $meeting = Meeting::factory()->create(['neighborhood_association_id' => $this->associationB->id]);

    expect($this->admin->can('view', $meeting))->toBeTrue()
        ->and($this->admin->can('update', $meeting))->toBeTrue()
        ->and($this->admin->can('delete', $meeting))->toBeTrue()
        ->and($this->admin->can('manageAttendance', $meeting))->toBeTrue();
});

test('board member can manage meetings only within their own association', function () {
    $meetingA = Meeting::factory()->create(['neighborhood_association_id' => $this->associationA->id]);
    $meetingB = Meeting::factory()->create(['neighborhood_association_id' => $this->associationB->id]);

    expect($this->boardMemberA->can('view', $meetingA))->toBeTrue()
        ->and($this->boardMemberA->can('update', $meetingA))->toBeTrue()
        ->and($this->boardMemberA->can('manageAttendance', $meetingA))->toBeTrue()
        ->and($this->boardMemberA->can('view', $meetingB))->toBeFalse()
        ->and($this->boardMemberA->can('update', $meetingB))->toBeFalse()
        ->and($this->boardMemberA->can('manageAttendance', $meetingB))->toBeFalse();
});

test('resident can view meetings of their association but cannot manage them', function () {
    $meetingA = Meeting::factory()->create(['neighborhood_association_id' => $this->associationA->id]);

    expect($this->residentA->can('view', $meetingA))->toBeTrue()
        ->and($this->residentA->can('update', $meetingA))->toBeFalse()
        ->and($this->residentA->can('manageAttendance', $meetingA))->toBeFalse();
});

test('general meetings without an association are visible to everyone', function () {
    $generalMeeting = Meeting::factory()->create(['neighborhood_association_id' => null]);

    expect($this->residentA->can('view', $generalMeeting))->toBeTrue();
});

test('only admin and board members can create meetings', function () {
    expect($this->admin->can('create', Meeting::class))->toBeTrue()
        ->and($this->boardMemberA->can('create', Meeting::class))->toBeTrue()
        ->and($this->residentA->can('create', Meeting::class))->toBeFalse();
});
