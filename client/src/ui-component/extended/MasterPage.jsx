import { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { IconEdit, IconTrash, IconPlus, IconToggleLeft, IconToggleRight } from '@tabler/icons-react';

import MainCard from 'ui-component/cards/MainCard';
import SearchInput from 'ui-component/extended/SearchInput';
import DataTable from 'ui-component/extended/DataTable';
import StatusChip from 'ui-component/extended/StatusChip';
import StatusTabs from 'ui-component/extended/StatusTabs';
import LastModifiedCell from 'ui-component/extended/LastModifiedCell';
import MasterDialog from 'ui-component/extended/MasterDialog';
import { useAuth } from 'contexts/AuthContext';
import { showError, showSuccess } from 'services/ToastService';
import { statusTabsWithCounts } from 'utils/constants';

const STATUS_NAMES = { 1: 'Activo', 2: 'Inactivo' };

/**
 * Vista reutilizable de un maestro (MAE-FE-01, DEC-020). Compone los
 * componentes existentes: MainCard, StatusTabs, DataTable (con su
 * confirmación), StatusChip, LastModifiedCell y MasterDialog.
 *
 * Un maestro se monta declarando sus columnas, formulario y permisos.
 * Consume la API estándar de `createMasterApi`.
 *
 * - Un solo campo de búsqueda: el servidor busca el texto en todos los campos
 *   `filter` del maestro (parámetro `search`).
 * - Búsqueda, orden, estado y paginación van en la petición, nunca en memoria.
 * - Las acciones se ocultan según los permisos: es experiencia de uso, no
 *   seguridad (FRONTEND_STANDARD, regla 1); el servidor decide.
 * - Los mensajes de error del servidor se muestran tal cual (p. ej. "lo usan
 *   2 usuario(s)" al eliminar algo en uso).
 * - Después de guardar, cambiar el estado o eliminar se recarga la página
 *   actual: así los conteos de las pestañas siguen siendo exactos.
 * - `dialog`: un registro con formulario propio (p. ej. la obra, con sus
 *   colecciones) reutiliza el listado con su diálogo. Recibe por ref
 *   `open(row?)`, y como props `title`, `idField`, `api` y `onSaved`.
 */
export default function MasterPage({
  title,
  idField,
  api,
  permissions,
  columns,
  searchPlaceholder = 'Buscar…',
  formFields,
  defaultSort,
  rowLabel,
  dialog: Dialog
}) {
  const { hasPermission } = useAuth();
  // perId != null: con el catálogo cargando, hasPermission(undefined) es true (FRONTEND_STANDARD, regla 5).
  const canDo = (perId) => perId != null && hasPermission(perId);
  const can = {
    create: canDo(permissions?.create),
    edit: canDo(permissions?.edit),
    changeStatus: canDo(permissions?.changeStatus),
    remove: canDo(permissions?.delete)
  };

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');

  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [statusCounts, setStatusCounts] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortField, setSortField] = useState(defaultSort);
  const [sortOrder, setSortOrder] = useState(1);

  const dialogRef = useRef(null);
  const lowerTitle = title.charAt(0).toLowerCase() + title.slice(1);

  const fetchRows = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.pagination({
        search,
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
      showError(err.response?.data?.message || `Error al cargar ${lowerTitle}`);
    } finally {
      setLoading(false);
    }
  }, [api, search, status, page, rowsPerPage, sortField, sortOrder, lowerTitle]);

  useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  const handleSearch = useCallback((text) => {
    setSearch(text);
    setPage(0);
  }, []);

  const handleStatus = (_, value) => {
    setStatus(value);
    setPage(0);
  };

  const handleSort = (field) => {
    if (sortField === field) setSortOrder((o) => (o === 1 ? -1 : 1));
    else {
      setSortField(field);
      setSortOrder(1);
    }
    setPage(0);
  };

  const run = async (request, fallback) => {
    try {
      const { data } = await request();
      if (data?.message) showSuccess(data.message);
      fetchRows();
    } catch (err) {
      showError(err.response?.data?.message || fallback);
    }
  };

  const handleChangeStatus = (row) =>
    run(() => api.changeStatus({ [idField]: row[idField], staId: row.staId === 1 ? 2 : 1 }), `Error al cambiar el estado`);

  const handleRemove = (row) => run(() => api.remove({ [idField]: row[idField] }), `Error al eliminar`);

  const tableColumns = [
    ...columns,
    { id: 'status', label: 'Estado', render: (row) => <StatusChip staId={row.staId} label={row.statusName ?? STATUS_NAMES[row.staId]} /> },
    { id: 'modified', label: 'Últ. modificación', render: (row) => <LastModifiedCell name={row.updatedByName} date={row.updatedAt} /> }
  ];

  const actionItems = (row) => {
    const label = rowLabel(row);
    const items = [];
    if (can.edit) {
      items.push({ label: 'Editar', icon: <IconEdit size={16} />, command: () => dialogRef.current?.open(row), color: '#fda53a' });
    }
    if (can.changeStatus) {
      items.push(
        row.staId === 1
          ? {
              label: 'Desactivar',
              icon: <IconToggleLeft size={16} />,
              command: () => handleChangeStatus(row),
              color: '#8e8e8e',
              confirm: `¿Desactivar "${label}"? No se podrá asignar en registros nuevos; los que ya lo tienen lo conservan.`,
              confirmLabel: 'Desactivar',
              confirmColor: 'warning'
            }
          : { label: 'Activar', icon: <IconToggleRight size={16} />, command: () => handleChangeStatus(row), color: '#00c853' }
      );
    }
    if (can.remove) {
      items.push({
        label: 'Eliminar',
        icon: <IconTrash size={16} />,
        command: () => handleRemove(row),
        color: '#f43f51',
        confirm: `¿Está seguro de eliminar "${label}"?`
      });
    }
    return items;
  };

  const statusTabs = statusTabsWithCounts(statusCounts);

  return (
    <MainCard
      title={
        // flexWrap: en ancho de teléfono los botones bajan de línea en vez de desbordar.
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ flexWrap: 'wrap', gap: 1.5 }}>
          <SearchInput onSearch={handleSearch} placeholder={searchPlaceholder} />
          <Stack direction="row" alignItems="center" sx={{ flexWrap: 'wrap', gap: 1.5, ml: 'auto' }}>
            <StatusTabs statusTabs={statusTabs} selectedStatus={status} onChange={handleStatus} />
            {can.create && (
              <Button variant="contained" size="small" startIcon={<IconPlus size={16} />} onClick={() => dialogRef.current?.open()}>
                Nuevo
              </Button>
            )}
          </Stack>
        </Stack>
      }
    >
      <DataTable
        columns={tableColumns}
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
        keyExtractor={(row) => row[idField]}
        cardTitleRender={rowLabel}
        actions={actionItems}
      />

      {Dialog ? (
        <Dialog ref={dialogRef} title={title} idField={idField} api={api} onSaved={fetchRows} />
      ) : (
        <MasterDialog ref={dialogRef} title={title} idField={idField} fields={formFields} save={api.save} onSaved={fetchRows} />
      )}
    </MainCard>
  );
}

MasterPage.propTypes = {
  /** Nombre del registro en singular, con mayúscula inicial: "Tipo de identificación". */
  title: PropTypes.string.isRequired,
  /** Id en la API: "iddId". */
  idField: PropTypes.string.isRequired,
  /** Resultado de createMasterApi. */
  api: PropTypes.shape({
    pagination: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    changeStatus: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
  }).isRequired,
  /** Entrada del catálogo de permisos: { view, create, edit, delete, changeStatus } (per_id). */
  permissions: PropTypes.object,
  /** Columnas propias (DataTable); estado y última modificación se agregan solas. */
  columns: PropTypes.array.isRequired,
  /** Texto del campo de búsqueda: "Buscar por código o nombre". Busca en los campos `filter` del servidor. */
  searchPlaceholder: PropTypes.string,
  /** Campos del formulario (GenericFormSection), con `editable: false` para los que no se editan. Sin `dialog`, obligatorio. */
  formFields: PropTypes.array,
  /** Campo de orden inicial (uno `sortable` del servidor). */
  defaultSort: PropTypes.string.isRequired,
  /** Texto que identifica una fila en confirmaciones y en la vista de tarjetas. */
  rowLabel: PropTypes.func.isRequired,
  /** Diálogo propio en lugar de MasterDialog (forwardRef con `open(row?)`). */
  dialog: PropTypes.elementType
};
