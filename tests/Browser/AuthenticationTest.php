<?php

namespace Tests\Browser;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\Browser\Pages\LoginPage;
use Tests\Concerns\RefreshesDatabaseSafely;
use Tests\DuskTestCase;

class AuthenticationTest extends DuskTestCase
{
    use DatabaseMigrations, RefreshesDatabaseSafely {
        RefreshesDatabaseSafely::runDatabaseMigrations insteadof DatabaseMigrations;
    }

    public function test_admin_can_log_in_and_reach_dashboard(): void
    {
        $admin = User::factory()->create([
            'role' => 'admin',
            'password' => bcrypt('password'),
        ]);

        $this->browse(function ($browser) use ($admin) {
            $browser->visit(new LoginPage)
                ->loginViaForm($admin->email)
                ->assertPathIs('/dashboard')
                ->assertSee('Juntas');
        });
    }

    public function test_board_member_can_log_in_and_sees_board_member_nav(): void
    {
        $boardMember = User::factory()->create([
            'role' => 'board_member',
            'password' => bcrypt('password'),
        ]);

        $this->browse(function ($browser) use ($boardMember) {
            $browser->visit(new LoginPage)
                ->loginViaForm($boardMember->email)
                ->assertPathIs('/dashboard')
                ->assertSee('Finanzas');
        });
    }

    public function test_resident_can_log_in_and_reach_dashboard(): void
    {
        $resident = User::factory()->create([
            'role' => 'resident',
            'password' => bcrypt('password'),
        ]);

        $this->browse(function ($browser) use ($resident) {
            $browser->visit(new LoginPage)
                ->loginViaForm($resident->email)
                ->assertPathIs('/dashboard');
        });
    }

    public function test_invalid_credentials_are_rejected(): void
    {
        User::factory()->create([
            'email' => 'known@example.com',
            'password' => bcrypt('password'),
        ]);

        $this->browse(function ($browser) {
            $browser->visit(new LoginPage)
                ->type('email', 'known@example.com')
                ->type('password', 'wrong-password')
                ->press('Iniciar Sesión')
                ->waitForText('Las credenciales introducidas son incorrectas.', 5)
                ->assertPathIs('/login');
        });
    }
}
