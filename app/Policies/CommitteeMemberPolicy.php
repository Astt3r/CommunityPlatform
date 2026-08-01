<?php

namespace App\Policies;

use App\Models\CommitteeMember;
use App\Models\User;

class CommitteeMemberPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, CommitteeMember $committeeMember): bool
    {
        return $user->isAdmin()
            || $user->currentAssociation()?->id === $committeeMember->committee?->neighborhood_association_id;
    }

    public function create(User $user): bool
    {
        return $user->isAdmin() || $user->isBoardMember();
    }

    public function update(User $user, CommitteeMember $committeeMember): bool
    {
        return $user->isAdmin()
            || ($user->isBoardMember()
                && $user->currentAssociation()?->id === $committeeMember->committee?->neighborhood_association_id);
    }

    public function delete(User $user, CommitteeMember $committeeMember): bool
    {
        return $this->update($user, $committeeMember);
    }
}
