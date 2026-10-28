import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { IconEye } from '@tabler/icons-react';

import DataTable from 'ui-component/extended/DataTable';
import { Pending } from 'ui-component/extended/DetailBlocks';
import StatusChip from 'ui-component/extended/StatusChip';
import { INVOICE_COLUMNS } from '../InvoicesPage';
import { invoicesApi } from 'api/requests/invoicesApi';
import { useCanViewInvoices } from 'hooks/useInvoiceMenus';
import { useSocket } from 'socket/SocketProvider';
import { showError } from 'services/ToastService';
import { INVOICE_STATE_COLORS, invoicePath } from 'utils/constants';

/**
 * Facturas dentro del expediente de otro agregado (DEC-042): el mismo
 * listado de facturas, paginado en el servidor y filtrado por el contrato,
 * la obra o el proveedor (`filter`). Abrir una lleva a su expediente, en su
 * menú (DEC-074), que la tabla muestra. Sin el permiso de ver facturas, la
 * pestaña lo dice en vez de cargar.
 *
 * Las columnas que repetirían el expediente se ocultan (`hideColumns`). Lo
 * que se puede registrar desde aquí lo decide quien la usa (`actions`).
 */

// Menú de la factura (DEC-074): el nombre de su tipo de proveedor.
const MENU_COLUMN = { id: 'menu', label: 'Menú', render: (row) => row.menuName ?? '—' };

const STATE_COLUMN = {
  id: 'state',
  label: 'Estado',
  render: (row) => <StatusChip staId={row.state} label={row.stateName} scope={null} colorMap={INVOICE_STATE_COLORS} />
};

/**
 * Cuántas facturas lista la pestaña, para el contador del encabezado de
 * pestañas del expediente, que se ve antes de abrirla. Lo pide al mismo
 * listado, así que cuenta lo mismo que la tabla (alcance por obra, sin las
 * eliminadas) y se actualiza con ella. Sin permiso de ver facturas, no hay
 * contador (`undefined`).
 */
export function useInvoicesCount({ ctrId, wrkId, prvId }) {
  const socket = useSocket();
  const canView = useCanViewInvoices();
  const [count, setCount] = useState();

  const load = useCallback(async () => {
    if (!canView || !(ctrId || wrkId || prvId)) return;
    try {
      const { data } = await invoicesApi.pagination({
        ...(ctrId ? { ctrId } : {}),
        ...(wrkId ? { wrkId } : {}),
        ...(prvId ? { prvId } : {}),
        first: 0,
        rows: 1
      });
      setCount(data.total);
    } catch {
      // El contador es accesorio: la pestaña muestra el error al abrirse.
    }
  }, [canView, ctrId, wrkId, prvId]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!socket) return undefined;
    socket.on('refresh-invoices', load);
    return () => socket.off('refresh-invoices', load);
  }, [socket, load]);

  return canView ? count : undefined;
}

export default function InvoicesTab({ filter, hideColumns = [], actions = null, emptyTitle, emptyText }) {
  const navigate = useNavigate();
  const socket = useSocket();
  const canView = useCanViewInvoices();

  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  const { ctrId, wrkId, prvId } = filter;

  const load = useCallback(async () => {
    if (!canView) return;
    setLoading(true);
    try {
      const { data } = await invoicesApi.pagination({
        ...(ctrId ? { ctrId } : {}),
        ...(wrkId ? { wrkId } : {}),
        ...(prvId ? { prvId } : {}),
        first: page * rowsPerPage,
        rows: rowsPerPage,
        sortField: 'date',
        sortOrder: -1
      });
      setRows(data.results);
      setTotal(data.total);
    } catch (err) {
      showError(err.response?.data?.message || 'Error al cargar las facturas');
    } finally {
      setLoading(false);
    }
  }, [canView, ctrId, wrkId, prvId, page, rowsPerPage]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!socket) return undefined;
    socket.on('refresh-invoices', load);
    return () => socket.off('refresh-invoices', load);
  }, [socket, load]);

  if (!canView) return <Pending title="Sin acceso a facturas." text="Tu perfil no tiene permiso para ver facturas." />;

  if (!loading && total === 0) {
    return (
      <Stack spacing={2}>
        <Pending title={emptyTitle} text={emptyText} />
        {actions}
      </Stack>
    );
  }

  const columns = [MENU_COLUMN, ...INVOICE_COLUMNS, STATE_COLUMN].filter((column) => !hideColumns.includes(column.id));

  return (
    <Stack spacing={1}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' } }}>
        <Typography variant="caption" color="text.secondary">
          Solo las facturas aprobadas cuentan. Las anuladas quedan en el historial.
        </Typography>
        {actions}
      </Stack>
      <DataTable
        columns={columns}
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
          { label: 'Ver factura', icon: <IconEye size={16} />, command: () => navigate(invoicePath(row.pvtId, row.invId)), tone: 'info' }
        ]}
        emptyMessage="Sin facturas."
      />
    </Stack>
  );
}

InvoicesTab.propTypes = {
  /** Una sola clave: `{ ctrId }`, `{ wrkId }` o `{ prvId }`. */
  filter: PropTypes.shape({ ctrId: PropTypes.number, wrkId: PropTypes.number, prvId: PropTypes.number }).isRequired,
  /** Columnas de INVOICE_COLUMNS que repetirían el expediente (`work`, `provider`). */
  hideColumns: PropTypes.arrayOf(PropTypes.string),
  /** Botones para registrar desde aquí, si los hay. */
  actions: PropTypes.node,
  emptyTitle: PropTypes.string.isRequired,
  emptyText: PropTypes.string
};
