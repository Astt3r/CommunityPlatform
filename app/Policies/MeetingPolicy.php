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

    /**
     * Abrir una votación en vivo: mismo criterio que editar la reunión.
     */
    public function openVote(User $user, Meeting $meeting): bool
    {
        return $this->update($user, $meeting);
    }

    /**
     * Cerrar una votación en vivo: mismo criterio que editar la reunión.
     */
    public function closeVote(User $user, Meeting $meeting): bool
    {
        return $this->update($user, $meeting);
    }

    /**
     * Votar: cualquier vecino activo de la asociación de la reunión (o de
     * cualquier asociación, si la reunión es general). Los admin no tienen
     * registro de Neighbor, así que no pueden votar.
     */
    public function castVote(User $user, Meeting $meeting): bool
    {
        $neighbor = $user->neighbor;

        if (! $neighbor || $neighbor->status !== 'active') {
            return false;
        }

        return $meeting->neighborhood_association_id === null
            || $neighbor->neighborhood_association_id === $meeting->neighborhood_association_id;
    }
}
