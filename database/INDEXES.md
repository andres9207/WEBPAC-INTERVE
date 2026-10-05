# Inventario de índices

**Fecha:** 2026-10-05 · **Backlog:** FND-BD-15 · **Fuente:** BD de desarrollo (MySQL 8.0.45), después de la migración `0059`.

Qué índices tiene cada tabla, para qué existe cada uno y qué consulta del código lo usa. El criterio para agregar o quitar índices está en [`DATABASE_STANDARD`](../engineering/standards/DATABASE_STANDARD.md), "Criterio de indexación". Esta es una foto del esquema: cuando una migración agrega o quita índices, se actualiza la tabla afectada.

## Resumen

| Dato | Valor |
| --- | --- |
| Tablas | 34 (la tarea del backlog hablaba de 14: se escribió antes de los maestros y el CORE) |
| Índices | 185: 34 claves primarias, 50 `UNIQUE`, 101 no únicos |
| Claves foráneas | 111. **Todas tienen índice**: InnoDB lo exige |
| Índices de FK creados por MySQL (no declarados en una migración) | 82: 55 de autoría (`*_create_by`, `*_update_by`, `*_delete_by`), 9 de estado (`sta_id`) y 18 de relaciones de negocio |
| Índices redundantes (prefijo de otro) | 0 |

## Hallazgos

### Índices que faltan

| Tabla | Consulta | Plan hoy | Propuesta |
| --- | --- | --- | --- |
| `tbl_documents` | Listado de una carpeta: `doc_type = ? AND doc_id_ref = ? AND doc_parent_id = ?` (`paginationModuleDocs`), y conteo de hijos por carpeta (`doc_parent_id IN (…)`) | Recorre toda la tabla (`ALL`) y ordena aparte | `idx_documents_parent_owner (doc_parent_id, doc_type, doc_id_ref)`: sirve las dos consultas. Prioridad baja mientras el componente de documentos siga deshabilitado en el cliente |
| `tbl_notifications` | Lista del usuario: `use_id = ? ORDER BY not_created_at DESC` | Usa `idx_noti_user` y ordena aparte (`filesort`) | `idx_notifications_user_created (use_id, not_created_at)`, que reemplaza a `idx_noti_user` como índice de la FK. Las notificaciones se acumulan por usuario: es la tabla que más crece sin tope |
| `tbl_audit_log` | Historial de un registro: `aud_entity = ? AND aud_record_id = ? ORDER BY aud_create_at` | Usa `ix_audit_log_entity_record` y ordena aparte | Agregar `aud_create_at` al final de ese índice **cuando exista la consulta de la bitácora** (ADR-0013, B15). Hoy ningún endpoint la lee |

Las tres son propuestas: ninguna migración se aplicó.

### Índices sin uso

`sys.schema_unused_indexes` reporta 76 índices sin uso en desarrollo. **No sirve para decidir retiros**: cuenta desde el último reinicio de MySQL, con tráfico de pruebas y tablas casi vacías. De esos 76, todos menos dos sostienen una FK o una unicidad y no se pueden quitar sin quitar la restricción. Los dos que quedan:

| Índice | Por qué figura sin uso | Decisión |
| --- | --- | --- |
| `idx_contracts_state` | `tbl_contracts` está vacía en desarrollo | **Se conserva.** La pestaña por estado del listado de contratos lo usa (`EXPLAIN` abajo) |
| `ix_audit_log_operation_id` | Ningún código consulta la bitácora por `aud_operation_id`: solo se escribe | **Candidato a retiro.** Se conserva hasta la pantalla de consulta de la bitácora (ADR-0013, B15). Si esa pantalla no agrupa por acto, se retira en la misma migración |

### Índices de FK creados por MySQL

Las migraciones declaran la FK y dejan que MySQL cree el índice con el nombre de la FK. Solo `tbl_users_identity_documents` lo declara. El resultado es el mismo en cualquier instalación, y `schema.prisma` los muestra (`@@index(…, map: "tbl_…")`), pero contradice la regla 9 de `DATABASE_STANDARD` tal como estaba ("se declara con nombre explícito"). El criterio nuevo acepta el índice implícito para las columnas que ninguna consulta usa (autoría, y estado cuando no hay un compuesto que lo sirva) y exige declararlo solo cuando una consulta lo necesita, con las columnas que esa consulta pide. Los 82 existentes no se migran: declararlos no cambia nada en la BD.

## Planes de ejecución

`EXPLAIN` de las consultas reales en la BD de desarrollo, el 2026-10-05. Cada celda: `type/key/Extra`. Con tablas casi vacías el optimizador puede cambiar de plan al crecer los datos; lo que se verifica aquí es que exista un índice que la consulta pueda usar.

| Consulta | Plan |
| --- | --- |
| Documentos: listado de una carpeta | `ALL/-/Using where; Using filesort` |
| Documentos: hijos por carpeta | `ALL/-/Using where; Using temporary` |
| Notificaciones: lista del usuario | `ref/idx_noti_user/Using filesort` |
| Notificaciones: no leídas | `ref/idx_noti_user/Using where` |
| Contratos de una obra | `ref/uq_contracts_work_number_active/Using where; Using filesort` |
| Contratos por estado (pestaña) | `ref/idx_contracts_state/Using where; Using filesort` |
| Conteo de contratos por estado | `range/tbl_contracts_status/Using index condition; Using temporary` |
| Obras de un proveedor | `ref/tbl_work_providers_provider/Using where` |
| Conceptos de un contrato | `ref/uq_contract_concepts_number/Using where` |
| Historial de estado de un contrato | `ref/idx_contract_status_history_contract/Backward index scan; Using index` |
| Bitácora de un registro | `ref/ix_audit_log_entity_record/Using filesort` |
| Obras de una constructora (bloqueo de eliminación) | `ref/tbl_works_construction_company/Using index` |
| Usuarios de un perfil | `ref/tbl_users_profiles/Using where` |
| Sesión por hash de refresh anterior | `ref/ix_sessions_prev_refresh_hash/Using where; Using index` |

El `filesort` de los listados de contratos (orden por fecha de modificación) se acepta: el tope de 100 filas por página ([DEC-013](../engineering/decisiones/DEC-013-paginacion.md)) y los pocos contratos por obra no justifican otro índice.

## Cómo regenerar el inventario

```sql
-- Índices con sus columnas
SELECT table_name, index_name, non_unique, GROUP_CONCAT(column_name ORDER BY seq_in_index) AS columns
FROM information_schema.statistics
WHERE table_schema = DATABASE()
GROUP BY table_name, index_name, non_unique
ORDER BY table_name, index_name;

-- Índices de FK creados por MySQL: los que tienen el nombre de la FK
SELECT k.table_name, k.constraint_name
FROM information_schema.table_constraints k
JOIN information_schema.statistics s
  ON s.table_schema = k.table_schema AND s.table_name = k.table_name AND s.index_name = k.constraint_name
WHERE k.table_schema = DATABASE() AND k.constraint_type = 'FOREIGN KEY'
GROUP BY k.table_name, k.constraint_name;

-- Sin uso desde el último arranque (solo con datos de producción)
SELECT object_name, index_name FROM sys.schema_unused_indexes WHERE object_schema = DATABASE();
```

## Inventario por tabla

Se omite la clave primaria, que tiene toda tabla. Los índices de las FK de autoría se agrupan en una fila por tabla. `tbl_login_attempts` y `tbl_pages` solo tienen la clave primaria.

### `tbl_address_types` (5 filas)

| Índice | Columnas | Tipo | Para qué |
| --- | --- | --- | --- |
| `idx_address_types_status_name` | sta_id, adt_name | Índice | Selector y listado por estado y nombre (DEC-025). Sostiene la FK de estado |
| `uq_address_types_idempotency_key` | adt_idempotency_key | UNIQUE | Idempotencia (DEC-016) |
| `uq_address_types_name_active` | adt_name_active | UNIQUE | Unicidad del dominio (mensaje en `uniqueConstraints.constants.js`) |
| (autoría) | create, delete, update | FK implícito × 3 | Sostienen las FK de autoría a `tbl_users`. Ninguna consulta los usa |

### `tbl_audit_log` (49 filas)

| Índice | Columnas | Tipo | Para qué |
| --- | --- | --- | --- |
| `ix_audit_log_create_at` | aud_create_at | Índice | Consulta de la bitácora por fecha y retención (ADR-0013). Sin consulta todavía |
| `ix_audit_log_entity_record` | aud_entity, aud_record_id | Índice | Historial de un registro (`aud_entity`, `aud_record_id`). Ordena por fecha aparte (`filesort`) |
| `ix_audit_log_operation_id` | aud_operation_id | Índice | Agrupar los cambios de un mismo acto. **Sin consulta en el código**: solo se escribe. Candidato a retiro (ver abajo) |
| `ix_audit_log_use_id` | use_id | Índice | Sostiene la FK al autor; consulta de bitácora por usuario (ADR-0013) |

### `tbl_construction_companies` (10 filas)

| Índice | Columnas | Tipo | Para qué |
| --- | --- | --- | --- |
| `idx_construction_companies_status_description` | sta_id, cnc_description | Índice | Selector y listado por estado y nombre (DEC-025). Sostiene la FK de estado |
| `uq_construction_companies_description_active` | cnc_description_active | UNIQUE | Unicidad del dominio (mensaje en `uniqueConstraints.constants.js`) |
| `uq_construction_companies_idempotency_key` | cnc_idempotency_key | UNIQUE | Idempotencia (DEC-016) |
| (autoría) | create, delete, update | FK implícito × 3 | Sostienen las FK de autoría a `tbl_users`. Ninguna consulta los usa |

### `tbl_contract_concepts` (0 filas)

| Índice | Columnas | Tipo | Para qué |
| --- | --- | --- | --- |
| `tbl_contract_concepts_status` | sta_id | FK implícito | Sostiene la FK de estado. El listado (`sta_id <> 3`) es un rango y casi no lo aprovecha |
| `uq_contract_concepts_idempotency_key` | ccp_idempotency_key | UNIQUE | Idempotencia (DEC-016) |
| `uq_contract_concepts_initial` | ccp_initial_key | UNIQUE | Unicidad del dominio (mensaje en `uniqueConstraints.constants.js`) |
| `uq_contract_concepts_liquidation` | ccp_liquidation_key | UNIQUE | Unicidad del dominio (mensaje en `uniqueConstraints.constants.js`) |
| `uq_contract_concepts_number` | ctr_id, ccp_number | UNIQUE | Número de otrosí único; su prefijo sirve los conceptos de un contrato |
| (autoría) | create, update | FK implícito × 2 | Sostienen las FK de autoría a `tbl_users`. Ninguna consulta los usa |

### `tbl_contract_fields` (9 filas)

| Índice | Columnas | Tipo | Para qué |
| --- | --- | --- | --- |
| `uq_contract_fields_key` | cfd_key | UNIQUE | Clave del catálogo cerrado de campos (interno, DEC-037) |

### `tbl_contract_status_history` (0 filas)

| Índice | Columnas | Tipo | Para qué |
| --- | --- | --- | --- |
| `idx_contract_status_history_contract` | ctr_id, csh_create_at | Índice | Historial de estado del contrato, ya ordenado por fecha. Sostiene la FK |
| `uq_contract_status_history_idempotency_key` | csh_idempotency_key | UNIQUE | Idempotencia (DEC-016) |
| (autoría) | create | FK implícito × 1 | Sostienen las FK de autoría a `tbl_users`. Ninguna consulta los usa |

### `tbl_contract_type_field_versions` (9 filas)

| Índice | Columnas | Tipo | Para qué |
| --- | --- | --- | --- |
| `idx_contract_type_field_versions_field` | cfd_id | Índice | Sostiene la FK al campo del catálogo |
| `uq_contract_type_field_versions` | ctt_id, cfv_version, cfd_id | UNIQUE | Una fila por campo en cada versión (interno); su prefijo sirve el historial de versiones del tipo y sostiene su FK |
| (autoría) | create | FK implícito × 1 | Sostienen las FK de autoría a `tbl_users`. Ninguna consulta los usa |

### `tbl_contract_type_fields` (9 filas)

| Índice | Columnas | Tipo | Para qué |
| --- | --- | --- | --- |
| `idx_contract_type_fields_field` | cfd_id | Índice | Sostiene la FK al campo del catálogo |
| `uq_contract_type_fields_type_field` | ctt_id, cfd_id | UNIQUE | Sin pares repetidos; su prefijo sirve la consulta por el padre y sostiene su FK |
| (autoría) | create, update | FK implícito × 2 | Sostienen las FK de autoría a `tbl_users`. Ninguna consulta los usa |

### `tbl_contract_types` (1 fila)

| Índice | Columnas | Tipo | Para qué |
| --- | --- | --- | --- |
| `idx_contract_types_status_name` | sta_id, ctt_name | Índice | Selector y listado por estado y nombre (DEC-025). Sostiene la FK de estado |
| `uq_contract_types_idempotency_key` | ctt_idempotency_key | UNIQUE | Idempotencia (DEC-016) |
| `uq_contract_types_name_active` | ctt_name_active | UNIQUE | Unicidad del dominio (mensaje en `uniqueConstraints.constants.js`) |
| (autoría) | create, delete, update | FK implícito × 3 | Sostienen las FK de autoría a `tbl_users`. Ninguna consulta los usa |

### `tbl_contracts` (0 filas)

| Índice | Columnas | Tipo | Para qué |
| --- | --- | --- | --- |
| `idx_contracts_state` | ctr_state | Índice | Pestaña por estado del listado de contratos (`ctr_state = ?`). Elegido por el optimizador |
| `tbl_contracts_contract_type` | ctt_id | FK implícito | Bloqueo de eliminación del tipo de contrato |
| `tbl_contracts_provider` | prv_id | FK implícito | Sostiene la FK al proveedor |
| `tbl_contracts_status` | sta_id | FK implícito | Sostiene la FK de estado. El listado (`sta_id <> 3`) es un rango y casi no lo aprovecha |
| `tbl_contracts_work_provider` | wrk_id, prv_id | FK implícito | Sostiene la FK compuesta (obra, proveedor): proveedor asignado a la obra |
| `tbl_contracts_work_stage` | wks_id, wrk_id | FK implícito | Sostiene la FK compuesta (etapa, obra): etapa de la misma obra |
| `uq_contracts_idempotency_key` | ctr_idempotency_key | UNIQUE | Idempotencia (DEC-016) |
| `uq_contracts_work_number_active` | wrk_id, ctr_number_active | UNIQUE | Número único en la obra; su prefijo sirve los contratos de una obra |
| (autoría) | create, delete, update | FK implícito × 3 | Sostienen las FK de autoría a `tbl_users`. Ninguna consulta los usa |

### `tbl_documents` (0 filas)

| Índice | Columnas | Tipo | Para qué |
| --- | --- | --- | --- |
| `tbl_documents_status` | sta_id | FK implícito | Sostiene la FK de estado. El listado (`sta_id <> 3`) es un rango y casi no lo aprovecha |
| `uq_documents_idempotency_key` | doc_idempotency_key | UNIQUE | Idempotencia (DEC-016) |
| (autoría) | create, delete, update | FK implícito × 3 | Sostienen las FK de autoría a `tbl_users`. Ninguna consulta los usa |

### `tbl_identity_documents` (6 filas)

| Índice | Columnas | Tipo | Para qué |
| --- | --- | --- | --- |
| `idx_identity_documents_status_name` | sta_id, idd_name | Índice | Selector y listado por estado y nombre (DEC-025). Sostiene la FK de estado |
| `uq_identity_documents_code_active` | idd_code_active | UNIQUE | Unicidad del dominio (mensaje en `uniqueConstraints.constants.js`) |
| `uq_identity_documents_idempotency_key` | idd_idempotency_key | UNIQUE | Idempotencia (DEC-016) |
| `uq_identity_documents_name_active` | idd_name_active | UNIQUE | Unicidad del dominio (mensaje en `uniqueConstraints.constants.js`) |
| (autoría) | create, delete, update | FK implícito × 3 | Sostienen las FK de autoría a `tbl_users`. Ninguna consulta los usa |

### `tbl_insurers` (9 filas)

| Índice | Columnas | Tipo | Para qué |
| --- | --- | --- | --- |
| `idx_insurers_status_description` | sta_id, ins_description | Índice | Selector y listado por estado y nombre (DEC-025). Sostiene la FK de estado |
| `uq_insurers_description_active` | ins_description_active | UNIQUE | Unicidad del dominio (mensaje en `uniqueConstraints.constants.js`) |
| `uq_insurers_idempotency_key` | ins_idempotency_key | UNIQUE | Idempotencia (DEC-016) |
| (autoría) | create, delete, update | FK implícito × 3 | Sostienen las FK de autoría a `tbl_users`. Ninguna consulta los usa |


### `tbl_notifications` (0 filas)

| Índice | Columnas | Tipo | Para qué |
| --- | --- | --- | --- |
| `idx_noti_user` | use_id | Índice | Lista y no leídas del usuario. Sostiene la FK. Ordena por fecha aparte (`filesort`) |

### `tbl_page_permissions` (18 filas)

| Índice | Columnas | Tipo | Para qué |
| --- | --- | --- | --- |
| `tbl_page_permissions_pages` | pag_id | FK implícito | Sostiene la FK a la página |
| `uq_page_permissions_pro_pag` | pro_id, pag_id | UNIQUE | Sin pares repetidos; su prefijo sirve la consulta por el padre y sostiene su FK |


### `tbl_password_resets` (0 filas)

| Índice | Columnas | Tipo | Para qué |
| --- | --- | --- | --- |
| `uq_password_resets_use_id` | use_id | UNIQUE | Sesión única y búsqueda por clave o hash (interno) |
| (autoría) | create, update | FK implícito × 2 | Sostienen las FK de autoría a `tbl_users`. Ninguna consulta los usa |

### `tbl_permissions` (67 filas)

| Índice | Columnas | Tipo | Para qué |
| --- | --- | --- | --- |
| `tbl_permissions_pages` | pag_id | FK implícito | Permisos de una página (catálogo) |

### `tbl_profile_permissions` (96 filas)

| Índice | Columnas | Tipo | Para qué |
| --- | --- | --- | --- |
| `tbl_profile_permissions_profiles` | pro_id | FK implícito | Permisos de un perfil |
| `uq_profile_permissions_per_pro` | per_id, pro_id | UNIQUE | Sin pares repetidos; su prefijo sirve la consulta por el padre y sostiene su FK |

### `tbl_profiles` (3 filas)

| Índice | Columnas | Tipo | Para qué |
| --- | --- | --- | --- |
| `tbl_profiles_status` | sta_id | FK implícito | Sostiene la FK de estado. El listado (`sta_id <> 3`) es un rango y casi no lo aprovecha |
| `uq_profiles_idempotency_key` | pro_idempotency_key | UNIQUE | Idempotencia (DEC-016) |
| `uq_profiles_pro_name` | pro_name | UNIQUE | Unicidad del dominio (mensaje en `uniqueConstraints.constants.js`) |
| (autoría) | create, delete, update | FK implícito × 3 | Sostienen las FK de autoría a `tbl_users`. Ninguna consulta los usa |

### `tbl_provider_contacts` (0 filas)

| Índice | Columnas | Tipo | Para qué |
| --- | --- | --- | --- |
| `tbl_provider_contacts_address_type` | adt_id | FK implícito | Bloqueo de eliminación del tipo de dirección |
| `tbl_provider_contacts_provider` | prv_id | FK implícito | Contactos de un proveedor |
| `uq_provider_contacts_main` | prc_main_provider | UNIQUE | Unicidad del dominio (mensaje en `uniqueConstraints.constants.js`) |
| (autoría) | create, update | FK implícito × 2 | Sostienen las FK de autoría a `tbl_users`. Ninguna consulta los usa |

### `tbl_provider_types` (3 filas)

| Índice | Columnas | Tipo | Para qué |
| --- | --- | --- | --- |
| `idx_provider_types_status_name` | sta_id, pvt_name | Índice | Selector y listado por estado y nombre (DEC-025). Sostiene la FK de estado |
| `uq_provider_types_idempotency_key` | pvt_idempotency_key | UNIQUE | Idempotencia (DEC-016) |
| `uq_provider_types_name_active` | pvt_name_active | UNIQUE | Unicidad del dominio (mensaje en `uniqueConstraints.constants.js`) |
| (autoría) | create, delete, update | FK implícito × 3 | Sostienen las FK de autoría a `tbl_users`. Ninguna consulta los usa |

### `tbl_providers` (0 filas)

| Índice | Columnas | Tipo | Para qué |
| --- | --- | --- | --- |
| `idx_providers_status_name` | sta_id, prv_name | Índice | Selector y listado por estado y nombre (DEC-025). Sostiene la FK de estado |
| `tbl_providers_provider_type` | pvt_id | FK implícito | Bloqueo de eliminación del tipo de proveedor |
| `uq_providers_idempotency_key` | prv_idempotency_key | UNIQUE | Idempotencia (DEC-016) |
| `uq_providers_identity_active` | idd_id, prv_identification_active | UNIQUE | Unicidad del dominio (mensaje en `uniqueConstraints.constants.js`) |
| (autoría) | create, delete, update | FK implícito × 3 | Sostienen las FK de autoría a `tbl_users`. Ninguna consulta los usa |

### `tbl_sessions` (1 fila)

| Índice | Columnas | Tipo | Para qué |
| --- | --- | --- | --- |
| `ix_sessions_prev_refresh_hash` | ses_prev_refresh_hash | Índice | Detección de reúso del refresh anterior (`session.service.js`) |
| `uq_sessions_refresh_hash` | ses_refresh_hash | UNIQUE | Sesión única y búsqueda por clave o hash (interno) |
| `uq_sessions_ses_key` | ses_key | UNIQUE | Sesión única y búsqueda por clave o hash (interno) |
| `uq_sessions_use_id` | use_id | UNIQUE | Sesión única y búsqueda por clave o hash (interno) |

### `tbl_status` (3 filas)

| Índice | Columnas | Tipo | Para qué |
| --- | --- | --- | --- |
| `uq_status_key` | sta_key | UNIQUE | Clave simbólica del estado (interno, DEC-038) |

### `tbl_supervision_types` (4 filas)

| Índice | Columnas | Tipo | Para qué |
| --- | --- | --- | --- |
| `idx_supervision_types_status_name` | sta_id, spt_name | Índice | Selector y listado por estado y nombre (DEC-025). Sostiene la FK de estado |
| `uq_supervision_types_idempotency_key` | spt_idempotency_key | UNIQUE | Idempotencia (DEC-016) |
| `uq_supervision_types_name_active` | spt_name_active | UNIQUE | Unicidad del dominio (mensaje en `uniqueConstraints.constants.js`) |
| (autoría) | create, delete, update | FK implícito × 3 | Sostienen las FK de autoría a `tbl_users`. Ninguna consulta los usa |

### `tbl_user_pages` (0 filas)

| Índice | Columnas | Tipo | Para qué |
| --- | --- | --- | --- |
| `tbl_user_pages_pages` | pag_id | FK implícito | Sostiene la FK a la página |
| `uq_user_pages_use_pag` | use_id, pag_id | UNIQUE | Sin pares repetidos; su prefijo sirve la consulta por el padre y sostiene su FK |

### `tbl_user_permissions` (12 filas)

| Índice | Columnas | Tipo | Para qué |
| --- | --- | --- | --- |
| `tbl_user_permissions_users` | use_id | FK implícito | Excepciones de permisos de un usuario |
| `uq_user_permissions_per_use` | per_id, use_id | UNIQUE | Sin pares repetidos; su prefijo sirve la consulta por el padre y sostiene su FK |

### `tbl_users` (2 filas)

| Índice | Columnas | Tipo | Para qué |
| --- | --- | --- | --- |
| `tbl_users_identity_documents` | idd_id | Índice de FK declarado | Bloqueo de eliminación del tipo de identificación (`dependents`). Único índice de FK declarado en una migración |
| `tbl_users_profiles` | pro_id | FK implícito | Usuarios de un perfil (eliminar perfil, listado por perfil) |
| `tbl_users_status` | sta_id | FK implícito | Sostiene la FK de estado. El listado (`sta_id <> 3`) es un rango y casi no lo aprovecha |
| `uq_users_idempotency_key` | use_idempotency_key | UNIQUE | Idempotencia (DEC-016) |
| `use_email` | use_email | UNIQUE | Unicidad del dominio (mensaje en `uniqueConstraints.constants.js`) |
| `use_user` | use_user | UNIQUE | Unicidad del dominio (mensaje en `uniqueConstraints.constants.js`) |
| (autoría) | create, delete, update | FK implícito × 3 | Sostienen las FK de autoría a `tbl_users`. Ninguna consulta los usa |

### `tbl_work_managers` (0 filas)

| Índice | Columnas | Tipo | Para qué |
| --- | --- | --- | --- |
| `tbl_work_managers_status` | sta_id | FK implícito | Sostiene la FK de estado. El listado (`sta_id <> 3`) es un rango y casi no lo aprovecha |
| `tbl_work_managers_user` | use_id | FK implícito | Sostiene la FK al usuario responsable |
| `uq_work_managers_work_user` | wrk_id, use_id | UNIQUE | Sin pares repetidos; su prefijo sirve la consulta por el padre y sostiene su FK |
| (autoría) | create, update | FK implícito × 2 | Sostienen las FK de autoría a `tbl_users`. Ninguna consulta los usa |

### `tbl_work_providers` (0 filas)

| Índice | Columnas | Tipo | Para qué |
| --- | --- | --- | --- |
| `tbl_work_providers_provider` | prv_id | FK implícito | Pestaña Obras del proveedor |
| `tbl_work_providers_status` | sta_id | FK implícito | Sostiene la FK de estado. El listado (`sta_id <> 3`) es un rango y casi no lo aprovecha |
| `uq_work_providers_idempotency_key` | wkp_idempotency_key | UNIQUE | Idempotencia (DEC-016) |
| `uq_work_providers_work_provider` | wrk_id, prv_id | UNIQUE | Sin pares repetidos; su prefijo sirve la consulta por el padre y sostiene su FK |
| (autoría) | create, update | FK implícito × 2 | Sostienen las FK de autoría a `tbl_users`. Ninguna consulta los usa |

### `tbl_work_stages` (1 fila)

| Índice | Columnas | Tipo | Para qué |
| --- | --- | --- | --- |
| `tbl_work_stages_status` | sta_id | FK implícito | Sostiene la FK de estado. El listado (`sta_id <> 3`) es un rango y casi no lo aprovecha |
| `uq_work_stages_id_work` | wks_id, wrk_id | UNIQUE | Destino de la FK compuesta contrato → etapa de la obra |
| `uq_work_stages_work_name` | wrk_id, wks_name | UNIQUE | Unicidad del dominio (mensaje en `uniqueConstraints.constants.js`) |
| (autoría) | create, update | FK implícito × 2 | Sostienen las FK de autoría a `tbl_users`. Ninguna consulta los usa |

### `tbl_works` (1 fila)

| Índice | Columnas | Tipo | Para qué |
| --- | --- | --- | --- |
| `tbl_works_construction_company` | cnc_id | FK implícito | Bloqueo de eliminación de la constructora (`dependents`) |
| `tbl_works_contract_type` | ctt_id | FK implícito | Bloqueo de eliminación del tipo de contrato |
| `tbl_works_status` | sta_id | FK implícito | Sostiene la FK de estado. El listado (`sta_id <> 3`) es un rango y casi no lo aprovecha |
| `tbl_works_supervision_type` | spt_id | FK implícito | Bloqueo de eliminación del tipo de interventoría |
| `uq_works_code` | wrk_code | UNIQUE | Unicidad del dominio (mensaje en `uniqueConstraints.constants.js`) |
| `uq_works_idempotency_key` | wrk_idempotency_key | UNIQUE | Idempotencia (DEC-016) |
| (autoría) | create, delete, update | FK implícito × 3 | Sostienen las FK de autoría a `tbl_users`. Ninguna consulta los usa |
