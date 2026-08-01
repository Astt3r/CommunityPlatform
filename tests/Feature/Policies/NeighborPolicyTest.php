<?php

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

test('admin can view, update and delete any neighbor', function () {
    $neighbor = Neighbor::factory()->create(['neighborhood_association_id' => $this->associationB->id]);

    expect($this->admin->can('view', $neighbor))->toBeTrue()
        ->and($this->admin->can('update', $neighbor))->toBeTrue()
        ->and($this->admin->can('delete', $neighbor))->toBeTrue();
});

test('board member can manage neighbors only within their own association', function () {
    $neighborA = Neighbor::factory()->create(['neighborhood_association_id' => $this->associationA->id]);
    $neighborB = Neighbor::factory()->create(['neighborhood_association_id' => $this->associationB->id]);

    expect($this->boardMemberA->can('view', $neighborA))->toBeTrue()
        ->and($this->boardMemberA->can('update', $neighborA))->toBeTrue()
        ->and($this->boardMemberA->can('delete', $neighborA))->toBeTrue()
        ->and($this->boardMemberA->can('view', $neighborB))->toBeFalse()
        ->and($this->boardMemberA->can('update', $neighborB))->toBeFalse()
        ->and($this->boardMemberA->can('delete', $neighborB))->toBeFalse();
});

test('resident can view neighbors of their association but cannot manage them', function () {
    $neighborA = Neighbor::factory()->create(['neighborhood_association_id' => $this->associationA->id]);

    expect($this->residentA->can('view', $neighborA))->toBeTrue()
        ->and($this->residentA->can('update', $neighborA))->toBeFalse()
        ->and($this->residentA->can('delete', $neighborA))->toBeFalse();
});

test('only admin and board members can create neighbors', function () {
    expect($this->admin->can('create', Neighbor::class))->toBeTrue()
        ->and($this->boardMemberA->can('create', Neighbor::class))->toBeTrue()
        ->and($this->residentA->can('create', Neighbor::class))->toBeFalse();
});
