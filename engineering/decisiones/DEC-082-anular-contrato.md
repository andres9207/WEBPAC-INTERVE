# DEC-082 — Anular un contrato desde cualquier estado, con permiso propio

**Fecha:** 2026-10-26 · **Tipo:** Obligatoria · **ADR:** [0017](../adr/0017-estados-contrato.md)

Decidido por el usuario el 2026-10-26, a partir del documento de alcance de Intervé (punto 1.7, "Estado del contrato": en ejecución, en liquidación, liquidado, suspendido y **anulado**). Se aparta del ADR-0017, que declara cuatro estados.

## Contexto

- El documento de alcance lista "Anulado" entre los estados del contrato; el sistema tenía cuatro (DEC-035) y ninguna forma de dar de baja un contrato con facturas: eliminar responde 409 si las tiene (ADR-0015, decisión 11).

## Decisión

- **Estado nuevo `CANCELLED` ("Anulado")**, final: el contrato anulado solo se consulta (`STATE_ALLOWS.CANCELLED = []`). No se registran ni se anulan facturas, pólizas ni otrosí sobre él.
- **Transición `cancel`, manual**, desde cualquier estado: en ejecución, suspendido, en liquidación y liquidado. **También con facturas aprobadas**: sus facturas, pólizas y suspensiones quedan como estaban, como evidencia; no se revierte ningún saldo.
- **Permiso propio**: 117 "Anular contrato" (`PERMISSIONS.work.contracts.cancel`).
- **Motivo y observación obligatorios**: el motivo, del catálogo único con el ámbito nuevo `CONTRACT_CANCEL` (DEC-039); los dos quedan en el historial de estado y en la bitácora.
- Idempotente por la clave del historial de estado (DEC-016), con bloqueo contrato → motivo (DEC-019), y aviso a los responsables activos de la obra después del COMMIT, como la suspensión.
- Los avisos de pólizas por vencer y la pestaña "Pólizas por vencer" excluyen los anulados, como los liquidados.

## Descartado

- Revertir saldos o anular en cascada las facturas aprobadas: el usuario pidió anular con facturas aprobadas, y son evidencia de lo pagado.
- Limitar la anulación a ciertos estados: el usuario pidió poder anular "cuando quiera", con el permiso.

## Qué implica

- Un acto nuevo sobre el contrato se declara en `STATE_ALLOWS` sin incluir `CANCELLED`.
- Un listado o un cron que excluya los liquidados porque "ya no se operan" debe excluir también los anulados.

## Dónde

Migración `0117_contract_cancel.sql` (CHECK de estado y de historial, ámbito de motivo, permiso 117) · `server/src/modules/work/contracts/contractTerms.js` (`CANCELLED`, `cancel`, `STATE_ALLOWS`), `contractCancellation.service.js`, `contracts.routes.js` (`cancel_contract`), `contracts.validation.js`, `expirationNotice.service.js` · Cliente: `views/work/contracts/components/CancelContractDialog.jsx`, `ContractDetailPage.jsx`, `utils/constants.js` · Tests: `contractCancellation.service.test.js`, `contractTerms.test.js`.
