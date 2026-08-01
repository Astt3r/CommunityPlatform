<?php

use App\Models\Expense;
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

test('admin can manage any expense', function () {
    $expense = Expense::factory()->create(['association_id' => $this->associationB->id]);

    expect($this->admin->can('view', $expense))->toBeTrue()
        ->and($this->admin->can('update', $expense))->toBeTrue()
        ->and($this->admin->can('delete', $expense))->toBeTrue();
});

test('board member can manage expenses only within their own association', function () {
    $expenseA = Expense::factory()->create(['association_id' => $this->associationA->id]);
    $expenseB = Expense::factory()->create(['association_id' => $this->associationB->id]);

    expect($this->boardMemberA->can('view', $expenseA))->toBeTrue()
        ->and($this->boardMemberA->can('update', $expenseA))->toBeTrue()
        ->and($this->boardMemberA->can('delete', $expenseA))->toBeTrue()
        ->and($this->boardMemberA->can('view', $expenseB))->toBeFalse()
        ->and($this->boardMemberA->can('update', $expenseB))->toBeFalse();
});

test('resident can view expenses of their association but cannot manage them', function () {
    $expenseA = Expense::factory()->create(['association_id' => $this->associationA->id]);

    expect($this->residentA->can('view', $expenseA))->toBeTrue()
        ->and($this->residentA->can('update', $expenseA))->toBeFalse()
        ->and($this->residentA->can('delete', $expenseA))->toBeFalse();
});

test('only admin and board members can create expenses', function () {
    expect($this->admin->can('create', Expense::class))->toBeTrue()
        ->and($this->boardMemberA->can('create', Expense::class))->toBeTrue()
        ->and($this->residentA->can('create', Expense::class))->toBeFalse();
});
