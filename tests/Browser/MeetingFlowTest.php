<?php

namespace Tests\Browser;

use App\Models\Neighbor;
use App\Models\NeighborhoodAssociation;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\Browser\Pages\LoginPage;
use Tests\Concerns\RefreshesDatabaseSafely;
use Tests\DuskTestCase;

class MeetingFlowTest extends DuskTestCase
{
    use DatabaseMigrations, RefreshesDatabaseSafely {
        RefreshesDatabaseSafely::runDatabaseMigrations insteadof DatabaseMigrations;
    }

    public function test_board_member_can_create_a_meeting_take_attendance_and_generate_the_minutes_pdf(): void
    {
        $association = NeighborhoodAssociation::factory()->create();
        $boardMember = User::factory()->create(['role' => 'board_member', 'password' => bcrypt('password')]);
        Neighbor::factory()->create([
            'user_id' => $boardMember->id,
            'neighborhood_association_id' => $association->id,
        ]);
        $attendee = Neighbor::factory()->create([
            'neighborhood_association_id' => $association->id,
        ]);

        $this->browse(function ($browser) use ($boardMember, $attendee) {
            $browser->visit(new LoginPage)
                ->loginViaForm($boardMember->email)
                ->visit('/meetings/create')
                ->type('main_topic', 'Reunión de prueba Dusk')
                ->type('location', 'Sede social');

            $this->fillDateInput($browser, '#meeting_date', '2026-08-01T19:00');

            $browser->press('Crear Reunión')
                ->waitForLocation('/meetings')
                ->assertSee('Reunión de prueba Dusk');

            $meetingId = \App\Models\Meeting::where('main_topic', 'Reunión de prueba Dusk')->firstOrFail()->id;

            $browser->visit("/meetings/{$meetingId}/attendance")
                ->waitForText($attendee->user->name)
                ->script(sprintf(
                    <<<'JS'
                    Array.from(document.querySelectorAll('table tbody tr'))
                        .find(function (row) { return row.textContent.includes(%s); })
                        .querySelector('input[type="checkbox"]')
                        .click();
                    JS,
                    json_encode($attendee->user->name)
                ));

            $browser->press('Guardar Asistencias')
                ->waitForLocation("/meetings/{$meetingId}");

            $this->assertDatabaseHas('meetings', ['id' => $meetingId, 'status' => 'completed']);
            $this->assertDatabaseHas('meeting_attendances', [
                'meeting_id' => $meetingId,
                'neighbor_id' => $attendee->id,
                'attended' => 1,
            ]);

            // Verifica que la generación del acta en PDF no lance un error de
            // servidor (bug corregido: imports faltantes en MinutesController).
            $browser->visit("/meetings/{$meetingId}/generate-pdf")
                ->pause(1000)
                ->assertDontSee('Whoops')
                ->assertDontSee('Server Error')
                ->assertDontSee('Class "App\\Http\\Controllers\\Meeting" not found');
        });
    }
}
