-- Junta Transparente / CommunityPlatform
-- Datos de demostración para inspeccionar en DBeaver sin levantar Laravel.
-- Importar DESPUÉS de schema.sql.
--
-- Para desarrollar con la aplicación (login, etc.) usa en su lugar:
--   php artisan migrate --seed
-- que ejecuta database/seeders/DatabaseSeeder.php (datos aleatorios con Faker,
-- incluye las mismas 3 cuentas demo definidas aquí).
--
-- Contraseña de las 3 cuentas de usuario: "password"
-- (hash bcrypt de referencia estándar de Laravel).

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ---------------------------------------------------------------------
-- Usuarios (3 cuentas demo, una por rol)
-- ---------------------------------------------------------------------
INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Admin User', 'admin@example.com', NOW(), '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', NOW(), NOW()),
(2, 'Board Member User', 'board_member@example.com', NOW(), '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'board_member', NOW(), NOW()),
(3, 'Vecino Demo', 'vecino@example.com', NOW(), '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'resident', NOW(), NOW()),
(4, 'Carla Muñoz', 'carla.munoz@example.com', NOW(), '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'resident', NOW(), NOW()),
(5, 'Jorge Pérez', 'jorge.perez@example.com', NOW(), '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'resident', NOW(), NOW());

-- ---------------------------------------------------------------------
-- Juntas de vecinos
-- ---------------------------------------------------------------------
INSERT INTO `neighborhood_associations` (`id`, `created_at`, `updated_at`, `name`, `address`, `phone`, `email`, `website_url`, `number_of_members`, `date_of_funding`, `is_active`, `created_by`, `updated_by`) VALUES
(1, NOW(), NOW(), 'Junta de Vecinos Los Alerces', 'Av. Los Alerces 1234, Ñuñoa', '+56912345678', 'contacto@losalerces.cl', NULL, 3, '2015-03-10', 1, 1, 1),
(2, NOW(), NOW(), 'Junta de Vecinos El Bosque Sur', 'Calle El Bosque 456, La Florida', '+56987654321', 'contacto@bosquesur.cl', NULL, 3, '2012-07-22', 1, 2, 2);

-- ---------------------------------------------------------------------
-- Vecinos (membresía user <-> junta)
-- ---------------------------------------------------------------------
INSERT INTO `neighbors` (`id`, `address`, `identification_number`, `registration_date`, `birth_date`, `status`, `last_participation_date`, `user_id`, `neighborhood_association_id`, `created_at`, `updated_at`) VALUES
(1, 'Av. Los Alerces 1234, Ñuñoa', '12.345.678-9', '2015-03-10', '1975-05-20', 'active', '2026-06-01', 1, 1, NOW(), NOW()),
(2, 'Calle El Bosque 456, La Florida', '13.456.789-0', '2012-07-22', '1980-11-02', 'active', '2026-06-15', 2, 2, NOW(), NOW()),
(3, 'Calle El Bosque 460, La Florida', '14.567.890-1', '2013-01-15', '1990-02-18', 'active', '2026-05-20', 3, 2, NOW(), NOW()),
(4, 'Av. Los Alerces 1250, Ñuñoa', '15.678.901-2', '2016-08-01', '1988-09-09', 'active', '2026-04-10', 4, 1, NOW(), NOW()),
(5, 'Calle El Bosque 470, La Florida', '16.789.012-3', '2014-04-05', '1995-12-30', 'inactive', NULL, 5, 2, NOW(), NOW());

-- ---------------------------------------------------------------------
-- Comités
-- ---------------------------------------------------------------------
INSERT INTO `committees` (`id`, `neighborhood_association_id`, `name`, `description`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 1, 'Comité de Seguridad', 'Encargado de la seguridad del barrio', 1, NULL, NOW(), NOW()),
(2, 2, 'Comité de Áreas Verdes', 'Mantención de plazas y jardines comunitarios', 2, NULL, NOW(), NOW());

INSERT INTO `committee_members` (`id`, `committee_id`, `neighbor_id`, `status`, `joined_date`, `left_date`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'active', '2020-01-10', NULL, NOW(), NOW()),
(2, 1, 4, 'active', '2021-03-15', NULL, NOW(), NOW()),
(3, 2, 2, 'active', '2019-06-01', NULL, NOW(), NOW()),
(4, 2, 3, 'active', '2022-02-20', NULL, NOW(), NOW());

-- ---------------------------------------------------------------------
-- Reuniones, asistencia y actas
-- ---------------------------------------------------------------------
INSERT INTO `meetings` (`id`, `meeting_date`, `main_topic`, `description`, `location`, `result`, `status`, `neighborhood_association_id`, `created_at`, `updated_at`) VALUES
(1, '2026-05-05 19:00:00', 'Presupuesto anual', 'Revisión y aprobación del presupuesto 2026', 'Sede social Los Alerces', 'Presupuesto aprobado por mayoría', 'completed', 1, NOW(), NOW()),
(2, '2026-08-10 19:00:00', 'Plan de seguridad', 'Propuesta de cámaras comunitarias', 'Sede social Los Alerces', NULL, 'scheduled', 1, NOW(), NOW()),
(3, '2026-06-12 18:30:00', 'Áreas verdes', 'Definir cronograma de mantención de plazas', 'Multicancha El Bosque Sur', 'Se aprobó cronograma trimestral', 'completed', 2, NOW(), NOW());

INSERT INTO `minutes` (`id`, `content`, `created_date`, `signed_by`, `approved_by`, `meeting_id`, `created_at`, `updated_at`) VALUES
(1, 'Se revisó el presupuesto anual, se discutieron las partidas de gasto y se aprobó por mayoría de los asistentes.', '2026-05-05 21:00:00', 'Admin User', 'Admin User', 1, NOW(), NOW()),
(2, 'Se definió un cronograma trimestral de mantención de áreas verdes, con responsables rotativos entre vecinos.', '2026-06-12 20:30:00', 'Board Member User', 'Board Member User', 3, NOW(), NOW());

INSERT INTO `meeting_attendances` (`id`, `meeting_id`, `neighbor_id`, `attended`, `absence_reason`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, NULL, NOW(), NOW()),
(2, 1, 4, 1, NULL, NOW(), NOW()),
(3, 3, 2, 1, NULL, NOW(), NOW()),
(4, 3, 3, 0, 'Motivos de salud', NOW(), NOW()),
(5, 3, 5, 0, 'Sin justificar', NOW(), NOW());

-- ---------------------------------------------------------------------
-- Proyectos y aportes
-- ---------------------------------------------------------------------
INSERT INTO `projects` (`id`, `name`, `description`, `issue`, `is_for_all_neighbors`, `start_date`, `end_date`, `status`, `budget`, `changes`, `association_id`, `created_at`, `updated_at`) VALUES
(1, 'Mejoramiento de plaza central', 'Renovación de juegos infantiles y áreas de descanso', 'Infraestructura deteriorada', 1, '2026-03-01', '2026-09-30', 'en proceso', 2500000, '', 1, NOW(), NOW()),
(2, 'Instalación de luminarias LED', 'Reemplazo de alumbrado público comunitario', 'Iluminación insuficiente', 1, '2026-01-15', '2026-05-30', 'completado', 1800000, '', 2, NOW(), NOW());

INSERT INTO `neighbor_project` (`id`, `project_id`, `neighbor_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, NOW(), NOW()),
(2, 1, 4, NOW(), NOW()),
(3, 2, 2, NOW(), NOW()),
(4, 2, 3, NOW(), NOW());

INSERT INTO `contributions` (`id`, `amount`, `neighbor_id`, `project_id`, `created_at`, `updated_at`) VALUES
(1, 50000, 1, 1, NOW(), NOW()),
(2, 30000, 4, 1, NOW(), NOW()),
(3, 40000, 2, 2, NOW(), NOW()),
(4, 25000, 3, 2, NOW(), NOW());

-- ---------------------------------------------------------------------
-- Finanzas
-- ---------------------------------------------------------------------
INSERT INTO `expense_types` (`id`, `name`, `description`, `code`, `status`, `created_by`, `updated_by`, `association_id`, `effective_date`, `end_date`, `created_at`, `updated_at`) VALUES
(1, 'Mantención', 'Gastos de mantención de áreas comunes', 'GA-001', 'active', 1, NULL, 1, '2026-01-01', NULL, NOW(), NOW()),
(2, 'Servicios básicos', 'Agua, luz y gas de la sede social', 'GA-002', 'active', 2, NULL, 2, '2026-01-01', NULL, NOW(), NOW());

INSERT INTO `expenses` (`id`, `concept`, `responsible`, `date`, `amount`, `receipt`, `status`, `type_id`, `association_id`, `created_at`, `updated_at`) VALUES
(1, 'Reparación de juegos infantiles', 'Admin User', '2026-04-10 00:00:00', 320000, NULL, 'approved', 1, 1, NOW(), NOW()),
(2, 'Pago de cuenta de luz sede social', 'Board Member User', '2026-05-01 00:00:00', 45000, NULL, 'approved', 2, 2, NOW(), NOW()),
(3, 'Compra de materiales de jardinería', 'Board Member User', '2026-06-05 00:00:00', 60000, NULL, 'pending', 2, 2, NOW(), NOW());

INSERT INTO `income_types` (`id`, `name`, `description`, `code`, `status`, `created_by`, `updated_by`, `association_id`, `effective_date`, `end_date`, `created_at`, `updated_at`) VALUES
(1, 'Cuotas sociales', 'Cuotas mensuales de los vecinos', 'IN-001', 'active', 1, NULL, 1, '2026-01-01', NULL, NOW(), NOW()),
(2, 'Subvención municipal', 'Aporte anual de la municipalidad', 'IN-002', 'active', 2, NULL, 2, '2026-01-01', NULL, NOW(), NOW());

INSERT INTO `incomes` (`id`, `source`, `date`, `responsible`, `amount`, `status`, `type_id`, `association_id`, `created_at`, `updated_at`) VALUES
(1, 'Cuotas mensuales abril', '2026-04-30', 'Admin User', 150000, 'active', 1, 1, NOW(), NOW()),
(2, 'Subvención municipal 2026', '2026-03-15', 'Board Member User', 900000, 'active', 2, 2, NOW(), NOW());

INSERT INTO `fees` (`id`, `amount`, `due_date`, `paid_date`, `status`, `neighbor_id`, `created_at`, `updated_at`) VALUES
(1, 5000, '2026-06-30', '2026-06-20', 'paid', 1, NOW(), NOW()),
(2, 5000, '2026-07-31', NULL, 'pending', 2, NOW(), NOW()),
(3, 5000, '2026-05-31', NULL, 'overdue', 3, NOW(), NOW());

-- Evita colisiones de ID si luego se insertan registros nuevos vía la app.
ALTER TABLE `users` AUTO_INCREMENT = 100;
ALTER TABLE `neighborhood_associations` AUTO_INCREMENT = 100;
ALTER TABLE `neighbors` AUTO_INCREMENT = 100;
ALTER TABLE `committees` AUTO_INCREMENT = 100;
ALTER TABLE `committee_members` AUTO_INCREMENT = 100;
ALTER TABLE `meetings` AUTO_INCREMENT = 100;
ALTER TABLE `minutes` AUTO_INCREMENT = 100;
ALTER TABLE `meeting_attendances` AUTO_INCREMENT = 100;
ALTER TABLE `projects` AUTO_INCREMENT = 100;
ALTER TABLE `neighbor_project` AUTO_INCREMENT = 100;
ALTER TABLE `contributions` AUTO_INCREMENT = 100;
ALTER TABLE `expense_types` AUTO_INCREMENT = 100;
ALTER TABLE `expenses` AUTO_INCREMENT = 100;
ALTER TABLE `income_types` AUTO_INCREMENT = 100;
ALTER TABLE `incomes` AUTO_INCREMENT = 100;
ALTER TABLE `fees` AUTO_INCREMENT = 100;

SET FOREIGN_KEY_CHECKS = 1;
