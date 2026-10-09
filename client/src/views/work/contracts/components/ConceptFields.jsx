import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import GenericFormSection from 'ui-component/extended/GenericFormSection';
import MoneyField from 'ui-component/extended/MoneyField';
import { toFormFields } from './configurableFields';

/**
 * Datos económicos de un concepto contractual (DEC-036): costo directo, AIU
 * desagregado, IVA, anticipo y retenido. Los usan el valor inicial del
 * formulario de contrato y el diálogo de otrosí. El valor del concepto no se
 * captura ni se calcula aquí: lo deriva el servidor (FRONTEND_STANDARD,
 * regla 9).
 *
 * El costo directo aplica siempre. Los porcentajes son campos configurables
 * de los tipos del proveedor (DEC-053): llegan en `fields` (ver `shownFields`) y se
 * dibujan con GenericFormSection, que necesita un FormProvider arriba.
 *
 * `prefix` anida los campos en el formulario (p. ej. "initialConcept.").
 * `disabled` los muestra en solo lectura: tras la primera factura aprobada
 * del contrato, costo y porcentajes no cambian (DOM-07).
 */

const MONEY = /^\d{1,16}(\.\d{0,2})?$/;

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

const PERCENT_GRID = { PERCENT: { xs: 6, sm: 4, md: 2 } };

export default function ConceptFields({ control, prefix = '', fields, disabled = false }) {
  const percents = fields.filter((field) => field.dataType === 'PERCENT');

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
              disabled={disabled}
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
      <Grid size={12} sx={{ mt: -2 }}>
        {percents.length > 0 ? (
          <GenericFormSection fields={toFormFields(percents, { prefix, grid: PERCENT_GRID, disabled })} />
        ) : (
          <Typography variant="caption" color="text.secondary">
            Los tipos del proveedor no piden porcentajes: el valor es el costo directo.
          </Typography>
        )}
      </Grid>
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
  prefix: PropTypes.string,
  /** Campos configurables del grupo de conceptos a mostrar (`shownFields`); aquí se usan los porcentajes. */
  fields: PropTypes.array.isRequired,
  /** Solo lectura (contrato con facturas aprobadas). */
  disabled: PropTypes.bool
};
