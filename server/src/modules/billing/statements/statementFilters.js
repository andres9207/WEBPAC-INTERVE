// Filtros del listado de extractos que no son de una columna: "con facturas
// aprobadas sin comprobante de egreso" o "sin ninguna", y "con glosas
// levantadas en él" o "sin ninguna". Los comparten la validación y el service.
export const STATEMENT_VOUCHER_FILTERS = Object.freeze({ MISSING: "MISSING", NONE: "NONE" });
export const STATEMENT_GLOSS_FILTERS = Object.freeze({ WITH: "WITH", WITHOUT: "WITHOUT" });
