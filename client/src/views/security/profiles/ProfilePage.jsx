import { useState, useEffect, useCallback, useRef } from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { IconEdit, IconTrash, IconKey, IconPlus } from '@tabler/icons-react';

import MainCard from 'ui-component/cards/MainCard';
import SearchInput from 'ui-component/extended/SearchInput';
import StatusTabs from 'ui-component/extended/StatusTabs';
import DataTable from 'ui-component/extended/DataTable';
import StatusChip from 'ui-component/extended/StatusChip';
import LastModifiedCell from 'ui-component/extended/LastModifiedCell';
import ProfileDialog from './components/ProfileDialog';
import { statusTabsWithCounts } from 'utils/constants';
import PermissionsDrawer from './components/PermissionsDrawer';
import { paginationProfilesAPI, deleteProfileAPI } from 'api/requests/profilesApi';
import { useAuth } from 'contexts/AuthContext';
import { showError } from 'services/ToastService';

export default function ProfilesPage() {
  const { hasPermission, permissionsCatalog } = useAuth();

  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState(1);

  // Búsqueda general y pestañas por estado (DEC-024), como en los maestros.
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [statusCounts, setStatusCounts] = useState({});

  const handleSearch = useCallback((text) => {
    setSearch(text);
    setPage(0);
  }, []);

  const handleStatus = (_, value) => {
    setStatus(value);
    setPage(0);
  };

  // perId != null antes de preguntar: hasPermission(undefined) es true por
  // diseño (per_id null = "no requiere permiso", ver authContext.jsx), así
  // que mientras el catálogo todavía no cargó no se debe confundir "no sé
  // qué per_id es" con "esta acción no requiere permiso".
  const canDo = (perId) => perId != null && hasPermission(perId);
  const canCreate = canDo(permissionsCatalog.security?.profiles?.create);
  const canEdit = canDo(permissionsCatalog.security?.profiles?.edit);
  const canDelete = canDo(permissionsCatalog.security?.profiles?.delete);
  const canAssignPermission = canDo(permissionsCatalog.security?.profiles?.assignPermission);

  const profileFormRef = useRef(null);
  const [permissionsVisible, setPermissionsVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleNewProfile = () => profileFormRef.current?.newProfile();
  const handleEditProfile = (item) => profileFormRef.current?.editProfile(item);


  const handleOpenPermissions = (item) => {
    setSelectedProfile(item);
    setPermissionsVisible(true);
  };

  const fetchProfiles = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await paginationProfilesAPI({
        search,
        staId: status === 'all' ? '' : status,
        rows: rowsPerPage,
        first: page * rowsPerPage,
        sortField,
        sortOrder,
      });
      setRows(data.results ?? []);
      setTotal(data.total ?? 0);
      setStatusCounts(data.statusCounts ?? {});
    } catch (err) {
      showError(err.response?.data?.message || 'Error al cargar los perfiles');
    } finally {
      setLoading(false);
    }
  }, [search, status, page, rowsPerPage, sortField, sortOrder]);

  useEffect(() => { fetchProfiles(); }, [fetchProfiles]);

  const handleSort = (field) => {
    if (sortField === field) setSortOrder((o) => (o === 1 ? -1 : 1));
    else { setSortField(field); setSortOrder(1); }
    setPage(0);
  };

  const handleDelete = async (proId) => {
    try {
      await deleteProfileAPI({ proId });
      fetchProfiles();
    } catch (err) {
      showError(err.response?.data?.message || 'Error al eliminar el perfil');
    }
  };

  const columns = [
    { id: 'name', label: 'Nombre', sortable: true },
    {
      id: 'status',
      label: 'Estado',
      render: (row) => (
        <StatusChip staId={row.staId} label={row.statusName} />
      ),
    },
    {
      id: 'modified',
      label: 'Últ. modificación',
      render: (row) => <LastModifiedCell name={row.updatedByName} date={row.updatedAt} />,
    },
  ];

  const actionItems = (row) => [
    ...(canAssignPermission
      ? [{ label: 'Permisos', icon: <IconKey size={16} />, command: () => handleOpenPermissions(row), color: '#0eb0e9' }]
      : []),
    ...(canEdit
      ? [{ label: 'Editar', icon: <IconEdit size={16} />, command: () => handleEditProfile(row), color: '#fda53a' }]
      : []),
    ...(canDelete
      ? [{ label: 'Eliminar', icon: <IconTrash size={16} />, command: () => handleDelete(row.proId), color: '#f43f51', confirm: `¿Está seguro de eliminar el perfil "${row.name}"?` }]
      : []),
  ];

  return (
    <MainCard
      title={
        // flexWrap: en ancho de teléfono los botones bajan de línea en vez de desbordar.
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ flexWrap: 'wrap', gap: 1.5 }}>
          <SearchInput onSearch={handleSearch} placeholder="Buscar por nombre" />
          <Stack direction="row" alignItems="center" sx={{ flexWrap: 'wrap', gap: 1.5, ml: 'auto' }}>
            <StatusTabs statusTabs={statusTabsWithCounts(statusCounts)} selectedStatus={status} onChange={handleStatus} />
            {canCreate && (
              <Button variant="contained" startIcon={<IconPlus size={16} />} size="small" onClick={handleNewProfile}>
                Nuevo Perfil
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
        onRowsPerPageChange={(e) => { setRowsPerPage(+e.target.value); setPage(0); }}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
        keyExtractor={(row) => row.proId}
        cardTitleRender={(row) => row.name}
        actions={actionItems}
      />

      {/* Recarga después de guardar, en vez de tocar la fila en memoria: los conteos de las pestañas siguen exactos (DEC-022). */}
      <ProfileDialog ref={profileFormRef} addItem={fetchProfiles} updateItem={fetchProfiles} />
      <PermissionsDrawer
        visible={permissionsVisible}
        setVisible={setPermissionsVisible}
        title={`Permisos perfil: ${selectedProfile?.name ?? ''}`}
        opc={1}
        prfId={selectedProfile?.proId}
      />
    </MainCard>
  );
}
