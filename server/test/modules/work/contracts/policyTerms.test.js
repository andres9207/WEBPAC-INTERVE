import {
  CONTRACT_POLICY_STATUS,
  POLICY_VALIDITY,
  assertPolicyStatus,
  contractPolicyStatus,
  decidingPolicy,
  policyExposure,
  policyValidity,
  uncoveredConcepts,
  uncoveredContractsWhere,
} from "../../../../src/modules/work/contracts/policyTerms.js";

// Vigencia y cobertura de pólizas (ADR-0018, ADR-0002; DEC-050): contra la
// fecha del servidor, con "sin fecha" como categoría explícita.

const today = new Date(Date.UTC(2026, 9, 7));

describe("policyValidity", () => {
  it("sin fecha fin es su propia categoría, nunca vigente", () => {
    expect(policyValidity(null, { today, days: 30 })).toBe(POLICY_VALIDITY.NO_DATE);
  });

  it("vencida, a vencer dentro del umbral (incluido el último día) y vigente después", () => {
    expect(policyValidity("2026-10-06", { today, days: 30 })).toBe(POLICY_VALIDITY.EXPIRED);
    expect(policyValidity("2026-10-07", { today, days: 30 })).toBe(POLICY_VALIDITY.EXPIRING);
    expect(policyValidity("2026-11-06", { today, days: 30 })).toBe(POLICY_VALIDITY.EXPIRING);
    expect(policyValidity("2026-11-07", { today, days: 30 })).toBe(POLICY_VALIDITY.ACTIVE);
  });
});

describe("policyValidity sin umbral", () => {
  it("usa 30 días, el valor por defecto de la regla de negocio (DEC-072)", () => {
    expect(policyValidity("2026-11-06", { today })).toBe(POLICY_VALIDITY.EXPIRING);
    expect(policyValidity("2026-11-07", { today })).toBe(POLICY_VALIDITY.ACTIVE);
  });
});

describe("uncoveredConcepts", () => {
  it("los conceptos sin ninguna póliza vigente", () => {
    const concepts = [{ ccp_id: 1 }, { ccp_id: 2 }, { ccp_id: 3 }];
    expect(uncoveredConcepts(concepts, [{ ccp_id: 2 }, { ccp_id: 2 }]).map((c) => c.ccp_id)).toEqual([1, 3]);
  });
});

// ─── Estado de pólizas del contrato (DEC-052, DEC-064) ──────────────────────
// Evaluador mínimo de filtros Prisma sobre datos en memoria: cruza
// `uncoveredContractsWhere` con `uncoveredConcepts`. La categoría de pólizas
// ya no tiene filtro Prisma: la regla es una sola, en JS (DEC-064).

const compare = (value, condition) => {
  if (condition === null || typeof condition !== "object" || condition instanceof Date) {
    return condition instanceof Date ? value?.getTime() === condition.getTime() : value === condition;
  }
  return Object.entries(condition).every(([op, operand]) => {
    if (op === "not") return operand === null ? value !== null && value !== undefined : value !== operand;
    if (value === null || value === undefined) return false; // como NULL en SQL
    const a = value.getTime ? value.getTime() : value;
    const b = operand.getTime ? operand.getTime() : operand;
    return { lt: a < b, lte: a <= b, gt: a > b, gte: a >= b }[op];
  });
};

const matches = (row, where) =>
  Object.entries(where).every(([key, condition]) => {
    if (key === "AND") return condition.every((part) => matches(row, part));
    if (condition && (condition.some || condition.none)) {
      const items = row[key] ?? [];
      return condition.some ? items.some((item) => matches(item, condition.some)) : !items.some((item) => matches(item, condition.none));
    }
    return compare(row[key], condition);
  });

describe("contractPolicyStatus: manda la póliza de mayor exposición (DEC-064)", () => {
  const days = 30;
  const options = { today, days };
  const at = (offset) => (offset === null ? null : new Date(today.getTime() + offset * 24 * 60 * 60 * 1000));
  // Dos conceptos: el inicial de 100 000 000 de costo directo y un otrosí de 10 000 000, sin AIU ni IVA.
  const concept = (ccpId, directCost) => ({
    ccp_id: ccpId,
    ccp_direct_cost: directCost,
    ccp_admin_pct: "0",
    ccp_contingency_pct: "0",
    ccp_profit_pct: "0",
    ccp_vat_pct: "0",
    ccp_advance_pct: "0",
    ccp_retention_pct: "0",
  });
  const concepts = [concept(1, "100000000.00"), concept(2, "10000000.00")];
  // Póliza: concepto, porcentaje y días hasta su fin (null, sin fecha). Base: costo directo.
  const p = (ccpId, percentage, offset) => ({ ccp_id: ccpId, pol_base: "DIRECT_COST", pol_percentage: percentage, pol_end_date: at(offset) });
  const status = (policies) => contractPolicyStatus(policies, concepts, options);

  it("la de mayor valor asegurado decide, aunque otra más pequeña esté vencida", () => {
    // 10 % de 100 M (10 M, vigente) frente a 50 % de 10 M (5 M, vencida).
    expect(status([p(1, "10", days + 5), p(2, "50", -1)])).toBe(CONTRACT_POLICY_STATUS.ACTIVE);
    expect(status([p(1, "10", -1), p(2, "50", days + 5)])).toBe(CONTRACT_POLICY_STATUS.EXPIRED);
    expect(status([p(2, "50", 10), p(1, "1", -1)])).toBe(CONTRACT_POLICY_STATUS.EXPIRING);
  });

  it("si la mayor no tiene fecha, el contrato queda sin fecha de vigencia", () => {
    expect(status([p(1, "10", null), p(2, "10", -1)])).toBe(CONTRACT_POLICY_STATUS.NO_DATE);
  });

  it("entre empatadas manda la de peor estado; sin fecha es la última", () => {
    // 10 % de 100 M = 100 % de 10 M.
    expect(status([p(1, "10", days + 5), p(2, "100", -1)])).toBe(CONTRACT_POLICY_STATUS.EXPIRED);
    expect(status([p(1, "10", days + 5), p(2, "100", 10)])).toBe(CONTRACT_POLICY_STATUS.EXPIRING);
    expect(status([p(1, "10", null), p(2, "100", days + 5)])).toBe(CONTRACT_POLICY_STATUS.ACTIVE);
  });

  it("sin pólizas vigentes, sin póliza", () => {
    expect(status([])).toBe(CONTRACT_POLICY_STATUS.NONE);
    expect(decidingPolicy([], concepts, options)).toBeNull();
  });

  it("la exposición es el valor asegurado del expediente, sobre la base del tipo", () => {
    const withAiu = { ...concept(3, "100.00"), ccp_admin_pct: "10", ccp_vat_pct: "19" };
    expect(policyExposure({ pol_base: "TAXABLE_BASE", pol_percentage: "50" }, withAiu).toFixed(2)).toBe("55.00");
    const deciding = decidingPolicy([p(2, "50", -1), p(1, "10", 40)], concepts, options);
    expect(deciding).toMatchObject({ validity: POLICY_VALIDITY.ACTIVE, policy: { ccp_id: 1 } });
    expect(deciding.exposure.toFixed(2)).toBe("10000000.00");
  });

  it("todo contrato cae en exactamente una categoría del catálogo", () => {
    const ENDS = [null, -1, 0, days, days + 1];
    const POOL = ENDS.flatMap((end) => [p(1, "10", end), p(2, "100", end), p(2, "5", end)]);
    for (const a of POOL) {
      for (const b of POOL) expect(Object.values(CONTRACT_POLICY_STATUS)).toContain(status([a, b]));
    }
  });

  it("un estado desconocido responde 400", () => {
    expect(() => assertPolicyStatus("OTHER")).toThrow(expect.objectContaining({ statusCode: 400 }));
    expect(assertPolicyStatus("EXPIRED")).toBe("EXPIRED");
  });
});

describe("uncoveredContractsWhere", () => {
  it("coincide con uncoveredConcepts: algún concepto no eliminado sin póliza vigente", () => {
    const concept = (ccpId, staId, policies) => ({ ccp_id: ccpId, sta_id: staId, tbl_policies: policies });
    const current = { ccp_id: 1, pol_is_current: true };
    const cases = [
      [concept(1, 1, [current])],
      [concept(1, 1, [current]), concept(2, 1, [])],
      [concept(1, 1, [current]), concept(2, 3, [])],
      [concept(2, 1, [{ ccp_id: 2, pol_is_current: false }])],
      [],
    ];
    for (const concepts of cases) {
      const live = concepts.filter((c) => c.sta_id !== 3);
      const currentPolicies = concepts.flatMap((c) => c.tbl_policies.filter((x) => x.pol_is_current).map(() => ({ ccp_id: c.ccp_id })));
      const expected = uncoveredConcepts(live, currentPolicies).length > 0;
      expect(matches({ tbl_contract_concepts: concepts }, uncoveredContractsWhere())).toBe(expected);
    }
  });
});
