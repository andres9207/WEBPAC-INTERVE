import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form';
import { format } from 'date-fns';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import BaseDialog from 'ui-component/extended/BaseDialog';
import FormSection from 'ui-component/extended/FormSection';
import DateField from 'ui-component/extended/DateField';
import GenericFormSection from 'ui-component/extended/GenericFormSection';
import ConceptFields, { EMPTY_CONCEPT, conceptToForm } from './ConceptFields';
import PoliciesDraftEditor from './PoliciesDraftEditor';
import { FIELD_INPUTS, shownFields, toFormFields, visiblePayload } from './configurableFields';
import { contractConceptsApi, getContractFieldsAPI } from 'api/requests/contractsApi';
import { useAuth } from 'contexts/AuthContext';
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
 *
 * Sobre un contrato suspendido, el otrosí lo reanuda (DEC-039): se pide la
 * fecha de reanudación, y el servidor cierra la suspensión, suma los días
 * suspendidos y recalcula la fecha fin.
 *
 * Descripción y porcentajes son campos configurables de los tipos del
 * proveedor del contrato (DEC-053): se piden al abrir y se dibujan con
 * GenericFormSection. Al modificar un concepto, un valor en un campo que dejó
 * de aplicar se muestra en solo lectura, marcado como heredado.
 *
 * El otrosí puede llevar sus pólizas (opcionales, una por tipo), que el
 * servidor registra en su misma transacción (ADR-0027, catálogo de
 * operaciones críticas), con el permiso de registrar pólizas; sin él, la
 * sección no aparece y se registran después desde la pestaña Pólizas.
 *
 * Si el contrato ya tiene facturas aprobadas (`economicsLocked`), al
 * modificar el valor inicial el costo y los porcentajes van en solo lectura
 * (DOM-07): se corrigen con un otrosí. Los de un otrosí sí cambian, con una
 * observación obligatoria, y el servidor rechaza el cambio si deja lo ya
 * facturado por encima de lo pactado (DEC-078).
 */

const TITLES = { amendment: 'Registrar otrosí', liquidation: 'Registrar otrosí de liquidación', edit: 'Modificar concepto' };
const today = () => format(new Date(), 'yyyy-MM-dd');
const text = (value) => String(value ?? '').trim();
// "800", "800.0" y "800.00" son el mismo valor: compara sin ceros decimales al final.
const sameNumber = (a, b) => {
  const norm = (value) =>
    text(value)
      .replace(/(\.\d*?)0+$/, '$1')
      .replace(/\.$/, '');
  return norm(a) === norm(b);
};
const ECONOMIC_INPUTS = Object.keys(EMPTY_CONCEPT);

const unitName = (unit) => TERM_UNIT_OPTIONS.find((o) => o.value === unit)?.label.toLowerCase() ?? '';

export default function ConceptDialog({ open, mode, contract, concept, onClose, onSaved }) {
  const isEdit = mode === 'edit';
  const type = isEdit ? concept?.type : mode === 'liquidation' ? 'LIQUIDATION' : 'AMENDMENT';
  const isInitial = type === 'INITIAL';
  const hasExtension = type === 'AMENDMENT';
  // Suspensión abierta que este otrosí levanta.
  const suspension = mode === 'amendment' ? contract?.openSuspension : null;

  const [saving, setSaving] = useState(false);
  const [idempotencyKey, setIdempotencyKey] = useState(null);
  const [descriptors, setDescriptors] = useState(null);
  const [addingPolicy, setAddingPolicy] = useState(false);
  const { permissionsCatalog, hasPermission } = useAuth();
  const policyPermission = permissionsCatalog.work?.policies?.create;
  const canCreatePolicies = mode === 'amendment' && policyPermission != null && hasPermission(policyPermission);
  const methods = useForm();
  const { control, handleSubmit, reset } = methods;

  useEffect(() => {
    if (!open || !contract?.ctrId) return;
    let cancelled = false;
    setDescriptors(null);
    // Con el contrato: si no solicita AIU, A, I y U no aplican (DEC-046).
    getContractFieldsAPI({ ctrId: contract.ctrId })
      .then(({ data }) => !cancelled && setDescriptors(data.fields))
      .catch((err) => {
        showError(err.response?.data?.message || 'Error al cargar los campos del contrato');
        onClose();
      });
    return () => {
      cancelled = true;
    };
  }, [open, contract?.ctrId, onClose]);

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
            observation: '',
            confirmed: true
          }
        : { ...EMPTY_CONCEPT, startDate: today(), description: '', extension: '', liftDate: today(), confirmed: false, policies: [] }
    );
  }, [open, isEdit, concept, reset]);

  // Valores guardados del concepto que se modifica, para reconocer los heredados.
  const stored = isEdit ? Object.fromEntries(Object.values(FIELD_INPUTS).map((name) => [name, concept?.[name]])) : null;
  const skip = isInitial ? ['CONCEPT_DESCRIPTION'] : [];
  const fields = shownFields(descriptors, 'CONCEPT', stored, { skip });
  const descriptionFields = toFormFields(fields.filter((field) => field.key === 'CONCEPT_DESCRIPTION'));
  const inherited = fields.filter((field) => field.inherited);
  // Con facturas aprobadas: el valor inicial, congelado; un otrosí, con observación (DEC-078).
  const invoiced = isEdit && Boolean(contract?.economicsLocked);
  const economicsLocked = invoiced && isInitial;
  const economicValues = useWatch({ control, name: ECONOMIC_INPUTS });
  const needsObservation =
    invoiced &&
    !isInitial &&
    ECONOMIC_INPUTS.some((name, i) => economicValues[i] !== undefined && !sameNumber(economicValues[i], concept?.[name]));

  const save = async (form) => {
    setSaving(true);
    const configured = visiblePayload(descriptors, 'CONCEPT', form, { skip });
    if ('description' in configured) configured.description = text(configured.description);
    const payload = {
      startDate: form.startDate,
      directCost: form.directCost,
      ...configured,
      ...(hasExtension ? { extension: text(form.extension) } : {}),
      ...(suspension ? { liftDate: form.liftDate } : {}),
      ...(needsObservation ? { observation: text(form.observation) } : {}),
      ...(canCreatePolicies &&
        form.policies?.length > 0 && {
          policies: form.policies.map(({ pltId, insId, number, percentage, startDate, endDate, observation }) => ({
            pltId,
            insId,
            number,
            percentage,
            startDate,
            endDate,
            observation
          }))
        })
    };
    try {
      const { data } = isEdit
        ? await contractConceptsApi.update({ ccpId: concept.ccpId, ...payload })
        : mode === 'liquidation'
          ? await contractConceptsApi.createLiquidation({ ctrId: contract.ctrId, ...payload }, idempotencyKey)
          : await contractConceptsApi.createAmendment({ ctrId: contract.ctrId, ...payload }, idempotencyKey);
      // El acto pudo completar las condiciones de liquidación del contrato (DEC-081).
      showSuccess(data.contractLiquidated ? `${data.message}. El contrato cumplió las condiciones y quedó liquidado.` : data.message);
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
          <Button variant="contained" color="secondary" onClick={handleSubmit(save)} disabled={saving || !descriptors}>
            {saving
              ? 'Guardando…'
              : isEdit
                ? 'Guardar cambios'
                : mode === 'liquidation'
                  ? 'Registrar y pasar a liquidación'
                  : suspension
                    ? 'Registrar y reanudar'
                    : 'Registrar otrosí'}
          </Button>
        </>
      }
    >
      <FormProvider {...methods}>
        <Stack spacing={2} sx={{ pt: 1 }}>
          {mode === 'liquidation' && (
            <Alert severity="info">
              Al registrar el otrosí de liquidación, el contrato <strong>{contract?.number}</strong> pasa a <strong>en liquidación</strong>:
              ya no admite otrosí ni cambios en sus datos contractuales. Solo puede haber uno por contrato.
            </Alert>
          )}
          {suspension && (
            <Alert severity="info">
              El contrato está <strong>suspendido</strong> desde el {fDateOnly(suspension.suspensionDate)} ({suspension.reasonName}). Al
              registrar este otrosí se <strong>reanuda</strong>: los días entre la suspensión y la fecha de reanudación alargan la fecha
              fin, además de la prórroga que indiques.
            </Alert>
          )}
          {economicsLocked && (
            <Alert severity="info">
              El contrato ya tiene facturas aprobadas: el costo directo y los porcentajes del valor inicial no cambian. Para corregir el
              valor, registra un otrosí o modifica uno. La fecha y la descripción sí se pueden modificar.
            </Alert>
          )}
          {invoiced && !isInitial && (
            <Alert severity="warning">
              El contrato ya tiene facturas aprobadas. Si cambias el costo directo o un porcentaje, escribe una observación: queda en la
              bitácora. No se guarda si lo ya facturado, el anticipo o el retenido quedan por encima de lo pactado.
            </Alert>
          )}
          {inherited.length > 0 && (
            <Alert severity="warning">
              {inherited.map((field) => field.label).join(', ')}: ya no aplica para el tipo de proveedor del contrato. Se muestra en solo
              lectura con el valor pactado con una configuración anterior, y se conserva al guardar.
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
            {suspension && (
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Controller
                  name="liftDate"
                  control={control}
                  rules={{
                    required: 'La fecha de reanudación es requerida.',
                    validate: (value) => {
                      if (value > today()) return 'No puede ser futura.';
                      if (value < suspension.suspensionDate) return `No antes de la suspensión (${fDateOnly(suspension.suspensionDate)}).`;
                      return true;
                    }
                  }}
                  render={({ field, fieldState }) => (
                    <DateField
                      value={field.value ?? ''}
                      onChange={field.onChange}
                      label="Fecha de reanudación"
                      required
                      error={fieldState.error?.message}
                      helperText="Ese día el contrato ya corre"
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
            {descriptionFields.length > 0 && (
              <Grid size={12} sx={{ mt: -2 }}>
                <GenericFormSection fields={descriptionFields} />
              </Grid>
            )}
          </Grid>

          {descriptors ? (
            <ConceptFields control={control} fields={fields} disabled={economicsLocked} />
          ) : (
            <Typography variant="body2" color="text.secondary">
              Cargando los campos del contrato…
            </Typography>
          )}

          {needsObservation && (
            <Controller
              name="observation"
              control={control}
              shouldUnregister
              rules={{
                validate: (value) => text(value) !== '' || 'La observación es requerida.',
                maxLength: { value: 1000, message: 'Máximo 1000 caracteres.' }
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  value={field.value ?? ''}
                  label="Observación"
                  required
                  multiline
                  minRows={2}
                  size="small"
                  fullWidth
                  error={Boolean(fieldState.error)}
                  helperText={
                    fieldState.error?.message ?? 'Por qué cambian los valores del otrosí con facturas aprobadas: queda en la bitácora.'
                  }
                />
              )}
            />
          )}

          {canCreatePolicies && (
            <FormSection
              title="Pólizas"
              subtitle="Opcionales. Amparan este otrosí, una por tipo, y se registran con él."
              onAdd={() => setAddingPolicy(true)}
              addLabel="Agregar póliza"
            >
              <Controller
                name="policies"
                control={control}
                render={({ field }) => (
                  <PoliciesDraftEditor
                    value={field.value}
                    onChange={field.onChange}
                    adding={addingPolicy}
                    onAddingChange={setAddingPolicy}
                  />
                )}
              />
            </FormSection>
          )}

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
      </FormProvider>
    </BaseDialog>
  );
}

ConceptDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  /** amendment | liquidation | edit */
  mode: PropTypes.oneOf(['amendment', 'liquidation', 'edit']),
  /** Contrato del detalle: `{ ctrId, cttId, number, termUnit, lastConceptDate, openSuspension, economicsLocked }`. */
  contract: PropTypes.object,
  /** Concepto a modificar (fila de `concepts` del detalle). */
  concept: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSaved: PropTypes.func.isRequired
};
