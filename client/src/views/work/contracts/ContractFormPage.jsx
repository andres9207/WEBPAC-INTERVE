import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import SubCard from 'ui-component/cards/SubCard';
import ConfirmDialog from 'ui-component/extended/ConfirmDialog';
import DateField from 'ui-component/extended/DateField';
import GenericFormSection from 'ui-component/extended/GenericFormSection';
import RouteDialog from 'ui-component/extended/RouteDialog';
import SearchSelect from 'ui-component/extended/SearchSelect';
import SelectSocket from 'ui-component/extended/SelectSocket';
import ConceptFields, { EMPTY_CONCEPT } from './components/ConceptFields';
import { shownFields, toFormFields, visiblePayload } from './components/configurableFields';
import { contractsApi, getContractFieldsAPI, getContractFormOptionsAPI, getContractWorksSelectAPI } from 'api/requests/contractsApi';
import { getContractTypesSelectAPI } from 'api/requests/contractTypesApi';
import { showError, showSuccess } from 'services/ToastService';
import { newIdempotencyKey } from 'utils/idempotency';
import { TERM_UNIT_OPTIONS } from 'utils/constants';

/**
 * Alta y edición de un contrato (ADR-0015, DEC-035), en un modal sobre el
 * listado con dirección propia `/work/contracts/new` y `/:ctrId/edit`
 * (DEC-034).
 *
 * - Crear envía el contrato con su valor inicial en una sola petición: el
 *   servidor los guarda juntos con el historial. Lleva clave de idempotencia.
 * - Etapa y proveedor se filtran por la obra elegida (y el servidor lo exige).
 *   La obra no cambia después de crear el contrato.
 * - La fecha fin es solo lectura: la calcula el servidor (inicio + plazo +
 *   prórrogas + días suspendidos). Si cambian la fecha o el plazo, dice "Se
 *   calcula al guardar" (FRONTEND_STANDARD, regla 9).
 * - Editar solo cambia la cabecera; el valor inicial y los otrosí se
 *   modifican en la pestaña "Valor" del detalle, con su permiso.
 * - Campos configurables (ADR-0006, DEC-037): etapa, observaciones y los
 *   porcentajes del valor inicial dependen del tipo de contrato. Sus
 *   descriptores los entrega el servidor al elegir el tipo y los dibuja
 *   GenericFormSection. Al editar, un valor guardado en un campo que dejó de
 *   aplicar se muestra en solo lectura, marcado como heredado. Se envían
 *   solo los campos visibles: el resto lo resuelve el servidor.
 */

const EMPTY_FORM = {
  wrkId: '',
  wksId: '',
  prvId: '',
  cttId: '',
  number: '',
  name: '',
  startDate: '',
  term: '',
  termUnit: 'MES',
  observation: '',
  initialConcept: EMPTY_CONCEPT
};

const text = (value) => String(value ?? '').trim();

const toForm = (contract) => ({
  ...EMPTY_FORM,
  ...Object.fromEntries(Object.keys(EMPTY_FORM).map((field) => [field, contract[field] ?? EMPTY_FORM[field]])),
  term: String(contract.term ?? ''),
  observation: contract.observation ?? ''
});

const NO_DESCRIPTION = { skip: ['CONCEPT_DESCRIPTION'] };

const toPayload = (ctrId, form, descriptors) => {
  const configured = visiblePayload(descriptors, 'CONTRACT', form);
  if ('observation' in configured) configured.observation = text(configured.observation);
  return {
    ctrId,
    ...(ctrId ? {} : { wrkId: form.wrkId }),
    prvId: form.prvId,
    cttId: form.cttId,
    number: text(form.number),
    name: text(form.name),
    startDate: form.startDate,
    term: text(form.term),
    termUnit: form.termUnit,
    ...configured,
    ...(ctrId
      ? {}
      : {
          initialConcept: {
            directCost: form.initialConcept.directCost,
            ...visiblePayload(descriptors, 'CONCEPT', form.initialConcept, NO_DESCRIPTION)
          }
        })
  };
};

function Section({ title, subtitle, children }) {
  return (
    <SubCard
      title={
        <Box>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      }
    >
      {children}
    </SubCard>
  );
}

Section.propTypes = { title: PropTypes.string.isRequired, subtitle: PropTypes.string, children: PropTypes.node };

export default function ContractFormPage() {
  const { ctrId: ctrIdParam } = useParams();
  const ctrId = Number(ctrIdParam) || 0;
  const isEdit = ctrId > 0;
  const navigate = useNavigate();
  const { refresh } = useOutletContext() ?? {};

  const [idempotencyKey] = useState(() => (isEdit ? null : newIdempotencyKey()));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(null);
  const [workOptions, setWorkOptions] = useState([]);
  const [options, setOptions] = useState({ stages: [], providers: [] });
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [confirmLeave, setConfirmLeave] = useState(false);
  // Descriptores de los campos configurables del tipo elegido (`cttId` dice de qué tipo son).
  const [fieldConfig, setFieldConfig] = useState({ cttId: null, fields: [] });
  const [loadingFields, setLoadingFields] = useState(false);

  const methods = useForm({ defaultValues: EMPTY_FORM });
  const { control, handleSubmit, reset, setValue, formState } = methods;
  const { errors, isDirty } = formState;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [contract, works] = await Promise.all([
          isEdit ? contractsApi.getById({ ctrId }).then((res) => res.data) : Promise.resolve(null),
          isEdit ? Promise.resolve([]) : getContractWorksSelectAPI().then((res) => res.data)
        ]);
        setLoaded(contract);
        setWorkOptions(works);
        reset(contract ? toForm(contract) : EMPTY_FORM);
      } catch (err) {
        showError(err.response?.data?.message || 'Error al cargar el contrato');
        navigate('/work/contracts', { replace: true });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [isEdit, ctrId, reset, navigate]);

  const [wrkId, startDate, term, termUnit, cttId] = useWatch({ control, name: ['wrkId', 'startDate', 'term', 'termUnit', 'cttId'] });

  // Configuración del tipo elegido, la vigente (ADR-0006, decisión 5).
  useEffect(() => {
    if (!cttId) {
      setFieldConfig({ cttId: null, fields: [] });
      return;
    }
    let cancelled = false;
    setLoadingFields(true);
    getContractFieldsAPI({ cttId })
      .then(({ data }) => !cancelled && setFieldConfig({ cttId: data.cttId, fields: data.fields }))
      .catch((err) => showError(err.response?.data?.message || 'Error al cargar los campos del tipo de contrato'))
      .finally(() => !cancelled && setLoadingFields(false));
    return () => {
      cancelled = true;
    };
  }, [cttId]);

  // Etapas y proveedores de la obra elegida; al editar, también los actuales aunque estén inactivos.
  useEffect(() => {
    if (!wrkId) {
      setOptions({ stages: [], providers: [] });
      return;
    }
    let cancelled = false;
    setLoadingOptions(true);
    getContractFormOptionsAPI({ wrkId, ...(loaded ? { includeWksId: loaded.wksId, includePrvId: loaded.prvId } : {}) })
      .then(({ data }) => !cancelled && setOptions(data))
      .catch((err) => showError(err.response?.data?.message || 'Error al cargar las etapas y proveedores de la obra'))
      .finally(() => !cancelled && setLoadingOptions(false));
    return () => {
      cancelled = true;
    };
  }, [wrkId, loaded]);

  const fetchContractTypes = useCallback(() => getContractTypesSelectAPI(loaded?.cttId), [loaded?.cttId]);

  const changeWork = (value) => {
    setValue('wrkId', value ?? '', { shouldDirty: true });
    setValue('wksId', '', { shouldDirty: true });
    setValue('prvId', '', { shouldDirty: true });
  };

  // Fecha fin: la del servidor mientras no cambien sus insumos.
  const termChanged = !loaded || startDate !== loaded.startDate || String(term) !== String(loaded.term) || termUnit !== loaded.termUnit;
  const endDate = termChanged ? '' : loaded.endDate;
  const blocked = isEdit && loaded && !loaded.allowedActions.includes('editContract');

  // Cancelar o cerrar vuelve al listado, también al editar (DEC-034).
  const leave = () => navigate('/work/contracts');
  const requestLeave = () => (isDirty ? setConfirmLeave(true) : leave());

  const onSubmit = async (form) => {
    setSaving(true);
    try {
      const { data } = await contractsApi.save(toPayload(ctrId, form, fieldConfig.fields), isEdit ? undefined : idempotencyKey);
      showSuccess(data.message || 'Guardado correctamente.');
      refresh?.();
      navigate(`/work/contracts/${data.ctrId ?? ctrId}`);
    } catch (err) {
      showError(err.response?.data?.message || 'Error al guardar el contrato');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <RouteDialog onClose={leave} loading />;

  const hasErrors = Object.keys(errors).length > 0;
  const noOptions = wrkId && !loadingOptions;

  const fieldsReady = Boolean(cttId) && Number(fieldConfig.cttId) === Number(cttId) && !loadingFields;
  const descriptors = fieldsReady ? fieldConfig.fields : [];
  const stored = loaded ? { wksId: loaded.wksId, observation: loaded.observation } : null;
  const contractFields = shownFields(descriptors, 'CONTRACT', stored);
  const stageFields = toFormFields(
    contractFields.filter((field) => field.key === 'STAGE'),
    {
      disabled: !wrkId,
      selectProps: {
        options: options.stages,
        loading: loadingOptions,
        helperText: !wrkId ? 'Elige primero la obra' : noOptions && options.stages.length === 0 ? 'La obra no tiene etapas activas' : ''
      }
    }
  );
  const otherContractFields = toFormFields(contractFields.filter((field) => field.key !== 'STAGE'));
  const conceptFields = shownFields(descriptors, 'CONCEPT', null, NO_DESCRIPTION);
  const inherited = contractFields.filter((field) => field.inherited);

  return (
    <RouteDialog
      onClose={requestLeave}
      closeLabel="Cerrar sin guardar"
      labelledBy="contract-form-title"
      onSubmit={handleSubmit(onSubmit)}
      header={
        <>
          <Typography id="contract-form-title" variant="h3" component="h2">
            {isEdit ? `Editar contrato ${loaded?.number ?? ''}` : 'Nuevo contrato'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {isEdit ? loaded?.name : 'Datos del contrato y su valor inicial. Los campos con * son obligatorios.'}
          </Typography>
        </>
      }
      footer={
        <>
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={requestLeave} disabled={saving}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="secondary" disabled={saving || blocked || !fieldsReady}>
            {saving ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Guardar'}
          </Button>
        </>
      }
    >
      <FormProvider {...methods}>
        <Stack spacing={2}>
          {blocked && (
            <Alert severity="warning">
              El contrato está {loaded.stateName.toLowerCase()}: sus datos contractuales solo se modifican mientras está en ejecución.
            </Alert>
          )}
          {hasErrors && (
            <Alert severity="error" role="alert">
              Revisa los campos marcados antes de guardar.
            </Alert>
          )}
          {!cttId && (
            <Alert severity="info">
              Elige el tipo de contrato: la etapa, las observaciones y los porcentajes del valor dependen de su configuración.
            </Alert>
          )}
          {inherited.length > 0 && (
            <Alert severity="warning">
              {inherited.map((field) => field.label).join(', ')}: ya no aplica para este tipo de contrato. Se muestra en solo lectura con el
              valor que se capturó con una configuración anterior, y se conserva al guardar.
            </Alert>
          )}

          <Section
            title="Obra, etapa y proveedor"
            subtitle="La etapa y el proveedor se eligen entre los de la obra. La obra no cambia después de crear el contrato."
          >
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                {isEdit ? (
                  <TextField
                    label="Obra"
                    value={`${loaded.workCode} — ${loaded.workName}`}
                    size="small"
                    fullWidth
                    slotProps={{ input: { readOnly: true } }}
                  />
                ) : (
                  <Controller
                    name="wrkId"
                    control={control}
                    rules={{ required: 'Selecciona la obra.' }}
                    render={({ field, fieldState }) => (
                      <SearchSelect
                        value={field.value}
                        onChange={changeWork}
                        options={workOptions}
                        label="Obra"
                        required
                        error={fieldState.error?.message}
                        helperText="Solo obras activas"
                      />
                    )}
                  />
                )}
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Controller
                  name="prvId"
                  control={control}
                  rules={{ required: 'Selecciona el proveedor.' }}
                  render={({ field, fieldState }) => (
                    <SearchSelect
                      value={field.value}
                      onChange={field.onChange}
                      options={options.providers}
                      loading={loadingOptions}
                      disabled={!wrkId}
                      label="Proveedor"
                      required
                      error={fieldState.error?.message}
                      helperText={
                        !wrkId
                          ? 'Elige primero la obra'
                          : noOptions && options.providers.length === 0
                            ? 'Asigna antes un proveedor a la obra'
                            : ''
                      }
                    />
                  )}
                />
              </Grid>
              {stageFields.length > 0 && (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ mt: -2 }}>
                  <GenericFormSection fields={stageFields} />
                </Grid>
              )}
            </Grid>
          </Section>

          <Section title="Datos del contrato">
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                <Controller
                  name="number"
                  control={control}
                  rules={{ required: 'El número es requerido.' }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="Número"
                      required
                      size="small"
                      fullWidth
                      error={Boolean(fieldState.error)}
                      helperText={fieldState.error?.message ?? 'Único dentro de la obra'}
                      slotProps={{ htmlInput: { maxLength: 50, autoComplete: 'off' } }}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 8, md: 5 }}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: 'El nombre es requerido.' }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="Nombre u objeto"
                      required
                      size="small"
                      fullWidth
                      error={Boolean(fieldState.error)}
                      helperText={fieldState.error?.message}
                      slotProps={{ htmlInput: { maxLength: 200, autoComplete: 'off' } }}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Controller
                  name="cttId"
                  control={control}
                  rules={{ required: 'Selecciona el tipo de contrato.' }}
                  render={({ field, fieldState }) => (
                    <SelectSocket
                      value={field.value}
                      onChange={field.onChange}
                      label="Tipo de contrato"
                      required
                      error={fieldState.error}
                      fetchApi={fetchContractTypes}
                      socketEvent="refresh-contract-types"
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Controller
                  name="startDate"
                  control={control}
                  rules={{ required: 'La fecha de inicio es requerida.' }}
                  render={({ field, fieldState }) => (
                    <DateField
                      value={field.value}
                      onChange={field.onChange}
                      label="Fecha de inicio"
                      required
                      error={fieldState.error?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Stack direction="row">
                  <Controller
                    name="term"
                    control={control}
                    rules={{
                      required: 'El plazo es requerido.',
                      pattern: { value: /^\d+$/, message: 'Solo números enteros.' },
                      validate: (value) => Number(value) > 0 || 'Debe ser mayor que 0.'
                    }}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        onChange={(e) => field.onChange(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        label="Plazo"
                        required
                        size="small"
                        fullWidth
                        error={Boolean(fieldState.error)}
                        helperText={fieldState.error?.message}
                        sx={{ '& .MuiOutlinedInput-root': { borderTopRightRadius: 0, borderBottomRightRadius: 0 } }}
                        slotProps={{
                          htmlInput: {
                            inputMode: 'numeric',
                            autoComplete: 'off',
                            style: { textAlign: 'right', fontVariantNumeric: 'tabular-nums' }
                          }
                        }}
                      />
                    )}
                  />
                  <Box
                    sx={{ width: 150, flexShrink: 0, '& .MuiOutlinedInput-root': { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } }}
                  >
                    <Controller
                      name="termUnit"
                      control={control}
                      render={({ field }) => (
                        <SearchSelect
                          value={field.value}
                          onChange={(value) => field.onChange(value || 'MES')}
                          options={TERM_UNIT_OPTIONS}
                          label="Unidad del plazo"
                          hideLabel
                          disableClearable
                        />
                      )}
                    />
                  </Box>
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <DateField
                  value={endDate}
                  label="Fecha fin"
                  readOnly
                  helperText={
                    termChanged
                      ? 'Se calcula al guardar: inicio + plazo + prórrogas + días suspendidos'
                      : 'Calculada por el sistema: inicio + plazo + prórrogas + días suspendidos'
                  }
                />
              </Grid>
              {otherContractFields.length > 0 && (
                <Grid size={12} sx={{ mt: -2 }}>
                  <GenericFormSection fields={otherContractFields} />
                </Grid>
              )}
            </Grid>
          </Section>

          {isEdit ? (
            <Alert severity="info">El valor inicial y los otrosí se modifican en la pestaña «Valor» del contrato.</Alert>
          ) : (
            <Section title="Valor inicial" subtitle="Todo contrato nace con su valor inicial. Su fecha es la de inicio del contrato.">
              {fieldsReady ? (
                <ConceptFields control={control} prefix="initialConcept." fields={conceptFields} />
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {cttId ? 'Cargando los campos del tipo de contrato…' : 'Elige el tipo de contrato para capturar el valor inicial.'}
                </Typography>
              )}
            </Section>
          )}
        </Stack>
      </FormProvider>

      <ConfirmDialog
        open={confirmLeave}
        onClose={() => setConfirmLeave(false)}
        onConfirm={leave}
        title="Descartar cambios"
        message="Hay cambios sin guardar en el contrato. ¿Salir sin guardarlos?"
        confirmLabel="Descartar"
        confirmColor="warning"
      />
    </RouteDialog>
  );
}
