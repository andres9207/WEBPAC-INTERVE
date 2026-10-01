# DEC-031 — Los proveedores viven en el área `work/`, con asignación a obras por endpoints propios

**Fecha:** 2026-10-01 · **Tipo:** Obligatoria · **ADR:** [0012](../adr/0012-proveedores.md), [0027](../adr/0027-integridad-transaccional.md)

Resuelve PD-05 ([`PROJECT_STATE`](../PROJECT_STATE.md)) **para proveedores**. Amplía [DEC-026](DEC-026-area-obras.md), que había reservado `work/` solo para el agregado de obra. Decidido por el usuario el 2026-10-01.

## Contexto

ADR-0012 define el proveedor como entidad reutilizable entre obras, con una relación proveedor-obra propia. Hacía falta su área, sus nombres, su lugar en `LOCK_ORDER` y cómo se asigna a una obra: dentro del guardado de la obra (como los responsables) o con endpoints propios.

## Decisión

- **Área `work/`**, módulo `providers`, junto a obras:
  - servidor: `server/src/modules/work/providers/`
  - API: `/api/work/providers/<acción>_provider`; el listado, `pagination_providers`
  - cliente: `client/src/views/work/providers/`, y `client/src/api/requests/providersApi.js`
  - menú: "Proveedores" dentro del grupo "Obras" (página 15)
  - tests: `server/test/modules/work/providers/`
- **Nombres fijados:**

  | Parte | Tabla | Prefijo |
  | --- | --- | --- |
  | Proveedor | `tbl_providers` | `prv_` |
  | Contactos del proveedor | `tbl_provider_contacts` | `prc_` |
  | Asignación proveedor-obra | `tbl_work_providers` | `wkp_` |

- **La asignación proveedor-obra tiene endpoints propios** en el módulo `providers`, y se guarda al momento, no con el guardado de la obra: `assign_provider_work`, `update_provider_work`, `unassign_provider_work` y el listado `pagination_work_providers`. La asignación se identifica por el par (obra, proveedor), que es único. Desasignar borra la fila; la bitácora la conserva en la obra y en el proveedor.
- **Crear desde la obra** usa `save_provider` con `assignment`: crea y asigna en una transacción (ADR-0012, decisión 6).
- **Entidad de bloqueo `PROVEEDOR`**, después de `OBRA` y antes de `CONTRATO`. Asignar bloquea obra → proveedor; guardar un proveedor bloquea proveedor → maestros.
- **Permisos 60 a 67:** ver, crear, modificar, eliminar, cambiar estado, cambiar identificación, asignar a obra, desasignar de obra. Exportar no se siembra (no hay exportación). El listado de proveedores de una obra exige el permiso de ver obras.
- **Eliminar un proveedor asignado a obras responde 409**, con la cantidad (ADR-0012, regla 15), como la obra con contratos (DEC-026).

## Descartado

- **`admin/providers`**: el proveedor no es un catálogo; tiene identidad, contactos y relación con obras.
- **Un área nueva `provider/`**: agregaba un área de primer nivel para un solo módulo.
- **Asignar dentro del guardado de la obra**: obligaba a crear el proveedor nuevo dentro del guardado de la obra y acoplaba dos agregados en un formulario.

## Qué implica

- `work/` deja de ser solo el agregado de obra: contiene obras y proveedores ([`MODULE_STANDARD`](../standards/MODULE_STANDARD.md)). Contratos, pólizas y facturación siguen con PD-05 abierta.
- Los prefijos `prv prc wkp` quedan ocupados.
- Cuando existan contratos, desasignar un proveedor con contratos en esa obra se bloquea en `unassignProviderFromWork`, y eliminar un proveedor con contratos, en `deleteProvider`.

## Dónde

`database/migrations/0044`–`0047` · `server/src/modules/work/providers/` · `server/src/common/services/transaction.service.js` (`LOCK_ORDER`, `LOCKABLE`) · `client/src/views/work/providers/` (incluida la pestaña de la obra, `components/WorkProvidersTab.jsx`)
