# DEC-026 — Las obras viven en el área `work/`, con nombres en inglés fijados

**Fecha:** 2026-09-30 · **Tipo:** Obligatoria · **ADR:** [0011](../adr/0011-obras.md), [0027](../adr/0027-integridad-transaccional.md)

Resuelve PD-05 ([`PROJECT_STATE`](../PROJECT_STATE.md)) **solo para obras**.

## Contexto

[DEC-017](DEC-017-area-idioma-maestros.md) fijó el área de los maestros y dejó pendiente la del CORE. Obras necesita carpeta, URL, tablas y una posición en `LOCK_ORDER` antes de escribir la primera migración.

## Decisión

- **Área `work/`**, solo para el agregado de obra:
  - servidor: `server/src/modules/work/works/`
  - API: `/api/work/works/<acción>_work`; el listado, `pagination_works`
  - cliente: `client/src/views/work/works/`, y `client/src/api/requests/worksApi.js`
  - tests: `server/test/modules/work/works/`
- **Un solo módulo, `works`.** Responsables, etapas y contactos son partes del agregado (ADR-0011, decisión 1): no tienen módulo, pantalla, menú ni endpoints propios. Se guardan con la obra, en una sola petición.
- **Tablas, carpetas y código en inglés**, con las reglas de nombres de DEC-017. Lo que ve el usuario sigue en español.
- **Nombres fijados:**

  | Parte | Tabla | Prefijo |
  | --- | --- | --- |
  | Obra (raíz) | `tbl_works` | `wrk_` |
  | Responsables | `tbl_work_managers` | `wkm_` |
  | Etapas | `tbl_work_stages` | `wks_` |
  | Contactos (más adelante, PRO-BD-04) | `tbl_work_contacts` | `wkc_` |

- **Entidad de bloqueo `OBRA`, al principio de `LOCK_ORDER`**, antes de `CONTRATO`. Guardar una obra la bloquea primero y después a los maestros que asigna ([DEC-019](DEC-019-maestros-orden-bloqueo.md)). Una operación futura sobre un contrato que necesite su obra la bloquea antes que al contrato.
- **Eliminar una obra con contratos responde 409**, con el motivo y la cantidad (ADR-0011, decisión 12).

## Descartado

- **Área `project/`**: se prefirió que el área tuviera el mismo nombre que las tablas (`tbl_works`).
- **Un área para todo el CORE**: proveedores, contratos, pólizas y facturación deciden su área cuando se diseñen (PD-05 sigue abierta para ellos).
- **Módulos separados para responsables y etapas**: romperían el guardado atómico del agregado.

## Qué implica

- Los prefijos `wrk wkm wks wkc` quedan ocupados.
- `work/` se agrega a la lista cerrada de áreas de [`MODULE_STANDARD`](../standards/MODULE_STANDARD.md).
- El 409 de la eliminación con contratos es una excepción al 400 del bloqueo por uso de los maestros (PD-02 sigue abierta para ellos).

## Dónde

[`standards/MODULE_STANDARD.md`](../standards/MODULE_STANDARD.md) ("Dónde vive un módulo") · `server/src/common/services/transaction.service.js` (`LOCK_ORDER`, `LOCKABLE`) · [ADR-0027](../adr/0027-integridad-transaccional.md), decisión 3
