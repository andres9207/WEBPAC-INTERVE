/**
 * Mensaje de cada índice UNIQUE cuando la BD rechaza un duplicado (P2002 /
 * ER_DUP_ENTRY). Los services verifican el duplicado antes de guardar; esto
 * cubre la carrera que llega a la BD y cualquier caso sin verificación.
 *
 * El mensaje nombra el dato en términos del usuario: nunca el índice, la
 * tabla ni el valor (MySQL incluye el valor en su texto). Un test cruza esta
 * tabla con los `UNIQUE` de `database/`: una migración que agrega uno no pasa
 * hasta que se declara aquí, con mensaje o como interno.
 */
export const UNIQUE_CONSTRAINT_MESSAGES = Object.freeze({
  // Seguridad
  uq_profiles_pro_name: "Ya existe un perfil con ese nombre.",
  use_user: "Ya existe un usuario con ese nombre de usuario.",
  use_email: "Ya existe un usuario con ese correo.",

  // Maestros (mismo texto que la verificación de master.service.js)
  uq_identity_documents_code_active: "Ya existe un tipo de identificación con ese código.",
  uq_identity_documents_name_active: "Ya existe un tipo de identificación con ese nombre.",
  uq_provider_types_name_active: "Ya existe un tipo de proveedor con ese nombre.",
  uq_address_types_name_active: "Ya existe un tipo de dirección con ese nombre.",
  uq_insurers_description_active: "Ya existe una aseguradora con esa descripción.",
  uq_supervision_types_name_active: "Ya existe un tipo de interventoría con ese nombre.",
  uq_construction_companies_description_active: "Ya existe una constructora con esa descripción.",
  uq_contract_types_name_active: "Ya existe un tipo de contrato con ese nombre.",
  uq_reasons_name_active: "Ya existe un motivo con ese nombre para ese acto.",
  uq_policy_types_key: "Ya existe un tipo de póliza con esa clave.",
  uq_policy_types_name_active: "Ya existe un tipo de póliza con ese nombre.",

  // Obras
  uq_works_code: "Ya existe una obra con ese código.",
  uq_work_stages_work_name: "Ya existe una etapa con ese nombre en esta obra.",
  uq_work_managers_work_user: "Ese usuario ya es responsable de esta obra.",

  // Proveedores
  uq_providers_identity_active: "Ya existe un proveedor con ese documento.",
  uq_provider_contacts_main: "El proveedor ya tiene un contacto principal.",
  uq_work_contacts_main: "La obra ya tiene un contacto principal.",
  uq_work_providers_work_provider: "El proveedor ya está asignado a esta obra.",

  // Contratos
  uq_contracts_work_number_active: "Ya existe un contrato con ese número en esta obra.",
  uq_contract_concepts_number: "Ya existe un otrosí con ese número en este contrato.",
  uq_contract_concepts_initial: "El contrato ya tiene su valor inicial.",
  uq_contract_concepts_liquidation: "El contrato ya tiene un otrosí de liquidación.",
  uq_contract_suspensions_open: "El contrato ya tiene una suspensión abierta.",
  uq_invoices_provider_number: "Ya existe una factura con ese número para el proveedor.",

  // Pólizas
  uq_policies_current: "La póliza cambió mientras la modificabas. Actualiza la vista e intenta de nuevo.",
});

/**
 * Índices que el usuario no maneja directamente: claves de idempotencia
 * (las resuelve idempotency.service.js), tablas puente, sesiones, catálogos
 * sembrados y apoyos de FK. Si uno salta, responde el mensaje genérico.
 */
export const INTERNAL_UNIQUE_CONSTRAINTS = Object.freeze([
  // Claves de idempotencia
  "uq_users_idempotency_key",
  "uq_profiles_idempotency_key",
  "uq_documents_idempotency_key",
  "uq_identity_documents_idempotency_key",
  "uq_provider_types_idempotency_key",
  "uq_address_types_idempotency_key",
  "uq_insurers_idempotency_key",
  "uq_supervision_types_idempotency_key",
  "uq_construction_companies_idempotency_key",
  "uq_contract_types_idempotency_key",
  "uq_works_idempotency_key",
  "uq_providers_idempotency_key",
  "uq_work_providers_idempotency_key",
  "uq_contracts_idempotency_key",
  "uq_contract_concepts_idempotency_key",
  "uq_contract_status_history_idempotency_key",
  "uq_reasons_idempotency_key",
  // Tablas puente de permisos y páginas
  "uq_page_permissions_pro_pag",
  "uq_profile_permissions_per_pro",
  "uq_user_permissions_per_use",
  "uq_user_pages_use_pag",
  // Sesiones y recuperación de contraseña
  "uq_sessions_use_id",
  "uq_sessions_ses_key",
  "uq_sessions_refresh_hash",
  "uq_password_resets_use_id",
  // Catálogos sembrados y configuración guardada por diferencial
  "uq_status_key",
  "uq_contract_fields_key",
  "uq_contract_type_fields_type_field",
  "uq_contract_type_field_versions",
  // Tipos de un proveedor (DEC-041): el service quita repetidos
  "uq_provider_classifications_provider_type",
  // Apoyo de la FK compuesta contrato → etapa de la obra
  "uq_work_stages_id_work",
  // Un otrosí levanta a lo sumo una suspensión; lo garantiza el service
  "uq_contract_suspensions_concept",
  "uq_contracts_id_work_provider",
  "uq_invoices_idempotency_key",
  "uq_invoice_status_history_idempotency_key",
  "uq_policy_types_idempotency_key",
  "uq_policies_idempotency_key",
  // Apoyo de la FK compuesta póliza → concepto del contrato (0079)
  "uq_contract_concepts_id_contract",
]);

/** Duplicado de un índice interno o desconocido. No remite a sistemas: suele ser una carrera. */
export const DUPLICATE_FALLBACK_MESSAGE = "El registro ya existe. Actualiza la vista e intenta de nuevo.";
