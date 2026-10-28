import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm, useWatch } from 'react-hook-form';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { IconCheck, IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';

import AmountPercentField from 'ui-component/extended/AmountPercentField';
import BaseDialog from 'ui-component/extended/BaseDialog';
import ConfirmDialog from 'ui-component/extended/ConfirmDialog';
import SearchSelect from 'ui-component/extended/SearchSelect';
import { invoiceGlossesApi } from 'api/requests/invoicesApi';
import { useSocket } from 'socket/SocketProvider';
import { showError, showSuccess } from 'services/ToastService';
import { fDateOnly } from 'utils/formatTime';
import { fMoneyText } from 'utils/formatNumber';
import { newIdempotencyKey } from 'utils/idempotency';

/**
 * Glosas de una factura (DEC-085): errores hallados al registrarla, que se
 * controlan hasta su liberación con la factura que las corrige. Llevan código
 * (opcional), valor con signo y descripción; se levantan en un extracto (se
 * propone el de la factura; se escribe, como en la factura, DEC-084). Cada
 * glosa es sobre un campo de la factura (los de su Detalle u Otro, que da el
 * servidor); la negativa es una nota crédito: lo que el proveedor devuelve.
 *
 * Al levantarla se dice si suma al total pagado de su extracto (lo pagado
 * difiere de lo registrado) o es un pendiente que llegará en otra factura.
 * Se libera con la factura que la corrige (migración 0127): del mismo
 * proveedor y obra, de cualquiera de sus contratos y de cualquier extracto.
 * El extracto de esa factura es el de la liberación; la factura ya cuenta en
 * él, así que liberar no cambia el total. No bloquean la
 * aprobación. Abiertas se editan y se eliminan; liberadas, solo se
 * consultan. Las reglas las repite el servidor.
 *
 * Al elegir el campo se ve su importe en la factura, y el valor de la glosa
 * se escribe en pesos o como % de ese importe, con signo (DEC-092, como
 * DEC-065 "Valor y porcentaje"): el servidor convierte y se guarda el valor.
 */

const TEXT_MAX = 1000;
const STATEMENT_MAX = 20;
const VALUE_PATTERN = /^-?\d{1,16}(\.\d{1,2})?$/;

/** Facturas con que se puede liberar la glosa, buscadas en el servidor al dejar de escribir. */
function useReleaseInvoices(iglId) {
  const [search, setSearch] = useState('');
  const [state, setState] = useState({ items: [], loading: false });

  useEffect(() => {
    if (!iglId) return undefined;
    let cancelled = false;
    const term = search.trim();
    const timer = setTimeout(
      async () => {
        setState((s) => ({ ...s, loading: true }));
        try {
          const { data } = await invoiceGlossesApi.releaseInvoices(iglId, term);
          if (!cancelled) setState({ items: data, loading: false });
        } catch (err) {
          if (cancelled) return;
          showError(err.response?.data?.message || 'Error al cargar las facturas');
          setState((s) => ({ ...s, loading: false }));
        }
      },
      term ? 300 : 0
    );
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [iglId, search]);

  return { ...state, search: search.trim(), setSearch };
}

function GlossDialog({ open, mode, invoice, gloss, onClose, onSaved }) {
  const [saving, setSaving] = useState(false);
  const [idempotencyKey, setIdempotencyKey] = useState(null);
  const releasing = mode === 'release';
  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      statement: '',
      field: '',
      code: '',
      value: '',
      affectsTotal: true,
      description: '',
      releaseInvId: '',
      observation: ''
    }
  });
  const releaseOptions = useReleaseInvoices(open && releasing ? gloss?.iglId : null);

  // Importe del campo y el otro lado (el %), del servidor; lo escrito en % hasta que lo convierte.
  const [fieldName, value] = useWatch({ control, name: ['field', 'value'] });
  const [altPct, setAltPct] = useState(null);
  const [pair, setPair] = useState({});
  const fieldOption = (invoice.glossFields ?? []).find((option) => option.value === fieldName);

  useEffect(() => {
    if (!open || releasing || !fieldName) {
      setPair({});
      return undefined;
    }
    let cancelled = false;
    const sent = altPct;
    const timer = setTimeout(
      () =>
        invoiceGlossesApi
          .preview({ invId: invoice.invId, field: fieldName, value: sent !== null ? '' : (value ?? ''), pct: sent ?? '' })
          .then(({ data }) => {
            if (cancelled) return;
            setPair(data);
            // Lo escrito en % pasa al valor, que es lo que se guarda.
            if (sent !== null) {
              setValue('value', data.value ?? '', { shouldDirty: true, shouldValidate: true });
              setAltPct((current) => (current === sent ? null : current));
            }
          })
          .catch((err) => !cancelled && showError(err.response?.data?.message || 'Error al calcular la glosa')),
      350
    );
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [open, releasing, fieldName, value, altPct, invoice.invId, setValue]);

  useEffect(() => {
    if (!open) return;
    setIdempotencyKey(mode === 'create' ? newIdempotencyKey() : null);
    setAltPct(null);
    reset({
      // Una glosa nueva propone el extracto de la factura.
      statement: gloss ? (gloss.statement ?? '') : (invoice.statement ?? ''),
      field: gloss?.field ?? '',
      code: gloss?.code ?? '',
      value: gloss?.value ?? '',
      // Una glosa nueva suma al total: la de una diferencia de pago.
      affectsTotal: gloss ? gloss.affectsTotal : true,
      description: gloss?.description ?? '',
      releaseInvId: '',
      observation: ''
    });
  }, [open, mode, gloss, invoice, reset]);

  const save = async (form) => {
    setSaving(true);
    try {
      const values = {
        statement: form.statement.trim() || null,
        field: form.field,
        code: form.code.trim(),
        value: form.value.trim(),
        affectsTotal: form.affectsTotal,
        description: form.description.trim()
      };
      const { data } =
        mode === 'create'
          ? await invoiceGlossesApi.create({ invId: invoice.invId, ...values }, idempotencyKey)
          : releasing
            ? await invoiceGlossesApi.release({
                iglId: gloss.iglId,
                releaseInvId: form.releaseInvId,
                observation: form.observation.trim()
              })
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
  const statementRules = { maxLength: { value: STATEMENT_MAX, message: `Máximo ${STATEMENT_MAX} caracteres.` } };

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
              name="releaseInvId"
              control={control}
              rules={{ required: 'Elige la factura donde se libera.' }}
              render={({ field, fieldState }) => (
                <SearchSelect
                  value={field.value}
                  onChange={field.onChange}
                  onSearch={releaseOptions.setSearch}
                  options={releaseOptions.items}
                  loading={releaseOptions.loading}
                  label="Factura donde se libera"
                  required
                  placeholder="Número de factura o extracto"
                  error={fieldState.error?.message}
                  helperText={
                    !releaseOptions.loading && !releaseOptions.search && releaseOptions.items.length === 0
                      ? 'El proveedor no tiene otra factura en esta obra.'
                      : 'Del mismo proveedor en esta obra, de cualquier contrato y extracto. Su extracto es el de la liberación.'
                  }
                />
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
                  size="small"
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
              name="statement"
              control={control}
              rules={statementRules}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Extracto en que se levanta"
                  size="small"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  slotProps={{ htmlInput: { maxLength: STATEMENT_MAX } }}
                />
              )}
            />
            <Controller
              name="field"
              control={control}
              rules={{ required: 'Elige el campo de la factura.' }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  select
                  label="Campo de la factura"
                  size="small"
                  fullWidth
                  required
                  error={!!fieldState.error}
                  helperText={
                    fieldState.error?.message ??
                    (fieldOption?.amount != null
                      ? `En la factura: ${fMoneyText(fieldOption.amount)}. La glosa es en cuánto se equivocó.`
                      : 'Sobre qué campo del Detalle es la glosa.')
                  }
                >
                  {(invoice.glossFields ?? []).map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.amount != null ? `${option.label} · ${fMoneyText(option.amount)}` : option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            {/* El valor con su % necesita más ancho que el código. */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ alignItems: 'flex-start' }}>
              <Controller
                name="code"
                control={control}
                rules={{ maxLength: { value: 20, message: 'Máximo 20 caracteres.' } }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Código"
                    size="small"
                    fullWidth
                    sx={{ flex: { sm: 1 } }}
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
                      ? 'Escribe el valor; negativo si es nota crédito (lo que el proveedor devuelve).'
                      : Number(value) === 0
                        ? 'No puede ser cero.'
                        : true
                }}
                render={({ field, fieldState }) => (
                  <Box sx={{ width: '100%', flex: { sm: 2 } }}>
                    <AmountPercentField
                      storedAs="money"
                      signed
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      derived={pair.pct ?? ''}
                      onAltChange={setAltPct}
                      label="Valor"
                      required
                      error={fieldState.error?.message}
                      helperText={
                        fieldOption && fieldOption.amount == null
                          ? 'Este campo no tiene importe en la factura: escribe el valor.'
                          : 'Negativo si es nota crédito. El % es del valor del campo.'
                      }
                    />
                  </Box>
                )}
              />
            </Stack>
            <Controller
              name="affectsTotal"
              control={control}
              render={({ field }) => (
                <Box>
                  <FormControlLabel
                    control={<Checkbox checked={field.value} onChange={(event) => field.onChange(event.target.checked)} />}
                    label="Suma al total pagado del extracto"
                  />
                  <FormHelperText sx={{ mt: 0 }}>
                    {field.value
                      ? 'Lo pagado difiere de lo registrado (p. ej. pagaron 80 de IVA y el sistema calcula 76): la glosa cuadra el extracto con el del constructor.'
                      : 'Es un pendiente que llegará en otra factura (p. ej. se pagaron 10 de 100): no cambia el total.'}
                  </FormHelperText>
                </Box>
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
                  placeholder="Qué error se halló en la factura"
                  multiline
                  minRows={3}
                  size="small"
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
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired
};

export default function InvoiceGlossesTab({ invoice, canManage, onCount }) {
  const socket = useSocket();
  const [rows, setRows] = useState(null);
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
            : 'Errores hallados al registrar la factura, hasta que otra factura del proveedor, en un extracto posterior, los libere. No impiden aprobarla.'}
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
                {row.creditNote && <Chip size="small" label="Nota crédito" color="info" variant="outlined" />}
                {!row.affectsTotal && <Chip size="small" label="No suma al total" variant="outlined" />}
                <Typography variant="subtitle1">
                  {row.fieldName} · {row.code ? `${row.code} · ` : ''}
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
                    <Button
                      size="small"
                      color="success"
                      startIcon={<IconCheck size={16} />}
                      onClick={() => setDialog({ mode: 'release', gloss: row })}
                    >
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
                    Liberada con la factura {row.releaseInvoiceNumber} ({row.releaseInvoiceTypeName},{' '}
                    {row.releaseStatement ? `extracto ${row.releaseStatement}` : 'sin extracto'}) el {fDateOnly(row.releaseDate)} por{' '}
                    {row.releasedByName ?? '—'}
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
  /** `{ invId, statement, state, glossFields }`. */
  invoice: PropTypes.object.isRequired,
  canManage: PropTypes.bool,
  onCount: PropTypes.func
};
