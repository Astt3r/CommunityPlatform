<?php

namespace Tests;

use Facebook\WebDriver\Chrome\ChromeOptions;
use Facebook\WebDriver\Remote\DesiredCapabilities;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Laravel\Dusk\Browser;
use Laravel\Dusk\TestCase as BaseTestCase;
use PHPUnit\Framework\Attributes\BeforeClass;

abstract class DuskTestCase extends BaseTestCase
{
    /**
     * Prepare for Dusk test execution.
     */
    #[BeforeClass]
    public static function prepare(): void
    {
        if (! static::runningInSail() && ! getenv('DUSK_DRIVER_URL')) {
            static::startChromeDriver(['--port=9515']);
        }
    }

    /**
     * Create the RemoteWebDriver instance.
     */
    protected function driver(): RemoteWebDriver
    {
        $options = (new ChromeOptions)->addArguments(collect([
            $this->shouldStartMaximized() ? '--start-maximized' : '--window-size=1920,1080',
            '--no-sandbox',
            '--disable-dev-shm-usage',
        ])->unless($this->hasHeadlessDisabled(), function ($items) {
            return $items->merge([
                '--disable-gpu',
                '--headless=new',
            ]);
        })->all());

        if ($binary = getenv('CHROME_BINARY')) {
            $options->setBinary($binary);
        }

        return RemoteWebDriver::create(
            $_ENV['DUSK_DRIVER_URL'] ?? 'http://localhost:9515',
            DesiredCapabilities::chrome()->setCapability(
                ChromeOptions::CAPABILITY, $options
            )
        );
    }

    /**
     * Set a native <input> value and dispatch a real "input" event.
     *
     * Typing into date/datetime-local inputs via sendKeys() is unreliable
     * (the browser interprets keystrokes as segment input, e.g. "2026-08-01"
     * becomes "60801-02-02"). Setting .value directly also doesn't work on
     * its own because React only reacts to the native "input" event fired
     * through its element's tracked value setter, not to a raw assignment.
     */
    protected function fillDateInput(Browser $browser, string $selector, string $value): Browser
    {
        $browser->script(sprintf(
            <<<'JS'
            (function () {
                var el = document.querySelector(%s);
                var setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
                setter.call(el, %s);
                el.dispatchEvent(new Event('input', { bubbles: true }));
            })();
            JS,
            json_encode($selector),
            json_encode($value)
        ));

        return $browser;
    }
}
