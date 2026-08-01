# Esquema SQL para DBeaver

Este directorio contiene un dump del esquema de base de datos (MySQL 8.4+) pensado
para importarlo directamente en DBeaver u otro cliente SQL, sin necesidad de tener
PHP/Composer/Laravel instalados.

- `schema.sql` — DDL completo (tablas, tipos, claves foráneas). Refleja el estado
  final de todas las migraciones en `database/migrations/`.
- `seed.sql` — datos de ejemplo (2 juntas de vecinos, usuarios, comités, reuniones,
  proyectos, finanzas) para poder explorar las relaciones con datos reales.

## Cómo importarlo en DBeaver

1. Levanta MySQL con Docker: `docker compose up -d` (ver `docker-compose.yml` en la
   raíz del proyecto). Esto crea la base `community_platform` en `127.0.0.1:3306`
   con usuario `junta` / contraseña `junta`.
2. En DBeaver, crea una nueva conexión MySQL a `127.0.0.1:3306`, base de datos
   `community_platform`, usuario `junta`, contraseña `junta`.
3. Abre `schema.sql` en el editor SQL de DBeaver conectado a esa base y ejecútalo
   completo (crea todas las tablas).
4. Abre `seed.sql` y ejecútalo completo (inserta los datos de ejemplo).
5. Explora las tablas y el diagrama ER generado por DBeaver (`Database Navigator`
   → botón derecho sobre la base → `View Diagram`).

## Cómo regenerarlo desde Laravel (recomendado si tienes PHP disponible)

Este `schema.sql` se escribió a mano leyendo cada migración, porque el entorno en
el que se generó no tenía PHP/Composer/MySQL disponibles. Si tienes Laravel
corriendo, es preferible regenerarlo con el comando nativo para garantizar que
coincide exactamente con el código:

```bash
php artisan migrate:fresh
php artisan schema:dump --path=database/sql/schema.sql
```

Para regenerar `seed.sql` con datos reales de `DatabaseSeeder`:

```bash
php artisan db:seed
mysqldump -u junta -pjunta --no-create-info --no-tablespaces \
  community_platform > database/sql/seed.sql
```

## Credenciales de las cuentas demo (también en `DatabaseSeeder`)

| Rol | Email | Contraseña |
|-----|-------|------------|
| Administrador | `admin@example.com` | `password` |
| Directiva | `board_member@example.com` | `password` |
| Vecino | `vecino@example.com` | `password` |
