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
});

test('admin can view, update and delete any association', function () {
    expect($this->admin->can('view', $this->associationA))->toBeTrue()
        ->and($this->admin->can('view', $this->associationB))->toBeTrue()
        ->and($this->admin->can('update', $this->associationB))->toBeTrue()
        ->and($this->admin->can('delete', $this->associationB))->toBeTrue();
});

test('board member can view and update only their own association', function () {
    expect($this->boardMemberA->can('view', $this->associationA))->toBeTrue()
        ->and($this->boardMemberA->can('update', $this->associationA))->toBeTrue()
        ->and($this->boardMemberA->can('view', $this->associationB))->toBeFalse()
        ->and($this->boardMemberA->can('update', $this->associationB))->toBeFalse();
});

test('only admin can create or delete associations', function () {
    expect($this->admin->can('create', NeighborhoodAssociation::class))->toBeTrue()
        ->and($this->boardMemberA->can('create', NeighborhoodAssociation::class))->toBeFalse()
        ->and($this->boardMemberA->can('delete', $this->associationA))->toBeFalse();
});
