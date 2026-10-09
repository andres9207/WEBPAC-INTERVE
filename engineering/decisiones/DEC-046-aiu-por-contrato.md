# DEC-046 — AIU en cadena: el tipo declara, el contrato solicita y el concepto pacta A, I y U

**Fecha:** 2026-10-06 · **Tipo:** Obligatoria · **ADR:** [0026](../adr/0026-calculos-facturacion.md), [0006](../adr/0006-tipos-contrato.md), [0016](../adr/0016-conceptos-contractuales.md)

> Desde [DEC-053](DEC-053-campos-contrato-por-tipo-proveedor.md) (2026-10-08), "el tipo" es el conjunto de tipos del proveedor del contrato: aplica AIU si alguno de ellos aplica A, I o U. Lo demás no cambia.

Resuelve el punto abierto P13 de ADR-0026 ("dónde se apaga el AIU") con la opción **por contrato**, y cierra la tarea PRO-BD-23 del backlog. El usuario lo decidió el 2026-10-06.

## Contexto

Ya existían dos partes de la cadena:

- **En el concepto**, A, I y U desagregados (`ccp_admin_pct`, `ccp_contingency_pct`, `ccp_profit_pct`, con `CHECK` de 0 a 100). El desagregado es necesario porque la factura de liquidación pide el porcentaje de utilidad.
- **En el tipo de contrato**, A, I y U configurables uno por uno ([DEC-037](DEC-037-configuracion-campos-tipo-contrato.md)).

Faltaba que un contrato concreto pudiera apagar el AIU.

## Decisión

- **Columna `ctr_aiu_requested`** (`tinyint(1)`, por defecto 1) en `tbl_contracts`. Con el valor por defecto 1, los contratos existentes no cambian.
- **El AIU aplica si el tipo lo declara y el contrato lo solicita.**
  - El tipo declara AIU si alguno de A, I o U aplica en su configuración (`typeAppliesAiu`).
  - Si el contrato no lo solicita, A, I y U dejan de aplicar para él (`withContractAiu`). No se capturan ni en el valor inicial ni en los otrosí ni en la liquidación, y enviarlos responde 400: "el contrato no solicita AIU".
- **Valor por defecto:** al crear, el del tipo (lo solicita si el tipo lo aplica). Al editar, el guardado. Si la petición no trae el campo, se conserva el valor por defecto.
- **Permiso 90, "Cambiar solicitud de AIU del contrato":**
  - Se exige para apartarse del valor por defecto: apagarlo o volver a encenderlo, al crear o al editar.
  - El service lo verifica con los permisos efectivos, bajo el bloqueo del tipo de contrato.
  - El cambio queda en la bitácora del contrato (`ctr_aiu_requested`).
- **No se enciende si el tipo no aplica AIU** (400).
- **No se apaga si algún concepto vigente ya pactó A, I o U mayores que 0** (409). Antes hay que llevarlos a 0 en cada concepto, con el permiso de modificar conceptos, y respetando DOM-07 tras la primera factura aprobada. No se ponen en 0 en silencio: cambiaría el valor del contrato.
- **`get_contract_fields` acepta `ctrId`.** Con él entrega los descriptores con la decisión del contrato aplicada, y el diálogo de los conceptos los usa. Además devuelve `typeAppliesAiu`, y con `ctrId` también `aiuRequested`.
- **El cálculo no cambia.** `conceptAmounts` decide el IVA según A, I y U del concepto. Sin AIU, quedan en 0 y el IVA va sobre el costo directo.

## Descartado

- **Apagarlo solo en el tipo:** para un contrato puntual sin AIU haría falta un tipo de contrato aparte.
- **Poner A, I y U en 0 al apagar:** cambia el valor vigente del contrato sin que nadie lo pacte, y puede chocar con DOM-07.

## Qué implica

- Todo acto que capture porcentajes de un concepto resuelve los descriptores con `withContractAiu(…, contract.ctr_aiu_requested)`, como `configuredConcept`.
- Un formulario de concepto pide los campos con `ctrId`, no solo con `cttId`.

## Dónde

- Migraciones: `database/migrations/0073` (columna) y `0074` (permiso 90).
- Servidor:
  - `contractFields.js`: `AIU_FIELDS`, `typeAppliesAiu` y `withContractAiu`, y el motivo propio en `enforceFields`.
  - `contracts.service.js`: `resolveAiuRequested` y `hasAgreedAiu`.
  - `contractConcepts.service.js`: `configuredConcept`.
  - `PERMISSIONS.work.contracts.changeAiu`.
- Cliente:
  - La casilla "Solicita AIU" en `ContractFormPage.jsx`.
  - `withContractAiu` en `configurableFields.jsx`.
  - `ConceptDialog.jsx` pide los campos con `ctrId`.
  - La fila "AIU" en el detalle del contrato.
- Tests: `contracts.service.test.js`, `contractConcepts.service.test.js` y `contractFields.test.js`, en sus bloques de AIU.
