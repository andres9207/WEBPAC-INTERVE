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
import ContractBalanceCards from './components/ContractBalanceCards';
import InvoiceDetailPanel from './components/InvoiceDetailPanel';
import SimpleAmountsSection, { SIMPLE_AMOUNT_FIELDS } from './components/SimpleAmountsSection';
import useContractTaxFields, { CONTRACT_TAX_FIELDS } from './components/ContractTaxesSection';
import {
  getContractAdvanceAPI,
  getInvoiceContractsSelectAPI,
  getInvoiceFormOptionsAPI,
  getInvoiceProvidersSelectAPI,
  getInvoiceWorksSelectAPI,
  invoicesApi
} from 'api/requests/invoicesApi';
import { useAuth } from 'contexts/AuthContext';
import { useWorkScope } from 'contexts/WorkScopeContext';
import { showError, showSuccess } from 'services/ToastService';
import { newIdempotencyKey } from 'utils/idempotency';
import { INVOICE_MODE_TYPES, INVOICE_TYPE_OPTIONS, invoicePath, isBillingInvoiceType } from 'utils/constants';
import { ALL_WORKS } from 'utils/workScope';

/**
 * Registro y edición de una factura (ADR-0020, DEC-042), en un modal sobre el
 * listado de su menú (DEC-074) con dirección propia `…/new` y
 * `…/:invId/edit` (DEC-034). El menú (su tipo de proveedor, su nombre y su
 * forma de facturar) llega por el contexto del Outlet.
 *
 * - La forma del menú decide los tipos: la simple registra solo la simple,
 *   que pide la obra, una etapa de ella (si la obra tiene etapas, DEC-069) y
 *   un proveedor que trabaja en ella con el tipo del menú, sin contrato
 *   (DEC-058). La de contrato elige, en ese orden, el proveedor, uno de sus
 *   contratos firmados bajo el tipo del menú (los que hoy admiten algún tipo)
 *   y el tipo de factura, Normal por defecto (`contractTypeChoices`: qué tipos
 *   ofrece el contrato y qué falta para los demás); la obra sale del contrato.
 * - La factura nueva guarda el tipo del menú (`pvtId`).
 * - Tipo, obra y contrato no cambian después de registrar.
 * - Registrada se edita entera; aprobada, solo extracto, descripción y
 *   número de comprobante (DEC-080);
 *   anulada, nada. Lo decide el servidor (`allowedActions`).
 * - Estado y fecha de aprobación no están en el formulario: los fijan
 *   Aprobar y Anular. Crear lleva clave de idempotencia.
 * - Desde la pestaña Facturas del contrato llega con `?type=…&ctrId=…`: el
 *   tipo y el contrato ya elegidos; desde la de la obra, con `?wrkId=…`, y
 *   desde la del proveedor, con `?prvId=…` (solo sus obras).
 * - Con una obra fija en el encabezado (no "Ver todo"), la simple se registra
 *   en esa obra: no se elige (mismo criterio que el formulario de contrato).
 * - Proveedores, contratos y obras se buscan en el servidor (los selectores
 *   tienen tope, DEC-018).
 * - Anticipo, liquidación y devolución de retenido llevan sus importes
 *   (DEC-044, DEC-051, AdvanceAmountsSection). Los de una aprobada no se
 *   envían: no cambian.
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
  description: '',
  // Importes del anticipo, la liquidación y la devolución (DEC-044, DEC-051).
  // `adjust…`: el usuario escribió la amortización o el retenido; sin eso, siguen al valor por defecto.
  value: '',
  amortization: '',
  adjustAmortization: false,
  retention: '',
  adjustRetention: false,
  // Importes de la simple (DEC-065); `value` es compartido.
  withholdingPct: '',
  discount: '',
  vatPct: '',
  vatWithholdingPct: '',
  icaWithholding: '',
  freight: '',
  earlyPaymentDiscount: '',
  // De la normal y la liquidación (DEC-075); % IVA y retenciones son los de arriba.
  utilityPct: '',
  materialsDiscount: ''
};

const DOCUMENT_FIELDS = ['type', 'ctrId', 'wrkId', 'prvId', 'wksId', 'number', 'date', 'voucherNumber', 'statement', 'description'];

const DEFAULT_VAT_PCT = '19';

const text = (value) => String(value ?? '').trim();
const today = () => format(new Date(), 'yyyy-MM-dd');
const isSimple = (type) => type === 'SIMPLE';
// Separación (px) de las tarjetas de saldos fijas con el borde y con el formulario.
const CARDS_GAP = 12;
// El contenido de RouteDialog tiene padding 3 (24 px): `sticky` se fija bajo él.
const DIALOG_PADDING = 24;
const hasAmounts = (type) => type === 'ADVANCE' || type === 'RETENTION_REFUND' || isBillingInvoiceType(type);

const toForm = (invoice) => ({
  ...EMPTY_FORM,
  ...Object.fromEntries(DOCUMENT_FIELDS.map((field) => [field, invoice[field] ?? EMPTY_FORM[field]])),
  // La simple (DEC-065), la normal y la liquidación (DEC-075) traen lo capturado en `amounts.captured`.
  ...(invoice.amounts?.captured ?? {}),
  value: invoice.amounts?.captured?.value ?? invoice.amounts?.value ?? '',
  amortization: invoice.amounts?.amortization ?? '',
  // Ajustada: la guardada se aparta de la de por defecto (el servidor da las dos con el mismo formato).
  adjustAmortization: invoice.amounts?.amortization != null && invoice.amounts.amortization !== invoice.amounts.defaultAmortization,
  retention: invoice.amounts?.retention ?? '',
  adjustRetention: invoice.amounts?.retention != null && invoice.amounts.retention !== invoice.amounts.defaultRetention
});

// Sin ajuste, la amortización y el retenido no se envían: el servidor usa
// los de por defecto. Un ajuste no lleva observación (DEC-044, DEC-051).
const amountsPayload = (form) => ({
  value: form.value,
  ...(isBillingInvoiceType(form.type) && form.adjustAmortization ? { amortization: form.amortization } : {}),
  ...(isBillingInvoiceType(form.type) && form.adjustRetention ? { retention: form.retention } : {}),
  // IVA, retenciones y descuento de materiales (DEC-075).
  ...(isBillingInvoiceType(form.type) ? Object.fromEntries(CONTRACT_TAX_FIELDS.map((field) => [field, form[field]])) : {})
});

const toPayload = (invId, form, sendAmounts, pvtId) => ({
  invId,
  ...(invId ? {} : { type: form.type, pvtId, ...(isSimple(form.type) ? { wrkId: form.wrkId } : { ctrId: form.ctrId }) }),
  ...(isSimple(form.type) ? { prvId: form.prvId, wksId: form.wksId } : {}),
  number: text(form.number),
  date: form.date,
  voucherNumber: text(form.voucherNumber),
  statement: text(form.statement),
  description: text(form.description),
  ...(sendAmounts && hasAmounts(form.type) ? amountsPayload(form) : {}),
  ...(sendAmounts && isSimple(form.type) ? Object.fromEntries(SIMPLE_AMOUNT_FIELDS.map((field) => [field, form[field]])) : {})
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

// Importe del servidor (texto) mayor que cero, sin pasarlo a número (DEC-045).
const isPositive = (amount) => /^\d/.test(amount ?? '') && /[1-9]/.test(amount);

const DEFAULT_CONTRACT_TYPE = 'NORMAL';

/**
 * Tipos de factura del contrato elegido, con sus saldos (`get_contract_advance`):
 *
 * - Normal, por defecto, mientras el contrato está en ejecución.
 * - Anticipo: deshabilitado si el contrato no tiene anticipo pactado.
 * - Liquidación: deshabilitada mientras no se registre el otrosí de
 *   liquidación (el contrato sigue en ejecución).
 * - Devolución de retenido: deshabilitada si no hay retenido por devolver.
 *
 * Ningún tipo se oculta: el que no se puede elegir aparece deshabilitado y
 * lleva en su opción lo que le falta. Es una guía: al guardar, el servidor
 * vuelve a verificar el estado y los saldos.
 */
const contractTypeChoices = (contract, typeOptions, balances) => {
  if (!contract || !balances) return { options: [] };
  const admitted = contract.types ?? [];
  const options = [];
  const add = (option, reason) => options.push({ ...option, disabled: Boolean(reason), description: reason || undefined });
  // Normal primero: es la de por defecto.
  const ordered = [...typeOptions].sort((a, b) => (b.value === DEFAULT_CONTRACT_TYPE) - (a.value === DEFAULT_CONTRACT_TYPE));
  for (const option of ordered) {
    const allowed = admitted.includes(option.value);
    switch (option.value) {
      case 'NORMAL':
        add(option, allowed ? '' : 'solo con el contrato en ejecución.');
        break;
      case 'ADVANCE':
        if (!isPositive(balances.agreed))
          add(option, 'el contrato no tiene anticipo pactado; se pacta en su valor inicial o en un otrosí.');
        else if (!allowed) add(option, 'solo con el contrato en ejecución.');
        else add(option, isPositive(balances.toInvoice) ? '' : 'ya se facturó todo el anticipo pactado.');
        break;
      case 'LIQUIDATION':
        add(option, allowed ? '' : 'el contrato no tiene otrosí de liquidación; regístralo en el expediente del contrato.');
        break;
      case 'RETENTION_REFUND':
        if (!isPositive(balances.retention?.balance))
          add(option, 'el contrato no tiene retenido por devolver; se acumula con las facturas normales y de liquidación aprobadas.');
        else add(option, allowed ? '' : 'se registra con el contrato en liquidación (después del otrosí de liquidación).');
        break;
      default:
        add(option, allowed ? '' : 'el estado del contrato no lo admite.');
    }
  }
  return { options };
};

const readOnlyField = (label, value) => (
  <TextField label={label} value={value ?? ''} size="small" fullWidth slotProps={{ input: { readOnly: true } }} />
);

export default function InvoiceFormPage() {
  const { invId: invIdParam } = useParams();
  const invId = Number(invIdParam) || 0;
  const isEdit = invId > 0;
  const navigate = useNavigate();
  const { refresh, pvtId, menu } = useOutletContext() ?? {};
  const listPath = invoicePath(pvtId);
  const typeOptions = INVOICE_TYPE_OPTIONS.filter((o) => (INVOICE_MODE_TYPES[menu?.mode] ?? []).includes(o.value));
  // Un menú de forma simple tiene un solo tipo: no se elige.
  const fixedType = typeOptions.length === 1 ? typeOptions[0].value : '';
  const { permissionsCatalog, hasPermission } = useAuth();
  const adjustRetentionPermission = permissionsCatalog.billing?.invoices?.adjustRetention;
  const canAdjustRetention = adjustRetentionPermission != null && hasPermission(adjustRetentionPermission);
  const [searchParams] = useSearchParams();
  const presetType = fixedType || (typeOptions.some((o) => o.value === searchParams.get('type')) ? searchParams.get('type') : '');
  const presetCtrId = Number(searchParams.get('ctrId')) || '';
  const { activeWork, works: scopeWorks } = useWorkScope();
  // Obra fija del encabezado; null con "Ver todo" (se elige en el formulario).
  const headerWork = activeWork === ALL_WORKS ? null : (scopeWorks.find((work) => work.value === activeWork) ?? null);
  const presetWrkId = headerWork?.value ?? (Number(searchParams.get('wrkId')) || '');
  const presetPrvId = Number(searchParams.get('prvId')) || '';

  const [idempotencyKey] = useState(() => (isEdit ? null : newIdempotencyKey()));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(null);
  // Contrato elegido: su proveedor y su obra se muestran aunque una búsqueda nueva no lo traiga.
  const [pickedContract, setPickedContract] = useState(null);
  const [options, setOptions] = useState({ stages: [], providers: [] });
  const [loadingOptions, setLoadingOptions] = useState(false);
  const [confirmLeave, setConfirmLeave] = useState(false);
  // Saldos del contrato (tarjetas) y composición de la simple (panel Detalle): los calcula el servidor (DEC-065).
  const [balances, setBalances] = useState(null);
  // Alto de las tarjetas de saldos, que quedan fijas arriba al hacer scroll:
  // el panel Detalle se fija justo debajo de ellas.
  const [cardsHeight, setCardsHeight] = useState(0);
  const cardsRef = useCallback((node) => {
    if (!node) return undefined;
    const observer = new ResizeObserver(() => setCardsHeight(node.offsetHeight));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const [preview, setPreview] = useState(null);

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
                wrkId: isSimple(presetType) ? presetWrkId : '',
                prvId: isSimple(presetType) ? presetPrvId : '',
                // IVA general por defecto, como en los conceptos del contrato; se puede cambiar.
                vatPct: isSimple(presetType) || isBillingInvoiceType(presetType) ? DEFAULT_VAT_PCT : ''
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
  }, [isEdit, invId, reset, navigate, listPath, presetType, presetCtrId, presetWrkId, presetPrvId]);

  const [type, ctrId, prvId, wrkId, value] = useWatch({
    control,
    name: ['type', 'ctrId', 'prvId', 'wrkId', 'value']
  });
  const simple = isSimple(type);
  // Menús de contrato: proveedor, contrato y tipo, en ese orden; el tipo no filtra los anteriores.
  const contractView = !fixedType;
  // Proveedor del contrato que llega desde su expediente: vuelve en el selector aunque el tope lo deje fuera.
  const presetContractPrvId = presetCtrId && contractView ? prvId : '';

  // Proveedores con contratos del tipo del menú que hoy admiten algún tipo de factura (solo al registrar).
  const fetchProviders = useCallback(
    (search) =>
      getInvoiceProvidersSelectAPI({
        pvtId,
        ...(search ? { search } : {}),
        ...(presetContractPrvId ? { includePrvId: presetContractPrvId } : {})
      }).then((res) => res.data),
    [pvtId, presetContractPrvId]
  );
  // Contratos del proveedor elegido; el que llega desde su expediente, antes de saber su proveedor.
  const fetchContracts = useCallback(
    (search) =>
      getInvoiceContractsSelectAPI({
        pvtId,
        ...(prvId ? { prvId } : {}),
        ...(search ? { search } : {}),
        ...(presetCtrId ? { includeCtrId: presetCtrId } : {})
      }).then((res) => res.data),
    [pvtId, prvId, presetCtrId]
  );
  // Obras activas del alcance (simple); desde el proveedor, solo las suyas.
  const fetchWorks = useCallback(
    (search) =>
      getInvoiceWorksSelectAPI({
        ...(search ? { search } : {}),
        ...(presetPrvId ? { prvId: presetPrvId } : {}),
        ...(presetWrkId ? { includeWrkId: presetWrkId } : {})
      }).then((res) => res.data),
    [presetPrvId, presetWrkId]
  );
  const providerOptions = useRemoteOptions(!loading && !isEdit && contractView, fetchProviders, 'Error al cargar los proveedores');
  const contractOptions = useRemoteOptions(
    !loading && !isEdit && contractView && Boolean(prvId || presetCtrId),
    fetchContracts,
    'Error al cargar los contratos'
  );

  // El contrato que llega desde su expediente fija su proveedor.
  const presetContract = contractOptions.items.find((c) => Number(c.value) === Number(presetCtrId));
  useEffect(() => {
    if (!isEdit && contractView && presetContract && !prvId) setValue('prvId', presetContract.prvId);
  }, [isEdit, contractView, presetContract, prvId, setValue]);
  const workOptions = useRemoteOptions(!loading && !isEdit && simple && !headerWork, fetchWorks, 'Error al cargar las obras');

  // Etapas y proveedores de la obra (simple); al editar, también los actuales aunque estén inactivos.
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

  // Saldos del contrato elegido (anticipo pactado, retenido por devolver): deciden qué tipos se ofrecen.
  // Se guardan con su contrato: al cambiarlo, los del anterior no cuentan.
  const [loadedBalances, setLoadedBalances] = useState(null);
  const contractBalances = loadedBalances && Number(loadedBalances.ctrId) === Number(ctrId) ? loadedBalances.data : null;
  useEffect(() => {
    if (isEdit || !contractView || !ctrId) return undefined;
    let cancelled = false;
    getContractAdvanceAPI({ ctrId })
      .then(({ data }) => !cancelled && setLoadedBalances({ ctrId, data }))
      .catch((err) => !cancelled && showError(err.response?.data?.message || 'Error al cargar los saldos del contrato'));
    return () => {
      cancelled = true;
    };
  }, [isEdit, contractView, ctrId]);

  const contract =
    contractOptions.items.find((c) => Number(c.value) === Number(ctrId)) ??
    (pickedContract && Number(pickedContract.value) === Number(ctrId) ? pickedContract : undefined);
  const typeChoices = contractTypeChoices(contract, typeOptions, contractBalances);
  const enabledTypes = typeChoices.options.filter((o) => !o.disabled).map((o) => o.value);
  const defaultType = enabledTypes.includes(DEFAULT_CONTRACT_TYPE) ? DEFAULT_CONTRACT_TYPE : (enabledTypes[0] ?? '');

  // Elegido el contrato, el tipo es Normal por defecto (o el primero que admita); el que ya estaba se conserva si se puede.
  useEffect(() => {
    if (isEdit || !contractView || !contractBalances || enabledTypes.includes(type)) return;
    if (type !== defaultType) changeType(defaultType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, contractView, contractBalances, type, defaultType, enabledTypes.join()]);

  // Otro tipo: los importes son de él. Proveedor y contrato se conservan.
  const changeType = (value) => {
    setValue('type', value ?? '', { shouldDirty: true });
    for (const field of ['value', 'amortization', 'retention', ...SIMPLE_AMOUNT_FIELDS, ...CONTRACT_TAX_FIELDS]) {
      setValue(field, '', { shouldDirty: true });
    }
    setValue('adjustAmortization', false, { shouldDirty: true });
    setValue('adjustRetention', false, { shouldDirty: true });
    // IVA general por defecto en la normal y la liquidación (DEC-075), como en la simple; se puede cambiar.
    if (isBillingInvoiceType(value)) setValue('vatPct', DEFAULT_VAT_PCT, { shouldDirty: true });
    setPreview(null);
  };

  // Otro contrato: el tipo se conserva si su estado lo admite.
  const changeContract = (value) => {
    setValue('ctrId', value ?? '', { shouldDirty: true });
    const option = contractOptions.items.find((c) => Number(c.value) === Number(value));
    if (type && !(option?.types ?? []).includes(type)) changeType('');
  };

  // Otro proveedor: el contrato y el tipo son de él.
  const changeProvider = (value) => {
    setValue('prvId', value ?? '', { shouldDirty: true });
    setValue('ctrId', '', { shouldDirty: true });
    if (type) changeType('');
    contractOptions.setSearch('');
  };

  // Otra obra: la etapa es de ella, y el proveedor también, salvo el que llega desde su expediente.
  const changeWork = (value) => {
    setValue('wrkId', value ?? '', { shouldDirty: true });
    setValue('wksId', '', { shouldDirty: true });
    if (!presetPrvId) setValue('prvId', '', { shouldDirty: true });
  };

  const leave = () => navigate(listPath);
  const requestLeave = () => (isDirty ? setConfirmLeave(true) : leave());

  const onSubmit = async (form) => {
    setSaving(true);
    try {
      const sendAmounts = !isEdit || loaded.allowedActions.includes('edit');
      const { data } = await invoicesApi.save(toPayload(invId, form, sendAmounts, pvtId), isEdit ? undefined : idempotencyKey);
      showSuccess(data.message || 'Guardado correctamente.');
      refresh?.();
      navigate(invoicePath(pvtId, data.invId ?? invId));
    } catch (err) {
      showError(err.response?.data?.message || 'Error al guardar la factura');
    } finally {
      setSaving(false);
    }
  };

  // Antes del retorno de carga, porque useContractTaxFields es un hook; mientras carga, `loaded` es null.
  const allows = (action) => !isEdit || Boolean(loaded?.allowedActions.includes(action));
  const fullEdit = allows('edit');
  const blocked = !allows('editNotes');
  const lockDocument = isEdit && !fullEdit;

  // IVA y retenciones de la normal y la liquidación, en el panel de importes (DEC-075).
  const taxField = useContractTaxFields({
    control,
    setValue,
    enabled: !loading && isBillingInvoiceType(type),
    readOnly: lockDocument || blocked,
    required: fullEdit,
    onPreview: setPreview,
    onError: showError
  });

  if (loading) return <RouteDialog onClose={leave} loading />;

  const hasErrors = Object.keys(errors).length > 0;
  const noOptions = wrkId && !loadingOptions;
  // La etapa solo es obligatoria si la obra tiene etapas (DEC-069); el servidor lo vuelve a verificar.
  const withoutStages = Boolean(noOptions) && options.stages.length === 0;
  const stageRequired = !withoutStages;
  const inactiveWork = !isEdit && simple && headerWork != null && headerWork.active === false;
  // Proveedores de la obra que trabajan en ella con el tipo de la factura (DEC-074); al editar, también el actual.
  const menuPvtId = Number(loaded?.pvtId ?? pvtId);
  const simpleProviders = options.providers.filter((p) => (p.simpleTypes ?? []).includes(menuPvtId) || p.value === loaded?.prvId);

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
          <Button type="submit" variant="contained" color="secondary" disabled={saving || blocked || inactiveWork || !type}>
            {saving ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Registrar'}
          </Button>
        </>
      }
    >
      <Stack spacing={2}>
        {blocked && <Alert severity="warning">La factura está anulada: no admite cambios.</Alert>}
        {isEdit && !blocked && lockDocument && (
          <Alert severity="info">
            La factura está aprobada: solo se modifican el extracto, la descripción y el número de comprobante. Para corregir otro dato,
            anúlala y regístrala de nuevo.
          </Alert>
        )}
        {inactiveWork && (
          <Alert severity="warning">
            La obra {headerWork.label} está inactiva: no admite facturas nuevas. Elige otra obra en el selector del encabezado.
          </Alert>
        )}
        {hasErrors && (
          <Alert severity="error" role="alert">
            Revisa los campos marcados antes de guardar.
          </Alert>
        )}
        {hasAmounts(type) && balances && (
          <Box
            ref={cardsRef}
            sx={(theme) => ({
              position: { md: 'sticky' },
              top: { md: CARDS_GAP - DIALOG_PADDING },
              zIndex: { md: 2 },
              bgcolor: 'grey.50',
              // Tapa el formulario que pasa por encima y por debajo de las
              // tarjetas, sin cambiar el espacio que ocupan.
              boxShadow: { md: `0 -${CARDS_GAP}px 0 0 ${theme.vars.palette.grey[50]}, 0 ${CARDS_GAP}px 0 0 ${theme.vars.palette.grey[50]}` }
            })}
          >
            <ContractBalanceCards balances={balances} type={type} />
          </Box>
        )}

        <Grid container spacing={2} sx={{ alignItems: 'flex-start' }}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Stack spacing={2}>
              <FormSection
                title={contractView ? 'Origen y tipo' : 'Obra y proveedor'}
                subtitle={
                  contractView
                    ? 'Elige el proveedor y uno de sus contratos. El tipo de factura es Normal por defecto; la ayuda del campo dice qué falta para los demás. No cambian después de registrar.'
                    : 'La factura simple se imputa a la obra, sin contrato, y a una de sus etapas si la obra las tiene. El proveedor debe estar asignado a la obra. La obra no cambia después de registrar.'
                }
              >
                <Grid container spacing={2}>
                  {!contractView && <Grid size={{ xs: 12, md: 4 }}>{readOnlyField('Tipo', typeOptions[0].label)}</Grid>}

                  {contractView && (
                    <>
                      <Grid size={{ xs: 12, md: 6 }}>
                        {isEdit ? (
                          readOnlyField('Proveedor', loaded.providerName)
                        ) : (
                          <Controller
                            name="prvId"
                            control={control}
                            rules={{ required: 'Selecciona el proveedor.' }}
                            render={({ field, fieldState }) => (
                              <SearchSelect
                                value={field.value}
                                onChange={changeProvider}
                                onSearch={providerOptions.setSearch}
                                options={providerOptions.items}
                                loading={providerOptions.loading}
                                label="Proveedor"
                                required
                                placeholder="Razón social o identificación"
                                error={fieldState.error?.message}
                                helperText={
                                  providerOptions.loaded && !providerOptions.search && providerOptions.items.length === 0
                                    ? 'Ningún proveedor tiene contratos en un estado que admita facturas'
                                    : 'Solo proveedores con contratos que hoy admiten facturas'
                                }
                              />
                            )}
                          />
                        )}
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
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
                                onChange={changeContract}
                                onOptionChange={setPickedContract}
                                onSearch={contractOptions.setSearch}
                                options={prvId ? contractOptions.items : []}
                                loading={contractOptions.loading}
                                disabled={!prvId}
                                label="Contrato"
                                required
                                placeholder="Número, nombre u obra"
                                error={fieldState.error?.message}
                                helperText={
                                  !prvId
                                    ? 'Elige primero el proveedor'
                                    : contractOptions.loaded && !contractOptions.search && contractOptions.items.length === 0
                                      ? 'El proveedor no tiene contratos en un estado que admita facturas'
                                      : 'Contratos del proveedor que hoy admiten facturas'
                                }
                              />
                            )}
                          />
                        )}
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        {isEdit ? (
                          readOnlyField('Tipo', loaded.typeName)
                        ) : (
                          <Controller
                            name="type"
                            control={control}
                            render={({ field }) => (
                              <SearchSelect
                                value={field.value}
                                onChange={(value) => value && changeType(value)}
                                options={typeChoices.options}
                                loading={Boolean(contract) && !contractBalances}
                                disabled={!contract || !contractBalances}
                                disableClearable
                                label="Tipo de factura"
                                helperText={!contract ? 'Elige primero el contrato' : undefined}
                              />
                            )}
                          />
                        )}
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        {/* Con una obra fija en el encabezado, los contratos son de ella: se muestra desde el inicio. */}
                        {readOnlyField(
                          'Obra',
                          isEdit ? `${loaded.workCode} — ${loaded.workName}` : (contract?.workName ?? headerWork?.label)
                        )}
                      </Grid>
                    </>
                  )}

                  {simple && (
                    <>
                      <Grid size={{ xs: 12, md: 8 }}>
                        {isEdit || headerWork ? (
                          readOnlyField('Obra', isEdit ? `${loaded.workCode} — ${loaded.workName}` : headerWork.label)
                        ) : (
                          <Controller
                            name="wrkId"
                            control={control}
                            rules={{ required: 'Selecciona la obra.' }}
                            render={({ field, fieldState }) => (
                              <SearchSelect
                                value={field.value}
                                onChange={changeWork}
                                onSearch={workOptions.setSearch}
                                options={workOptions.items}
                                loading={workOptions.loading}
                                placeholder="Código o nombre"
                                label="Obra"
                                required
                                error={fieldState.error?.message}
                                helperText={
                                  workOptions.loaded && !workOptions.search && workOptions.items.length === 0
                                    ? presetPrvId
                                      ? 'El proveedor no está asignado a ninguna obra activa que veas'
                                      : 'No hay obras activas que veas'
                                    : presetPrvId
                                      ? 'Obras activas a las que está asignado el proveedor'
                                      : 'Solo obras activas'
                                }
                              />
                            )}
                          />
                        )}
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                          name="wksId"
                          control={control}
                          rules={{ validate: (value) => !stageRequired || Boolean(value) || 'Selecciona la etapa.' }}
                          render={({ field, fieldState }) => (
                            <SearchSelect
                              value={field.value}
                              onChange={field.onChange}
                              options={options.stages}
                              loading={loadingOptions}
                              disabled={!wrkId || withoutStages || lockDocument || blocked}
                              label="Etapa"
                              required={stageRequired}
                              error={fieldState.error?.message}
                              helperText={
                                !wrkId
                                  ? 'Elige primero la obra'
                                  : withoutStages
                                    ? 'La obra no tiene etapas activas: la factura se registra sin etapa'
                                    : ''
                              }
                            />
                          )}
                        />
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
                              options={simpleProviders}
                              loading={loadingOptions}
                              disabled={!wrkId || lockDocument || blocked}
                              label="Proveedor"
                              required
                              error={fieldState.error?.message}
                              helperText={
                                !wrkId
                                  ? 'Elige primero la obra'
                                  : noOptions && simpleProviders.length === 0
                                    ? `Ningún proveedor trabaja en esta obra como ${menu?.name ?? 'este tipo'}: asígnalo antes`
                                    : `Proveedores activos que trabajan en la obra como ${menu?.name ?? 'este tipo'}`
                              }
                            />
                          )}
                        />
                      </Grid>
                    </>
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
                          label="N.º de factura"
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
                  {/* Solo se muestra: la fija el acto Aprobar (ApproveInvoiceDialog), no el formulario. */}
                  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <DateField
                      value={loaded?.approvalDate ?? ''}
                      label="Fecha de aprobación"
                      disabled
                      helperText={loaded?.approvalDate ? undefined : 'Se fija al aprobar'}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Controller
                      name="voucherNumber"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="N.º de comprobante"
                          size="small"
                          fullWidth
                          disabled={blocked}
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

              {simple && (
                <FormSection
                  title="Importes"
                  subtitle="Valor y % IVA son obligatorios; los demás, vacíos, valen 0. El panel Detalle se calcula en el servidor con la misma fórmula que al guardar."
                >
                  <SimpleAmountsSection
                    control={control}
                    setValue={setValue}
                    readOnly={lockDocument || blocked}
                    required={!isEdit || Boolean(loaded?.amounts)}
                    onPreview={setPreview}
                    onError={showError}
                  />
                </FormSection>
              )}
              {hasAmounts(type) && (
                <AdvanceAmountsSection
                  control={control}
                  setValue={setValue}
                  type={type}
                  ctrId={ctrId}
                  invId={isEdit ? invId : undefined}
                  readOnly={lockDocument || blocked}
                  canAdjustRetention={canAdjustRetention}
                  onBalances={setBalances}
                  onError={showError}
                  taxField={isBillingInvoiceType(type) ? taxField : undefined}
                />
              )}
            </Stack>
          </Grid>
          {type && (
            <Grid size={{ xs: 12, md: 4 }} sx={{ alignSelf: { md: 'stretch' } }}>
              {simple ? (
                <InvoiceDetailPanel
                  stickyTop={hasAmounts(type) && balances ? cardsHeight + 2 * CARDS_GAP - DIALOG_PADDING : 0}
                  lines={preview?.lines ?? []}
                  total={preview?.total ?? ''}
                  warning={preview && !preview.valid && value ? preview.message : undefined}
                  note="TOTAL es el neto a pagar: descuenta las retenciones y el pronto pago."
                />
              ) : (
                <InvoiceDetailPanel
                  stickyTop={hasAmounts(type) && balances ? cardsHeight + 2 * CARDS_GAP - DIALOG_PADDING : 0}
                  {...(isBillingInvoiceType(type)
                    ? {
                        // Normal y liquidación (DEC-075): la composición del servidor.
                        lines: preview?.lines ?? [],
                        total: preview?.total ?? '',
                        warning: preview && !preview.valid && value ? preview.message : undefined,
                        note: 'TOTAL es el neto a pagar: descuenta las retenciones, la amortización, el retenido y el descuento de materiales.'
                      }
                    : {
                        lines: [{ key: 'value', label: type === 'ADVANCE' ? 'ANTICIPO' : 'DEVOLUCIÓN RETENIDO', value }],
                        total: value,
                        note: 'El anticipo y la devolución de retenido no llevan IVA ni retenciones tributarias.'
                      })}
                />
              )}
            </Grid>
          )}
        </Grid>
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
