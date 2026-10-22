import { useMemo, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { IconDownload } from '@tabler/icons-react';

import MasterPage from 'ui-component/extended/MasterPage';
import LinkedFilterNotice from 'ui-component/extended/LinkedFilterNotice';
import ExportDialog from 'ui-component/extended/ExportDialog';
import useLinkedFilters from 'hooks/useLinkedFilters';
import { contractsApi, exportContractAPI, exportContractsAPI, getContractFilterProvidersAPI } from 'api/requests/contractsApi';
import { getContractTypesSelectAPI } from 'api/requests/contractTypesApi';
import { useAuth } from 'contexts/AuthContext';
import { useWorkFilterField } from 'contexts/WorkScopeContext';
import { fMoneyText } from 'utils/formatNumber';
import { fDateOnly } from 'utils/formatTime';
import { CONTRACT_POLICY_STATUS_LABELS, CONTRACT_STATE_COLORS, CONTRACT_STATE_TABS } from 'utils/constants';

// Contratos (ADR-0015, DEC-035). Reutiliza el listado de MasterPage con
// pestañas por el estado del ciclo de vida (en ejecución, suspendido, en
// liquidación, liquidado), no por activo/inactivo. Detalle, alta y edición
// son rutas hijas que se abren en un modal sobre el listado (DEC-034). El
// valor vigente y la fecha fin los calcula el servidor (FRONTEND_STANDARD,
// regla 9). El tipo de contrato va en su propia columna y es uno de los
// filtros del listado (DEC-048): las pestañas cuentan dentro de los filtros.
// Desde el tablero llega con el estado de pólizas o "con conceptos sin
// póliza" (DEC-052): el servidor filtra con el mismo predicado de la cifra.

export const CONTRACT_COLUMNS = [
  { id: 'number', label: 'Número', sortable: true },
  {
    id: 'contractType',
    label: 'Tipo',
    sortable: true,
    render: (row) => (row.contractType ? <Chip label={row.contractType} size="small" color="primary" variant="outlined" /> : '—'),
    cardRender: (row) => row.contractType ?? '—'
  },
  {
    id: 'name',
    label: 'Contrato',
    sortable: true,
    render: (row) => (
      <>
        <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.dark' }}>
          {row.name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {row.providerName}
        </Typography>
      </>
    ),
    cardRender: (row) => `${row.name} · ${row.providerName ?? ''}`
  },
  {
    id: 'work',
    label: 'Obra · etapa',
    sortable: true,
    render: (row) => (
      <>
        <Typography variant="body2">{row.workCode}</Typography>
        <Typography variant="caption" color="text.secondary">
          {row.stageName}
        </Typography>
      </>
    ),
    cardRender: (row) => [row.workCode, row.stageName].filter(Boolean).join(' · ')
  },
  {
    id: 'currentValue',
    label: 'Valor vigente',
    align: 'right',
    render: (row) => <span style={{ fontVariantNumeric: 'tabular-nums' }}>{fMoneyText(row.currentValue)}</span>
  },
  {
    id: 'endDate',
    label: 'Fecha fin',
    sortable: true,
    // Suspendido: la fecha fin no incluye todavía los días de la suspensión (PRO-BE-10).
    render: (row) =>
      row.endDateProvisional ? (
        <span title="Provisional: al reanudar el contrato se suman los días de la suspensión">
          {fDateOnly(row.endDate)} <Chip label="Provisional" size="small" color="warning" variant="outlined" />
        </span>
      ) : (
        fDateOnly(row.endDate)
      )
  }
];

export const CONTRACT_STATE_FILTER = { param: 'state', tabs: CONTRACT_STATE_TABS, colors: CONTRACT_STATE_COLORS };

const rowLabel = (row) => `${row.number} — ${row.name}`;

/** Nombre de archivo del reporte de un contrato: su número sin caracteres raros. */
export const contractFileName = (number) => `contrato_${String(number ?? '').replace(/[^\w-]+/g, '_')}`;

// Reportes del botón Exportar (DEC-070): el listado y los de control del
// sistema que se migra, con los mismos filtros de la tabla.
const CONTRACT_REPORTS = [
  { value: 'list', label: 'Listado', fileName: 'contratos' },
  { value: 'control', label: 'Control de contratos', fileName: 'control_contratos' },
  { value: 'advances', label: 'Anticipos y retenidos', fileName: 'control_anticipos_retenidos' }
];

const LINKED_KEYS = ['policyStatus', 'uncovered'];
const describeLinked = (filters) =>
  filters.policyStatus
    ? `contratos ${CONTRACT_POLICY_STATUS_LABELS[filters.policyStatus]?.toLowerCase() ?? ''}`
    : 'contratos con conceptos sin póliza';

// Filtros del listado (DEC-048). El de obra, solo con "Ver todo" (useWorkFilterField).
const FILTER_FIELDS = [
  { key: 'number', type: 'input', label: 'Número', props: { maxLength: 50 }, grid: { xs: 12, sm: 4 } },
  { key: 'name', type: 'input', label: 'Nombre', props: { maxLength: 200 }, grid: { xs: 12, sm: 8 } },
  {
    key: 'cttId',
    type: 'socketDropdown',
    label: 'Tipo de contrato',
    fetchApi: () => getContractTypesSelectAPI(),
    socketEvent: 'refresh-contract-types',
    grid: { xs: 12, sm: 6 }
  },
  // Proveedor: los que tienen contratos, buscados en el servidor (tienen tope, DEC-018).
  {
    key: 'prvId',
    type: 'remoteDropdown',
    label: 'Proveedor',
    fetchOptions: ({ search, includeId }) =>
      getContractFilterProvidersAPI({ ...(search ? { search } : {}), ...(includeId ? { includePrvId: includeId } : {}) }).then(
        (res) => res.data
      ),
    grid: { xs: 12, sm: 6 }
  },
  { key: 'endDate', type: 'calendar-range', label: 'Fecha fin' }
];

export default function ContractsPage() {
  const { permissionsCatalog, hasPermission } = useAuth();
  const [exporting, setExporting] = useState(null);
  const navigate = useNavigate();
  const [reloadKey, setReloadKey] = useState(0);
  const outletContext = useMemo(() => ({ refresh: () => setReloadKey((k) => k + 1) }), []);
  const workFilter = useWorkFilterField();
  const filterFields = useMemo(() => (workFilter ? [...FILTER_FIELDS, workFilter] : FILTER_FIELDS), [workFilter]);
  const linked = useLinkedFilters(LINKED_KEYS, describeLinked);
  // Reporte de lo que muestra la tabla, sin paginar (DEC-070).
  const exportOptions = useMemo(
    () => ({
      permission: permissionsCatalog.work?.contracts?.export,
      request: exportContractsAPI,
      fileName: 'contratos',
      reports: CONTRACT_REPORTS
    }),
    [permissionsCatalog]
  );

  // Reporte de un contrato desde su fila: el expediente completo (DEC-070).
  const exportPermission = permissionsCatalog.work?.contracts?.export;
  const canExport = exportPermission != null && hasPermission(exportPermission);
  const extraActions = useMemo(
    () =>
      canExport
        ? (row) => [{ label: 'Exportar contrato', icon: <IconDownload size={16} />, command: () => setExporting(row), tone: 'neutral' }]
        : undefined,
    [canExport]
  );

  const navigation = useMemo(
    () => ({
      create: () => navigate('/work/contracts/new'),
      view: (row) => navigate(`/work/contracts/${row.ctrId}`),
      edit: (row) => navigate(`/work/contracts/${row.ctrId}/edit`)
    }),
    [navigate]
  );

  return (
    <>
      <MasterPage
        title="Contrato"
        idField="ctrId"
        api={contractsApi}
        permissions={permissionsCatalog.work?.contracts}
        columns={CONTRACT_COLUMNS}
        filterFields={filterFields}
        defaultSort="number"
        rowLabel={rowLabel}
        navigation={navigation}
        stateTabs={CONTRACT_STATE_FILTER}
        filters={linked.filters}
        initialStatus={linked.initialStatus}
        header={<LinkedFilterNotice label={linked.label} onClear={linked.clear} />}
        reloadKey={reloadKey}
        exportOptions={exportOptions}
        extraActions={extraActions}
      />
      {exporting && (
        <ExportDialog
          open
          onClose={() => setExporting(null)}
          title={`Exportar contrato ${exporting.number}`}
          description="Resumen, valor, conceptos, saldos, pólizas, facturas, suspensiones e historial: lo que puedas ver del contrato."
          request={(format) => exportContractAPI(exporting.ctrId, format)}
          fileName={contractFileName(exporting.number)}
        />
      )}
      <Outlet context={outletContext} />
    </>
  );
}
