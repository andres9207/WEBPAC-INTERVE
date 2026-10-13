import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { IconPlus } from '@tabler/icons-react';

import InvoicesTab from './InvoicesTab';
import { useAuth } from 'contexts/AuthContext';
import useInvoiceViews from 'hooks/useInvoiceViews';
import { INVOICE_TYPE_OPTIONS, invoicePath } from 'utils/constants';

/**
 * Facturas de un contrato, en su expediente (DEC-042). Registrar ofrece solo
 * los tipos que el estado del contrato admite hoy (`allowedActions` del
 * contrato, ADR-0017), y abre el formulario de la vista de su clase (DEC-054)
 * con el tipo y el contrato ya elegidos. Exige ver esa vista.
 */

// Acción del contrato (STATE_ALLOWS) que habilita cada tipo de factura.
const TYPE_BY_ACTION = { invoiceAdvance: 'ADVANCE', invoiceLiquidation: 'LIQUIDATION', invoiceRetentionRefund: 'RETENTION_REFUND' };

export default function ContractInvoicesTab({ contract }) {
  const navigate = useNavigate();
  const { permissionsCatalog, hasPermission } = useAuth();
  const createId = permissionsCatalog.billing?.invoices?.create;
  const seesClass = useInvoiceViews().includes(contract.billingClass);
  const canCreate = createId != null && hasPermission(createId) && seesClass;

  const admitted = canCreate ? contract.allowedActions.map((action) => TYPE_BY_ACTION[action]).filter(Boolean) : [];

  const actions = admitted.length > 0 && (
    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
      {admitted.map((type) => (
        <Button
          key={type}
          size="small"
          variant="outlined"
          color="secondary"
          startIcon={<IconPlus size={16} />}
          onClick={() => navigate(`${invoicePath(contract.billingClass, 'new')}?type=${type}&ctrId=${contract.ctrId}`)}
        >
          Factura de {INVOICE_TYPE_OPTIONS.find((o) => o.value === type)?.label.toLowerCase()}
        </Button>
      ))}
    </Stack>
  );

  return (
    <InvoicesTab
      filter={{ ctrId: contract.ctrId }}
      hideColumns={['work', 'provider']}
      actions={actions || null}
      emptyTitle="Todavía no hay facturas en este contrato."
      emptyText="En ejecución se registran facturas de anticipo; en liquidación, de liquidación y de devolución de retenido. Un contrato con facturas no se puede eliminar ni cambiar de proveedor."
    />
  );
}

ContractInvoicesTab.propTypes = {
  /** Contrato del expediente: `{ ctrId, billingClass, allowedActions }`. */
  contract: PropTypes.object.isRequired
};
