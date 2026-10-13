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
 * contrato, ADR-0017), y abre el formulario del menú de facturas de los tipos
 * de su proveedor (DEC-056) con el tipo y el contrato ya elegidos. Exige ver
 * ese menú. Un proveedor sin tipo con menú no admite facturas nuevas: la
 * pestaña lo avisa y sigue mostrando las que ya tiene (cada una, en su menú).
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

  const list = (
    <InvoicesTab
      filter={{ ctrId: contract.ctrId }}
      hideColumns={['work', 'provider']}
      actions={actions || null}
      emptyTitle="Todavía no hay facturas en este contrato."
      emptyText="En ejecución se registran facturas de anticipo; en liquidación, de liquidación y de devolución de retenido. Un contrato con facturas no se puede eliminar ni cambiar de proveedor."
    />
  );
  if (view) return list;

  return (
    <Stack spacing={2}>
      <Alert severity="warning">
        El proveedor «{contract.providerName}» no tiene un tipo de proveedor con menú de facturas: este contrato no admite facturas nuevas
        hasta que se defina en el maestro de tipos de proveedor.
      </Alert>
      {list}
    </Stack>
  );
}

ContractInvoicesTab.propTypes = {
  /** Contrato del expediente: `{ ctrId, providerName, invoiceView, allowedActions }`. */
  contract: PropTypes.object.isRequired
};
