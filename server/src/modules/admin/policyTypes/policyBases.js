import { decimal, percentOf } from "../../../common/utils/money.utils.js";

/**
 * Bases de cálculo de una póliza (ADR-0019, decisión 3; DEC-050). Dominio
 * cerrado: el mismo CHECK en tbl_policy_types.plt_base y tbl_policies.pol_base
 * (migraciones 0078 y 0081). Qué base usa cada tipo lo decide quien configura
 * el tipo: el sistema no supone ninguna (backlog DEC-04).
 */
export const POLICY_BASES = Object.freeze({
  DIRECT_COST: "DIRECT_COST",
  TAXABLE_BASE: "TAXABLE_BASE",
  TOTAL_VALUE: "TOTAL_VALUE",
  VAT_ONLY: "VAT_ONLY",
});

export const POLICY_BASE_NAMES = Object.freeze({
  DIRECT_COST: "Costo directo",
  TAXABLE_BASE: "Base gravable",
  TOTAL_VALUE: "Valor total",
  VAT_ONLY: "Solo IVA",
});

/**
 * Valor de la base sobre el concepto amparado. `amounts` es la composición
 * del concepto (`conceptAmounts`, contractTerms.js): la base se toma de ella,
 * sin recalcular nada. Única función de evaluación, compartida por pólizas y,
 * cuando exista, por el módulo de cálculo (ADR-0026).
 */
export const policyBaseValue = (base, amounts) => {
  switch (base) {
    case POLICY_BASES.DIRECT_COST:
      return decimal(amounts.directCost);
    case POLICY_BASES.TAXABLE_BASE:
      return decimal(amounts.base);
    case POLICY_BASES.TOTAL_VALUE:
      return decimal(amounts.value);
    case POLICY_BASES.VAT_ONLY:
      return decimal(amounts.vat);
    default:
      throw new Error(`[policyBases] base desconocida "${base}"`);
  }
};

/** Valor asegurado: porcentaje de la póliza sobre su base, con la regla única de redondeo (DEC-045). Nunca se guarda. */
export const insuredValue = (base, percentage, amounts) => percentOf(policyBaseValue(base, amounts), percentage);
