import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Controller, useForm } from 'react-hook-form';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { IconCheck, IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';

import BaseDialog from 'ui-component/extended/BaseDialog';
import ConfirmDialog from 'ui-component/extended/ConfirmDialog';
import { invoiceFollowUpsApi } from 'api/requests/invoicesApi';
import { useSocket } from 'socket/SocketProvider';
import { showError, showSuccess } from 'services/ToastService';
import { fDateOnly } from 'utils/formatTime';
import { newIdempotencyKey } from 'utils/idempotency';

/**
 * Seguimiento de una factura (DEC-076): lo que se está trabajando sobre ella.
 * Se abre con una fecha (no futura) y una descripción, y se cierra con una
 * observación; la fecha de cierre la pone el servidor. Uno abierto a la vez;
 * abierto se edita y se elimina, cerrado solo se consulta. En una anulada no
 * se abren ni se editan (el servidor lo repite).
 */

const DESCRIPTION_MAX = 1000;
const today = () => format(new Date(), 'yyyy-MM-dd');

function FollowUpDialog({ open, mode, invId, followUp, onClose, onSaved }) {
  const [saving, setSaving] = useState(false);
  const [idempotencyKey, setIdempotencyKey] = useState(null);
  const closing = mode === 'close';
  const { control, handleSubmit, reset } = useForm({ defaultValues: { openDate: '', description: '', observation: '' } });

  useEffect(() => {
    if (!open) return;
    setIdempotencyKey(mode === 'open' ? newIdempotencyKey() : null);
    reset({ openDate: followUp?.openDate ?? today(), description: followUp?.description ?? '', observation: '' });
  }, [open, mode, followUp, reset]);

  const save = async (form) => {
    setSaving(true);
    try {
      const { data } =
        mode === 'open'
          ? await invoiceFollowUpsApi.open({ invId, openDate: form.openDate, description: form.description.trim() }, idempotencyKey)
          : closing
            ? await invoiceFollowUpsApi.close({ ifuId: followUp.ifuId, observation: form.observation.trim() })
            : await invoiceFollowUpsApi.update({ ifuId: followUp.ifuId, openDate: form.openDate, description: form.description.trim() });
      showSuccess(data.message);
      onSaved();
    } catch (err) {
      showError(err.response?.data?.message || 'No se pudo guardar el seguimiento');
    } finally {
      setSaving(false);
    }
  };

  const title = { open: 'Abrir seguimiento', edit: 'Editar seguimiento', close: 'Cerrar seguimiento' }[mode];
  const textRules = (label) => ({
    validate: (value) => (value.trim() ? true : `${label} es requerida.`),
    maxLength: { value: DESCRIPTION_MAX, message: `Máximo ${DESCRIPTION_MAX} caracteres.` }
  });

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title={title}
      maxWidth="sm"
      fullScreenOnMobile
      actions={
        <>
          <Button onClick={onClose} disabled={saving}>
            Cancelar
          </Button>
          <Button variant="contained" color={closing ? 'success' : 'secondary'} onClick={handleSubmit(save)} disabled={saving}>
            {saving ? 'Guardando…' : closing ? 'Cerrar seguimiento' : 'Guardar'}
          </Button>
        </>
      }
    >
      <Stack spacing={2} sx={{ pt: 1 }}>
        {closing ? (
          <>
            <Alert severity="info">
              Abierto el {fDateOnly(followUp?.openDate)}: {followUp?.description}. Se cierra con la fecha de hoy y después solo se consulta.
            </Alert>
            <Controller
              name="observation"
              control={control}
              rules={textRules('La observación de cierre')}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Observación de cierre"
                  multiline
                  minRows={3}
                  fullWidth
                  required
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  slotProps={{ htmlInput: { maxLength: DESCRIPTION_MAX } }}
                />
              )}
            />
          </>
        ) : (
          <>
            <Controller
              name="openDate"
              control={control}
              rules={{
                required: 'La fecha de apertura es requerida.',
                validate: (value) => (value > today() ? 'No puede ser futura.' : true)
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  type="date"
                  label="Fecha de apertura"
                  fullWidth
                  required
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  slotProps={{ inputLabel: { shrink: true }, htmlInput: { max: today() } }}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              rules={textRules('La descripción')}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Descripción"
                  placeholder="Qué se le está haciendo seguimiento a esta factura"
                  multiline
                  minRows={3}
                  fullWidth
                  required
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  slotProps={{ htmlInput: { maxLength: DESCRIPTION_MAX } }}
                />
              )}
            />
          </>
        )}
      </Stack>
    </BaseDialog>
  );
}

FollowUpDialog.propTypes = {
  open: PropTypes.bool,
  mode: PropTypes.oneOf(['open', 'edit', 'close']),
  invId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  followUp: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired
};

export default function InvoiceFollowUpsTab({ invId, cancelled, canManage, onCount, onChanged }) {
  const socket = useSocket();
  const [rows, setRows] = useState(null);
  const [dialog, setDialog] = useState(null);
  const [removing, setRemoving] = useState(null);

  const load = useCallback(async () => {
    try {
      const { data } = await invoiceFollowUpsApi.list(invId);
      setRows(data);
      onCount?.(data.length);
    } catch (err) {
      showError(err.response?.data?.message || 'Error al cargar el seguimiento');
      setRows([]);
    }
  }, [invId, onCount]);

  useEffect(() => {
    load();
  }, [load]);

  // Otro usuario abrió, cerró o editó un seguimiento: se recarga.
  useEffect(() => {
    if (!socket) return undefined;
    socket.on('refresh-invoices', load);
    return () => socket.off('refresh-invoices', load);
  }, [socket, load]);

  // `onChanged`: la pantalla de debajo (listado o tablero) recarga su cifra de seguimientos.
  const saved = () => {
    setDialog(null);
    load();
    onChanged?.();
  };

  const remove = async () => {
    try {
      const { data } = await invoiceFollowUpsApi.remove(removing.ifuId);
      showSuccess(data.message);
      load();
      onChanged?.();
    } catch (err) {
      showError(err.response?.data?.message || 'No se pudo eliminar el seguimiento');
    }
  };

  if (rows === null) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  const hasOpen = rows.some((row) => row.open);
  const canOpen = canManage && !cancelled && !hasOpen;

  return (
    <Stack spacing={2}>
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {cancelled
            ? 'Factura anulada: no admite seguimientos nuevos. El que quedó abierto se puede cerrar o eliminar.'
            : hasOpen
              ? 'Hay un seguimiento abierto: ciérralo para abrir otro.'
              : 'Lo que se está trabajando sobre esta factura.'}
        </Typography>
        {canManage && (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<IconPlus size={16} />}
            onClick={() => setDialog({ mode: 'open' })}
            disabled={!canOpen}
          >
            Abrir seguimiento
          </Button>
        )}
      </Stack>

      {rows.length === 0 ? (
        <Typography color="text.secondary" sx={{ py: 3, textAlign: 'center' }}>
          Esta factura no tiene seguimientos.
        </Typography>
      ) : (
        <Box
          component="ol"
          sx={{ listStyle: 'none', p: 0, m: 0, border: '1px solid', borderColor: 'divider', borderRadius: 2, bgcolor: 'background.paper' }}
        >
          {rows.map((row, i) => (
            <Stack
              key={row.ifuId}
              component="li"
              spacing={1}
              sx={{ px: 2, py: 1.5, borderBottom: i < rows.length - 1 ? '1px solid' : 'none', borderColor: 'divider' }}
            >
              <Stack direction="row" sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                <Chip
                  size="small"
                  label={row.open ? 'Abierto' : 'Cerrado'}
                  color={row.open ? 'warning' : 'success'}
                  variant={row.open ? 'filled' : 'outlined'}
                />
                <Typography variant="subtitle1">Abierto el {fDateOnly(row.openDate)}</Typography>
                <Typography variant="caption" color="text.secondary">
                  por {row.createdByName ?? '—'}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                {canManage && row.open && (
                  <Stack direction="row" spacing={0.5}>
                    {!cancelled && (
                      <Button size="small" startIcon={<IconEdit size={16} />} onClick={() => setDialog({ mode: 'edit', followUp: row })}>
                        Editar
                      </Button>
                    )}
                    <Button
                      size="small"
                      color="success"
                      startIcon={<IconCheck size={16} />}
                      onClick={() => setDialog({ mode: 'close', followUp: row })}
                    >
                      Cerrar
                    </Button>
                    <Button size="small" color="error" startIcon={<IconTrash size={16} />} onClick={() => setRemoving(row)}>
                      Eliminar
                    </Button>
                  </Stack>
                )}
              </Stack>
              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                {row.description}
              </Typography>
              {!row.open && (
                <Box sx={{ pl: 1.5, borderLeft: '3px solid', borderColor: 'success.light' }}>
                  <Typography variant="caption" color="text.secondary">
                    Cerrado el {fDateOnly(row.closeDate)} por {row.closedByName ?? '—'}
                  </Typography>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                    {row.closeObservation}
                  </Typography>
                </Box>
              )}
            </Stack>
          ))}
        </Box>
      )}

      <FollowUpDialog
        open={Boolean(dialog)}
        mode={dialog?.mode ?? 'open'}
        invId={invId}
        followUp={dialog?.followUp}
        onClose={() => setDialog(null)}
        onSaved={saved}
      />
      <ConfirmDialog
        open={Boolean(removing)}
        onClose={() => setRemoving(null)}
        onConfirm={remove}
        title="Eliminar seguimiento"
        message={`¿Eliminar el seguimiento abierto el ${fDateOnly(removing?.openDate)}? Deja de verse; queda en la bitácora.`}
        confirmLabel="Eliminar"
        confirmColor="error"
      />
    </Stack>
  );
}

InvoiceFollowUpsTab.propTypes = {
  invId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  cancelled: PropTypes.bool,
  canManage: PropTypes.bool,
  onCount: PropTypes.func,
  onChanged: PropTypes.func
};
