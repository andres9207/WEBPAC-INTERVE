# DEC-036 — Conceptos contractuales: sin costo negativo, anticipo como porcentaje (15 % por defecto) y valor derivado

**Fecha:** 2026-10-02 · **Tipo:** Vigente · **ADR:** [0016](../adr/0016-conceptos-contractuales.md), [0026](../adr/0026-calculos-facturacion.md)

Resuelve la decisión de negocio DEC-18 del backlog y, en parte, DEC-05 (el porcentaje de anticipo por defecto). Decidido por el usuario el 2026-10-02.

## Decisión

- **Una tabla para los tres actos** (`tbl_contract_concepts`, `ccp_type` = `INITIAL`, `AMENDMENT`, `LIQUIDATION`). Uno y solo un valor inicial (se crea con el contrato) y a lo sumo un otrosí de liquidación: `UNIQUE` sobre columnas generadas.
- **Costo directo no negativo en todos los actos, también en la liquidación** (`CHECK`). Un ajuste a la baja no se registra como liquidación negativa.
- **Anticipo solo como porcentaje**; su valor se deriva. **15 % por defecto en el formulario, editable** en cada acto. Retenido 0 % e IVA 19 % por defecto, también editables. Porcentajes `DECIMAL(5,2)` entre 0 y 100.
- **Cada acto pacta sus porcentajes** (AIU desagregado, IVA, anticipo, retenido); no se heredan.
- **El número de otrosí lo asigna el servidor** bajo bloqueo del contrato (máximo + 1, sin reutilizar); el de liquidación no lleva número.
- **Crear el otrosí de liquidación pasa el contrato a `IN_LIQUIDATION`** en la misma transacción, con historial. Desde ahí no hay otros otrosí ni edición del contrato; solo se puede modificar el concepto de liquidación.
- **Cronología:** la fecha de un concepto no queda antes de la del anterior ni después de la del siguiente (orden: valor inicial, otrosí por número, liquidación). La fecha del valor inicial es la del contrato.
- **Valor derivado, nunca guardado** (`conceptAmounts`, `contractTotals`), con la composición **propuesta** de ADR-0026: con AIU (A, I o U > 0) el IVA va sobre la utilidad; sin AIU, sobre el costo directo. Anticipo y retenido sobre la base (costo directo + AIU). Cada componente se redondea a dos decimales, medio hacia arriba. **Pendiente de validación tributaria** (backlog DEC-03): si cambia, cambia solo `conceptAmounts`.
- **Los conceptos no se eliminan.** La anulación de un otrosí sigue pendiente (ADR-0016, B12).

## Dónde

`database/migrations/0050` · `server/src/modules/work/contracts/contractTerms.js` y `contractConcepts.service.js` · `client/src/views/work/contracts/components/` (`ConceptFields`, `ConceptDialog`, `ConceptsTab`)
