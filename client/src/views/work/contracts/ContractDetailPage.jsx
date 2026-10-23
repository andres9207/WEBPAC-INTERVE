import { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { Controller, FormProvider, useWatch } from 'react-hook-form';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import SubCard from 'ui-component/cards/SubCard';
import ConfirmDialog from 'ui-component/extended/ConfirmDialog';
import ExportButton from 'ui-component/extended/ExportButton';
import { DataList, Figure, Pending, SummaryAside } from 'ui-component/extended/DetailBlocks';
import FormSection from 'ui-component/extended/FormSection';
import RouteDialog, { useRouteDialogAside } from 'ui-component/extended/RouteDialog';
import StatusChip from 'ui-component/extended/StatusChip';
import ConceptFields from './components/ConceptFields';
import ConceptsTab from './components/ConceptsTab';
import ContractDataForm, { AiuRequestField } from './components/ContractDataForm';
import PoliciesDraftEditor from './components/PoliciesDraftEditor';
import PoliciesTab from './components/PoliciesTab';
import SuspendDialog from './components/SuspendDialog';
import { FIELD_TAB, toForm, toPayload } from './components/contractForm';
import useContractForm from './components/useContractForm';
import ContractInvoicesTab from 'views/billing/invoices/components/ContractInvoicesTab';
import { contractsApi, exportContractAPI } from 'api/requests/contractsApi';
import { contractFileName } from './ContractsPage';
import { useAuth } from 'contexts/AuthContext';
import { useSocket } from 'socket/SocketProvider';
import { showError, showSuccess } from 'services/ToastService';
import { newIdempotencyKey } from 'utils/idempotency';
import { fMoneyText } from 'utils/formatNumber';
import { fDateOnly, fDateTime } from 'utils/formatTime';
import { CONTRACT_STATE_COLORS, INVOICE_MODES, fTerm } from 'utils/constants';

/**
 * Un contrato en un solo modal (DEC-057), sobre el listado y con dirección
 * propia (DEC-034): `/work/contracts/new`, `/:ctrId` y `/:ctrId/edit` abren la
 * misma vista. La edición abre en "Datos del contrato"; el detalle, en
 * "Resumen". Todo lo calculado (valor vigente, fecha fin, anticipo y retenido
 * pactados) viene del servidor.
 *
 * - "Datos del contrato" es la cabecera editable (useContractForm). Su
 *   Guardar vive solo en esa pestaña: las demás tienen sus propios actos, que
 *   se guardan solos con su diálogo (otrosí y liquidación en Valor, pólizas,
 *   suspender en Suspensiones, facturas). Sin el permiso de editar, la
 *   pestaña no aparece; fuera de ejecución, se ve sin poder guardar.
 * - Al crear se ven todas las pestañas, pero solo se usan las del formulario:
 *   datos, valor inicial y pólizas (opcionales, con su permiso), con un solo
 *   Guardar que lo envía todo en una petición, con clave de idempotencia. Al
 *   guardar, la ruta pasa a `/:ctrId`, abre en Resumen y se habilitan las
 *   demás, sin salir del modal.
 * - Las pestañas del formulario están siempre montadas (ocultas con CSS) para
 *   que sus reglas se validen aunque no estén a la vista; la que tiene errores
 *   se marca con `*`, y la de datos con `•` si tiene cambios sin guardar.
 * - Guardar no es un submit del modal: un Enter en el buscador de facturas no
 *   debe guardar el contrato.
 * - El estado no se edita: lo cambian los actos. La suspensión se levanta
 *   registrando un otrosí en la pestaña Valor (DEC-039). Reabrir llega con la
 *   liquidación.
 * - Resumen al lado (DEC-057): donde cabe, el resumen es una columna fija a
 *   la izquierda (ContractAside) y no una pestaña; en pantallas chicas vuelve
 *   a ser la pestaña Resumen. Lee el mismo `contract` que recarga cada acto,
 *   así que se actualiza al registrar una póliza, un otrosí o una factura, al
 *   guardar los datos y cuando otro usuario cambia el contrato. Al crear no
 *   se muestra.
 */

const TABS = [
  { key: 'summary', label: 'Resumen' },
  { key: 'data', label: 'Datos del contrato', form: true },
  { key: 'value', label: 'Valor', newLabel: 'Valor inicial', form: true },
  { key: 'policies', label: 'Pólizas', form: true },
  { key: 'invoices', label: 'Facturas' },
  { key: 'documents', label: 'Documentos' },
  { key: 'suspensions', label: 'Suspensiones' },
  { key: 'history', label: 'Historial de estado' }
];

// Cambiar de contrato (o pasar de "nuevo" al creado) vuelve a montar la vista.
export default function ContractDetailPage() {
  const { ctrId } = useParams();
  return <ContractView key={ctrId ?? 'new'} />;
}

function ContractView() {
  const { ctrId: ctrIdParam } = useParams();
  const ctrId = Number(ctrIdParam) || 0;
  const isNew = ctrId === 0;
  const navigate = useNavigate();
  const location = useLocation();
  const socket = useSocket();
  // `returnTo`: abierto sobre otra pantalla (el tablero), cerrar vuelve a ella.
  const { refresh, returnTo = '/work/contracts' } = useOutletContext() ?? {};
  const { permissionsCatalog, hasPermission } = useAuth();
  const canDo = (perId) => perId != null && hasPermission(perId);
  const perms = permissionsCatalog.work?.contracts;
  const canEdit = isNew || canDo(perms?.edit);
  // Las pólizas se registran con el contrato solo al crearlo (PRO-BE-09).
  const canCreatePolicies = isNew && canDo(permissionsCatalog.work?.policies?.create);

  const [idempotencyKey] = useState(() => (isNew ? newIdempotencyKey() : null));
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState(() =>
    isNew || (canEdit && location.pathname.endsWith('/edit')) ? 'data' : (location.state?.tab ?? 'summary')
  );
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmLeave, setConfirmLeave] = useState(false);
  const [suspending, setSuspending] = useState(false);
  const [addingPolicy, setAddingPolicy] = useState(false);

  // Con el resumen al lado no hay pestaña Resumen: se abre en los datos (o en Valor, sin permiso de editar).
  const asideMode = useRouteDialogAside();
  useEffect(() => {
    if (asideMode && tab === 'summary') setTab(canEdit ? 'data' : 'value');
  }, [asideMode, tab, canEdit]);

  const form = useContractForm({ ctrId, isNew, contract });
  const { methods, resetEndDate } = form;
  const { control, handleSubmit, reset, formState } = methods;
  const { errors, isDirty } = formState;
  // Recargar el contrato (un otrosí, una póliza, otro usuario) no pisa lo que se está editando.
  const dirtyRef = useRef(false);
  dirtyRef.current = isDirty;

  const load = useCallback(
    async ({ resetForm = !dirtyRef.current } = {}) => {
      try {
        const { data } = await contractsApi.getById({ ctrId });
        setContract(data);
        if (resetForm) {
          reset(toForm(data));
          resetEndDate(data.endDate);
        }
        return data;
      } catch (err) {
        showError(err.response?.data?.message || 'Error al cargar el contrato');
        if (err.response?.status === 404) navigate(returnTo, { replace: true });
        return null;
      }
    },
    [ctrId, reset, resetEndDate, navigate, returnTo]
  );

  useEffect(() => {
    if (isNew) return;
    setLoading(true);
    load({ resetForm: true }).finally(() => setLoading(false));
  }, [isNew, load]);

  // Otro usuario registró un otrosí o cambió el contrato: se recarga.
  useEffect(() => {
    if (!socket || isNew) return undefined;
    const reload = () => load();
    socket.on('refresh-contracts', reload);
    return () => socket.off('refresh-contracts', reload);
  }, [socket, isNew, load]);

  const policiesDraft = useWatch({ control, name: 'policies' });

  const close = () => navigate(returnTo);
  // Cerrar con la X, Escape o el fondo pide confirmar si hay cambios sin guardar.
  const requestClose = () => (isDirty ? setConfirmLeave(true) : close());

  const tabOfField = (field) => FIELD_TAB[field] ?? 'data';
  const errorTabs = new Set(Object.keys(errors).map(tabOfField));

  const onSave = async (values) => {
    setSaving(true);
    try {
      const { data } = await contractsApi.save(toPayload(ctrId, values, form.descriptors), isNew ? idempotencyKey : undefined);
      showSuccess(data.message || 'Guardado correctamente.');
      refresh?.();
      if (isNew) {
        navigate(`/work/contracts/${data.ctrId}`, { replace: true, state: { tab: 'summary' } });
        return;
      }
      await load({ resetForm: true });
    } catch (err) {
      showError(err.response?.data?.message || 'Error al guardar el contrato');
    } finally {
      setSaving(false);
    }
  };

  // Lleva a la primera pestaña (en el orden de TABS) con un campo inválido.
  const onInvalid = (invalid) => {
    const tabs = new Set(Object.keys(invalid).map(tabOfField));
    const first = TABS.find((t) => tabs.has(t.key));
    if (first) setTab(first.key);
  };

  const save = handleSubmit(onSave, onInvalid);

  if (!isNew && (loading || !contract)) return <RouteDialog onClose={close} loading />;

  const blocked = !isNew && !contract.allowedActions.includes('editContract');
  const inactiveWork = isNew && form.headerWork != null && form.headerWork.active === false;
  // Guardar solo donde se edita: al crear, en todas las pestañas del formulario; después, en la de datos.
  const showSave = canEdit && (isNew || tab === 'data');

  const changed = () => {
    load();
    refresh?.();
  };

  const suspended = () => {
    setSuspending(false);
    changed();
  };

  const remove = async () => {
    try {
      const { data } = await contractsApi.remove({ ctrId: contract.ctrId });
      showSuccess(data.message);
      refresh?.();
      close();
    } catch (err) {
      showError(err.response?.data?.message || 'No se pudo eliminar el contrato');
    }
  };

  const visibleTabs = TABS.filter((t) => (t.key !== 'data' || canEdit) && (t.key !== 'summary' || !asideMode));
  // Al crear, solo las pestañas del formulario: el resto necesita el contrato guardado.
  const enabled = (t) => !isNew || (t.form && (t.key !== 'policies' || canCreatePolicies));

  const tabBadge = isNew
    ? { policies: policiesDraft.length }
    : {
        value: contract.concepts.length,
        history: contract.history.length,
        suspensions: contract.suspensions.length,
        policies: contract.currentPolicies,
        documents: 0
      };

  const hidden = (key) => ({ display: tab === key ? 'block' : 'none' });
  const open = contract?.openSuspension;
  const canSuspend = !isNew && canDo(perms?.suspend) && contract.allowedActions.includes('suspend');

  return (
    <RouteDialog
      onClose={requestClose}
      closeLabel={isDirty ? 'Cerrar sin guardar' : 'Cerrar'}
      labelledBy="contract-title"
      aside={asideMode && !isNew ? <ContractAside contract={contract} /> : undefined}
      header={
        isNew ? (
          <>
            <Typography id="contract-title" variant="h3" component="h2">
              Nuevo contrato
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Datos del contrato, su valor inicial y, si hay, sus pólizas. Al guardarlo se habilitan las demás pestañas. Los campos con *
              son obligatorios.
            </Typography>
          </>
        ) : (
          <>
            <Stack direction="row" sx={{ flexWrap: 'wrap', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
              <Typography id="contract-title" variant="h3" component="h2">
                {contract.number} · {contract.name}
              </Typography>
              <StatusChip staId={contract.state} label={contract.stateName} scope={null} colorMap={CONTRACT_STATE_COLORS} />
              {contract.contractType && <Chip label={contract.contractType} size="small" color="primary" variant="outlined" />}
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {contract.workCode} {contract.workName} · {contract.providerName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Modificado el {fDateTime(contract.updatedAt)} por {contract.updatedByName ?? '—'}
            </Typography>
          </>
        )
      }
      tabs={
        <Tabs value={tab} onChange={(_, value) => setTab(value)} variant="scrollable" scrollButtons="auto" aria-label="Partes del contrato">
          {visibleTabs.map((t) => (
            <Tab
              key={t.key}
              value={t.key}
              disabled={!enabled(t)}
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box component="span" sx={errorTabs.has(t.key) ? { color: 'error.main' } : undefined}>
                    {isNew && t.newLabel ? t.newLabel : t.label}
                    {errorTabs.has(t.key) && ' *'}
                    {!isNew && t.key === 'data' && isDirty && (
                      <Box component="span" title="Cambios sin guardar" sx={{ color: 'secondary.main' }}>
                        {' •'}
                      </Box>
                    )}
                  </Box>
                  {enabled(t) && tabBadge[t.key] !== undefined && <Chip label={tabBadge[t.key]} size="small" color="default" />}
                </Stack>
              }
            />
          ))}
        </Tabs>
      }
      footer={
        <>
          {!isNew && canDo(perms?.delete) && (
            <Button variant="outlined" color="error" onClick={() => setConfirmDelete(true)} disabled={saving}>
              Eliminar
            </Button>
          )}
          {!isNew && canDo(perms?.export) && (
            <ExportButton request={(format) => exportContractAPI(contract.ctrId, format)} fileName={contractFileName(contract.number)} />
          )}
          <Box sx={{ flexGrow: 1 }} />
          {showSave && !isNew && isDirty && (
            <Button
              color="inherit"
              onClick={() => {
                reset();
                resetEndDate(contract.endDate);
              }}
              disabled={saving}
            >
              Descartar cambios
            </Button>
          )}
          <Button variant="outlined" color="inherit" onClick={requestClose} disabled={saving}>
            {isNew ? 'Cancelar' : 'Cerrar'}
          </Button>
          {showSave && (
            <Button
              variant="contained"
              color="secondary"
              onClick={save}
              disabled={saving || blocked || inactiveWork || !form.fieldsReady || (!isNew && !isDirty)}
            >
              {saving ? 'Guardando…' : isNew ? 'Guardar' : 'Guardar cambios'}
            </Button>
          )}
        </>
      }
    >
      <FormProvider {...methods}>
        {errorTabs.size > 0 && (
          <Alert severity="error" role="alert" sx={{ mb: 2 }}>
            Revisa los campos marcados antes de guardar. Las pestañas con errores llevan *.
          </Alert>
        )}

        {tab === 'summary' && contract && <ContractSummary contract={contract} />}

        {/* Pestañas del formulario: montadas siempre, para que sus campos se validen aunque no estén a la vista. */}
        {canEdit && (
          <Box sx={hidden('data')}>
            <ContractDataForm form={form} contract={contract} isNew={isNew} blocked={blocked} />
          </Box>
        )}

        {isNew ? (
          <Box sx={hidden('value')}>
            <FormSection title="Valor inicial" subtitle="Todo contrato nace con su valor inicial. Su fecha es la de inicio del contrato.">
              {form.fieldsReady ? (
                <Stack spacing={2}>
                  {form.showAiu && <AiuRequestField form={form} />}
                  <ConceptFields control={control} prefix="initialConcept." fields={form.conceptFields} />
                </Stack>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Elige el proveedor y su tipo en «Datos del contrato» para capturar el valor inicial: sus porcentajes dependen de la
                  configuración de ese tipo.
                </Typography>
              )}
            </FormSection>
          </Box>
        ) : (
          tab === 'value' && <ConceptsTab contract={contract} onChanged={changed} />
        )}

        {isNew
          ? canCreatePolicies && (
              <Box sx={hidden('policies')}>
                <FormSection
                  title="Pólizas"
                  subtitle="Opcionales. Amparan el valor inicial, una por tipo, y se registran con el contrato."
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
              </Box>
            )
          : tab === 'policies' && <PoliciesTab contract={contract} onChanged={changed} />}

        {tab === 'history' && contract && <StateHistory history={contract.history} />}

        {tab === 'suspensions' && contract && (
          <Stack spacing={2}>
            <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                {open
                  ? `Suspendido desde el ${fDateOnly(open.suspensionDate)}. Se reanuda registrando un otrosí en la pestaña Valor.`
                  : 'Solo se suspende un contrato en ejecución. Lo reanuda un otrosí, registrado en la pestaña Valor.'}
              </Typography>
              {canSuspend && (
                <Button variant="contained" color="lilac" sx={{ border: 1, borderColor: 'lilac.200' }} onClick={() => setSuspending(true)}>
                  Suspender
                </Button>
              )}
            </Stack>
            <Suspensions suspensions={contract.suspensions} />
          </Stack>
        )}

        {tab === 'invoices' && contract && <ContractInvoicesTab contract={contract} />}
        {tab === 'documents' && contract && (
          <Pending
            title="Todavía no hay documentos en este contrato."
            text="Aquí se adjuntarán los soportes del contrato. Llega con los adjuntos por entidad (PRO-FE-18)."
          />
        )}
      </FormProvider>

      {contract && (
        <SuspendDialog
          open={suspending}
          contract={{ ctrId: contract.ctrId, number: contract.number, startDate: contract.startDate }}
          onClose={() => setSuspending(false)}
          onSaved={suspended}
        />
      )}

      {contract && (
        <ConfirmDialog
          open={confirmDelete}
          onClose={() => setConfirmDelete(false)}
          onConfirm={remove}
          title="Eliminar contrato"
          message={`¿Eliminar el contrato "${contract.number} — ${contract.name}"? Se conserva en el historial con sus conceptos, y su número queda libre en la obra.`}
          confirmLabel="Eliminar"
          confirmColor="error"
        />
      )}

      <ConfirmDialog
        open={confirmLeave}
        onClose={() => setConfirmLeave(false)}
        onConfirm={close}
        title="Descartar cambios"
        message="Hay cambios sin guardar en el contrato. ¿Salir sin guardarlos?"
        confirmLabel="Descartar"
      />
    </RouteDialog>
  );
}

function ContractSummary({ contract }) {
  const amendments = contract.concepts.filter((c) => c.type === 'AMENDMENT').length;
  const open = contract.openSuspension;

  const figures = [
    { label: 'Valor vigente', value: fMoneyText(contract.currentValue), hint: `Suma de ${contract.concepts.length} concepto(s)` },
    {
      label: 'Fecha fin',
      value: fDateOnly(contract.endDate),
      // Suspendido: congelada hasta reanudar, cuando se suman los días (PRO-BE-10).
      hint: contract.endDateProvisional
        ? 'Provisional: el contrato está suspendido; al reanudarlo se suman los días de la suspensión'
        : 'Calculada: inicio + plazo + prórrogas + días suspendidos'
    },
    {
      label: 'Plazo',
      value: fTerm(contract.term, contract.termUnit),
      hint: contract.totalExtensions ? `+ ${fTerm(contract.totalExtensions, contract.termUnit)} de prórrogas` : 'Sin prórrogas'
    },
    { label: 'Anticipo pactado', value: fMoneyText(contract.advance), hint: 'Suma del anticipo de cada concepto' },
    { label: 'Retenido pactado', value: fMoneyText(contract.retention), hint: 'Suma del retenido de cada concepto' },
    {
      label: 'Otrosí',
      value: String(amendments),
      hint: contract.hasLiquidation ? 'Con otrosí de liquidación' : 'Sin otrosí de liquidación'
    }
  ];

  return (
    <Stack spacing={2}>
      {open && (
        <Alert severity="warning" color="lilac">
          <strong>Suspendido desde el {fDateOnly(open.suspensionDate)}</strong> · {open.reasonName}. Condición para reanudar:{' '}
          {open.liftCondition}. Se reanuda registrando un otrosí en la pestaña Valor.
        </Alert>
      )}
      <Grid container spacing={1.5}>
        {figures.map((figure) => (
          <Grid key={figure.label} size={{ xs: 12, sm: 6, md: 4 }}>
            <Figure {...figure} />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <SubCard title="Datos contractuales">
            <DataList
              items={[
                ['Número', contract.number],
                ['Nombre', contract.name],
                ['Obra', `${contract.workCode} — ${contract.workName}`],
                ['Etapa', contract.stageName],
                ['Proveedor', `${contract.providerName} · ${contract.providerIdentification}`],
                ['Tipo de contrato', contract.contractType],
                ['Tipo de proveedor', contract.providerTypeName],
                // El menú de sus facturas es su tipo de proveedor (DEC-074).
                [
                  'Menú de facturas',
                  contract.invoiceMode === INVOICE_MODES.CONTRACT
                    ? `${contract.providerTypeName}${contract.invoiceMenu ? '' : ' (oculto en el menú)'}`
                    : 'No admite facturas'
                ],
                ['AIU', contract.aiuRequested === false ? 'No solicitado' : 'Solicitado'],
                ['Observaciones', contract.observation]
              ]}
            />
          </SubCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SubCard title="Plazo">
            <DataList
              items={[
                ['Fecha de inicio', fDateOnly(contract.startDate)],
                ['Plazo', fTerm(contract.term, contract.termUnit)],
                ['Prórrogas de otrosí', contract.totalExtensions ? fTerm(contract.totalExtensions, contract.termUnit) : 'Sin prórrogas'],
                ['Días suspendidos', String(contract.suspendedDays)],
                [
                  'Fecha fin',
                  `${fDateOnly(contract.endDate)} (${contract.endDateProvisional ? 'provisional hasta reanudar' : 'calculada por el sistema'})`
                ],
                ['Estado', contract.stateName],
                ['Creado', `${fDateTime(contract.createdAt)} por ${contract.createdByName ?? '—'}`]
              ]}
            />
          </SubCard>
        </Grid>
      </Grid>
    </Stack>
  );
}

/** Resumen compacto del contrato, en la columna fija del modal. */
function ContractAside({ contract }) {
  const open = contract.openSuspension;
  return (
    <SummaryAside
      notice={
        open && (
          <Alert severity="warning" color="lilac" sx={{ py: 0 }}>
            Suspendido desde el {fDateOnly(open.suspensionDate)}
          </Alert>
        )
      }
      figures={[
        { label: 'Valor vigente', value: fMoneyText(contract.currentValue), hint: `${contract.concepts.length} concepto(s)` },
        {
          label: 'Fecha fin',
          value: fDateOnly(contract.endDate),
          hint: contract.endDateProvisional ? 'Provisional hasta reanudar' : undefined
        },
        {
          label: 'Plazo',
          value: fTerm(contract.term, contract.termUnit),
          hint: contract.totalExtensions ? `+ ${fTerm(contract.totalExtensions, contract.termUnit)} de prórrogas` : undefined
        },
        { label: 'Anticipo pactado', value: fMoneyText(contract.advance) },
        { label: 'Retenido pactado', value: fMoneyText(contract.retention) },
        { label: 'Pólizas vigentes', value: String(contract.currentPolicies ?? 0) }
      ]}
      items={[
        ['Proveedor', contract.providerName],
        ['Obra', `${contract.workCode} — ${contract.workName}`],
        ['Etapa', contract.stageName],
        ['Tipo de proveedor', contract.providerTypeName],
        ['Tipo de contrato', contract.contractType],
        ['AIU', contract.aiuRequested === false ? 'No solicitado' : 'Solicitado']
      ]}
    />
  );
}

function StateHistory({ history }) {
  return (
    <Box
      component="ol"
      sx={{ listStyle: 'none', p: 0, m: 0, border: '1px solid', borderColor: 'divider', borderRadius: 2, bgcolor: 'background.paper' }}
    >
      {history.map((h, i) => (
        <Stack
          key={h.cshId}
          component="li"
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 0.5, sm: 2 }}
          sx={{ px: 2, py: 1.5, borderBottom: i < history.length - 1 ? '1px solid' : 'none', borderColor: 'divider' }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ minWidth: 150 }}>
            {fDateTime(h.createdAt)}
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">
              {h.fromStateName ? `${h.fromStateName} → ${h.toStateName}` : `Creado en ${h.toStateName.toLowerCase()}`}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {h.origin === 'AUTOMATIC' ? 'Automática' : 'Manual'} · {h.createdByName ?? '—'}
              {h.reasonName ? ` · Motivo: ${h.reasonName}` : ''}
              {h.observation ? ` · ${h.observation}` : ''}
            </Typography>
          </Box>
        </Stack>
      ))}
    </Box>
  );
}

function Suspensions({ suspensions }) {
  if (suspensions.length === 0)
    return (
      <Pending
        title="El contrato no ha tenido suspensiones."
        text="Aquí se verá cada suspensión con su motivo, sus fechas y los días que sumó al plazo."
      />
    );
  return (
    <Stack spacing={1.5}>
      {suspensions.map((s) => (
        <SubCard
          key={s.cspId}
          title={
            <Stack direction="row" spacing={1} alignItems="center">
              <span>{s.reasonName}</span>
              <Chip size="small" color={s.open ? 'warning' : 'default'} label={s.open ? 'Abierta' : `${s.days} día(s)`} />
            </Stack>
          }
        >
          <DataList
            items={[
              ['Suspendido el', fDateOnly(s.suspensionDate)],
              ['Reanudado el', s.liftDate ? `${fDateOnly(s.liftDate)} con el otrosí N.º ${s.amendmentNumber}` : 'Sigue suspendido'],
              ['Condición de levantamiento', s.liftCondition],
              ['Genera informe de interventoría', s.requiresReport ? 'Sí' : 'No'],
              ['Observación', s.observation],
              ['Registrada', `${fDateTime(s.createdAt)} por ${s.createdByName ?? '—'}`]
            ]}
          />
        </SubCard>
      ))}
    </Stack>
  );
}

ContractSummary.propTypes = { contract: PropTypes.object.isRequired };
ContractAside.propTypes = { contract: PropTypes.object.isRequired };
StateHistory.propTypes = { history: PropTypes.array.isRequired };
Suspensions.propTypes = { suspensions: PropTypes.array.isRequired };
