import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useOutletContext, useParams, useSearchParams } from 'react-router-dom';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { format } from 'date-fns';

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
import RouteDialog from 'ui-component/extended/RouteDialog';
import SearchSelect from 'ui-component/extended/SearchSelect';
import { getInvoiceContractsSelectAPI, getInvoiceFormOptionsAPI, getInvoiceWorksSelectAPI, invoicesApi } from 'api/requests/invoicesApi';
import { showError, showSuccess } from 'services/ToastService';
import { newIdempotencyKey } from 'utils/idempotency';
import { INVOICE_TYPE_OPTIONS } from 'utils/constants';

/**
 * Registro y edición de una factura (ADR-0020, DEC-042), en un modal sobre el
 * listado con dirección propia `/billing/invoices/new` y `/:invId/edit`
 * (DEC-034).
 *
 * - El tipo se elige primero y decide el resto: la simple pide obra,
 *   proveedor asignado a ella y etapa; las de contrato piden el contrato
 *   (solo los que hoy admiten ese tipo) y toman de él obra y proveedor.
 * - Tipo, obra y contrato no cambian después de registrar.
 * - Registrada se edita entera; aprobada, solo extracto y descripción;
 *   anulada, nada. Lo decide el servidor (`allowedActions`).
 * - Estado y fecha de aprobación no están en el formulario: los fijan
 *   Aprobar y Anular. Crear lleva clave de idempotencia.
 * - Desde la pestaña Facturas del contrato llega con `?type=…&ctrId=…`: el
 *   tipo y el contrato ya elegidos.
 */

const EMPTY_FORM = {
  type: '',
  ctrId: '',
  wrkId: '',
  prvId: '',
  wksId: '',
  number: '',
  date: '',
  voucherNumber: '',
  statement: '',
  description: ''
};

const text = (value) => String(value ?? '').trim();
const today = () => format(new Date(), 'yyyy-MM-dd');
const isSimple = (type) => type === 'SIMPLE';

const toForm = (invoice) => ({
  ...EMPTY_FORM,
  ...Object.fromEntries(Object.keys(EMPTY_FORM).map((field) => [field, invoice[field] ?? EMPTY_FORM[field]]))
});

const toPayload = (invId, form) => ({
  invId,
  ...(invId ? {} : { type: form.type, ...(isSimple(form.type) ? { wrkId: form.wrkId } : { ctrId: form.ctrId }) }),
  ...(isSimple(form.type) ? { prvId: form.prvId, wksId: form.wksId } : {}),
  number: text(form.number),
  date: form.date,
  voucherNumber: text(form.voucherNumber),
  statement: text(form.statement),
  description: text(form.description)
});

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

const readOnlyField = (label, value) => (
  <TextField label={label} value={value ?? ''} size="small" fullWidth slotProps={{ input: { readOnly: true } }} />
);

export default function InvoiceFormPage() {
  const { invId: invIdParam } = useParams();
  const invId = Number(invIdParam) || 0;
  const isEdit = invId > 0;
  const navigate = useNavigate();
  const { refresh } = useOutletContext() ?? {};
  const [searchParams] = useSearchParams();
  const presetType = INVOICE_TYPE_OPTIONS.some((o) => o.value === searchParams.get('type')) ? searchParams.get('type') : '';
  const presetCtrId = Number(searchParams.get('ctrId')) || '';

  const [idempotencyKey] = useState(() => (isEdit ? null : newIdempotencyKey()));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(null);
  const [workOptions, setWorkOptions] = useState([]);
  const [contractOptions, setContractOptions] = useState({ type: null, items: [] });
  const [options, setOptions] = useState({ stages: [], providers: [] });
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [confirmLeave, setConfirmLeave] = useState(false);

  const { control, handleSubmit, reset, setValue, formState } = useForm({ defaultValues: EMPTY_FORM });
  const { errors, isDirty } = formState;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [invoice, works] = await Promise.all([
          isEdit ? invoicesApi.getById({ invId }).then((res) => res.data) : Promise.resolve(null),
          isEdit ? Promise.resolve([]) : getInvoiceWorksSelectAPI().then((res) => res.data)
        ]);
        setLoaded(invoice);
        setWorkOptions(works);
        reset(invoice ? toForm(invoice) : { ...EMPTY_FORM, date: today(), type: presetType, ctrId: presetType ? presetCtrId : '' });
      } catch (err) {
        showError(err.response?.data?.message || 'Error al cargar la factura');
        navigate('/billing/invoices', { replace: true });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [isEdit, invId, reset, navigate, presetType, presetCtrId]);

  const [type, wrkId, ctrId] = useWatch({ control, name: ['type', 'wrkId', 'ctrId'] });
  const simple = isSimple(type);

  // Contratos que hoy admiten el tipo elegido (solo al registrar).
  useEffect(() => {
    if (isEdit || !type || simple) return undefined;
    let cancelled = false;
    getInvoiceContractsSelectAPI({ type })
      .then(({ data }) => !cancelled && setContractOptions({ type, items: data }))
      .catch((err) => showError(err.response?.data?.message || 'Error al cargar los contratos'));
    return () => {
      cancelled = true;
    };
  }, [isEdit, type, simple]);

  // Etapas y proveedores de la obra (factura simple); al editar, también los actuales aunque estén inactivos.
  useEffect(() => {
    if (!simple || !wrkId) {
      setOptions({ stages: [], providers: [] });
      return undefined;
    }
    let cancelled = false;
    setLoadingOptions(true);
    getInvoiceFormOptionsAPI({ wrkId, ...(loaded ? { includeWksId: loaded.wksId, includePrvId: loaded.prvId } : {}) })
      .then(({ data }) => !cancelled && setOptions(data))
      .catch((err) => showError(err.response?.data?.message || 'Error al cargar las etapas y proveedores de la obra'))
      .finally(() => !cancelled && setLoadingOptions(false));
    return () => {
      cancelled = true;
    };
  }, [simple, wrkId, loaded]);

  const changeType = (value) => {
    setValue('type', value ?? '', { shouldDirty: true });
    for (const field of ['ctrId', 'wrkId', 'prvId', 'wksId']) setValue(field, '', { shouldDirty: true });
  };

  const changeWork = (value) => {
    setValue('wrkId', value ?? '', { shouldDirty: true });
    setValue('wksId', '', { shouldDirty: true });
    setValue('prvId', '', { shouldDirty: true });
  };

  const leave = () => navigate('/billing/invoices');
  const requestLeave = () => (isDirty ? setConfirmLeave(true) : leave());

  const onSubmit = async (form) => {
    setSaving(true);
    try {
      const { data } = await invoicesApi.save(toPayload(invId, form), isEdit ? undefined : idempotencyKey);
      showSuccess(data.message || 'Guardado correctamente.');
      refresh?.();
      navigate(`/billing/invoices/${data.invId ?? invId}`);
    } catch (err) {
      showError(err.response?.data?.message || 'Error al guardar la factura');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <RouteDialog onClose={leave} loading />;

  const allows = (action) => !isEdit || loaded.allowedActions.includes(action);
  const fullEdit = allows('edit');
  const blocked = !allows('editNotes');
  const lockDocument = isEdit && !fullEdit;
  const hasErrors = Object.keys(errors).length > 0;
  const contracts = contractOptions.type === type ? contractOptions.items : [];
  const contract = contracts.find((c) => Number(c.value) === Number(ctrId));
  const noOptions = wrkId && !loadingOptions;

  return (
    <RouteDialog
      onClose={requestLeave}
      closeLabel="Cerrar sin guardar"
      labelledBy="invoice-form-title"
      onSubmit={handleSubmit(onSubmit)}
      header={
        <>
          <Typography id="invoice-form-title" variant="h3" component="h2">
            {isEdit ? `Editar factura ${loaded?.number ?? ''}` : 'Nueva factura'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {isEdit
              ? `${loaded.typeName} · ${loaded.providerName} · ${loaded.stateName}`
              : 'Registra el documento del proveedor. Los campos con * son obligatorios.'}
          </Typography>
        </>
      }
      footer={
        <>
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={requestLeave} disabled={saving}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="secondary" disabled={saving || blocked || !type}>
            {saving ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Registrar'}
          </Button>
        </>
      }
    >
      <Stack spacing={2}>
        {blocked && <Alert severity="warning">La factura está anulada: no admite cambios.</Alert>}
        {isEdit && !blocked && lockDocument && (
          <Alert severity="info">
            La factura está aprobada: solo se modifican el extracto y la descripción. Para corregir otro dato, anúlala y regístrala de
            nuevo.
          </Alert>
        )}
        {hasErrors && (
          <Alert severity="error" role="alert">
            Revisa los campos marcados antes de guardar.
          </Alert>
        )}
        <Alert severity="info" variant="outlined">
          Los importes (valor, IVA, retenciones, anticipo y retenido) todavía no se registran: llegan cuando se defina la composición de
          cada tipo de factura.
        </Alert>

        <Section
          title="Tipo y origen"
          subtitle="El tipo decide si la factura va contra un contrato o se imputa a una etapa de la obra. No cambia después de registrar."
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              {isEdit ? (
                readOnlyField('Tipo', loaded.typeName)
              ) : (
                <Controller
                  name="type"
                  control={control}
                  rules={{ required: 'Selecciona el tipo de factura.' }}
                  render={({ field, fieldState }) => (
                    <SearchSelect
                      value={field.value}
                      onChange={changeType}
                      options={INVOICE_TYPE_OPTIONS}
                      label="Tipo de factura"
                      required
                      error={fieldState.error?.message}
                      helperText={INVOICE_TYPE_OPTIONS.find((o) => o.value === field.value)?.hint}
                    />
                  )}
                />
              )}
            </Grid>

            {type && !simple && (
              <>
                <Grid size={{ xs: 12, md: 8 }}>
                  {isEdit ? (
                    readOnlyField('Contrato', `${loaded.contractNumber} — ${loaded.contractName}`)
                  ) : (
                    <Controller
                      name="ctrId"
                      control={control}
                      rules={{ required: 'Selecciona el contrato.' }}
                      render={({ field, fieldState }) => (
                        <SearchSelect
                          value={field.value}
                          onChange={field.onChange}
                          options={contracts}
                          label="Contrato"
                          required
                          error={fieldState.error?.message}
                          helperText={
                            contractOptions.type === type && contracts.length === 0
                              ? 'Ningún contrato está hoy en un estado que admita este tipo de factura'
                              : 'Solo los contratos cuyo estado admite este tipo'
                          }
                        />
                      )}
                    />
                  )}
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>{readOnlyField('Proveedor', isEdit ? loaded.providerName : contract?.providerName)}</Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  {readOnlyField('Obra', isEdit ? `${loaded.workCode} — ${loaded.workName}` : contract?.workName)}
                </Grid>
              </>
            )}

            {simple && (
              <>
                <Grid size={{ xs: 12, md: 8 }}>
                  {isEdit ? (
                    readOnlyField('Obra', `${loaded.workCode} — ${loaded.workName}`)
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
                <Grid size={{ xs: 12, md: 6 }}>
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
                        disabled={!wrkId || lockDocument || blocked}
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
                <Grid size={{ xs: 12, md: 6 }}>
                  <Controller
                    name="wksId"
                    control={control}
                    rules={{ required: 'Selecciona la etapa.' }}
                    render={({ field, fieldState }) => (
                      <SearchSelect
                        value={field.value}
                        onChange={field.onChange}
                        options={options.stages}
                        loading={loadingOptions}
                        disabled={!wrkId || lockDocument || blocked}
                        label="Etapa"
                        required
                        error={fieldState.error?.message}
                        helperText={
                          !wrkId
                            ? 'Elige primero la obra'
                            : noOptions && options.stages.length === 0
                              ? 'La obra no tiene etapas activas'
                              : ''
                        }
                      />
                    )}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Section>

        <Section title="Documento">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Controller
                name="number"
                control={control}
                rules={{ validate: (value) => text(value) !== '' || 'El número es requerido.' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Número de factura"
                    required
                    size="small"
                    fullWidth
                    disabled={lockDocument || blocked}
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message ?? 'Único por proveedor'}
                    slotProps={{ htmlInput: { maxLength: 50, autoComplete: 'off' } }}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Controller
                name="date"
                control={control}
                rules={{
                  required: 'La fecha de la factura es requerida.',
                  validate: (value) => value <= today() || 'No puede ser futura.'
                }}
                render={({ field, fieldState }) => (
                  <DateField
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    label="Fecha de la factura"
                    required
                    readOnly={lockDocument || blocked}
                    error={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name="voucherNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Número de comprobante"
                    size="small"
                    fullWidth
                    disabled={lockDocument || blocked}
                    slotProps={{ htmlInput: { maxLength: 50, autoComplete: 'off' } }}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Controller
                name="statement"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Extracto"
                    size="small"
                    fullWidth
                    disabled={blocked}
                    slotProps={{ htmlInput: { maxLength: 100, autoComplete: 'off' } }}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Controller
                name="description"
                control={control}
                rules={{ maxLength: { value: 500, message: 'Máximo 500 caracteres.' } }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Descripción"
                    size="small"
                    fullWidth
                    multiline
                    minRows={2}
                    disabled={blocked}
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Section>
      </Stack>

      <ConfirmDialog
        open={confirmLeave}
        onClose={() => setConfirmLeave(false)}
        onConfirm={leave}
        title="Descartar cambios"
        message="Hay cambios sin guardar en la factura. ¿Salir sin guardarlos?"
        confirmLabel="Descartar"
      />
    </RouteDialog>
  );
}
