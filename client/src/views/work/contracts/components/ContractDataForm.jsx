import PropTypes from 'prop-types';
import { Controller, useWatch } from 'react-hook-form';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import DateField from 'ui-component/extended/DateField';
import FormSection from 'ui-component/extended/FormSection';
import GenericFormSection from 'ui-component/extended/GenericFormSection';
import SearchSelect from 'ui-component/extended/SearchSelect';
import SelectSocket from 'ui-component/extended/SelectSocket';
import { toFormFields } from './configurableFields';
import { TERM_UNIT_OPTIONS, providerInvoiceViewName } from 'utils/constants';

/**
 * Pestaña "Datos del contrato" del expediente (DEC-057): obra, proveedor, su
 * tipo y la etapa, y los datos contractuales. El estado vive en
 * useContractForm; aquí solo se dibuja, dentro del FormProvider del
 * expediente. El valor y las pólizas de un contrato
 * guardado no se editan aquí: tienen sus actos en sus pestañas.
 */
export default function ContractDataForm({ form, contract, isNew, blocked }) {
  const {
    methods,
    endPreview,
    headerWork,
    workOptions,
    options,
    loadingOptions,
    providerTypes,
    fetchContractTypes,
    changeWork,
    recalcTerm,
    recalcEndDate,
    contractFields,
    canChangeAiu,
    aiuDefault,
    showAiu
  } = form;
  const { control, getValues } = methods;
  const [wrkId, prvId, pvtId, startDate] = useWatch({ control, name: ['wrkId', 'prvId', 'pvtId', 'startDate'] });

  const ctrId = contract?.ctrId ?? 0;
  const noOptions = wrkId && !loadingOptions;
  const chosenType = providerTypes.find((t) => t.value === Number(pvtId));
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
  const inherited = contractFields.filter((field) => field.inherited);
  // La obra del encabezado está inactiva: no admite contratos nuevos.
  const inactiveWork = isNew && headerWork != null && headerWork.active === false;

  return (
    <Stack spacing={2}>
      {blocked && (
        <Alert severity="warning">
          El contrato está {contract.stateName.toLowerCase()}: sus datos contractuales solo se modifican mientras está en ejecución.
        </Alert>
      )}
      {inactiveWork && (
        <Alert severity="warning">
          La obra {headerWork.label} está inactiva: no admite contratos nuevos. Elige otra obra en el selector del encabezado.
        </Alert>
      )}
      {(!prvId || !pvtId) && (
        <Alert severity="info">
          Elige el proveedor y su tipo en esta obra: la etapa, las observaciones y los porcentajes del valor dependen de la configuración de
          ese tipo, y el tipo decide el menú de sus facturas.
        </Alert>
      )}
      {inherited.length > 0 && (
        <Alert severity="warning">
          {inherited.map((field) => field.label).join(', ')}: ya no aplica para el tipo de proveedor. Se muestra en solo lectura con el
          valor que se capturó con una configuración anterior, y se conserva al guardar.
        </Alert>
      )}

      <FormSection
        title="Obra, proveedor y etapa"
        subtitle="El proveedor, su tipo y la etapa se eligen entre los de la obra. La obra no cambia después de crear el contrato."
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            {!isNew || headerWork ? (
              <TextField
                label="Obra"
                value={isNew ? headerWork.label : `${contract.workCode} — ${contract.workName}`}
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
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Controller
              name="pvtId"
              control={control}
              rules={{ required: 'Selecciona el tipo de proveedor.' }}
              render={({ field, fieldState }) => (
                <SearchSelect
                  value={field.value}
                  onChange={field.onChange}
                  options={providerTypes}
                  loading={loadingOptions}
                  disabled={!prvId}
                  label="Tipo de proveedor"
                  required
                  error={fieldState.error?.message}
                  helperText={
                    !prvId
                      ? 'Elige primero el proveedor'
                      : providerTypes.length === 0
                        ? 'En esta obra no trabaja como contrato mayor ni subcontratista: edita su asignación'
                        : `Facturas: ${providerInvoiceViewName(chosenType?.invoiceView)}`
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
      </FormSection>

      <FormSection title="Datos del contrato">
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
                  onChange={(value) => {
                    field.onChange(value);
                    recalcEndDate({ startDate: value });
                  }}
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
                    onBlur={() => {
                      field.onBlur();
                      recalcEndDate();
                    }}
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
              <Box sx={{ width: 150, flexShrink: 0, '& .MuiOutlinedInput-root': { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } }}>
                <Controller
                  name="termUnit"
                  control={control}
                  render={({ field }) => (
                    <SearchSelect
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value || 'MES');
                        recalcEndDate({ termUnit: value || 'MES' });
                      }}
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
              value={endPreview.endDate}
              onChange={(value) => {
                const [start, termUnit] = getValues(['startDate', 'termUnit']);
                recalcTerm({ ctrId, startDate: start, termUnit, endDate: value });
              }}
              label="Fecha fin"
              minDate={startDate}
              error={endPreview.error}
              helperText={endPreview.loading ? 'Calculando…' : undefined}
            />
          </Grid>
          {otherContractFields.length > 0 && (
            <Grid size={12} sx={{ mt: -2 }}>
              <GenericFormSection fields={otherContractFields} />
            </Grid>
          )}
          {showAiu && (
            <Grid size={12}>
              <Controller
                name="aiuRequested"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Boolean(field.value)}
                        onChange={(e) => field.onChange(e.target.checked)}
                        disabled={blocked || (!canChangeAiu && Boolean(field.value) === aiuDefault)}
                      />
                    }
                    label="Solicita AIU (administración, imprevistos y utilidad)"
                  />
                )}
              />
              <FormHelperText sx={{ mt: -0.5 }}>
                {canChangeAiu
                  ? 'Sin AIU, los conceptos del contrato no llevan administración, imprevistos ni utilidad. Cambiarlo queda en la bitácora.'
                  : 'Cambiar la solicitud de AIU exige el permiso de cambiar la solicitud de AIU del contrato.'}
              </FormHelperText>
            </Grid>
          )}
        </Grid>
      </FormSection>

      {!isNew && <Alert severity="info">El valor inicial y los otrosí se registran y modifican en la pestaña «Valor».</Alert>}
    </Stack>
  );
}

ContractDataForm.propTypes = {
  /** Estado del formulario (useContractForm). */
  form: PropTypes.object.isRequired,
  /** Contrato guardado (get_contract); null al crear. */
  contract: PropTypes.object,
  isNew: PropTypes.bool.isRequired,
  /** El estado del contrato no admite editar sus datos. */
  blocked: PropTypes.bool
};
