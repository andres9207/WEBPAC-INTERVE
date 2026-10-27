import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
  IconAlertTriangle,
  IconCalendarX,
  IconChecklist,
  IconClockHour4,
  IconCurrencyDollar,
  IconFileText,
  IconFlag,
  IconPlayerPause,
  IconReceipt,
  IconShieldX,
  IconWallet
} from '@tabler/icons-react';

import MainCard from 'ui-component/cards/MainCard';
import StatusChip from 'ui-component/extended/StatusChip';
import { ACTION_TONES } from 'ui-component/extended/ActionButton';
import { gridSpacing } from 'store/constant';
import { fMoneyText, fPercentText } from 'utils/formatNumber';
import { fDateOnly } from 'utils/formatTime';
import { INVOICE_STATE_COLORS, STATUS, fTerm } from 'utils/constants';

import DashboardCards from '../components/DashboardCards';
import { contractRows, daysOpenText, followUpsDrill, invoiceRows, useDrillDown } from './DrillDownDialog';
import { MANAGER_ROLE_NAMES, barPercent, dashboardTo, initialsOf, plural } from './workDashboard.utils';
import WorkContracts from './WorkContracts';
import WorkCosts from './WorkCosts';

// Resumen de la obra (DEC-063): encabezado con el avance del plazo, cifras,
// contratos con sus saldos, lo que hay por atender, etapas, facturas y
// proveedores. Solo presenta y enlaza: las cifras llegan del servidor. Las
// cifras de contratos y facturas y las etapas abren su detalle (DrillDownDialog).

const LEVEL_COLORS = { NORMAL: 'primary.800', WARNING: 'orange.dark', CRITICAL: 'error.dark' };
const num = { fontVariantNumeric: 'tabular-nums' };
const CONTRACT_NOUN = ['contrato', 'contratos'];
const INVOICE_NOUN = ['factura', 'facturas'];

function Empty({ children }) {
  return (
    <Typography variant="body2" color="text.secondary">
      {children}
    </Typography>
  );
}

Empty.propTypes = { children: PropTypes.node };

function Bar({ percent, color = 'primary.800', label }) {
  return (
    <LinearProgress
      variant="determinate"
      value={barPercent(percent)}
      aria-label={label}
      sx={{ height: 8, borderRadius: 4, bgcolor: 'grey.200', '& .MuiLinearProgress-bar': { bgcolor: color, borderRadius: 4 } }}
    />
  );
}

Bar.propTypes = { percent: PropTypes.string, color: PropTypes.string, label: PropTypes.string };

/** Encabezado: la obra, su estado, sus responsables y el avance del plazo. */
function WorkHero({ work, referenceDate }) {
  const remaining = work.remainingDays;
  const remainingText =
    remaining === null
      ? ''
      : remaining >= 0
        ? `Faltan ${plural(remaining, 'día', 'días')}`
        : `Venció hace ${plural(-remaining, 'día', 'días')}`;
  return (
    <MainCard>
      <Stack spacing={2.5}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} justifyContent="space-between" alignItems={{ md: 'flex-start' }}>
          <Stack spacing={0.75} sx={{ minWidth: 0 }}>
            <Typography variant="caption" color="text.secondary">
              Tablero de la obra · cifras al {fDateOnly(referenceDate)}
            </Typography>
            <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" useFlexGap>
              <Typography variant="h2" component="h1">
                <Link component={RouterLink} to={dashboardTo.work(work.wrkId)} underline="hover" color="inherit">
                  {work.code} · {work.name}
                </Link>
              </Typography>
              <StatusChip staId={work.staId} label={work.statusName} />
              {work.state === 'FINISHED' && (
                <Chip size="small" variant="outlined" label={`${work.stateName} el ${fDateOnly(work.finishDate)}`} />
              )}
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {[work.constructionCompany, work.contractType, work.supervisionType && `Interventoría ${work.supervisionType.toLowerCase()}`]
                .filter(Boolean)
                .join(' · ')}
            </Typography>
          </Stack>
          {work.managers.length > 0 && (
            <Stack
              spacing={1}
              sx={{ minWidth: 220 }}
              component="ul"
              aria-label="Responsables de la obra"
              style={{ listStyle: 'none', margin: 0, padding: 0 }}
            >
              {work.managers.map((m) => (
                <Stack component="li" key={`${m.name}-${m.role}`} direction="row" spacing={1.25} alignItems="center">
                  <Avatar
                    aria-hidden
                    sx={{
                      width: 40,
                      height: 40,
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      ...(m.role === 'MAIN'
                        ? { bgcolor: 'primary.light', color: 'primary.800' }
                        : { bgcolor: 'secondary.light', color: 'secondary.dark' })
                    }}
                  >
                    {initialsOf(m.name)}
                  </Avatar>
                  <Stack>
                    <Typography variant="subtitle1">{m.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {MANAGER_ROLE_NAMES[m.role] ?? m.role}
                    </Typography>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          )}
        </Stack>

        {work.progressPercent !== null && (
          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1.5} flexWrap="wrap" useFlexGap>
              <Typography variant="h4" component="p">
                Avance del plazo: <span style={num}>{work.progressPercent} %</span>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {remainingText} · termina el {fDateOnly(work.endDate)}
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={work.progressPercent}
              aria-label="Avance del plazo"
              sx={{
                height: 14,
                borderRadius: 7,
                bgcolor: 'grey.200',
                '& .MuiLinearProgress-bar': {
                  bgcolor: work.staId === STATUS.ACTIVE ? (LEVEL_COLORS[work.progressLevel] ?? 'primary.800') : 'grey.500',
                  borderRadius: 7
                }
              }}
            />
            <Stack direction="row" justifyContent="space-between" spacing={1} flexWrap="wrap" useFlexGap>
              <Typography variant="caption" color="text.secondary">
                Inicio {fDateOnly(work.startDate)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Plazo {fTerm(work.initialTerm, work.termUnit)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Fin {fDateOnly(work.endDate)}
              </Typography>
            </Stack>
          </Stack>
        )}
      </Stack>
    </MainCard>
  );
}

WorkHero.propTypes = { work: PropTypes.object.isRequired, referenceDate: PropTypes.string };

/**
 * Lo que hay por atender en la obra, armado con las cifras del servidor. Cada
 * aviso dice cuántos registros abarca (`count`): uno agrupa varios contratos
 * o facturas, y la cifra del tablero suma registros, no avisos.
 */
const attentionOf = (data) => {
  const list = [];
  const { contracts, invoices, work } = data;
  // Obra finalizada (DEC-083): no exige los contratos liquidados, pero avisa los que faltan.
  if (work?.state === 'FINISHED' && contracts?.toLiquidate.count > 0) {
    const pending = contracts.items.filter((c) => contracts.toLiquidate.ctrIds.includes(c.ctrId));
    list.push({
      key: 'to-liquidate',
      count: pending.length,
      text: `Obra finalizada con ${plural(pending.length, 'contrato', 'contratos')} por liquidar`,
      hint: pending.map((c) => `${c.number} · ${c.stateName.toLowerCase()}`).join(', '),
      icon: IconChecklist,
      tone: ACTION_TONES.danger,
      ...(pending.length === 1
        ? { to: dashboardTo.contract(pending[0].ctrId) }
        : {
            drill: {
              title: 'Contratos por liquidar',
              subtitle: 'Valor vigente',
              total: contracts.toLiquidate.value,
              noun: CONTRACT_NOUN,
              rows: contractRows(pending)
            }
          })
    });
  }
  // Contratos vencidos: en ejecución con la fecha fin ya pasada (alerta "Contrato vencido" del listado).
  const expired = contracts?.items.filter((c) => c.alerts.includes('EXPIRED')) ?? [];
  if (expired.length > 0) {
    list.push({
      key: 'expired-contracts',
      count: expired.length,
      text: plural(expired.length, 'contrato vencido', 'contratos vencidos'),
      hint: expired.map((c) => `${c.number} · venció el ${fDateOnly(c.endDate)}`).join(', '),
      icon: IconCalendarX,
      tone: ACTION_TONES.danger,
      ...(expired.length === 1
        ? { to: dashboardTo.contract(expired[0].ctrId) }
        : { drill: { title: 'Contratos vencidos', subtitle: 'Valor vigente', noun: CONTRACT_NOUN, rows: contractRows(expired) } })
    });
  }
  if (contracts?.policies) {
    const byCtr = new Map(contracts.items.map((c) => [c.ctrId, c]));
    for (const p of contracts.policies.filter((x) => x.validity === 'EXPIRED')) {
      list.push({
        key: `expired-${p.polId}`,
        count: 1,
        text: `Póliza vencida en ${byCtr.get(p.ctrId)?.number ?? 'un contrato'}`,
        hint: `${p.typeName ?? p.number} · venció el ${fDateOnly(p.endDate)}`,
        icon: IconShieldX,
        tone: ACTION_TONES.danger,
        to: dashboardTo.contract(p.ctrId)
      });
    }
    for (const p of contracts.policies.filter((x) => x.validity === 'EXPIRING')) {
      list.push({
        key: `expiring-${p.polId}`,
        count: 1,
        text: `Póliza por vencer en ${byCtr.get(p.ctrId)?.number ?? 'un contrato'}`,
        hint: `${p.typeName ?? p.number} · vence el ${fDateOnly(p.endDate)}`,
        icon: IconClockHour4,
        tone: ACTION_TONES.danger,
        to: dashboardTo.contract(p.ctrId)
      });
    }
    const uncovered = contracts.items.filter((c) => c.policies?.uncovered.length > 0);
    if (uncovered.length > 0) {
      list.push({
        key: 'uncovered',
        count: uncovered.length,
        text: `${plural(uncovered.length, 'contrato', 'contratos')} con conceptos sin póliza`,
        hint: uncovered.map((c) => `${c.number}: ${c.policies.uncovered.map((u) => u.label).join(', ')}`).join(' · '),
        icon: IconAlertTriangle,
        tone: ACTION_TONES.info,
        ...(uncovered.length === 1
          ? { to: dashboardTo.contract(uncovered[0].ctrId) }
          : {
              drill: {
                title: 'Contratos con conceptos sin póliza',
                subtitle: 'Valor vigente',
                noun: CONTRACT_NOUN,
                rows: contractRows(uncovered)
              }
            })
      });
    }
  }
  if (invoices?.pendingCount > 0) {
    const last = invoices.pending[0];
    list.push({
      key: 'pending',
      count: invoices.pendingCount,
      text: `${plural(invoices.pendingCount, 'factura', 'facturas')} por aprobar`,
      hint: last
        ? `${last.typeName} ${last.number}${last.value ? ` · ${fMoneyText(last.value)}` : ''}`
        : 'Registradas, pendientes de aprobación',
      icon: IconReceipt,
      tone: ACTION_TONES.edit,
      ...(invoices.pendingCount === 1 && last
        ? { to: dashboardTo.invoice(last.invId) }
        : {
            drill: {
              title: 'Facturas por aprobar',
              total: invoices.pendingValue,
              noun: INVOICE_NOUN,
              rows: invoiceRows(invoices.items.filter((inv) => inv.state === 'REGISTERED'))
            }
          })
    });
  }
  // Seguimientos abiertos (DEC-076): lo que se está trabajando sobre las facturas de la obra.
  if (invoices?.followUps?.count > 0) {
    const { count, items } = invoices.followUps;
    const oldest = items[0];
    list.push({
      key: 'follow-ups',
      count,
      text: `${plural(count, 'factura', 'facturas')} con seguimiento abierto`,
      hint: oldest ? `${oldest.typeName} ${oldest.number} · ${oldest.description} · ${daysOpenText(oldest.daysOpen).toLowerCase()}` : '',
      icon: IconFlag,
      tone: ACTION_TONES.edit,
      ...(count === 1 && oldest ? { to: dashboardTo.invoice(oldest.invId) } : { drill: followUpsDrill(invoices.followUps) })
    });
  }
  for (const c of contracts?.withRetentionBalance ?? []) {
    list.push({
      key: `retention-${c.ctrId}`,
      count: 1,
      text: `Retenido por devolver: ${fMoneyText(c.balance)}`,
      hint: `${c.number} · ${c.stateName.toLowerCase()}`,
      icon: IconWallet,
      tone: ACTION_TONES.neutral,
      to: dashboardTo.contract(c.ctrId)
    });
  }
  const suspended = contracts?.items.filter((c) => c.state === 'SUSPENDED') ?? [];
  if (suspended.length > 0) {
    list.push({
      key: 'suspended',
      count: suspended.length,
      text: `${plural(suspended.length, 'contrato suspendido', 'contratos suspendidos')}`,
      hint: `${suspended.map((c) => c.number).join(', ')} · esperan el otrosí que los reanuda`,
      icon: IconPlayerPause,
      tone: ACTION_TONES.neutral,
      ...(suspended.length === 1
        ? { to: dashboardTo.contract(suspended[0].ctrId) }
        : {
            drill: {
              title: 'Contratos suspendidos',
              subtitle: 'Valor vigente',
              noun: CONTRACT_NOUN,
              rows: contractRows(suspended)
            }
          })
    });
  }
  return list;
};

const ATTENTION_ID = 'por-atender';
// Avisos que nombra la cifra "Por atender"; el resto, en la tarjeta.
const ATTENTION_HINT_ITEMS = 2;

function AttentionCard({ items, onDrill }) {
  return (
    <MainCard title="Por atender en la obra" sx={{ height: '100%' }} contentSX={{ px: 1.5 }} id={ATTENTION_ID}>
      {items.length === 0 ? (
        <Box sx={{ px: 1.5 }}>
          <Empty>
            Nada por atender: sin pólizas vencidas ni por vencer, conceptos sin póliza, facturas por aprobar o con seguimiento abierto, ni
            retenido por devolver.
          </Empty>
        </Box>
      ) : (
        <List disablePadding aria-label="Por atender en la obra">
          {items.map(({ key, text, hint, icon: Icon, tone, to, drill }) => (
            <ListItemButton
              key={key}
              {...(to ? { component: RouterLink, to } : { onClick: () => onDrill(drill) })}
              sx={{ borderRadius: 1, gap: 1.5, minHeight: 44 }}
            >
              <Avatar variant="rounded" sx={{ width: 36, height: 36, bgcolor: tone.bg, color: tone.fg, borderRadius: 1.5 }} aria-hidden>
                <Icon size={20} stroke={1.8} />
              </Avatar>
              <ListItemText
                primary={text}
                secondary={hint}
                slotProps={{ primary: { variant: 'subtitle1' }, secondary: { variant: 'caption' } }}
              />
            </ListItemButton>
          ))}
        </List>
      )}
    </MainCard>
  );
}

AttentionCard.propTypes = { items: PropTypes.arrayOf(PropTypes.object).isRequired, onDrill: PropTypes.func.isRequired };

function StagesCard({ stages, contracts, onDrill }) {
  return (
    <MainCard title="Etapas" sx={{ height: '100%' }}>
      {stages.length === 0 ? (
        <Empty>La obra no tiene etapas.</Empty>
      ) : (
        <List disablePadding dense aria-label="Etapas de la obra">
          {stages.map((s) => {
            const own = contracts?.filter((c) => c.wksId === s.wksId) ?? null;
            const detail = [
              !s.active && 'Inactiva',
              own && (own.length === 0 ? 'Sin contratos' : own.map((c) => `${c.number} · ${c.stateName.toLowerCase()}`).join(', '))
            ]
              .filter(Boolean)
              .join(' · ');
            return (
              <ListItem key={s.wksId} divider disableGutters sx={{ gap: 1 }}>
                <ListItemText
                  primary={
                    own?.length > 0 ? (
                      <Link
                        component="button"
                        type="button"
                        variant="body2"
                        underline="hover"
                        onClick={() =>
                          onDrill({
                            title: `Contratos de la etapa ${s.name}`,
                            subtitle: 'Valor vigente',
                            noun: CONTRACT_NOUN,
                            rows: contractRows(own)
                          })
                        }
                        sx={{ textAlign: 'left', fontWeight: s.active ? 500 : 400, color: s.active ? 'text.primary' : 'text.secondary' }}
                      >
                        {s.name}
                      </Link>
                    ) : (
                      s.name
                    )
                  }
                  slotProps={{
                    primary: { variant: 'body2', sx: s.active ? { fontWeight: 500, color: 'text.primary' } : { color: 'text.secondary' } }
                  }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'right' }}>
                  {detail}
                </Typography>
              </ListItem>
            );
          })}
        </List>
      )}
    </MainCard>
  );
}

StagesCard.propTypes = {
  stages: PropTypes.arrayOf(PropTypes.object).isRequired,
  contracts: PropTypes.arrayOf(PropTypes.object),
  onDrill: PropTypes.func.isRequired
};

function InvoicesCard({ invoices, onDrill }) {
  return (
    <MainCard
      title="Facturas de la obra"
      secondary={
        <Link
          component="button"
          type="button"
          underline="hover"
          variant="body2"
          onClick={() =>
            onDrill({
              title: 'Facturas de la obra',
              subtitle: 'Registradas y aprobadas',
              total: invoices.total,
              noun: INVOICE_NOUN,
              rows: invoiceRows([...invoices.items].reverse())
            })
          }
        >
          Ver todas
        </Link>
      }
      sx={{ height: '100%' }}
      contentSX={{ px: 1.5 }}
    >
      {invoices.latest.length === 0 ? (
        <Box sx={{ px: 1.5 }}>
          <Empty>Todavía no hay facturas en esta obra.</Empty>
        </Box>
      ) : (
        <List disablePadding aria-label="Últimas facturas de la obra">
          {invoices.latest.map((inv) => (
            <ListItemButton key={inv.invId} component={RouterLink} to={dashboardTo.invoice(inv.invId)} sx={{ borderRadius: 1, gap: 1 }}>
              <ListItemText
                primary={`${inv.typeName} ${inv.number}`}
                secondary={[inv.providerName, fDateOnly(inv.date), inv.value && fMoneyText(inv.value)].filter(Boolean).join(' · ')}
                slotProps={{ primary: { variant: 'subtitle1' }, secondary: { variant: 'caption' } }}
              />
              <Chip size="small" label={inv.stateName} color={INVOICE_STATE_COLORS[inv.state]} variant="outlined" />
            </ListItemButton>
          ))}
        </List>
      )}
    </MainCard>
  );
}

InvoicesCard.propTypes = { invoices: PropTypes.object.isRequired, onDrill: PropTypes.func.isRequired };

function ProvidersCard({ providers }) {
  return (
    <MainCard title="Proveedores asignados" sx={{ height: '100%' }}>
      {providers.length === 0 ? (
        <Empty>La obra no tiene proveedores asignados.</Empty>
      ) : (
        <List disablePadding dense aria-label="Proveedores asignados">
          {providers.map((p) => (
            <ListItem key={p.prvId} divider disableGutters sx={{ gap: 1 }}>
              <ListItemText
                primary={
                  <Link component={RouterLink} to={dashboardTo.provider(p.prvId)} underline="hover" sx={{ fontWeight: 500 }}>
                    {p.name}
                  </Link>
                }
                secondary={[`Asignado el ${fDateOnly(p.assignmentDate)}`, p.contracts.join(', ')].filter(Boolean).join(' · ')}
                slotProps={{ secondary: { variant: 'caption' } }}
              />
              <StatusChip staId={p.staId} label={p.statusName} />
            </ListItem>
          ))}
        </List>
      )}
    </MainCard>
  );
}

ProvidersCard.propTypes = { providers: PropTypes.arrayOf(PropTypes.object).isRequired };

export default function WorkSummaryTab({ data, workLabel }) {
  const { work, contracts, invoices, providers } = data;
  const { openDrill, dialog } = useDrillDown();

  const kpis = [];
  if (work) {
    kpis.push({
      label: 'Valor vigente',
      value: fMoneyText(work.currentValue),
      hint: work.extended ? `Ampliado · inicial ${fMoneyText(work.initialValue)}` : 'Valor inicial de la obra',
      icon: IconCurrencyDollar,
      tone: ACTION_TONES.info,
      to: dashboardTo.work(work.wrkId)
    });
  }
  if (contracts) {
    kpis.push({
      label: 'Contratado',
      value: fMoneyText(contracts.contracted),
      hint: [
        contracts.contractedPct && `${fPercentText(contracts.contractedPct, 1)} del valor vigente`,
        plural(contracts.total, 'contrato', 'contratos')
      ]
        .filter(Boolean)
        .join(' · '),
      icon: IconFileText,
      tone: ACTION_TONES.success,
      onClick: () =>
        openDrill({
          title: 'Contratos de la obra',
          subtitle: 'Valor vigente',
          total: contracts.contracted,
          noun: CONTRACT_NOUN,
          rows: contractRows(contracts.items),
          emptyText: 'La obra todavía no tiene contratos.'
        })
    });
  }
  if (invoices) {
    // Las aprobadas pueden ser de varias vistas (DEC-054): el detalle las junta.
    kpis.push({
      label: 'Facturado aprobado',
      value: fMoneyText(invoices.approvedValue),
      hint: `${plural(invoices.approvedCount, 'factura aprobada', 'facturas aprobadas')} · ${invoices.pendingCount} por aprobar`,
      icon: IconReceipt,
      tone: ACTION_TONES.edit,
      onClick: () =>
        openDrill({
          title: 'Facturas aprobadas',
          total: invoices.approvedValue,
          noun: INVOICE_NOUN,
          rows: invoiceRows(invoices.items.filter((inv) => inv.state === 'APPROVED')),
          emptyText: 'La obra todavía no tiene facturas aprobadas.'
        })
    });
  }
  const attention = attentionOf(data);
  if (contracts || invoices) {
    // La cifra suma registros; el texto dice cuáles, y el clic lleva al detalle (tarjeta "Por atender en la obra").
    const shown = attention.slice(0, ATTENTION_HINT_ITEMS).map((a) => a.text);
    const rest = attention.length - shown.length;
    kpis.push({
      label: 'Por atender',
      value: String(attention.reduce((sum, a) => sum + a.count, 0)),
      hint:
        attention.length === 0
          ? 'Nada por atender'
          : [...shown, ...(rest > 0 ? [`y ${plural(rest, 'aviso', 'avisos')} más`] : [])].join(' · '),
      icon: IconAlertTriangle,
      tone: ACTION_TONES.danger,
      onClick: () => {
        const card = document.getElementById(ATTENTION_ID);
        card?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        card?.querySelector('a, button')?.focus({ preventScroll: true });
      }
    });
  }

  return (
    <Stack spacing={gridSpacing}>
      {work ? (
        <WorkHero work={work} referenceDate={data.referenceDate} />
      ) : (
        <Typography variant="h2" component="h1">
          {workLabel}
        </Typography>
      )}

      <DashboardCards items={kpis} />

      {invoices && <WorkCosts invoices={invoices} onDrill={openDrill} />}

      {(contracts || invoices) && (
        <Grid container spacing={gridSpacing}>
          {contracts && (
            <Grid size={{ xs: 12, lg: 8 }}>
              <WorkContracts contracts={contracts} />
            </Grid>
          )}
          <Grid size={{ xs: 12, lg: contracts ? 4 : 12 }}>
            <AttentionCard items={attention} onDrill={openDrill} />
          </Grid>
        </Grid>
      )}

      <Grid container spacing={gridSpacing}>
        {work && (
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <StagesCard stages={work.stages} contracts={contracts?.items ?? null} onDrill={openDrill} />
          </Grid>
        )}
        {invoices && (
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <InvoicesCard invoices={invoices} onDrill={openDrill} />
          </Grid>
        )}
        {providers && (
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <ProvidersCard providers={providers} />
          </Grid>
        )}
      </Grid>

      {dialog}
    </Stack>
  );
}

WorkSummaryTab.propTypes = { data: PropTypes.object.isRequired, workLabel: PropTypes.string };
