import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { format } from 'date-fns';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import BaseDialog from 'ui-component/extended/BaseDialog';
import DateField from 'ui-component/extended/DateField';
import { invoiceTransitionsApi } from 'api/requests/invoicesApi';
import { showError, showSuccess } from 'services/ToastService';
import { newIdempotencyKey } from 'utils/idempotency';
import { fDateOnly } from 'utils/formatTime';

/**
 * Aprobar una factura registrada (ADR-0020, decisión 7). Captura la fecha de
 * aprobación (hoy por defecto) y una observación opcional. El estado del
 * contrato y las fechas los verifica el servidor bajo bloqueo; aquí solo se
 * avisa antes de enviar.
 */

const today = () => format(new Date(), 'yyyy-MM-dd');

export default function ApproveInvoiceDialog({ open, invoice, onClose, onSaved }) {
  const [saving, setSaving] = useState(false);
  const [idempotencyKey, setIdempotencyKey] = useState(null);
  const { control, handleSubmit, reset } = useForm({ defaultValues: { approvalDate: '', observation: '' } });

  useEffect(() => {
    if (!open) return;
    setIdempotencyKey(newIdempotencyKey());
    reset({ approvalDate: today(), observation: '' });
  }, [open, reset]);

  const save = async (form) => {
    setSaving(true);
    try {
      const { data } = await invoiceTransitionsApi.approve(
        { invId: invoice.invId, approvalDate: form.approvalDate, observation: form.observation.trim() },
        idempotencyKey
      );
      showSuccess(data.message);
      onSaved();
    } catch (err) {
      showError(err.response?.data?.message || 'No se pudo aprobar la factura');
    } finally {
      setSaving(false);
    }
  };

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title={`Aprobar factura ${invoice?.number ?? ''}`}
      maxWidth="sm"
      fullScreenOnMobile
      actions={
        <>
          <Button onClick={onClose} disabled={saving}>
            Cancelar
          </Button>
          <Button variant="contained" color="success" onClick={handleSubmit(save)} disabled={saving}>
            {saving ? 'Aprobando…' : 'Aprobar'}
          </Button>
        </>
      }
    >
      <Grid container spacing={2} sx={{ pt: 1 }}>
        <Grid size={12}>
          <Alert severity="info">
            Una factura aprobada ya no cambia: solo admite cambios en el extracto y la descripción. Para corregir otro dato habrá que
            anularla y registrarla de nuevo.
          </Alert>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="approvalDate"
            control={control}
            rules={{
              required: 'La fecha de aprobación es requerida.',
              validate: (value) => {
                if (value > today()) return 'No puede ser futura.';
                if (invoice?.date && value < invoice.date) return `No antes de la factura (${fDateOnly(invoice.date)}).`;
                return true;
              }
            }}
            render={({ field, fieldState }) => (
              <DateField
                value={field.value ?? ''}
                onChange={field.onChange}
                label="Fecha de aprobación"
                required
                error={fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid size={12}>
          <Controller
            name="observation"
            control={control}
            rules={{ maxLength: { value: 1000, message: 'Máximo 1000 caracteres.' } }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Observación"
                multiline
                minRows={2}
                size="small"
                fullWidth
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </BaseDialog>
  );
}

ApproveInvoiceDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  /** Factura del detalle: `{ invId, number, date }`. */
  invoice: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired
};
