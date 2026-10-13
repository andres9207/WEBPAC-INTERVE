import { useCallback, useEffect, useState } from 'react';
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

import FormSection from 'ui-component/extended/FormSection';
import ConfirmDialog from 'ui-component/extended/ConfirmDialog';
import DateField from 'ui-component/extended/DateField';
import RouteDialog from 'ui-component/extended/RouteDialog';
import SearchSelect from 'ui-component/extended/SearchSelect';
import AdvanceAmountsSection from './components/AdvanceAmountsSection';
import { getInvoiceContractsSelectAPI, getInvoiceProvidersSelectAPI, invoicesApi } from 'api/requests/invoicesApi';
import { useAuth } from 'contexts/AuthContext';
import { showError, showSuccess } from 'services/ToastService';
import { newIdempotencyKey } from 'utils/idempotency';
import { INVOICE_TYPE_OPTIONS, INVOICE_VIEWS, invoicePath } from 'utils/constants';

/**
 * Registro y edición de una factura (ADR-0020, DEC-042), en un modal sobre el
 * listado de su vista (DEC-054) con dirección propia `…/new` y
 * `…/:invId/edit` (DEC-034). La vista llega por el contexto del Outlet.
 *
 * - La vista decide los tipos: la de simples registra solo la simple, que
 *   pide el proveedor (activo y del alcance) y nada más: no tiene obra,
 *   etapa ni contrato. Las de contrato mayor y subcontratistas eligen el
 *   tipo y el contrato de su clase (solo los que hoy admiten ese tipo), y
 *   toman de él obra y proveedor.
 * - Tipo y contrato no cambian después de registrar.
 * - Registrada se edita entera; aprobada, solo extracto y descripción;
 *   anulada, nada. Lo decide el servidor (`allowedActions`).
 * - Estado y fecha de aprobación no están en el formulario: los fijan
 *   Aprobar y Anular. Crear lleva clave de idempotencia.
 * - Desde la pestaña Facturas del contrato llega con `?type=…&ctrId=…`: el
 *   tipo y el contrato ya elegidos; desde la del proveedor, con `?prvId=…`.
 * - Contratos y proveedores se buscan en el servidor (los selectores tienen
 *   tope, DEC-018).
 * - Anticipo, liquidación y devolución de retenido llevan sus importes
 *   (DEC-044, DEC-051, AdvanceAmountsSection). Los de una aprobada no se
 *   envían: no cambian.
 */

const EMPTY_FORM = {
  type: '',
  ctrId: '',
  prvId: '',
  number: '',
  date: '',
  voucherNumber: '',
  statement: '',
  description: '',
  // Importes del anticipo, la liquidación y la devolución (DEC-044, DEC-051).
  value: '',
  amortization: '',
  adjustAmortization: false,
  amortizationObservation: '',
  retention: '',
  adjustRetention: false,
  retentionObservation: ''
};

const DOCUMENT_FIELDS = ['type', 'ctrId', 'prvId', 'number', 'date', 'voucherNumber', 'statement', 'description'];

const text = (value) => String(value ?? '').trim();
const today = () => format(new Date(), 'yyyy-MM-dd');
const isSimple = (type) => type === 'SIMPLE';
const hasAmounts = (type) => type === 'ADVANCE' || type === 'LIQUIDATION' || type === 'RETENTION_REFUND';

const toForm = (invoice) => ({
  ...EMPTY_FORM,
  ...Object.fromEntries(DOCUMENT_FIELDS.map((field) => [field, invoice[field] ?? EMPTY_FORM[field]])),
  value: invoice.amounts?.value ?? '',
  amortization: invoice.amounts?.amortization ?? '',
  adjustAmortization: Boolean(invoice.amounts?.adjustmentObservation),
  amortizationObservation: invoice.amounts?.adjustmentObservation ?? '',
  retention: invoice.amounts?.retention ?? '',
  adjustRetention: Boolean(invoice.amounts?.retentionObservation),
  retentionObservation: invoice.amounts?.retentionObservation ?? ''
});

// Sin ajuste, la amortización y el retenido no se envían: el servidor usa
// los de por defecto.
const amountsPayload = (form) => ({
  value: form.value,
  ...(form.type === 'LIQUIDATION' && form.adjustAmortization
    ? { amortization: form.amortization, amortizationObservation: text(form.amortizationObservation) }
    : {}),
  ...(form.type === 'LIQUIDATION' && form.adjustRetention
    ? { retention: form.retention, retentionObservation: text(form.retentionObservation) }
    : {})
});

const toPayload = (invId, form, sendAmounts) => ({
  invId,
  ...(invId ? {} : { type: form.type, ...(isSimple(form.type) ? {} : { ctrId: form.ctrId }) }),
  ...(isSimple(form.type) ? { prvId: form.prvId } : {}),
  number: text(form.number),
  date: form.date,
  voucherNumber: text(form.voucherNumber),
  statement: text(form.statement),
  description: text(form.description),
  ...(sendAmounts && hasAmounts(form.type) ? amountsPayload(form) : {})
});

/**
 * Opciones de un selector con tope, buscadas en el servidor al dejar de
 * escribir (mismo criterio que WorkProviderDialog). `fetchOptions(search)`
 * debe ser estable (useCallback): cuando cambia, se vuelve a pedir.
 */
function useRemoteOptions(enabled, fetchOptions, errorMessage) {
  const [search, setSearch] = useState('');
  const [state, setState] = useState({ items: [], loading: false, loaded: false });

  useEffect(() => {
    if (!enabled) return undefined;
    let cancelled = false;
    const term = search.trim();
    const timer = setTimeout(
      async () => {
        setState((s) => ({ ...s, loading: true }));
        try {
          const items = await fetchOptions(term);
          if (!cancelled) setState({ items, loading: false, loaded: true });
        } catch (err) {
          if (cancelled) return;
          showError(err.response?.data?.message || errorMessage);
          setState((s) => ({ ...s, loading: false }));
        }
      },
      term ? 300 : 0
    );
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [enabled, fetchOptions, search, errorMessage]);

  return { ...state, search: search.trim(), setSearch };
}

const readOnlyField = (label, value) => (
  <TextField label={label} value={value ?? ''} size="small" fullWidth slotProps={{ input: { readOnly: true } }} />
);

export default function InvoiceFormPage() {
  const { invId: invIdParam } = useParams();
  const invId = Number(invIdParam) || 0;
  const isEdit = invId > 0;
  const navigate = useNavigate();
  const { refresh, view = 'SIMPLE' } = useOutletContext() ?? {};
  const listPath = invoicePath(view);
  const typeOptions = INVOICE_TYPE_OPTIONS.filter((o) => INVOICE_VIEWS[view].types.includes(o.value));
  // La vista de simples tiene un solo tipo: no se elige.
  const fixedType = typeOptions.length === 1 ? typeOptions[0].value : '';
  const { permissionsCatalog, hasPermission } = useAuth();
  const adjustPermission = permissionsCatalog.billing?.invoices?.adjustAmortization;
  const canAdjust = adjustPermission != null && hasPermission(adjustPermission);
  const adjustRetentionPermission = permissionsCatalog.billing?.invoices?.adjustRetention;
  const canAdjustRetention = adjustRetentionPermission != null && hasPermission(adjustRetentionPermission);
  const [searchParams] = useSearchParams();
  const presetType = fixedType || (typeOptions.some((o) => o.value === searchParams.get('type')) ? searchParams.get('type') : '');
  const presetCtrId = Number(searchParams.get('ctrId')) || '';
  const presetPrvId = Number(searchParams.get('prvId')) || '';

  const [idempotencyKey] = useState(() => (isEdit ? null : newIdempotencyKey()));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(null);
  // Contrato elegido: su proveedor y su obra se muestran aunque una búsqueda nueva no lo traiga.
  const [pickedContract, setPickedContract] = useState(null);
  const [confirmLeave, setConfirmLeave] = useState(false);

  const { control, handleSubmit, reset, setValue, formState } = useForm({ defaultValues: EMPTY_FORM });
  const { errors, isDirty } = formState;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const invoice = isEdit ? (await invoicesApi.getById({ invId })).data : null;
        setLoaded(invoice);
        reset(
          invoice
            ? toForm(invoice)
            : {
                ...EMPTY_FORM,
                date: today(),
                type: presetType,
                ctrId: presetType && !isSimple(presetType) ? presetCtrId : '',
                prvId: isSimple(presetType) ? presetPrvId : ''
              }
        );
      } catch (err) {
        showError(err.response?.data?.message || 'Error al cargar la factura');
        navigate(listPath, { replace: true });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [isEdit, invId, reset, navigate, listPath, presetType, presetCtrId, presetPrvId]);

  const [type, ctrId] = useWatch({ control, name: ['type', 'ctrId'] });
  const simple = isSimple(type);

  // Contratos de la clase de la vista que hoy admiten el tipo elegido (solo al registrar).
  const fetchContracts = useCallback(
    (search) =>
      getInvoiceContractsSelectAPI({
        type,
        view,
        ...(search ? { search } : {}),
        ...(presetCtrId ? { includeCtrId: presetCtrId } : {})
      }).then((res) => res.data),
    [type, view, presetCtrId]
  );
  // Proveedores del alcance (simple); el ya elegido vuelve aunque esté inactivo.
  const currentPrvId = loaded?.prvId ?? presetPrvId;
  const fetchProviders = useCallback(
    (search) =>
      getInvoiceProvidersSelectAPI({ ...(search ? { search } : {}), ...(currentPrvId ? { includePrvId: currentPrvId } : {}) }).then(
        (res) => res.data
      ),
    [currentPrvId]
  );
  const contractOptions = useRemoteOptions(
    !loading && !isEdit && Boolean(type) && !simple,
    fetchContracts,
    'Error al cargar los contratos'
  );
  const providerOptions = useRemoteOptions(
    !loading && simple && (!isEdit || loaded.allowedActions.includes('edit')),
    fetchProviders,
    'Error al cargar los proveedores'
  );

  const changeType = (value) => {
    setValue('type', value ?? '', { shouldDirty: true });
    for (const field of ['ctrId', 'prvId', 'value', 'amortization', 'amortizationObservation', 'retention', 'retentionObservation']) {
      setValue(field, '', { shouldDirty: true });
    }
    setValue('adjustAmortization', false, { shouldDirty: true });
    setValue('adjustRetention', false, { shouldDirty: true });
    contractOptions.setSearch('');
  };

  const leave = () => navigate(listPath);
  const requestLeave = () => (isDirty ? setConfirmLeave(true) : leave());

  const onSubmit = async (form) => {
    setSaving(true);
    try {
      const sendAmounts = !isEdit || loaded.allowedActions.includes('edit');
      const { data } = await invoicesApi.save(toPayload(invId, form, sendAmounts), isEdit ? undefined : idempotencyKey);
      showSuccess(data.message || 'Guardado correctamente.');
      refresh?.();
      navigate(invoicePath(view, data.invId ?? invId));
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
  const contract =
    contractOptions.items.find((c) => Number(c.value) === Number(ctrId)) ??
    (pickedContract && Number(pickedContract.value) === Number(ctrId) ? pickedContract : undefined);

  return (
    <RouteDialog
      onClose={requestLeave}
      closeLabel="Cerrar sin guardar"
      labelledBy="invoice-form-title"
      onSubmit={handleSubmit(onSubmit)}
      header={
        <>
          <Typography id="invoice-form-title" variant="h3" component="h2">
            {isEdit ? `Editar factura ${loaded?.number ?? ''}` : simple ? 'Nueva factura simple' : 'Nueva factura'}
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
          {hasAmounts(type)
            ? 'IVA y retenciones tributarias todavía no se registran: llegan cuando se defina la composición de cada tipo de factura.'
            : 'Los importes de este tipo de factura todavía no se registran: llegan cuando se defina su composición.'}
        </Alert>

        <FormSection
          title={simple ? 'Proveedor' : 'Tipo y origen'}
          subtitle={
            simple
              ? 'La factura simple es del proveedor: sin contrato ni obra. Se ve en las obras a las que el proveedor está asignado.'
              : 'El tipo decide contra qué contrato se registra. No cambia después de registrar.'
          }
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              {isEdit || fixedType ? (
                readOnlyField('Tipo', isEdit ? loaded.typeName : typeOptions[0].label)
              ) : (
                <Controller
                  name="type"
                  control={control}
                  rules={{ required: 'Selecciona el tipo de factura.' }}
                  render={({ field, fieldState }) => (
                    <SearchSelect
                      value={field.value}
                      onChange={changeType}
                      options={typeOptions}
                      label="Tipo de factura"
                      required
                      error={fieldState.error?.message}
                      helperText={typeOptions.find((o) => o.value === field.value)?.hint}
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
                          onOptionChange={setPickedContract}
                          onSearch={contractOptions.setSearch}
                          options={contractOptions.items}
                          loading={contractOptions.loading}
                          label="Contrato"
                          required
                          placeholder="Número, nombre, proveedor u obra"
                          error={fieldState.error?.message}
                          helperText={
                            contractOptions.loaded && !contractOptions.search && contractOptions.items.length === 0
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
              <Grid size={{ xs: 12, md: 8 }}>
                <Controller
                  name="prvId"
                  control={control}
                  rules={{ required: 'Selecciona el proveedor.' }}
                  render={({ field, fieldState }) =>
                    lockDocument || blocked ? (
                      readOnlyField('Proveedor', loaded.providerName)
                    ) : (
                      <SearchSelect
                        value={field.value}
                        onChange={field.onChange}
                        onSearch={providerOptions.setSearch}
                        options={providerOptions.items}
                        loading={providerOptions.loading}
                        placeholder="Razón social o documento"
                        label="Proveedor"
                        required
                        error={fieldState.error?.message}
                        helperText={
                          providerOptions.loaded && !providerOptions.search && providerOptions.items.length === 0
                            ? 'No hay proveedores activos asignados a las obras que ves'
                            : 'Proveedores activos asignados a las obras que ves'
                        }
                      />
                    )
                  }
                />
              </Grid>
            )}
          </Grid>
        </FormSection>

        <FormSection title="Documento">
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
        </FormSection>

        {hasAmounts(type) && (
          <AdvanceAmountsSection
            control={control}
            setValue={setValue}
            type={type}
            ctrId={ctrId}
            readOnly={lockDocument || blocked}
            canAdjust={canAdjust}
            canAdjustRetention={canAdjustRetention}
            onError={showError}
          />
        )}
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
