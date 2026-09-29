# Deuda técnica y pendientes

Lista única. Convenciones en [`README.md`](README.md). Estado verificado al 2026-09-29.

## Despliegue

| Pendiente | Prioridad | Origen |
| --- | --- | --- |
| Aplicar las migraciones `0011` a `0016` en orden. La `0014` vacía sesiones, códigos de recuperación e intentos de login: va junto con el despliegue, no antes ([DEC-009](../decisiones/DEC-009-zona-horaria.md)). La `0015` y la `0016` van **antes** del código que las usa: sin sus columnas, "olvidé mi contraseña" y crear registros fallan | Alta | `decisiones/README.md` |
| Restringir el usuario de BD de la aplicación a `INSERT`/`SELECT` sobre `tbl_audit_log`. Hoy ningún código la modifica, pero el usuario tiene privilegios para hacerlo ([DEC-007](../decisiones/DEC-007-bitacora-funcional.md), sugerencia en `0013_create_audit_log.sql`) | Alta | `SECURITY.md` |

## Funcionalidad abierta

| Pendiente | Prioridad | Origen |
| --- | --- | --- |
| Pantalla y endpoint para consultar la bitácora, con permiso propio (`per_id` 17) | Media | ADR-0013, B16 |
| Política de retención de la bitácora | Media | ADR-0013, B15 |
| Idempotencia en transiciones de estado: la infraestructura existe ([DEC-016](../decisiones/DEC-016-idempotencia-por-clave.md)); falta el historial de estado de cada agregado del CORE | Media | ADR-0027, B3 |
| `UNIQUE` en el nombre de perfil: dos creaciones simultáneas con el mismo nombre pueden pasar el control del service | Media | ADR-0027, B4 |
| MFA: no existe. Fuera del alcance de ADR-0001 (alternativa "proveedor de identidad externo", pendiente de validación) | Baja | ADR-0001 |
| Tests del cliente: no hay runner configurado | Media | `client/CLAUDE.md` |
| Linter del servidor: no hay | Baja | `server/CLAUDE.md` |

## Seguridad (hallazgos sin corregir)

| Pendiente | Prioridad | Origen |
| --- | --- | --- |
| `app.options('*', cors())` en `server/app.js` responde los preflight con la configuración por defecto de `cors` (cualquier origen) en vez de la allowlist de `cors.config.js`. Impacto bajo: las peticiones reales sí pasan por la allowlist y el navegador no acepta `*` con credenciales. Es inconsistente | Media | Revisión de ADR-0001 |
| `getStatusesByScope` (`app/general/app.service.js`) filtra por `sta_key`, columna que no existe en `tbl_status`. Si alguien envía `excludesKeys`, Prisma lanza. Hoy ningún caller lo envía | Media | Revisión de ADR-0001 |
| `client/src/api/requests/permissionsApi.js` exporta `getPermissionsUserAPI`, que apunta a una ruta inexistente (`security/permissions/get_permissions_user`) y no tiene caller. `GET /app/get_permissions_user` (la ruta real) tampoco tiene caller en el cliente: confirmar si sigue haciendo falta | Baja | Auditoría de rutas |

## Deriva entre código y estándares

| Pendiente | Prioridad | Origen |
| --- | --- | --- |
| `deleteProfile` responde **400** al eliminar un perfil ya eliminado; [DEC-006](../decisiones/DEC-006-columnas-autoria-eliminacion.md) exige **404**, y `deleteUser` ya lo cumple | Media | Descubrimiento de `engineering/` |
| Duplicado por nombre: `saveProfile`/`saveUser` responden 400; el mismo duplicado detectado por la BD responde 409. Pendiente de decisión (PD-02 en [`PROJECT_STATE`](../PROJECT_STATE.md)) | Media | Descubrimiento de `engineering/` |
| `GET /app/get_profiles` devuelve una lista sin paginar para combos, contra la letra de [DEC-013](../decisiones/DEC-013-paginacion.md). Pendiente de decisión (PD-01) | Media | Descubrimiento de `engineering/` |
| Nombres de los archivos de API del cliente mezclados: `authAPI.js`, `documentsAPI.js` frente a `usersApi.js`, `profilesApi.js`, `appApi.js`, `permissionsApi.js`, `notificationsApi.js`. `client/CLAUDE.md` dice `<dominio>API.js` | Baja | Descubrimiento de `engineering/` |
| `ProfileDialog.jsx` y otros diálogos hacen `console.error` en la carga de datos auxiliares sin avisar al usuario (`getModules`) | Baja | Descubrimiento de `engineering/` |
| `AUDIT_ENTITIES` solo tiene `USUARIO` y `PERFIL`: los documentos son auditoría técnica sin bitácora, a propósito (`server/CLAUDE.md`). Revisar al crear el primer módulo de negocio | Baja | ADR-0013 |

## Documentación

| Pendiente | Prioridad | Origen |
| --- | --- | --- |
| `docs/prompt_adr_informes.md` está cortado en la §5, con un bloque de código sin cerrar y una instrucción de chat pegada que apunta a `database/bdintervewebpack.sql` (no existe). Pide numerar desde `0001`, que choca con los ADR existentes | Media | Descubrimiento |
| `docs/prompt_adr_core.md`: bloque de código sin cerrar en la §9 (línea 281) | Baja | Descubrimiento |
| `docs/ai-module-generation-reference-csur.md` y `docs/specs/modules/_TEMPLATE-maestro.md` son de otro proyecto (CSUR). Decidir si se borran, se mueven a una carpeta de referencias externas o se reescriben para este proyecto | Media | Descubrimiento |
| Los ADR citan `database/bdintervewebpack.sql` como fuente; no está en el repositorio | Baja | Descubrimiento |
| `adr/README.md` (sección 2) todavía menciona una "integración con Microsoft Graph", que se eliminó del código. El `CLAUDE.md` raíz también la mencionaba (corregido) | Baja | Descubrimiento |
| La cabecera de `database/migrations/0001_seed_pages_permissions.sql` dice que los ids coinciden con `permissionsConfig.js`, que ya no existe. Es una migración aplicada: no se edita, pero conviene saberlo | Baja | Descubrimiento |
| Las decisiones de negocio del backlog se llaman `DEC-01`… y chocan con las fichas `DEC-001`… (PD-03) | Baja | Descubrimiento |

## Limpieza

| Pendiente | Prioridad | Origen |
| --- | --- | --- |
| Retirar `DB_HOST`/`DB_USER`/`DB_NAME`/`DB_PASSWORD` de `server/.env.template` y la dependencia `mysql2` de `server/package.json`. Ya no los usa nada (hay cambios sin confirmar en `.env.template`) | Baja | `decisiones/README.md` |
| `server/process.env.NODE_ENV`: archivo suelto en la raíz del servidor, sin uso aparente | Baja | Descubrimiento |
| `server/logs/*.log` está versionado y cambia en cada ejecución | Baja | Descubrimiento |
| `server/src/common/templates/` (plantillas de correo del boilerplate, sin caller), `src/images/` (logos sin uso), `src/socket/`, `src/utils/`, `src/webhooks/` (vacías) | Baja | `server/CLAUDE.md` |
| El `.gitignore` de la raíz quedó vacío: solo excluía la documentación de trabajo, que ahora se versiona. Decidir si se borra o se le agrega lo que corresponda (p. ej. `server/logs/`) | Baja | Reorganización de `engineering/` |
