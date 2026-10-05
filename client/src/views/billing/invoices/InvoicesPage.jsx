import { useMemo, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import MasterPage from 'ui-component/extended/MasterPage';
import { invoicesApi } from 'api/requests/invoicesApi';
import { useAuth } from 'contexts/AuthContext';
import { fDateOnly } from 'utils/formatTime';
import { INVOICE_STATE_COLORS, INVOICE_STATE_TABS } from 'utils/constants';

// Facturas (ADR-0020, DEC-042). Reutiliza el listado de MasterPage con
// pestañas por el estado del ciclo de vida (registrada, aprobada, anulada).
// Detalle, alta y edición son rutas hijas que se abren en un modal sobre el
// listado (DEC-034). En la fase A una factura no tiene importes: registra el
// documento y su ciclo de vida.

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

const rowLabel = (row) => `${row.typeName} ${row.number} — ${row.providerName ?? ''}`;

export default function InvoicesPage() {
  const { permissionsCatalog } = useAuth();
  const navigate = useNavigate();
  const [reloadKey, setReloadKey] = useState(0);
  const outletContext = useMemo(() => ({ refresh: () => setReloadKey((k) => k + 1) }), []);

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
        searchPlaceholder="Buscar por número, comprobante, proveedor, contrato u obra"
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
