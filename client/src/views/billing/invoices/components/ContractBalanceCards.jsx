import PropTypes from 'prop-types';
import { IconChartPie, IconClockHour4, IconCreditCard, IconLock } from '@tabler/icons-react';

import DashboardCards from 'views/dashboard/Default/components/DashboardCards';
import { ACTION_TONES } from 'ui-component/extended/ActionButton';
import { fMoneyText } from 'utils/formatNumber';

/**
 * Saldos del contrato en lo alto del formulario de una factura de contrato
 * (DEC-065), como en el sistema que se migra: total anticipo, total
 * retenido, total amortizado y pendiente por amortizar. Son los de
 * `contractBalances` (DEC-044, DEC-051), solo con facturas aprobadas; el
 * servidor los vuelve a calcular bajo bloqueo al guardar y al aprobar.
 */
export default function ContractBalanceCards({ balances }) {
  if (!balances) return null;
  const money = (value) => fMoneyText(value) || '—';
  return (
    <DashboardCards
      dense
      label="Saldos del contrato"
      items={[
        {
          label: 'Total anticipo',
          value: money(balances.agreed),
          hint: 'Anticipo pactado',
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

ContractBalanceCards.propTypes = { balances: PropTypes.object };
