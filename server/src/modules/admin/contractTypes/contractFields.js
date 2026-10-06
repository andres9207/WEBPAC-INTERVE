import { decimal } from "../../../common/utils/money.utils.js";

/**
 * Campos configurables del contrato (ADR-0006, DEC-037): reglas puras, sin BD.
 *
 * - CONFIGURABLE_FIELDS es la otra mitad del catálogo cerrado: la tabla
 *   tbl_contract_fields dice qué campos hay (clave, etiqueta, tipo de dato,
 *   grupo) y esto dice a qué entrada y columna corresponde cada clave. Un
 *   test verifica que las claves de la migración 0053 y las de aquí son las
 *   mismas (riesgo "deriva entre catálogo y columnas" de ADR-0006).
 * - `resolveFields` es la ÚNICA resolución de la configuración. La consumen
 *   el endpoint que entrega los descriptores al formulario y la validación
 *   del guardado (`enforceFields`), así que no pueden divergir (ADR-0006,
 *   decisiones 5 y 6).
 * - Por defecto restrictivo: un campo sin configuración no aplica.
 */

export const FIELD_GROUPS = Object.freeze({ CONTRACT: "CONTRACT", CONCEPT: "CONCEPT" });

const percent = (input, column, defaultValue) => ({ group: FIELD_GROUPS.CONCEPT, input, column, kind: "percent", defaultValue });

/** Clave del catálogo → entrada del formulario, columna y valor por defecto (el que toma si aplica pero no se muestra). */
export const CONFIGURABLE_FIELDS = Object.freeze({
  STAGE: { group: FIELD_GROUPS.CONTRACT, input: "wksId", column: "wks_id", kind: "id", defaultValue: null },
  OBSERVATION: { group: FIELD_GROUPS.CONTRACT, input: "observation", column: "ctr_observation", kind: "text", defaultValue: null },
  CONCEPT_DESCRIPTION: { group: FIELD_GROUPS.CONCEPT, input: "description", column: "ccp_description", kind: "text", defaultValue: null },
  // Anticipo 15 % (DEC-036) e IVA 19 % por defecto; el resto, 0.
  ADMIN_PCT: percent("adminPct", "ccp_admin_pct", "0"),
  CONTINGENCY_PCT: percent("contingencyPct", "ccp_contingency_pct", "0"),
  PROFIT_PCT: percent("profitPct", "ccp_profit_pct", "0"),
  VAT_PCT: percent("vatPct", "ccp_vat_pct", "19"),
  ADVANCE_PCT: percent("advancePct", "ccp_advance_pct", "15"),
  RETENTION_PCT: percent("retentionPct", "ccp_retention_pct", "0"),
});

const httpError = (statusCode, message) => Object.assign(new Error(message), { statusCode });

const isBlank = (value) => value === null || value === undefined || String(value).trim() === "";

/** ¿Tiene un valor que cuente? Un porcentaje en 0 es "sin valor": es lo que guarda la BD cuando no aplica. */
const hasValue = (kind, value) => {
  if (isBlank(value)) return false;
  if (kind === "percent") return !decimal(value).isZero();
  if (kind === "id") return Number(value) !== 0;
  return true;
};

const sameValue = (kind, a, b) => {
  if (kind === "text") return String(a ?? "").trim() === String(b ?? "").trim();
  if (kind === "percent") return decimal(a).eq(decimal(b));
  return Number(a ?? 0) === Number(b ?? 0);
};

/** Valor de la columna → valor de entrada (Decimal → "19", etc.). */
const fromColumn = (value) => (value === null || value === undefined ? null : String(value));

/**
 * Configuración resuelta: un descriptor por campo del catálogo que el código
 * conoce, ordenado por grupo y orden. `rows` son las filas de configuración
 * normalizadas `{ cfd_id, applies, visible, required, order }` (de la
 * configuración actual o de una versión). La jerarquía se aplica aquí
 * también: no aplica ⇒ ni visible ni obligatorio; oculto ⇒ no obligatorio.
 */
export const resolveFields = (catalog, rows) => {
  const byField = new Map(rows.map((row) => [row.cfd_id, row]));
  return catalog
    .filter((field) => CONFIGURABLE_FIELDS[field.cfd_key])
    .map((field) => {
      const row = byField.get(field.cfd_id);
      const applies = Boolean(row?.applies);
      const visible = applies && Boolean(row.visible);
      const required = visible && Boolean(row.required);
      return {
        cfdId: field.cfd_id,
        key: field.cfd_key,
        label: field.cfd_label,
        dataType: field.cfd_data_type,
        group: field.cfd_group,
        applies,
        visible,
        required,
        order: row ? row.order : field.cfd_order,
        defaultValue: CONFIGURABLE_FIELDS[field.cfd_key].defaultValue,
      };
    })
    .sort((a, b) => a.group.localeCompare(b.group) || a.order - b.order || a.cfdId - b.cfdId);
};

/**
 * Aplica la configuración resuelta a los datos que llegan del cliente, para
 * un grupo. Devuelve la entrada con los campos configurables ya decididos;
 * los demás pasan sin cambios. `before` es la fila actual (columnas) al
 * editar, o null al crear. `skip`: claves que el acto no usa (el valor
 * inicial no lleva descripción).
 *
 *   - No aplica, sin valor guardado: no se acepta valor (400, ADR-0006
 *     "Seguridad": se rechaza, no se ignora).
 *   - No aplica, con valor guardado: es un valor heredado de una
 *     configuración anterior. Se conserva tal cual (decisión 7); cambiarlo es 400.
 *   - Aplica y no se muestra: al crear, el valor por defecto; al editar, el guardado.
 *   - Aplica y obligatorio: debe venir con valor (400).
 */
export const enforceFields = ({ descriptors, group, input, before = null, skip = [] }) => {
  const output = { ...input };
  for (const descriptor of descriptors) {
    if (descriptor.group !== group || skip.includes(descriptor.key)) continue;
    const { input: name, column, kind } = CONFIGURABLE_FIELDS[descriptor.key];
    const raw = input?.[name];
    const stored = before ? fromColumn(before[column]) : null;

    if (!descriptor.applies) {
      if (hasValue(kind, stored)) {
        if (hasValue(kind, raw) && !sameValue(kind, raw, stored)) {
          throw httpError(400, `${descriptor.label}: ya no aplica para este tipo de contrato y conserva su valor heredado; no se puede cambiar.`);
        }
        output[name] = stored;
      } else {
        if (hasValue(kind, raw)) throw httpError(400, `${descriptor.label}: no aplica para este tipo de contrato.`);
        output[name] = null;
      }
    } else if (!descriptor.visible) {
      output[name] = before ? stored : descriptor.defaultValue;
    } else if (descriptor.required && (kind === "percent" ? isBlank(raw) : !hasValue(kind, raw))) {
      throw httpError(400, `${descriptor.label}: es obligatorio para este tipo de contrato.`);
    }
  }
  return output;
};
