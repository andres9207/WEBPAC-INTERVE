import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Controller, useWatch } from 'react-hook-form';

import Alert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import FormSection from 'ui-component/extended/FormSection';
import MoneyField from 'ui-component/extended/MoneyField';
import { Figure } from 'ui-component/extended/DetailBlocks';
import { getContractAdvanceAPI } from 'api/requests/invoicesApi';
import { fMoneyText, fPercentText } from 'utils/formatNumber';

/**
 * Importes de la factura de anticipo y de la de liquidación (DEC-044), con
 * los saldos de anticipo del contrato que calcula el servidor (ADR-0024):
 *
 * - Anticipo: valor, que no puede superar el anticipo por facturar (I1).
 * - Liquidación: VALOR (base antes de IVA, con AIU) y amortización. La
 *   amortización por defecto es mín(VALOR × % efectivo, pendiente); el
 *   servidor la calcula. Cambiarla exige el permiso de ajustar y una
 *   observación (`canAdjust`). Sin ajuste, el formulario no envía la
 *   amortización y el servidor usa la de por defecto.
 *
 * Los saldos son orientativos: al guardar y al aprobar el servidor los
 * recalcula bajo bloqueo y rechaza lo que ya no quepa.
 */

export const MONEY = /^\d{1,16}(\.\d{0,2})?$/;

export default function AdvanceAmountsSection({ control, setValue, type, ctrId, readOnly, canAdjust, onError }) {
  const isLiquidation = type === 'LIQUIDATION';
  const [value, adjust] = useWatch({ control, name: ['value', 'adjustAmortization'] });
  const [balances, setBalances] = useState(null);

  // Saldos del contrato y, en la liquidación, la amortización por defecto
  // del VALOR escrito (se pide al dejar de escribir).
  useEffect(() => {
    if (!ctrId) {
      setBalances(null);
      return undefined;
    }
    let cancelled = false;
    const amount = isLiquidation && MONEY.test(value ?? '') ? value : '';
    const timer = setTimeout(
      () =>
        getContractAdvanceAPI({ ctrId, ...(amount ? { value: amount } : {}) })
          .then(({ data }) => !cancelled && setBalances(data))
          .catch((err) => !cancelled && onError(err.response?.data?.message || 'Error al cargar los saldos de anticipo del contrato')),
      amount ? 400 : 0
    );
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [ctrId, isLiquidation, value, onError]);

  // Sin ajuste, el campo muestra la amortización por defecto.
  const defaultAmortization = balances?.defaultAmortization ?? '';
  useEffect(() => {
    if (isLiquidation && !adjust && !readOnly) setValue('amortization', defaultAmortization);
  }, [isLiquidation, adjust, readOnly, defaultAmortization, setValue]);

  const figures = isLiquidation
    ? [
        { label: 'Anticipo facturado', value: fMoneyText(balances?.invoiced) },
        { label: 'Amortizado', value: fMoneyText(balances?.amortized) },
        { label: 'Pendiente por amortizar', value: fMoneyText(balances?.toAmortize) },
        { label: '% de anticipo efectivo', value: fPercentText(balances?.effectivePct), hint: 'Anticipo pactado / base del contrato' }
      ]
    : [
        { label: 'Anticipo pactado', value: fMoneyText(balances?.agreed) },
        { label: 'Anticipo facturado', value: fMoneyText(balances?.invoiced), hint: 'Solo facturas aprobadas' },
        { label: 'Por facturar', value: fMoneyText(balances?.toInvoice) }
      ];

  return (
    <FormSection
      title="Importes"
      subtitle={
        isLiquidation
          ? 'VALOR antes de IVA, con AIU. La amortización del anticipo se calcula con el porcentaje efectivo del contrato.'
          : 'El valor del anticipo no puede superar lo que queda por facturar del anticipo pactado.'
      }
    >
      <Grid container spacing={2}>
        {ctrId ? (
          figures.map((figure) => (
            <Grid key={figure.label} size={{ xs: 12, sm: 6, md: isLiquidation ? 3 : 4 }}>
              <Figure {...figure} />
            </Grid>
          ))
        ) : (
          <Grid size={12}>
            <Typography variant="caption" color="text.secondary">
              Elige el contrato para ver sus saldos de anticipo.
            </Typography>
          </Grid>
        )}

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Controller
            name="value"
            control={control}
            rules={{
              required: isLiquidation ? 'El valor de la factura es requerido.' : 'El valor del anticipo es requerido.',
              pattern: { value: MONEY, message: 'Importe no válido.' },
              validate: (v) => !/^0*(\.0*)?$/.test(v ?? '') || 'Debe ser mayor que cero.'
            }}
            render={({ field, fieldState }) => (
              <MoneyField
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                label={isLiquidation ? 'VALOR' : 'Valor del anticipo'}
                required
                disabled={readOnly}
                error={fieldState.error?.message}
              />
            )}
          />
        </Grid>

        {isLiquidation && (
          <>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Controller
                name="amortization"
                control={control}
                rules={{
                  pattern: { value: MONEY, message: 'Importe no válido.' },
                  required: adjust ? 'La amortización es requerida.' : false
                }}
                render={({ field, fieldState }) => (
                  <MoneyField
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    label="Amortización del anticipo"
                    disabled={readOnly || !adjust}
                    error={fieldState.error?.message}
                    helperText={
                      adjust
                        ? `Por defecto: ${fMoneyText(defaultAmortization) || '—'}`
                        : 'Valor por defecto: mín(VALOR × % efectivo, pendiente)'
                    }
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', alignItems: 'center' }}>
              {canAdjust ? (
                <Controller
                  name="adjustAmortization"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox checked={Boolean(field.value)} onChange={(e) => field.onChange(e.target.checked)} disabled={readOnly} />
                      }
                      label="Ajustar la amortización"
                    />
                  )}
                />
              ) : (
                <Typography variant="caption" color="text.secondary">
                  Cambiar la amortización exige el permiso de ajustar la amortización.
                </Typography>
              )}
            </Grid>
            {adjust && (
              <Grid size={12}>
                <Controller
                  name="amortizationObservation"
                  control={control}
                  rules={{
                    validate: (v) => String(v ?? '').trim() !== '' || 'Explica por qué se aparta del valor por defecto.',
                    maxLength: { value: 1000, message: 'Máximo 1000 caracteres.' }
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="Motivo del ajuste"
                      required
                      size="small"
                      fullWidth
                      multiline
                      minRows={2}
                      disabled={readOnly}
                      error={Boolean(fieldState.error)}
                      helperText={fieldState.error?.message ?? 'Queda en la bitácora con el valor por defecto y el aplicado.'}
                    />
                  )}
                />
              </Grid>
            )}
          </>
        )}

        {readOnly && (
          <Grid size={12}>
            <Alert severity="info" variant="outlined">
              Los importes de una factura aprobada no cambian. Para corregirlos, anúlala y regístrala de nuevo.
            </Alert>
          </Grid>
        )}
      </Grid>
    </FormSection>
  );
}

AdvanceAmountsSection.propTypes = {
  control: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['ADVANCE', 'LIQUIDATION']).isRequired,
  ctrId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  readOnly: PropTypes.bool,
  canAdjust: PropTypes.bool,
  onError: PropTypes.func.isRequired
};
