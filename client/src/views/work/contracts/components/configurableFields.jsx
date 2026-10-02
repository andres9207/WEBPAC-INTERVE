import PropTypes from 'prop-types';

import PercentField from 'ui-component/extended/PercentField';
import SearchSelect from 'ui-component/extended/SearchSelect';

/**
 * Campos configurables del contrato en el cliente (ADR-0006, DEC-037). El
 * servidor entrega los descriptores (`get_contract_fields`) y estas funciones
 * los traducen a campos de GenericFormSection. El cliente no deduce la
 * configuración: solo decide cómo se ve.
 *
 * - Se muestran los campos que aplican y son visibles, en el orden recibido.
 * - Un campo que no aplica pero tiene un valor guardado es HEREDADO de una
 *   configuración anterior: se muestra en solo lectura, marcado (decisión 8).
 * - Al guardar se envían solo los campos visibles. Los ocultos los resuelve el
 *   servidor (valor por defecto o el guardado), y un heredado que no se envía
 *   conserva su valor.
 */

/** Clave del catálogo → nombre del campo en el formulario y en la petición. */
export const FIELD_INPUTS = {
  STAGE: 'wksId',
  OBSERVATION: 'observation',
  CONCEPT_DESCRIPTION: 'description',
  ADMIN_PCT: 'adminPct',
  CONTINGENCY_PCT: 'contingencyPct',
  PROFIT_PCT: 'profitPct',
  VAT_PCT: 'vatPct',
  ADVANCE_PCT: 'advancePct',
  RETENTION_PCT: 'retentionPct'
};

const PERCENT = /^\d{1,3}(\.\d{1,2})?$/;

/** ¿Hay un valor guardado que cuente? Un porcentaje en 0 es lo que guarda la BD cuando el campo no aplica. */
const hasValue = (dataType, value) => {
  if (value === null || value === undefined || String(value).trim() === '') return false;
  return dataType === 'PERCENT' || dataType === 'SELECT' ? Number(value) !== 0 : true;
};

/**
 * Campos a mostrar de un grupo: `{ ...descriptor, name, inherited }`.
 * `stored`: valores guardados del registro que se edita (por nombre de campo), o null al crear.
 */
export const shownFields = (descriptors, group, stored = null, { skip = [] } = {}) =>
  (descriptors ?? [])
    .filter((d) => d.group === group && !skip.includes(d.key) && FIELD_INPUTS[d.key])
    .map((d) => ({ ...d, name: FIELD_INPUTS[d.key], inherited: !d.applies && hasValue(d.dataType, stored?.[FIELD_INPUTS[d.key]]) }))
    .filter((d) => (d.applies && d.visible) || d.inherited);

/** Valores a enviar de los campos visibles (los demás los decide el servidor). */
export const visiblePayload = (descriptors, group, form, { skip = [] } = {}) =>
  Object.fromEntries(
    (descriptors ?? [])
      .filter((d) => d.group === group && d.applies && d.visible && !skip.includes(d.key) && FIELD_INPUTS[d.key])
      .map((d) => [FIELD_INPUTS[d.key], form?.[FIELD_INPUTS[d.key]] ?? ''])
  );

function ConfigSelect({ value, onChange, onBlur, options, loading, label, required, error, helperText, disabled }) {
  return (
    <SearchSelect
      value={value ?? ''}
      onChange={(next) => onChange(next ?? '')}
      onBlur={onBlur}
      options={options ?? []}
      loading={loading}
      label={label}
      required={required}
      disabled={disabled}
      error={error?.message}
      helperText={helperText}
    />
  );
}

ConfigSelect.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  options: PropTypes.array,
  loading: PropTypes.bool,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.object,
  helperText: PropTypes.string,
  disabled: PropTypes.bool
};

function ConfigPercent({ value, onChange, onBlur, label, required, error, helperText, disabled }) {
  return (
    <PercentField
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      label={label}
      required={required}
      disabled={disabled}
      error={error?.message}
      helperText={helperText}
    />
  );
}

ConfigPercent.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.object,
  helperText: PropTypes.string,
  disabled: PropTypes.bool
};

const INHERITED = 'Heredado de una configuración anterior: ya no aplica para este tipo';

/**
 * Campos mostrados → descriptores de GenericFormSection.
 * @param {object} options  `prefix` (p. ej. "initialConcept."), `grid` por tipo de dato y, para la lista, `selectProps` (opciones, carga, ayuda).
 */
export const toFormFields = (fields, { prefix = '', grid = {}, selectProps = {}, disabled = false } = {}) =>
  fields.map((field) => {
    const label = field.inherited ? `${field.label} (heredado)` : field.label;
    const required = field.required && !field.inherited;
    const base = {
      key: field.key,
      name: `${prefix}${field.name}`,
      label,
      required,
      disabled: disabled || field.inherited,
      grid: grid[field.dataType] ?? { xs: 12 }
    };
    const requiredRule = required ? { required: `${field.label}: es obligatorio.` } : {};

    if (field.dataType === 'PERCENT') {
      return {
        ...base,
        type: 'custom',
        component: ConfigPercent,
        hideLabel: true,
        props: { label, required, helperText: field.inherited ? INHERITED : undefined },
        validation: {
          ...requiredRule,
          validate: (value) => {
            if (value === '' || value === null || value === undefined) return true;
            if (!PERCENT.test(String(value))) return 'Porcentaje no válido.';
            return Number(value) <= 100 || 'Debe estar entre 0 y 100.';
          }
        }
      };
    }
    if (field.dataType === 'SELECT') {
      return {
        ...base,
        type: 'custom',
        component: ConfigSelect,
        hideLabel: true,
        props: { label, required, ...selectProps, ...(field.inherited ? { helperText: INHERITED } : {}) },
        validation: requiredRule
      };
    }
    // TEXT y TEXTAREA: texto largo.
    return { ...base, type: 'textarea', validation: requiredRule };
  });
