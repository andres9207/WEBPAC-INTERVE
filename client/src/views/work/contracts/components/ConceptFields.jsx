import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import AmountPercentField from 'ui-component/extended/AmountPercentField';
import MoneyField from 'ui-component/extended/MoneyField';
import { previewContractConceptAPI } from 'api/requests/contractsApi';
import { showError } from 'services/ToastService';
import { toFormFields } from './configurableFields';

/**
 * Datos económicos de un concepto contractual (DEC-036): costo directo, AIU
 * desagregado, IVA, anticipo y retenido. Los usan el valor inicial del
 * formulario de contrato y el diálogo de otrosí. El valor del concepto no se
 * captura ni se calcula aquí: lo deriva el servidor (FRONTEND_STANDARD,
 * regla 9).
 *
 * El costo directo aplica siempre. Los porcentajes son campos configurables
 * del tipo de proveedor del contrato (DEC-053, DEC-066): llegan en `fields`
 * (ver `shownFields`), con su etiqueta, si son obligatorios y si son
 * heredados. Cada uno tiene su valor y su % juntos, como en las facturas
 * (DEC-065, "Valor y porcentaje"): se escribe en cualquiera de los dos y se
 * guarda el %. Mientras se escribe, el servidor da el valor de cada
 * porcentaje y convierte a % lo escrito en pesos (`preview_contract_concept`).
 * Necesita un FormProvider arriba.
 *
 * `prefix` anida los campos en el formulario (p. ej. "initialConcept.").
 * `disabled` los muestra en solo lectura: tras la primera factura aprobada
 * del contrato, costo y porcentajes no cambian (DOM-07).
 */

const MONEY = /^\d{1,16}(\.\d{0,2})?$/;

// Porcentajes del concepto, en el orden de la API (los mismos de EMPTY_CONCEPT, salvo el costo).
const PERCENT_FIELDS = ['adminPct', 'contingencyPct', 'profitPct', 'vatPct', 'advancePct', 'retentionPct'];
// Nombre en la API del valor de cada porcentaje, que solo acepta la previsualización.
const altOf = (field) => field.replace(/Pct$/, 'Amount');

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

export default function ConceptFields({ control, prefix = '', fields, disabled = false }) {
  const { setValue } = useFormContext();
  const percents = fields.filter((field) => field.dataType === 'PERCENT');
  // Etiqueta, obligatorio, heredado y validación de cada porcentaje, de su configuración.
  const formFields = toFormFields(percents, { prefix, disabled });

  const values = useWatch({ control, name: [`${prefix}directCost`, ...PERCENT_FIELDS.map((field) => `${prefix}${field}`)] });
  // Lo escrito en pesos, hasta que el servidor lo convierte; y el valor y el % de la última vista previa.
  const [alts, setAlts] = useState({});
  const [pairs, setPairs] = useState({});

  const setAlt = (alt, text) =>
    setAlts((prev) => {
      const next = { ...prev };
      if (text === null || text === '') delete next[alt];
      else next[alt] = text;
      return next;
    });

  // Vista previa del servidor al dejar de escribir.
  // Solo los porcentajes que se muestran: uno oculto (A, I y U sin AIU) puede guardar un valor viejo que no se envía al guardar.
  const shown = percents.map((p) => p.name).join(',');
  const key = [...values.map((v) => v ?? ''), shown, JSON.stringify(alts)].join('|');
  useEffect(() => {
    let cancelled = false;
    const sent = alts;
    const [directCost, ...pcts] = values;
    const visible = shown.split(',');
    const params = {
      directCost: directCost ?? '',
      ...Object.fromEntries(PERCENT_FIELDS.map((field, i) => [field, visible.includes(field) ? (pcts[i] ?? '') : ''])),
      ...sent
    };
    const timer = setTimeout(
      () =>
        previewContractConceptAPI(params)
          .then(({ data }) => {
            if (cancelled) return;
            setPairs(data.pairs ?? {});
            // Lo escrito en pesos pasa al campo como %, que es lo que se guarda.
            const converted = PERCENT_FIELDS.filter((field) => sent[altOf(field)] !== undefined);
            converted.forEach((field) => setValue(`${prefix}${field}`, data.captured[field], { shouldDirty: true, shouldValidate: true }));
            if (converted.length)
              setAlts((prev) => {
                const next = { ...prev };
                converted.forEach((field) => next[altOf(field)] === sent[altOf(field)] && delete next[altOf(field)]);
                return next;
              });
          })
          .catch((err) => !cancelled && showError(err.response?.data?.message || 'Error al calcular los valores del concepto')),
      350
    );
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // `key` resume `values` y `alts`, que cambian de identidad en cada render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, prefix, setValue]);

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
      {percents.length > 0 ? (
        formFields.map((f, i) => (
          <Grid key={f.name} size={{ xs: 12, sm: 6, md: 4 }}>
            <Controller
              name={f.name}
              control={control}
              rules={f.validation}
              render={({ field, fieldState }) => (
                <AmountPercentField
                  storedAs="percent"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  derived={pairs[percents[i].name]?.amount}
                  onAltChange={(text) => setAlt(altOf(percents[i].name), text)}
                  label={f.label}
                  required={f.required}
                  disabled={f.disabled}
                  error={fieldState.error?.message}
                  helperText={f.props?.helperText}
                />
              )}
            />
          </Grid>
        ))
      ) : (
        <Grid size={12}>
          <Typography variant="caption" color="text.secondary">
            El tipo de proveedor del contrato no pide porcentajes: el valor es el costo directo.
          </Typography>
        </Grid>
      )}
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
