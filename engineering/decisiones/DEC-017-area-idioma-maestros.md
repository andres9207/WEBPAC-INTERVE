# DEC-017 — Los maestros viven en el área `admin/`, con nombres en inglés fijados

**Fecha:** 2026-09-29 · **Tipo:** Obligatoria · **ADR:** [0003](../adr/0003-aseguradoras.md), [0004](../adr/0004-constructoras.md), [0006](../adr/0006-tipos-contrato.md), [0007](../adr/0007-tipos-interventoria.md), [0008](../adr/0008-tipos-identificacion.md), [0009](../adr/0009-tipos-direccion.md), [0010](../adr/0010-tipos-proveedor.md), [0019](../adr/0019-tipos-poliza.md)

Resuelve la parte de maestros de PD-05 ([`PROJECT_STATE`](../PROJECT_STATE.md)).

## Contexto

Ningún ADR fijaba en qué carpeta y bajo qué URL viven los maestros, ni el idioma de sus tablas. Las áreas existentes (`auth/`, `security/`, `app/`) están en inglés, las 15 tablas actuales también, y la BD real contra la que se escribieron los ADR ya tiene `tbl_providers` y `tbl_identity_documents` (con prefijo `idd_`). El ADR-0006 proponía una URL en español (`/api/contratos/configuracion`).

## Decisión

- **Área `admin/`** para los ocho maestros:
  - servidor: `server/src/modules/admin/<modulo>/`
  - API: `/api/admin/<modulo>/<acción>_<entidad>`
  - cliente: `client/src/views/admin/<modulo>/`, y `client/src/api/requests/<modulo>Api.js`
  - tests: `server/test/modules/admin/<modulo>/`
- **Tablas, carpetas y código en inglés.** Lo que ve el usuario (menú, títulos, mensajes) sigue en español.
- **Nombres de varias palabras**, con la convención que ya usa el código:
  - carpeta, archivos y segmento de la URL en camelCase: `contractTypes/contractTypes.service.js`, `/api/admin/contractTypes/`
  - acciones en snake_case, en singular: `save_contract_type`, `delete_contract_type`; el listado en plural: `pagination_contract_types`
  - tabla en snake_case y en plural: `tbl_contract_types`
- **Nombres fijados:**

  | Maestro | Módulo | Tabla | Prefijo | Entidad de bloqueo | ADR |
  | --- | --- | --- | --- | --- | --- |
  | Aseguradoras | `insurers` | `tbl_insurers` | `ins_` | `ASEGURADORA` ([DEC-019](DEC-019-maestros-orden-bloqueo.md)) | 0003 |
  | Constructoras | `constructionCompanies` | `tbl_construction_companies` | `cnc_` | PD-04 | 0004 |
  | Tipos de contrato | `contractTypes` | `tbl_contract_types` | `ctt_` | PD-04 | 0006 |
  | Tipos de interventoría | `supervisionTypes` | `tbl_supervision_types` | `spt_` | PD-04 | 0007 |
  | Tipos de identificación | `identityDocuments` | `tbl_identity_documents` | `idd_` | `TIPO_IDENTIFICACION` ([DEC-019](DEC-019-maestros-orden-bloqueo.md)) | 0008 |
  | Tipos de dirección | `addressTypes` | `tbl_address_types` | `adt_` | `TIPO_DIRECCION` ([DEC-019](DEC-019-maestros-orden-bloqueo.md)) | 0009 |
  | Tipos de proveedor | `providerTypes` | `tbl_provider_types` | `pvt_` | `TIPO_PROVEEDOR` ([DEC-019](DEC-019-maestros-orden-bloqueo.md)) | 0010 |
  | Tipos de póliza | `policyTypes` | `tbl_policy_types` | `plt_` | PD-04 | 0019 |

  `tbl_identity_documents` e `idd_` no se eligieron: los impone la FK que la BD real ya declara desde `tbl_providers`.

- **Prefijos ocupados** al fijar esta tabla (no se reutilizan): `aud doc lat not pag pap par per pro prp ses sta upg use usp`, más `prv` (proveedores, DEC-010) e `idd`.

## Descartado

- **Área `config/` o `masters/`**: se prefirió `admin/`.
- **Nombres en español** (`tbl_aseguradoras`): mezclaría idiomas con las 15 tablas actuales y chocaría con `tbl_identity_documents` de la BD real.
- **kebab-case en la URL** (`contract-types`): el código no lo usa en ningún lado, y habría dos nombres para el mismo módulo (carpeta y URL).

## Qué implica

- Todo maestro nuevo usa la fila de esta tabla sin volver a discutirla. Un maestro que no esté aquí se agrega a esta tabla (con un prefijo verificado como libre) antes de implementarlo.
- La página padre del menú (fila de `tbl_pages` con `pag_parent = 0`) se crea con el primer maestro; su texto visible se fija en la spec de ese maestro.
- Obras, proveedores, contratos, pólizas y facturación **no** son maestros: su área sigue pendiente (PD-05, parte restante).
- La URL en español que propone el ADR-0006 queda reemplazada por `/api/admin/contractTypes/…`.

## Dónde

[`standards/CRUD_STANDARD.md`](../standards/CRUD_STANDARD.md) (paso 1 y "Nombres") · [`standards/MODULE_STANDARD.md`](../standards/MODULE_STANDARD.md) ("Dónde vive un módulo") · [`patterns/SIMPLE_CRUD.md`](../patterns/SIMPLE_CRUD.md)
