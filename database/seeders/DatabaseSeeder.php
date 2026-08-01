<?php

namespace Database\Seeders;

use App\Models\Committee;
use App\Models\CommitteeMember;
use App\Models\Contribution;
use App\Models\Expense;
use App\Models\ExpenseType;
use App\Models\Income;
use App\Models\IncomeType;
use App\Models\Meeting;
use App\Models\MeetingAttendance;
use App\Models\Minutes;
use App\Models\Neighbor;
use App\Models\NeighborhoodAssociation;
use App\Models\Project;
use App\Models\User;
use Carbon\Carbon;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Create an admin user if it doesn't exist
        $adminUser = User::firstOrCreate([
            'email' => 'admin@example.com',
        ], [
            'name' => 'Admin User',
            'password' => bcrypt('password'),
            'role' => 'admin',
        ]);

        // Create a neighborhood association for the admin
        $adminAssociation = NeighborhoodAssociation::factory()->withCreator($adminUser->id)->create();

        // Create a neighbor record for the admin user
        Neighbor::factory()->create([
            'neighborhood_association_id' => $adminAssociation->id,
            'user_id' => $adminUser->id,
            'address' => $faker->address,
            'identification_number' => $this->generateRut(),
            'registration_date' => now(),
            'birth_date' => Carbon::parse('1980-01-01')->addYears(rand(0, 40)),
            'status' => 'active',
        ]);

        // Create neighbors associated with the admin's neighborhood association
        for ($i = 0; $i < 3; $i++) {
            $user = User::factory()->create();
            Neighbor::factory()->create([
                'neighborhood_association_id' => $adminAssociation->id,
                'user_id' => $user->id,
                'address' => $faker->address,
                'identification_number' => $this->generateRut(),
                'registration_date' => now(),
                'birth_date' => Carbon::parse('1980-01-01')->addYears(rand(0, 40)),
                'status' => $faker->randomElement(['active', 'inactive']),
            ]);
        }

        // Create a board member user if it doesn't exist
        $boardMemberUser = User::firstOrCreate([
            'email' => 'board_member@example.com',
        ], [
            'name' => 'Board Member User',
            'password' => bcrypt('password'),
            'role' => 'board_member',
        ]);

        // Create a neighborhood association for the board member
        $boardMemberAssociation = NeighborhoodAssociation::factory()->withCreator($boardMemberUser->id)->create();

        // Create a neighbor record for the board member user
        Neighbor::factory()->create([
            'neighborhood_association_id' => $boardMemberAssociation->id,
            'user_id' => $boardMemberUser->id,
            'address' => $faker->address,
            'identification_number' => $this->generateRut(),
            'registration_date' => now(),
            'birth_date' => Carbon::parse('1980-01-01')->addYears(rand(0, 40)),
            'status' => 'active',
        ]);

        // Create neighbors associated with the board member's neighborhood association
        for ($i = 0; $i < 3; $i++) {
            $user = User::factory()->create();
            Neighbor::factory()->create([
                'neighborhood_association_id' => $boardMemberAssociation->id,
                'user_id' => $user->id,
                'address' => $faker->address,
                'identification_number' => $this->generateRut(),
                'registration_date' => now(),
                'birth_date' => Carbon::parse('1980-01-01')->addYears(rand(0, 40)),
                'status' => $faker->randomElement(['active', 'inactive']),
            ]);
        }

        // Create a resident demo user, associated to the board member's association
        $residentUser = User::firstOrCreate([
            'email' => 'vecino@example.com',
        ], [
            'name' => 'Vecino Demo',
            'password' => bcrypt('password'),
            'role' => 'resident',
        ]);

        Neighbor::factory()->create([
            'neighborhood_association_id' => $boardMemberAssociation->id,
            'user_id' => $residentUser->id,
            'address' => $faker->address,
            'identification_number' => $this->generateRut(),
            'registration_date' => now(),
            'birth_date' => Carbon::parse('1980-01-01')->addYears(rand(0, 40)),
            'status' => 'active',
        ]);

        // Create additional neighbors assigned to random neighborhood associations
        $associations = NeighborhoodAssociation::all();
        $users = User::factory()->count(50)->create();

        foreach ($users as $user) {
            Neighbor::factory()->create([
                'neighborhood_association_id' => $associations->random()->id,
                'user_id' => $user->id,
                'address' => $faker->address,
                'identification_number' => $this->generateRut(),
                'registration_date' => now(),
                'birth_date' => Carbon::parse('1980-01-01')->addYears(rand(0, 40)),
                'status' => $faker->randomElement(['active', 'inactive']),
            ]);
        }

        // Populate demo content (committees, meetings, projects, finance) for the
        // two "flagship" associations used in the demo credentials.
        $this->seedAssociationDemoData($adminAssociation, $adminUser);
        $this->seedAssociationDemoData($boardMemberAssociation, $boardMemberUser);
    }

    /**
     * Seed committees, meetings, a project and finance records for a demo
     * association, so DBeaver/manual QA has non-empty tables to inspect.
     */
    private function seedAssociationDemoData(NeighborhoodAssociation $association, User $creator): void
    {
        $neighbors = Neighbor::where('neighborhood_association_id', $association->id)->get();

        // Committees + members
        $committees = Committee::factory()->count(2)->create([
            'neighborhood_association_id' => $association->id,
            'created_by' => $creator->id,
        ]);

        foreach ($committees as $committee) {
            foreach ($neighbors->random(min(2, $neighbors->count())) as $neighbor) {
                CommitteeMember::factory()->create([
                    'committee_id' => $committee->id,
                    'neighbor_id' => $neighbor->id,
                ]);
            }
        }

        // Meetings + attendance + minutes
        $meetings = Meeting::factory()->count(3)->create([
            'neighborhood_association_id' => $association->id,
        ]);

        foreach ($meetings as $meeting) {
            foreach ($neighbors as $neighbor) {
                MeetingAttendance::factory()->create([
                    'meeting_id' => $meeting->id,
                    'neighbor_id' => $neighbor->id,
                ]);
            }

            if ($meeting->status === 'completed') {
                Minutes::factory()->create(['meeting_id' => $meeting->id]);
            }
        }

        // Project + contributions
        $project = Project::factory()->create(['association_id' => $association->id]);

        foreach ($neighbors->random(min(3, $neighbors->count())) as $neighbor) {
            $project->neighbors()->attach($neighbor->id);
            Contribution::factory()->create([
                'project_id' => $project->id,
                'neighbor_id' => $neighbor->id,
            ]);
        }

        // Finance: expense/income types + records
        $expenseType = ExpenseType::factory()->create([
            'association_id' => $association->id,
            'created_by' => $creator->id,
        ]);
        Expense::factory()->count(3)->create([
            'type_id' => $expenseType->id,
            'association_id' => $association->id,
        ]);

        $incomeType = IncomeType::factory()->create([
            'association_id' => $association->id,
            'created_by' => $creator->id,
        ]);
        Income::factory()->count(3)->create([
            'type_id' => $incomeType->id,
            'association_id' => $association->id,
        ]);
    }

    /**
     * Generate a random RUT in the Chilean format (e.g., 12.345.678-9).
     *
     * @return string
     */
    private function generateRut()
    {
        $number = rand(1000000, 25000000); // Generate a random number between 1,000,000 and 25,000,000
        $formattedNumber = number_format($number, 0, '', '.');
        $verifier = $this->calculateVerifier($number);

        return $formattedNumber.'-'.$verifier;
    }

    /**
     * Calculate the RUT verifier digit.
     *
     * @param  int  $number
     * @return string
     */
    private function calculateVerifier($number)
    {
        $multiplier = 2;
        $sum = 0;

        while ($number > 0) {
            $digit = $number % 10;
            $sum += $digit * $multiplier;
            $number = (int) ($number / 10);
            $multiplier = $multiplier == 7 ? 2 : $multiplier + 1;
        }

        $remainder = $sum % 11;
        $verifier = 11 - $remainder;

        if ($verifier == 11) {
            return '0';
        } elseif ($verifier == 10) {
            return 'K';
        } else {
            return (string) $verifier;
        }
    }
}
