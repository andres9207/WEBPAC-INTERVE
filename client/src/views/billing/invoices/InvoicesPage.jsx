import { useMemo, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import MasterPage from 'ui-component/extended/MasterPage';
import { invoicesApi } from 'api/requests/invoicesApi';
import { useAuth } from 'contexts/AuthContext';
import { useWorkFilterField } from 'contexts/WorkScopeContext';
import { fDateOnly } from 'utils/formatTime';
import { INVOICE_STATE_COLORS, INVOICE_STATE_TABS, INVOICE_TYPE_OPTIONS } from 'utils/constants';

// Facturas (ADR-0020, DEC-042). Reutiliza el listado de MasterPage con
// pestañas por el estado del ciclo de vida (registrada, aprobada, anulada).
// Detalle, alta y edición son rutas hijas que se abren en un modal sobre el
// listado (DEC-034). El tipo de factura es uno de los filtros del listado
// (DEC-048): las pestañas cuentan dentro de los filtros.

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
        <Typography variant="body2">{row.workCode}</Typography>
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

// Filtros del listado (DEC-048). El de obra, solo con "Ver todo" (useWorkFilterField).
const FILTER_FIELDS = [
  { key: 'type', type: 'dropdown', label: 'Tipo de factura', props: { options: INVOICE_TYPE_OPTIONS }, grid: { xs: 12, sm: 6 } },
  { key: 'number', type: 'input', label: 'Número', props: { maxLength: 50 }, grid: { xs: 12, sm: 6 } },
  { key: 'voucherNumber', type: 'input', label: 'Comprobante', props: { maxLength: 50 }, grid: { xs: 12, sm: 6 } },
  { key: 'contractNumber', type: 'input', label: 'Número de contrato', props: { maxLength: 50 }, grid: { xs: 12, sm: 6 } },
  { key: 'providerName', type: 'input', label: 'Proveedor (razón social)', props: { maxLength: 255 } },
  { key: 'date', type: 'calendar-range', label: 'Fecha', grid: { xs: 12, sm: 6 } },
  { key: 'approvalDate', type: 'calendar-range', label: 'Aprobada el', grid: { xs: 12, sm: 6 } }
];

const rowLabel = (row) => `${row.typeName} ${row.number} — ${row.providerName ?? ''}`;

export default function InvoicesPage() {
  const { permissionsCatalog } = useAuth();
  const navigate = useNavigate();
  const [reloadKey, setReloadKey] = useState(0);
  const outletContext = useMemo(() => ({ refresh: () => setReloadKey((k) => k + 1) }), []);
  const workFilter = useWorkFilterField();
  const filterFields = useMemo(() => (workFilter ? [...FILTER_FIELDS, workFilter] : FILTER_FIELDS), [workFilter]);

  const navigation = useMemo(
    () => ({
      create: () => navigate('/billing/invoices/new'),
      view: (row) => navigate(`/billing/invoices/${row.invId}`),
      edit: (row) => navigate(`/billing/invoices/${row.invId}/edit`)
    }),
    [navigate]
  );

  return (
    <>
      <MasterPage
        title="Factura"
        pluralTitle="Facturas"
        feminine
        idField="invId"
        api={invoicesApi}
        permissions={permissionsCatalog.billing?.invoices}
        columns={INVOICE_COLUMNS}
        filterFields={filterFields}
        defaultSort="date"
        rowLabel={rowLabel}
        navigation={navigation}
        stateTabs={INVOICE_STATE_FILTER}
        reloadKey={reloadKey}
      />
      <Outlet context={outletContext} />
    </>
  );
}
