import { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useOutletContext, useParams } from 'react-router-dom';

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
import { DataList, Figure, Pending } from 'ui-component/extended/DetailBlocks';
import RouteDialog from 'ui-component/extended/RouteDialog';
import StatusChip from 'ui-component/extended/StatusChip';
import WorkProviderDialog from './components/WorkProviderDialog';
import InvoicesTab from 'views/billing/invoices/components/InvoicesTab';
import { providersApi, workProvidersApi } from 'api/requests/providersApi';
import { useAuth } from 'contexts/AuthContext';
import { showError, showSuccess } from 'services/ToastService';
import { fDateOnly, fDateTime } from 'utils/formatTime';
import { STATUS } from 'utils/constants';

/**
 * Detalle de un proveedor (ADR-0012, DEC-031), en un modal sobre el listado
 * con dirección propia `/work/providers/:prvId` (DEC-034): encabezado con identidad,
 * estado y autoría, y pestañas para sus datos, contactos y obras. Activar,
 * desactivar y eliminar viven aquí, no en el listado (DEC-030). Un proveedor
 * asignado a obras no se elimina: el servidor responde con el motivo.
 *
 * En la pestaña Obras se asigna el proveedor a una obra, se edita la
 * asignación y se desasigna, con los mismos endpoints y permisos que la
 * pestaña Proveedores de la obra (ADR-0012, decisión 2; DEC-031). Desasignar
 * no toca el proveedor: solo quita su participación en esa obra.
 *
 * La pestaña Facturas lista las del proveedor en todas sus obras (DEC-042);
 * se registran desde la obra o el contrato, que fijan dónde se imputan.
 */

const TABS = [
  { key: 'summary', label: 'Resumen' },
  { key: 'contacts', label: 'Contactos' },
  { key: 'works', label: 'Obras' },
  { key: 'invoices', label: 'Facturas' }
];

const channels = (c) =>
  [c.address, c.phone && `Tel. ${c.phone}`, c.mobile && `Cel. ${c.mobile}`, c.fax && `Fax ${c.fax}`, c.email].filter(Boolean);

export default function ProviderDetailPage() {
  const { prvId } = useParams();
  const navigate = useNavigate();
  const { refresh } = useOutletContext() ?? {};
  const { permissionsCatalog, hasPermission } = useAuth();
  const canDo = (perId) => perId != null && hasPermission(perId);
  const perms = permissionsCatalog.work?.providers;
  const canViewWorks = canDo(permissionsCatalog.work?.works?.view);
  const canAssign = canDo(perms?.assignWork);
  const canUnassign = canDo(perms?.unassignWork);

  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('summary');
  const [confirm, setConfirm] = useState(null);
  // Diálogo de asignación: `{ assignment }` para editar, `{}` para asignar a una obra nueva.
  const [assignDialog, setAssignDialog] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await providersApi.getById({ prvId });
      setProvider(data);
    } catch (err) {
      showError(err.response?.data?.message || 'Error al cargar el proveedor');
      if (err.response?.status === 404) navigate('/work/providers', { replace: true });
    } finally {
      setLoading(false);
    }
  }, [prvId, navigate]);

  useEffect(() => {
    load();
  }, [load]);

  const close = () => navigate('/work/providers');

  if (!provider) return <RouteDialog onClose={close} loading={loading} />;

  const active = provider.staId === STATUS.ACTIVE;
  const documentText = `${provider.identityCode ?? ''} ${provider.identification}`;
  // Uno o varios tipos (DEC-041).
  const typesText = provider.providerTypes.join(', ');
  const mainContact = provider.contacts.find((c) => c.main);
  const activeWorks = provider.works.filter((w) => w.staId === STATUS.ACTIVE).length;

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

  const assignButton =
    canAssign && active ? (
      <Button variant="contained" color="secondary" size="small" startIcon={<IconPlus size={16} />} onClick={() => setAssignDialog({})}>
        Asignar a obra
      </Button>
    ) : null;

  const askDelete = () =>
    setConfirm({
      title: 'Eliminar proveedor',
      message: `¿Eliminar "${provider.name}"? Si está asignado a alguna obra, no se puede eliminar: desasígnalo primero o desactívalo.`,
      label: 'Eliminar',
      color: 'error',
      run: remove
    });

  const figures = [
    { label: 'Documento', value: documentText, hint: provider.identityName },
    { label: provider.providerTypes.length === 1 ? 'Tipo de proveedor' : 'Tipos de proveedor', value: typesText },
    { label: 'Obras', value: String(provider.worksCount), hint: `${activeWorks} con asignación activa` },
    {
      label: 'Contactos',
      value: String(provider.contacts.length),
      hint: mainContact ? `Principal: ${mainContact.name || mainContact.addressType}` : 'Sin principal'
    }
  ];

  const tabBadge = { contacts: provider.contacts.length, works: provider.worksCount };

  return (
    <RouteDialog
      onClose={close}
      labelledBy="provider-title"
      header={
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
      }
      tabs={
        <Tabs
          value={tab}
          onChange={(_, value) => setTab(value)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Partes del proveedor"
        >
          {TABS.map((t) => (
            <Tab
              key={t.key}
              value={t.key}
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <span>{t.label}</span>
                  {tabBadge[t.key] !== undefined && <Chip label={tabBadge[t.key]} size="small" color="default" />}
                </Stack>
              }
            />
          ))}
        </Tabs>
      }
      footer={
        <>
          {canDo(perms?.delete) && (
            <Button variant="outlined" color="error" onClick={askDelete}>
              Eliminar
            </Button>
          )}
          {canDo(perms?.changeStatus) && (
            <Button variant="outlined" color="inherit" onClick={askStatus}>
              {active ? 'Desactivar' : 'Activar'}
            </Button>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="outlined" color="inherit" onClick={close}>
            Cerrar
          </Button>
          {canDo(perms?.edit) && (
            <Button variant="contained" color="secondary" onClick={() => navigate(`/work/providers/${provider.prvId}/edit`)}>
              Editar proveedor
            </Button>
          )}
        </>
      }
    >
      {tab === 'summary' && (
        <Stack spacing={2}>
          <Grid container spacing={1.5}>
            {figures.map((figure) => (
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

      {tab === 'contacts' &&
        (provider.contacts.length === 0 ? (
          <Pending
            title="Sin contactos."
            text="Agrégalos editando el proveedor. Los contactos son de la empresa y valen para todas sus obras."
          />
        ) : (
          <Grid container spacing={1.5} component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
            {provider.contacts.map((c) => (
              <Grid key={c.prcId} size={{ xs: 12, md: 6 }} component="li">
                <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, px: 2, py: 1.5, height: '100%' }}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                    <Typography variant="subtitle1">{c.name || c.addressType}</Typography>
                    {c.main && <Chip label="Principal" size="small" color="primary" />}
                  </Stack>
                  <Typography variant="caption" color="text.secondary" component="p">
                    {c.addressType}
                    {c.position ? ` · ${c.position}` : ''}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, wordBreak: 'break-word' }}>
                    {channels(c).join(' · ')}
                  </Typography>
                  {c.observation && (
                    <Typography variant="caption" color="text.secondary" component="p" sx={{ mt: 0.5 }}>
                      {c.observation}
                    </Typography>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        ))}

      {tab === 'works' && (
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
                  ? 'Este proveedor todavía no está asignado a ninguna obra. Asígnalo aquí o desde la pestaña Proveedores de la obra.'
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

      {tab === 'invoices' && (
        <InvoicesTab
          filter={{ prvId: provider.prvId }}
          emptyTitle="Todavía no hay facturas de este proveedor."
          emptyText="Se registran desde la pestaña Facturas de la obra (simple) o del contrato (anticipo, liquidación y devolución de retenido). Un proveedor con facturas no se puede desasignar de esa obra."
        />
      )}

      <WorkProviderDialog
        open={Boolean(assignDialog)}
        prvId={provider.prvId}
        assignment={assignDialog?.assignment ?? null}
        onClose={() => setAssignDialog(null)}
        onSaved={assignmentSaved}
      />

      <ConfirmDialog
        open={Boolean(confirm)}
        onClose={() => setConfirm(null)}
        onConfirm={runConfirmed}
        title={confirm?.title}
        message={confirm?.message}
        confirmLabel={confirm?.label}
        confirmColor={confirm?.color}
      />
    </RouteDialog>
  );
}
