<?php

use App\Models\Neighbor;
use App\Models\NeighborhoodAssociation;
use App\Models\Project;
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

test('admin can manage any project', function () {
    $project = Project::factory()->create(['association_id' => $this->associationB->id]);

    expect($this->admin->can('view', $project))->toBeTrue()
        ->and($this->admin->can('update', $project))->toBeTrue()
        ->and($this->admin->can('delete', $project))->toBeTrue();
});

test('board member can manage projects only within their own association', function () {
    $projectA = Project::factory()->create(['association_id' => $this->associationA->id]);
    $projectB = Project::factory()->create(['association_id' => $this->associationB->id]);

    expect($this->boardMemberA->can('view', $projectA))->toBeTrue()
        ->and($this->boardMemberA->can('update', $projectA))->toBeTrue()
        ->and($this->boardMemberA->can('delete', $projectA))->toBeTrue()
        ->and($this->boardMemberA->can('view', $projectB))->toBeFalse()
        ->and($this->boardMemberA->can('update', $projectB))->toBeFalse();
});

test('resident can view projects of their association but cannot manage them', function () {
    $projectA = Project::factory()->create(['association_id' => $this->associationA->id]);

    expect($this->residentA->can('view', $projectA))->toBeTrue()
        ->and($this->residentA->can('update', $projectA))->toBeFalse()
        ->and($this->residentA->can('delete', $projectA))->toBeFalse();
});

test('only admin and board members can create projects', function () {
    expect($this->admin->can('create', Project::class))->toBeTrue()
        ->and($this->boardMemberA->can('create', Project::class))->toBeTrue()
        ->and($this->residentA->can('create', Project::class))->toBeFalse();
});
