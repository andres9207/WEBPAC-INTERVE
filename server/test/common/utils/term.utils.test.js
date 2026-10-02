import {
  addTerm,
  dateOnlyText,
  progressLevel,
  termProgress,
  toDateOnly,
  todayDateOnly,
  TERM_UNITS,
} from "../../../src/common/utils/term.utils.js";

// Plazos (DEC-030): fecha de inicio + plazo en días, meses o años.

describe("toDateOnly", () => {
  it("convierte AAAA-MM-DD a medianoche UTC", () => {
    expect(toDateOnly("2026-03-15").toISOString()).toBe("2026-03-15T00:00:00.000Z");
  });

  it("rechaza fechas que no existen y formatos distintos", () => {
    expect(toDateOnly("2026-02-30")).toBeNull();
    expect(toDateOnly("15/03/2026")).toBeNull();
    expect(toDateOnly("")).toBeNull();
    expect(toDateOnly(null)).toBeNull();
  });
});

describe("dateOnlyText", () => {
  it("devuelve AAAA-MM-DD o null", () => {
    expect(dateOnlyText(new Date("2026-03-15T00:00:00Z"))).toBe("2026-03-15");
    expect(dateOnlyText(null)).toBeNull();
  });
});

describe("addTerm", () => {
  it("suma días, meses y años", () => {
    expect(addTerm("2026-01-10", 30, "DIA")).toBe("2026-02-09");
    expect(addTerm("2026-01-10", 14, "MES")).toBe("2027-03-10");
    expect(addTerm("2026-01-10", 2, "ANIO")).toBe("2028-01-10");
  });

  it("si el mes de destino es más corto, cae en su último día", () => {
    expect(addTerm("2026-01-31", 1, "MES")).toBe("2026-02-28");
    expect(addTerm("2027-01-31", 13, "MES")).toBe("2028-02-29");
    expect(addTerm("2028-02-29", 1, "ANIO")).toBe("2029-02-28");
  });

  it("acepta un Date de una columna DATE", () => {
    expect(addTerm(new Date("2026-01-10T00:00:00Z"), 1, "MES")).toBe("2026-02-10");
  });

  it("sin fecha, plazo o unidad válidos devuelve null", () => {
    expect(addTerm(null, 1, "MES")).toBeNull();
    expect(addTerm("2026-01-10", -1, "MES")).toBeNull();
    expect(addTerm("2026-01-10", 1.5, "MES")).toBeNull();
    expect(addTerm("2026-01-10", 1, "SEMANA")).toBeNull();
  });

  it("las unidades son las del contrato (ADR-0015)", () => {
    expect(TERM_UNITS).toEqual(["DIA", "MES", "ANIO"]);
  });
});

// DEC-033: avance del plazo calculado en el servidor.
describe("todayDateOnly", () => {
  it("toma la fecha local del servidor y la deja a medianoche UTC", () => {
    expect(todayDateOnly(new Date(2026, 9, 2, 23, 30)).toISOString()).toBe("2026-10-02T00:00:00.000Z");
  });
});

describe("termProgress", () => {
  const today = toDateOnly("2026-01-11");

  it("es el porcentaje de días transcurridos, redondeado", () => {
    expect(termProgress("2026-01-01", "2026-01-21", today)).toBe(50);
    expect(termProgress("2026-01-01", "2026-01-04", toDateOnly("2026-01-02"))).toBe(33);
  });

  it("antes del inicio es 0 y después del final es 100", () => {
    expect(termProgress("2026-02-01", "2026-03-01", today)).toBe(0);
    expect(termProgress("2025-01-01", "2025-12-31", today)).toBe(100);
  });

  it("con plazo de cero días es 0 antes del final y 100 desde el final", () => {
    expect(termProgress("2026-01-20", "2026-01-20", today)).toBe(0);
    expect(termProgress("2026-01-11", "2026-01-11", today)).toBe(100);
  });

  it("acepta un Date de una columna DATE", () => {
    expect(termProgress(new Date("2026-01-01T00:00:00Z"), "2026-01-21", today)).toBe(50);
  });

  it("sin alguna de las fechas devuelve null", () => {
    expect(termProgress(null, "2026-01-21", today)).toBeNull();
    expect(termProgress("2026-01-01", null, today)).toBeNull();
  });
});

describe("progressLevel", () => {
  it("normal por debajo de 70, alerta desde 70 y crítico desde 90", () => {
    expect(progressLevel(0)).toBe("NORMAL");
    expect(progressLevel(69)).toBe("NORMAL");
    expect(progressLevel(70)).toBe("WARNING");
    expect(progressLevel(89)).toBe("WARNING");
    expect(progressLevel(90)).toBe("CRITICAL");
    expect(progressLevel(100)).toBe("CRITICAL");
  });

  it("sin avance no tiene nivel", () => {
    expect(progressLevel(null)).toBeNull();
  });
});
