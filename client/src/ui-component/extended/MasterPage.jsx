import { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import TablePagination from '@mui/material/TablePagination';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { IconEdit, IconEye, IconTrash, IconPlus, IconToggleLeft, IconToggleRight, IconLayoutGrid, IconList } from '@tabler/icons-react';

import MainCard from 'ui-component/cards/MainCard';
import SearchInput from 'ui-component/extended/SearchInput';
import DataTable from 'ui-component/extended/DataTable';
import StatusChip from 'ui-component/extended/StatusChip';
import StatusTabs from 'ui-component/extended/StatusTabs';
import LastModifiedCell from 'ui-component/extended/LastModifiedCell';
import MasterDialog from 'ui-component/extended/MasterDialog';
import ConfirmDialog from 'ui-component/extended/ConfirmDialog';
import { useAuth } from 'contexts/AuthContext';
import { showError, showSuccess } from 'services/ToastService';
import { STATUS, statusTabsWithCounts } from 'utils/constants';
import { gridSpacing } from 'store/constant';

const STATUS_NAMES = { [STATUS.ACTIVE]: 'Activo', [STATUS.INACTIVE]: 'Inactivo' };
const ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 50];

// La vista elegida (tarjetas o tabla) se recuerda por listado en el navegador.
// Es una preferencia: si el almacenamiento falla, se usan las tarjetas.
const readView = (key) => {
  try {
    return window.localStorage.getItem(key) === 'table' ? 'table' : 'cards';
  } catch {
    return 'cards';
  }
};
const saveView = (key, value) => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* sin almacenamiento: la elección dura lo que la página */
  }
};

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
 *   `open(row?)`, y como props `title`, `idField`, `api`, `onSaved` y `feminine`.
 * - Acciones con los tonos del tema de ActionButton, no colores fijos.
 * - Tabla vacía: con búsqueda, lo dice; sin registros, ofrece crear el primero.
 * - `navigation`: un agregado con detalle y formulario propios, en un modal
 *   con dirección propia (p. ej. la obra, DEC-034). Crear, ver y editar
 *   navegan en vez de abrir un diálogo, y el listado solo ofrece ver y editar:
 *   activar, desactivar y eliminar viven en el detalle.
 * - `reloadKey`: al cambiar, recarga la página actual (lo sube el modal
 *   después de guardar, cambiar el estado o eliminar).
 * - `header`: contenido que va arriba del listado (p. ej. indicadores, DEC-033).
 * - `renderCard(row, actions)`: activa la vista de tarjetas y el selector
 *   Tarjetas | Tabla. Las tarjetas usan la misma búsqueda, pestañas y
 *   paginación; `actions` son las mismas acciones de la fila.
 * - `stateTabs`: pestañas por el estado del ciclo de vida de un workflow (p.
 *   ej. el contrato, DEC-035) en vez de activo/inactivo. `param` es el campo
 *   del filtro y de la fila (`state`); los conteos llegan en `statusCounts`
 *   por ese valor, y la columna de estado usa `stateName` de la fila.
 * - `filters`: filtros fijos que viajan en cada petición (p. ej. la obra).
 *   Al cambiar, el listado vuelve a la primera página.
 * - `toolbar`: controles junto a la búsqueda (p. ej. el filtro por tipo de
 *   contrato); quien los da maneja su valor y lo pasa en `filters`.
 * - `extraActions(row)`: acciones propias del maestro, después de Editar (p.
 *   ej. "Configurar campos" del tipo de contrato, DEC-037). Cada una con
 *   `label`, `icon`, `command` y `tone`; las filtra por permiso quien las da.
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
  feminine = false,
  pluralTitle,
  dialog: Dialog,
  navigation,
  header,
  renderCard,
  reloadKey,
  stateTabs,
  filters,
  toolbar,
  extraActions
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

  const viewKey = `master-view:${idField}`;
  const [view, setView] = useState(() => (renderCard ? readView(viewKey) : 'table'));
  const showCards = Boolean(renderCard) && view === 'cards';
  // En las tarjetas, una acción con `confirm` pasa por ConfirmDialog, igual que en DataTable.
  const [confirmItem, setConfirmItem] = useState(null);
  const handleView = (_, value) => {
    if (!value) return;
    setView(value);
    saveView(viewKey, value);
  };

  const dialogRef = useRef(null);
  const lowerTitle = title.charAt(0).toLowerCase() + title.slice(1);

  const fetchRows = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.pagination({
        search,
        ...filters,
        ...(stateTabs ? { [stateTabs.param]: status === 'all' ? '' : status } : { staId: status === 'all' ? '' : status }),
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
  }, [api, search, status, page, rowsPerPage, sortField, sortOrder, lowerTitle, stateTabs, filters]);

  useEffect(() => {
    fetchRows();
  }, [fetchRows, reloadKey]);

  // Un filtro nuevo puede dejar menos páginas que la actual.
  useEffect(() => {
    setPage(0);
  }, [filters]);

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
    run(
      () => api.changeStatus({ [idField]: row[idField], staId: row.staId === STATUS.ACTIVE ? STATUS.INACTIVE : STATUS.ACTIVE }),
      `Error al cambiar el estado`
    );

  const handleRemove = (row) => run(() => api.remove({ [idField]: row[idField] }), `Error al eliminar`);

  const tableColumns = [
    ...columns,
    {
      id: 'status',
      label: 'Estado',
      render: (row) =>
        stateTabs ? (
          <StatusChip staId={row[stateTabs.param]} label={row.stateName} scope={null} colorMap={stateTabs.colors} />
        ) : (
          <StatusChip staId={row.staId} label={row.statusName ?? STATUS_NAMES[row.staId]} />
        )
    },
    { id: 'modified', label: 'Últ. modificación', render: (row) => <LastModifiedCell name={row.updatedByName} date={row.updatedAt} /> }
  ];

  const actionItems = (row) => {
    const label = rowLabel(row);
    if (navigation) {
      return [
        { label: 'Ver detalle', icon: <IconEye size={16} />, command: () => navigation.view(row), tone: 'info' },
        ...(can.edit ? [{ label: 'Editar', icon: <IconEdit size={16} />, command: () => navigation.edit(row), tone: 'edit' }] : [])
      ];
    }
    const items = [];
    if (can.edit) {
      items.push({ label: 'Editar', icon: <IconEdit size={16} />, command: () => dialogRef.current?.open(row), tone: 'edit' });
    }
    if (extraActions) items.push(...extraActions(row));
    if (can.changeStatus) {
      items.push(
        row.staId === STATUS.ACTIVE
          ? {
              label: 'Desactivar',
              icon: <IconToggleLeft size={16} />,
              command: () => handleChangeStatus(row),
              tone: 'neutral',
              confirm: `¿Desactivar "${label}"? No se podrá asignar en registros nuevos; los que ya lo tienen lo conservan.`,
              confirmLabel: 'Desactivar',
              confirmColor: 'warning'
            }
          : { label: 'Activar', icon: <IconToggleRight size={16} />, command: () => handleChangeStatus(row), tone: 'success' }
      );
    }
    if (can.remove) {
      items.push({
        label: 'Eliminar',
        icon: <IconTrash size={16} />,
        command: () => handleRemove(row),
        tone: 'danger',
        confirm: `¿Está seguro de eliminar "${label}"?`
      });
    }
    return items;
  };

  const statusTabs = stateTabs
    ? stateTabs.tabs.map((tab) => ({ ...tab, total: statusCounts[tab.id] ?? 0 }))
    : statusTabsWithCounts(statusCounts);
  const openNew = () => (navigation ? navigation.create() : dialogRef.current?.open());

  const plural = (pluralTitle ?? `${lowerTitle}s`).toLowerCase();
  const emptyMessage = search
    ? `No hay resultados para «${search}».`
    : status !== 'all'
      ? `No hay ${plural} en este estado.`
      : `Todavía no hay ${plural}.`;
  const emptyAction =
    !search && status === 'all' && can.create ? (
      <Button variant="outlined" size="small" startIcon={<IconPlus size={16} />} onClick={openNew}>
        {feminine ? 'Crear la primera' : 'Crear el primero'}
      </Button>
    ) : null;

  const handlePageChange = (_, p) => setPage(p);
  const handleRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  // Solo con la vista de tarjetas activa: sin `renderCard` no hay con qué dibujarlas.
  const cards = !showCards ? null : rows.length === 0 ? (
    <Stack alignItems="center" spacing={1.5} sx={{ py: 5 }}>
      <Typography color="text.secondary">{loading ? 'Cargando…' : emptyMessage}</Typography>
      {!loading && emptyAction}
    </Stack>
  ) : (
    <Box sx={{ position: 'relative' }}>
      {/* Recarga: las tarjetas siguen visibles, atenuadas, con la barra arriba. */}
      {loading && <LinearProgress sx={{ position: 'absolute', top: -12, left: 0, right: 0 }} aria-label="Cargando…" />}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
          gap: 2,
          opacity: loading ? 0.6 : 1
        }}
      >
        {rows.map((row) => (
          <Box key={row[idField]} sx={{ minWidth: 0 }}>
            {renderCard(
              row,
              actionItems(row).map((item) => (item.confirm ? { ...item, command: () => setConfirmItem(item) } : item))
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );

  const list = (
    <MainCard
      title={
        // flexWrap: en ancho de teléfono los botones bajan de línea en vez de desbordar.
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ flexWrap: 'wrap', gap: 1.5 }}>
          <Stack direction="row" alignItems="center" sx={{ flexWrap: 'wrap', gap: 1.5 }}>
            <SearchInput onSearch={handleSearch} placeholder={searchPlaceholder} />
            {toolbar}
          </Stack>
          <Stack direction="row" alignItems="center" sx={{ flexWrap: 'wrap', gap: 1.5, ml: 'auto' }}>
            <StatusTabs statusTabs={statusTabs} selectedStatus={status} onChange={handleStatus} />
            {renderCard && (
              <ToggleButtonGroup value={view} exclusive onChange={handleView} size="small" aria-label="Forma de ver el listado">
                <ToggleButton value="cards" sx={{ gap: 0.75, px: 1.5 }}>
                  <IconLayoutGrid size={16} aria-hidden />
                  Tarjetas
                </ToggleButton>
                <ToggleButton value="table" sx={{ gap: 0.75, px: 1.5 }}>
                  <IconList size={16} aria-hidden />
                  Tabla
                </ToggleButton>
              </ToggleButtonGroup>
            )}
            {can.create && (
              <Button variant="contained" size="small" startIcon={<IconPlus size={16} />} onClick={openNew}>
                Nuevo
              </Button>
            )}
          </Stack>
        </Stack>
      }
    >
      {showCards ? (
        <>
          {cards}
          {rows.length > 0 && (
            <TablePagination
              component="div"
              count={total}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPage}
              rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
              labelRowsPerPage="Filas:"
              labelDisplayedRows={({ from, to, count }) => `${from}–${to} de ${count}`}
            />
          )}
          <ConfirmDialog
            open={!!confirmItem}
            onClose={() => setConfirmItem(null)}
            onConfirm={() => confirmItem?.command?.()}
            title={confirmItem?.confirmTitle || 'Confirmar'}
            message={confirmItem?.confirm}
            confirmLabel={confirmItem?.confirmLabel || 'Eliminar'}
            confirmColor={confirmItem?.confirmColor || 'error'}
          />
        </>
      ) : (
        <DataTable
          columns={tableColumns}
          rows={rows}
          total={total}
          loading={loading}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPage}
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
          keyExtractor={(row) => row[idField]}
          cardTitleRender={rowLabel}
          actions={actionItems}
          emptyMessage={emptyMessage}
          emptyAction={emptyAction}
        />
      )}

      {navigation ? null : Dialog ? (
        <Dialog ref={dialogRef} title={title} idField={idField} api={api} onSaved={fetchRows} feminine={feminine} />
      ) : (
        <MasterDialog
          ref={dialogRef}
          title={title}
          idField={idField}
          fields={formFields}
          save={api.save}
          onSaved={fetchRows}
          feminine={feminine}
        />
      )}
    </MainCard>
  );

  if (!header) return list;
  return (
    <Stack spacing={gridSpacing}>
      {header}
      {list}
    </Stack>
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
  /** Género del registro: "Nueva aseguradora", "Crear la primera". */
  feminine: PropTypes.bool,
  /** Plural para los mensajes de tabla vacía, si no basta con agregar "s": "Tipos de identificación". */
  pluralTitle: PropTypes.string,
  /** Diálogo propio en lugar de MasterDialog (forwardRef con `open(row?)`). */
  dialog: PropTypes.elementType,
  /** Detalle y formulario propios en vez de diálogo: `{ create(), view(row), edit(row) }`. */
  navigation: PropTypes.shape({ create: PropTypes.func.isRequired, view: PropTypes.func.isRequired, edit: PropTypes.func.isRequired }),
  /** Contenido arriba del listado: indicadores, avisos. */
  header: PropTypes.node,
  /** Tarjeta de una fila: `(row, actions) => node`. Activa la vista de tarjetas (DEC-033). */
  renderCard: PropTypes.func,
  /** Cambia para recargar el listado (DEC-034). */
  reloadKey: PropTypes.number,
  /** Pestañas por estado del ciclo de vida: `{ param, tabs: [{ id, name, color }], colors: { [id]: color } }`. */
  stateTabs: PropTypes.shape({ param: PropTypes.string.isRequired, tabs: PropTypes.array.isRequired, colors: PropTypes.object }),
  /** Filtros fijos de la petición, p. ej. `{ wrkId }`. Debe ser estable (useMemo). */
  filters: PropTypes.object,
  /** Controles junto a la búsqueda, p. ej. un filtro con su valor en `filters`. */
  toolbar: PropTypes.node,
  /** Acciones propias de una fila, después de Editar: `(row) => [{ label, icon, command, tone }]`. */
  extraActions: PropTypes.func
};
