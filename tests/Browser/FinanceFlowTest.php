<?php

namespace Tests\Browser;

use App\Models\ExpenseType;
use App\Models\Neighbor;
use App\Models\NeighborhoodAssociation;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\Browser\Pages\LoginPage;
use Tests\Concerns\RefreshesDatabaseSafely;
use Tests\DuskTestCase;

class FinanceFlowTest extends DuskTestCase
{
    use DatabaseMigrations, RefreshesDatabaseSafely {
        RefreshesDatabaseSafely::runDatabaseMigrations insteadof DatabaseMigrations;
    }

    public function test_board_member_can_register_an_expense_and_see_it_reflected_on_the_dashboard(): void
    {
        $association = NeighborhoodAssociation::factory()->create();
        $boardMember = User::factory()->create(['role' => 'board_member', 'password' => bcrypt('password')]);
        Neighbor::factory()->create([
            'user_id' => $boardMember->id,
            'neighborhood_association_id' => $association->id,
        ]);
        $expenseType = ExpenseType::factory()->create([
            'association_id' => $association->id,
            'created_by' => $boardMember->id,
        ]);

        $this->browse(function ($browser) use ($boardMember, $expenseType) {
            $browser->visit(new LoginPage)
                ->loginViaForm($boardMember->email)
                ->visit('/expenses/create');

            $this->fillDateInput($browser, '[name=date]', '2026-08-01');

            $browser->type('concept', 'Reparacion de juegos')
                ->type('responsible', 'Junta Directiva')
                ->type('amount', '75000')
                ->select('type_id', (string) $expenseType->id)
                ->select('status', 'approved')
                ->press('Crear Gasto')
                ->waitForLocation('/expenses')
                ->assertSee('Reparacion de juegos');

            $browser->visit('/dashboard')
                ->waitForText('Gastos: $75000');
        });

        $this->assertDatabaseHas('expenses', [
            'concept' => 'Reparacion de juegos',
            'amount' => 75000,
            'association_id' => $expenseType->association_id,
        ]);
    }
}
