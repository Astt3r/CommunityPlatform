#!/bin/sh
set -e

if [ -z "$APP_KEY" ]; then
    echo "APP_KEY is not set. Set it as an environment variable (php artisan key:generate --show)."
    exit 1
fi

php artisan config:cache
php artisan route:cache
php artisan view:cache

php artisan migrate --force

if [ "$RUN_SEEDER" = "true" ]; then
    php artisan db:seed --force
fi

exec php artisan serve --host=0.0.0.0 --port="${PORT:-8000}"
