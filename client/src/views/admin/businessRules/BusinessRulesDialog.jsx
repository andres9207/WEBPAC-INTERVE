import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm, FormProvider } from 'react-hook-form';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import BaseDialog from 'ui-component/extended/BaseDialog';
import GenericFormSection from 'ui-component/extended/GenericFormSection';
import { showSuccess, showError } from 'services/ToastService';
import { getBusinessRulesAPI, saveBusinessRulesAPI } from 'api/requests/businessRulesApi';

// Mismo rango que el servidor (ck_business_rules_value).
const MIN_DAYS = 1;
const MAX_DAYS = 365;

const daysValidation = {
  required: 'Indica los días',
  validate: (value) => {
    const days = Number(value);
    return (Number.isInteger(days) && days >= MIN_DAYS && days <= MAX_DAYS) || `Entre ${MIN_DAYS} y ${MAX_DAYS} días`;
  }
};

/**
 * "Regla de negocio" del menú del perfil (DEC-072): cuántos días antes de su
 * fecha fin se avisa que un contrato o una póliza está próximo a vencer. El
 * de pólizas es también el umbral de "a vencer" del expediente y el tablero.
 */
export default function BusinessRulesDialog({ open, onClose }) {
  const [saving, setSaving] = useState(false);
  const methods = useForm({ defaultValues: { contractExpiringDays: '', policyExpiringDays: '' } });
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (!open) return;
    getBusinessRulesAPI()
      .then(({ data }) =>
        reset({ contractExpiringDays: String(data.contractExpiringDays), policyExpiringDays: String(data.policyExpiringDays) })
      )
      .catch((err) => showError(err.response?.data?.message || 'Error al cargar las reglas de negocio'));
  }, [open, reset]);

  const fields = useMemo(
    () => [
      {
        key: 'contractExpiringDays',
        name: 'contractExpiringDays',
        type: 'number',
        label: 'Vencimiento Contrato (días)',
        required: true,
        maxLength: 3,
        validation: daysValidation,
        grid: { xs: 12, sm: 6 }
      },
      {
        key: 'policyExpiringDays',
        name: 'policyExpiringDays',
        type: 'number',
        label: 'Vencimiento Póliza (días)',
        required: true,
        maxLength: 3,
        validation: daysValidation,
        grid: { xs: 12, sm: 6 }
      }
    ],
    []
  );

  const close = () => {
    onClose();
    reset();
  };

  const onSubmit = async ({ contractExpiringDays, policyExpiringDays }) => {
    setSaving(true);
    try {
      const { data } = await saveBusinessRulesAPI({
        contractExpiringDays: Number(contractExpiringDays),
        policyExpiringDays: Number(policyExpiringDays)
      });
      showSuccess(data.message);
      close();
    } catch (err) {
      showError(err.response?.data?.message || 'Error al guardar las reglas de negocio');
    } finally {
      setSaving(false);
    }
  };

  return (
    <BaseDialog
      open={open}
      onClose={close}
      title="Reglas de Negocio"
      maxWidth="sm"
      actions={
        <>
          <Button onClick={close}>Cancelar</Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)} disabled={saving}>
            Guardar
          </Button>
        </>
      }
    >
      <Typography variant="body2" color="text.secondary">
        Días antes de la fecha fin en que se avisa a los responsables de la obra que un contrato en ejecución o una póliza vigente está
        próximo a vencer.
      </Typography>
      <FormProvider {...methods}>
        <GenericFormSection fields={fields} />
      </FormProvider>
    </BaseDialog>
  );
}

BusinessRulesDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};
