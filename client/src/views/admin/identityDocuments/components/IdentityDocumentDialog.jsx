import { useState, forwardRef, useImperativeHandle, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { showSuccess, showError } from 'services/ToastService';
import { saveIdentityDocumentAPI } from 'api/requests/identityDocumentsApi';
import { newIdempotencyKey } from 'utils/idempotency';

import GenericFormSection from 'ui-component/extended/GenericFormSection';
import BaseDialog from 'ui-component/extended/BaseDialog';
import Button from '@mui/material/Button';
import { STATUS_OPTIONS } from 'utils/constants';

const EMPTY_FORM = { code: '', name: '', staId: 1 };

const IdentityDocumentDialog = forwardRef(({ addItem, updateItem }, ref) => {
  const [visible, setVisible] = useState(false);
  const [iddId, setIddId] = useState(0);
  // Una clave por formulario de creación (utils/idempotency.js).
  const [idempotencyKey, setIdempotencyKey] = useState(null);
  const [loading, setLoading] = useState(false);

  const methods = useForm({ defaultValues: EMPTY_FORM });
  const { handleSubmit, reset } = methods;

  // El código solo se fija al crear: es la clave estable del tipo (ADR-0008).
  const fields = useMemo(
    () => [
      {
        key: 'code',
        name: 'code',
        type: 'text',
        label: 'Código',
        required: true,
        disabled: iddId > 0,
        validation: {
          required: 'El código es requerido',
          maxLength: { value: 10, message: 'Máximo 10 caracteres' },
          pattern: { value: /^[A-Za-z0-9]+$/, message: 'Solo letras y números, sin espacios' }
        },
        grid: { xs: 12, sm: 4 }
      },
      {
        key: 'name',
        name: 'name',
        type: 'text',
        label: 'Nombre',
        required: true,
        validation: { required: 'El nombre es requerido', maxLength: { value: 100, message: 'Máximo 100 caracteres' } },
        grid: { xs: 12, sm: 8 }
      },
      { key: 'staId', name: 'staId', type: 'selectButton', label: 'Estado', options: STATUS_OPTIONS, grid: { xs: 12 } }
    ],
    [iddId]
  );

  const newIdentityDocument = () => {
    setIddId(0);
    setIdempotencyKey(newIdempotencyKey());
    reset(EMPTY_FORM);
    setVisible(true);
  };

  const editIdentityDocument = (item) => {
    setIdempotencyKey(null);
    setIddId(item.iddId);
    reset({ code: item.code, name: item.name, staId: item.staId });
    setVisible(true);
  };

  useImperativeHandle(ref, () => ({
    newIdentityDocument,
    editIdentityDocument
  }));

  const onSubmit = async (formData) => {
    const payload = {
      iddId,
      name: formData.name.trim(),
      staId: formData.staId,
      ...(iddId > 0 ? {} : { code: formData.code.trim().toUpperCase() })
    };

    setLoading(true);
    try {
      const { data } = await saveIdentityDocumentAPI(payload, iddId > 0 ? undefined : idempotencyKey);

      const item = {
        iddId: iddId > 0 ? iddId : data.iddId,
        code: iddId > 0 ? formData.code : payload.code,
        name: payload.name,
        staId: formData.staId,
        statusName: formData.staId === 1 ? 'Activo' : 'Inactivo'
      };

      if (iddId > 0) {
        updateItem(item);
      } else {
        addItem(item);
      }

      setVisible(false);
      showSuccess(data.message || 'Tipo de identificación guardado con éxito.');
    } catch (err) {
      showError(err.response?.data?.message || 'Error al guardar el tipo de identificación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseDialog
      open={visible}
      onClose={() => setVisible(false)}
      title={iddId ? 'Editar Tipo de Identificación' : 'Nuevo Tipo de Identificación'}
      maxWidth="sm"
      loading={loading}
      actions={
        <>
          <Button onClick={() => setVisible(false)}>Cancelar</Button>
          <Button variant="contained" color="secondary" onClick={handleSubmit(onSubmit)} disabled={loading}>
            {iddId ? 'Guardar Cambios' : 'Guardar'}
          </Button>
        </>
      }
    >
      <FormProvider {...methods}>
        <GenericFormSection fields={fields} />
      </FormProvider>
    </BaseDialog>
  );
});

export default IdentityDocumentDialog;
