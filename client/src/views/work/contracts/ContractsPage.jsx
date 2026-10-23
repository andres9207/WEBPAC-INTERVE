import { useEffect, useMemo, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { IconDownload } from '@tabler/icons-react';

import MasterPage from 'ui-component/extended/MasterPage';
import LinkedFilterNotice from 'ui-component/extended/LinkedFilterNotice';
import ExportDialog from 'ui-component/extended/ExportDialog';
import useLinkedFilters from 'hooks/useLinkedFilters';
import {
  contractsApi,
  exportContractAPI,
  exportContractsAPI,
  getContractFilterProvidersAPI,
  getContractFilterStagesAPI,
  getContractMenuAPI
} from 'api/requests/contractsApi';
import { getContractTypesSelectAPI } from 'api/requests/contractTypesApi';
import { useAuth } from 'contexts/AuthContext';
import { useWorkFilterField } from 'contexts/WorkScopeContext';
import { fMoneyText } from 'utils/formatNumber';
import { fDateOnly } from 'utils/formatTime';
import { CONTRACT_POLICY_STATUS_LABELS, CONTRACT_STATE_COLORS, CONTRACT_STATE_TABS, contractPath } from 'utils/constants';

// Contratos (ADR-0015, DEC-035). Reutiliza el listado de MasterPage con
// pestañas por el estado del ciclo de vida (en ejecución, suspendido, en
// liquidación, liquidado), no por activo/inactivo. Detalle, alta y edición
// son rutas hijas que se abren en un modal sobre el listado (DEC-034), en una
// sola vista con pestañas (DEC-057). El valor vigente y la fecha fin los
// calcula el servidor (FRONTEND_STANDARD, regla 9). El tipo de contrato va en su propia columna y es uno de los
// filtros del listado (DEC-048): las pestañas cuentan dentro de los filtros.
// Desde el tablero llega con el estado de pólizas o "con conceptos sin
// póliza" (DEC-052): el servidor filtra con el mismo predicado de la cifra.
// Menús dinámicos (DEC-077): la misma pantalla es "Todos" (`/work/contracts`)
// y el listado de un menú (`/work/contracts/menu/:pvtId`), que muestra solo los
// contratos firmados bajo ese tipo de proveedor y lo fija al crear.

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

// "A vencer" (DEC-072): los contratos en ejecución con la fecha fin dentro de los días de aviso de la regla de
// negocio (30 por defecto, configurable). No es un estado: es parte de "En ejecución", así que no suma a "Todos".
export const CONTRACT_STATE_FILTER = {
  param: 'state',
  tabs: [...CONTRACT_STATE_TABS, { id: 'EXPIRING', name: 'A vencer', color: 'warning', subset: true }],
  colors: CONTRACT_STATE_COLORS
};

// "Pólizas por vencer" (DEC-072): contratos no liquidados con alguna póliza vigente vencida o dentro de los días de
// aviso de pólizas. Revela datos de pólizas: solo con el permiso de verlas (el servidor responde 403 sin él).
const POLICIES_EXPIRING_TAB = { id: 'POLICIES_EXPIRING', name: 'Pólizas por vencer', color: 'error', subset: true };

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
  // Etapa: las que tienen contratos, con el código de su obra (con "Ver todo" hay etapas de varias obras).
  {
    key: 'wksId',
    type: 'remoteDropdown',
    label: 'Etapa',
    fetchOptions: ({ search, includeId }) =>
      getContractFilterStagesAPI({ ...(search ? { search } : {}), ...(includeId ? { includeWksId: includeId } : {}) }).then(
        (res) => res.data
      ),
    grid: { xs: 12, sm: 6 }
  },
  // Estado: uno o varios, aparte de la pestaña (`state`); las pestañas cuentan dentro de lo elegido.
  {
    key: 'states',
    type: 'multiSelect',
    label: 'Estado',
    props: { options: CONTRACT_STATE_TABS },
    grid: { xs: 12, sm: 6 }
  },
  { key: 'endDate', type: 'calendar-range', label: 'Fecha fin' }
];

/**
 * El menú de contratos de la ruta (DEC-077): `{ menu, error }`. Sin `pvtId`
 * ("Todos"), `menu` es null y no se pide nada.
 */
function useContractMenu(pvtId) {
  const [state, setState] = useState({ menu: null, error: null });

  useEffect(() => {
    setState({ menu: null, error: null });
    if (!pvtId) return undefined;
    let cancelled = false;
    getContractMenuAPI(pvtId)
      .then(({ data }) => !cancelled && setState({ menu: data, error: null }))
      .catch((err) => !cancelled && setState({ menu: null, error: err.response?.data?.message || 'No se encontró el menú de contratos.' }));
    return () => {
      cancelled = true;
    };
  }, [pvtId]);

  return state;
}

export default function ContractsPage() {
  const { pvtId } = useParams();
  const { menu, error } = useContractMenu(pvtId);
  const { permissionsCatalog, hasPermission } = useAuth();
  const [exporting, setExporting] = useState(null);
  const navigate = useNavigate();
  const [reloadKey, setReloadKey] = useState(0);
  const basePath = contractPath(pvtId);
  const outletContext = useMemo(() => ({ returnTo: basePath, menu, refresh: () => setReloadKey((k) => k + 1) }), [basePath, menu]);
  const workFilter = useWorkFilterField();
  const filterFields = useMemo(() => (workFilter ? [...FILTER_FIELDS, workFilter] : FILTER_FIELDS), [workFilter]);
  const linked = useLinkedFilters(LINKED_KEYS, describeLinked);
  const filters = useMemo(() => (pvtId ? { pvtId, ...linked.filters } : linked.filters), [pvtId, linked.filters]);
  const policiesView = permissionsCatalog.work?.policies?.view;
  const canViewPolicies = policiesView != null && hasPermission(policiesView);
  const stateTabs = useMemo(
    () =>
      canViewPolicies ? { ...CONTRACT_STATE_FILTER, tabs: [...CONTRACT_STATE_FILTER.tabs, POLICIES_EXPIRING_TAB] } : CONTRACT_STATE_FILTER,
    [canViewPolicies]
  );
  // Reporte de lo que muestra la tabla, sin paginar (DEC-070).
  const exportOptions = useMemo(
    () => ({
      permission: permissionsCatalog.work?.contracts?.export,
      request: exportContractsAPI,
      fileName: pvtId ? `contratos_${pvtId}` : 'contratos',
      reports: CONTRACT_REPORTS
    }),
    [permissionsCatalog, pvtId]
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
      create: () => navigate(contractPath(pvtId, 'new')),
      // Sin "Editar": el detalle es también el formulario (DEC-057).
      view: (row) => navigate(contractPath(pvtId, row.ctrId))
    }),
    [navigate, pvtId]
  );

  if (error) return <Alert severity="warning">{error}</Alert>;
  if (pvtId && (!menu || String(menu.pvtId) !== String(pvtId))) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress size={28} />
      </Box>
    );
  }

  return (
    <>
      <MasterPage
        key={pvtId ?? 'all'}
        title="Contrato"
        {...(menu ? { pluralTitle: `Contratos ${menu.name}` } : {})}
        idField="ctrId"
        api={contractsApi}
        permissions={permissionsCatalog.work?.contracts}
        columns={CONTRACT_COLUMNS}
        filterFields={filterFields}
        defaultSort="number"
        rowLabel={rowLabel}
        navigation={navigation}
        stateTabs={stateTabs}
        filters={filters}
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
