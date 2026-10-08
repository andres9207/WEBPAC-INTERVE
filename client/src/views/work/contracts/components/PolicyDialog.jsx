import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm, useWatch } from 'react-hook-form';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import BaseDialog from 'ui-component/extended/BaseDialog';
import DateField from 'ui-component/extended/DateField';
import PercentField from 'ui-component/extended/PercentField';
import { contractPoliciesApi } from 'api/requests/contractsApi';
import { getInsurersSelectAPI } from 'api/requests/insurersApi';
import { getPolicyTypesSelectAPI } from 'api/requests/policyTypesApi';
import { showError, showSuccess } from 'services/ToastService';
import { newIdempotencyKey } from 'utils/idempotency';
import { fMoneyText } from 'utils/formatNumber';

/**
 * Registrar una póliza o modificarla (ADR-0018, DEC-050). Modificar no edita:
 * emite la versión siguiente y cierra la vigente; el concepto amparado no
 * cambia. La base de cálculo la toma el servidor del tipo y el valor
 * asegurado lo calcula él: aquí solo se muestra qué base aplica el tipo
 * elegido. Las dos operaciones crean una fila: llevan clave de idempotencia.
 *
 * Borrador (`onDraft`): al crear el contrato (PRO-BE-09) la póliza no se
 * guarda aquí. El diálogo devuelve los valores al formulario del contrato,
 * que las envía con él; ampara el valor inicial, así que no pide concepto.
 * `draft` es la fila que se edita y `takenTypes`, los tipos que ya usan las
 * demás: un concepto admite una póliza vigente por tipo.
 */

const EMPTY = { ccpId: '', pltId: '', insId: '', number: '', percentage: '', startDate: '', endDate: '', observation: '' };

const fromPolicy = (policy) => ({
  ccpId: policy.ccpId,
  pltId: policy.pltId,
  insId: policy.insId,
  number: policy.number,
  percentage: policy.percentage,
  startDate: policy.startDate ?? '',
  endDate: policy.endDate ?? '',
  observation: policy.observation ?? ''
});

export default function PolicyDialog({ open, contract, concepts = [], policy, draft, takenTypes = [], onClose, onSaved, onDraft }) {
  const isVersion = Boolean(policy);
  const isDraft = Boolean(onDraft);
  const [saving, setSaving] = useState(false);
  const [types, setTypes] = useState(null);
  const [insurers, setInsurers] = useState(null);
  const [idempotencyKey, setIdempotencyKey] = useState(null);
  const { control, handleSubmit, reset } = useForm({ defaultValues: EMPTY });
  const pltId = useWatch({ control, name: 'pltId' });

  useEffect(() => {
    if (!open) return;
    setIdempotencyKey(newIdempotencyKey());
    reset(policy || draft ? { ...EMPTY, ...fromPolicy(policy ?? draft) } : EMPTY);
    setTypes(null);
    setInsurers(null);
    // La versión vigente conserva su tipo y su aseguradora aunque se hayan desactivado.
    Promise.all([getPolicyTypesSelectAPI(policy?.pltId), getInsurersSelectAPI(policy?.insId)])
      .then(([typesRes, insurersRes]) => {
        setTypes(typesRes.data);
        setInsurers(insurersRes.data);
      })
      .catch((err) => {
        showError(err.response?.data?.message || 'Error al cargar los tipos de póliza y las aseguradoras');
        onClose();
      });
  }, [open, policy, draft, reset, onClose]);

  const selectedType = useMemo(() => (types ?? []).find((t) => String(t.value) === String(pltId)), [types, pltId]);

  const save = async (form) => {
    const params = {
      pltId: form.pltId,
      insId: form.insId,
      number: form.number.trim(),
      percentage: form.percentage,
      startDate: form.startDate || null,
      endDate: form.endDate || null,
      observation: form.observation.trim() || null
    };
    if (isDraft) {
      const label = (options, value) => (options ?? []).find((o) => String(o.value) === String(value))?.label ?? '';
      onDraft({ ...params, typeName: label(types, form.pltId), insurerName: label(insurers, form.insId) });
      return;
    }
    setSaving(true);
    try {
      const { data } = isVersion
        ? await contractPoliciesApi.createVersion({ polId: policy.polId, ...params }, idempotencyKey)
        : await contractPoliciesApi.create({ ctrId: contract.ctrId, ccpId: form.ccpId, ...params }, idempotencyKey);
      showSuccess(data.message);
      onSaved();
    } catch (err) {
      showError(err.response?.data?.message || 'No se pudo guardar la póliza');
    } finally {
      setSaving(false);
    }
  };

  const noTypes = Array.isArray(types) && types.length === 0;
  const noInsurers = Array.isArray(insurers) && insurers.length === 0;
  const select = (name, label, options, rules, extra = {}) => (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          select
          label={label}
          required
          size="small"
          fullWidth
          disabled={!options || extra.disabled}
          error={Boolean(fieldState.error)}
          helperText={fieldState.error?.message ?? extra.helperText}
        >
          {(options ?? []).map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title={
        isDraft
          ? draft
            ? 'Editar póliza'
            : 'Agregar póliza'
          : isVersion
            ? `Modificar póliza ${policy?.number ?? ''}`
            : `Registrar póliza · contrato ${contract?.number ?? ''}`
      }
      maxWidth="sm"
      fullScreenOnMobile
      actions={
        <>
          <Button onClick={onClose} disabled={saving}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSubmit(save)} disabled={saving || !types || !insurers || noTypes || noInsurers}>
            {saving ? 'Guardando…' : isDraft ? (draft ? 'Guardar' : 'Agregar') : isVersion ? 'Emitir versión' : 'Registrar'}
          </Button>
        </>
      }
    >
      <Grid container spacing={2} sx={{ pt: 1 }}>
        {isVersion && (
          <Grid size={12}>
            <Alert severity="info">
              Se emite la versión {policy.version + 1}. La versión {policy.version} queda cerrada y se conserva en el historial.
            </Alert>
          </Grid>
        )}
        {(noTypes || noInsurers) && (
          <Grid size={12}>
            <Alert severity="warning">
              {noTypes ? 'No hay tipos de póliza activos: créalos en Administración → Tipos de póliza. ' : ''}
              {noInsurers ? 'No hay aseguradoras activas: créalas en Administración → Aseguradoras.' : ''}
            </Alert>
          </Grid>
        )}
        {isDraft ? (
          <Grid size={12}>
            <Alert severity="info">Ampara el valor inicial. Se registra al guardar el contrato.</Alert>
          </Grid>
        ) : (
          <Grid size={12}>
            {select(
              'ccpId',
              'Concepto amparado',
              concepts.map((c) => ({ value: c.ccpId, label: `${c.label} · ${fMoneyText(c.value)}` })),
              { required: 'Selecciona el concepto amparado.' },
              { disabled: isVersion, helperText: isVersion ? 'El concepto amparado no cambia entre versiones.' : undefined }
            )}
          </Grid>
        )}
        <Grid size={{ xs: 12, sm: 6 }}>
          {select(
            'pltId',
            'Tipo de póliza',
            types,
            {
              required: 'Selecciona el tipo de póliza.',
              validate: (value) =>
                !takenTypes.some((t) => String(t) === String(value)) || 'Ya hay una póliza de este tipo para el valor inicial.'
            },
            {
              helperText: selectedType ? `Base de cálculo: ${selectedType.baseName}` : undefined
            }
          )}
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>{select('insId', 'Aseguradora', insurers, { required: 'Selecciona la aseguradora.' })}</Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="number"
            control={control}
            rules={{
              validate: (value) => value.trim() !== '' || 'El número de la póliza es requerido.',
              maxLength: { value: 50, message: 'Máximo 50 caracteres.' }
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Número de la póliza"
                required
                size="small"
                fullWidth
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="percentage"
            control={control}
            rules={{
              validate: (value) => {
                const number = Number(value);
                return (value !== '' && number > 0 && number <= 100) || 'El porcentaje debe ser mayor que 0 y hasta 100.';
              }
            }}
            render={({ field, fieldState }) => (
              <PercentField
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                label="Porcentaje sobre la base"
                required
                error={fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => <DateField value={field.value} onChange={field.onChange} label="Inicio de vigencia" />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="endDate"
            control={control}
            rules={{
              validate: (value, form) =>
                !value || !form.startDate || value >= form.startDate || 'No puede ser anterior al inicio de vigencia.'
            }}
            render={({ field, fieldState }) => (
              <DateField
                value={field.value}
                onChange={field.onChange}
                label="Fin de vigencia"
                error={fieldState.error?.message}
                helperText="Sin fecha fin, la póliza figura como «sin fecha de vigencia»."
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

PolicyDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  /** `{ ctrId, number }` del contrato. */
  contract: PropTypes.object,
  /** Conceptos del contrato (`{ ccpId, label, value }`), del listado de pólizas. En borrador no se usan. */
  concepts: PropTypes.array,
  /** Versión vigente al modificar; sin ella, registra una póliza nueva. */
  policy: PropTypes.object,
  /** Borrador: la fila que se edita, con los campos del formulario. */
  draft: PropTypes.object,
  /** Borrador: tipos (`pltId`) que ya usan las demás pólizas del envío. */
  takenTypes: PropTypes.array,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func,
  /** Modo borrador: recibe los valores en vez de guardarlos. */
  onDraft: PropTypes.func
};
