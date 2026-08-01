<?php

namespace App\Policies;

use App\Models\Meeting;
use App\Models\User;

class MeetingPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Meeting $meeting): bool
    {
        return $user->isAdmin()
            || $meeting->neighborhood_association_id === null
            || $user->currentAssociation()?->id === $meeting->neighborhood_association_id;
    }

    public function create(User $user): bool
    {
        return $user->isAdmin() || $user->isBoardMember();
    }

    public function update(User $user, Meeting $meeting): bool
    {
        return $user->isAdmin()
            || ($user->isBoardMember() && $user->currentAssociation()?->id === $meeting->neighborhood_association_id);
    }

    public function delete(User $user, Meeting $meeting): bool
    {
        return $this->update($user, $meeting);
    }

    /**
     * Marcar asistencia / generar acta: mismo criterio que editar la reunión.
     */
    public function manageAttendance(User $user, Meeting $meeting): bool
    {
        return $this->update($user, $meeting);
    }
}
