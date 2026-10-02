import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
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
import { DataList, Figure, Pending } from 'ui-component/extended/DetailBlocks';
import RouteDialog from 'ui-component/extended/RouteDialog';
import StatusChip from 'ui-component/extended/StatusChip';
import WorkProvidersTab from 'views/work/providers/components/WorkProvidersTab';
import WorkContractsTab from 'views/work/contracts/components/WorkContractsTab';
import { worksApi } from 'api/requests/worksApi';
import { useAuth } from 'contexts/AuthContext';
import { showError, showSuccess } from 'services/ToastService';
import { fMoneyText } from 'utils/formatNumber';
import { fDateOnly, fDateTime } from 'utils/formatTime';
import { STATUS, fTerm } from 'utils/constants';

/**
 * Detalle de una obra (DEC-030), en un modal sobre el listado con dirección
 * propia `/work/works/:wrkId` (DEC-034): encabezado con identidad y estado,
 * pestañas por parte del agregado y cifras clave en el resumen. Todo lo que se muestra lo calcula
 * el servidor (valor vigente, fecha final); aquí solo se formatea.
 *
 * Activar, desactivar y eliminar viven aquí, no en el listado. Los proveedores
 * se asignan y desasignan desde su pestaña, con endpoints propios (DEC-031).
 * Los contratos de la obra se listan en su pestaña (DEC-035). Contactos ya
 * tiene su pestaña, aunque todavía no existen (PRO-BD-04).
 */

const TABS = [
  { key: 'summary', label: 'Resumen' },
  { key: 'managers', label: 'Responsables' },
  { key: 'stages', label: 'Etapas' },
  { key: 'providers', label: 'Proveedores' },
  { key: 'contacts', label: 'Contactos' },
  { key: 'contracts', label: 'Contratos' }
];

const initials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();

export default function WorkDetailPage() {
  const { wrkId } = useParams();
  const navigate = useNavigate();
  const { refresh } = useOutletContext() ?? {};
  const { permissionsCatalog, hasPermission } = useAuth();
  const canDo = (perId) => perId != null && hasPermission(perId);
  const perms = permissionsCatalog.work?.works;

  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('summary');
  const [confirm, setConfirm] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await worksApi.getById({ wrkId });
      setWork(data);
    } catch (err) {
      showError(err.response?.data?.message || 'Error al cargar la obra');
      if (err.response?.status === 404) navigate('/work/works', { replace: true });
    } finally {
      setLoading(false);
    }
  }, [wrkId, navigate]);

  useEffect(() => {
    load();
  }, [load]);

  const close = () => navigate('/work/works');

  if (!work) return <RouteDialog onClose={close} loading={loading} />;

  const active = work.staId === STATUS.ACTIVE;
  const activeManagers = work.managers.filter((m) => m.staId === STATUS.ACTIVE);
  const mainManager = activeManagers.find((m) => m.role === 'MAIN');

  const changeStatus = async () => {
    const { data } = await worksApi.changeStatus({ wrkId: work.wrkId, staId: active ? STATUS.INACTIVE : STATUS.ACTIVE });
    showSuccess(data.message);
    load();
    refresh?.();
  };

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

  const figures = [
    { label: 'Valor vigente', value: fMoneyText(work.currentValue), hint: work.extendedValue ? 'Valor ampliado' : 'Valor inicial' },
    {
      label: 'Plazo inicial',
      value: fTerm(work.initialTerm, work.termUnit),
      hint: work.endDate ? `Termina el ${fDateOnly(work.endDate)}` : ''
    },
    { label: 'Costo directo', value: fMoneyText(work.directCost) },
    { label: 'Valor máx. orden de servicio', value: fMoneyText(work.maxServiceOrderValue) },
    { label: 'Responsables activos', value: String(activeManagers.length), hint: `Principal: ${mainManager?.name ?? 'sin asignar'}` },
    { label: 'Etapas', value: String(work.stages.length) }
  ];

  const tabBadge = {
    managers: work.managers.length,
    stages: work.stages.length,
    providers: work.providersCount,
    contacts: 0,
    contracts: work.contractsCount
  };

  const providersChanged = () => {
    load();
    refresh?.();
  };

  return (
    <RouteDialog
      onClose={close}
      labelledBy="work-title"
      header={
        <>
          <Stack direction="row" sx={{ flexWrap: 'wrap', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <Typography id="work-title" variant="h3" component="h2">
              {work.code} · {work.name}
            </Typography>
            <StatusChip staId={work.staId} label={active ? 'Activa' : 'Inactiva'} />
          </Stack>
          <Typography variant="body2" color="text.secondary">
            {work.constructionCompany} · {work.contractType} · Interventoría {work.supervisionType?.toLowerCase()}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Modificada el {fDateTime(work.updatedAt)} por {work.updatedByName ?? '—'}
          </Typography>
        </>
      }
      tabs={
        <Tabs value={tab} onChange={(_, value) => setTab(value)} variant="scrollable" scrollButtons="auto" aria-label="Partes de la obra">
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
            <Button variant="contained" color="secondary" onClick={() => navigate(`/work/works/${work.wrkId}/edit`)}>
              Editar obra
            </Button>
          )}
        </>
      }
    >
      {tab === 'summary' && (
        <Stack spacing={2}>
          <Grid container spacing={1.5}>
            {figures.map((figure) => (
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

      {tab === 'managers' &&
        (work.managers.length === 0 ? (
          <Pending title="Sin responsables." text="Agrégalos editando la obra." />
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
                  <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.800', width: 40, height: 40, fontSize: 14 }} aria-hidden="true">
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
          <Pending title="Sin etapas." text="Agrégalas editando la obra." />
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

      {tab === 'providers' && <WorkProvidersTab wrkId={work.wrkId} workCode={work.code} onChanged={providersChanged} />}

      {tab === 'contacts' && (
        <Pending
          title="Todavía no hay contactos en esta obra."
          text="Cada contacto tendrá nombre, cargo, tipo de dirección, dirección, teléfono y correo, y se editará dentro de la obra. Llega con PRO-BD-04."
        />
      )}

      {tab === 'contracts' && <WorkContractsTab wrkId={work.wrkId} />}

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
