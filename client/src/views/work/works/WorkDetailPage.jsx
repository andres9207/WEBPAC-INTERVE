import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
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
import StatusChip from 'ui-component/extended/StatusChip';
import { worksApi } from 'api/requests/worksApi';
import { useAuth } from 'contexts/AuthContext';
import { showError, showSuccess } from 'services/ToastService';
import { fMoneyText } from 'utils/formatNumber';
import { fDateOnly, fDateTime } from 'utils/formatTime';
import { fTerm } from 'utils/constants';

/**
 * Detalle de una obra (DEC-030): encabezado con identidad, estado y cifras
 * clave, y pestañas por parte del agregado. Todo lo que se muestra lo calcula
 * el servidor (valor vigente, fecha final); aquí solo se formatea.
 *
 * Activar, desactivar y eliminar viven aquí, no en el listado. Contactos y
 * contratos ya tienen su pestaña, aunque todavía no existen (PRO-BD-04 y el
 * módulo de contratos).
 */

const TABS = [
  { key: 'summary', label: 'Resumen' },
  { key: 'managers', label: 'Responsables' },
  { key: 'stages', label: 'Etapas' },
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

function Figure({ label, value, hint }) {
  return (
    <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, bgcolor: 'grey.50', px: 2, py: 1.5, height: '100%' }}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h4" component="p" sx={{ fontVariantNumeric: 'tabular-nums', color: 'text.dark', my: 0.5 }}>
        {value || '—'}
      </Typography>
      {hint && (
        <Typography variant="caption" color="text.secondary">
          {hint}
        </Typography>
      )}
    </Box>
  );
}

Figure.propTypes = { label: PropTypes.string.isRequired, value: PropTypes.node, hint: PropTypes.string };

function DataList({ items }) {
  return (
    <Box component="dl" sx={{ m: 0, display: 'grid', gridTemplateColumns: 'minmax(140px, auto) 1fr', columnGap: 2, rowGap: 1 }}>
      {items.map(([label, value]) => (
        <Box key={label} sx={{ display: 'contents' }}>
          <Typography component="dt" variant="body2" color="text.secondary">
            {label}
          </Typography>
          <Typography component="dd" variant="body2" sx={{ m: 0, fontVariantNumeric: 'tabular-nums' }}>
            {value || '—'}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

DataList.propTypes = { items: PropTypes.arrayOf(PropTypes.array).isRequired };

function Pending({ title, text }) {
  return (
    <Box sx={{ border: '1px dashed', borderColor: 'grey.300', borderRadius: 2, py: 5, px: 2, textAlign: 'center' }}>
      <Typography variant="subtitle1" sx={{ color: 'text.primary', mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 520, mx: 'auto' }}>
        {text}
      </Typography>
    </Box>
  );
}

Pending.propTypes = { title: PropTypes.string.isRequired, text: PropTypes.string.isRequired };

export default function WorkDetailPage() {
  const { wrkId } = useParams();
  const navigate = useNavigate();
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

  if (loading && !work) {
    return (
      <Box display="flex" justifyContent="center" sx={{ py: 8 }} role="status" aria-label="Cargando">
        <CircularProgress />
      </Box>
    );
  }
  if (!work) return null;

  const active = work.staId === 1;
  const activeManagers = work.managers.filter((m) => m.staId === 1);
  const mainManager = activeManagers.find((m) => m.role === 'MAIN');

  const changeStatus = async () => {
    const { data } = await worksApi.changeStatus({ wrkId: work.wrkId, staId: active ? 2 : 1 });
    showSuccess(data.message);
    load();
  };

  const remove = async () => {
    const { data } = await worksApi.remove({ wrkId: work.wrkId });
    showSuccess(data.message);
    navigate('/work/works');
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

  const tabBadge = { managers: work.managers.length, stages: work.stages.length, contacts: 0, contracts: 0 };

  return (
    <Stack spacing={2}>
      <Link
        component={RouterLink}
        to="/work/works"
        underline="hover"
        sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, alignSelf: 'flex-start' }}
      >
        <IconChevronLeft size={16} aria-hidden="true" />
        Obras
      </Link>

      <MainCard>
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 2, justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ flex: '1 1 420px' }}>
            <Stack direction="row" sx={{ flexWrap: 'wrap', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
              <Typography variant="h3" component="h1">
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
              <Button variant="contained" color="secondary" onClick={() => navigate(`/work/works/${work.wrkId}/edit`)}>
                Editar obra
              </Button>
            )}
          </Stack>
        </Stack>

        <Grid container spacing={1.5} sx={{ mt: 2.5 }}>
          {figures.map((figure) => (
            <Grid key={figure.label} size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
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
          aria-label="Partes de la obra"
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
                      <StatusChip staId={m.staId} label={m.staId === 1 ? 'Activo' : 'Inactivo'} />
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
                      <StatusChip staId={s.staId} label={s.staId === 1 ? 'Activa' : 'Inactiva'} />
                    </Stack>
                  ))}
              </Box>
            ))}

          {tab === 'contacts' && (
            <Pending
              title="Todavía no hay contactos en esta obra."
              text="Cada contacto tendrá nombre, cargo, tipo de dirección, dirección, teléfono y correo, y se editará dentro de la obra. Llega con PRO-BD-04."
            />
          )}

          {tab === 'contracts' && (
            <Pending
              title="Todavía no hay contratos en esta obra."
              text="Aquí se listarán los contratos de la obra con su proveedor, etapa, valor vigente y estado. Una obra con contratos no se puede eliminar. Llega con el módulo de contratos."
            />
          )}
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
