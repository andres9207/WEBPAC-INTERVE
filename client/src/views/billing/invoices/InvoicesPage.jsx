import { useMemo, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { IconFlag } from '@tabler/icons-react';

import MasterPage from 'ui-component/extended/MasterPage';
import LinkedFilterNotice from 'ui-component/extended/LinkedFilterNotice';
import useLinkedFilters from 'hooks/useLinkedFilters';
import { useInvoiceMenu } from 'hooks/useInvoiceMenus';
import { exportInvoicesAPI, getInvoiceFilterProvidersAPI, getInvoiceFilterStagesAPI, invoicesApi } from 'api/requests/invoicesApi';
import { useAuth } from 'contexts/AuthContext';
import { useWorkFilterField } from 'contexts/WorkScopeContext';
import { fDateOnly } from 'utils/formatTime';
import { fMoneyText, fPercentText } from 'utils/formatNumber';
import {
  INVOICE_ADVANCE_FILTER_OPTIONS,
  INVOICE_ALERT_OPTIONS,
  INVOICE_GLOSS_FILTER_OPTIONS,
  INVOICE_MODES,
  INVOICE_MODE_TYPES,
  INVOICE_STATE_COLORS,
  INVOICE_STATE_TABS,
  INVOICE_TYPE_OPTIONS,
  INVOICE_VOUCHER_FILTER_OPTIONS,
  invoicePath
} from 'utils/constants';

// Facturas (ADR-0020, DEC-042), en menús dinámicos (DEC-074): uno por tipo de
// proveedor con la casilla del menú. La ruta lleva el tipo (`:pvtId`), que
// viaja en cada petición del listado: cada menú muestra solo sus facturas.
// El nombre y la forma de facturar del menú los da el servidor; la forma
// decide columnas, filtros y formulario. Reutiliza el listado de MasterPage
// con pestañas por el estado del ciclo de vida (registrada, aprobada,
// anulada). Detalle, alta y edición son rutas hijas que se abren en un modal
// sobre el listado (DEC-034) y reciben el menú por el contexto del Outlet. El
// tipo de factura es uno de los filtros en los menús de contrato (DEC-048):
// las pestañas cuentan dentro de él.

export const INVOICE_COLUMNS = [
  {
    id: 'number',
    label: 'Número',
    sortable: true,
    // Con un seguimiento abierto (DEC-076): se está trabajando sobre ella.
    render: (row) => (
      <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
        <span>{row.number}</span>
        {row.hasOpenFollowUp && (
          <Tooltip title="Tiene un seguimiento abierto">
            <Box component="span" sx={{ display: 'inline-flex', color: 'warning.main' }} aria-label="Tiene un seguimiento abierto">
              <IconFlag size={16} />
            </Box>
          </Tooltip>
        )}
      </Stack>
    ),
    cardRender: (row) => (row.hasOpenFollowUp ? `${row.number} · seguimiento abierto` : row.number)
  },
  { id: 'statement', label: 'Extracto', sortable: true, render: (row) => row.statement ?? '—' },
  { id: 'type', label: 'Tipo', sortable: true, render: (row) => row.typeName },
  {
    id: 'provider',
    label: 'Proveedor',
    sortable: true,
    render: (row) => (
      <>
        <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.dark' }}>
          {row.providerName}
        </Typography>
        {row.contractNumber && (
          <Typography variant="caption" color="text.secondary">
            Contrato {row.contractNumber}
          </Typography>
        )}
      </>
    ),
    cardRender: (row) => [row.providerName, row.contractNumber && `Contrato ${row.contractNumber}`].filter(Boolean).join(' · ')
  },
  {
    id: 'work',
    label: 'Obra · etapa',
    sortable: true,
    render: (row) => (
      <>
        <Typography variant="body2">{row.workCode ?? '—'}</Typography>
        <Typography variant="caption" color="text.secondary">
          {row.stageName}
        </Typography>
      </>
    ),
    cardRender: (row) => [row.workCode, row.stageName].filter(Boolean).join(' · ')
  },
  { id: 'date', label: 'Fecha', sortable: true, render: (row) => fDateOnly(row.date) },
  { id: 'approvalDate', label: 'Aprobada el', sortable: true, render: (row) => fDateOnly(row.approvalDate) }
];

export const INVOICE_STATE_FILTER = { param: 'state', tabs: INVOICE_STATE_TABS, colors: INVOICE_STATE_COLORS };
// Alertas aparte de las pestañas y combinables con ellas, con su conteo (DEC-094).
const INVOICE_ALERTS = { param: 'alert', options: INVOICE_ALERT_OPTIONS };

// Importe que llega del servidor como texto (DEC-028): a la derecha, en cifras alineadas.
const amountColumn = (id, label, format, sortable = false) => ({
  id,
  label,
  sortable,
  align: 'right',
  render: (row) => (row[id] === null ? '—' : <span style={{ fontVariantNumeric: 'tabular-nums' }}>{format(row[id])}</span>),
  cardRender: (row) => (row[id] === null ? '—' : format(row[id]))
});

// La simple no tiene tipo que elegir; sí obra y etapa, sin contrato (DEC-058). Columnas del sistema que se migra, en
// su orden, y después obra · etapa y aprobación. Valor, descuento y % IVA son lo guardado; IVA y total los calcula el
// servidor con la fórmula de la factura (DEC-065), y por eso no se ordenan ni se filtran.
const columnById = (id) => INVOICE_COLUMNS.find((column) => column.id === id);
const SIMPLE_COLUMNS = [
  { ...columnById('number'), label: 'Nro factura' },
  columnById('provider'),
  amountColumn('value', 'Valor', fMoneyText, true),
  amountColumn('discount', 'Descuento', fMoneyText, true),
  amountColumn('vatPct', 'IVA %', fPercentText, true),
  amountColumn('vat', 'Valor IVA', fMoneyText),
  amountColumn('total', 'Total', fMoneyText),
  columnById('date'),
  columnById('statement'),
  columnById('work'),
  columnById('approvalDate')
];

// Menús de contrato: las columnas del sistema que se migra, en su orden, y después obra · etapa y aprobación. Cada tipo
// guarda sus importes en su propia tabla de detalle (el descuento es el de materiales, DEC-075; el anticipo y la
// devolución solo tienen valor, que es su total): no se ordenan por importes.
const CONTRACT_MENU_COLUMNS = [
  columnById('type'),
  { ...columnById('number'), label: 'Nro factura' },
  {
    id: 'provider',
    label: 'Proveedor',
    sortable: true,
    render: (row) => row.providerName
  },
  { id: 'contractNumber', label: 'Nro contrato', render: (row) => row.contractNumber ?? '—' },
  { id: 'contractName', label: 'Contrato', render: (row) => row.contractName ?? '—' },
  amountColumn('value', 'Valor', fMoneyText),
  amountColumn('discount', 'Descuento', fMoneyText),
  amountColumn('vatPct', 'IVA %', fPercentText),
  amountColumn('vat', 'Valor IVA', fMoneyText),
  amountColumn('total', 'Total', fMoneyText),
  columnById('date'),
  columnById('statement'),
  columnById('work'),
  columnById('approvalDate')
];

const CONTRACT_TYPE_OPTIONS = INVOICE_TYPE_OPTIONS.filter((o) => INVOICE_MODE_TYPES[INVOICE_MODES.CONTRACT].includes(o.value));

// Filtros del listado (DEC-048). El de obra solo con "Ver todo" (useWorkFilterField).
// Proveedor: los que tienen facturas del menú, buscados en el servidor (tienen tope, DEC-018).
const commonFilters = (pvtId) => [
  { key: 'number', type: 'input', label: 'Número', props: { maxLength: 50 }, grid: { xs: 12, sm: 6 } },
  { key: 'voucherNumber', type: 'input', label: 'Comprobante', props: { maxLength: 50 }, grid: { xs: 12, sm: 6 } },
  // Con la pestaña "Aprobada", sin comprobante es lo pendiente de pago (DEC-091).
  { key: 'voucher', type: 'dropdown', label: 'Pago', props: { options: INVOICE_VOUCHER_FILTER_OPTIONS }, grid: { xs: 12, sm: 6 } },
  // Con glosas abiertas, con alguna o sin ninguna (DEC-093).
  { key: 'gloss', type: 'dropdown', label: 'Glosas', props: { options: INVOICE_GLOSS_FILTER_OPTIONS }, grid: { xs: 12, sm: 6 } },
  { key: 'statement', type: 'input', label: 'Extracto', props: { maxLength: 20 } },
  {
    key: 'prvId',
    type: 'remoteDropdown',
    label: 'Proveedor',
    fetchOptions: ({ search, includeId }) =>
      getInvoiceFilterProvidersAPI({ pvtId, ...(search ? { search } : {}), ...(includeId ? { includePrvId: includeId } : {}) }).then(
        (res) => res.data
      )
  },
  { key: 'date', type: 'calendar-range', label: 'Fecha', grid: { xs: 12, sm: 6 } },
  { key: 'approvalDate', type: 'calendar-range', label: 'Aprobada el', grid: { xs: 12, sm: 6 } }
];
// Filtros de las columnas del sistema que se migra: etapa y los importes guardados, por rango. IVA y total se
// calculan y no se filtran. Etapa: las que tienen facturas del menú (la de la simple o la de su contrato).
const amountFilters = (pvtId) => [
  {
    key: 'wksId',
    type: 'remoteDropdown',
    label: 'Etapa',
    fetchOptions: ({ search, includeId }) =>
      getInvoiceFilterStagesAPI({ pvtId, ...(search ? { search } : {}), ...(includeId ? { includeWksId: includeId } : {}) }).then(
        (res) => res.data
      )
  },
  { key: 'value', type: 'number-range', label: 'Valor' },
  { key: 'discount', type: 'number-range', label: 'Descuento' },
  { key: 'vatPct', type: 'number-range', label: 'IVA %' }
];
const simpleFilters = (pvtId) => [...commonFilters(pvtId), ...amountFilters(pvtId)];
const contractFilters = (pvtId) => [
  { key: 'type', type: 'dropdown', label: 'Tipo de factura', props: { options: CONTRACT_TYPE_OPTIONS }, grid: { xs: 12, sm: 6 } },
  // Anticipo, amortización y lo por aprobar de los dos (con la pestaña "Registrada", lo mismo).
  { key: 'advance', type: 'dropdown', label: 'Anticipo', props: { options: INVOICE_ADVANCE_FILTER_OPTIONS }, grid: { xs: 12, sm: 6 } },
  { key: 'contractNumber', type: 'input', label: 'Número de contrato', props: { maxLength: 50 }, grid: { xs: 12, sm: 6 } },
  { key: 'contractName', type: 'input', label: 'Contrato (nombre)', props: { maxLength: 200 } },
  ...commonFilters(pvtId),
  ...amountFilters(pvtId)
];

const rowLabel = (row) => `${row.typeName} ${row.number} — ${row.providerName ?? ''}`;

// Desde el tablero (DEC-052): las facturas de una obra; `label` es el código
// de la obra, solo para el aviso (el filtro es `wrkId`).
const LINKED_KEYS = ['wrkId'];
const describeLinked = (filters) => `facturas de la obra ${filters.label ?? filters.wrkId}`;

export default function InvoicesPage() {
  const { pvtId } = useParams();
  const { menu, error } = useInvoiceMenu(pvtId);
  const { permissionsCatalog } = useAuth();
  const navigate = useNavigate();
  const [reloadKey, setReloadKey] = useState(0);
  const simple = menu?.mode === INVOICE_MODES.SIMPLE;
  const outletContext = useMemo(() => ({ pvtId, menu, refresh: () => setReloadKey((k) => k + 1) }), [pvtId, menu]);
  const workFilter = useWorkFilterField();
  const filterFields = useMemo(() => {
    const fields = simple ? simpleFilters(pvtId) : contractFilters(pvtId);
    return workFilter ? [...fields, workFilter] : fields;
  }, [simple, pvtId, workFilter]);
  const linked = useLinkedFilters(LINKED_KEYS, describeLinked);
  const filters = useMemo(() => ({ pvtId, ...linked.filters }), [pvtId, linked.filters]);
  // Reporte de lo que muestra la tabla del menú, sin paginar (DEC-070).
  const exportOptions = useMemo(
    () => ({
      permission: permissionsCatalog.billing?.invoices?.export,
      request: exportInvoicesAPI,
      fileName: `facturas_${pvtId}`
    }),
    [permissionsCatalog, pvtId]
  );

  const navigation = useMemo(
    () => ({
      create: () => navigate(invoicePath(pvtId, 'new')),
      view: (row) => navigate(invoicePath(pvtId, row.invId)),
      edit: (row) => navigate(invoicePath(pvtId, row.invId, 'edit'))
    }),
    [navigate, pvtId]
  );

  if (error) return <Alert severity="warning">{error}</Alert>;
  // Hasta saber el menú, su forma decide columnas, filtros y formulario.
  if (!menu || String(menu.pvtId) !== String(pvtId)) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress size={28} />
      </Box>
    );
  }

  return (
    <>
      <MasterPage
        key={pvtId}
        title={simple ? 'Factura simple' : 'Factura'}
        pluralTitle={`Facturas ${menu.name}`}
        feminine
        idField="invId"
        api={invoicesApi}
        permissions={permissionsCatalog.billing?.invoices}
        columns={simple ? SIMPLE_COLUMNS : CONTRACT_MENU_COLUMNS}
        filterFields={filterFields}
        defaultSort="date"
        rowLabel={rowLabel}
        navigation={navigation}
        stateTabs={INVOICE_STATE_FILTER}
        alerts={INVOICE_ALERTS}
        filters={filters}
        initialStatus={linked.initialStatus}
        header={simple ? null : <LinkedFilterNotice label={linked.label} onClear={linked.clear} />}
        reloadKey={reloadKey}
        exportOptions={exportOptions}
      />
      <Outlet context={outletContext} />
    </>
  );
}
