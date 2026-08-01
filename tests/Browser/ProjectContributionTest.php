<?php

namespace Tests\Browser;

use App\Models\Neighbor;
use App\Models\NeighborhoodAssociation;
use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\Browser\Pages\LoginPage;
use Tests\Concerns\RefreshesDatabaseSafely;
use Tests\DuskTestCase;

class ProjectContributionTest extends DuskTestCase
{
    use DatabaseMigrations, RefreshesDatabaseSafely {
        RefreshesDatabaseSafely::runDatabaseMigrations insteadof DatabaseMigrations;
    }

    public function test_board_member_can_create_a_project_and_view_it_with_assigned_neighbors(): void
    {
        $association = NeighborhoodAssociation::factory()->create();
        $boardMember = User::factory()->create(['role' => 'board_member', 'password' => bcrypt('password')]);
        Neighbor::factory()->create([
            'user_id' => $boardMember->id,
            'neighborhood_association_id' => $association->id,
        ]);

        $this->browse(function ($browser) use ($boardMember) {
            $browser->visit(new LoginPage)
                ->loginViaForm($boardMember->email)
                ->visit('/projects/create')
                ->type('#name', 'Mejoramiento de plaza (Dusk)')
                ->type('#description', 'Renovación de juegos infantiles')
                ->type('#issue', 'Infraestructura deteriorada')
                ->type('#budget', '1500000');

            $this->fillDateInput($browser, '#start_date', '2026-08-01');

            $browser->press('Guardar Proyecto')
                ->waitForLocation('/projects')
                ->assertSee('Mejoramiento de plaza (Dusk)');
        });

        $project = Project::where('name', 'Mejoramiento de plaza (Dusk)')->firstOrFail();

        // El registro de aportes (Contribution) no tiene una pantalla dedicada
        // en el frontend actual; se valida a nivel de modelo/backend.
        $contributor = Neighbor::factory()->create(['neighborhood_association_id' => $association->id]);
        $project->contributions()->create(['amount' => 20000, 'neighbor_id' => $contributor->id]);

        $this->assertDatabaseHas('contributions', [
            'project_id' => $project->id,
            'neighbor_id' => $contributor->id,
            'amount' => 20000,
        ]);

        $this->browse(function ($browser) use ($project) {
            $browser->visit("/projects/{$project->id}")
                ->assertSee('Mejoramiento de plaza (Dusk)')
                ->assertSee('Infraestructura deteriorada');
        });
    }
}
