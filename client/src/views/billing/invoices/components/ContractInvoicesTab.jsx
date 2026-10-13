import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Alert from '@mui/material/Alert';
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
 * contrato, ADR-0017), y abre el formulario del menú de facturas de su tipo
 * de contrato (DEC-054) con el tipo y el contrato ya elegidos. Exige ver ese
 * menú. Un tipo sin menú definido no admite facturas: la pestaña lo avisa.
 */

// Acción del contrato (STATE_ALLOWS) que habilita cada tipo de factura.
const TYPE_BY_ACTION = { invoiceAdvance: 'ADVANCE', invoiceLiquidation: 'LIQUIDATION', invoiceRetentionRefund: 'RETENTION_REFUND' };

export default function ContractInvoicesTab({ contract }) {
  const navigate = useNavigate();
  const { permissionsCatalog, hasPermission } = useAuth();
  const createId = permissionsCatalog.billing?.invoices?.create;
  const view = contract.invoiceView;
  const seesView = useInvoiceViews().includes(view);
  const canCreate = createId != null && hasPermission(createId) && seesView;

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
          onClick={() => navigate(`${invoicePath(view, 'new')}?type=${type}&ctrId=${contract.ctrId}`)}
        >
          Factura de {INVOICE_TYPE_OPTIONS.find((o) => o.value === type)?.label.toLowerCase()}
        </Button>
      ))}
    </Stack>
  );

  if (!view) {
    return (
      <Alert severity="warning">
        El tipo de contrato «{contract.contractType}» no tiene definido su menú de facturas: este contrato no admite facturas hasta que se
        defina en el maestro de tipos de contrato.
      </Alert>
    );
  }

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
  /** Contrato del expediente: `{ ctrId, contractType, invoiceView, allowedActions }`. */
  contract: PropTypes.object.isRequired
};
