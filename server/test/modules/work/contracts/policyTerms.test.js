import {
  CONTRACT_POLICY_STATUS,
  POLICY_VALIDITY,
  contractPolicyStatus,
  contractPolicyStatusWhere,
  expiringDays,
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

describe("expiringDays", () => {
  afterEach(() => {
    delete process.env.POLICY_EXPIRING_DAYS;
  });

  it("toma el umbral de POLICY_EXPIRING_DAYS, o 30 si no es un entero positivo", () => {
    expect(expiringDays()).toBe(30);
    process.env.POLICY_EXPIRING_DAYS = "45";
    expect(expiringDays()).toBe(45);
    process.env.POLICY_EXPIRING_DAYS = "-1";
    expect(expiringDays()).toBe(30);
  });
});

describe("uncoveredConcepts", () => {
  it("los conceptos sin ninguna póliza vigente", () => {
    const concepts = [{ ccp_id: 1 }, { ccp_id: 2 }, { ccp_id: 3 }];
    expect(uncoveredConcepts(concepts, [{ ccp_id: 2 }, { ccp_id: 2 }]).map((c) => c.ccp_id)).toEqual([1, 3]);
  });
});

// ─── Estado de pólizas del contrato (DEC-052) ───────────────────────────────
// La clasificación en JS (expediente) y el filtro Prisma (tablero y listado)
// son dos expresiones de la misma regla: este evaluador mínimo aplica el
// filtro a datos en memoria para cruzarlas (PRO-BE-34, criterio 5).

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

describe("contractPolicyStatus y contractPolicyStatusWhere", () => {
  const days = 30;
  const options = { today, days };
  const at = (offset) => (offset === null ? null : new Date(today.getTime() + offset * 24 * 60 * 60 * 1000));
  // Bordes de policyValidity: ayer, hoy, el último día del umbral, el siguiente y sin fecha.
  const ENDS = [null, -1, 0, days, days + 1];
  const POOL = ENDS.flatMap((end) => [true, false].map((current) => ({ pol_end_date: at(end), pol_is_current: current })));

  const combos = [[]];
  for (const a of POOL) {
    combos.push([a]);
    for (const b of POOL) {
      combos.push([a, b]);
      for (const c of POOL) combos.push([a, b, c]);
    }
  }

  it("cada contrato cae en una sola categoría SQL, la misma que da la regla en JS", () => {
    for (const policies of combos) {
      const expected = contractPolicyStatus(
        policies.filter((p) => p.pol_is_current),
        options
      );
      const hits = Object.values(CONTRACT_POLICY_STATUS).filter((status) => matches({ tbl_policies: policies }, contractPolicyStatusWhere(status, options)));
      expect({ policies, hits }).toEqual({ policies, hits: [expected] });
    }
    expect(combos.length).toBeGreaterThan(1000);
  });

  it("manda el peor estado; sin fecha solo si ninguna la tiene; las anuladas no cuentan", () => {
    const p = (offset, current = true) => ({ pol_end_date: at(offset), pol_is_current: current });
    const status = (policies) => contractPolicyStatus(policies.filter((x) => x.pol_is_current), options);
    expect(status([p(-1), p(days + 5)])).toBe(CONTRACT_POLICY_STATUS.EXPIRED);
    expect(status([p(10), p(days + 5)])).toBe(CONTRACT_POLICY_STATUS.EXPIRING);
    expect(status([p(null), p(days + 5)])).toBe(CONTRACT_POLICY_STATUS.ACTIVE);
    expect(status([p(null)])).toBe(CONTRACT_POLICY_STATUS.NO_DATE);
    expect(status([p(-1, false)])).toBe(CONTRACT_POLICY_STATUS.NONE);
  });

  it("un estado desconocido responde 400", () => {
    expect(() => contractPolicyStatusWhere("OTHER", options)).toThrow(expect.objectContaining({ statusCode: 400 }));
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
