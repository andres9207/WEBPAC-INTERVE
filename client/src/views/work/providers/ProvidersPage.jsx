import { useMemo, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { IconPlus, IconSearch } from '@tabler/icons-react';

import MasterPage from 'ui-component/extended/MasterPage';
import WorkProviderDialog from './components/WorkProviderDialog';
import useLinkedFilters from 'hooks/useLinkedFilters';
import { exportProvidersAPI, providersApi } from 'api/requests/providersApi';
import { getProviderTypesSelectAPI } from 'api/requests/providerTypesApi';
import { useAuth } from 'contexts/AuthContext';
import { useWorkFilterField, useWorkScope } from 'contexts/WorkScopeContext';
import { ALL_WORKS } from 'utils/workScope';

// Proveedores (ADR-0012, DEC-031). Reutiliza el listado de MasterPage
// (filtros, pestañas por estado). Detalle, alta y edición son rutas hijas
// que se abren en un modal sobre el listado, como obras (DEC-034). Un proveedor es una sola fila por empresa,
// reutilizada en todas sus obras.
//
// Con una obra elegida en el encabezado, "Nuevo" ofrece dos caminos: crear un
// proveedor (queda asignado a esa obra, lo hace el servidor) o agregar uno que
// ya existe a la obra (WorkProviderDialog, el mismo de la pestaña Proveedores
// de la obra). Con "Ver todo" no hay obra a la que asignar: solo crear.

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
  { id: 'providerTypes', label: 'Tipos', render: (row) => row.providerTypes.join(', ') }
];
// A cuántas obras está asignado, todas: solo con el permiso de ver todas las obras (el servidor no lo envía sin él).
const WORKS_COUNT_COLUMN = { id: 'worksCount', label: 'Obras', align: 'right' };

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
  const { permissionsCatalog, hasPermission } = useAuth();
  const perms = permissionsCatalog.work?.providers;
  // Reporte de lo que muestra la tabla, sin paginar (DEC-070): con una obra elegida, sus proveedores.
  const exportOptions = useMemo(() => ({ permission: perms?.export, request: exportProvidersAPI, fileName: 'proveedores' }), [perms]);
  const canDo = (perId) => perId != null && hasPermission(perId);
  // viewAll: el permiso de ver todas las obras, según el servidor (select_my_works, DEC-047).
  const { activeWork, viewAll } = useWorkScope();
  const workId = activeWork !== null && activeWork !== ALL_WORKS ? activeWork : null;
  const [assignOpen, setAssignOpen] = useState(false);
  const navigate = useNavigate();
  const [reloadKey, setReloadKey] = useState(0);
  const outletContext = useMemo(() => ({ refresh: () => setReloadKey((k) => k + 1) }), []);
  const workFilter = useWorkFilterField();
  const filterFields = useMemo(() => (workFilter ? [...FILTER_FIELDS, workFilter] : FILTER_FIELDS), [workFilter]);
  const linked = useLinkedFilters(NO_LINKED_KEYS, describeNothing);
  const columns = useMemo(() => (viewAll ? [...COLUMNS, WORKS_COUNT_COLUMN] : COLUMNS), [viewAll]);

  const navigation = useMemo(
    () => ({
      create: () => navigate('/work/providers/new'),
      // Sin "Editar": el detalle es también el formulario (DEC-057).
      view: (row) => navigate(`/work/providers/${row.prvId}`)
    }),
    [navigate]
  );

  const canAssign = workId !== null && canDo(perms?.assignWork);
  const canCreate = canDo(perms?.create);
  // Una opción por permiso: con las dos, "Nuevo" las despliega; con una sola, el botón es esa opción (MasterPage).
  const createOptions = [
    ...(canCreate ? [{ label: 'Crear proveedor nuevo', icon: <IconPlus size={16} />, command: navigation.create }] : []),
    ...(canAssign ? [{ label: 'Agregar proveedor existente', icon: <IconSearch size={16} />, command: () => setAssignOpen(true) }] : [])
  ];

  return (
    <>
      <MasterPage
        title="Proveedor"
        pluralTitle="proveedores"
        idField="prvId"
        api={providersApi}
        permissions={perms}
        columns={columns}
        filterFields={filterFields}
        defaultSort="name"
        rowLabel={rowLabel}
        navigation={navigation}
        initialStatus={linked.initialStatus}
        reloadKey={reloadKey}
        createOptions={createOptions}
        exportOptions={exportOptions}
      />
      <Outlet context={outletContext} />
      {workId !== null && (
        <WorkProviderDialog
          open={assignOpen}
          wrkId={workId}
          onClose={() => setAssignOpen(false)}
          onSaved={() => {
            setAssignOpen(false);
            outletContext.refresh();
          }}
        />
      )}
    </>
  );
}
