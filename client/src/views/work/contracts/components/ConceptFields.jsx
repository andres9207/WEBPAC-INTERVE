import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import MoneyField from 'ui-component/extended/MoneyField';
import PercentField from 'ui-component/extended/PercentField';

/**
 * Datos económicos de un concepto contractual (DEC-036): costo directo, AIU
 * desagregado, IVA, anticipo y retenido. Los usan el valor inicial del
 * formulario de contrato y el diálogo de otrosí. El valor del concepto no se
 * captura ni se calcula aquí: lo deriva el servidor (FRONTEND_STANDARD,
 * regla 9).
 *
 * `prefix` anida los campos en el formulario (p. ej. "initialConcept.").
 */

const MONEY = /^\d{1,16}(\.\d{0,2})?$/;
const PERCENT = /^\d{1,3}(\.\d{1,2})?$/;

/** Valores por defecto de un concepto nuevo: anticipo 15 % (DEC-036), IVA 19 %. */
export const EMPTY_CONCEPT = {
  directCost: '',
  adminPct: '0',
  contingencyPct: '0',
  profitPct: '0',
  vatPct: '19',
  advancePct: '15',
  retentionPct: '0'
};

/** Concepto del servidor → valores del formulario. */
export const conceptToForm = (concept) =>
  Object.fromEntries(Object.keys(EMPTY_CONCEPT).map((field) => [field, concept?.[field] ?? EMPTY_CONCEPT[field]]));

const percentRules = (label) => ({
  required: `El ${label} es requerido.`,
  pattern: { value: PERCENT, message: 'Porcentaje no válido.' },
  validate: (value) => Number(value) <= 100 || 'Debe estar entre 0 y 100.'
});

const PERCENTS = [
  ['adminPct', 'Administración', 'porcentaje de administración'],
  ['contingencyPct', 'Imprevistos', 'porcentaje de imprevistos'],
  ['profitPct', 'Utilidad', 'porcentaje de utilidad'],
  ['vatPct', 'IVA', 'porcentaje de IVA'],
  ['advancePct', 'Anticipo', 'porcentaje de anticipo'],
  ['retentionPct', 'Retenido', 'porcentaje de retenido']
];

export default function ConceptFields({ control, prefix = '' }) {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Controller
          name={`${prefix}directCost`}
          control={control}
          rules={{ required: 'El costo directo es requerido.', pattern: { value: MONEY, message: 'Importe no válido.' } }}
          render={({ field, fieldState }) => (
            <MoneyField
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              label="Costo directo"
              required
              error={fieldState.error?.message}
            />
          )}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 8 }} sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          Cada acto pacta sus propios porcentajes: no se heredan del contrato ni del concepto anterior.
        </Typography>
      </Grid>
      {PERCENTS.map(([name, label, ruleLabel]) => (
        <Grid key={name} size={{ xs: 6, sm: 4, md: 2 }}>
          <Controller
            name={`${prefix}${name}`}
            control={control}
            rules={percentRules(ruleLabel)}
            render={({ field, fieldState }) => (
              <PercentField
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                label={label}
                required
                error={fieldState.error?.message}
              />
            )}
          />
        </Grid>
      ))}
      <Grid size={12}>
        <Typography variant="caption" color="text.secondary">
          AIU: administración, imprevistos y utilidad sobre el costo directo. El IVA se liquida sobre la utilidad si hay AIU; si no, sobre
          el costo directo. Anticipo y retenido se calculan sobre la base (costo directo + AIU).
        </Typography>
      </Grid>
    </Grid>
  );
}

ConceptFields.propTypes = {
  control: PropTypes.object.isRequired,
  prefix: PropTypes.string
};
