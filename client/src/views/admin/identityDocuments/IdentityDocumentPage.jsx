import { useState, useEffect, useCallback, useRef, useMemo } from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';

import { IconEdit, IconTrash, IconPlus, IconFilter } from '@tabler/icons-react';

import MainCard from 'ui-component/cards/MainCard';
import FilterPopper from 'ui-component/extended/FilterPopper';
import DataTable from 'ui-component/extended/DataTable';
import StatusChip from 'ui-component/extended/StatusChip';
import LastModifiedCell from 'ui-component/extended/LastModifiedCell';
import IdentityDocumentDialog from './components/IdentityDocumentDialog';
import { STATUS_OPTIONS } from 'utils/constants';
import { paginationIdentityDocumentsAPI, deleteIdentityDocumentAPI } from 'api/requests/identityDocumentsApi';
import { useAuth } from 'contexts/AuthContext';
import { showError } from 'services/ToastService';

const initialFilters = { code: '', name: '', staId: '' };

export default function IdentityDocumentPage() {
  const { hasPermission, permissionsCatalog } = useAuth();

  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState(1);

  const [filters, setFilters] = useState(initialFilters);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);

  const handleSetFilters = (nextFilters) => {
    setFilters(nextFilters);
    setPage(0);
  };

  // perId != null antes de preguntar: hasPermission(undefined) es true mientras
  // el catálogo no cargó (ver FRONTEND_STANDARD, regla 5).
  const canDo = (perId) => perId != null && hasPermission(perId);
  const canCreate = canDo(permissionsCatalog.admin?.identityDocuments?.create);
  const canEdit = canDo(permissionsCatalog.admin?.identityDocuments?.edit);
  const canDelete = canDo(permissionsCatalog.admin?.identityDocuments?.delete);

  const dialogRef = useRef(null);

  const handleAdd = (item) => {
    setRows((prev) => [item, ...prev]);
    setTotal((prev) => prev + 1);
  };

  const handleUpdate = (item) => {
    setRows((prev) => prev.map((row) => (row.iddId === item.iddId ? { ...row, ...item } : row)));
  };

  const fetchIdentityDocuments = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await paginationIdentityDocumentsAPI({
        code: filters.code,
        name: filters.name,
        staId: filters.staId,
        rows: rowsPerPage,
        first: page * rowsPerPage,
        sortField,
        sortOrder
      });
      setRows(data.results ?? []);
      setTotal(data.total ?? 0);
    } catch (err) {
      showError(err.response?.data?.message || 'Error al cargar los tipos de identificación');
    } finally {
      setLoading(false);
    }
  }, [filters.code, filters.name, filters.staId, page, rowsPerPage, sortField, sortOrder]);

  useEffect(() => {
    fetchIdentityDocuments();
  }, [fetchIdentityDocuments]);

  const handleSort = (field) => {
    if (sortField === field) setSortOrder((o) => (o === 1 ? -1 : 1));
    else {
      setSortField(field);
      setSortOrder(1);
    }
    setPage(0);
  };

  const handleDelete = async (iddId) => {
    try {
      await deleteIdentityDocumentAPI({ iddId });
      fetchIdentityDocuments();
    } catch (err) {
      showError(err.response?.data?.message || 'Error al eliminar el tipo de identificación');
    }
  };

  const filterOptions = useMemo(
    () => [
      { type: 'input', key: 'code', label: 'Código', filtro: filters.code, grid: { xs: 12, sm: 6 } },
      { type: 'input', key: 'name', label: 'Nombre', filtro: filters.name, grid: { xs: 12, sm: 6 } },
      {
        type: 'dropdown',
        key: 'staId',
        label: 'Estado',
        filtro: filters.staId,
        grid: { xs: 12, sm: 6 },
        props: { options: STATUS_OPTIONS }
      }
    ],
    [filters]
  );

  const columns = [
    { id: 'code', label: 'Código', sortable: true },
    { id: 'name', label: 'Nombre', sortable: true },
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
    ...(canEdit
      ? [{ label: 'Editar', icon: <IconEdit size={16} />, command: () => dialogRef.current?.editIdentityDocument(row), color: '#fda53a' }]
      : []),
    ...(canDelete
      ? [
          {
            label: 'Eliminar',
            icon: <IconTrash size={16} />,
            command: () => handleDelete(row.iddId),
            color: '#f43f51',
            confirm: `¿Está seguro de eliminar el tipo de identificación "${row.name}"?`
          }
        ]
      : [])
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
              onClick={(event) => setFilterAnchorEl((prev) => (prev ? null : event.currentTarget))}
            >
              Filtros
            </Button>
          </Badge>
          {canCreate && (
            <Button
              variant="contained"
              startIcon={<IconPlus size={16} />}
              size="small"
              onClick={() => dialogRef.current?.newIdentityDocument()}
            >
              Nuevo Tipo
            </Button>
          )}
        </Stack>
      }
    >
      <FilterPopper
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={() => setFilterAnchorEl(null)}
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
        onRowsPerPageChange={(e) => {
          setRowsPerPage(+e.target.value);
          setPage(0);
        }}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
        keyExtractor={(row) => row.iddId}
        cardTitleRender={(row) => row.name}
        actions={actionItems}
      />

      <IdentityDocumentDialog ref={dialogRef} addItem={handleAdd} updateItem={handleUpdate} />
    </MainCard>
  );
}
