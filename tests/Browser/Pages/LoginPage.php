<?php

namespace Tests\Browser\Pages;

use Laravel\Dusk\Browser;
use Laravel\Dusk\Page;

class LoginPage extends Page
{
    public function url(): string
    {
        return '/login';
    }

    public function assert(Browser $browser): void
    {
        $browser->assertPathIs($this->url());
    }

    public function loginViaForm(Browser $browser, string $email, string $password = 'password'): void
    {
        $browser->visit($this)
            ->type('email', $email)
            ->type('password', $password)
            ->press('Iniciar Sesión')
            ->waitForLocation('/dashboard');
    }
}
