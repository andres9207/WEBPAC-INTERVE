import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Outlet, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import MasterPage from 'ui-component/extended/MasterPage';
import LinkedFilterNotice from 'ui-component/extended/LinkedFilterNotice';
import useLinkedFilters from 'hooks/useLinkedFilters';
import { getInvoiceFilterProvidersAPI, invoicesApi } from 'api/requests/invoicesApi';
import { useAuth } from 'contexts/AuthContext';
import { useWorkFilterField } from 'contexts/WorkScopeContext';
import { fDateOnly } from 'utils/formatTime';
import { INVOICE_STATE_COLORS, INVOICE_STATE_TABS, INVOICE_TYPE_OPTIONS, INVOICE_VIEWS, invoicePath } from 'utils/constants';

// Facturas (ADR-0020, DEC-042), en tres vistas con su menú y su permiso de
// ver (DEC-054): simples, de contrato mayor y de subcontratistas. Cada ruta
// monta esta página con su `view`, que viaja en cada petición del listado.
// Reutiliza el listado de MasterPage con pestañas por el estado del ciclo de
// vida (registrada, aprobada, anulada). Detalle, alta y edición son rutas
// hijas que se abren en un modal sobre el listado (DEC-034) y reciben la
// vista por el contexto del Outlet. El tipo de factura es uno de los filtros
// en las vistas de contrato (DEC-048): las pestañas cuentan dentro de él.

export const INVOICE_COLUMNS = [
  { id: 'number', label: 'Número', sortable: true },
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

// La simple no tiene tipo que elegir; sí obra y etapa, sin contrato (DEC-058).
const SIMPLE_COLUMNS = INVOICE_COLUMNS.filter((column) => column.id !== 'type');

const CONTRACT_TYPE_OPTIONS = INVOICE_TYPE_OPTIONS.filter((o) => INVOICE_VIEWS.MAJOR.types.includes(o.value));

// Filtros del listado (DEC-048). El de obra solo con "Ver todo" (useWorkFilterField).
// Proveedor: los que tienen facturas de la vista, buscados en el servidor (tienen tope, DEC-018).
const commonFilters = (view) => [
  { key: 'number', type: 'input', label: 'Número', props: { maxLength: 50 }, grid: { xs: 12, sm: 6 } },
  { key: 'voucherNumber', type: 'input', label: 'Comprobante', props: { maxLength: 50 }, grid: { xs: 12, sm: 6 } },
  { key: 'statement', type: 'input', label: 'Extracto', props: { maxLength: 100 } },
  {
    key: 'prvId',
    type: 'remoteDropdown',
    label: 'Proveedor',
    fetchOptions: ({ search, includeId }) =>
      getInvoiceFilterProvidersAPI({ view, ...(search ? { search } : {}), ...(includeId ? { includePrvId: includeId } : {}) }).then(
        (res) => res.data
      )
  },
  { key: 'date', type: 'calendar-range', label: 'Fecha', grid: { xs: 12, sm: 6 } },
  { key: 'approvalDate', type: 'calendar-range', label: 'Aprobada el', grid: { xs: 12, sm: 6 } }
];
const contractFilters = (view) => [
  { key: 'type', type: 'dropdown', label: 'Tipo de factura', props: { options: CONTRACT_TYPE_OPTIONS }, grid: { xs: 12, sm: 6 } },
  { key: 'contractNumber', type: 'input', label: 'Número de contrato', props: { maxLength: 50 }, grid: { xs: 12, sm: 6 } },
  ...commonFilters(view)
];

const rowLabel = (row) => `${row.typeName} ${row.number} — ${row.providerName ?? ''}`;

// Desde el tablero (DEC-052): las facturas de una obra; `label` es el código
// de la obra, solo para el aviso (el filtro es `wrkId`).
const LINKED_KEYS = ['wrkId'];
const describeLinked = (filters) => `facturas de la obra ${filters.label ?? filters.wrkId}`;

export default function InvoicesPage({ view }) {
  const { permissionsCatalog } = useAuth();
  const navigate = useNavigate();
  const [reloadKey, setReloadKey] = useState(0);
  const simple = view === 'SIMPLE';
  const outletContext = useMemo(() => ({ view, refresh: () => setReloadKey((k) => k + 1) }), [view]);
  const workFilter = useWorkFilterField();
  const filterFields = useMemo(() => {
    const fields = simple ? commonFilters(view) : contractFilters(view);
    return workFilter ? [...fields, workFilter] : fields;
  }, [simple, view, workFilter]);
  const linked = useLinkedFilters(LINKED_KEYS, describeLinked);
  const filters = useMemo(() => ({ view, ...linked.filters }), [view, linked.filters]);

  const navigation = useMemo(
    () => ({
      create: () => navigate(invoicePath(view, 'new')),
      view: (row) => navigate(invoicePath(view, row.invId)),
      edit: (row) => navigate(invoicePath(view, row.invId, 'edit'))
    }),
    [navigate, view]
  );

  return (
    <>
      <MasterPage
        key={view}
        title={simple ? 'Factura simple' : 'Factura'}
        pluralTitle={INVOICE_VIEWS[view].title}
        feminine
        idField="invId"
        api={invoicesApi}
        permissions={permissionsCatalog.billing?.invoices}
        columns={simple ? SIMPLE_COLUMNS : INVOICE_COLUMNS}
        filterFields={filterFields}
        defaultSort="date"
        rowLabel={rowLabel}
        navigation={navigation}
        stateTabs={INVOICE_STATE_FILTER}
        filters={filters}
        initialStatus={linked.initialStatus}
        header={simple ? null : <LinkedFilterNotice label={linked.label} onClear={linked.clear} />}
        reloadKey={reloadKey}
      />
      <Outlet context={outletContext} />
    </>
  );
}

InvoicesPage.propTypes = {
  /** Vista del menú (DEC-054): SIMPLE, MAJOR o SUBCONTRACTOR. */
  view: PropTypes.oneOf(Object.keys(INVOICE_VIEWS)).isRequired
};
