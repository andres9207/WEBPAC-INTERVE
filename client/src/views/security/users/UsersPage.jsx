import { useState, useEffect, useCallback, useRef } from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { IconEdit, IconTrash, IconPlus, IconKey } from '@tabler/icons-react';

import MainCard from 'ui-component/cards/MainCard';
import FilterButton from 'ui-component/extended/FilterButton';
import StatusTabs from 'ui-component/extended/StatusTabs';
import DataTable from 'ui-component/extended/DataTable';
import StatusChip from 'ui-component/extended/StatusChip';
import LastModifiedCell from 'ui-component/extended/LastModifiedCell';
import UserDialog from './components/UserDialog';
import PermissionsDrawer from '../profiles/components/PermissionsDrawer';
import { paginationUsersAPI, deleteUserAPI } from 'api/requests/usersApi';
import { getProfilesAPI } from 'api/requests/profilesApi';
import { useAuth } from 'contexts/AuthContext';
import useListFilters from 'hooks/useListFilters';
import { statusTabsWithCounts } from 'utils/constants';
import { showError, showSuccess } from 'services/ToastService';

// Filtros del listado (DEC-048): los que ya acepta list_users.
const FILTER_FIELDS = [
  { key: 'name', type: 'input', label: 'Nombre', props: { maxLength: 255 }, grid: { xs: 12, sm: 6 } },
  { key: 'lastName', type: 'input', label: 'Apellido', props: { maxLength: 255 }, grid: { xs: 12, sm: 6 } },
  { key: 'identification', type: 'input', label: 'Documento', props: { maxLength: 20 }, grid: { xs: 12, sm: 6 } },
  { key: 'username', type: 'input', label: 'Usuario', props: { maxLength: 100 }, grid: { xs: 12, sm: 6 } },
  { key: 'email', type: 'input', label: 'Correo', props: { maxLength: 255 } },
  { key: 'proId', type: 'socketDropdown', label: 'Perfil', fetchApi: getProfilesAPI, socketEvent: 'refresh-profiles' }
];

export default function UsersPage() {
  const { hasPermission, permissionsCatalog } = useAuth();

  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState(1);

  // Filtros del popper (DEC-048) y pestañas por estado, como en los maestros.
  const resetPage = useCallback(() => setPage(0), []);
  const filters = useListFilters(FILTER_FIELDS, resetPage);
  const [status, setStatus] = useState('all');
  const [statusCounts, setStatusCounts] = useState({});

  const handleStatus = (_, value) => {
    setStatus(value);
    setPage(0);
  };

  // perId != null antes de preguntar: hasPermission(undefined) es true por
  // diseño (per_id null = "no requiere permiso", ver authContext.jsx), así
  // que mientras el catálogo todavía no cargó no se debe confundir "no sé
  // qué per_id es" con "esta acción no requiere permiso".
  const canDo = (perId) => perId != null && hasPermission(perId);
  const canCreate = canDo(permissionsCatalog.security?.users?.create);
  const canEdit = canDo(permissionsCatalog.security?.users?.edit);
  const canDelete = canDo(permissionsCatalog.security?.users?.delete);
  const canAssignPermission = canDo(permissionsCatalog.security?.users?.assignPermission);

  // console.log({ canCreate, canEdit, canDelete, canAssignPermission })

  const userFormRef = useRef(null);
  const [permissionsVisible, setPermissionsVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleNewUser = () => userFormRef.current?.newUser();
  const handleEditUser = (item) => userFormRef.current?.editUser(item);

  const handleOpenPermissions = (item) => {
    setSelectedUser(item);
    setPermissionsVisible(true);
  };

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await paginationUsersAPI({
        ...filters.params,
        staId: status === 'all' ? '' : status,
        rows: rowsPerPage,
        first: page * rowsPerPage,
        sortField,
        sortOrder
      });
      setRows(data.results ?? []);
      setTotal(data.total ?? 0);
      setStatusCounts(data.statusCounts ?? {});
    } catch (err) {
      showError(err.response?.data?.message || 'Error al cargar los usuarios');
    } finally {
      setLoading(false);
    }
  }, [filters.params, status, page, rowsPerPage, sortField, sortOrder]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((o) => (o === 1 ? -1 : 1));
    } else {
      setSortField(field);
      setSortOrder(1);
    }
    setPage(0);
  };

  const handleDelete = async (useId) => {
    try {
      const { data } = await deleteUserAPI({ useId });
      showSuccess(data?.message || 'Usuario eliminado.');
      fetchUsers();
    } catch (err) {
      showError(err.response?.data?.message || 'Error al eliminar el usuario');
    }
  };

  const columns = [
    { id: 'name', label: 'Nombre', sortable: true },
    { id: 'lastName', label: 'Apellido' },
    {
      id: 'identification',
      label: 'Identificación',
      render: (row) => (row.identification ? `${row.identityDocumentCode ?? ''} ${row.identification}`.trim() : '')
    },
    { id: 'email', label: 'Correo' },
    {
      id: 'profile',
      label: 'Perfil',
      // Un perfil inactivo ya no oculta al usuario: se avisa aquí.
      render: (row) =>
        row.profileActive ? (
          row.profileName
        ) : (
          <Typography variant="body2" color="text.secondary">
            {row.profileName} (inactivo)
          </Typography>
        )
    },
    {
      id: 'status',
      label: 'Estado',
      render: (row) => <StatusChip staId={row.staId} label={row.statusName} />
    },
    {
      id: 'modified',
      label: 'Últ. modificación',
      render: (row) => <LastModifiedCell name={row.updatedByName} date={row.updatedAt} />
    }
  ];

  const actionItems = (row) => [
    ...(canAssignPermission
      ? [{ label: 'Permisos', icon: <IconKey size={16} />, command: () => handleOpenPermissions(row), tone: 'info' }]
      : []),
    ...(canEdit ? [{ label: 'Editar', icon: <IconEdit size={16} />, command: () => handleEditUser(row), tone: 'edit' }] : []),
    ...(canDelete
      ? [
          {
            label: 'Eliminar',
            icon: <IconTrash size={16} />,
            command: () => handleDelete(row.useId),
            tone: 'danger',
            confirm: `¿Está seguro de eliminar el usuario "${row.name} ${row.lastName}"?`
          }
        ]
      : [])
  ];

  return (
    <MainCard
      title={
        // flexWrap: en ancho de teléfono los botones bajan de línea en vez de desbordar.
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ flexWrap: 'wrap', gap: 1.5 }}>
          <FilterButton fields={FILTER_FIELDS} values={filters.values} setValues={filters.setValues} active={filters.active} />
          <Stack direction="row" alignItems="center" sx={{ flexWrap: 'wrap', gap: 1.5, ml: 'auto' }}>
            <StatusTabs statusTabs={statusTabsWithCounts(statusCounts)} selectedStatus={status} onChange={handleStatus} />
            {canCreate && (
              <Button variant="contained" startIcon={<IconPlus size={16} />} size="small" onClick={handleNewUser}>
                Nuevo Usuario
              </Button>
            )}
          </Stack>
        </Stack>
      }
    >
      <DataTable
        columns={columns}
        rows={rows}
        total={total}
        loading={loading}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, p) => setPage(p)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(+e.target.value);
          setPage(0);
        }}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
        keyExtractor={(row) => row.useId}
        cardTitleRender={(row) => `${row.name} ${row.lastName}`}
        actions={actionItems}
        emptyMessage={
          filters.hasFilters
            ? 'No hay resultados con los filtros aplicados.'
            : status !== 'all'
              ? 'No hay usuarios en este estado.'
              : 'Todavía no hay usuarios.'
        }
      />

      {/* Recarga después de guardar, en vez de tocar la fila en memoria: los conteos de las pestañas siguen exactos (DEC-022). */}
      <UserDialog ref={userFormRef} addItem={fetchUsers} updateItem={fetchUsers} />
      <PermissionsDrawer
        visible={permissionsVisible}
        setVisible={setPermissionsVisible}
        title={`Permisos usuario: ${selectedUser?.name ?? ''} ${selectedUser?.lastName ?? ''}`}
        opc={2}
        usuId={selectedUser?.useId}
      />
    </MainCard>
  );
}
