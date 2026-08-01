<?php

use App\Models\Meeting;
use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('meeting.{meeting}', function (User $user, Meeting $meeting) {
    return $user->can('view', $meeting);
});
