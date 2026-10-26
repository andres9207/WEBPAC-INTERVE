import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { Controller, useForm, useWatch } from 'react-hook-form';

import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import SubCard from 'ui-component/cards/SubCard';
import ConfirmDialog from 'ui-component/extended/ConfirmDialog';
import ContactsEditor from 'ui-component/extended/ContactsEditor';
import { DataList, Figure, Pending, SummaryAside } from 'ui-component/extended/DetailBlocks';
import EditableList from 'ui-component/extended/EditableList';
import FormSection from 'ui-component/extended/FormSection';
import RouteDialog, { useRouteDialogAside } from 'ui-component/extended/RouteDialog';
import StatusChip from 'ui-component/extended/StatusChip';
import ContactsList from 'ui-component/extended/ContactsList';
import FinishWorkDialog from './components/FinishWorkDialog';
import ManagerDialog from './components/ManagerDialog';
import ManagersTable from './components/ManagersTable';
import WorkDataForm from './components/WorkDataForm';
import { EMPTY_FORM, FIELD_TAB, rowKey, toForm, toPayload, validateManagers, validateStages } from './components/workForm';
import WorkProvidersTab from 'views/work/providers/components/WorkProvidersTab';
import WorkContractsTab from 'views/work/contracts/components/WorkContractsTab';
import InvoicesTab from 'views/billing/invoices/components/InvoicesTab';
import NewSimpleInvoiceButton from 'views/billing/invoices/components/NewSimpleInvoiceButton';
import { changeWorkStateAPI, getWorkManagersSelectAPI, previewWorkEndDateAPI, worksApi } from 'api/requests/worksApi';
import { useAuth } from 'contexts/AuthContext';
import { useWorkScope } from 'contexts/WorkScopeContext';
import useEndDatePreview from 'hooks/useEndDatePreview';
import { showError, showInfo, showSuccess } from 'services/ToastService';
import { newIdempotencyKey } from 'utils/idempotency';
import { fMoneyText } from 'utils/formatNumber';
import { fDateOnly, fDateTime } from 'utils/formatTime';
import { STATUS, STATUS_OPTIONS, fTerm } from 'utils/constants';

/**
 * Una obra en un solo modal (DEC-057), sobre el listado y con dirección propia
 * (DEC-034): `/work/works/new`, `/:wrkId` y `/:wrkId/edit` abren la misma
 * vista. La edición abre en la pestaña "Datos de la obra"; el detalle, en
 * "Resumen".
 *
 * - Datos de la obra, responsables, etapas y contactos se editan en su
 *   pestaña y se guardan juntos con un solo botón, en una petición (el
 *   servidor guarda las colecciones por diferencial). Sin el permiso de
 *   editar, esas pestañas son de consulta y "Datos de la obra" no aparece.
 * - Al crear solo están esas cuatro pestañas; el resto se habilita al guardar,
 *   sin salir del modal. Crear lleva clave de idempotencia.
 * - Guardar no es un submit del modal: un Enter en los buscadores de las
 *   pestañas de proveedores o facturas no debe guardar la obra.
 * - Si la validación falla, se marca la pestaña con errores y se va a la
 *   primera.
 * - Lo que se muestra lo calcula el servidor (valor vigente, fecha final).
 *   Activar, desactivar y eliminar viven aquí, no en el listado. Proveedores,
 *   contratos y facturas tienen sus propios endpoints (DEC-031, DEC-035,
 *   DEC-042).
 * - Resumen al lado (DEC-057): donde cabe, el resumen es una columna fija a la
 *   izquierda y no una pestaña; en pantallas chicas vuelve a ser la pestaña.
 *   Lee la misma `work` que se recarga al guardar y con cada acto de sus
 *   pestañas. Al crear no se muestra.
 */

const TABS = [
  { key: 'summary', label: 'Resumen' },
  { key: 'data', label: 'Datos de la obra', form: true },
  { key: 'managers', label: 'Responsables', form: true },
  { key: 'stages', label: 'Etapas', form: true },
  { key: 'providers', label: 'Proveedores' },
  { key: 'contacts', label: 'Contactos', form: true },
  { key: 'contracts', label: 'Contratos' },
  { key: 'invoices', label: 'Facturas' }
];

// Parámetros de la vista previa de la fecha final (preview_work_end_date).
const workEndParams = ({ startDate, term, termUnit }) => ({ startDate, initialTerm: term, termUnit });

const initials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();

// Cambiar de obra (o pasar de "nueva" a la creada) vuelve a montar la vista.
export default function WorkDetailPage() {
  const { wrkId } = useParams();
  return <WorkView key={wrkId ?? 'new'} />;
}

function WorkView() {
  const { wrkId: wrkIdParam } = useParams();
  const wrkId = Number(wrkIdParam) || 0;
  const isNew = wrkId === 0;
  const navigate = useNavigate();
  const location = useLocation();
  // `returnTo`: abierta sobre otra pantalla (el tablero), cerrar vuelve a ella.
  const { refresh, returnTo = '/work/works' } = useOutletContext() ?? {};
  const { focusWork } = useWorkScope();
  const { permissionsCatalog, hasPermission } = useAuth();
  const canDo = (perId) => perId != null && hasPermission(perId);
  const perms = permissionsCatalog.work?.works;
  // La factura simple se imputa a una etapa de la obra (DEC-058): se registra desde aquí.
  const canEdit = isNew || canDo(perms?.edit);
  const canAssign = canDo(perms?.assignManager);
  const canRemoveManager = canDo(perms?.removeManager);
  const canManageStages = canDo(perms?.manageStages);

  const [idempotencyKey] = useState(() => (isNew ? newIdempotencyKey() : null));
  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState(() =>
    isNew || (canEdit && location.pathname.endsWith('/edit')) ? 'data' : (location.state?.tab ?? 'summary')
  );
  const [confirm, setConfirm] = useState(null);
  const [finishing, setFinishing] = useState(false);
  const [confirmLeave, setConfirmLeave] = useState(false);
  const [userOptions, setUserOptions] = useState([]);
  const [managerDialog, setManagerDialog] = useState(null);
  const [addingContact, setAddingContact] = useState(false);

  // Con el resumen al lado no hay pestaña Resumen: se abre en los datos (o en Responsables, sin permiso de editar).
  const asideMode = useRouteDialogAside();
  useEffect(() => {
    if (asideMode && tab === 'summary') setTab(canEdit ? 'data' : 'managers');
  }, [asideMode, tab, canEdit]);

  const { control, handleSubmit, reset, setValue, getValues, formState } = useForm({ defaultValues: EMPTY_FORM });
  const { errors, isDirty, isSubmitted } = formState;
  const endPreview = useEndDatePreview(previewWorkEndDateAPI, workEndParams);
  const resetEndDate = endPreview.reset;
  // Recargar la obra (cambio de estado, proveedores) no pisa lo que se está editando.
  const dirtyRef = useRef(false);
  dirtyRef.current = isDirty;

  const load = useCallback(
    async ({ resetForm = !dirtyRef.current } = {}) => {
      try {
        const { data } = await worksApi.getById({ wrkId });
        setWork(data);
        if (resetForm) {
          reset(toForm(data));
          resetEndDate(data.endDate);
        }
        return data;
      } catch (err) {
        showError(err.response?.data?.message || 'Error al cargar la obra');
        if (err.response?.status === 404) navigate(returnTo, { replace: true });
        return null;
      }
    },
    [wrkId, reset, resetEndDate, navigate, returnTo]
  );

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const [candidates, current] = await Promise.all([
          canEdit ? getWorkManagersSelectAPI().then((res) => res.data) : Promise.resolve([]),
          isNew ? Promise.resolve(null) : load({ resetForm: true })
        ]);
        // Candidatos activos, más los responsables actuales aunque su usuario esté inactivo.
        const inactive = (current?.managers ?? [])
          .filter((m) => !candidates.some((c) => c.value === m.useId))
          .map((m) => ({ value: m.useId, label: `${m.name ?? `Usuario ${m.useId}`} (usuario inactivo)` }));
        setUserOptions([...candidates, ...inactive]);
      } catch (err) {
        showError(err.response?.data?.message || 'Error al cargar los responsables');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [canEdit, isNew, load]);

  const [managers, stages, contacts] = useWatch({ control, name: ['managers', 'stages', 'contacts'] });

  const dialogUserOptions = useMemo(() => {
    const taken = new Set(managers.filter((m) => m.key !== managerDialog?.manager?.key).map((m) => m.useId));
    return userOptions.filter((o) => !taken.has(o.value));
  }, [userOptions, managers, managerDialog]);

  const close = () => navigate(returnTo);
  // Cerrar con la X, Escape o el fondo pide confirmar si hay cambios sin guardar.
  const requestClose = () => (isDirty ? setConfirmLeave(true) : close());

  const saveManager = (row) => {
    const list = getValues('managers');
    const next = row.key ? list.map((m) => (m.key === row.key ? row : m)) : [...list, { ...row, key: rowKey('m') }];
    setValue('managers', next, { shouldDirty: true, shouldValidate: isSubmitted });
    setManagerDialog(null);
  };

  const removeManager = (row) =>
    setValue(
      'managers',
      getValues('managers').filter((m) => m.key !== row.key),
      { shouldDirty: true, shouldValidate: isSubmitted }
    );

  const addStage = () => {
    const list = getValues('stages');
    setValue('stages', [...list, { key: rowKey('s'), name: '', order: list.length + 1, staId: STATUS.ACTIVE }], { shouldDirty: true });
  };

  const tabOfField = (field) => FIELD_TAB[field] ?? 'data';
  const errorTabs = new Set(Object.keys(errors).map(tabOfField));

  const onSave = async (form) => {
    setSaving(true);
    try {
      const { data } = await worksApi.save(toPayload(wrkId, form), isNew ? idempotencyKey : undefined);
      showSuccess(data.message || 'Guardado correctamente.');
      refresh?.();
      if (!isNew) {
        await load({ resetForm: true });
        return;
      }
      // La obra nueva queda fuera de la obra elegida en el encabezado: se
      // cambia a ella antes de abrirla (DEC-047). Se abre en el resumen, con
      // todas las pestañas habilitadas.
      const go = () => navigate(`/work/works/${data.wrkId}`, { replace: true, state: { tab: 'summary' } });
      const focused = await focusWork(data.wrkId, go).catch(() => false);
      if (!focused) {
        showInfo('La obra se creó, pero no está en tu selector de obras: solo la ven sus responsables.');
        close();
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Error al guardar la obra');
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

  if (loading || (!isNew && !work)) return <RouteDialog onClose={close} loading />;

  const active = work?.staId === STATUS.ACTIVE;
  const activeManagers = (work?.managers ?? []).filter((m) => m.staId === STATUS.ACTIVE);
  const mainManager = activeManagers.find((m) => m.role === 'MAIN');

  const changeStatus = async () => {
    const { data } = await worksApi.changeStatus({ wrkId: work.wrkId, staId: active ? STATUS.INACTIVE : STATUS.ACTIVE });
    showSuccess(data.message);
    load();
    refresh?.();
  };

  // Ciclo de vida (DEC-083): finalizar pide la fecha en su diálogo; reabrir solo confirma.
  const finished = work?.state === 'FINISHED';
  const stateChanged = () => {
    setFinishing(false);
    load();
    refresh?.();
  };
  const reopen = async () => {
    const { data } = await changeWorkStateAPI({ wrkId: work.wrkId, state: 'IN_PROGRESS' });
    showSuccess(data.message);
    stateChanged();
  };
  const askReopen = () =>
    setConfirm({
      title: 'Reabrir obra',
      message: `¿Reabrir "${work.code} — ${work.name}"? Vuelve a estar en curso y se borra su fecha de finalización.`,
      label: 'Reabrir',
      color: 'secondary',
      run: reopen
    });

  const remove = async () => {
    const { data } = await worksApi.remove({ wrkId: work.wrkId });
    showSuccess(data.message);
    refresh?.();
    close();
  };

  const runConfirmed = async () => {
    try {
      await confirm.run();
    } catch (err) {
      showError(err.response?.data?.message || 'No se pudo completar la acción');
    }
  };

  const askStatus = () =>
    active
      ? setConfirm({
          title: 'Desactivar obra',
          message: `¿Desactivar "${work.code} — ${work.name}"? No se podrá asignar a contratos nuevos; los que ya la tienen la conservan.`,
          label: 'Desactivar',
          color: 'warning',
          run: changeStatus
        })
      : changeStatus().catch((err) => showError(err.response?.data?.message || 'Error al activar la obra'));

  const askDelete = () =>
    setConfirm({
      title: 'Eliminar obra',
      message: `¿Eliminar "${work.code} — ${work.name}"? Se conserva en el historial y su código no se podrá reutilizar. Si la obra tiene contratos, no se puede eliminar.`,
      label: 'Eliminar',
      color: 'error',
      run: remove
    });

  const providersChanged = () => {
    load();
    refresh?.();
  };

  const visibleTabs = TABS.filter((t) => (t.key !== 'data' || canEdit) && (t.key !== 'summary' || !asideMode));
  // Al crear, solo las pestañas del formulario: el resto necesita la obra guardada.
  const enabled = (t) => !isNew || t.form;

  const tabBadge = canEdit
    ? { managers: managers.length, stages: stages.length, contacts: contacts.length }
    : { managers: work.managers.length, stages: work.stages.length, contacts: work.contacts.length };
  if (work) Object.assign(tabBadge, { providers: work.providersCount, contracts: work.contractsCount });

  const hidden = (key) => ({ display: tab === key ? 'block' : 'none' });

  return (
    <RouteDialog
      onClose={requestClose}
      closeLabel={isDirty ? 'Cerrar sin guardar' : 'Cerrar'}
      labelledBy="work-title"
      aside={
        asideMode && !isNew ? (
          <SummaryAside
            figures={[
              {
                label: 'Valor vigente',
                value: fMoneyText(work.currentValue),
                hint: work.extendedValue ? 'Valor ampliado' : 'Valor inicial'
              },
              {
                label: 'Plazo inicial',
                value: fTerm(work.initialTerm, work.termUnit),
                hint: work.endDate ? `Termina el ${fDateOnly(work.endDate)}` : undefined
              },
              { label: 'Costo directo', value: fMoneyText(work.directCost) },
              {
                label: 'Responsables activos',
                value: String(activeManagers.length),
                hint: `Principal: ${mainManager?.name ?? 'sin asignar'}`
              },
              { label: 'Etapas', value: String(work.stages.length) },
              { label: 'Proveedores', value: String(work.providersCount ?? 0) },
              { label: 'Contratos', value: String(work.contractsCount ?? 0) }
            ]}
            items={[
              ['Constructora', work.constructionCompany],
              ['Tipo de contrato', work.contractType],
              ['Tipo de interventoría', work.supervisionType]
            ]}
          />
        ) : undefined
      }
      header={
        isNew ? (
          <>
            <Typography id="work-title" variant="h3" component="h2">
              Nueva obra
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Datos, responsables, etapas y contactos. Al guardar la obra se habilitan el resumen, los proveedores, los contratos y las
              facturas. Los campos con * son obligatorios.
            </Typography>
          </>
        ) : (
          <>
            <Stack direction="row" sx={{ flexWrap: 'wrap', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
              <Typography id="work-title" variant="h3" component="h2">
                {work.code} · {work.name}
              </Typography>
              <StatusChip staId={work.staId} label={active ? 'Activa' : 'Inactiva'} />
              {work.state === 'FINISHED' && (
                <Chip size="small" color="default" variant="outlined" label={`${work.stateName} el ${fDateOnly(work.finishDate)}`} />
              )}
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {work.constructionCompany} · {work.contractType} · Interventoría {work.supervisionType?.toLowerCase()}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Modificada el {fDateTime(work.updatedAt)} por {work.updatedByName ?? '—'}
            </Typography>
          </>
        )
      }
      tabs={
        <Tabs value={tab} onChange={(_, value) => setTab(value)} variant="scrollable" scrollButtons="auto" aria-label="Partes de la obra">
          {visibleTabs.map((t) => (
            <Tab
              key={t.key}
              value={t.key}
              disabled={!enabled(t)}
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box component="span" sx={errorTabs.has(t.key) ? { color: 'error.main' } : undefined}>
                    {t.label}
                    {errorTabs.has(t.key) && ' *'}
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
            <Button variant="outlined" color="error" onClick={askDelete} disabled={saving}>
              Eliminar
            </Button>
          )}
          {!isNew && canDo(perms?.changeStatus) && (
            <Button variant="outlined" color="inherit" onClick={askStatus} disabled={saving}>
              {active ? 'Desactivar' : 'Activar'}
            </Button>
          )}
          {!isNew && canDo(perms?.changeStatus) && (
            <Button variant="outlined" color="secondary" onClick={finished ? askReopen : () => setFinishing(true)} disabled={saving}>
              {finished ? 'Reabrir obra' : 'Finalizar obra'}
            </Button>
          )}
          <Box sx={{ flexGrow: 1 }} />
          {!isNew && isDirty && (
            <Button
              color="inherit"
              onClick={() => {
                reset();
                resetEndDate(work.endDate);
              }}
              disabled={saving}
            >
              Descartar cambios
            </Button>
          )}
          <Button variant="outlined" color="inherit" onClick={requestClose} disabled={saving}>
            {isNew ? 'Cancelar' : 'Cerrar'}
          </Button>
          {canEdit && (
            <Button variant="contained" color="secondary" onClick={save} disabled={saving || (!isNew && !isDirty)}>
              {saving ? 'Guardando…' : isNew ? 'Guardar' : 'Guardar cambios'}
            </Button>
          )}
        </>
      }
    >
      {errorTabs.size > 0 && (
        <Alert severity="error" role="alert" sx={{ mb: 2 }}>
          Revisa los campos marcados antes de guardar. Las pestañas con errores llevan *.
        </Alert>
      )}

      {tab === 'summary' && work && (
        <Stack spacing={2}>
          <Grid container spacing={1.5}>
            {[
              {
                label: 'Valor vigente',
                value: fMoneyText(work.currentValue),
                hint: work.extendedValue ? 'Valor ampliado' : 'Valor inicial'
              },
              {
                label: 'Plazo inicial',
                value: fTerm(work.initialTerm, work.termUnit),
                hint: work.endDate ? `Termina el ${fDateOnly(work.endDate)}` : ''
              },
              { label: 'Costo directo', value: fMoneyText(work.directCost) },
              { label: 'Valor máx. orden de servicio', value: fMoneyText(work.maxServiceOrderValue) },
              {
                label: 'Responsables activos',
                value: String(activeManagers.length),
                hint: `Principal: ${mainManager?.name ?? 'sin asignar'}`
              },
              { label: 'Etapas', value: String(work.stages.length) }
            ].map((figure) => (
              <Grid key={figure.label} size={{ xs: 12, sm: 6, md: 4 }}>
                <Figure {...figure} />
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <SubCard title="Datos generales">
                <DataList
                  items={[
                    ['Código', work.code],
                    ['Nombre', work.name],
                    ['Constructora', work.constructionCompany],
                    ['Tipo de contrato', work.contractType],
                    ['Tipo de interventoría', work.supervisionType]
                  ]}
                />
              </SubCard>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <SubCard title="Valores y plazos">
                <DataList
                  items={[
                    ['Valor inicial', fMoneyText(work.initialValue)],
                    ['Valor ampliado', work.extendedValue ? fMoneyText(work.extendedValue) : 'Sin ampliación'],
                    ['Valor máx. orden de servicio', fMoneyText(work.maxServiceOrderValue)],
                    ['Costo directo', fMoneyText(work.directCost)],
                    ['Fecha de inicio', fDateOnly(work.startDate)],
                    ['Plazo inicial', fTerm(work.initialTerm, work.termUnit)],
                    ['Fecha final', work.endDate ? `${fDateOnly(work.endDate)} (inicio + plazo inicial)` : '']
                  ]}
                />
              </SubCard>
            </Grid>
          </Grid>
        </Stack>
      )}

      {/* Pestañas del formulario: montadas siempre, para que sus campos se validen aunque no estén a la vista. */}
      {canEdit ? (
        <>
          <Box sx={hidden('data')}>
            <WorkDataForm control={control} getValues={getValues} endPreview={endPreview} loaded={work} />
          </Box>

          <Box sx={hidden('managers')}>
            <FormSection
              title="Responsables"
              subtitle="Usuarios del sistema. Si falta alguien, se crea antes en Usuarios."
              onAdd={canAssign ? () => setManagerDialog({ manager: null }) : undefined}
              addLabel="Agregar responsable"
            >
              <Controller
                name="managers"
                control={control}
                rules={{ validate: validateManagers }}
                render={({ field, fieldState }) => (
                  <>
                    <ManagersTable
                      rows={field.value}
                      canEdit={canAssign}
                      canRemove={canRemoveManager}
                      onEdit={(row) => setManagerDialog({ manager: row })}
                      onRemove={removeManager}
                    />
                    {fieldState.error && <FormHelperText error>{fieldState.error.message}</FormHelperText>}
                  </>
                )}
              />
            </FormSection>
          </Box>

          <Box sx={hidden('stages')}>
            <FormSection
              title="Etapas"
              subtitle="El orden es la posición en la lista. Una etapa con contratos no se puede quitar."
              onAdd={canManageStages ? addStage : undefined}
              addLabel="Agregar etapa"
            >
              <Controller
                name="stages"
                control={control}
                rules={{ validate: validateStages }}
                render={({ field, fieldState }) => (
                  <EditableList
                    value={field.value}
                    onChange={field.onChange}
                    error={fieldState.error}
                    columns={[
                      { name: 'name', label: 'Nombre', type: 'text', maxLength: 100, grid: { xs: 12, sm: 'grow' } },
                      { name: 'staId', label: 'Estado', type: 'select', options: STATUS_OPTIONS, grid: { xs: 12, sm: 3 } }
                    ]}
                    newRow={() => ({ key: rowKey('s'), name: '', order: 0, staId: STATUS.ACTIVE })}
                    orderField="order"
                    disabled={!canManageStages}
                    canAdd={false}
                    emptyText="Sin etapas."
                    rowLabel="Etapa"
                  />
                )}
              />
            </FormSection>
          </Box>

          <Box sx={hidden('contacts')}>
            <FormSection
              title="Contactos"
              subtitle="De la obra: interventoría, residente, bodega… Uno puede marcarse como principal."
              onAdd={() => setAddingContact(true)}
              addLabel="Agregar contacto"
            >
              <Controller
                name="contacts"
                control={control}
                render={({ field, fieldState }) => (
                  <ContactsEditor
                    value={field.value}
                    onChange={field.onChange}
                    error={fieldState.error}
                    adding={addingContact}
                    onAddingChange={setAddingContact}
                  />
                )}
              />
            </FormSection>
          </Box>
        </>
      ) : (
        <>
          {tab === 'managers' &&
            (work.managers.length === 0 ? (
              <Pending title="Sin responsables." text="Los agrega quien puede editar la obra." />
            ) : (
              <Grid container spacing={1.5} component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {work.managers.map((m) => (
                  <Grid key={m.wkmId} size={{ xs: 12, sm: 6, md: 4 }} component="li">
                    <Stack
                      direction="row"
                      spacing={1.5}
                      alignItems="center"
                      sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, px: 2, py: 1.5 }}
                    >
                      <Avatar
                        sx={{ bgcolor: 'primary.light', color: 'primary.800', width: 40, height: 40, fontSize: 14 }}
                        aria-hidden="true"
                      >
                        {initials(m.name)}
                      </Avatar>
                      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                        <Typography variant="subtitle1" noWrap>
                          {m.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {m.role === 'MAIN' ? 'Responsable principal' : 'Apoyo'}
                          {m.userStaId !== 1 ? ' · usuario inactivo' : ''}
                        </Typography>
                      </Box>
                      <StatusChip staId={m.staId} label={m.staId === STATUS.ACTIVE ? 'Activo' : 'Inactivo'} />
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            ))}

          {tab === 'stages' &&
            (work.stages.length === 0 ? (
              <Pending title="Sin etapas." text="Las agrega quien puede editar la obra." />
            ) : (
              <Box component="ol" sx={{ listStyle: 'none', p: 0, m: 0, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                {[...work.stages]
                  .sort((a, b) => a.order - b.order)
                  .map((s, i, list) => (
                    <Stack
                      key={s.wksId}
                      component="li"
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      sx={{ px: 2, py: 1.5, borderBottom: i < list.length - 1 ? '1px solid' : 'none', borderColor: 'divider' }}
                    >
                      <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.800', width: 28, height: 28, fontSize: 13, fontWeight: 600 }}>
                        {i + 1}
                      </Avatar>
                      <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                        {s.name}
                      </Typography>
                      <StatusChip staId={s.staId} label={s.staId === STATUS.ACTIVE ? 'Activa' : 'Inactiva'} />
                    </Stack>
                  ))}
              </Box>
            ))}

          {tab === 'contacts' && (
            <ContactsList
              contacts={work.contacts}
              emptyText="Los agrega quien puede editar la obra: interventoría, residente, bodega… Uno puede marcarse como principal."
            />
          )}
        </>
      )}

      {tab === 'providers' && work && <WorkProvidersTab wrkId={work.wrkId} workCode={work.code} onChanged={providersChanged} />}

      {tab === 'contracts' && work && <WorkContractsTab wrkId={work.wrkId} />}

      {tab === 'invoices' && work && (
        <InvoicesTab
          filter={{ wrkId: work.wrkId }}
          actions={active ? <NewSimpleInvoiceButton query={{ wrkId: work.wrkId }} /> : null}
          emptyTitle="Todavía no hay facturas en esta obra."
          emptyText="Aquí se ven las facturas simples, imputadas a una etapa de la obra, y las de sus contratos, que se registran desde el contrato. Una obra con facturas no se puede eliminar."
        />
      )}

      <ManagerDialog
        open={Boolean(managerDialog)}
        manager={managerDialog?.manager}
        userOptions={dialogUserOptions}
        onClose={() => setManagerDialog(null)}
        onSave={saveManager}
      />

      {work && <FinishWorkDialog open={finishing} work={work} onClose={() => setFinishing(false)} onSaved={stateChanged} />}

      <ConfirmDialog
        open={Boolean(confirm)}
        onClose={() => setConfirm(null)}
        onConfirm={runConfirmed}
        title={confirm?.title}
        message={confirm?.message}
        confirmLabel={confirm?.label}
        confirmColor={confirm?.color}
      />

      <ConfirmDialog
        open={confirmLeave}
        onClose={() => setConfirmLeave(false)}
        onConfirm={close}
        title="Descartar cambios"
        message="Hay cambios sin guardar en la obra. ¿Salir sin guardarlos?"
        confirmLabel="Descartar"
      />
    </RouteDialog>
  );
}
