<?php

namespace App\Policies;

use App\Models\Committee;
use App\Models\User;

class CommitteePolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Committee $committee): bool
    {
        return $user->isAdmin() || $user->currentAssociation()?->id === $committee->neighborhood_association_id;
    }

    public function create(User $user): bool
    {
        return $user->isAdmin() || $user->isBoardMember();
    }

    public function update(User $user, Committee $committee): bool
    {
        return $user->isAdmin()
            || ($user->isBoardMember() && $user->currentAssociation()?->id === $committee->neighborhood_association_id);
    }

    public function delete(User $user, Committee $committee): bool
    {
        return $this->update($user, $committee);
    }
}
