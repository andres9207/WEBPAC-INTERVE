import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { IconCheck, IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';

import BaseDialog from 'ui-component/extended/BaseDialog';
import ConfirmDialog from 'ui-component/extended/ConfirmDialog';
import { invoiceGlossesApi } from 'api/requests/invoicesApi';
import { getStatementsSelectAPI } from 'api/requests/statementsApi';
import { useSocket } from 'socket/SocketProvider';
import { showError, showSuccess } from 'services/ToastService';
import { fDateOnly } from 'utils/formatTime';
import { fMoneyText } from 'utils/formatNumber';
import { newIdempotencyKey } from 'utils/idempotency';

/**
 * Glosas de una factura (DEC-085): errores hallados al registrarla, que se
 * controlan hasta su liberación en un extracto posterior. Llevan código
 * (opcional), valor con signo y descripción; se levantan en un extracto de la
 * obra (se propone el de la factura) y se liberan en otro posterior, con
 * observación. No bloquean la aprobación. Abiertas se editan y se eliminan;
 * liberadas, solo se consultan. Las reglas las repite el servidor.
 */

const TEXT_MAX = 1000;
const VALUE_PATTERN = /^-?\d{1,16}(\.\d{1,2})?$/;

function GlossDialog({ open, mode, invoice, gloss, statements, onClose, onSaved }) {
  const [saving, setSaving] = useState(false);
  const [idempotencyKey, setIdempotencyKey] = useState(null);
  const releasing = mode === 'release';
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { stmId: '', code: '', value: '', description: '', releaseStmId: '', observation: '' }
  });

  useEffect(() => {
    if (!open) return;
    setIdempotencyKey(mode === 'create' ? newIdempotencyKey() : null);
    reset({
      stmId: gloss ? (gloss.stmId ?? '') : (invoice.stmId ?? ''),
      code: gloss?.code ?? '',
      value: gloss?.value ?? '',
      description: gloss?.description ?? '',
      releaseStmId: '',
      observation: ''
    });
  }, [open, mode, gloss, invoice, reset]);

  const save = async (form) => {
    setSaving(true);
    try {
      const values = { stmId: form.stmId || null, code: form.code.trim(), value: form.value.trim(), description: form.description.trim() };
      const { data } =
        mode === 'create'
          ? await invoiceGlossesApi.create({ invId: invoice.invId, ...values }, idempotencyKey)
          : releasing
            ? await invoiceGlossesApi.release({ iglId: gloss.iglId, releaseStmId: form.releaseStmId, observation: form.observation.trim() })
            : await invoiceGlossesApi.update({ iglId: gloss.iglId, ...values });
      showSuccess(data.message);
      onSaved();
    } catch (err) {
      showError(err.response?.data?.message || 'No se pudo guardar la glosa');
    } finally {
      setSaving(false);
    }
  };

  const title = { create: 'Nueva glosa', edit: 'Editar glosa', release: 'Liberar glosa' }[mode];
  const textRules = (label) => ({
    validate: (value) => (value.trim() ? true : `${label} es requerida.`),
    maxLength: { value: TEXT_MAX, message: `Máximo ${TEXT_MAX} caracteres.` }
  });
  // Se libera en otro extracto de la obra; el servidor exige además que no sea anterior.
  const releaseOptions = statements.filter((s) => s.value !== gloss?.stmId);

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
          <Button variant="contained" color={releasing ? 'success' : 'secondary'} onClick={handleSubmit(save)} disabled={saving}>
            {saving ? 'Guardando…' : releasing ? 'Liberar' : 'Guardar'}
          </Button>
        </>
      }
    >
      <Stack spacing={2} sx={{ pt: 1 }}>
        {releasing ? (
          <>
            <Alert severity="info">
              {gloss?.code ? `${gloss.code} · ` : ''}
              {fMoneyText(gloss?.value)}: {gloss?.description}. Se libera con la fecha de hoy y después solo se consulta.
            </Alert>
            <Controller
              name="releaseStmId"
              control={control}
              rules={{ required: 'Selecciona el extracto en que se libera.' }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  select
                  label="Extracto en que se libera"
                  fullWidth
                  required
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message ?? (releaseOptions.length === 0 ? 'La obra no tiene otro extracto activo.' : undefined)}
                >
                  {releaseOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="observation"
              control={control}
              rules={textRules('La observación de la liberación')}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Observación"
                  multiline
                  minRows={3}
                  fullWidth
                  required
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  slotProps={{ htmlInput: { maxLength: TEXT_MAX } }}
                />
              )}
            />
          </>
        ) : (
          <>
            <Controller
              name="stmId"
              control={control}
              render={({ field }) => (
                <TextField {...field} select label="Extracto en que se levanta" fullWidth>
                  <MenuItem value="">
                    <em>Sin extracto</em>
                  </MenuItem>
                  {statements.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Controller
                name="code"
                control={control}
                rules={{ maxLength: { value: 20, message: 'Máximo 20 caracteres.' } }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Código"
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    slotProps={{ htmlInput: { maxLength: 20 } }}
                  />
                )}
              />
              <Controller
                name="value"
                control={control}
                rules={{
                  validate: (value) =>
                    !VALUE_PATTERN.test(value.trim())
                      ? 'Un número con punto decimal; negativo si es a favor.'
                      : Number(value) === 0
                        ? 'No puede ser cero.'
                        : true
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Valor"
                    fullWidth
                    required
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    slotProps={{ htmlInput: { inputMode: 'decimal' } }}
                  />
                )}
              />
            </Stack>
            <Controller
              name="description"
              control={control}
              rules={textRules('La descripción')}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Descripción"
                  placeholder="Qué error se halló en la factura"
                  multiline
                  minRows={3}
                  fullWidth
                  required
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  slotProps={{ htmlInput: { maxLength: TEXT_MAX } }}
                />
              )}
            />
          </>
        )}
      </Stack>
    </BaseDialog>
  );
}

GlossDialog.propTypes = {
  open: PropTypes.bool,
  mode: PropTypes.oneOf(['create', 'edit', 'release']),
  invoice: PropTypes.object.isRequired,
  gloss: PropTypes.object,
  statements: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired
};

export default function InvoiceGlossesTab({ invoice, canManage, onCount }) {
  const socket = useSocket();
  const [rows, setRows] = useState(null);
  const [statements, setStatements] = useState([]);
  const [dialog, setDialog] = useState(null);
  const [removing, setRemoving] = useState(null);
  const cancelled = invoice.state === 'CANCELLED';

  const load = useCallback(async () => {
    try {
      const { data } = await invoiceGlossesApi.list(invoice.invId);
      setRows(data);
      onCount?.(data.filter((row) => row.open).length);
    } catch (err) {
      showError(err.response?.data?.message || 'Error al cargar las glosas');
      setRows([]);
    }
  }, [invoice.invId, onCount]);

  useEffect(() => {
    load();
  }, [load]);

  // Extractos activos de la obra de la factura, para levantar y liberar.
  useEffect(() => {
    if (!canManage) return undefined;
    let ignore = false;
    getStatementsSelectAPI({ wrkId: invoice.wrkId })
      .then(({ data }) => !ignore && setStatements(data))
      .catch((err) => !ignore && showError(err.response?.data?.message || 'Error al cargar los extractos de la obra'));
    return () => {
      ignore = true;
    };
  }, [canManage, invoice.wrkId]);

  // Otro usuario cambió una glosa: se recarga.
  useEffect(() => {
    if (!socket) return undefined;
    socket.on('refresh-invoices', load);
    return () => socket.off('refresh-invoices', load);
  }, [socket, load]);

  const saved = () => {
    setDialog(null);
    load();
  };

  const remove = async () => {
    try {
      const { data } = await invoiceGlossesApi.remove(removing.iglId);
      showSuccess(data.message);
      load();
    } catch (err) {
      showError(err.response?.data?.message || 'No se pudo eliminar la glosa');
    }
  };

  if (rows === null) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {cancelled
            ? 'Factura anulada: no admite glosas nuevas. Las abiertas se pueden liberar o eliminar.'
            : 'Errores hallados al registrar la factura, hasta su liberación en un extracto posterior. No impiden aprobarla.'}
        </Typography>
        {canManage && (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<IconPlus size={16} />}
            onClick={() => setDialog({ mode: 'create' })}
            disabled={cancelled}
          >
            Nueva glosa
          </Button>
        )}
      </Stack>

      {rows.length === 0 ? (
        <Typography color="text.secondary" sx={{ py: 3, textAlign: 'center' }}>
          Esta factura no tiene glosas.
        </Typography>
      ) : (
        <Box
          component="ol"
          sx={{ listStyle: 'none', p: 0, m: 0, border: '1px solid', borderColor: 'divider', borderRadius: 2, bgcolor: 'background.paper' }}
        >
          {rows.map((row, i) => (
            <Stack
              key={row.iglId}
              component="li"
              spacing={1}
              sx={{ px: 2, py: 1.5, borderBottom: i < rows.length - 1 ? '1px solid' : 'none', borderColor: 'divider' }}
            >
              <Stack direction="row" sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                <Chip
                  size="small"
                  label={row.open ? 'Abierta' : 'Liberada'}
                  color={row.open ? 'warning' : 'success'}
                  variant={row.open ? 'filled' : 'outlined'}
                />
                <Typography variant="subtitle1">
                  {row.code ? `${row.code} · ` : ''}
                  {fMoneyText(row.value)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {row.statement ? `Extracto ${row.statement} · ` : ''}por {row.createdByName ?? '—'}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                {canManage && row.open && (
                  <Stack direction="row" spacing={0.5}>
                    {!cancelled && (
                      <Button size="small" startIcon={<IconEdit size={16} />} onClick={() => setDialog({ mode: 'edit', gloss: row })}>
                        Editar
                      </Button>
                    )}
                    <Button size="small" color="success" startIcon={<IconCheck size={16} />} onClick={() => setDialog({ mode: 'release', gloss: row })}>
                      Liberar
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
                    Liberada en el extracto {row.releaseStatement} el {fDateOnly(row.releaseDate)} por {row.releasedByName ?? '—'}
                  </Typography>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                    {row.releaseObservation}
                  </Typography>
                </Box>
              )}
            </Stack>
          ))}
        </Box>
      )}

      <GlossDialog
        open={Boolean(dialog)}
        mode={dialog?.mode ?? 'create'}
        invoice={invoice}
        gloss={dialog?.gloss}
        statements={statements}
        onClose={() => setDialog(null)}
        onSaved={saved}
      />
      <ConfirmDialog
        open={Boolean(removing)}
        onClose={() => setRemoving(null)}
        onConfirm={remove}
        title="Eliminar glosa"
        message={`¿Eliminar la glosa de ${fMoneyText(removing?.value)}? Deja de verse; queda en la bitácora.`}
        confirmLabel="Eliminar"
        confirmColor="error"
      />
    </Stack>
  );
}

InvoiceGlossesTab.propTypes = {
  /** `{ invId, wrkId, stmId, state }`. */
  invoice: PropTypes.object.isRequired,
  canManage: PropTypes.bool,
  onCount: PropTypes.func
};
