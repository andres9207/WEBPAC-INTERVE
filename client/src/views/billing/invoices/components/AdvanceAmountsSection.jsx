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
 * Importes de las facturas de contrato, con los saldos que calcula el
 * servidor:
 *
 * - Anticipo (DEC-044): valor, que no puede superar el anticipo por
 *   facturar (I1).
 * - Liquidación: VALOR (base antes de IVA, con AIU), amortización del
 *   anticipo (DEC-044) y retenido contractual (DEC-051). Cada uno tiene un
 *   valor por defecto, mín(VALOR × % efectivo, pendiente), que calcula el
 *   servidor. Cambiarlo exige su permiso de ajuste y una observación
 *   (`canAdjust`, `canAdjustRetention`). Sin ajuste, el formulario no lo
 *   envía y el servidor usa el de por defecto.
 * - Devolución de retenido (DEC-051): valor, que no puede superar el saldo
 *   de retenido (I3).
 *
 * El retenido es una garantía contractual, no una retención tributaria: se
 * muestra aparte. Los saldos son orientativos: al guardar y al aprobar el
 * servidor los recalcula bajo bloqueo y rechaza lo que ya no quepa.
 */

export const MONEY = /^\d{1,16}(\.\d{0,2})?$/;

/**
 * Importe con valor por defecto que se puede ajustar con permiso: el campo
 * (bloqueado sin ajuste), la casilla y el motivo del ajuste.
 */
function AdjustableAmount({ control, name, adjustName, observationName, label, adjustLabel, byDefault, defaultHint, canAdjust, readOnly }) {
  const adjust = useWatch({ control, name: adjustName });
  // Una fila propia: el importe, la casilla a su lado (alineada con el
  // campo, no con su ayuda) y el motivo debajo.
  return (
    <Row>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Controller
          name={name}
          control={control}
          rules={{
            pattern: { value: MONEY, message: 'Importe no válido.' },
            required: adjust ? 'El importe es requerido.' : false
          }}
          render={({ field, fieldState }) => (
            <MoneyField
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              label={label}
              disabled={readOnly || !adjust}
              error={fieldState.error?.message}
              helperText={adjust ? `Por defecto: ${fMoneyText(byDefault) || '—'}` : defaultHint}
            />
          )}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 8 }} sx={{ display: 'flex', alignItems: 'center', minHeight: 40 }}>
        {canAdjust ? (
          <Controller
            name={adjustName}
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox checked={Boolean(field.value)} onChange={(e) => field.onChange(e.target.checked)} disabled={readOnly} />}
                label={adjustLabel}
              />
            )}
          />
        ) : (
          <Typography variant="caption" color="text.secondary">
            Cambiar este valor exige el permiso de {adjustLabel.toLowerCase()}.
          </Typography>
        )}
      </Grid>
      {adjust && (
        <Grid size={12}>
          <Controller
            name={observationName}
            control={control}
            rules={{
              validate: (v) => String(v ?? '').trim() !== '' || 'Explica por qué se aparta del valor por defecto.',
              maxLength: { value: 1000, message: 'Máximo 1000 caracteres.' }
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label={`Motivo del ajuste (${label.toLowerCase()})`}
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
    </Row>
  );
}

AdjustableAmount.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  adjustName: PropTypes.string.isRequired,
  observationName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  adjustLabel: PropTypes.string.isRequired,
  byDefault: PropTypes.string,
  defaultHint: PropTypes.string.isRequired,
  canAdjust: PropTypes.bool,
  readOnly: PropTypes.bool
};

/** Fila completa de la grilla, con su propia grilla interna. */
function Row({ children }) {
  return (
    <Grid size={12}>
      <Grid container spacing={2} sx={{ alignItems: 'flex-start' }}>
        {children}
      </Grid>
    </Grid>
  );
}

Row.propTypes = { children: PropTypes.node };

function Figures({ figures }) {
  return figures.map((figure) => (
    <Grid key={figure.label} size={{ xs: 12, sm: 6, md: 3 }}>
      <Figure {...figure} />
    </Grid>
  ));
}

const SUBTITLES = {
  ADVANCE: 'El valor del anticipo no puede superar lo que queda por facturar del anticipo pactado.',
  LIQUIDATION:
    'VALOR antes de IVA, con AIU. La amortización del anticipo y el retenido se calculan con los porcentajes efectivos del contrato.',
  RETENTION_REFUND: 'El valor devuelto no puede superar el saldo de retenido del contrato. Se admiten varias devoluciones.'
};

export default function AdvanceAmountsSection({ control, setValue, type, ctrId, readOnly, canAdjust, canAdjustRetention, onError }) {
  const isLiquidation = type === 'LIQUIDATION';
  const isRefund = type === 'RETENTION_REFUND';
  const [value, adjustAmortization, adjustRetention] = useWatch({ control, name: ['value', 'adjustAmortization', 'adjustRetention'] });
  const [balances, setBalances] = useState(null);

  // Saldos del contrato y, en la liquidación, la amortización y el retenido
  // por defecto del VALOR escrito (se piden al dejar de escribir).
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
          .catch((err) => !cancelled && onError(err.response?.data?.message || 'Error al cargar los saldos del contrato')),
      amount ? 400 : 0
    );
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [ctrId, isLiquidation, value, onError]);

  // Sin ajuste, cada campo muestra su valor por defecto.
  const defaultAmortization = balances?.defaultAmortization ?? '';
  const defaultRetention = balances?.retention?.defaultRetention ?? '';
  useEffect(() => {
    if (isLiquidation && !adjustAmortization && !readOnly) setValue('amortization', defaultAmortization);
  }, [isLiquidation, adjustAmortization, readOnly, defaultAmortization, setValue]);
  useEffect(() => {
    if (isLiquidation && !adjustRetention && !readOnly) setValue('retention', defaultRetention);
  }, [isLiquidation, adjustRetention, readOnly, defaultRetention, setValue]);

  const retention = balances?.retention;
  const advanceFigures = isLiquidation
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
  const retentionFigures = isRefund
    ? [
        { label: 'Retenido acumulado', value: fMoneyText(retention?.retained), hint: 'Solo liquidaciones aprobadas' },
        { label: 'Devuelto', value: fMoneyText(retention?.refunded), hint: 'Solo devoluciones aprobadas' },
        { label: 'Saldo de retenido', value: fMoneyText(retention?.balance) }
      ]
    : [
        { label: 'Retenido pactado', value: fMoneyText(retention?.agreed) },
        { label: 'Retenido acumulado', value: fMoneyText(retention?.retained) },
        { label: 'Por retener', value: fMoneyText(retention?.toRetain) },
        { label: '% de retenido efectivo', value: fPercentText(retention?.effectivePct), hint: 'Retenido pactado / base del contrato' }
      ];

  return (
    <FormSection title="Importes" subtitle={SUBTITLES[type]}>
      <Grid container spacing={2}>
        {!ctrId && (
          <Grid size={12}>
            <Typography variant="caption" color="text.secondary">
              Elige el contrato para ver sus saldos.
            </Typography>
          </Grid>
        )}
        {ctrId && !isRefund && <Figures figures={advanceFigures} />}

        <Row>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Controller
              name="value"
              control={control}
              rules={{
                required: 'El valor es requerido.',
                pattern: { value: MONEY, message: 'Importe no válido.' },
                validate: (v) => !/^0*(\.0*)?$/.test(v ?? '') || 'Debe ser mayor que cero.'
              }}
              render={({ field, fieldState }) => (
                <MoneyField
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  label={{ ADVANCE: 'Valor del anticipo', LIQUIDATION: 'VALOR', RETENTION_REFUND: 'Valor devuelto' }[type]}
                  required
                  disabled={readOnly}
                  error={fieldState.error?.message}
                />
              )}
            />
          </Grid>
        </Row>

        {isLiquidation && (
          <AdjustableAmount
            control={control}
            name="amortization"
            adjustName="adjustAmortization"
            observationName="amortizationObservation"
            label="Amortización del anticipo"
            adjustLabel="Ajustar la amortización"
            byDefault={defaultAmortization}
            defaultHint="Valor por defecto: mín(VALOR × % efectivo, pendiente)"
            canAdjust={canAdjust}
            readOnly={readOnly}
          />
        )}

        {ctrId && (isLiquidation || isRefund) && (
          <Grid size={12}>
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              Retenido contractual
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Garantía que se descuenta del pago y se devuelve al liquidar. No es una retención tributaria.
            </Typography>
          </Grid>
        )}
        {ctrId && (isLiquidation || isRefund) && <Figures figures={retentionFigures} />}

        {isLiquidation && (
          <AdjustableAmount
            control={control}
            name="retention"
            adjustName="adjustRetention"
            observationName="retentionObservation"
            label="Retenido"
            adjustLabel="Ajustar el retenido"
            byDefault={defaultRetention}
            defaultHint="Valor por defecto: mín(VALOR × % efectivo, por retener)"
            canAdjust={canAdjustRetention}
            readOnly={readOnly}
          />
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
  type: PropTypes.oneOf(['ADVANCE', 'LIQUIDATION', 'RETENTION_REFUND']).isRequired,
  ctrId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  readOnly: PropTypes.bool,
  canAdjust: PropTypes.bool,
  canAdjustRetention: PropTypes.bool,
  onError: PropTypes.func.isRequired
};
