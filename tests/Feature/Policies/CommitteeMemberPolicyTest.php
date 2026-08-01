<?php

use App\Models\Committee;
use App\Models\CommitteeMember;
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

    $this->committeeA = Committee::factory()->create(['neighborhood_association_id' => $this->associationA->id]);
    $this->committeeB = Committee::factory()->create(['neighborhood_association_id' => $this->associationB->id]);
});

test('admin can manage any committee member', function () {
    $member = CommitteeMember::factory()->create(['committee_id' => $this->committeeB->id]);

    expect($this->admin->can('view', $member))->toBeTrue()
        ->and($this->admin->can('update', $member))->toBeTrue()
        ->and($this->admin->can('delete', $member))->toBeTrue();
});

test('board member can manage committee members only within their own association', function () {
    $memberA = CommitteeMember::factory()->create(['committee_id' => $this->committeeA->id]);
    $memberB = CommitteeMember::factory()->create(['committee_id' => $this->committeeB->id]);

    expect($this->boardMemberA->can('view', $memberA))->toBeTrue()
        ->and($this->boardMemberA->can('update', $memberA))->toBeTrue()
        ->and($this->boardMemberA->can('delete', $memberA))->toBeTrue()
        ->and($this->boardMemberA->can('view', $memberB))->toBeFalse()
        ->and($this->boardMemberA->can('update', $memberB))->toBeFalse();
});

test('resident can view committee members of their association but cannot manage them', function () {
    $memberA = CommitteeMember::factory()->create(['committee_id' => $this->committeeA->id]);

    expect($this->residentA->can('view', $memberA))->toBeTrue()
        ->and($this->residentA->can('update', $memberA))->toBeFalse()
        ->and($this->residentA->can('delete', $memberA))->toBeFalse();
});

test('only admin and board members can add committee members', function () {
    expect($this->admin->can('create', CommitteeMember::class))->toBeTrue()
        ->and($this->boardMemberA->can('create', CommitteeMember::class))->toBeTrue()
        ->and($this->residentA->can('create', CommitteeMember::class))->toBeFalse();
});
