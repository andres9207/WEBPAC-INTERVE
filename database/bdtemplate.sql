CREATE TABLE `tbl_status` (
  `sta_id` int NOT NULL AUTO_INCREMENT,
  `sta_name` varchar(100) NOT NULL,
  `sta_scope` enum('GENERAL') NOT NULL DEFAULT 'GENERAL',
  `sta_color` varchar(20) DEFAULT NULL,
  `sta_order` int DEFAULT NULL,
  PRIMARY KEY (`sta_id`) USING BTREE
);

CREATE TABLE `tbl_profiles` (
  `pro_id` int NOT NULL AUTO_INCREMENT,
  `pro_name` varchar(255) DEFAULT NULL,
  `sta_id` int DEFAULT NULL,
  `pro_pages` varchar(255) DEFAULT '',
  `pro_create_by` int DEFAULT NULL,
  `pro_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `pro_update_by` int DEFAULT NULL,
  `pro_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`pro_id`) USING BTREE
);

ALTER TABLE `tbl_profiles`
ADD CONSTRAINT `tbl_profiles_status` FOREIGN KEY (`sta_id`) REFERENCES `tbl_status` (`sta_id`);

ALTER TABLE `tbl_profiles`
ADD UNIQUE INDEX `uq_profiles_pro_name` (`pro_name`) USING BTREE;

CREATE TABLE `tbl_users` (
  `use_id` int NOT NULL AUTO_INCREMENT,
  `use_name` varchar(255) DEFAULT NULL,
  `use_last_name` varchar(255) DEFAULT NULL,
  `use_identification` varchar(255) DEFAULT NULL,
  `use_user` varchar(100) DEFAULT NULL,
  `use_email` varchar(255) DEFAULT NULL,
  `use_password` varchar(255) DEFAULT NULL,
  `pro_id` int DEFAULT NULL,
  `sta_id` int DEFAULT 1,
  `use_access` smallint DEFAULT 1 COMMENT 'acceso al sistema 1: SI, 0: NO',
  `use_change_password` smallint DEFAULT 1 COMMENT 'cambiar contraseña 1: SI, 0: NO',
  `use_pages` varchar(255) DEFAULT '',
  `use_create_by` int DEFAULT NULL,
  `use_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `use_update_by` int DEFAULT NULL,
  `use_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`use_id`) USING BTREE
);

ALTER TABLE `tbl_users`
ADD CONSTRAINT `tbl_users_profiles` FOREIGN KEY (`pro_id`) REFERENCES `tbl_profiles` (`pro_id`),
ADD CONSTRAINT `tbl_users_status` FOREIGN KEY (`sta_id`) REFERENCES `tbl_status` (`sta_id`);

ALTER TABLE `tbl_users`
ADD UNIQUE INDEX `use_user` (`use_user`) USING BTREE,
ADD UNIQUE INDEX `use_email` (`use_email`) USING BTREE;

CREATE TABLE `tbl_pages` (
  `pag_id` int NOT NULL AUTO_INCREMENT,
  `pag_description` varchar(255) NOT NULL,
  `pag_parent` int DEFAULT NULL,
  `pag_url` varchar(255) DEFAULT NULL,
  `pag_icon` varchar(255) DEFAULT NULL,
  `pag_order` int DEFAULT NULL,
  `pag_name` varchar(255) DEFAULT NULL,
  `pag_type` int DEFAULT NULL COMMENT '1 PADRE,  2 HIJO',
  PRIMARY KEY (`pag_id`) USING BTREE
);

CREATE TABLE `tbl_permissions` (
  `per_id` int NOT NULL AUTO_INCREMENT,
  `per_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `pag_id` int DEFAULT NULL,
  `per_order` int DEFAULT NULL,
  PRIMARY KEY (`per_id`) USING BTREE
);

ALTER TABLE `tbl_permissions`
ADD CONSTRAINT `tbl_permissions_pages` FOREIGN KEY (`pag_id`) REFERENCES `tbl_pages` (`pag_id`);

CREATE TABLE `tbl_page_permissions` (
  `pap_id` int NOT NULL AUTO_INCREMENT, 
  `pro_id` int DEFAULT NULL,
  `pag_id` int DEFAULT NULL,
  PRIMARY KEY (`pap_id`) USING BTREE
);

ALTER TABLE `tbl_page_permissions`
ADD CONSTRAINT `tbl_page_permissions_profiles` FOREIGN KEY (`pro_id`) REFERENCES `tbl_profiles` (`pro_id`),
ADD CONSTRAINT `tbl_page_permissions_pages` FOREIGN KEY (`pag_id`) REFERENCES `tbl_pages` (`pag_id`);

ALTER TABLE `tbl_page_permissions`
ADD UNIQUE INDEX `uq_page_permissions_pro_pag` (`pro_id`, `pag_id`) USING BTREE;

CREATE TABLE `tbl_profile_permissions` (
  `prp_id` int NOT NULL AUTO_INCREMENT,
  `per_id` int NOT NULL,
  `pro_id` int NOT NULL,
  PRIMARY KEY (`prp_id`) USING BTREE
);

ALTER TABLE `tbl_profile_permissions`
ADD CONSTRAINT `tbl_profile_permissions_permissions` FOREIGN KEY (`per_id`) REFERENCES `tbl_permissions` (`per_id`),
ADD CONSTRAINT `tbl_profile_permissions_profiles` FOREIGN KEY (`pro_id`) REFERENCES `tbl_profiles` (`pro_id`);

ALTER TABLE `tbl_profile_permissions`
ADD UNIQUE INDEX `uq_profile_permissions_per_pro` (`per_id`, `pro_id`) USING BTREE;

CREATE TABLE `tbl_user_permissions` (
  `usp_id` int NOT NULL AUTO_INCREMENT,
  `per_id` int NOT NULL,
  `use_id` int NOT NULL,
  PRIMARY KEY (`usp_id`) USING BTREE
);

ALTER TABLE `tbl_user_permissions`
ADD CONSTRAINT `tbl_user_permissions_permissions` FOREIGN KEY (`per_id`) REFERENCES `tbl_permissions` (`per_id`),
ADD CONSTRAINT `tbl_user_permissions_users` FOREIGN KEY (`use_id`) REFERENCES `tbl_users` (`use_id`);

ALTER TABLE `tbl_user_permissions`
ADD UNIQUE INDEX `uq_user_permissions_per_use` (`per_id`, `use_id`) USING BTREE;

CREATE TABLE `tbl_documents` (
  `doc_id` int NOT NULL AUTO_INCREMENT,
  `doc_type` ENUM('USERS','PROFILES','PAGINAS','PERMISOS') NOT NULL,
  `doc_id_ref` int NOT NULL COMMENT 'ID DE LA TABLA REFERENCIADA',
  `doc_name` varchar(255) DEFAULT NULL,
  `doc_path_storage` varchar(255) NOT NULL,
  `doc_url` varchar(255) NOT NULL,
  `doc_extension` varchar(10) NOT NULL,
  `doc_mime_type` varchar(100) NOT NULL,
  `doc_size` int NOT NULL,
  `doc_parent_id` int DEFAULT NULL,
  `sta_id` int DEFAULT 1,
  `doc_create_by` int DEFAULT NULL,
  `doc_create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `doc_update_by` int DEFAULT NULL,
  `doc_update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`doc_id`) USING BTREE
);

ALTER TABLE `tbl_documents`
ADD CONSTRAINT `tbl_documents_status` FOREIGN KEY (`sta_id`) REFERENCES `tbl_status` (`sta_id`);

CREATE TABLE `tbl_password_resets` (
  `par_id` int NOT NULL AUTO_INCREMENT,
  `use_id` int NOT NULL,
  `par_use_email` varchar(255) NOT NULL,
  `par_token` varchar(255) NOT NULL,
  `par_code_temp` int NOT NULL,
  `par_created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`par_id`) USING BTREE
);

ALTER TABLE `tbl_password_resets` 
ADD CONSTRAINT `tbl_password_resets_users` FOREIGN KEY (`use_id`) REFERENCES `tbl_users` (`use_id`);

-- ============================================
-- NOTIFICACIONES
-- ============================================
CREATE TABLE `tbl_notifications` (
  `not_id` int NOT NULL AUTO_INCREMENT,
  `use_id` int NOT NULL COMMENT 'FK a tbl_users',
  `not_priority` varchar(50) DEFAULT 'medium',
  `not_title` varchar(150) NOT NULL,
  `not_message` text NOT NULL,
  `not_type` varchar(50) DEFAULT 'info',
  `not_module` varchar(100) DEFAULT NULL,
  `not_action` varchar(100) DEFAULT NULL,
  `not_data` json DEFAULT NULL,
  `not_created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `not_is_read` tinyint(1) DEFAULT '0',
  `not_read_at` timestamp NULL DEFAULT NULL,
  `not_updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`not_id`) USING BTREE
);

ALTER TABLE `tbl_notifications`
ADD CONSTRAINT `tbl_notifications_users` FOREIGN KEY (`use_id`) REFERENCES `tbl_users` (`use_id`),
ADD INDEX `idx_noti_user` (`use_id`) USING BTREE;