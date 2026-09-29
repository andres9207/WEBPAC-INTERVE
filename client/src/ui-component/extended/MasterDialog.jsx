import { useState, forwardRef, useImperativeHandle, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useForm, FormProvider } from 'react-hook-form';
import Button from '@mui/material/Button';

import BaseDialog from 'ui-component/extended/BaseDialog';
import GenericFormSection from 'ui-component/extended/GenericFormSection';
import { showSuccess, showError } from 'services/ToastService';
import { newIdempotencyKey } from 'utils/idempotency';

/**
 * Diálogo de creación y edición de un maestro (MAE-FE-01). Lo monta
 * MasterPage; se controla por ref con `open(item?)`.
 *
 * - Crear: clave de idempotencia nueva al abrir, reutilizada en cada intento
 *   de ese formulario (FRONTEND_STANDARD, regla 7).
 * - Editar: sin clave; los campos `editable: false` se muestran deshabilitados
 *   y no se envían (el servidor también los ignora).
 * - Sin estado: se activa o desactiva desde el listado (DEC-020).
 *
 * `fields` usa el formato de GenericFormSection, más `editable` (por defecto true).
 */
const MasterDialog = forwardRef(({ title, idField, fields, save, onSaved }, ref) => {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState(0);
  const [idempotencyKey, setIdempotencyKey] = useState(null);
  const [loading, setLoading] = useState(false);

  const emptyForm = useMemo(() => Object.fromEntries(fields.map((f) => [f.name, f.defaultValue ?? ''])), [fields]);
  const methods = useForm({ defaultValues: emptyForm });
  const { handleSubmit, reset } = methods;

  const isEdit = id > 0;
  const formFields = useMemo(
    () => fields.map((f) => ({ key: f.name, grid: { xs: 12 }, ...f, disabled: f.disabled || (isEdit && f.editable === false) })),
    [fields, isEdit]
  );

  useImperativeHandle(ref, () => ({
    open: (item) => {
      if (item) {
        setId(item[idField]);
        setIdempotencyKey(null);
        reset(Object.fromEntries(fields.map((f) => [f.name, item[f.name] ?? ''])));
      } else {
        setId(0);
        setIdempotencyKey(newIdempotencyKey());
        reset(emptyForm);
      }
      setVisible(true);
    }
  }));

  const onSubmit = async (formData) => {
    const values = Object.fromEntries(
      fields
        .filter((f) => !isEdit || f.editable !== false)
        .map((f) => [f.name, typeof formData[f.name] === 'string' ? formData[f.name].trim() : formData[f.name]])
    );

    setLoading(true);
    try {
      const { data } = await save({ [idField]: id, ...values }, isEdit ? undefined : idempotencyKey);
      setVisible(false);
      showSuccess(data.message || 'Guardado correctamente.');
      onSaved?.();
    } catch (err) {
      showError(err.response?.data?.message || 'Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseDialog
      open={visible}
      onClose={() => setVisible(false)}
      title={`${isEdit ? 'Editar' : 'Nuevo'} ${title}`}
      maxWidth="sm"
      loading={loading}
      actions={
        <>
          <Button onClick={() => setVisible(false)}>Cancelar</Button>
          <Button variant="contained" color="secondary" onClick={handleSubmit(onSubmit)} disabled={loading}>
            {isEdit ? 'Guardar Cambios' : 'Guardar'}
          </Button>
        </>
      }
    >
      <FormProvider {...methods}>
        <GenericFormSection fields={formFields} />
      </FormProvider>
    </BaseDialog>
  );
});

MasterDialog.propTypes = {
  title: PropTypes.string.isRequired,
  idField: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string.isRequired, editable: PropTypes.bool })).isRequired,
  save: PropTypes.func.isRequired,
  onSaved: PropTypes.func
};

export default MasterDialog;
