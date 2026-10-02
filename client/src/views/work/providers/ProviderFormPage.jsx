import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { Controller, useForm, useWatch } from 'react-hook-form';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import SubCard from 'ui-component/cards/SubCard';
import ConfirmDialog from 'ui-component/extended/ConfirmDialog';
import ContactsEditor from 'ui-component/extended/ContactsEditor';
import RouteDialog from 'ui-component/extended/RouteDialog';
import SelectSocket from 'ui-component/extended/SelectSocket';
import useIdentityCheck from './components/useIdentityCheck';
import { useAuth } from 'contexts/AuthContext';
import { getIdentityDocumentsSelectAPI } from 'api/requests/identityDocumentsApi';
import { getProviderTypesSelectAPI } from 'api/requests/providerTypesApi';
import { providersApi } from 'api/requests/providersApi';
import { showError, showSuccess } from 'services/ToastService';
import { identificationFormatError } from 'utils/identification';
import { newIdempotencyKey } from 'utils/idempotency';

/**
 * Alta y edición de un proveedor (ADR-0012, DEC-031), en un modal sobre el
 * listado con dirección propia `/work/providers/new` y
 * `/work/providers/:prvId/edit` (DEC-034):
 * identidad, datos generales y contactos, enviados juntos en una sola
 * petición. El servidor guarda los contactos por diferencial.
 *
 * - La identidad es el par (tipo, número). Mientras se escribe, se avisa si ya
 *   existe y se ofrece ir a ese proveedor en vez de crear otro; el 409 del
 *   servidor da el mismo aviso si otro usuario lo registró entretanto.
 * - Al editar, cambiar la identificación exige su propio permiso (ADR-0012,
 *   regla 5): sin él, los dos campos quedan de solo lectura.
 * - Crear lleva clave de idempotencia (FRONTEND_STANDARD, regla 7).
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY_FORM = { iddId: '', identification: '', name: '', pvtId: '', serviceType: '', email: '', observation: '', contacts: [] };

const text = (value) => String(value ?? '').trim();

const toForm = (provider) => ({
  iddId: provider.iddId,
  identification: provider.identification,
  name: provider.name,
  pvtId: provider.pvtId,
  serviceType: provider.serviceType ?? '',
  email: provider.email ?? '',
  observation: provider.observation ?? '',
  contacts: provider.contacts.map((c) => ({
    key: `c-${c.prcId}`,
    ...c,
    name: c.name ?? '',
    position: c.position ?? '',
    address: c.address ?? '',
    phone: c.phone ?? '',
    mobile: c.mobile ?? '',
    fax: c.fax ?? '',
    email: c.email ?? '',
    observation: c.observation ?? ''
  }))
});

const toPayload = (prvId, form) => ({
  prvId,
  iddId: form.iddId,
  identification: text(form.identification),
  name: text(form.name),
  pvtId: form.pvtId,
  serviceType: text(form.serviceType),
  email: text(form.email),
  observation: text(form.observation),
  contacts: form.contacts.map((c) => ({
    ...(c.prcId ? { prcId: c.prcId } : {}),
    adtId: c.adtId,
    name: text(c.name),
    position: text(c.position),
    address: text(c.address),
    phone: text(c.phone),
    mobile: text(c.mobile),
    fax: text(c.fax),
    email: text(c.email),
    observation: text(c.observation),
    main: Boolean(c.main)
  }))
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

export default function ProviderFormPage() {
  const { prvId: prvIdParam } = useParams();
  const prvId = Number(prvIdParam) || 0;
  const isEdit = prvId > 0;
  const navigate = useNavigate();
  const { refresh } = useOutletContext() ?? {};

  const { permissionsCatalog, hasPermission } = useAuth();
  const canDo = (perId) => perId != null && hasPermission(perId);
  const perms = permissionsCatalog.work?.providers;
  const identityLocked = isEdit && !canDo(perms?.changeIdentity);

  const [idempotencyKey] = useState(() => (isEdit ? null : newIdempotencyKey()));
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(null);
  const [identityOptions, setIdentityOptions] = useState([]);
  const [conflict, setConflict] = useState(null);
  const [confirmLeave, setConfirmLeave] = useState(false);

  const { control, handleSubmit, reset, formState } = useForm({ defaultValues: EMPTY_FORM });
  const { errors, isDirty } = formState;

  useEffect(() => {
    if (!isEdit) return;
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await providersApi.getById({ prvId });
        setLoaded(data);
        reset(toForm(data));
      } catch (err) {
        showError(err.response?.data?.message || 'Error al cargar el proveedor');
        navigate('/work/providers', { replace: true });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [isEdit, prvId, reset, navigate]);

  // Estables (useCallback): SelectSocket recarga las opciones cuando cambian.
  // El valor actual se incluye aunque el maestro esté inactivo.
  const fetchIdentityDocuments = useCallback(() => getIdentityDocumentsSelectAPI(loaded?.iddId), [loaded?.iddId]);
  const fetchProviderTypes = useCallback(() => getProviderTypesSelectAPI(loaded?.pvtId), [loaded?.pvtId]);
  const keepIdentityOptions = useCallback((options) => {
    setIdentityOptions(options);
    return options;
  }, []);

  const [iddId, identification] = useWatch({ control, name: ['iddId', 'identification'] });
  const identityFormat = identityOptions.find((o) => o.value === iddId)?.format;
  const identityChanged = !isEdit || iddId !== loaded?.iddId || text(identification) !== loaded?.identification;
  const { existing: found } = useIdentityCheck({
    iddId,
    identification,
    format: identityFormat,
    excludeId: isEdit ? prvId : undefined,
    enabled: !loading && identityChanged
  });
  const existing = conflict ?? found;

  useEffect(() => setConflict(null), [iddId, identification]);

  // Cancelar o cerrar vuelve al listado, también al editar (DEC-034).
  const leave = () => navigate('/work/providers');

  const onSubmit = async (form) => {
    if (existing) return;
    setSaving(true);
    try {
      const { data } = await providersApi.save(toPayload(prvId, form), isEdit ? undefined : idempotencyKey);
      showSuccess(data.message || 'Guardado correctamente.');
      refresh?.();
      navigate(`/work/providers/${data.prvId ?? prvId}`);
    } catch (err) {
      const duplicate = err.response?.status === 409 && err.response?.data?.data?.existing;
      if (duplicate) setConflict(duplicate);
      else showError(err.response?.data?.message || 'Error al guardar el proveedor');
    } finally {
      setSaving(false);
    }
  };

  // Cerrar con la X, Escape o el fondo pide confirmar si hay cambios sin guardar.
  const requestLeave = () => (isDirty ? setConfirmLeave(true) : leave());

  if (loading) return <RouteDialog onClose={leave} loading />;

  const title = isEdit ? `Editar ${loaded?.name ?? 'proveedor'}` : 'Nuevo proveedor';
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <RouteDialog
      onClose={requestLeave}
      closeLabel="Cerrar sin guardar"
      labelledBy="provider-form-title"
      onSubmit={handleSubmit(onSubmit)}
      header={
        <>
          <Typography id="provider-form-title" variant="h3" component="h2">
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Identidad, datos generales y contactos. Los campos con * son obligatorios.
          </Typography>
        </>
      }
      footer={
        <>
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={requestLeave} disabled={saving}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="secondary" disabled={saving || Boolean(existing)}>
            {saving ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Guardar'}
          </Button>
        </>
      }
    >
      <Stack spacing={2}>
        {hasErrors && (
          <Alert severity="error" role="alert">
            Revisa los campos marcados antes de guardar.
          </Alert>
        )}

        <Section
          title="Identidad"
          subtitle={
            identityLocked
              ? 'Cambiar el documento requiere un permiso propio: reasigna el historial de la empresa.'
              : 'Un proveedor por empresa: el tipo y el número de documento no se repiten.'
          }
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 5 }}>
              <Controller
                name="iddId"
                control={control}
                rules={{ required: 'Selecciona el tipo de identificación.' }}
                render={({ field, fieldState }) => (
                  <SelectSocket
                    value={field.value}
                    onChange={field.onChange}
                    label="Tipo de identificación"
                    required
                    disabled={identityLocked}
                    error={fieldState.error}
                    fetchApi={fetchIdentityDocuments}
                    mapOptions={keepIdentityOptions}
                    socketEvent="refresh-identity-documents"
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 7 }}>
              <Controller
                name="identification"
                control={control}
                rules={{
                  required: 'El número de documento es requerido.',
                  // Formato según el tipo (DEC-021); el servidor lo repite.
                  validate: (value) => identificationFormatError(identityFormat, value) ?? true
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Número de documento"
                    required
                    size="small"
                    fullWidth
                    disabled={identityLocked}
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                    slotProps={{ htmlInput: { maxLength: 20, autoComplete: 'off' } }}
                  />
                )}
              />
            </Grid>
            {existing && (
              <Grid size={{ xs: 12 }}>
                <Alert
                  severity="warning"
                  role="status"
                  action={
                    <Button color="inherit" size="small" onClick={() => navigate(`/work/providers/${existing.prvId}`)}>
                      Ver proveedor
                    </Button>
                  }
                >
                  Ya existe un proveedor con ese documento: <strong>{existing.name}</strong>. No se crea otro: úsalo en sus obras.
                </Alert>
              </Grid>
            )}
            <Grid size={{ xs: 12, sm: 7 }}>
              <Controller
                name="name"
                control={control}
                rules={{ required: 'El nombre o razón social es requerido.' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Nombre o razón social"
                    required
                    size="small"
                    fullWidth
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                    slotProps={{ htmlInput: { maxLength: 255, autoComplete: 'off' } }}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 5 }}>
              <Controller
                name="pvtId"
                control={control}
                rules={{ required: 'Selecciona el tipo de proveedor.' }}
                render={({ field, fieldState }) => (
                  <SelectSocket
                    value={field.value}
                    onChange={field.onChange}
                    label="Tipo de proveedor"
                    required
                    error={fieldState.error}
                    fetchApi={fetchProviderTypes}
                    socketEvent="refresh-provider-types"
                  />
                )}
              />
            </Grid>
          </Grid>
        </Section>

        <Section title="Datos generales">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="serviceType"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Tipo de servicio"
                    size="small"
                    fullWidth
                    helperText="Qué suministra o qué servicio presta"
                    slotProps={{ htmlInput: { maxLength: 150 } }}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="email"
                control={control}
                rules={{ validate: (value) => !text(value) || EMAIL.test(text(value)) || 'Correo inválido.' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Correo institucional"
                    type="email"
                    size="small"
                    fullWidth
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                    slotProps={{ htmlInput: { maxLength: 255, autoComplete: 'off' } }}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="observation"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Observación"
                    size="small"
                    fullWidth
                    multiline
                    minRows={2}
                    slotProps={{ htmlInput: { maxLength: 500 } }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Section>

        <Section title="Contactos" subtitle="Son de la empresa y valen para todas sus obras. Uno puede marcarse como principal.">
          <Controller
            name="contacts"
            control={control}
            render={({ field, fieldState }) => <ContactsEditor value={field.value} onChange={field.onChange} error={fieldState.error} />}
          />
        </Section>
      </Stack>

      <ConfirmDialog
        open={confirmLeave}
        onClose={() => setConfirmLeave(false)}
        onConfirm={leave}
        title="Descartar cambios"
        message="Hay cambios sin guardar en el proveedor. ¿Salir sin guardarlos?"
        confirmLabel="Descartar"
        confirmColor="warning"
      />
    </RouteDialog>
  );
}
