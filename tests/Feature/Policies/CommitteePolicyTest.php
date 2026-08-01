<?php

use App\Models\Committee;
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

test('admin can manage any committee', function () {
    $committee = Committee::factory()->create(['neighborhood_association_id' => $this->associationB->id]);

    expect($this->admin->can('view', $committee))->toBeTrue()
        ->and($this->admin->can('update', $committee))->toBeTrue()
        ->and($this->admin->can('delete', $committee))->toBeTrue();
});

test('board member can manage committees only within their own association', function () {
    $committeeA = Committee::factory()->create(['neighborhood_association_id' => $this->associationA->id]);
    $committeeB = Committee::factory()->create(['neighborhood_association_id' => $this->associationB->id]);

    expect($this->boardMemberA->can('view', $committeeA))->toBeTrue()
        ->and($this->boardMemberA->can('update', $committeeA))->toBeTrue()
        ->and($this->boardMemberA->can('delete', $committeeA))->toBeTrue()
        ->and($this->boardMemberA->can('view', $committeeB))->toBeFalse()
        ->and($this->boardMemberA->can('update', $committeeB))->toBeFalse();
});

test('resident can view committees of their association but cannot manage them', function () {
    $committeeA = Committee::factory()->create(['neighborhood_association_id' => $this->associationA->id]);

    expect($this->residentA->can('view', $committeeA))->toBeTrue()
        ->and($this->residentA->can('update', $committeeA))->toBeFalse()
        ->and($this->residentA->can('delete', $committeeA))->toBeFalse();
});

test('only admin and board members can create committees', function () {
    expect($this->admin->can('create', Committee::class))->toBeTrue()
        ->and($this->boardMemberA->can('create', Committee::class))->toBeTrue()
        ->and($this->residentA->can('create', Committee::class))->toBeFalse();
});
