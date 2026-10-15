import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Controller, useWatch } from 'react-hook-form';

import Grid from '@mui/material/Grid';

import MoneyField from 'ui-component/extended/MoneyField';
import PercentField from 'ui-component/extended/PercentField';
import { previewSimpleInvoiceAPI } from 'api/requests/invoicesApi';
import { MONEY } from './AdvanceAmountsSection';

/**
 * Importes de la factura simple (DEC-065), en el orden de la pantalla del
 * sistema que se migra. Valor y % IVA son obligatorios; los demás, vacíos,
 * valen 0. Las retenciones en la fuente y de IVA y el IVA se capturan como
 * tasa; la retención de ICA, el flete y los descuentos, como valor.
 *
 * Mientras se escribe, pide al servidor la composición (`onPreview`) para el
 * panel Detalle: el cliente no calcula ninguna cifra (FRONTEND_STANDARD,
 * regla 9). Al guardar, el servidor la recalcula.
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

const FIELDS = [
  { name: 'value', label: 'Valor', kind: 'money', required: true },
  { name: 'withholdingPct', label: '% Rte fuente', kind: 'percent', helper: 'Sobre el valor' },
  { name: 'discount', label: 'Descuento AI', kind: 'money', helper: 'Descuento comercial sobre el valor' },
  { name: 'vatPct', label: '% IVA', kind: 'percent', required: true, helper: 'Sobre el valor menos el descuento AI' },
  { name: 'vatWithholdingPct', label: '% Rte IVA', kind: 'percent', helper: 'Sobre el IVA' },
  { name: 'icaWithholding', label: 'Rte ICA', kind: 'money', helper: 'Valor' },
  { name: 'freight', label: 'Flete', kind: 'money', helper: 'Sin IVA' },
  { name: 'earlyPaymentDiscount', label: 'Descuento pronto pago', kind: 'money', helper: 'Solo descuenta el pago' }
];

export default function SimpleAmountsSection({ control, readOnly, required = true, onPreview, onError }) {
  const values = useWatch({ control, name: SIMPLE_AMOUNT_FIELDS });

  // Composición del servidor al dejar de escribir.
  const key = values.map((v) => v ?? '').join('|');
  useEffect(() => {
    let cancelled = false;
    const params = Object.fromEntries(SIMPLE_AMOUNT_FIELDS.map((field, i) => [field, values[i] ?? '']));
    const timer = setTimeout(
      () =>
        previewSimpleInvoiceAPI(params)
          .then(({ data }) => !cancelled && onPreview(data))
          .catch((err) => !cancelled && onError(err.response?.data?.message || 'Error al calcular el detalle de la factura')),
      350
    );
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // `key` resume `values`, que cambia de identidad en cada render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, onPreview, onError]);

  return (
    <Grid container spacing={2}>
      {FIELDS.map((f) => (
        <Grid key={f.name} size={{ xs: 12, sm: 6, md: 4 }}>
          <Controller
            name={f.name}
            control={control}
            rules={f.kind === 'percent' ? percentRules(required && f.required) : moneyRules(required && f.required)}
            render={({ field, fieldState }) =>
              f.kind === 'percent' ? (
                <PercentField
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  label={f.label}
                  required={required && f.required}
                  disabled={readOnly}
                  error={fieldState.error?.message}
                  helperText={f.helper}
                />
              ) : (
                <MoneyField
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  label={f.label}
                  required={required && f.required}
                  disabled={readOnly}
                  error={fieldState.error?.message}
                  helperText={f.helper}
                />
              )
            }
          />
        </Grid>
      ))}
    </Grid>
  );
}

SimpleAmountsSection.propTypes = {
  control: PropTypes.object.isRequired,
  readOnly: PropTypes.bool,
  /** false: una simple registrada antes de DEC-065 se edita sin exigir importes. */
  required: PropTypes.bool,
  onPreview: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
};
