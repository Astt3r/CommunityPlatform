<?php

namespace App\Policies;

use App\Models\Neighbor;
use App\Models\User;

class NeighborPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Neighbor $neighbor): bool
    {
        return $user->isAdmin() || $user->currentAssociation()?->id === $neighbor->neighborhood_association_id;
    }

    public function create(User $user): bool
    {
        return $user->isAdmin() || $user->isBoardMember();
    }

    public function update(User $user, Neighbor $neighbor): bool
    {
        return $user->isAdmin()
            || ($user->isBoardMember() && $user->currentAssociation()?->id === $neighbor->neighborhood_association_id);
    }

    public function delete(User $user, Neighbor $neighbor): bool
    {
        return $this->update($user, $neighbor);
    }
}
