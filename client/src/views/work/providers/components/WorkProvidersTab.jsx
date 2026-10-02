import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { IconEdit, IconEye, IconLinkOff, IconPlus, IconSearch } from '@tabler/icons-react';

import DataTable from 'ui-component/extended/DataTable';
import { Pending } from 'ui-component/extended/DetailBlocks';
import StatusChip from 'ui-component/extended/StatusChip';
import NewProviderDialog from './NewProviderDialog';
import WorkProviderDialog from './WorkProviderDialog';
import { workProvidersApi } from 'api/requests/providersApi';
import { useAuth } from 'contexts/AuthContext';
import { useSocket } from 'socket/SocketProvider';
import { showError, showSuccess } from 'services/ToastService';
import { fDateOnly } from 'utils/formatTime';
import { STATUS } from 'utils/constants';

/**
 * Proveedores de una obra (ADR-0012). Dos flujos que convergen (decisión 7):
 *   - Agregar proveedor existente: búsqueda remota y asignación.
 *   - Crear proveedor nuevo: lo crea y asigna; si el documento ya existe,
 *     ofrece asignar el existente en vez de mostrar solo el error.
 * Asignar, editar la asignación y desasignar se guardan al momento, con
 * endpoints propios (DEC-031). Desasignar no elimina el proveedor del maestro.
 *
 * Los permisos solo ocultan acciones (FRONTEND_STANDARD, regla 1).
 */
export default function WorkProvidersTab({ wrkId, workCode, onChanged }) {
  const navigate = useNavigate();
  const socket = useSocket();
  const { permissionsCatalog, hasPermission } = useAuth();
  const canDo = (perId) => perId != null && hasPermission(perId);
  const perms = permissionsCatalog.work?.providers;
  const canAssign = canDo(perms?.assignWork);
  const canUnassign = canDo(perms?.unassignWork);
  const canCreate = canAssign && canDo(perms?.create);
  const canViewProviders = canDo(perms?.view);

  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [dialog, setDialog] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await workProvidersApi.pagination({ wrkId, first: page * rowsPerPage, rows: rowsPerPage });
      setRows(data.results);
      setTotal(data.total);
    } catch (err) {
      showError(err.response?.data?.message || 'Error al cargar los proveedores de la obra');
    } finally {
      setLoading(false);
    }
  }, [wrkId, page, rowsPerPage]);

  useEffect(() => {
    load();
  }, [load]);

  // Otro usuario asignó o desasignó: se recarga.
  useEffect(() => {
    if (!socket) return undefined;
    socket.on('refresh-works', load);
    return () => socket.off('refresh-works', load);
  }, [socket, load]);

  const saved = () => {
    setDialog(null);
    load();
    onChanged?.();
  };

  const unassign = async (row) => {
    try {
      const { data } = await workProvidersApi.unassign({ wrkId, prvId: row.prvId });
      showSuccess(data.message);
      load();
      onChanged?.();
    } catch (err) {
      showError(err.response?.data?.message || 'No se pudo desasignar el proveedor');
    }
  };

  const columns = [
    {
      id: 'providerName',
      label: 'Proveedor',
      render: (row) => (
        <>
          <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.dark' }}>
            {row.providerName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {row.identityCode} {row.identification}
            {row.providerStaId !== 1 ? ' · proveedor inactivo' : ''}
          </Typography>
        </>
      ),
      cardRender: (row) => `${row.providerName} · ${row.identityCode} ${row.identification}`
    },
    { id: 'providerType', label: 'Tipo' },
    { id: 'assignmentDate', label: 'Asignado el', render: (row) => fDateOnly(row.assignmentDate) },
    { id: 'observation', label: 'Observaciones', render: (row) => row.observation || '—' },
    {
      id: 'staId',
      label: 'Asignación',
      render: (row) => <StatusChip staId={row.staId} label={row.staId === STATUS.ACTIVE ? 'Activa' : 'Inactiva'} />
    }
  ];

  const actions = (row) => [
    ...(canViewProviders
      ? [{ label: 'Ver proveedor', icon: <IconEye size={16} />, command: () => navigate(`/work/providers/${row.prvId}`), tone: 'info' }]
      : []),
    ...(canAssign
      ? [
          {
            label: 'Editar asignación',
            icon: <IconEdit size={16} />,
            command: () => setDialog({ type: 'edit', assignment: row }),
            tone: 'edit'
          }
        ]
      : []),
    ...(canUnassign
      ? [
          {
            label: 'Desasignar',
            icon: <IconLinkOff size={16} />,
            command: () => unassign(row),
            tone: 'danger',
            confirm: `¿Desasignar a "${row.providerName}" de la obra ${workCode}? El proveedor sigue en el maestro y en sus otras obras.`,
            confirmLabel: 'Desasignar'
          }
        ]
      : [])
  ];

  const buttons = (
    <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
      {canAssign && (
        <Button variant="outlined" color="inherit" startIcon={<IconSearch size={16} />} onClick={() => setDialog({ type: 'assign' })}>
          Agregar proveedor existente
        </Button>
      )}
      {canCreate && (
        <Button variant="contained" color="secondary" startIcon={<IconPlus size={16} />} onClick={() => setDialog({ type: 'new' })}>
          Crear proveedor nuevo
        </Button>
      )}
    </Stack>
  );

  return (
    <Stack spacing={2}>
      {!loading && total === 0 ? (
        <Pending
          title="Sin proveedores asignados."
          text="Asigna un proveedor que ya esté registrado o crea uno nuevo. Un mismo proveedor se reutiliza en todas sus obras."
          action={buttons}
        />
      ) : (
        <>
          <Stack direction="row" sx={{ justifyContent: 'flex-end' }}>
            {buttons}
          </Stack>
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
            keyExtractor={(row) => row.wkpId}
            cardTitleRender={(row) => row.providerName}
            actions={actions}
            emptyMessage="Sin proveedores asignados."
          />
        </>
      )}

      <WorkProviderDialog
        open={dialog?.type === 'assign' || dialog?.type === 'edit'}
        wrkId={wrkId}
        assignment={dialog?.type === 'edit' ? dialog.assignment : null}
        preset={dialog?.preset ?? null}
        onClose={() => setDialog(null)}
        onSaved={saved}
      />
      <NewProviderDialog
        open={dialog?.type === 'new'}
        wrkId={wrkId}
        onClose={() => setDialog(null)}
        onSaved={saved}
        onUseExisting={(existing) => setDialog({ type: 'assign', preset: existing })}
      />
    </Stack>
  );
}

WorkProvidersTab.propTypes = {
  wrkId: PropTypes.number.isRequired,
  workCode: PropTypes.string,
  /** La obra recarga su conteo de proveedores. */
  onChanged: PropTypes.func
};
