# Registro de decisiones de implementación

Qué decidimos al construir, y qué quedó como regla para lo que se construya después. Cada ficha es corta: contexto, decisión, lo que se descartó, y lo que implica para quien escriba código nuevo.

**No reemplaza a los ADR.** [`engineering/adr/`](../adr/README.md) explica la arquitectura y su porqué con todo el análisis. Esta carpeta registra lo que ya está hecho y es regla hoy, y enlaza al ADR del que sale cada decisión.

## Cómo usar este registro

- **Antes de construir un módulo o endpoint nuevo**, lee las fichas marcadas como **Obligatoria**. Son las que también exige el checklist de [`ENDPOINT_STANDARD.md`](../standards/ENDPOINT_STANDARD.md).
- **Una decisión nueva** se registra en una ficha nueva `DEC-NNN-tema.md`, con el número siguiente, y se agrega a la tabla de abajo. El número no se reutiliza.
- **Una decisión que cambia** no se reescribe: se crea una ficha nueva que la reemplaza, y la vieja pasa a estado `Reemplazada por DEC-NNN`.

## Decisiones

| # | Fecha | Decisión | Tipo | ADR |
| --- | --- | --- | --- | --- |
| [DEC-001](DEC-001-prisma-acceso-unico.md) | 2026-09-24 | Prisma es el único acceso a la base de datos | Obligatoria | [0001](../adr/0001-seguridad.md), [0027](../adr/0027-integridad-transaccional.md) |
| [DEC-002](DEC-002-sesion-unica-refresh.md) | 2026-09-24 | Sesión única, access 15 min + refresh 7 días rotado | Vigente | [0001](../adr/0001-seguridad.md) |
| [DEC-003](DEC-003-login-bloqueo-progresivo.md) | 2026-09-24 | Login con bloqueo progresivo por cuenta y respuesta uniforme | Vigente | [0001](../adr/0001-seguridad.md) |
| [DEC-004](DEC-004-recuperacion-contrasena.md) | 2026-09-24 | Código de recuperación con hash, 5 intentos y uno por usuario | Vigente | [0001](../adr/0001-seguridad.md) |
| [DEC-005](DEC-005-identidad-desde-sesion.md) | 2026-09-24 | La identidad y el autor salen siempre de la sesión, nunca del cliente | Obligatoria | [0001](../adr/0001-seguridad.md), [0013](../adr/0013-auditoria-trazabilidad.md) |
| [DEC-006](DEC-006-columnas-autoria-eliminacion.md) | 2026-09-24 | Seis columnas de autoría con FK y eliminación lógica con evidencia | Obligatoria | [0013](../adr/0013-auditoria-trazabilidad.md) |
| [DEC-007](DEC-007-bitacora-funcional.md) | 2026-09-24 | Bitácora `tbl_audit_log` escrita desde el servicio, en la misma transacción | Obligatoria | [0013](../adr/0013-auditoria-trazabilidad.md) |
| [DEC-008](DEC-008-eventos-seguridad.md) | 2026-09-24 | Qué eventos de seguridad se registran y cuáles no | Vigente | [0001](../adr/0001-seguridad.md), [0013](../adr/0013-auditoria-trazabilidad.md) |
| [DEC-009](DEC-009-zona-horaria.md) | 2026-09-24 | La base de datos trabaja en UTC; la hora local se aplica al mostrar | Obligatoria | [0013](../adr/0013-auditoria-trazabilidad.md) |
| [DEC-010](DEC-010-nombres-columnas.md) | 2026-09-24 | Prefijo único por tabla y sufijos `_create_at` / `_update_at` | Obligatoria | [0013](../adr/0013-auditoria-trazabilidad.md) |
| [DEC-011](DEC-011-endurecimiento-adr-0001.md) | 2026-09-24 | Endurecimiento general del backend heredado | Vigente | [0001](../adr/0001-seguridad.md) |
| [DEC-012](DEC-012-transacciones-bloqueos.md) | 2026-09-25 | Transacciones con utilidad única, `REPEATABLE READ` y protocolo de bloqueo | Obligatoria | [0027](../adr/0027-integridad-transaccional.md) |
| [DEC-013](DEC-013-paginacion.md) | 2026-09-25 | Paginación con helper único y tope de 100 filas | Obligatoria | — |
| [DEC-014](DEC-014-autor-por-nombre.md) | 2026-09-25 | Los listados muestran el autor por nombre, resuelto en el backend | Obligatoria | [0013](../adr/0013-auditoria-trazabilidad.md) |
| [DEC-015](DEC-015-reintento-interbloqueo.md) | 2026-09-25 | Reintento acotado del interbloqueo solo en operaciones idempotentes; 409 si persiste, 503 ante espera agotada | Obligatoria | [0027](../adr/0027-integridad-transaccional.md) |
| [DEC-016](DEC-016-idempotencia-por-clave.md) | 2026-09-25 | Idempotencia por clave (`Idempotency-Key`) en creación, con la clave y la huella en la propia entidad | Obligatoria | [0027](../adr/0027-integridad-transaccional.md) |
| [DEC-017](DEC-017-area-idioma-maestros.md) | 2026-09-29 | Los maestros viven en el área `admin/`, con tablas y código en inglés y nombres fijados | Obligatoria | 0003, 0004, 0006–0010, 0019 |
| [DEC-018](DEC-018-selector-maestros.md) | 2026-09-29 | Los selectores de maestros devuelven solo activos, sin paginar, con tope fijo y solo `verifyToken` | Obligatoria | [0008](../adr/0008-tipos-identificacion.md), [0014](../adr/0014-autorizacion-permisos.md) |
| [DEC-019](DEC-019-maestros-orden-bloqueo.md) | 2026-09-29 | Los maestros van al final de `LOCK_ORDER`; asignar un maestro lo bloquea | Obligatoria | [0027](../adr/0027-integridad-transaccional.md) |
| [DEC-020](DEC-020-patron-maestro.md) | 2026-09-29 | Los maestros se declaran sobre un patrón reutilizable; el cambio de estado es una acción con permiso propio | Obligatoria | 0003, 0004, 0006–0010, 0019 |
| [DEC-021](DEC-021-formato-numero-documento.md) | 2026-09-29 | El formato del número de documento se valida por tipo, con la regla en el código del servidor | Obligatoria | [0008](../adr/0008-tipos-identificacion.md) |
| [DEC-022](DEC-022-vista-maestro.md) | 2026-09-29 | Las pantallas de maestros se declaran sobre `MasterPage` | Obligatoria | 0003, 0004, 0006–0010, 0019 |
| [DEC-023](DEC-023-tipo-proveedor-clasificacion.md) | 2026-09-29 | El tipo de proveedor es una clasificación de la empresa, sin reglas por tipo | Vigente; la cantidad (un solo tipo) la reemplaza [DEC-041](DEC-041-varios-tipos-proveedor.md) | [0010](../adr/0010-tipos-proveedor.md) |
| [DEC-024](DEC-024-busqueda-listados.md) | 2026-09-29 | Los listados (maestros, perfiles, usuarios) buscan con un solo campo de texto y filtran el estado con pestañas (reemplaza los filtros de DEC-022) | Obligatoria | 0003, 0004, 0006–0010, 0019 |
| [DEC-025](DEC-025-indices-maestros.md) | 2026-09-29 | Índice (estado, nombre) en los maestros para el selector; la búsqueda con `LIKE '%texto%'` no usa índice | Obligatoria | 0003, 0004, 0006–0010, 0019 |
| [DEC-026](DEC-026-area-obras.md) | 2026-09-30 | Las obras viven en el área `work/` (módulo `works`, tablas `tbl_work*`); `OBRA` al principio de `LOCK_ORDER`; eliminar con contratos responde 409 | Obligatoria | [0011](../adr/0011-obras.md), [0027](../adr/0027-integridad-transaccional.md) |
| [DEC-027](DEC-027-interventoria-en-obra.md) | 2026-09-30 | El tipo de interventoría se ancla a la obra, no al contrato | Vigente | [0007](../adr/0007-tipos-interventoria.md), [0011](../adr/0011-obras.md) |
| [DEC-028](DEC-028-convencion-monetaria.md) | 2026-09-30 | Importes en `DECIMAL(18,2)`; el servidor redondea a dos decimales, medio hacia arriba, solo si sobran | Obligatoria | [0026](../adr/0026-calculos-facturacion.md), [0011](../adr/0011-obras.md) |
| [DEC-029](DEC-029-responsables-usuarios-existentes.md) | 2026-09-30 | Los responsables de obra se eligen entre usuarios existentes (reemplaza ADR-0011, decisiones 5 y 6) | Vigente | [0011](../adr/0011-obras.md) |
| [DEC-030](DEC-030-obra-paginas-propias-plazo.md) | 2026-10-01 | La obra tiene páginas propias (detalle y edición) y su plazo es fecha de inicio + número + unidad, con fecha final calculada | Vigente | [0011](../adr/0011-obras.md), [0015](../adr/0015-contratos.md) |
| [DEC-031](DEC-031-area-proveedores.md) | 2026-10-01 | Los proveedores viven en `work/` (módulo `providers`, tablas `tbl_providers`, `tbl_provider_contacts`, `tbl_work_providers`); la asignación a obras tiene endpoints propios; `PROVEEDOR` después de `OBRA` en `LOCK_ORDER` | Obligatoria | [0012](../adr/0012-proveedores.md), [0027](../adr/0027-integridad-transaccional.md) |
| [DEC-032](DEC-032-identidad-proveedor.md) | 2026-10-01 | La identidad del proveedor es única entre no eliminados; el duplicado responde 409 con el proveedor existente; tipo de servicio en texto libre | Vigente | [0012](../adr/0012-proveedores.md), [0008](../adr/0008-tipos-identificacion.md), [0009](../adr/0009-tipos-direccion.md) |
| [DEC-033](DEC-033-indicadores-avance-obras.md) | 2026-10-02 | El listado de obras tiene indicadores y avance del plazo calculados en el servidor, y vista de tarjetas (`MasterPage` con `header` y `renderCard`) | Vigente | [0011](../adr/0011-obras.md) |
| [DEC-034](DEC-034-modal-con-direccion-propia.md) | 2026-10-02 | El detalle y el formulario de obras y proveedores se abren en un modal grande sobre el listado (`RouteDialog`), con dirección propia: las rutas `/new`, `/:id` y `/:id/edit` son hijas del listado | Vigente | [0011](../adr/0011-obras.md), [0012](../adr/0012-proveedores.md) |
| [DEC-035](DEC-035-contratos-area-modelo.md) | 2026-10-02 | Los contratos viven en `work/` (tablas `tbl_contracts`, `tbl_contract_concepts`, `tbl_contract_status_history`); número único por obra, plazo con unidad, la suspensión extiende la fecha fin, ciclo de vida en `ctr_state`, FK compuestas para etapa y proveedor de la obra | Obligatoria | [0015](../adr/0015-contratos.md), [0016](../adr/0016-conceptos-contractuales.md), [0017](../adr/0017-estados-contrato.md), [0027](../adr/0027-integridad-transaccional.md) |
| [DEC-036](DEC-036-conceptos-contractuales.md) | 2026-10-02 | Conceptos sin costo directo negativo; anticipo solo como porcentaje, 15 % por defecto; valor derivado con la composición propuesta de ADR-0026 | Vigente | [0016](../adr/0016-conceptos-contractuales.md), [0026](../adr/0026-calculos-facturacion.md) |
| [DEC-037](DEC-037-configuracion-campos-tipo-contrato.md) | 2026-10-02 | Configuración de campos por tipo de contrato: catálogo cerrado en código y BD, jerarquía obligatorio ⇒ visible ⇒ aplica con `CHECK`, ausencia = no aplica, resolución única para formulario y guardado, valores heredados en solo lectura, versión con historial, permiso 75 | Obligatoria | [0006](../adr/0006-tipos-contrato.md), [0013](../adr/0013-auditoria-trazabilidad.md), [0027](../adr/0027-integridad-transaccional.md) |
| [DEC-038](DEC-038-clave-simbolica-estados.md) | 2026-10-02 | Estados de visibilidad con `sta_key` (`ACTIVE`, `INACTIVE`, `DELETED`) y una sola tabla de constantes en servidor y cliente; nadie escribe el número; el servidor verifica el catálogo al arrancar; `sta_scope` no se amplía (DEC-035) | Obligatoria | [0017](../adr/0017-estados-contrato.md), [0013](../adr/0013-auditoria-trazabilidad.md) |
| [DEC-039](DEC-039-suspension-contratos.md) | 2026-10-05 | Suspensión solo desde ejecución; la levanta el otrosí que reanuda el contrato (con permiso de levantar); días calendario sin el de reanudación, sumados a la fecha fin; catálogo único de motivos `tbl_reasons` por ámbito | Vigente | [0017](../adr/0017-estados-contrato.md) |
| [DEC-040](DEC-040-rate-limit-general.md) | 2026-10-05 | Rate limit general de `/api`: 1000 peticiones cada 5 minutos por IP (antes 50); el de `/api/auth/*` no cambia | Vigente | [0001](../adr/0001-seguridad.md) |
| [DEC-041](DEC-041-varios-tipos-proveedor.md) | 2026-10-05 | Un proveedor tiene uno o varios tipos (`tbl_provider_classifications`), al menos uno; se guardan con él por diferencial y se auditan como lista. Reemplaza a DEC-023 solo en la cantidad | Vigente | [0010](../adr/0010-tipos-proveedor.md), [0012](../adr/0012-proveedores.md) |
| [DEC-042](DEC-042-facturas-area-ciclo-vida.md) | 2026-10-05 | Facturas en el área `billing/` (`tbl_invoices`, `inv_`): cuatro tipos en un encabezado común, estados registrada → aprobada → anulada con historial, número único por proveedor, el estado del contrato decide el tipo admitido, permisos 83 a 88. Fase A, sin importes | Obligatoria | [0020](../adr/0020-facturacion.md), [0017](../adr/0017-estados-contrato.md) |
| [DEC-043](DEC-043-contactos-comunes-obra.md) | 2026-10-06 | Contactos de obra en `tbl_work_contacts` (`wkc_`), y las reglas de contacto en un solo lugar para obra y proveedor (`defineContacts`, `contactsRules`, `ContactsEditor`/`ContactsList`), con `contactId` como única forma hacia el cliente | Obligatoria | [0009](../adr/0009-tipos-direccion.md), [0011](../adr/0011-obras.md) |

**Tipo:**
- **Obligatoria**: regla para todo código nuevo. El checklist de `ENDPOINT_STANDARD.md` la exige y, donde se puede, un test la hace cumplir.
- **Vigente**: decisión tomada sobre un módulo que ya existe; no impone una regla general.

## Pendientes que dejan estas decisiones

Lo que estas decisiones dejaron abierto (despliegue, funcionalidad y limpieza) está en [`debt/TECHNICAL_DEBT.md`](../debt/TECHNICAL_DEBT.md), la lista única de pendientes del proyecto.
