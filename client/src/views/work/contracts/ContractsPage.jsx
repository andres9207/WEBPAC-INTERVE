import { useMemo, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import MasterPage from 'ui-component/extended/MasterPage';
import { contractsApi } from 'api/requests/contractsApi';
import { useAuth } from 'contexts/AuthContext';
import { fMoneyText } from 'utils/formatNumber';
import { fDateOnly } from 'utils/formatTime';
import { CONTRACT_STATE_COLORS, CONTRACT_STATE_TABS } from 'utils/constants';

// Contratos (ADR-0015, DEC-035). Reutiliza el listado de MasterPage con
// pestañas por el estado del ciclo de vida (en ejecución, suspendido, en
// liquidación, liquidado), no por activo/inactivo. Detalle, alta y edición
// son rutas hijas que se abren en un modal sobre el listado (DEC-034). El
// valor vigente y la fecha fin los calcula el servidor (FRONTEND_STANDARD,
// regla 9).

export const CONTRACT_COLUMNS = [
  { id: 'number', label: 'Número', sortable: true },
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
    cardRender: (row) => `${row.workCode} · ${row.stageName ?? ''}`
  },
  {
    id: 'currentValue',
    label: 'Valor vigente',
    align: 'right',
    render: (row) => <span style={{ fontVariantNumeric: 'tabular-nums' }}>{fMoneyText(row.currentValue)}</span>
  },
  { id: 'endDate', label: 'Fecha fin', sortable: true, render: (row) => fDateOnly(row.endDate) }
];

export const CONTRACT_STATE_FILTER = { param: 'state', tabs: CONTRACT_STATE_TABS, colors: CONTRACT_STATE_COLORS };

const rowLabel = (row) => `${row.number} — ${row.name}`;

export default function ContractsPage() {
  const { permissionsCatalog } = useAuth();
  const navigate = useNavigate();
  const [reloadKey, setReloadKey] = useState(0);
  const outletContext = useMemo(() => ({ refresh: () => setReloadKey((k) => k + 1) }), []);

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
        searchPlaceholder="Buscar por número, nombre, proveedor u obra"
        defaultSort="number"
        rowLabel={rowLabel}
        navigation={navigation}
        stateTabs={CONTRACT_STATE_FILTER}
        reloadKey={reloadKey}
      />
      <Outlet context={outletContext} />
    </>
  );
}
