import { useMemo, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import MasterPage from 'ui-component/extended/MasterPage';
import useLinkedFilters from 'hooks/useLinkedFilters';
import { providersApi } from 'api/requests/providersApi';
import { getProviderTypesSelectAPI } from 'api/requests/providerTypesApi';
import { useAuth } from 'contexts/AuthContext';
import { useWorkFilterField } from 'contexts/WorkScopeContext';

// Proveedores (ADR-0012, DEC-031). Reutiliza el listado de MasterPage
// (filtros, pestañas por estado). Detalle, alta y edición son rutas hijas
// que se abren en un modal sobre el listado, como obras (DEC-034). Un proveedor es una sola fila por empresa,
// reutilizada en todas sus obras.

const COLUMNS = [
  {
    id: 'name',
    label: 'Proveedor',
    sortable: true,
    render: (row) => (
      <>
        <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.dark' }}>
          {row.name}
        </Typography>
        {row.serviceType && (
          <Typography variant="caption" color="text.secondary">
            {row.serviceType}
          </Typography>
        )}
      </>
    ),
    cardRender: (row) => row.name
  },
  { id: 'identification', label: 'Documento', sortable: true, render: (row) => `${row.identityCode ?? ''} ${row.identification}` },
  { id: 'providerTypes', label: 'Tipos', render: (row) => row.providerTypes.join(', ') },
  { id: 'worksCount', label: 'Obras', align: 'right' }
];

// Filtros del listado (DEC-048). El de obra, solo con "Ver todo" (useWorkFilterField).
const FILTER_FIELDS = [
  { key: 'name', type: 'input', label: 'Razón social', props: { maxLength: 255 }, grid: { xs: 12, sm: 7 } },
  { key: 'identification', type: 'input', label: 'Documento', props: { maxLength: 20 }, grid: { xs: 12, sm: 5 } },
  {
    key: 'pvtId',
    type: 'socketDropdown',
    label: 'Tipo de proveedor',
    fetchApi: () => getProviderTypesSelectAPI(),
    socketEvent: 'refresh-provider-types'
  }
];

const rowLabel = (row) => `${row.name} (${row.identityCode ?? ''} ${row.identification})`;

// Desde el tablero (DEC-052) llega solo con la pestaña inicial (`?status=1`).
const NO_LINKED_KEYS = [];
const describeNothing = () => null;

export default function ProvidersPage() {
  const { permissionsCatalog } = useAuth();
  const navigate = useNavigate();
  const [reloadKey, setReloadKey] = useState(0);
  const outletContext = useMemo(() => ({ refresh: () => setReloadKey((k) => k + 1) }), []);
  const workFilter = useWorkFilterField();
  const filterFields = useMemo(() => (workFilter ? [...FILTER_FIELDS, workFilter] : FILTER_FIELDS), [workFilter]);
  const linked = useLinkedFilters(NO_LINKED_KEYS, describeNothing);

  const navigation = useMemo(
    () => ({
      create: () => navigate('/work/providers/new'),
      view: (row) => navigate(`/work/providers/${row.prvId}`),
      edit: (row) => navigate(`/work/providers/${row.prvId}/edit`)
    }),
    [navigate]
  );

  return (
    <>
      <MasterPage
        title="Proveedor"
        pluralTitle="proveedores"
        idField="prvId"
        api={providersApi}
        permissions={permissionsCatalog.work?.providers}
        columns={COLUMNS}
        filterFields={filterFields}
        defaultSort="name"
        rowLabel={rowLabel}
        navigation={navigation}
        initialStatus={linked.initialStatus}
        reloadKey={reloadKey}
      />
      <Outlet context={outletContext} />
    </>
  );
}
