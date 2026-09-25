import { useState, useEffect, useCallback, useRef, useMemo } from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';

import { IconEdit, IconTrash, IconKey, IconPlus, IconFilter } from '@tabler/icons-react';

import MainCard from 'ui-component/cards/MainCard';
import FilterPopper from 'ui-component/extended/FilterPopper';
import DataTable from 'ui-component/extended/DataTable';
import StatusChip from 'ui-component/extended/StatusChip';
import LastModifiedCell from 'ui-component/extended/LastModifiedCell';
import ProfileDialog from './components/ProfileDialog';
import { STATUS_OPTIONS } from 'utils/constants';
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

  const initialFilters = { name: '', staId: '' };
  const [filters, setFilters] = useState(initialFilters);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const filterOpen = Boolean(filterAnchorEl);

  const handleSetFilters = (nextFilters) => {
    setFilters(nextFilters);
    setPage(0);
  };

  const handleToggleFilters = (event) => {
    setFilterAnchorEl((prev) => (prev ? null : event.currentTarget));
  };

  const handleCloseFilters = () => {
    setFilterAnchorEl(null);
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

  const handleAddProfile = (item) => {
    setRows((prev) => [item, ...prev]);
    setTotal((prev) => prev + 1);
  };

  const handleUpdateProfile = (item) => {
    setRows((prev) => prev.map((row) => (row.proId === item.proId ? { ...row, ...item } : row)));
  };

  const handleOpenPermissions = (item) => {
    setSelectedProfile(item);
    setPermissionsVisible(true);
  };

  const fetchProfiles = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await paginationProfilesAPI({
        name: filters.name,
        staId: filters.staId,
        rows: rowsPerPage,
        first: page * rowsPerPage,
        sortField,
        sortOrder,
      });
      setRows(data.results ?? []);
      setTotal(data.total ?? 0);
    } catch (err) {
      showError(err.response?.data?.message || 'Error al cargar los perfiles');
    } finally {
      setLoading(false);
    }
  }, [filters.name, filters.staId, page, rowsPerPage, sortField, sortOrder]);

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

  const filterOptions = useMemo(() => [
    { type: 'input', key: 'name', label: 'Nombre', filtro: filters.name, grid: { xs: 12, sm: 6 } },
    {
      type: 'dropdown',
      key: 'staId',
      label: 'Estado',
      filtro: filters.staId,
      grid: { xs: 12, sm: 6 },
      props: {
          options: STATUS_OPTIONS,
        },
    },
  ], [filters]);

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

  const activeFilterCount = Object.values(filters).filter((v) => v !== '' && v != null).length;

  return (
    <MainCard
      title={
        <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
          <Badge badgeContent={activeFilterCount} color="primary" size="small">
            <Button
              variant="outlined"
              size="small"
              startIcon={<IconFilter size={16} />}
              onClick={handleToggleFilters}
            >
              Filtros
            </Button>
          </Badge>
          {canCreate && (
            <Button variant="contained" startIcon={<IconPlus size={16} />} size="small" onClick={handleNewProfile}>
              Nuevo Perfil
            </Button>
          )}
        </Stack>
      }
    >
      <FilterPopper
        anchorEl={filterAnchorEl}
        open={filterOpen}
        onClose={handleCloseFilters}
        filters={filterOptions}
        setFilters={handleSetFilters}
        initialFilters={initialFilters}
      />

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

      <ProfileDialog ref={profileFormRef} addItem={handleAddProfile} updateItem={handleUpdateProfile} />
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
