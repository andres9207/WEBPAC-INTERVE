import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { IconPlus } from '@tabler/icons-react';

import InvoicesTab from './InvoicesTab';
import { useAuth } from 'contexts/AuthContext';
import { useCanViewInvoices } from 'hooks/useInvoiceMenus';
import { INVOICE_MODES, INVOICE_TYPE_OPTIONS, invoicePath } from 'utils/constants';

/**
 * Facturas de un contrato, en su expediente (DEC-042). Registrar ofrece solo
 * los tipos que el estado del contrato admite hoy (`allowedActions` del
 * contrato, ADR-0017), y abre el formulario en el menú de su tipo de
 * proveedor (DEC-074) con el tipo y el contrato ya elegidos, aunque ese menú
 * esté oculto. Un contrato cuyo tipo no factura con contrato no admite
 * facturas nuevas: la pestaña lo avisa y sigue mostrando las que ya tiene.
 */

// Acción del contrato (STATE_ALLOWS) que habilita cada tipo de factura.
const TYPE_BY_ACTION = {
  invoiceAdvance: 'ADVANCE',
  invoiceNormal: 'NORMAL',
  invoiceLiquidation: 'LIQUIDATION',
  invoiceRetentionRefund: 'RETENTION_REFUND'
};

export default function ContractInvoicesTab({ contract }) {
  const navigate = useNavigate();
  const { permissionsCatalog, hasPermission } = useAuth();
  const createId = permissionsCatalog.billing?.invoices?.create;
  const canViewInvoices = useCanViewInvoices();
  const invoiceable = contract.invoiceMode === INVOICE_MODES.CONTRACT;
  const canCreate = createId != null && hasPermission(createId) && canViewInvoices && invoiceable;

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
          onClick={() => navigate(`${invoicePath(contract.pvtId, 'new')}?type=${type}&ctrId=${contract.ctrId}`)}
        >
          Factura de {INVOICE_TYPE_OPTIONS.find((o) => o.value === type)?.label.toLowerCase()}
        </Button>
      ))}
    </Stack>
  );

  const list = (
    <InvoicesTab
      filter={{ ctrId: contract.ctrId }}
      hideColumns={['work', 'provider', 'menu']}
      actions={actions || null}
      emptyTitle="Todavía no hay facturas en este contrato."
      emptyText="En ejecución se registran facturas de anticipo; en liquidación, de liquidación y de devolución de retenido. Un contrato con facturas no se puede eliminar ni cambiar de proveedor ni de tipo de proveedor."
    />
  );
  if (invoiceable) return list;

  return (
    <Stack spacing={2}>
      <Alert severity="warning">
        Este contrato se firmó bajo el tipo de proveedor {contract.providerTypeName ?? ''}, que no factura con contrato: no admite facturas nuevas.
      </Alert>
      {list}
    </Stack>
  );
}

ContractInvoicesTab.propTypes = {
  /** Contrato del expediente: `{ ctrId, pvtId, providerTypeName, invoiceMode, allowedActions }`. */
  contract: PropTypes.object.isRequired
};
