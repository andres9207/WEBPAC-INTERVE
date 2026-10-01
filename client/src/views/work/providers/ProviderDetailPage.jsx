import { useCallback, useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { IconChevronLeft } from '@tabler/icons-react';

import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import ConfirmDialog from 'ui-component/extended/ConfirmDialog';
import { DataList, Figure, Pending } from 'ui-component/extended/DetailBlocks';
import StatusChip from 'ui-component/extended/StatusChip';
import { providersApi } from 'api/requests/providersApi';
import { useAuth } from 'contexts/AuthContext';
import { showError, showSuccess } from 'services/ToastService';
import { fDateOnly, fDateTime } from 'utils/formatTime';

/**
 * Detalle de un proveedor (ADR-0012, DEC-031): encabezado con identidad,
 * estado y autoría, y pestañas para sus datos, contactos y obras. Activar,
 * desactivar y eliminar viven aquí, no en el listado (DEC-030). Un proveedor
 * asignado a obras no se elimina: el servidor responde con el motivo.
 */

const TABS = [
  { key: 'summary', label: 'Resumen' },
  { key: 'contacts', label: 'Contactos' },
  { key: 'works', label: 'Obras' }
];

const channels = (c) =>
  [c.address, c.phone && `Tel. ${c.phone}`, c.mobile && `Cel. ${c.mobile}`, c.fax && `Fax ${c.fax}`, c.email].filter(Boolean);

export default function ProviderDetailPage() {
  const { prvId } = useParams();
  const navigate = useNavigate();
  const { permissionsCatalog, hasPermission } = useAuth();
  const canDo = (perId) => perId != null && hasPermission(perId);
  const perms = permissionsCatalog.work?.providers;
  const canViewWorks = canDo(permissionsCatalog.work?.works?.view);

  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('summary');
  const [confirm, setConfirm] = useState(null);

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

  if (loading && !provider) {
    return (
      <Box display="flex" justifyContent="center" sx={{ py: 8 }} role="status" aria-label="Cargando">
        <CircularProgress />
      </Box>
    );
  }
  if (!provider) return null;

  const active = provider.staId === 1;
  const documentText = `${provider.identityCode ?? ''} ${provider.identification}`;
  const mainContact = provider.contacts.find((c) => c.main);
  const activeWorks = provider.works.filter((w) => w.staId === 1).length;

  const changeStatus = async () => {
    const { data } = await providersApi.changeStatus({ prvId: provider.prvId, staId: active ? 2 : 1 });
    showSuccess(data.message);
    load();
  };

  const remove = async () => {
    const { data } = await providersApi.remove({ prvId: provider.prvId });
    showSuccess(data.message);
    navigate('/work/providers');
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
    { label: 'Tipo de proveedor', value: provider.providerType },
    { label: 'Obras', value: String(provider.worksCount), hint: `${activeWorks} con asignación activa` },
    {
      label: 'Contactos',
      value: String(provider.contacts.length),
      hint: mainContact ? `Principal: ${mainContact.name || mainContact.addressType}` : 'Sin principal'
    }
  ];

  const tabBadge = { contacts: provider.contacts.length, works: provider.worksCount };

  return (
    <Stack spacing={2}>
      <Link
        component={RouterLink}
        to="/work/providers"
        underline="hover"
        sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, alignSelf: 'flex-start' }}
      >
        <IconChevronLeft size={16} aria-hidden="true" />
        Proveedores
      </Link>

      <MainCard>
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 2, justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ flex: '1 1 420px' }}>
            <Stack direction="row" sx={{ flexWrap: 'wrap', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
              <Typography variant="h3" component="h1">
                {provider.name}
              </Typography>
              <StatusChip staId={provider.staId} label={active ? 'Activo' : 'Inactivo'} />
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {documentText} · {provider.providerType}
              {provider.serviceType ? ` · ${provider.serviceType}` : ''}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Modificado el {fDateTime(provider.updatedAt)} por {provider.updatedByName ?? '—'}
            </Typography>
          </Box>
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
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
            {canDo(perms?.edit) && (
              <Button variant="contained" color="secondary" onClick={() => navigate(`/work/providers/${provider.prvId}/edit`)}>
                Editar proveedor
              </Button>
            )}
          </Stack>
        </Stack>

        <Grid container spacing={1.5} sx={{ mt: 2.5 }}>
          {figures.map((figure) => (
            <Grid key={figure.label} size={{ xs: 12, sm: 6, md: 3 }}>
              <Figure {...figure} />
            </Grid>
          ))}
        </Grid>
      </MainCard>

      <MainCard content={false}>
        <Tabs
          value={tab}
          onChange={(_, value) => setTab(value)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Partes del proveedor"
          sx={{ px: 2, borderBottom: '1px solid', borderColor: 'divider' }}
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

        <Box sx={{ p: 3 }}>
          {tab === 'summary' && (
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <SubCard title="Identidad">
                  <DataList
                    items={[
                      ['Nombre o razón social', provider.name],
                      ['Tipo de identificación', provider.identityName],
                      ['Número de documento', provider.identification],
                      ['Tipo de proveedor', provider.providerType]
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

          {tab === 'works' &&
            (provider.works.length === 0 ? (
              <Pending
                title="Sin obras."
                text="Este proveedor todavía no está asignado a ninguna obra. Se asigna desde la pestaña Proveedores de la obra."
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
                      flexWrap: 'wrap'
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
                    <StatusChip staId={w.staId} label={w.staId === 1 ? 'Asignación activa' : 'Asignación inactiva'} />
                  </Stack>
                ))}
                {provider.worksCount > provider.works.length && (
                  <Typography variant="caption" color="text.secondary" component="li" sx={{ display: 'block', px: 2, py: 1 }}>
                    Se muestran las {provider.works.length} más recientes de {provider.worksCount}.
                  </Typography>
                )}
              </Box>
            ))}
        </Box>
      </MainCard>

      <ConfirmDialog
        open={Boolean(confirm)}
        onClose={() => setConfirm(null)}
        onConfirm={runConfirmed}
        title={confirm?.title}
        message={confirm?.message}
        confirmLabel={confirm?.label}
        confirmColor={confirm?.color}
      />
    </Stack>
  );
}
