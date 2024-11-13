<?php

namespace Database\Factories;

use App\Models\NeighborhoodAssociation;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class NeighborhoodAssociationFactory extends Factory
{
    protected $model = NeighborhoodAssociation::class;

    public function definition()
    {
        return [
            'name' => $this->faker->company,
            'address' => $this->faker->address,
            'phone' => $this->faker->phoneNumber,
            'email' => $this->faker->unique()->safeEmail,
            'website_url' => $this->faker->url,
            'number_of_members' => $this->faker->numberBetween(10, 100),
            'date_of_funding' => $this->faker->date(),
            'is_active' => $this->faker->boolean,
            'created_by' => User::inRandomOrder()->first()->id ?? User::factory(),
            'updated_by' => User::inRandomOrder()->first()->id ?? User::factory(),
        ];
    }

    public function withCreator(int $userId): static
    {
        return $this->state([
            'created_by' => $userId,
            'updated_by' => $userId,
        ]);
    }
}
