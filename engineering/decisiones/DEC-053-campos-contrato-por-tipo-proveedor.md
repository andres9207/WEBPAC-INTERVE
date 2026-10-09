# DEC-053 — Los campos del contrato se configuran por tipo de proveedor

**Fecha:** 2026-10-08 · **Tipo:** Obligatoria · **ADR:** [0006](../adr/0006-tipos-contrato.md), [0010](../adr/0010-tipos-proveedor.md), [0013](../adr/0013-auditoria-trazabilidad.md), [0027](../adr/0027-integridad-transaccional.md)

Reemplaza a [DEC-037](DEC-037-configuracion-campos-tipo-contrato.md) en **dónde** vive la configuración: la mueve del tipo de contrato al tipo de proveedor. El modelo no cambia: catálogo cerrado, jerarquía, ausencia = no aplica, resolución única y valores heredados. Reemplaza también la parte de [DEC-023](DEC-023-tipo-proveedor-clasificacion.md) que decía que el tipo de proveedor no condiciona campos. Decidido por el usuario el 2026-10-08.

## Contexto

Qué campos tiene un contrato (etapa, observaciones, descripción del otrosí y los seis porcentajes) depende de con quién se contrata, no de la clase de contrato. El tipo de contrato queda como una clasificación simple.

## Decisión

- **Tablas** (migración `0085`), con la misma forma que las del tipo de contrato y `pvt_id` en vez de `ctt_id`:
  - `tbl_provider_type_fields` (`ptf_`): una fila por tipo y campo.
  - `tbl_provider_type_field_versions` (`pfv_`): el historial.
  - `tbl_provider_types.pvt_config_version`: la versión vigente.

  El catálogo `tbl_contract_fields` no cambia.
- **Se retiran** (migración `0086`): `tbl_contract_type_fields`, `tbl_contract_type_field_versions`, `ctt_config_version` y **`ctr_config_version`**. Con varios tipos, el contrato ya no tiene una sola versión, y nada la leía. Las versiones quedan en cada tipo de proveedor, para auditar.
- **Un proveedor con varios tipos** ([DEC-041](DEC-041-varios-tipos-proveedor.md)) **toma la unión**, campo por campo (`mergeTypeRows`):
  - aplica, visible y obligatorio si lo es en alguno de sus tipos;
  - el orden es el menor.

  La jerarquía se conserva, porque se cumple en cada tipo.
- **Sin tipos o sin configuración:** ningún campo configurable aplica.
- **Resolución única** (`resolveProviderFields`): la misma función entrega los descriptores (`GET /work/contracts/get_contract_fields?prvId=` o `?ctrId=`) y valida el guardado de:
  - crear o editar el contrato, con el proveedor elegido;
  - el otrosí y el otrosí de liquidación;
  - modificar un concepto, con el proveedor del contrato.
- **Bloqueo:** los tipos de un proveedor solo cambian bajo el bloqueo del `PROVEEDOR` (DEC-041), y guardar un contrato ya lo bloquea. Por eso los tipos no se bloquean aparte. Reconfigurar un tipo en paralelo es como hacerlo un segundo antes: el contrato queda con la configuración anterior, y sus valores, protegidos como heredados.
- **La asignación del proveedor a la obra se valida antes de aplicar sus campos.** Si no está asignado, el error es ese y no un "no aplica".
- **Cambiar los tipos de un proveedor, o su configuración, cambia los campos de todos sus contratos**, también de los vigentes, en la próxima edición. Lo ya guardado que deja de aplicar se conserva como heredado.
- **AIU** ([DEC-046](DEC-046-aiu-por-contrato.md)): "el tipo declara si aplica" pasa a ser "algún tipo del proveedor aplica A, I o U".
- **Permiso 104**, "Configurar campos del tipo de proveedor" (migración `0087`). Quien tenía el 75 (perfil o usuario) recibe el 104; después el 75 se retira con sus asignaciones y su número no se reutiliza. Ver la configuración exige ver tipos de proveedor (22).
- **Bitácora:** entidad `TIPO_PROVEEDOR`, una fila por campo que cambió y otra con `pvt_config_version`. Se quita la entidad `TIPO_CONTRATO`, que ya nadie escribe.
- **Configuración inicial:** sin migración de datos.
  - `seed.js` da a los tipos que siembra (Simple, Subcontratista, Contrato mayor) todos los campos aplicables y visibles, con la etapa obligatoria, como su versión 1. Lo hace solo si el tipo nunca se configuró.
  - Los tipos creados después nacen sin configuración.
- **Interfaz:**
  - La acción "Configurar campos" o "Ver campos" pasa al listado de tipos de proveedor (`ProviderTypeFieldsDialog`).
  - El formulario de contrato pide los campos al elegir el proveedor, no el tipo de contrato.
  - El diálogo de otrosí los pide con el contrato.

## Descartado

- **Que convivan las dos configuraciones** (tipo de contrato y tipo de proveedor): obligaría a definir cómo se combinan dos fuentes. Se pidió moverla.
- **Que gane el tipo más restrictivo (la intersección) o un tipo principal:** con la unión, un proveedor nunca pierde un campo por tener un tipo más. Un tipo principal revertiría parte de DEC-041.
- **Guardar en el contrato la lista (tipo, versión) con que se capturó:** sin un uso actual, es una tabla más. Los valores heredados ya protegen lo capturado.
- **Reescribir las migraciones `0053`–`0057`:** rompe la regla de no reescribir migraciones. Se agregan `0085`–`0087`.

## Qué implica

- Un formulario o endpoint nuevo que capture un campo configurable del contrato usa `resolveProviderFields` y `enforceFields`, con el proveedor del contrato, dentro de la transacción que bloquea al `PROVEEDOR`.
- Desplegar: aplicar `0085`, `0086` y `0087` en orden, `npx prisma db pull` (o el `schema.prisma` versionado) y `yarn db:seed`.

## Dónde

`database/migrations/0085`–`0087` · `server/src/modules/admin/providerTypes/` (`contractFields.js`, `providerTypeFields.service.js`, su controller, validación y rutas) · `contracts.service.js` y `contractConcepts.service.js` · `server/prisma/seed.js` y `seed.demo.js` · `client/src/views/admin/providerTypes/` · `client/src/views/work/contracts/ContractFormPage.jsx` y `components/ConceptDialog.jsx` · Tests: `providerTypeFields.service.test.js`, `providerTypeFields.controller.test.js`, `contractFields.test.js`, `contracts.service.test.js`.
