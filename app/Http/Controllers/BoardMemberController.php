<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class BoardMemberController extends Controller
{
    public function index()
    {
        return Inertia::render('BoardMember/Dashboard');
    }
}
