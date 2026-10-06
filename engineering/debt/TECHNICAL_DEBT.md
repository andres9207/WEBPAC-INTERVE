# Deuda técnica y pendientes

Lista única. Convenciones en [`README.md`](README.md). Estado verificado al 2026-09-29.

## Despliegue

| Pendiente | Prioridad | Origen |
| --- | --- | --- |
| Aplicar las migraciones `0011` a `0016` en orden. La `0014` vacía sesiones, códigos de recuperación e intentos de login: va junto con el despliegue, no antes ([DEC-009](../decisiones/DEC-009-zona-horaria.md)). La `0015` y la `0016` van **antes** del código que las usa: sin sus columnas, "olvidé mi contraseña" y crear registros fallan | Alta | `decisiones/README.md` |
| Aplicar la migración `0021` (permiso `changeStatus` del tipo de identificación) junto con el patrón de maestro: sin ella, nadie puede activar ni desactivar tipos, porque `save_identity_document` ya no cambia el estado | Alta | DEC-020 |
| Aplicar las migraciones `0017` a `0020` **junto con** el código de tipos de identificación, y después `yarn db:seed`. La `0019` agrega un `CHECK` a `tbl_users`: antes, verificar que ningún usuario tenga número sin tipo (la consulta está en el encabezado de la migración). Con la `0019` aplicada, el código viejo de `saveUser` falla al guardar un usuario con número de documento | Alta | ADR-0008 |
| Aplicar las migraciones `0022` a `0024` (maestro de tipos de proveedor) junto con su código, y después `yarn db:seed` | Alta | ADR-0010 |
| Aplicar las migraciones `0025` a `0027` (maestro de tipos de dirección) junto con su código, y después `yarn db:seed` | Alta | ADR-0009 |
| Aplicar las migraciones `0028` y `0029` (maestro de aseguradoras) junto con su código, y después `yarn db:seed` | Alta | ADR-0003 |
| Aplicar las migraciones `0030` a `0032` (maestro de tipos de interventoría) junto con su código, y después `yarn db:seed` | Alta | ADR-0007 |
| Aplicar las migraciones `0033` y `0034` (maestro de constructoras) junto con su código, y después `yarn db:seed` | Alta | ADR-0004 |
| Aplicar la migración `0035` (índice estado + nombre en los maestros). Después, `SHOW INDEX` en cada maestro: si queda un índice simple `tbl_<maestro>_status`, es redundante y se quita a mano (DEC-025) | Media | MAE-BD-12 |
| Aplicar las migraciones `0044` a `0047` (proveedores, contactos de proveedor, asignación proveedor-obra, menú y permisos 60 a 67) junto con su código, y después `yarn db:seed`. Requieren `0038` (obras). En desarrollo ya están aplicadas y sembradas (2026-10-01) | Alta | ADR-0012, DEC-031 |
| Aplicar las migraciones `0048` a `0052` (índice de etapas, contratos, conceptos, historial de estado, menú y permisos 68 a 74) junto con su código, y después `yarn db:seed`. Requieren `0046` (asignación proveedor-obra). Después de la `0049`, una etapa o una asignación proveedor-obra con contratos ya no se pueden borrar (FK compuestas): el código nuevo de obras y proveedores da el mensaje 409. En desarrollo ya están aplicadas y sembradas (2026-10-02) | Alta | ADR-0015, DEC-035 |
| Aplicar las migraciones `0053` a `0057` (catálogo de campos configurables, configuración por tipo de contrato, historial de versiones, etapa opcional en contratos, configuración inicial de los tipos existentes y permiso 75) junto con su código, y después `yarn db:seed`. La `0057` da a cada tipo existente todos los campos aplicables y visibles, con la etapa obligatoria; un tipo creado después nace sin configuración y su formulario solo trae los datos fijos. En desarrollo ya están aplicadas y sembradas (2026-10-02) | Alta | ADR-0006, DEC-037 |
| Aplicar la migración `0058` (clave simbólica de `tbl_status`) **antes** de desplegar su código, y después `yarn db:seed`. El servidor nuevo verifica el catálogo al arrancar y no arranca si falta la clave. En desarrollo ya está aplicada (2026-10-02) | Alta | DEC-038 |
| Aplicar las migraciones `0060` a `0062` (maestro de motivos, suspensiones de contrato, página y permisos 76 a 82) **antes** de desplegar su código, y después `yarn db:seed`. Sin `0061`, el detalle de un contrato falla (lee sus suspensiones) | Alta | DEC-039 |
| Aplicar las migraciones `0065` a `0069` (índice de contratos, facturas, historial de estado de la factura, ámbito de motivo `INVOICE_CANCEL`, menú "Facturación" y permisos 83 a 88) **antes** de desplegar su código, y después `yarn db:seed`. La `0069` reordena los grupos del menú. Después de la `0066`, el proveedor de un contrato con facturas, la asignación proveedor-obra y la etapa con facturas no se pueden cambiar ni borrar (FK compuestas): el código nuevo da el mensaje 409. En desarrollo ya están aplicadas y sembradas (2026-10-05) | Alta | DEC-042 |
| Restringir el usuario de BD de la aplicación a `INSERT`/`SELECT` sobre `tbl_audit_log`. Hoy ningún código la modifica, pero el usuario tiene privilegios para hacerlo ([DEC-007](../decisiones/DEC-007-bitacora-funcional.md), sugerencia en `0013_create_audit_log.sql`) | Alta | `SECURITY.md` |

## Funcionalidad abierta

| Pendiente | Prioridad | Origen |
| --- | --- | --- |
| Pantalla y endpoint para consultar la bitácora, con permiso propio (siguiente `per_id` libre: 89; del 17 al 21 son de tipos de identificación, del 22 al 26 de tipos de proveedor, del 27 al 31 de tipos de dirección, del 32 al 36 de aseguradoras, del 37 al 41 de tipos de interventoría, del 42 al 46 de constructoras, del 47 al 51 y el 75 de tipos de contrato, del 52 al 59 de obras, del 60 al 67 de proveedores, del 68 al 74, 76 y 77 de contratos, del 78 al 82 de motivos y del 83 al 88 de facturas) | Media | ADR-0013, B16 |
| Pólizas y aseguradora: al crear `tbl_policies` (ADR-0018), FK `RESTRICT` a `tbl_insurers` con índice, y agregarla a los `dependents` de `insurers.service.js` con label "póliza(s)". Decidir entonces si una póliza eliminada lógicamente también impide eliminar la aseguradora (ADR-0003 dice "al menos una póliza"); si sí, se declara con `countDeleted: true`. Hasta entonces una aseguradora se puede eliminar sin verificar uso | Alta | ADR-0003 |
| Contactos de obra: al crear su tabla (PRO-BD-04), FK `RESTRICT` al tipo de dirección y agregarla a los `dependents` de `addressTypes.service.js` con `countDeleted: true` (los contactos no tienen estado), como ya está la de proveedor. **Obligatorio:** es criterio de aceptación de la tarea. Reutilizar `ui-component/extended/ContactsEditor` y la estructura de `tbl_provider_contacts` | Alta | ADR-0009 |
| Proveedores: documentos del proveedor (ADR-0012, fase 6: ampliar `tbl_documents.doc_type`) y exportación (el permiso no se sembró: se define cuando exista) | Baja | ADR-0012 |
| Proveedores: revisar con el usuario la primera versión del patrón "Buscar o crear" (pestaña de proveedores de la obra) y registrarlo como aprobado en `DESIGN_SYSTEM` o ajustarlo | Media | DEC-031 |
| Contratos, fase B — suspensiones (PRO-BD-12, PRO-BE-19): crear `tbl_reasons` (maestro de motivos; no existe en el esquema), la tabla de suspensiones con `UNIQUE` de una sola abierta, las transiciones manuales suspender y levantar con permiso, motivo e `Idempotency-Key` (historial con `csh_idempotency_key`, columna `rea_id` en el historial), y acumular `ctr_suspended_days` al levantar. La fecha fin ya los suma | Alta | ADR-0017, DEC-035 |
| Contratos, fase B — conciliación de la fecha fin (PRO-BE-13): proceso programado que compare `ctr_end_date` con `contractEndDate` y reporte sin corregir. El cron existe pero sin trabajos y apagado en desarrollo (FND-BE-36) | Media | ADR-0015 |
| Contratos y facturación: ADR-0016 dice que la prórroga y la fecha de inicio de un concepto "pueden corregirse mientras no existan facturas". Hoy siguen editables después de una factura aprobada: solo se congelan costo y porcentajes (DOM-07). Confirmar con el área usuaria si también deben congelarse | Media | ADR-0016 |
| Facturación, fase B ([DEC-042](../decisiones/DEC-042-facturas-area-ciclo-vida.md)): tablas de detalle por tipo con sus importes (backlog DEC-02, DEC-03, DEC-07), factura de avance (DEC-01), saldos de anticipo y retenido con su revalidación al aprobar e instantánea en la bitácora (DEC-05, DEC-11, I1–I4), límite de las de liquidación (DEC-08, I5), hipótesis de subcontratista (DEC-09), evaluador C1–C8 y transición `IN_LIQUIDATION → LIQUIDATED` dentro de `approveInvoice` (DEC-15), y permisos por tipo de factura (DEC-19) | Alta | ADR-0017, ADR-0020 a ADR-0026 |
| Facturación: documentos de la factura (soportes) no existen; ampliar `tbl_documents.doc_type` o los adjuntos por entidad (PRO-FE-18) | Media | ADR-0020, B15 |
| Menú: un usuario con páginas propias (`tbl_user_pages`) ve solo esas, no las de su perfil (`getMenu`). Una página nueva que la semilla da al perfil no le aparece. Pasó con Facturación (páginas 18 y 19, agregadas a mano a los usuarios 1 y 10 en desarrollo el 2026-10-05). Decidir si el menú debe ser la unión perfil ∪ usuario, como los permisos, o si la semilla extiende las listas propias | Media | DEC-042 |
| Contratos y pólizas: la creación atómica no incluye pólizas (no existe `tbl_policies`, bloqueada por DEC-04). Agregarlas a `createContract` cuando existan | Alta | ADR-0015, ADR-0018 |
| Tipos de contrato: cambiar el tipo de un contrato existente no tiene permiso propio (ADR-0006, regla 11); hoy basta el de modificar contrato. No borra valores: los campos que dejan de aplicar quedan heredados | Media | ADR-0006, DEC-037 |
| Tipos de contrato: el detalle del contrato (pestañas Resumen y Valor) muestra todos los valores sin marcar los heredados; la marca solo está en el formulario y en el diálogo de otrosí | Baja | DEC-037 |
| Contratos: activar o desactivar el AIU en cada contrato (PRO-BD-23) no está; hoy el AIU se decide solo por la configuración del tipo (aplica o no cada porcentaje) | Media | ADR-0026, DEC-037 |
| Contratos: la composición del valor del concepto (IVA sobre la utilidad con AIU, sobre el costo directo sin AIU, redondeo por componente) es la propuesta de ADR-0026, pendiente de validación tributaria (backlog DEC-03). Si cambia, cambia solo `conceptAmounts` | Alta | DEC-036 |
| Contratos: anulación de otrosí (ADR-0016, B12) y fecha de vencimiento (backlog DEC-12) sin implementar hasta decidirse | Media | ADR-0015, ADR-0016 |
| Contratos y configuración de campos: una violación de `CHECK` que llegue a la BD (solo posible saltándose el service) responde 500 genérico (`P2039`); `error.middleware.js` no la traduce | Baja | DEC-035, DEC-037 |
| Contratos: el selector de obras del formulario trae hasta 100 obras activas, sin búsqueda remota (el endpoint ya acepta `search`) | Baja | DEC-035 |
| Obras: confirmar con el área usuaria el significado del valor máximo de orden de servicio (por orden o acumulado). La unidad del plazo ya se resolvió en DEC-030 | Alta | ADR-0011 |
| Obras: después de aplicar la migración `0042`, revisar las obras existentes: recibieron como fecha de inicio la de su creación y la unidad `MES` | Alta | DEC-030 |
| Obras: plazo ampliado y área ocultos en la interfaz; las columnas siguen en `tbl_works` y el formulario reenvía su valor. Decidir con el área usuaria si se eliminan (migración + service + ADR-0011) o vuelven a la pantalla | Media | DEC-030 |
| Obras: la página de detalle no tiene pestaña de historial porque no existe endpoint para consultar la bitácora (ver la pantalla de bitácora, arriba) | Baja | DEC-030 |
| Obras: las migas de pan del layout no reconocen las rutas de detalle y edición (`work/works/:id`); las páginas traen su propio enlace de vuelta | Baja | DEC-030 |
| Obras: un usuario responsable de una obra se puede desactivar o eliminar desde la pantalla de usuarios sin aviso; la obra lo conserva (inactivo) hasta que se edite. Decidir si eliminar un usuario responsable debe bloquearse | Media | ADR-0011, DEC-029 |
| Obras: el selector de responsables trae hasta 100 usuarios activos. Si hay más, falta búsqueda desde el formulario (el endpoint ya acepta `search`) | Baja | DEC-029 |
| Obras: permiso y funcionalidad de exportación (ADR-0011, "Autorización"). No se sembró porque no hay exportación | Baja | ADR-0011 |
| Tipo de proveedor en proveedores: columna `pvt_id` en `tbl_providers` (FK `RESTRICT` e índice), y agregar `tbl_providers` a los `dependents` de `providerTypes.service.js`. Hasta entonces un tipo se puede eliminar sin verificar uso, porque nada lo referencia (MAE-BD-11, DEC-023) | Alta | ADR-0010 |
| Tipo de identificación en proveedores: el selector y el bloqueo ya existen; agregar `tbl_providers` a los `dependents` de `identityDocuments.service.js` cuando exista (DOM-20, DOM-22) | Alta | ADR-0008, ADR-0012 |
| `UNIQUE` sobre (tipo, número) en usuarios: hoy el par solo se controla en el service (`checkIfUserExists`), fuera de la transacción. Dos creaciones simultáneas con el mismo documento pueden pasar | Media | ADR-0008 |
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
| `client/src/api/requests/permissionsApi.js` exporta `getPermissionsUserAPI`, que apunta a una ruta inexistente (`security/permissions/get_permissions_user`) y no tiene caller. `GET /app/get_permissions_user` (la ruta real) tampoco tiene caller en el cliente: confirmar si sigue haciendo falta | Baja | Auditoría de rutas |

## Deriva entre código y estándares

| Pendiente | Prioridad | Origen |
| --- | --- | --- |
| `error.middleware.js` no traduce `P2039` (violación de un `CHECK`): responde 500 genérico. Los services validan antes, así que solo llega por una carrera o un error de código; debería responder 400 con un mensaje por restricción, como los `UNIQUE` (FND-BE-32) | Baja | DEC-039 |
| `npx prisma db pull` reporta hoy casi todas las FK con `onDelete/onUpdate: Restrict` en vez de `NoAction` (474 líneas de diferencia). En MySQL son equivalentes; al introducir 0060–0061 se conservó el `schema.prisma` anterior y se agregaron a mano solo los modelos nuevos. Revisar de dónde viene la diferencia (¿migración `0059`?) y regenerar el esquema completo en un cambio aparte | Baja | DEC-039 |
| Índices que faltan según el inventario ([`database/INDEXES.md`](../../database/INDEXES.md), "Índices que faltan"): `tbl_notifications` `(use_id, not_created_at)` en lugar de `idx_noti_user`, y `tbl_documents` `(doc_parent_id, doc_type, doc_id_ref)`, hoy con recorrido completo. Requieren migración y aprobación | Media | FND-BD-15 |
| Cuando exista la consulta de la bitácora (ADR-0013, B15): agregar `aud_create_at` al final de `ix_audit_log_entity_record`, y decidir si `ix_audit_log_operation_id` se usa o se retira | Baja | FND-BD-15 |
| `saveUser` valida `staId` con `requiredId`: acepta `3` y elimina por el guardado, sin las verificaciones ni la bitácora de eliminación de `deleteUser`. `saveProfile` ya lo restringe con `EDITABLE_STATUS_VALUES` (FND-BE-30), igual que maestros, obras y proveedores (DEC-038) | Media | DEC-038 |
| `deleteProfile` responde **400** al eliminar un perfil ya eliminado; [DEC-006](../decisiones/DEC-006-columnas-autoria-eliminacion.md) exige **404**, y `deleteUser` ya lo cumple | Media | Descubrimiento de `engineering/` |
| Duplicado por nombre: `saveProfile`/`saveUser` responden 400; el mismo duplicado detectado por la BD responde 409. Pendiente de decisión (PD-02 en [`PROJECT_STATE`](../PROJECT_STATE.md)) | Media | Descubrimiento de `engineering/` |
| `GET /app/get_profiles` es un selector sin paginar, como permite [DEC-018](../decisiones/DEC-018-selector-maestros.md), pero sin el tope fijo `take: MAX_ROWS` | Baja | Descubrimiento de `engineering/` |
| Duplicado de tipo de identificación: el service responde 400 y la carrera que llega a la BD (`P2002` en `uq_identity_documents_*_active`) responde 409. Misma deriva que PD-02 | Baja | Implementación de ADR-0008 |
| Nombres de los archivos de API del cliente mezclados: `authAPI.js`, `documentsAPI.js` frente a `usersApi.js`, `profilesApi.js`, `appApi.js`, `permissionsApi.js`, `notificationsApi.js`. `client/CLAUDE.md` dice `<dominio>API.js` | Baja | Descubrimiento de `engineering/` |
| `ProfileDialog.jsx` y otros diálogos hacen `console.error` en la carga de datos auxiliares sin avisar al usuario (`getModules`) | Baja | Descubrimiento de `engineering/` |
| Cliente: `yarn lint` y `yarn build` fallan con "This package doesn't seem to be present in your lockfile" (Yarn 4): no corre ningún script de `client/`. Se verifica con `node node_modules/eslint/bin/eslint.js "src/**/*.{js,jsx}"` y `node node_modules/vite/bin/vite.js build`. Arreglarlo exige `yarn install`, que reescribe `yarn.lock`: requiere aprobación | Media | Implementación de proveedores (2026-10-01) |
| Cliente: 17 errores `no-unused-vars` previos en `layout/MainLayout/Header/*`, `DocumentManagement`, `EasyCrop`, `DebouncedInput`, `PermissionsDrawer` y `ProfileDialog` | Baja | Implementación de proveedores (2026-10-01) |
| El dashboard (`views/dashboard/Default`) muestra tarjetas de ejemplo de otro negocio (Ventas, Pedidos, Productos) con números fijos y colores hex. Reemplazar por accesos a los módulos o dejarlo vacío hasta ADR-0002 | Media | Revisión UX 2026-10-01 |
| Restos de la plantilla sin ruta: `views/utilities/*` y `views/sample-page`. Borrarlos requiere aprobación | Baja | Revisión UX 2026-10-01 |
| `UsersPage` y `ProfilePage` repiten la lógica de listado de `MasterPage` (búsqueda, pestañas, paginación). Una prop para acciones extra (Permisos) permitiría reutilizarla | Baja | Revisión UX 2026-10-01 |
| Contraste del tema base de Berry por debajo de WCAG AA: chips de estado `warning` (~1,5:1), `success` (~2:1) y `error` (~3,3:1), y botón contenido `primary` (~3,1:1). Propuesta en [`DESIGN_SYSTEM`](../standards/DESIGN_SYSTEM.md), "Problemas conocidos"; se corrige en `themes/overrides/Chip.jsx` y la paleta | Media | Revisión UX 2026-10-01 |
| Colores hex fijos en `CardGrid`, `PermissionsDrawer` y el dashboard. El tema solo define el esquema claro (`themes/index.jsx`), así que hoy no hay modo oscuro que romper; si se agrega, hay que pasarlos a la paleta | Baja | Revisión UX 2026-10-01 |
| `GenericFormSection` tipo `currency` convierte el importe con `Number`, contra [DEC-028](../decisiones/DEC-028-convencion-monetaria.md). No lo usa ningún formulario; los importes de obra van como `text` con prefijo `$` | Baja | Revisión UX 2026-10-01 |

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
