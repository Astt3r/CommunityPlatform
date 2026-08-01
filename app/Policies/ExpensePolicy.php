<?php

namespace App\Policies;

use App\Models\Expense;
use App\Models\User;

class ExpensePolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Expense $expense): bool
    {
        return $user->isAdmin() || $user->currentAssociation()?->id === $expense->association_id;
    }

    public function create(User $user): bool
    {
        return $user->isAdmin() || $user->isBoardMember();
    }

    public function update(User $user, Expense $expense): bool
    {
        return $user->isAdmin()
            || ($user->isBoardMember() && $user->currentAssociation()?->id === $expense->association_id);
    }

    public function delete(User $user, Expense $expense): bool
    {
        return $this->update($user, $expense);
    }
}
