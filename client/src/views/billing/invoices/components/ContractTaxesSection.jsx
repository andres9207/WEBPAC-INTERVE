import { useEffect, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';

import Grid from '@mui/material/Grid';

import AmountPercentField from 'ui-component/extended/AmountPercentField';
import { previewContractInvoiceAPI } from 'api/requests/invoicesApi';
import { MONEY } from './AdvanceAmountsSection';

/**
 * IVA, retenciones tributarias y descuento de materiales de la normal y la
 * liquidación (DEC-075). El % IVA es obligatorio; los demás, vacíos, valen 0.
 * Cada importe tiene su valor y su % juntos (DEC-065, "Valor y porcentaje"):
 * se escribe en cualquiera de los dos. Se guarda como siempre: % utilidad,
 * IVA y retenciones en la fuente y de IVA, como tasa; la retención de ICA y
 * el descuento de materiales, como valor.
 *
 * Es un hook y no un panel: devuelve `taxField(name)`, que dibuja un campo,
 * para que AdvanceAmountsSection los intercale con el VALOR, la amortización
 * y el retenido en un solo panel, en el orden de la pantalla del sistema que
 * se migra.
 *
 * Mientras se escribe, pide al servidor la composición (`onPreview`) con el
 * VALOR, la amortización y el retenido del formulario, para el panel
 * Detalle, el otro lado de cada importe y la conversión de lo escrito por el
 * otro lado: el cliente no calcula ninguna cifra (FRONTEND_STANDARD, regla
 * 9). Al guardar, el servidor recalcula todo bajo el bloqueo del contrato.
 * Con `enabled` en false (otro tipo de factura) no pide nada.
 */

export const CONTRACT_TAX_FIELDS = ['utilityPct', 'vatPct', 'withholdingPct', 'vatWithholdingPct', 'icaWithholding', 'materialsDiscount'];

const WATCHED = ['value', 'amortization', 'retention', ...CONTRACT_TAX_FIELDS];

const PERCENT = /^\d{1,3}(\.\d{1,2})?$/;
const percentRules = (required) => ({
  ...(required ? { required: 'Requerido (0 si no aplica).' } : {}),
  validate: (v) => !v || (PERCENT.test(v) && Number(v) <= 100) || 'Entre 0 y 100.'
});
const moneyRules = { validate: (v) => !v || MONEY.test(v) || 'Importe no válido.' };

// `alt`: el nombre del otro lado en la vista previa (CONTRACT_PAIRS del servidor).
const FIELDS = [
  {
    name: 'utilityPct',
    label: 'Utilidad',
    kind: 'percent',
    alt: 'utilityAmount',
    helper: '% sobre el VALOR; se guarda, no entra en el cálculo'
  },
  { name: 'vatPct', label: 'IVA', kind: 'percent', alt: 'vatAmount', required: true, helper: '% sobre el VALOR' },
  { name: 'withholdingPct', label: 'Rte fuente', kind: 'percent', alt: 'withholdingAmount', helper: '% sobre el VALOR' },
  { name: 'vatWithholdingPct', label: 'Rte IVA', kind: 'percent', alt: 'vatWithholdingAmount', helper: '% sobre el IVA' },
  { name: 'icaWithholding', label: 'Rte ICA', kind: 'money', alt: 'icaWithholdingPct', helper: '% sobre el VALOR' },
  {
    name: 'materialsDiscount',
    label: 'Dcto materiales',
    kind: 'money',
    alt: 'materialsDiscountPct',
    helper: 'Resta del total a pagar; % sobre el VALOR'
  }
];

const FIELDS_BY_NAME = Object.fromEntries(FIELDS.map((f) => [f.name, f]));

export default function useContractTaxFields({ control, setValue, enabled, readOnly, required = true, onPreview, onError }) {
  const values = useWatch({ control, name: WATCHED });
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
    if (!enabled) return undefined;
    let cancelled = false;
    const sent = alts;
    const params = { ...Object.fromEntries(WATCHED.map((field, i) => [field, values[i] ?? ''])), ...sent };
    const timer = setTimeout(
      () =>
        previewContractInvoiceAPI(params)
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
  }, [enabled, key, onPreview, onError, setValue]);

  // `required` en false: una factura registrada antes de DEC-075 se consulta sin exigir el % IVA.
  const taxField = (name) => {
    const f = FIELDS_BY_NAME[name];
    return (
      <Grid key={f.name} size={{ xs: 12, md: 6 }}>
        <Controller
          name={f.name}
          control={control}
          rules={f.kind === 'percent' ? percentRules(required && f.required) : moneyRules}
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
    );
  };

  return taxField;
}
