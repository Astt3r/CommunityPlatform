<?php

namespace Tests\Browser;

use App\Models\Neighbor;
use App\Models\NeighborhoodAssociation;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\Browser\Pages\LoginPage;
use Tests\Concerns\RefreshesDatabaseSafely;
use Tests\DuskTestCase;

class NeighborCrudTest extends DuskTestCase
{
    use DatabaseMigrations, RefreshesDatabaseSafely {
        RefreshesDatabaseSafely::runDatabaseMigrations insteadof DatabaseMigrations;
    }

    public function test_board_member_can_create_a_neighbor_in_their_own_association(): void
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
                ->visit('/neighbors/create')
                ->type('name', 'Vecino de Prueba')
                ->type('email', 'vecino.prueba@example.com')
                ->type('password', 'password')
                ->type('password_confirmation', 'password')
                ->type('address', 'Calle Falsa 123')
                ->type('identification_number', '11.111.111-1')
                ->type('birth_date', '1990-01-01')
                ->press('Agregar Vecino y Usuario')
                ->waitForLocation('/neighbors')
                ->assertSee('Vecino de Prueba');
        });

        $this->assertDatabaseHas('users', ['email' => 'vecino.prueba@example.com']);
    }

    public function test_board_member_cannot_view_a_neighbor_from_another_association(): void
    {
        $ownAssociation = NeighborhoodAssociation::factory()->create();
        $otherAssociation = NeighborhoodAssociation::factory()->create();

        $boardMember = User::factory()->create(['role' => 'board_member', 'password' => bcrypt('password')]);
        Neighbor::factory()->create([
            'user_id' => $boardMember->id,
            'neighborhood_association_id' => $ownAssociation->id,
        ]);

        $foreignNeighbor = Neighbor::factory()->create([
            'neighborhood_association_id' => $otherAssociation->id,
        ]);

        $this->browse(function ($browser) use ($boardMember, $foreignNeighbor) {
            $browser->visit(new LoginPage)
                ->loginViaForm($boardMember->email)
                ->visit("/neighbors/{$foreignNeighbor->id}/edit")
                ->assertSee('403');
        });
    }
}
