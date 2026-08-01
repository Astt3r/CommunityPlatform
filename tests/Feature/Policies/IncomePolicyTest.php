<?php

use App\Models\Income;
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

test('admin can manage any income', function () {
    $income = Income::factory()->create(['association_id' => $this->associationB->id]);

    expect($this->admin->can('view', $income))->toBeTrue()
        ->and($this->admin->can('update', $income))->toBeTrue()
        ->and($this->admin->can('delete', $income))->toBeTrue();
});

test('board member can manage incomes only within their own association', function () {
    $incomeA = Income::factory()->create(['association_id' => $this->associationA->id]);
    $incomeB = Income::factory()->create(['association_id' => $this->associationB->id]);

    expect($this->boardMemberA->can('view', $incomeA))->toBeTrue()
        ->and($this->boardMemberA->can('update', $incomeA))->toBeTrue()
        ->and($this->boardMemberA->can('delete', $incomeA))->toBeTrue()
        ->and($this->boardMemberA->can('view', $incomeB))->toBeFalse()
        ->and($this->boardMemberA->can('update', $incomeB))->toBeFalse();
});

test('resident can view incomes of their association but cannot manage them', function () {
    $incomeA = Income::factory()->create(['association_id' => $this->associationA->id]);

    expect($this->residentA->can('view', $incomeA))->toBeTrue()
        ->and($this->residentA->can('update', $incomeA))->toBeFalse()
        ->and($this->residentA->can('delete', $incomeA))->toBeFalse();
});

test('only admin and board members can create incomes', function () {
    expect($this->admin->can('create', Income::class))->toBeTrue()
        ->and($this->boardMemberA->can('create', Income::class))->toBeTrue()
        ->and($this->residentA->can('create', Income::class))->toBeFalse();
});
