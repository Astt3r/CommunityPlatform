-- Junta Transparente / CommunityPlatform
-- Esquema MySQL 8.4+ para importar directamente en DBeaver.
--
-- Refleja el estado FINAL del modelo (todas las migraciones de
-- database/migrations aplicadas, incluyendo el saneamiento de
-- `committees` y `committee_members`), no un historial migración a migración.
--
-- Generado a mano a partir de las migraciones de Laravel porque este entorno
-- no tuvo PHP/Composer/MySQL disponibles para correr:
--   php artisan schema:dump --path=database/sql/schema.sql
-- Si tienes Laravel corriendo, prefiere regenerarlo con ese comando para
-- garantizar que coincide 100% con el código (ver database/sql/README.md).

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ---------------------------------------------------------------------
-- Framework: usuarios, sesiones, cache, colas
-- ---------------------------------------------------------------------

CREATE TABLE `users` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `email_verified_at` TIMESTAMP NULL DEFAULT NULL,
  `password` VARCHAR(255) NOT NULL,
  `remember_token` VARCHAR(100) NULL DEFAULT NULL,
  `role` ENUM('resident','board_member','admin') NOT NULL DEFAULT 'resident',
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `password_reset_tokens` (
  `email` VARCHAR(255) NOT NULL,
  `token` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `sessions` (
  `id` VARCHAR(255) NOT NULL,
  `user_id` BIGINT UNSIGNED NULL DEFAULT NULL,
  `ip_address` VARCHAR(45) NULL DEFAULT NULL,
  `user_agent` TEXT NULL,
  `payload` LONGTEXT NOT NULL,
  `last_activity` INT NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `cache` (
  `key` VARCHAR(255) NOT NULL,
  `value` MEDIUMTEXT NOT NULL,
  `expiration` INT NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `cache_locks` (
  `key` VARCHAR(255) NOT NULL,
  `owner` VARCHAR(255) NOT NULL,
  `expiration` INT NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `jobs` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `queue` VARCHAR(255) NOT NULL,
  `payload` LONGTEXT NOT NULL,
  `attempts` TINYINT UNSIGNED NOT NULL,
  `reserved_at` INT UNSIGNED NULL DEFAULT NULL,
  `available_at` INT UNSIGNED NOT NULL,
  `created_at` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `job_batches` (
  `id` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `total_jobs` INT NOT NULL,
  `pending_jobs` INT NOT NULL,
  `failed_jobs` INT NOT NULL,
  `failed_job_ids` LONGTEXT NOT NULL,
  `options` MEDIUMTEXT NULL,
  `cancelled_at` INT NULL DEFAULT NULL,
  `created_at` INT NOT NULL,
  `finished_at` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `failed_jobs` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` VARCHAR(255) NOT NULL,
  `connection` TEXT NOT NULL,
  `queue` TEXT NOT NULL,
  `payload` LONGTEXT NOT NULL,
  `exception` LONGTEXT NOT NULL,
  `failed_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- Dominio: Junta Transparente
-- ---------------------------------------------------------------------

CREATE TABLE `neighborhood_associations` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `name` VARCHAR(255) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `website_url` VARCHAR(255) NULL DEFAULT NULL,
  `number_of_members` INT NOT NULL DEFAULT 0,
  `date_of_funding` DATE NOT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_by` BIGINT UNSIGNED NULL DEFAULT NULL,
  `updated_by` BIGINT UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `neighborhood_associations_created_by_foreign` (`created_by`),
  KEY `neighborhood_associations_updated_by_foreign` (`updated_by`),
  CONSTRAINT `neighborhood_associations_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `neighborhood_associations_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `expense_types` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `code` VARCHAR(20) NOT NULL,
  `status` ENUM('active','inactive') NOT NULL DEFAULT 'active',
  `created_by` BIGINT UNSIGNED NOT NULL,
  `updated_by` BIGINT UNSIGNED NULL DEFAULT NULL,
  `association_id` BIGINT UNSIGNED NULL DEFAULT NULL,
  `effective_date` DATE NULL DEFAULT NULL,
  `end_date` DATE NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `expense_types_code_unique` (`code`),
  KEY `expense_types_created_by_foreign` (`created_by`),
  KEY `expense_types_updated_by_foreign` (`updated_by`),
  KEY `expense_types_association_id_foreign` (`association_id`),
  CONSTRAINT `expense_types_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `expense_types_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`),
  CONSTRAINT `expense_types_association_id_foreign` FOREIGN KEY (`association_id`) REFERENCES `neighborhood_associations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `income_types` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `code` VARCHAR(20) NOT NULL,
  `status` ENUM('active','inactive') NOT NULL DEFAULT 'active',
  `created_by` BIGINT UNSIGNED NOT NULL,
  `updated_by` BIGINT UNSIGNED NULL DEFAULT NULL,
  `association_id` BIGINT UNSIGNED NULL DEFAULT NULL,
  `effective_date` DATE NULL DEFAULT NULL,
  `end_date` DATE NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `income_types_code_unique` (`code`),
  KEY `income_types_created_by_foreign` (`created_by`),
  KEY `income_types_updated_by_foreign` (`updated_by`),
  KEY `income_types_association_id_foreign` (`association_id`),
  CONSTRAINT `income_types_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `income_types_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`),
  CONSTRAINT `income_types_association_id_foreign` FOREIGN KEY (`association_id`) REFERENCES `neighborhood_associations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `neighbors` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `address` VARCHAR(255) NOT NULL,
  `identification_number` VARCHAR(50) NOT NULL,
  `registration_date` DATE NOT NULL,
  `birth_date` DATE NOT NULL,
  `status` ENUM('active','inactive') NOT NULL DEFAULT 'active',
  `last_participation_date` DATE NULL DEFAULT NULL,
  `user_id` BIGINT UNSIGNED NULL DEFAULT NULL,
  `neighborhood_association_id` BIGINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `neighbors_user_id_foreign` (`user_id`),
  KEY `neighbors_neighborhood_association_id_foreign` (`neighborhood_association_id`),
  CONSTRAINT `neighbors_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `neighbors_neighborhood_association_id_foreign` FOREIGN KEY (`neighborhood_association_id`) REFERENCES `neighborhood_associations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `fees` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `amount` INT NOT NULL,
  `due_date` DATE NOT NULL,
  `paid_date` DATE NULL DEFAULT NULL,
  `status` ENUM('pending','paid','overdue') NOT NULL DEFAULT 'pending',
  `neighbor_id` BIGINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fees_neighbor_id_foreign` (`neighbor_id`),
  CONSTRAINT `fees_neighbor_id_foreign` FOREIGN KEY (`neighbor_id`) REFERENCES `neighbors` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `meetings` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `meeting_date` DATETIME NOT NULL,
  `main_topic` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  `location` VARCHAR(255) NULL DEFAULT NULL,
  `result` VARCHAR(255) NULL DEFAULT NULL,
  `status` ENUM('scheduled','completed','canceled') NOT NULL DEFAULT 'scheduled',
  `neighborhood_association_id` BIGINT UNSIGNED NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `meetings_neighborhood_association_id_foreign` (`neighborhood_association_id`),
  CONSTRAINT `meetings_neighborhood_association_id_foreign` FOREIGN KEY (`neighborhood_association_id`) REFERENCES `neighborhood_associations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `minutes` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `content` TEXT NOT NULL,
  `created_date` TIMESTAMP NOT NULL,
  `signed_by` VARCHAR(100) NULL DEFAULT NULL,
  `approved_by` VARCHAR(100) NULL DEFAULT NULL,
  `meeting_id` BIGINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `minutes_meeting_id_foreign` (`meeting_id`),
  CONSTRAINT `minutes_meeting_id_foreign` FOREIGN KEY (`meeting_id`) REFERENCES `meetings` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `expenses` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `concept` VARCHAR(255) NOT NULL,
  `responsible` VARCHAR(100) NOT NULL,
  `date` TIMESTAMP NOT NULL,
  `amount` INT UNSIGNED NOT NULL,
  `receipt` VARCHAR(255) NULL DEFAULT NULL,
  `status` ENUM('approved','pending','rejected') NOT NULL DEFAULT 'pending',
  `type_id` BIGINT UNSIGNED NOT NULL,
  `association_id` BIGINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `expenses_type_id_foreign` (`type_id`),
  KEY `expenses_association_id_foreign` (`association_id`),
  CONSTRAINT `expenses_type_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `expense_types` (`id`) ON DELETE CASCADE,
  CONSTRAINT `expenses_association_id_foreign` FOREIGN KEY (`association_id`) REFERENCES `neighborhood_associations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `meeting_attendances` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `meeting_id` BIGINT UNSIGNED NOT NULL,
  `neighbor_id` BIGINT UNSIGNED NOT NULL,
  `attended` TINYINT NOT NULL DEFAULT 0,
  `absence_reason` VARCHAR(255) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `meeting_attendances_meeting_id_foreign` (`meeting_id`),
  KEY `meeting_attendances_neighbor_id_foreign` (`neighbor_id`),
  CONSTRAINT `meeting_attendances_meeting_id_foreign` FOREIGN KEY (`meeting_id`) REFERENCES `meetings` (`id`) ON DELETE CASCADE,
  CONSTRAINT `meeting_attendances_neighbor_id_foreign` FOREIGN KEY (`neighbor_id`) REFERENCES `neighbors` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `projects` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `issue` VARCHAR(255) NOT NULL,
  `is_for_all_neighbors` TINYINT(1) NOT NULL DEFAULT 0,
  `start_date` DATE NOT NULL,
  `end_date` DATE NULL DEFAULT NULL,
  `status` ENUM('planeado','aprobado','en proceso','completado','cancelado','rechazado') NOT NULL DEFAULT 'planeado',
  `budget` INT NOT NULL,
  `changes` LONGTEXT NOT NULL,
  `association_id` BIGINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `projects_association_id_foreign` (`association_id`),
  CONSTRAINT `projects_association_id_foreign` FOREIGN KEY (`association_id`) REFERENCES `neighborhood_associations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `files` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `project_id` BIGINT UNSIGNED NOT NULL,
  `file_path` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `files_project_id_foreign` (`project_id`),
  CONSTRAINT `files_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- `committees` incluye ya `neighborhood_association_id`: en el proyecto original
-- esta columna faltaba y rompía la creación de comités (ver database/sql/README.md).
CREATE TABLE `committees` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `neighborhood_association_id` BIGINT UNSIGNED NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `created_by` BIGINT UNSIGNED NOT NULL,
  `updated_by` BIGINT UNSIGNED NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `committees_neighborhood_association_id_foreign` (`neighborhood_association_id`),
  KEY `committees_created_by_foreign` (`created_by`),
  KEY `committees_updated_by_foreign` (`updated_by`),
  CONSTRAINT `committees_neighborhood_association_id_foreign` FOREIGN KEY (`neighborhood_association_id`) REFERENCES `neighborhood_associations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `committees_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `committees_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- `committee_members` referencia `neighbors`, no `users`: en el proyecto
-- original apuntaba a `users`, inconsistente con el resto del dominio
-- (ver database/sql/README.md).
CREATE TABLE `committee_members` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `committee_id` BIGINT UNSIGNED NOT NULL,
  `neighbor_id` BIGINT UNSIGNED NOT NULL,
  `status` ENUM('active','inactive') NOT NULL DEFAULT 'active',
  `joined_date` DATE NOT NULL,
  `left_date` DATE NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `committee_members_committee_id_foreign` (`committee_id`),
  KEY `committee_members_neighbor_id_foreign` (`neighbor_id`),
  CONSTRAINT `committee_members_committee_id_foreign` FOREIGN KEY (`committee_id`) REFERENCES `committees` (`id`) ON DELETE CASCADE,
  CONSTRAINT `committee_members_neighbor_id_foreign` FOREIGN KEY (`neighbor_id`) REFERENCES `neighbors` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `neighbor_project` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `project_id` BIGINT UNSIGNED NOT NULL,
  `neighbor_id` BIGINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `neighbor_project_project_id_foreign` (`project_id`),
  KEY `neighbor_project_neighbor_id_foreign` (`neighbor_id`),
  CONSTRAINT `neighbor_project_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  CONSTRAINT `neighbor_project_neighbor_id_foreign` FOREIGN KEY (`neighbor_id`) REFERENCES `neighbors` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `incomes` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `source` VARCHAR(255) NOT NULL,
  `date` DATE NOT NULL,
  `responsible` VARCHAR(255) NOT NULL,
  `amount` INT UNSIGNED NOT NULL,
  `status` ENUM('active','inactive') NOT NULL DEFAULT 'active',
  `type_id` BIGINT UNSIGNED NOT NULL,
  `association_id` BIGINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `incomes_type_id_foreign` (`type_id`),
  KEY `incomes_association_id_foreign` (`association_id`),
  CONSTRAINT `incomes_type_id_foreign` FOREIGN KEY (`type_id`) REFERENCES `income_types` (`id`),
  CONSTRAINT `incomes_association_id_foreign` FOREIGN KEY (`association_id`) REFERENCES `neighborhood_associations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `contributions` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `amount` INT NOT NULL,
  `neighbor_id` BIGINT UNSIGNED NOT NULL,
  `project_id` BIGINT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contributions_neighbor_id_foreign` (`neighbor_id`),
  KEY `contributions_project_id_foreign` (`project_id`),
  CONSTRAINT `contributions_neighbor_id_foreign` FOREIGN KEY (`neighbor_id`) REFERENCES `neighbors` (`id`) ON DELETE CASCADE,
  CONSTRAINT `contributions_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
