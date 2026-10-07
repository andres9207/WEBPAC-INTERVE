import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import BaseDialog from 'ui-component/extended/BaseDialog';
import { configurePolicyTypeBaseAPI } from 'api/requests/policyTypesApi';
import { showError, showSuccess } from 'services/ToastService';
import { POLICY_BASE_OPTIONS } from 'utils/constants';

/**
 * Cambiar la base de cálculo de un tipo de póliza (ADR-0019, decisiones 7 y
 * 10). Cada opción muestra qué la compone. El cambio vale para las pólizas que
 * se emitan después: las versiones ya emitidas conservan su base. Exige el
 * permiso "Configurar base de cálculo"; lo verifica el servidor.
 */
export default function ConfigureBaseDialog({ open, policyType, onClose, onSaved }) {
  const [base, setBase] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) setBase(policyType?.base ?? '');
  }, [open, policyType]);

  const save = async () => {
    setSaving(true);
    try {
      const { data } = await configurePolicyTypeBaseAPI({ pltId: policyType.pltId, base });
      showSuccess(data.message);
      onSaved();
    } catch (err) {
      showError(err.response?.data?.message || 'No se pudo cambiar la base de cálculo');
    } finally {
      setSaving(false);
    }
  };

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title={`Base de cálculo · ${policyType?.name ?? ''}`}
      maxWidth="sm"
      fullScreenOnMobile
      actions={
        <>
          <Button onClick={onClose} disabled={saving}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={save} disabled={saving || !base || base === policyType?.base}>
            {saving ? 'Guardando…' : 'Guardar'}
          </Button>
        </>
      }
    >
      <Stack spacing={2} sx={{ pt: 1 }}>
        <Alert severity="warning">
          Cambia el valor asegurado de las pólizas de este tipo que se emitan desde ahora. Las ya emitidas conservan la base con que se
          emitieron.
        </Alert>
        <RadioGroup value={base} onChange={(event) => setBase(event.target.value)}>
          {POLICY_BASE_OPTIONS.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio size="small" />}
              sx={{ alignItems: 'flex-start', mb: 1, '& .MuiRadio-root': { pt: 0.25 } }}
              label={
                <>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.dark' }}>
                    {option.label}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {option.description}
                  </Typography>
                </>
              }
            />
          ))}
        </RadioGroup>
      </Stack>
    </BaseDialog>
  );
}

ConfigureBaseDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  /** Fila del listado: `{ pltId, name, base }`. */
  policyType: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired
};
