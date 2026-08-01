<?php

namespace Tests\Concerns;

use Illuminate\Contracts\Console\Kernel;
use Illuminate\Foundation\Testing\RefreshDatabaseState;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Schema;

/**
 * Drop-in replacement for Illuminate\Foundation\Testing\DatabaseMigrations.
 *
 * migrate:rollback runs each migration's down() in isolation without
 * disabling FK checks, which fails here because several tables reference
 * neighborhood_associations. migrate:fresh is unaffected since its drop
 * step already disables FK checks internally.
 *
 * Also purges file-based session storage: migrate:fresh resets
 * auto-increment IDs, so a stale session file from a previous test can
 * "authenticate" an unrelated user created in the next test simply
 * because they landed on the same reused ID.
 */
trait RefreshesDatabaseSafely
{
    public function runDatabaseMigrations()
    {
        File::cleanDirectory(storage_path('framework/sessions'));

        $this->artisan('migrate:fresh');

        $this->app[Kernel::class]->setArtisan(null);

        $this->beforeApplicationDestroyed(function () {
            Schema::disableForeignKeyConstraints();
            $this->artisan('migrate:rollback');
            Schema::enableForeignKeyConstraints();

            RefreshDatabaseState::$migrated = false;
        });
    }
}
