import { useMemo, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import MasterPage from 'ui-component/extended/MasterPage';
import { providersApi } from 'api/requests/providersApi';
import { useAuth } from 'contexts/AuthContext';

// Proveedores (ADR-0012, DEC-031). Reutiliza el listado de MasterPage
// (búsqueda, pestañas por estado). Detalle, alta y edición son rutas hijas
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

const rowLabel = (row) => `${row.name} (${row.identityCode ?? ''} ${row.identification})`;

export default function ProvidersPage() {
  const { permissionsCatalog } = useAuth();
  const navigate = useNavigate();
  const [reloadKey, setReloadKey] = useState(0);
  const outletContext = useMemo(() => ({ refresh: () => setReloadKey((k) => k + 1) }), []);

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
        searchPlaceholder="Buscar por razón social o documento"
        defaultSort="name"
        rowLabel={rowLabel}
        navigation={navigation}
        reloadKey={reloadKey}
      />
      <Outlet context={outletContext} />
    </>
  );
}
