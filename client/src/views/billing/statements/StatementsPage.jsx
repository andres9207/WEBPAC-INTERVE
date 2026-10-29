import { useCallback, useEffect, useMemo, useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Outlet } from 'react-router-dom';
import { IconReportAnalytics, IconSearch } from '@tabler/icons-react';

import MainCard from 'ui-component/cards/MainCard';
import DataTable from 'ui-component/extended/DataTable';
import FilterButton from 'ui-component/extended/FilterButton';
import StatementReportDialog from './components/StatementReportDialog';
import { paginationStatementGroupsAPI } from 'api/requests/statementsApi';
import { useAuth } from 'contexts/AuthContext';
import { useWorkFilterField, useWorkScope } from 'contexts/WorkScopeContext';
import useListFilters from 'hooks/useListFilters';
import { showError } from 'services/ToastService';
import { fMoneyText } from 'utils/formatNumber';
import { fDateOnly } from 'utils/formatTime';
import { STATEMENT_GLOSS_FILTER_OPTIONS, STATEMENT_VOUCHER_FILTER_OPTIONS, STATEMENTS_PATH } from 'utils/constants';
import { ALL_WORKS } from 'utils/workScope';

// Extractos (DEC-084): solo lectura. El extracto es un texto libre de la
// factura; aquí se agrupan las facturas por obra y texto, con cuántas lo
// usan, sus fechas, su total sin las anuladas y el total pagado con las
// glosas (levantadas en él, menos liberadas en él). "Reporte" abre sus facturas,
// los totales por menú y el chequeo de comprobantes de egreso, y se exporta.
// Con una obra elegida en el encabezado, los de esa obra; con "Ver todo",
// todos, con la columna y el filtro de obra. Filtros (DEC-048): rango de
// número (como se ordena: "9" antes que "10"), rango de fechas (alguna factura
// en el rango), comprobante de egreso y glosas. Una factura del reporte se abre encima, en
// el `Outlet` (ruta hija, como en el tablero); al cerrarla se vuelve al
// reporte, que se recarga si la factura cambió.

const num = { fontVariantNumeric: 'tabular-nums' };

const BASE_COLUMNS = [
  { id: 'number', label: 'Extracto', sortable: true, render: (row) => <Typography variant="subtitle2">{row.number}</Typography> },
  { id: 'invoicesCount', label: 'Facturas', align: 'right', sortable: true },
  { id: 'approvedCount', label: 'Aprobadas', align: 'right' },
  { id: 'withoutVoucher', label: 'Sin comprobante', align: 'right', render: (row) => row.withoutVoucher || '—' },
  { id: 'firstDate', label: 'Primera factura', sortable: true, render: (row) => fDateOnly(row.firstDate) },
  { id: 'lastDate', label: 'Última factura', sortable: true, render: (row) => fDateOnly(row.lastDate) },
  { id: 'total', label: 'Total facturas', align: 'right', render: (row) => <span style={num}>{fMoneyText(row.total)}</span> },
  // Glosas levantadas en el extracto que suman al total, y el total pagado con ellas (DEC-085).
  {
    id: 'glossesNet',
    label: 'Glosas',
    align: 'right',
    render: (row) => (Number(row.glossesNet) ? <span style={num}>{fMoneyText(row.glossesNet)}</span> : '—')
  },
  { id: 'paidTotal', label: 'Total pagado', align: 'right', render: (row) => <span style={num}>{fMoneyText(row.paidTotal)}</span> }
];
const WORK_COLUMN = { id: 'workCode', label: 'Obra', sortable: true, render: (row) => `${row.workCode} — ${row.workName}` };

const rowKey = (row) => `${row.wrkId}|${row.number}`;

const FILTER_FIELDS = [
  { key: 'numberFrom', type: 'input', label: 'Extracto desde', props: { maxLength: 20 }, grid: { xs: 12, sm: 6 } },
  { key: 'numberTo', type: 'input', label: 'Extracto hasta', props: { maxLength: 20 }, grid: { xs: 12, sm: 6 } },
  { key: 'date', type: 'calendar-range', label: 'Fecha de sus facturas' },
  { key: 'voucher', type: 'dropdown', label: 'Comprobante', props: { options: STATEMENT_VOUCHER_FILTER_OPTIONS }, grid: { xs: 12, sm: 6 } },
  { key: 'gloss', type: 'dropdown', label: 'Glosas', props: { options: STATEMENT_GLOSS_FILTER_OPTIONS }, grid: { xs: 12, sm: 6 } }
];

export default function StatementsPage() {
  const { permissionsCatalog, hasPermission } = useAuth();
  const { activeWork } = useWorkScope();
  const perms = permissionsCatalog.billing?.statements;
  const allWorks = activeWork === ALL_WORKS;

  const [search, setSearch] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [sort, setSort] = useState({ field: 'lastDate', order: -1 });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState({ rows: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [reporting, setReporting] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const outletContext = useMemo(() => ({ returnTo: STATEMENTS_PATH, refresh: () => setReloadKey((k) => k + 1) }), []);
  const workFilter = useWorkFilterField();
  const filterFields = useMemo(() => (workFilter ? [...FILTER_FIELDS, workFilter] : FILTER_FIELDS), [workFilter]);
  const backToFirstPage = useCallback(() => setPage(0), []);
  const filters = useListFilters(filterFields, backToFirstPage);

  // Se busca al dejar de escribir, desde la primera página.
  useEffect(() => {
    const timer = setTimeout(() => {
      setAppliedSearch(search.trim());
      setPage(0);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    paginationStatementGroupsAPI({
      search: appliedSearch,
      ...filters.params,
      first: page * rowsPerPage,
      rows: rowsPerPage,
      sortField: sort.field,
      sortOrder: sort.order
    })
      .then(({ data: res }) => !cancelled && setData({ rows: res.results, total: res.total }))
      .catch((err) => !cancelled && showError(err.response?.data?.message || 'Error al cargar los extractos'))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [appliedSearch, filters.params, page, rowsPerPage, sort, activeWork, reloadKey]);

  const columns = useMemo(() => (allWorks ? [WORK_COLUMN, ...BASE_COLUMNS] : BASE_COLUMNS), [allWorks]);
  const closeReport = useCallback(() => setReporting(null), []);
  const handleSort = (field) => {
    setSort((current) => ({ field, order: current.field === field ? -current.order : 1 }));
    setPage(0);
  };

  return (
    <>
      <MainCard
        title="Extractos"
        secondary={
          <Stack direction="row" spacing={1} alignItems="center">
            <FilterButton fields={filterFields} values={filters.values} setValues={filters.setValues} active={filters.active} />
            <TextField
              size="small"
              placeholder="Buscar extracto"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              slotProps={{
                htmlInput: { maxLength: 20, 'aria-label': 'Buscar extracto' },
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch size={16} />
                    </InputAdornment>
                  )
                }
              }}
            />
          </Stack>
        }
      >
        <Stack spacing={1}>
          <Typography variant="caption" color="text.secondary">
            Cada extracto agrupa las facturas de su obra que lo tienen escrito en el campo Extracto. El total no cuenta las anuladas.
          </Typography>
          <DataTable
            columns={columns}
            rows={data.rows}
            total={data.total}
            loading={loading}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={(_, p) => setPage(p)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(+e.target.value);
              setPage(0);
            }}
            sortField={sort.field}
            sortOrder={sort.order}
            onSort={handleSort}
            keyExtractor={rowKey}
            cardTitleRender={(row) => `Extracto ${row.number}`}
            actions={(row) => [
              { label: 'Reporte', icon: <IconReportAnalytics size={16} />, command: () => setReporting(row), tone: 'info' }
            ]}
            emptyMessage={
              appliedSearch || filters.hasFilters
                ? 'Ningún extracto coincide con la búsqueda o los filtros.'
                : 'Todavía no hay facturas con extracto. Se escribe en el formulario de la factura.'
            }
          />
        </Stack>
      </MainCard>
      <StatementReportDialog
        statement={reporting}
        canExport={perms?.export != null && hasPermission(perms.export)}
        reloadKey={reloadKey}
        onClose={closeReport}
      />
      <Outlet context={outletContext} />
    </>
  );
}
