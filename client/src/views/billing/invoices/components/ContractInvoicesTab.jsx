import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { IconEye, IconPlus } from '@tabler/icons-react';

import DataTable from 'ui-component/extended/DataTable';
import { Pending } from 'ui-component/extended/DetailBlocks';
import StatusChip from 'ui-component/extended/StatusChip';
import { INVOICE_COLUMNS } from '../InvoicesPage';
import { invoicesApi } from 'api/requests/invoicesApi';
import { useAuth } from 'contexts/AuthContext';
import { useSocket } from 'socket/SocketProvider';
import { showError } from 'services/ToastService';
import { INVOICE_STATE_COLORS, INVOICE_TYPE_OPTIONS } from 'utils/constants';

/**
 * Facturas de un contrato, en su expediente (DEC-042): el mismo listado de
 * facturas filtrado por el contrato (`ctrId`), paginado en el servidor. Abrir
 * una lleva a su expediente. Registrar ofrece solo los tipos que el estado
 * del contrato admite hoy (`allowedActions` del contrato, ADR-0017), y abre
 * el formulario con el tipo y el contrato ya elegidos.
 */

// Acción del contrato (STATE_ALLOWS) que habilita cada tipo de factura.
const TYPE_BY_ACTION = { invoiceAdvance: 'ADVANCE', invoiceLiquidation: 'LIQUIDATION', invoiceRetentionRefund: 'RETENTION_REFUND' };

const COLUMNS = [
  ...INVOICE_COLUMNS.filter((column) => column.id !== 'work' && column.id !== 'provider'),
  {
    id: 'state',
    label: 'Estado',
    render: (row) => <StatusChip staId={row.state} label={row.stateName} scope={null} colorMap={INVOICE_STATE_COLORS} />
  }
];

export default function ContractInvoicesTab({ contract }) {
  const navigate = useNavigate();
  const socket = useSocket();
  const { permissionsCatalog, hasPermission } = useAuth();
  const perms = permissionsCatalog.billing?.invoices;
  const canDo = (perId) => perId != null && hasPermission(perId);
  const canView = canDo(perms?.view);

  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!canView) return;
    setLoading(true);
    try {
      const { data } = await invoicesApi.pagination({
        ctrId: contract.ctrId,
        first: page * rowsPerPage,
        rows: rowsPerPage,
        sortField: 'date',
        sortOrder: -1
      });
      setRows(data.results);
      setTotal(data.total);
    } catch (err) {
      showError(err.response?.data?.message || 'Error al cargar las facturas del contrato');
    } finally {
      setLoading(false);
    }
  }, [canView, contract.ctrId, page, rowsPerPage]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!socket) return undefined;
    socket.on('refresh-invoices', load);
    return () => socket.off('refresh-invoices', load);
  }, [socket, load]);

  if (!canView) return <Pending title="Sin acceso a facturas." text="Tu perfil no tiene el permiso de ver facturas." />;

  const admitted = canDo(perms?.create) ? contract.allowedActions.map((action) => TYPE_BY_ACTION[action]).filter(Boolean) : [];
  const register = (type) => navigate(`/billing/invoices/new?type=${type}&ctrId=${contract.ctrId}`);

  const actions = admitted.length > 0 && (
    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
      {admitted.map((type) => (
        <Button
          key={type}
          size="small"
          variant="outlined"
          color="secondary"
          startIcon={<IconPlus size={16} />}
          onClick={() => register(type)}
        >
          Factura de {INVOICE_TYPE_OPTIONS.find((o) => o.value === type)?.label.toLowerCase()}
        </Button>
      ))}
    </Stack>
  );

  if (!loading && total === 0) {
    return (
      <Stack spacing={2}>
        <Pending
          title="Todavía no hay facturas en este contrato."
          text="En ejecución se registran facturas de anticipo; en liquidación, de liquidación y de devolución de retenido. Un contrato con facturas no se puede eliminar ni cambiar de proveedor."
        />
        {actions}
      </Stack>
    );
  }

  return (
    <Stack spacing={1}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' } }}>
        <Typography variant="caption" color="text.secondary">
          Solo las facturas aprobadas cuentan. Las anuladas quedan en el historial.
        </Typography>
        {actions}
      </Stack>
      <DataTable
        columns={COLUMNS}
        rows={rows}
        total={total}
        loading={loading}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, p) => setPage(p)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(+e.target.value);
          setPage(0);
        }}
        keyExtractor={(row) => row.invId}
        cardTitleRender={(row) => `${row.typeName} ${row.number}`}
        actions={(row) => [
          { label: 'Ver factura', icon: <IconEye size={16} />, command: () => navigate(`/billing/invoices/${row.invId}`), tone: 'info' }
        ]}
        emptyMessage="Sin facturas."
      />
    </Stack>
  );
}

ContractInvoicesTab.propTypes = {
  /** Contrato del expediente: `{ ctrId, allowedActions }`. */
  contract: PropTypes.object.isRequired
};
