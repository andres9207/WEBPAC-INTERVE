import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { format } from 'date-fns';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import BaseDialog from 'ui-component/extended/BaseDialog';
import DateField from 'ui-component/extended/DateField';
import { changeWorkStateAPI } from 'api/requests/worksApi';
import { showError, showSuccess } from 'services/ToastService';

/**
 * Finalizar una obra (DEC-083) con su fecha de finalización. No bloquea
 * registros nuevos ni exige los contratos liquidados: el tablero de la obra
 * avisa los que faltan por liquidar. La fecha no anterior al inicio la
 * verifica el servidor.
 */

const today = () => format(new Date(), 'yyyy-MM-dd');

export default function FinishWorkDialog({ open, work, onClose, onSaved }) {
  const [saving, setSaving] = useState(false);
  const { control, handleSubmit, reset } = useForm({ defaultValues: { finishDate: '' } });

  useEffect(() => {
    if (open) reset({ finishDate: today() });
  }, [open, reset]);

  const save = async (form) => {
    setSaving(true);
    try {
      const { data } = await changeWorkStateAPI({ wrkId: work.wrkId, state: 'FINISHED', finishDate: form.finishDate });
      showSuccess(data.message);
      onSaved();
    } catch (err) {
      showError(err.response?.data?.message || 'No se pudo finalizar la obra');
    } finally {
      setSaving(false);
    }
  };

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title={`Finalizar obra ${work?.code ?? ''}`}
      maxWidth="xs"
      fullScreenOnMobile
      actions={
        <>
          <Button onClick={onClose} disabled={saving}>
            Cancelar
          </Button>
          <Button variant="contained" color="secondary" onClick={handleSubmit(save)} disabled={saving}>
            {saving ? 'Finalizando…' : 'Finalizar'}
          </Button>
        </>
      }
    >
      <Grid container spacing={2} sx={{ pt: 1 }}>
        <Grid size={12}>
          <Alert severity="info">
            La obra sigue admitiendo registros. Los contratos que falten por liquidar se avisan en el tablero de la obra. Se puede reabrir.
          </Alert>
        </Grid>
        <Grid size={12}>
          <Controller
            name="finishDate"
            control={control}
            rules={{ required: 'La fecha de finalización es requerida.' }}
            render={({ field, fieldState }) => (
              <DateField
                value={field.value ?? ''}
                onChange={field.onChange}
                label="Fecha de finalización"
                required
                error={fieldState.error?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </BaseDialog>
  );
}

FinishWorkDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  /** `{ wrkId, code }`. */
  work: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired
};
