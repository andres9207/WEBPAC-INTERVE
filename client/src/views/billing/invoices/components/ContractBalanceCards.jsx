import PropTypes from 'prop-types';
import { IconChartPie, IconCircleCheck, IconClockHour4, IconCreditCard, IconHourglass, IconLock } from '@tabler/icons-react';

import DashboardCards from 'views/dashboard/Default/components/DashboardCards';
import { ACTION_TONES } from 'ui-component/extended/ActionButton';
import { fMoneyText } from 'utils/formatNumber';

/**
 * Saldos del contrato en lo alto del formulario de una factura de contrato
 * (DEC-065), como en el sistema que se migra: anticipo por pagar
 * (pactado que falta por facturar), total retenido, total amortizado y pendiente por amortizar. Son los de
 * `contractBalances` (DEC-044, DEC-051), solo con facturas aprobadas; el
 * servidor los vuelve a calcular bajo bloqueo al guardar y al aprobar.
 *
 * En la factura de anticipo, el anticipo del contrato: pactado, facturado
 * (aprobado), por aprobar (las de anticipo registradas, sin la que se edita)
 * y lo que falta por facturar descontando lo por aprobar.
 */
export default function ContractBalanceCards({ balances, type }) {
  if (!balances) return null;
  const money = (value) => fMoneyText(value) || '—';
  if (type === 'ADVANCE') {
    const pending = balances.pending ?? {};
    const count = pending.count ?? 0;
    return (
      <DashboardCards
        dense
        label="Anticipo del contrato"
        items={[
          {
            label: 'Anticipo pactado',
            value: money(balances.agreed),
            hint: 'Total del anticipo del contrato',
            icon: IconCreditCard,
            tone: ACTION_TONES.info
          },
          {
            label: 'Anticipo facturado',
            value: money(balances.invoiced),
            hint: 'Facturas de anticipo aprobadas',
            icon: IconCircleCheck,
            tone: ACTION_TONES.success
          },
          {
            label: 'Por aprobar',
            value: money(pending.invoiced),
            hint: count === 1 ? '1 factura de anticipo registrada' : `${count} facturas de anticipo registradas`,
            icon: IconHourglass,
            tone: ACTION_TONES.edit
          },
          {
            label: 'Falta por facturar',
            value: money(pending.toInvoice ?? balances.toInvoice),
            hint: `Pactado menos lo facturado y lo por aprobar. Sin lo por aprobar: ${money(balances.toInvoice)}`,
            icon: IconClockHour4,
            tone: ACTION_TONES.danger
          }
        ]}
      />
    );
  }
  return (
    <DashboardCards
      dense
      label="Saldos del contrato"
      items={[
        {
          label: 'Anticipo por pagar',
          value: money(balances.toInvoice),
          hint: `Anticipo pactado ${money(balances.agreed)} menos lo ya facturado ${money(balances.invoiced)}`,
          icon: IconCreditCard,
          tone: ACTION_TONES.danger
        },
        {
          label: 'Total retenido',
          value: money(balances.retention?.retained),
          hint: 'Retenido acumulado',
          icon: IconLock,
          tone: ACTION_TONES.info
        },
        {
          label: 'Total amortizado',
          value: money(balances.amortized),
          hint: 'Anticipo amortizado',
          icon: IconChartPie,
          tone: ACTION_TONES.success
        },
        {
          label: 'Pendiente amortizar',
          value: money(balances.toAmortize),
          hint: 'Anticipo facturado sin amortizar',
          icon: IconClockHour4,
          tone: ACTION_TONES.neutral
        }
      ]}
    />
  );
}

ContractBalanceCards.propTypes = { balances: PropTypes.object, type: PropTypes.string };
