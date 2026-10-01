import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import BaseDialog from 'ui-component/extended/BaseDialog';
import SearchSelect from 'ui-component/extended/SearchSelect';
import { STATUS_OPTIONS } from 'utils/constants';

/**
 * Agregar o editar un responsable de la obra, en memoria: el cambio se guarda
 * con la obra (ADR-0011, decisión 3).
 *
 * - Al agregar no se pregunta el estado: entra activo.
 * - Al editar aparece el estado, para retirar a alguien sin borrar la asignación.
 * - Solo usuarios existentes (DEC-029); la lista no repite a los ya asignados.
 */
export const MANAGER_ROLE_OPTIONS = [
  { value: 'MAIN', label: 'Principal' },
  { value: 'SUPPORT', label: 'Apoyo' }
];

export default function ManagerDialog({ open, manager, userOptions, onClose, onSave }) {
  const isEdit = Boolean(manager?.key);
  const [form, setForm] = useState({ useId: '', role: 'SUPPORT', staId: 1 });
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setForm({ useId: manager?.useId ?? '', role: manager?.role ?? 'SUPPORT', staId: manager?.staId ?? 1 });
      setError('');
    }
  }, [open, manager]);

  const set = (field) => (value) => setForm((f) => ({ ...f, [field]: value }));

  const save = () => {
    if (!form.useId) {
      setError('Selecciona un usuario.');
      return;
    }
    const option = userOptions.find((o) => o.value === form.useId);
    onSave({ ...manager, ...form, name: option?.label ?? manager?.name, staId: isEdit ? form.staId : 1 });
  };

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title={isEdit ? 'Editar responsable' : 'Agregar responsable'}
      maxWidth="xs"
      actions={
        <>
          <Button onClick={onClose}>Cancelar</Button>
          <Button variant="contained" color="secondary" onClick={save}>
            {isEdit ? 'Guardar' : 'Agregar'}
          </Button>
        </>
      }
    >
      <Stack spacing={2} sx={{ pt: 1 }}>
        <SearchSelect
          label="Usuario"
          required
          value={form.useId}
          onChange={(value) => {
            set('useId')(value);
            setError('');
          }}
          options={userOptions}
          placeholder="Busca un usuario activo"
          error={error}
        />
        <SearchSelect label="Rol" value={form.role} onChange={set('role')} options={MANAGER_ROLE_OPTIONS} disableClearable />
        {isEdit && <SearchSelect label="Estado" value={form.staId} onChange={set('staId')} options={STATUS_OPTIONS} disableClearable />}
        <Typography variant="caption" color="text.secondary">
          {isEdit
            ? 'Para retirar a alguien sin borrar su asignación, márcalo inactivo.'
            : 'Entra activo. Solo usuarios activos del sistema; si falta alguien, se crea antes en Usuarios.'}
        </Typography>
      </Stack>
    </BaseDialog>
  );
}

ManagerDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  /** Fila a editar; null para agregar. */
  manager: PropTypes.object,
  /** `[{ value: useId, label }]`, sin los usuarios ya asignados (salvo el que se edita). */
  userOptions: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};
