import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Controller, useWatch } from 'react-hook-form';

import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import FormSection from 'ui-component/extended/FormSection';
import AmountPercentField from 'ui-component/extended/AmountPercentField';
import MoneyField from 'ui-component/extended/MoneyField';
import { getContractAdvanceAPI } from 'api/requests/invoicesApi';
import { fMoneyText, fPercentText } from 'utils/formatNumber';
import { isBillingInvoiceType } from 'utils/constants';

/**
 * Importes de las facturas de contrato, con los saldos que calcula el
 * servidor:
 *
 * - Anticipo (DEC-044): valor, que no puede superar el anticipo por
 *   facturar (I1).
 * - Liquidación: VALOR (base antes de IVA, con AIU), amortización del
 *   anticipo (DEC-044) y retenido contractual (DEC-051). Cada uno tiene un
 *   valor por defecto, mín(VALOR × % efectivo, pendiente), que calcula el
 *   servidor. La amortización está abierta para quien registra (DEC-044,
 *   cambio del 2026-10-23), con el % efectivo del contrato escrito desde el
 *   inicio, antes del VALOR; el retenido, para quien tiene su permiso de
 *   ajuste (`canAdjustRetention`). Sin casilla ni observación. Si el
 *   usuario no lo cambia, el formulario no lo envía y el servidor usa el de
 *   por defecto. Al ajustarlo se escribe su
 *   valor o su % sobre el VALOR (DEC-065, "Valor y porcentaje"): el
 *   servidor convierte el % y se guarda el valor.
 * - Devolución de retenido (DEC-051): valor, que no puede superar el saldo
 *   de retenido (I3).
 *
 * En la normal y la liquidación, el IVA y las retenciones (`taxField`, de
 * useContractTaxFields) van en este mismo panel, en el orden de la pantalla
 * del sistema que se migra: VALOR, % utilidad, % IVA, % rte fuente, rte IVA,
 * rte ICA, amortización, retenido y descuento de materiales.
 *
 * El retenido es una garantía contractual, no una retención tributaria. Los
 * saldos son orientativos: al guardar y al aprobar el servidor los recalcula
 * bajo bloqueo y rechaza lo que ya no quepa.
 */

// Impuestos antes de la amortización y descuento de materiales al final, como en la pantalla del sistema que se migra.
const TAXES_BEFORE_ADVANCE = ['utilityPct', 'vatPct', 'withholdingPct', 'vatWithholdingPct', 'icaWithholding'];
const TAXES_AFTER_RETENTION = ['materialsDiscount'];

export const MONEY = /^\d{1,16}(\.\d{0,2})?$/;

// Importe en centavos, para comparar sobre el texto sin pasar por Number (DEC-045). null si no es un importe.
const cents = (amount) => {
  const match = /^(-?)(\d+)(?:\.(\d{0,2}))?$/.exec(amount ?? '');
  if (!match) return null;
  const value = BigInt(match[2]) * 100n + BigInt((match[3] ?? '').padEnd(2, '0'));
  return match[1] ? -value : value;
};
const exceeds = (amount, limit) => {
  const [a, l] = [cents(amount), cents(limit)];
  return a !== null && l !== null && a > l;
};
const isEmpty = (limit) => cents(limit) !== null && cents(limit) <= 0n;
// Un saldo negativo (amortizado por encima del facturado) se muestra como 0, igual que lo acota el servidor.
const shownLimit = (limit) => fMoneyText(isEmpty(limit) ? '0' : limit) || '—';
const isPositive = (amount) => cents(amount) !== null && cents(amount) > 0n;
// Razón del servidor (seis decimales, "15.000000") a % de dos decimales, medio hacia arriba como money.utils.js.
const pctText = (ratio) => {
  const match = /^(\d+)(?:\.(\d*))?$/.exec(ratio ?? '');
  if (!match) return undefined;
  const hundredths = (BigInt(match[1] + (match[2] ?? '').padEnd(6, '0').slice(0, 6)) + 5000n) / 10000n;
  return `${hundredths / 100n}.${String(hundredths % 100n).padStart(2, '0')}`;
};

/**
 * Límite de un importe con los saldos del servidor, para validarlo mientras
 * se escribe con las mismas reglas que aplica al guardar (I1 a I5): `empty`
 * deshabilita el campo cuando no queda nada; `check(amount)` da el error o
 * ''. Es una guía: al guardar y al aprobar el servidor vuelve a verificar
 * bajo bloqueo.
 */
const amountLimit = (limit, emptyMessage, exceededMessage, valueCap) => ({
  empty: isEmpty(limit) ? emptyMessage : '',
  check: (amount) =>
    valueCap !== undefined && exceeds(amount, valueCap)
      ? 'No puede superar el VALOR de la factura.'
      : exceeds(amount, limit)
        ? `${exceededMessage} (${shownLimit(limit)}).`
        : ''
});

/**
 * Importe con valor por defecto, abierto para quien tiene su permiso de
 * ajuste, como en la pantalla del sistema que se migra. Llega con el de por
 * defecto y lo sigue hasta que el usuario escribe en él (`adjustName`); desde
 * ahí se envía lo escrito. Sin permiso, se ve bloqueado con el de por
 * defecto. Ajustar no pide observación (DEC-044, DEC-051). Con `limit`, se
 * valida al escribir y se deshabilita si no queda saldo.
 */
function AdjustableAmount({ control, setValue, name, adjustName, label, canAdjust, readOnly, pair, defaultPct, onAltChange, limit }) {
  const markAdjusted = () => setValue(adjustName, true, { shouldDirty: true });
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Controller
        name={name}
        control={control}
        rules={{
          pattern: { value: MONEY, message: 'Importe no válido.' },
          validate: (v) => !limit || limit.check(v) || true
        }}
        render={({ field, fieldState }) => (
          <AmountPercentField
            storedAs="money"
            value={field.value}
            onChange={(text) => {
              markAdjusted();
              field.onChange(text);
            }}
            onBlur={field.onBlur}
            derived={pair?.pct ?? defaultPct}
            onAltChange={(text) => {
              if (text !== null) markAdjusted();
              onAltChange(text);
            }}
            label={label}
            disabled={readOnly || !canAdjust || Boolean(limit?.empty)}
            error={fieldState.error?.message || limit?.check(field.value) || undefined}
            helperText={limit?.empty || undefined}
          />
        )}
      />
    </Grid>
  );
}

AdjustableAmount.propTypes = {
  control: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  adjustName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  canAdjust: PropTypes.bool,
  readOnly: PropTypes.bool,
  /** Valor y % sobre el VALOR, calculados por el servidor. */
  pair: PropTypes.shape({ amount: PropTypes.string, pct: PropTypes.string }),
  /** % que se muestra mientras no hay VALOR (y por tanto `pair`): el del contrato o el que se escribió. */
  defaultPct: PropTypes.string,
  onAltChange: PropTypes.func.isRequired,
  /** De `amountLimit`: sin saldo, deshabilitado con el motivo; si no, valida al escribir. */
  limit: PropTypes.shape({ empty: PropTypes.string, check: PropTypes.func })
};

const SUBTITLES = {
  ADVANCE: 'El valor del anticipo no puede superar lo que queda por facturar del anticipo pactado.',
  NORMAL:
    'Avance del contrato. VALOR antes de IVA, con AIU, hasta lo que queda por facturar. VALOR y % IVA son obligatorios; los demás impuestos, vacíos, valen 0. La amortización del anticipo y el retenido se calculan con los porcentajes efectivos del contrato.',
  LIQUIDATION:
    'VALOR antes de IVA, con AIU, hasta lo que queda por facturar. VALOR y % IVA son obligatorios; los demás impuestos, vacíos, valen 0. La amortización del anticipo y el retenido se calculan con los porcentajes efectivos del contrato.',
  RETENTION_REFUND: 'El valor devuelto no puede superar el saldo de retenido del contrato. Se admiten varias devoluciones.'
};

export default function AdvanceAmountsSection({
  control,
  setValue,
  type,
  ctrId,
  invId,
  readOnly,
  canAdjustRetention,
  onBalances,
  onError,
  taxField
}) {
  const isLiquidation = isBillingInvoiceType(type);
  const taxes = (names) => (isLiquidation && taxField ? names.map(taxField) : null);
  const isRefund = type === 'RETENTION_REFUND';
  const [value, adjustAmortization, adjustRetention, amortization, retentionValue] = useWatch({
    control,
    name: ['value', 'adjustAmortization', 'adjustRetention', 'amortization', 'retention']
  });
  const [balances, setBalances] = useState(null);
  // % escrito de la amortización o del retenido, hasta que el servidor lo
  // convierte a valor (`amortizationPct`, `retentionPct`).
  const [alts, setAlts] = useState({});
  const altsRef = useRef(alts);
  altsRef.current = alts;
  const setAlt = (alt, text) =>
    setAlts((prev) => {
      const next = { ...prev };
      if (text === null || text === '') delete next[alt];
      else next[alt] = text;
      return next;
    });

  // Saldos del contrato y, en la liquidación, la amortización y el retenido
  // por defecto del VALOR escrito, con el valor y el % de cada uno (se piden
  // al dejar de escribir). La página los recibe para las tarjetas de saldos
  // (`onBalances`, DEC-065).
  const pairKey = isLiquidation
    ? [amortization, retentionValue, alts.amortizationPct, alts.retentionPct].map((v) => v ?? '').join('|')
    : '';
  useEffect(() => {
    if (!ctrId) {
      setBalances(null);
      onBalances?.(null);
      return undefined;
    }
    let cancelled = false;
    const amount = isLiquidation && MONEY.test(value ?? '') ? value : '';
    const sent = amount ? altsRef.current : {};
    const pairParams = amount
      ? {
          ...(MONEY.test(amortization ?? '') ? { amortization } : {}),
          ...(MONEY.test(retentionValue ?? '') ? { retention: retentionValue } : {}),
          ...sent
        }
      : {};
    const timer = setTimeout(
      () =>
        getContractAdvanceAPI({ ctrId, ...(invId ? { invId } : {}), ...(amount ? { value: amount } : {}), ...pairParams })
          .then(({ data }) => {
            if (cancelled) return;
            setBalances(data);
            onBalances?.(data);
            // El % escrito pasa al campo como valor, que es lo que se guarda.
            const converted = [
              ['amortizationPct', 'amortization', data.amortizationPair],
              ['retentionPct', 'retention', data.retentionPair]
            ].filter(([alt, , pair]) => sent[alt] !== undefined && pair);
            converted.forEach(([, field, pair]) => setValue(field, pair.amount, { shouldDirty: true, shouldValidate: true }));
            if (converted.length)
              setAlts((prev) => {
                const next = { ...prev };
                converted.forEach(([alt]) => next[alt] === sent[alt] && delete next[alt]);
                return next;
              });
          })
          .catch((err) => !cancelled && onError(err.response?.data?.message || 'Error al cargar los saldos del contrato')),
      amount ? 400 : 0
    );
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // `pairKey` resume la amortización, el retenido y lo escrito como %.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctrId, invId, isLiquidation, value, pairKey, onBalances, onError, setValue]);

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
  // Lo que acota el valor de cada tipo, bajo su campo; los saldos generales
  // van en las tarjetas de arriba (ContractBalanceCards).
  const billingHint = balances
    ? `Por facturar: ${fMoneyText(balances.billing?.toBill) || '—'} · anticipo efectivo ${fPercentText(balances.effectivePct) || '—'} · retenido efectivo ${fPercentText(retention?.effectivePct) || '—'}`
    : undefined;
  const valueHint = !balances
    ? undefined
    : {
        ADVANCE: `Por facturar del anticipo: ${fMoneyText(balances.toInvoice) || '—'}`,
        NORMAL: billingHint,
        LIQUIDATION: billingHint,
        RETENTION_REFUND: `Saldo de retenido: ${fMoneyText(retention?.balance) || '—'}`
      }[type];

  // Límites de cada importe con los saldos del contrato (los del servidor al guardar), para validar mientras se
  // escribe. Una factura aprobada no se valida: sus importes no cambian.
  const limits =
    !balances || readOnly
      ? {}
      : {
          value: {
            ADVANCE: amountLimit(balances.toInvoice, 'Ya se facturó todo el anticipo pactado.', 'Supera el anticipo por facturar'),
            NORMAL: amountLimit(
              balances.billing?.toBill,
              'No queda nada por facturar del contrato. Si el contrato creció, registra antes el otrosí.',
              'Supera lo que queda por facturar del contrato'
            ),
            LIQUIDATION: amountLimit(
              balances.billing?.toBill,
              'No queda nada por facturar del contrato. Si el contrato creció, registra antes el otrosí.',
              'Supera lo que queda por facturar del contrato'
            ),
            RETENTION_REFUND: amountLimit(retention?.balance, 'El contrato no tiene retenido por devolver.', 'Supera el saldo de retenido')
          }[type],
          amortization: amountLimit(
            balances.toAmortize,
            isPositive(balances.agreed)
              ? `Sin anticipo por amortizar: facturado ${shownLimit(balances.invoiced)}, amortizado ${shownLimit(balances.amortized)}.`
              : 'El contrato no tiene anticipo pactado.',
            'Supera el pendiente por amortizar',
            value
          ),
          retention: amountLimit(
            retention?.toRetain,
            isPositive(retention?.agreed)
              ? `Ya se retuvo todo el retenido pactado (${shownLimit(retention.agreed)}).`
              : 'El contrato no tiene retenido pactado.',
            'Supera lo que queda por retener',
            value
          )
        };
  const valueLimit = limits.value;

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

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="value"
            control={control}
            rules={{
              required: 'El valor es requerido.',
              pattern: { value: MONEY, message: 'Importe no válido.' },
              validate: (v) => (/^0*(\.0*)?$/.test(v ?? '') ? 'Debe ser mayor que cero.' : valueLimit?.check(v) || true)
            }}
            render={({ field, fieldState }) => (
              <MoneyField
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                label={{ ADVANCE: 'Valor del anticipo', NORMAL: 'VALOR', LIQUIDATION: 'VALOR', RETENTION_REFUND: 'Valor devuelto' }[type]}
                required
                disabled={readOnly || Boolean(valueLimit?.empty)}
                error={fieldState.error?.message || valueLimit?.check(field.value) || undefined}
                helperText={valueLimit?.empty || valueHint}
              />
            )}
          />
        </Grid>

        {taxes(TAXES_BEFORE_ADVANCE)}

        {/* Como en la pantalla del sistema que se migra: siempre bloqueado y en 0, porque el anticipo es su propio tipo de factura (DEC-044, DEC-075). */}
        {isLiquidation && (
          <Grid size={{ xs: 12, md: 6 }}>
            <MoneyField value="0" onChange={() => {}} label="Valor anticipo" disabled />
          </Grid>
        )}

        {isLiquidation && (
          <AdjustableAmount
            control={control}
            setValue={setValue}
            name="amortization"
            adjustName="adjustAmortization"
            label="Amortización del anticipo"
            canAdjust
            readOnly={readOnly}
            pair={balances?.amortizationPair}
            // Antes del VALOR, el % efectivo del contrato (15 % por defecto, DEC-036): la amortización será VALOR × %.
            defaultPct={alts.amortizationPct ?? pctText(balances?.effectivePct)}
            onAltChange={(text) => setAlt('amortizationPct', text)}
            limit={limits.amortization}
          />
        )}

        {/* En la normal y la liquidación, el retenido sigue a la amortización sin título, como en la pantalla del sistema que se migra. */}
        {ctrId && isRefund && (
          <Grid size={12}>
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              Retenido contractual
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Garantía que se descuenta del pago y se devuelve al liquidar. No es una retención tributaria.
            </Typography>
          </Grid>
        )}

        {isLiquidation && (
          <AdjustableAmount
            control={control}
            setValue={setValue}
            name="retention"
            adjustName="adjustRetention"
            label="Retenido"
            canAdjust={canAdjustRetention}
            readOnly={readOnly}
            pair={balances?.retentionPair}
            onAltChange={(text) => setAlt('retentionPct', text)}
            limit={limits.retention}
          />
        )}

        {taxes(TAXES_AFTER_RETENTION)}

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
  type: PropTypes.oneOf(['ADVANCE', 'NORMAL', 'LIQUIDATION', 'RETENTION_REFUND']).isRequired,
  ctrId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  readOnly: PropTypes.bool,
  canAdjustRetention: PropTypes.bool,
  /** Recibe los saldos del contrato (o null sin contrato) para las tarjetas de la página. */
  /** Factura que se edita: su anticipo no cuenta como por aprobar. */
  invId: PropTypes.number,
  onBalances: PropTypes.func,
  onError: PropTypes.func.isRequired,
  /** Normal y liquidación: dibuja un campo de IVA o retenciones por nombre (useContractTaxFields). */
  taxField: PropTypes.func
};
