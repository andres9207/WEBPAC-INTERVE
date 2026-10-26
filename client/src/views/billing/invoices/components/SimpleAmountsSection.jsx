import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Controller, useWatch } from 'react-hook-form';

import Grid from '@mui/material/Grid';

import AmountPercentField from 'ui-component/extended/AmountPercentField';
import MoneyField from 'ui-component/extended/MoneyField';
import { previewSimpleInvoiceAPI } from 'api/requests/invoicesApi';
import { MONEY } from './AdvanceAmountsSection';

/**
 * Importes de la factura simple (DEC-065), en el orden de la pantalla del
 * sistema que se migra. Valor y % IVA son obligatorios; los demás, vacíos,
 * valen 0. Salvo el valor, cada importe tiene su valor y su % juntos
 * (DEC-065, "Valor y porcentaje"): se escribe en cualquiera de los dos. Se
 * guarda como siempre: las retenciones en la fuente y de IVA y el IVA, como
 * tasa; la retención de ICA, el flete y los descuentos, como valor.
 *
 * Mientras se escribe, pide al servidor la composición (`onPreview`) para el
 * panel Detalle, el otro lado de cada importe y la conversión de lo escrito
 * por el otro lado, que se guarda en el campo: el cliente no calcula ninguna
 * cifra (FRONTEND_STANDARD, regla 9). Al guardar, el servidor la recalcula.
 */

export const SIMPLE_AMOUNT_FIELDS = [
  'value',
  'withholdingPct',
  'discount',
  'vatPct',
  'vatWithholdingPct',
  'icaWithholding',
  'freight',
  'earlyPaymentDiscount'
];

const PERCENT = /^\d{1,3}(\.\d{1,2})?$/;
const percentRules = (required) => ({
  ...(required ? { required: 'Requerido (0 si no aplica).' } : {}),
  validate: (v) => !v || (PERCENT.test(v) && Number(v) <= 100) || 'Entre 0 y 100.'
});
const moneyRules = (required) => ({
  ...(required ? { required: 'El valor es requerido.' } : {}),
  validate: (v) => !v || MONEY.test(v) || 'Importe no válido.'
});

// `alt`: el nombre del otro lado en la vista previa (SIMPLE_PAIRS del servidor).
const FIELDS = [
  { name: 'withholdingPct', label: 'Rte fuente', kind: 'percent', alt: 'withholdingAmount' },
  { name: 'discount', label: 'Descuento AI', kind: 'money', alt: 'discountPct', helper: 'Descuento comercial; % sobre el valor' },
  { name: 'vatPct', label: 'IVA', kind: 'percent', alt: 'vatAmount', required: true },
  { name: 'vatWithholdingPct', label: 'Rte IVA', kind: 'percent', alt: 'vatWithholdingAmount', helper: '% sobre el IVA' },
  { name: 'icaWithholding', label: 'Rte ICA', kind: 'money', alt: 'icaWithholdingPct', helper: '% sobre el valor' },
  { name: 'freight', label: 'Flete', kind: 'money', alt: 'freightPct', helper: 'Sin IVA; % sobre el valor' },
  {
    name: 'earlyPaymentDiscount',
    label: 'Descuento pronto pago',
    kind: 'money',
    alt: 'earlyPaymentDiscountPct',
    helper: 'Solo descuenta el pago; % sobre el valor'
  }
];

export default function SimpleAmountsSection({ control, setValue, readOnly, required = true, onPreview, onError }) {
  const values = useWatch({ control, name: SIMPLE_AMOUNT_FIELDS });
  // Lo escrito por el otro lado, hasta que el servidor lo convierte; y el
  // valor y el % de cada importe, de la última vista previa.
  const [alts, setAlts] = useState({});
  const [pairs, setPairs] = useState({});

  const setAlt = (alt, text) =>
    setAlts((prev) => {
      const next = { ...prev };
      if (text === null || text === '') delete next[alt];
      else next[alt] = text;
      return next;
    });

  // Composición del servidor al dejar de escribir.
  const key = [...values.map((v) => v ?? ''), JSON.stringify(alts)].join('|');
  useEffect(() => {
    let cancelled = false;
    const sent = alts;
    const params = { ...Object.fromEntries(SIMPLE_AMOUNT_FIELDS.map((field, i) => [field, values[i] ?? ''])), ...sent };
    const timer = setTimeout(
      () =>
        previewSimpleInvoiceAPI(params)
          .then(({ data }) => {
            if (cancelled) return;
            setPairs(data.pairs ?? {});
            onPreview(data);
            // Lo escrito por el otro lado pasa al campo, como se guarda.
            const converted = FIELDS.filter((f) => sent[f.alt] !== undefined);
            converted.forEach((f) => setValue(f.name, data.captured[f.name], { shouldDirty: true, shouldValidate: true }));
            if (converted.length)
              setAlts((prev) => {
                const next = { ...prev };
                converted.forEach((f) => next[f.alt] === sent[f.alt] && delete next[f.alt]);
                return next;
              });
          })
          .catch((err) => !cancelled && onError(err.response?.data?.message || 'Error al calcular el detalle de la factura')),
      350
    );
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // `key` resume `values` y `alts`, que cambian de identidad en cada render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, onPreview, onError, setValue]);

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Controller
          name="value"
          control={control}
          rules={moneyRules(required)}
          render={({ field, fieldState }) => (
            <MoneyField
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              label="Valor"
              required={required}
              disabled={readOnly}
              error={fieldState.error?.message}
              helperText="Base de los demás importes"
            />
          )}
        />
      </Grid>
      {FIELDS.map((f) => (
        <Grid key={f.name} size={{ xs: 12, md: 6 }}>
          <Controller
            name={f.name}
            control={control}
            rules={f.kind === 'percent' ? percentRules(required && f.required) : moneyRules(required && f.required)}
            render={({ field, fieldState }) => (
              <AmountPercentField
                storedAs={f.kind}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                derived={f.kind === 'percent' ? pairs[f.name]?.amount : pairs[f.name]?.pct}
                onAltChange={(text) => setAlt(f.alt, text)}
                label={f.label}
                required={required && f.required}
                disabled={readOnly}
                error={fieldState.error?.message}
                helperText={f.helper}
              />
            )}
          />
        </Grid>
      ))}
    </Grid>
  );
}

SimpleAmountsSection.propTypes = {
  control: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  /** false: una simple registrada antes de DEC-065 se edita sin exigir importes. */
  required: PropTypes.bool,
  onPreview: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
};
