import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import BaseDialog from 'ui-component/extended/BaseDialog';
import { invoiceTransitionsApi } from 'api/requests/invoicesApi';
import { showError, showSuccess } from 'services/ToastService';

/**
 * Eliminar una factura (DEC-068): eliminación lógica con observación, que
 * queda en la bitácora. Una registrada exige el permiso de eliminar; una
 * aprobada, además el reforzado, y revierte su efecto en los saldos. Lo
 * verifica el servidor. La anulada no se elimina.
 */

const EMPTY = { observation: '' };

export default function DeleteInvoiceDialog({ open, invoice, onClose, onDeleted }) {
  const [saving, setSaving] = useState(false);
  const { control, handleSubmit, reset } = useForm({ defaultValues: EMPTY });

  useEffect(() => {
    if (open) reset(EMPTY);
  }, [open, reset]);

  const save = async (form) => {
    setSaving(true);
    try {
      const { data } = await invoiceTransitionsApi.remove({ invId: invoice.invId, observation: form.observation.trim() });
      // El acto pudo completar las condiciones de liquidación del contrato (DEC-081).
      showSuccess(data.contractLiquidated ? `${data.message}. El contrato cumplió las condiciones y quedó liquidado.` : data.message);
      onDeleted();
    } catch (err) {
      showError(err.response?.data?.message || 'No se pudo eliminar la factura');
    } finally {
      setSaving(false);
    }
  };

  const approved = invoice?.state === 'APPROVED';

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title={`Eliminar factura ${invoice?.number ?? ''}`}
      maxWidth="sm"
      fullScreenOnMobile
      actions={
        <>
          <Button onClick={onClose} disabled={saving}>
            Cancelar
          </Button>
          <Button variant="contained" color="error" onClick={handleSubmit(save)} disabled={saving}>
            {saving ? 'Eliminando…' : 'Eliminar'}
          </Button>
        </>
      }
    >
      <Grid container spacing={2} sx={{ pt: 1 }}>
        <Grid size={12}>
          <Alert severity="warning">
            {approved
              ? 'La factura está aprobada. Eliminarla la saca de los listados y de los saldos del contrato, y libera su número para el proveedor. No se puede deshacer.'
              : 'La factura desaparece de los listados y su número queda libre para el proveedor. No se puede deshacer.'}
          </Alert>
        </Grid>
        <Grid size={12}>
          <Controller
            name="observation"
            control={control}
            rules={{
              validate: (value) => value.trim() !== '' || 'La observación es requerida.',
              maxLength: { value: 1000, message: 'Máximo 1000 caracteres.' }
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Observación"
                required
                multiline
                minRows={2}
                size="small"
                fullWidth
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message ?? 'Por qué se elimina: queda en la bitácora.'}
              />
            )}
          />
        </Grid>
      </Grid>
    </BaseDialog>
  );
}

DeleteInvoiceDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  /** Factura del detalle: `{ invId, number, state }`. */
  invoice: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired
};
