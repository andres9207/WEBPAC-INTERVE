import { useCallback, useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { Controller, useForm, useWatch } from 'react-hook-form';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { IconEdit, IconPlus, IconUnlink } from '@tabler/icons-react';

import SubCard from 'ui-component/cards/SubCard';
import ConfirmDialog from 'ui-component/extended/ConfirmDialog';
import ContactsEditor from 'ui-component/extended/ContactsEditor';
import { DataList, Figure, Pending } from 'ui-component/extended/DetailBlocks';
import FormSection from 'ui-component/extended/FormSection';
import RouteDialog from 'ui-component/extended/RouteDialog';
import StatusChip from 'ui-component/extended/StatusChip';
import ContactsList from 'ui-component/extended/ContactsList';
import WorkProviderDialog from './components/WorkProviderDialog';
import ProviderDataForm from './components/ProviderDataForm';
import useIdentityCheck from './components/useIdentityCheck';
import { EMPTY_FORM, FIELD_TAB, text, toForm, toPayload } from './components/providerForm';
import InvoicesTab from 'views/billing/invoices/components/InvoicesTab';
import { providersApi, workProvidersApi } from 'api/requests/providersApi';
import { useAuth } from 'contexts/AuthContext';
import { useWorkScope } from 'contexts/WorkScopeContext';
import useInvoiceViews from 'hooks/useInvoiceViews';
import { showError, showSuccess } from 'services/ToastService';
import { fDateOnly, fDateTime } from 'utils/formatTime';
import { newIdempotencyKey } from 'utils/idempotency';
import { ALL_WORKS } from 'utils/workScope';
import { STATUS, invoicePath } from 'utils/constants';

/**
 * Un proveedor en un solo modal (ADR-0012, DEC-031, DEC-057), sobre el
 * listado y con dirección propia (DEC-034): `/work/providers/new`, `/:prvId`
 * y `/:prvId/edit` abren la misma vista. La edición abre en la pestaña
 * "Datos del proveedor"; el detalle, en "Resumen". Activar, desactivar y
 * eliminar viven aquí, no en el listado (DEC-030). Un proveedor asignado a
 * obras no se elimina: el servidor responde con el motivo.
 *
 * - Datos del proveedor y contactos se editan en su pestaña y se guardan
 *   juntos con un solo botón, en una petición. Sin el permiso de editar, los
 *   contactos son de consulta y "Datos del proveedor" no aparece. Guardar no
 *   es un submit del modal: un Enter en el buscador de facturas no debe
 *   guardar el proveedor.
 * - Al crear solo están esas dos pestañas; el resto se habilita al guardar,
 *   sin salir del modal. Crear lleva clave de idempotencia.
 * - Mientras se escribe el documento se avisa si ya existe; el 409 del
 *   servidor da el mismo aviso si otro usuario lo registró entretanto.
 * - En la pestaña Obras se asigna el proveedor a una obra, se edita la
 *   asignación y se desasigna, con los mismos endpoints y permisos que la
 *   pestaña Proveedores de la obra (ADR-0012, decisión 2; DEC-031). Cada
 *   obra tiene sus tipos de proveedor (DEC-066): se proponen los de la ficha.
 * - La pestaña Facturas lista las del proveedor (DEC-042); la simple, que es
 *   del proveedor (DEC-054), se registra desde aquí.
 */

const TABS = [
  { key: 'summary', label: 'Resumen' },
  { key: 'data', label: 'Datos del proveedor', form: true },
  { key: 'contacts', label: 'Contactos', form: true },
  { key: 'works', label: 'Obras' },
  { key: 'invoices', label: 'Facturas' }
];

// Cambiar de proveedor (o pasar de "nuevo" al creado) vuelve a montar la vista.
export default function ProviderDetailPage() {
  const { prvId } = useParams();
  return <ProviderView key={prvId ?? 'new'} />;
}

function ProviderView() {
  const { prvId: prvIdParam } = useParams();
  const prvId = Number(prvIdParam) || 0;
  const isNew = prvId === 0;
  const navigate = useNavigate();
  const location = useLocation();
  const { refresh } = useOutletContext() ?? {};
  const { permissionsCatalog, hasPermission } = useAuth();
  const canDo = (perId) => perId != null && hasPermission(perId);
  const perms = permissionsCatalog.work?.providers;
  const canEdit = isNew || canDo(perms?.edit);
  const identityLocked = !isNew && !canDo(perms?.changeIdentity);
  const canViewWorks = canDo(permissionsCatalog.work?.works?.view);
  const canAssign = canDo(perms?.assignWork);
  // Asignar a otra obra solo con "Ver todo" en el encabezado (DEC-047): con
  // una obra elegida, se trabaja dentro de ella y el proveedor se asigna desde
  // la pestaña Proveedores de esa obra.
  const { activeWork } = useWorkScope();
  const canAssignNew = canAssign && activeWork === ALL_WORKS;
  const canUnassign = canDo(perms?.unassignWork);
  const invoiceViews = useInvoiceViews();
  const canCreateSimple = canDo(permissionsCatalog.billing?.invoices?.create) && invoiceViews.includes('SIMPLE');

  const [idempotencyKey] = useState(() => (isNew ? newIdempotencyKey() : null));
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState(() =>
    isNew || (canEdit && location.pathname.endsWith('/edit')) ? 'data' : (location.state?.tab ?? 'summary')
  );
  const [confirm, setConfirm] = useState(null);
  const [confirmLeave, setConfirmLeave] = useState(false);
  // Diálogo de asignación: `{ assignment }` para editar, `{}` para asignar a una obra nueva.
  const [assignDialog, setAssignDialog] = useState(null);
  const [addingContact, setAddingContact] = useState(false);
  const [identityOptions, setIdentityOptions] = useState([]);
  const [conflict, setConflict] = useState(null);

  const { control, handleSubmit, reset, formState } = useForm({ defaultValues: EMPTY_FORM });
  const { errors, isDirty } = formState;
  // Recargar el proveedor (cambio de estado, obras) no pisa lo que se está editando.
  const dirtyRef = useRef(false);
  dirtyRef.current = isDirty;

  const load = useCallback(
    async ({ resetForm = !dirtyRef.current } = {}) => {
      try {
        const { data } = await providersApi.getById({ prvId });
        setProvider(data);
        if (resetForm) reset(toForm(data));
      } catch (err) {
        showError(err.response?.data?.message || 'Error al cargar el proveedor');
        if (err.response?.status === 404) navigate('/work/providers', { replace: true });
      } finally {
        setLoading(false);
      }
    },
    [prvId, reset, navigate]
  );

  useEffect(() => {
    if (!isNew) load({ resetForm: true });
  }, [isNew, load]);

  const [iddId, identification, contacts] = useWatch({ control, name: ['iddId', 'identification', 'contacts'] });
  const identityFormat = identityOptions.find((o) => o.value === iddId)?.format;
  const identityChanged = isNew || iddId !== provider?.iddId || text(identification) !== provider?.identification;
  const { existing: found } = useIdentityCheck({
    iddId,
    identification,
    format: identityFormat,
    excludeId: isNew ? undefined : prvId,
    enabled: canEdit && !loading && identityChanged
  });
  const existing = conflict ?? found;

  useEffect(() => setConflict(null), [iddId, identification]);

  const close = () => navigate('/work/providers');
  // Cerrar con la X, Escape o el fondo pide confirmar si hay cambios sin guardar.
  const requestClose = () => (isDirty ? setConfirmLeave(true) : close());

  const tabOfField = (field) => FIELD_TAB[field] ?? 'data';
  const errorTabs = new Set(Object.keys(errors).map(tabOfField));

  const onSave = async (form) => {
    if (existing) {
      setTab('data');
      return;
    }
    setSaving(true);
    try {
      const { data } = await providersApi.save(toPayload(prvId, form), isNew ? idempotencyKey : undefined);
      showSuccess(data.message || 'Guardado correctamente.');
      refresh?.();
      // El nuevo se abre en el resumen, con todas las pestañas habilitadas.
      if (isNew) navigate(`/work/providers/${data.prvId}`, { replace: true, state: { tab: 'summary' } });
      else await load({ resetForm: true });
    } catch (err) {
      const duplicate = err.response?.status === 409 && err.response?.data?.data?.existing;
      if (duplicate) {
        setConflict(duplicate);
        setTab('data');
      } else showError(err.response?.data?.message || 'Error al guardar el proveedor');
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

  if (loading || (!isNew && !provider)) return <RouteDialog onClose={close} loading />;

  const visibleTabs = TABS.filter((t) => t.key !== 'data' || canEdit);
  // Al crear, solo las pestañas del formulario: el resto necesita el proveedor guardado.
  const enabled = (t) => !isNew || t.form;
  const hidden = (key) => ({ display: tab === key ? 'block' : 'none' });

  const tabBadge = provider
    ? { contacts: canEdit ? contacts.length : provider.contacts.length, works: provider.worksCount }
    : { contacts: contacts.length };

  const active = provider?.staId === STATUS.ACTIVE;
  const documentText = provider ? `${provider.identityCode ?? ''} ${provider.identification}` : '';
  // Uno o varios tipos (DEC-041).
  const typesText = provider?.providerTypes.join(', ') ?? '';

  const changeStatus = async () => {
    const { data } = await providersApi.changeStatus({ prvId: provider.prvId, staId: active ? STATUS.INACTIVE : STATUS.ACTIVE });
    showSuccess(data.message);
    load();
    refresh?.();
  };

  const remove = async () => {
    const { data } = await providersApi.remove({ prvId: provider.prvId });
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
          title: 'Desactivar proveedor',
          message: `¿Desactivar "${provider.name}"? No se podrá asignar a obras nuevas; las obras donde ya está lo conservan.`,
          label: 'Desactivar',
          color: 'warning',
          run: changeStatus
        })
      : changeStatus().catch((err) => showError(err.response?.data?.message || 'Error al activar el proveedor'));

  const unassign = async (work) => {
    const { data } = await workProvidersApi.unassign({ wrkId: work.wrkId, prvId: provider.prvId });
    showSuccess(data.message);
    load();
    refresh?.();
  };

  const askUnassign = (work) =>
    setConfirm({
      title: 'Desasignar de la obra',
      message: `¿Desasignar a "${provider.name}" de la obra ${work.workCode}? El proveedor sigue en el maestro y en sus otras obras. Si tiene contratos en esa obra, no se puede: inactiva la asignación en su lugar.`,
      label: 'Desasignar',
      color: 'warning',
      run: () => unassign(work)
    });

  const assignmentSaved = () => {
    setAssignDialog(null);
    load();
    refresh?.();
  };

  const askDelete = () =>
    setConfirm({
      title: 'Eliminar proveedor',
      message: `¿Eliminar "${provider.name}"? Si está asignado a alguna obra, no se puede eliminar: desasígnalo primero o desactívalo.`,
      label: 'Eliminar',
      color: 'error',
      run: remove
    });

  const assignButton =
    canAssignNew && active ? (
      <Button variant="contained" color="secondary" size="small" startIcon={<IconPlus size={16} />} onClick={() => setAssignDialog({})}>
        Asignar a obra
      </Button>
    ) : null;

  return (
    <RouteDialog
      onClose={requestClose}
      closeLabel={isDirty ? 'Cerrar sin guardar' : 'Cerrar'}
      labelledBy="provider-title"
      header={
        isNew ? (
          <>
            <Typography id="provider-title" variant="h3" component="h2">
              Nuevo proveedor
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Identidad, datos generales y contactos. Al guardar el proveedor se habilitan el resumen, las obras y las facturas. Los campos
              con * son obligatorios.
            </Typography>
          </>
        ) : (
          <>
            <Stack direction="row" sx={{ flexWrap: 'wrap', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
              <Typography id="provider-title" variant="h3" component="h2">
                {provider.name}
              </Typography>
              <StatusChip staId={provider.staId} label={active ? 'Activo' : 'Inactivo'} />
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {documentText} · {typesText}
              {provider.serviceType ? ` · ${provider.serviceType}` : ''}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Modificado el {fDateTime(provider.updatedAt)} por {provider.updatedByName ?? '—'}
            </Typography>
          </>
        )
      }
      tabs={
        <Tabs
          value={tab}
          onChange={(_, value) => setTab(value)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Partes del proveedor"
        >
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
          <Box sx={{ flexGrow: 1 }} />
          {!isNew && isDirty && (
            <Button color="inherit" onClick={() => reset()} disabled={saving}>
              Descartar cambios
            </Button>
          )}
          <Button variant="outlined" color="inherit" onClick={requestClose} disabled={saving}>
            {isNew ? 'Cancelar' : 'Cerrar'}
          </Button>
          {canEdit && (
            <Button variant="contained" color="secondary" onClick={save} disabled={saving || Boolean(existing) || (!isNew && !isDirty)}>
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

      {tab === 'summary' && provider && (
        <Stack spacing={2}>
          <Grid container spacing={1.5}>
            {[
              { label: 'Documento', value: documentText, hint: provider.identityName },
              {
                label: provider.providerTypes.length === 1 ? 'Tipo de proveedor' : 'Tipos de proveedor',
                value: typesText,
                hint: 'Se proponen al asignarlo a una obra; en cada obra trabaja con los suyos'
              },
              {
                label: 'Obras',
                value: String(provider.worksCount),
                hint: `${provider.works.filter((w) => w.staId === STATUS.ACTIVE).length} con asignación activa`
              },
              {
                label: 'Contactos',
                value: String(provider.contacts.length),
                hint: (() => {
                  const main = provider.contacts.find((c) => c.main);
                  return main ? `Principal: ${main.name || main.addressType}` : 'Sin principal';
                })()
              }
            ].map((figure) => (
              <Grid key={figure.label} size={{ xs: 12, sm: 6, md: 3 }}>
                <Figure {...figure} />
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <SubCard title="Identidad">
                <DataList
                  items={[
                    ['Nombre o razón social', provider.name],
                    ['Tipo de identificación', provider.identityName],
                    ['Número de documento', provider.identification],
                    [
                      'Tipos de proveedor',
                      <Stack key="types" direction="row" sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                        {provider.providerTypes.map((name) => (
                          <Chip key={name} label={name} size="small" />
                        ))}
                      </Stack>
                    ]
                  ]}
                />
              </SubCard>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <SubCard title="Datos generales">
                <DataList
                  items={[
                    ['Tipo de servicio', provider.serviceType],
                    ['Correo', provider.email],
                    ['Observación', provider.observation],
                    ['Creado', `${fDateTime(provider.createdAt)} por ${provider.createdByName ?? '—'}`]
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
            <ProviderDataForm
              control={control}
              loaded={provider}
              identityLocked={identityLocked}
              identityFormat={identityFormat}
              onIdentityOptions={setIdentityOptions}
              existing={existing}
              onViewExisting={() => navigate(`/work/providers/${existing.prvId}`)}
            />
          </Box>
          <Box sx={hidden('contacts')}>
            <FormSection
              title="Contactos"
              subtitle="Son de la empresa y valen para todas sus obras. Uno puede marcarse como principal."
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
        tab === 'contacts' && (
          <ContactsList
            contacts={provider.contacts}
            emptyText="Los agrega quien puede editar el proveedor. Los contactos son de la empresa y valen para todas sus obras."
          />
        )
      )}

      {tab === 'works' && provider && (
        <Stack spacing={1.5}>
          {provider.works.length > 0 && (
            <Stack direction="row" sx={{ flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {active
                  ? 'Asignar, editar o desasignar no cambia los datos del proveedor.'
                  : 'El proveedor está inactivo: no se puede asignar a obras nuevas.'}
              </Typography>
              {assignButton}
            </Stack>
          )}
          {provider.works.length === 0 ? (
            <Pending
              title="Sin obras."
              text={
                active
                  ? canAssignNew
                    ? 'Este proveedor todavía no está asignado a ninguna obra. Asígnalo aquí o desde la pestaña Proveedores de la obra.'
                    : 'Este proveedor todavía no está asignado a ninguna obra. Asígnalo desde la pestaña Proveedores de la obra.'
                  : 'Este proveedor no está asignado a ninguna obra, y está inactivo: actívalo para asignarlo.'
              }
              action={assignButton}
            />
          ) : (
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
              {provider.works.map((w, i, list) => (
                <Stack
                  key={w.wkpId}
                  component="li"
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{
                    px: 2,
                    py: 1.5,
                    borderBottom: i < list.length - 1 ? '1px solid' : 'none',
                    borderColor: 'divider',
                    flexWrap: 'wrap',
                    rowGap: 1
                  }}
                >
                  <Box sx={{ flexGrow: 1, minWidth: 200 }}>
                    {canViewWorks ? (
                      <Link component={RouterLink} to={`/work/works/${w.wrkId}`} underline="hover" variant="subtitle1">
                        {w.workCode} · {w.workName}
                      </Link>
                    ) : (
                      <Typography variant="subtitle1">
                        {w.workCode} · {w.workName}
                      </Typography>
                    )}
                    <Typography variant="caption" color="text.secondary" component="p">
                      Asignado el {fDateOnly(w.assignmentDate)}
                      {w.workTypes?.length ? ` · Trabaja como ${w.workTypes.map((t) => t.name).join(', ')}` : ''}
                      {w.observation ? ` · ${w.observation}` : ''}
                    </Typography>
                  </Box>
                  <StatusChip staId={w.staId} label={w.staId === STATUS.ACTIVE ? 'Asignación activa' : 'Asignación inactiva'} />
                  {(canAssign || canUnassign) && (
                    <Stack direction="row" spacing={1}>
                      {canAssign && (
                        <Button
                          size="small"
                          color="inherit"
                          startIcon={<IconEdit size={16} />}
                          onClick={() => setAssignDialog({ assignment: w })}
                          aria-label={`Editar la asignación a ${w.workCode}`}
                        >
                          Editar
                        </Button>
                      )}
                      {canUnassign && (
                        <Button
                          size="small"
                          color="warning"
                          startIcon={<IconUnlink size={16} />}
                          onClick={() => askUnassign(w)}
                          aria-label={`Desasignar de ${w.workCode}`}
                        >
                          Desasignar
                        </Button>
                      )}
                    </Stack>
                  )}
                </Stack>
              ))}
              {provider.worksCount > provider.works.length && (
                <Typography variant="caption" color="text.secondary" component="li" sx={{ display: 'block', px: 2, py: 1 }}>
                  Se muestran las {provider.works.length} más recientes de {provider.worksCount}.
                </Typography>
              )}
            </Box>
          )}
        </Stack>
      )}

      {tab === 'invoices' && provider && (
        <InvoicesTab
          filter={{ prvId: provider.prvId }}
          actions={
            active && canCreateSimple ? (
              <Button
                size="small"
                variant="outlined"
                color="secondary"
                startIcon={<IconPlus size={16} />}
                onClick={() => navigate(`${invoicePath('SIMPLE', 'new')}?prvId=${provider.prvId}`)}
              >
                Factura simple
              </Button>
            ) : null
          }
          emptyTitle="Todavía no hay facturas de este proveedor."
          emptyText="La factura simple se registra aquí o desde la pestaña Facturas de la obra, en una obra a la que esté asignado; las de anticipo, liquidación y devolución de retenido, desde la pestaña Facturas del contrato. Un proveedor con facturas no se puede desasignar de esa obra ni eliminar."
        />
      )}

      {provider && (
        <WorkProviderDialog
          open={Boolean(assignDialog)}
          prvId={provider.prvId}
          defaultTypeIds={provider.pvtIds}
          assignment={assignDialog?.assignment ?? null}
          onClose={() => setAssignDialog(null)}
          onSaved={assignmentSaved}
        />
      )}

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
        message="Hay cambios sin guardar en el proveedor. ¿Salir sin guardarlos?"
        confirmLabel="Descartar"
      />
    </RouteDialog>
  );
}
