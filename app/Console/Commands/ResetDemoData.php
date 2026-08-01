<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ResetDemoData extends Command
{
    protected $signature = 'demo:reset';

    protected $description = 'Wipe and reseed the database with fresh demo data (guarded by APP_DEMO_RESEED)';

    public function handle(): int
    {
        if (! filter_var(env('APP_DEMO_RESEED'), FILTER_VALIDATE_BOOL)) {
            $this->error('APP_DEMO_RESEED is not enabled. Refusing to wipe the database.');

            return self::FAILURE;
        }

        $this->call('migrate:fresh', ['--force' => true, '--seed' => true]);

        $this->info('Demo data reset.');

        return self::SUCCESS;
    }
}
