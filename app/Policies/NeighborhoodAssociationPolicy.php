<?php

namespace App\Policies;

use App\Models\NeighborhoodAssociation;
use App\Models\User;

class NeighborhoodAssociationPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, NeighborhoodAssociation $association): bool
    {
        return $user->isAdmin() || $user->currentAssociation()?->id === $association->id;
    }

    public function create(User $user): bool
    {
        return $user->isAdmin();
    }

    public function update(User $user, NeighborhoodAssociation $association): bool
    {
        return $user->isAdmin() || $user->currentAssociation()?->id === $association->id;
    }

    public function delete(User $user, NeighborhoodAssociation $association): bool
    {
        return $user->isAdmin();
    }
}
