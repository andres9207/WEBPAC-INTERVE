import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { format } from 'date-fns';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import BaseDialog from 'ui-component/extended/BaseDialog';
import DateField from 'ui-component/extended/DateField';
import ConceptFields, { EMPTY_CONCEPT, conceptToForm } from './ConceptFields';
import { contractConceptsApi } from 'api/requests/contractsApi';
import { showError, showSuccess } from 'services/ToastService';
import { newIdempotencyKey } from 'utils/idempotency';
import { fDateOnly } from 'utils/formatTime';
import { TERM_UNIT_OPTIONS } from 'utils/constants';

/**
 * Diálogos de los actos sobre el valor del contrato (ADR-0016, PRO-FE-07):
 *   - `amendment`: otrosí ordinario. El número lo asigna el servidor y se
 *     muestra al guardar; nunca se captura.
 *   - `liquidation`: otrosí de liquidación, con confirmación explícita porque
 *     pasa el contrato a liquidación y cierra la puerta a otros otrosí.
 *   - `edit`: modificar un concepto existente (permiso propio). El tipo no
 *     cambia; la fecha del valor inicial es la del contrato.
 * Crear lleva clave de idempotencia, una por diálogo abierto.
 */

const TITLES = { amendment: 'Registrar otrosí', liquidation: 'Registrar otrosí de liquidación', edit: 'Modificar concepto' };
const today = () => format(new Date(), 'yyyy-MM-dd');
const text = (value) => String(value ?? '').trim();

const unitName = (unit) => TERM_UNIT_OPTIONS.find((o) => o.value === unit)?.label.toLowerCase() ?? '';

export default function ConceptDialog({ open, mode, contract, concept, onClose, onSaved }) {
  const isEdit = mode === 'edit';
  const type = isEdit ? concept?.type : mode === 'liquidation' ? 'LIQUIDATION' : 'AMENDMENT';
  const isInitial = type === 'INITIAL';
  const hasExtension = type === 'AMENDMENT';

  const [saving, setSaving] = useState(false);
  const [idempotencyKey, setIdempotencyKey] = useState(null);
  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (!open) return;
    setIdempotencyKey(isEdit ? null : newIdempotencyKey());
    reset(
      isEdit
        ? {
            ...conceptToForm(concept),
            startDate: concept.startDate,
            description: concept.description ?? '',
            extension: concept.extension === null || concept.extension === undefined ? '' : String(concept.extension),
            confirmed: true
          }
        : { ...EMPTY_CONCEPT, startDate: today(), description: '', extension: '', confirmed: false }
    );
  }, [open, isEdit, concept, reset]);

  const save = async (form) => {
    setSaving(true);
    const payload = {
      startDate: form.startDate,
      description: text(form.description),
      ...Object.fromEntries(Object.keys(EMPTY_CONCEPT).map((field) => [field, form[field]])),
      ...(hasExtension ? { extension: text(form.extension) } : {})
    };
    try {
      const { data } = isEdit
        ? await contractConceptsApi.update({ ccpId: concept.ccpId, ...payload })
        : mode === 'liquidation'
          ? await contractConceptsApi.createLiquidation({ ctrId: contract.ctrId, ...payload }, idempotencyKey)
          : await contractConceptsApi.createAmendment({ ctrId: contract.ctrId, ...payload }, idempotencyKey);
      showSuccess(data.message);
      onSaved();
    } catch (err) {
      showError(err.response?.data?.message || 'No se pudo guardar el concepto');
    } finally {
      setSaving(false);
    }
  };

  const title = isEdit ? `${TITLES.edit}: ${concept?.typeName}${concept?.number ? ` N.º ${concept.number}` : ''}` : TITLES[mode];

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title={title}
      maxWidth="md"
      fullScreenOnMobile
      actions={
        <>
          <Button onClick={onClose} disabled={saving}>
            Cancelar
          </Button>
          <Button variant="contained" color="secondary" onClick={handleSubmit(save)} disabled={saving}>
            {saving
              ? 'Guardando…'
              : isEdit
                ? 'Guardar cambios'
                : mode === 'liquidation'
                  ? 'Registrar y pasar a liquidación'
                  : 'Registrar otrosí'}
          </Button>
        </>
      }
    >
      <Stack spacing={2} sx={{ pt: 1 }}>
        {mode === 'liquidation' && (
          <Alert severity="warning">
            Al registrar el otrosí de liquidación, el contrato <strong>{contract?.number}</strong> pasa a <strong>en liquidación</strong>:
            ya no admite otrosí ni cambios en sus datos contractuales. Solo puede haber uno por contrato.
          </Alert>
        )}
        <Grid container spacing={2}>
          {isInitial ? (
            <Grid size={{ xs: 12, sm: 6 }}>
              <DateField value={concept?.startDate ?? ''} label="Fecha de inicio" readOnly helperText="La del contrato" />
            </Grid>
          ) : (
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Controller
                name="startDate"
                control={control}
                rules={{ required: 'La fecha de inicio es requerida.' }}
                render={({ field, fieldState }) => (
                  <DateField
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    label="Fecha de inicio"
                    required
                    error={fieldState.error?.message}
                    helperText={!isEdit && contract?.lastConceptDate ? `No antes del ${fDateOnly(contract.lastConceptDate)}` : ''}
                  />
                )}
              />
            </Grid>
          )}
          {hasExtension && (
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Controller
                name="extension"
                control={control}
                rules={{ pattern: { value: /^\d*$/, message: 'Solo números enteros.' } }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    label={`Prórroga (${unitName(contract?.termUnit)})`}
                    size="small"
                    fullWidth
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message ?? 'Vacío si no amplía el plazo. Extiende la fecha fin.'}
                    slotProps={{ htmlInput: { inputMode: 'numeric', style: { textAlign: 'right', fontVariantNumeric: 'tabular-nums' } } }}
                  />
                )}
              />
            </Grid>
          )}
          {!isInitial && (
            <Grid size={12}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    value={field.value ?? ''}
                    label="Objeto o descripción"
                    size="small"
                    fullWidth
                    multiline
                    minRows={2}
                    slotProps={{ htmlInput: { maxLength: 500 } }}
                  />
                )}
              />
            </Grid>
          )}
        </Grid>

        <ConceptFields control={control} />

        {mode === 'liquidation' && (
          <Controller
            name="confirmed"
            control={control}
            rules={{ validate: (value) => value === true || 'Confirma que el contrato pasará a liquidación.' }}
            render={({ field, fieldState }) => (
              <>
                <FormControlLabel
                  control={<Checkbox checked={Boolean(field.value)} onChange={(e) => field.onChange(e.target.checked)} />}
                  label="Entiendo que el contrato pasará a liquidación y no admitirá más otrosí."
                />
                {fieldState.error && <FormHelperText error>{fieldState.error.message}</FormHelperText>}
              </>
            )}
          />
        )}
      </Stack>
    </BaseDialog>
  );
}

ConceptDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  /** amendment | liquidation | edit */
  mode: PropTypes.oneOf(['amendment', 'liquidation', 'edit']),
  /** Contrato del detalle: `{ ctrId, number, termUnit, lastConceptDate }`. */
  contract: PropTypes.object,
  /** Concepto a modificar (fila de `concepts` del detalle). */
  concept: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired
};
