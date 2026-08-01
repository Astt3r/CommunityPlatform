<?php

namespace Database\Factories;

use App\Models\Meeting;
use App\Models\Neighbor;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MeetingAttendance>
 */
class MeetingAttendanceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $attended = $this->faker->boolean(75);

        return [
            'meeting_id' => Meeting::factory(),
            'neighbor_id' => Neighbor::factory(),
            'attended' => $attended,
            'absence_reason' => $attended ? null : $this->faker->randomElement([
                'Motivos de salud', 'Viaje', 'Trabajo', 'Sin justificar',
            ]),
        ];
    }
}
