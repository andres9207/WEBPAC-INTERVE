import { POLICY_VALIDITY, expiringDays, policyValidity, uncoveredConcepts } from "../../../../src/modules/work/contracts/policyTerms.js";

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
