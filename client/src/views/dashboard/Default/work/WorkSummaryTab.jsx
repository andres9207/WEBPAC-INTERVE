import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
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
  IconClockHour4,
  IconCurrencyDollar,
  IconFileText,
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
import { CONTRACT_STATE_COLORS, INVOICE_STATE_COLORS, STATUS, fTerm, invoicePath } from 'utils/constants';

import DashboardCards from '../components/DashboardCards';
import { MANAGER_ROLE_NAMES, POLICY_STATUS_COLORS, barPercent, initialsOf, plural } from './workDashboard.utils';

// Resumen de la obra (DEC-063): encabezado con el avance del plazo, cifras,
// contratos con sus saldos, lo que hay por atender, etapas, facturas y
// proveedores. Solo presenta y enlaza: las cifras llegan del servidor.

const LEVEL_COLORS = { NORMAL: 'primary.800', WARNING: 'orange.dark', CRITICAL: 'error.dark' };
const num = { fontVariantNumeric: 'tabular-nums' };

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
                <Link component={RouterLink} to={`/work/works/${work.wrkId}`} underline="hover" color="inherit">
                  {work.code} · {work.name}
                </Link>
              </Typography>
              <StatusChip staId={work.staId} label={work.statusName} />
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

/** Tarjeta de un contrato: valor vigente, anticipo, retenido y pólizas. */
function ContractCard({ contract }) {
  const policies = contract.policies;
  // La póliza de mayor exposición, que decide la categoría (DEC-064).
  const deciding = policies?.deciding;
  const policyHint = [
    deciding &&
      deciding.endDate &&
      `${deciding.number} ${deciding.validity === 'EXPIRED' ? 'venció' : 'vence'} el ${fDateOnly(deciding.endDate)}`,
    policies?.uncovered.length > 0 && `${policies.uncovered.map((c) => c.label).join(', ')} sin póliza`
  ]
    .filter(Boolean)
    .join(' · ');
  const hasAdvance = contract.advance.agreed !== '0.00';
  return (
    <Card variant="outlined" sx={{ height: '100%', borderRadius: 1.5 }}>
      <CardActionArea
        component={RouterLink}
        to={`/work/contracts/${contract.ctrId}`}
        sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 1.5 }}
      >
        <Stack direction="row" justifyContent="space-between" spacing={1} alignItems="flex-start">
          <Stack sx={{ minWidth: 0 }}>
            <Typography variant="subtitle1">
              {contract.number} · {contract.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {[contract.providerName, contract.stageName].filter(Boolean).join(' · ')}
            </Typography>
          </Stack>
          <Chip size="small" label={contract.stateName} color={CONTRACT_STATE_COLORS[contract.state]} variant="outlined" />
        </Stack>
        <Stack>
          <Typography variant="caption" color="text.secondary">
            Valor vigente
          </Typography>
          <Typography variant="h3" component="p" sx={num}>
            {fMoneyText(contract.currentValue)}
          </Typography>
        </Stack>
        {hasAdvance && (
          <Stack spacing={0.5}>
            <Stack direction="row" justifyContent="space-between" spacing={1}>
              <Typography variant="body2">Anticipo facturado</Typography>
              <Typography variant="body2" sx={num}>
                {fMoneyText(contract.advance.invoiced)} de {fMoneyText(contract.advance.agreed)}
              </Typography>
            </Stack>
            <Bar percent={contract.advance.invoicedPct} label={`Anticipo facturado: ${fPercentText(contract.advance.invoicedPct)}`} />
            <Typography variant="caption" color="text.secondary">
              Amortizado: {fMoneyText(contract.advance.amortized)}
              {contract.advance.toAmortize !== '0.00' && ` · pendiente ${fMoneyText(contract.advance.toAmortize)}`}
            </Typography>
          </Stack>
        )}
        {contract.retention.balance !== '0.00' && (
          <Stack direction="row" justifyContent="space-between" spacing={1} sx={{ pt: 1, borderTop: 1, borderColor: 'divider' }}>
            <Typography variant="body2">Retenido por devolver</Typography>
            <Typography variant="body2" sx={{ ...num, fontWeight: 600 }}>
              {fMoneyText(contract.retention.balance)}
            </Typography>
          </Stack>
        )}
        {policies && (
          <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
            <Typography variant="body2">Pólizas:</Typography>
            <Chip size="small" label={policies.statusName} color={POLICY_STATUS_COLORS[policies.status]} variant="outlined" />
            {policyHint && (
              <Typography variant="caption" color="text.secondary">
                {policyHint}
              </Typography>
            )}
          </Stack>
        )}
      </CardActionArea>
    </Card>
  );
}

ContractCard.propTypes = { contract: PropTypes.object.isRequired };

/** Lo que hay por atender en la obra, armado con las cifras del servidor. */
const attentionOf = (data) => {
  const list = [];
  const { contracts, invoices } = data;
  if (contracts?.policies) {
    const byCtr = new Map(contracts.items.map((c) => [c.ctrId, c]));
    for (const p of contracts.policies.filter((x) => x.validity === 'EXPIRED')) {
      list.push({
        key: `expired-${p.polId}`,
        text: `Póliza vencida en ${byCtr.get(p.ctrId)?.number ?? 'un contrato'}`,
        hint: `${p.typeName ?? p.number} · venció el ${fDateOnly(p.endDate)}`,
        icon: IconShieldX,
        tone: ACTION_TONES.danger,
        to: `/work/contracts/${p.ctrId}`
      });
    }
    for (const p of contracts.policies.filter((x) => x.validity === 'EXPIRING')) {
      list.push({
        key: `expiring-${p.polId}`,
        text: `Póliza por vencer en ${byCtr.get(p.ctrId)?.number ?? 'un contrato'}`,
        hint: `${p.typeName ?? p.number} · vence el ${fDateOnly(p.endDate)}`,
        icon: IconClockHour4,
        tone: ACTION_TONES.danger,
        to: `/work/contracts/${p.ctrId}`
      });
    }
    const uncovered = contracts.items.filter((c) => c.policies?.uncovered.length > 0);
    if (uncovered.length > 0) {
      list.push({
        key: 'uncovered',
        text: `${plural(uncovered.length, 'contrato', 'contratos')} con conceptos sin póliza`,
        hint: uncovered.map((c) => `${c.number}: ${c.policies.uncovered.map((u) => u.label).join(', ')}`).join(' · '),
        icon: IconAlertTriangle,
        tone: ACTION_TONES.info,
        to: uncovered.length === 1 ? `/work/contracts/${uncovered[0].ctrId}` : '/work/contracts?uncovered=true'
      });
    }
  }
  if (invoices?.pendingCount > 0) {
    const last = invoices.pending[0];
    const view = invoices.pendingByView.find((p) => p.count > 0)?.view;
    list.push({
      key: 'pending',
      text: `${plural(invoices.pendingCount, 'factura', 'facturas')} por aprobar`,
      hint: last
        ? `${last.typeName} ${last.number}${last.value ? ` · ${fMoneyText(last.value)}` : ''}`
        : 'Registradas, pendientes de aprobación',
      icon: IconReceipt,
      tone: ACTION_TONES.edit,
      to: invoices.pendingCount === 1 && last ? invoicePath(last.view, last.invId) : `${invoicePath(view)}?status=REGISTERED`
    });
  }
  for (const c of contracts?.withRetentionBalance ?? []) {
    list.push({
      key: `retention-${c.ctrId}`,
      text: `Retenido por devolver: ${fMoneyText(c.balance)}`,
      hint: `${c.number} · ${c.stateName.toLowerCase()}`,
      icon: IconWallet,
      tone: ACTION_TONES.neutral,
      to: `/work/contracts/${c.ctrId}`
    });
  }
  const suspended = contracts?.items.filter((c) => c.state === 'SUSPENDED') ?? [];
  if (suspended.length > 0) {
    list.push({
      key: 'suspended',
      text: `${plural(suspended.length, 'contrato suspendido', 'contratos suspendidos')}`,
      hint: `${suspended.map((c) => c.number).join(', ')} · esperan el otrosí que los reanuda`,
      icon: IconPlayerPause,
      tone: ACTION_TONES.neutral,
      to: suspended.length === 1 ? `/work/contracts/${suspended[0].ctrId}` : '/work/contracts?status=SUSPENDED'
    });
  }
  return list;
};

function AttentionCard({ items }) {
  return (
    <MainCard title="Por atender en la obra" sx={{ height: '100%' }} contentSX={{ px: 1.5 }} id="por-atender">
      {items.length === 0 ? (
        <Box sx={{ px: 1.5 }}>
          <Empty>
            Nada por atender: sin pólizas vencidas ni por vencer, conceptos sin póliza, facturas por aprobar ni retenido por devolver.
          </Empty>
        </Box>
      ) : (
        <List disablePadding aria-label="Por atender en la obra">
          {items.map(({ key, text, hint, icon: Icon, tone, to }) => (
            <ListItemButton key={key} component={RouterLink} to={to} sx={{ borderRadius: 1, gap: 1.5, minHeight: 44 }}>
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

AttentionCard.propTypes = { items: PropTypes.arrayOf(PropTypes.object).isRequired };

function StagesCard({ stages, contracts }) {
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
                  primary={s.name}
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

StagesCard.propTypes = { stages: PropTypes.arrayOf(PropTypes.object).isRequired, contracts: PropTypes.arrayOf(PropTypes.object) };

function InvoicesCard({ invoices }) {
  const view = invoices.latest[0]?.view ?? invoices.pendingByView[0]?.view;
  return (
    <MainCard
      title="Facturas de la obra"
      secondary={
        <Link component={RouterLink} to={invoicePath(view)} underline="hover" variant="body2">
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
            <ListItemButton key={inv.invId} component={RouterLink} to={invoicePath(inv.view, inv.invId)} sx={{ borderRadius: 1, gap: 1 }}>
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

InvoicesCard.propTypes = { invoices: PropTypes.object.isRequired };

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
                  <Link component={RouterLink} to={`/work/providers/${p.prvId}`} underline="hover" sx={{ fontWeight: 500 }}>
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

  const kpis = [];
  if (work) {
    kpis.push({
      label: 'Valor vigente',
      value: fMoneyText(work.currentValue),
      hint: work.extended ? `Ampliado · inicial ${fMoneyText(work.initialValue)}` : 'Valor inicial de la obra',
      icon: IconCurrencyDollar,
      tone: ACTION_TONES.info,
      to: `/work/works/${work.wrkId}`
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
      to: '/work/contracts'
    });
  }
  if (invoices) {
    kpis.push({
      label: 'Facturado aprobado',
      value: fMoneyText(invoices.approvedValue),
      hint: `${plural(invoices.approvedCount, 'factura aprobada', 'facturas aprobadas')} · ${invoices.pendingCount} por aprobar`,
      icon: IconReceipt,
      tone: ACTION_TONES.edit,
      to: invoicePath(invoices.pendingByView[0]?.view)
    });
  }
  const attention = attentionOf(data);
  if (contracts || invoices) {
    kpis.push({
      label: 'Por atender',
      value: String(attention.length),
      hint: 'Pólizas, conceptos sin póliza, facturas y retenido',
      icon: IconAlertTriangle,
      tone: ACTION_TONES.danger
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

      {(contracts || invoices) && (
        <Grid container spacing={gridSpacing}>
          {contracts && (
            <Grid size={{ xs: 12, lg: 8 }}>
              <MainCard
                title="Contratos de la obra"
                secondary={
                  <Link component={RouterLink} to="/work/contracts" underline="hover" variant="body2">
                    Ver contratos
                  </Link>
                }
                sx={{ height: '100%' }}
              >
                {contracts.items.length === 0 ? (
                  <Empty>La obra todavía no tiene contratos.</Empty>
                ) : (
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, gap: 2 }}>
                    {contracts.items.map((c) => (
                      <ContractCard key={c.ctrId} contract={c} />
                    ))}
                  </Box>
                )}
              </MainCard>
            </Grid>
          )}
          <Grid size={{ xs: 12, lg: contracts ? 4 : 12 }}>
            <AttentionCard items={attention} />
          </Grid>
        </Grid>
      )}

      <Grid container spacing={gridSpacing}>
        {work && (
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <StagesCard stages={work.stages} contracts={contracts?.items ?? null} />
          </Grid>
        )}
        {invoices && (
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <InvoicesCard invoices={invoices} />
          </Grid>
        )}
        {providers && (
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <ProvidersCard providers={providers} />
          </Grid>
        )}
      </Grid>

      {invoices && (
        <Typography variant="caption" color="text.secondary">
          La factura simple todavía no tiene importes (decisiones contables pendientes): cuenta en las cantidades, no en los valores. El
          costo ejecutado de la obra llega con ella.
        </Typography>
      )}
    </Stack>
  );
}

WorkSummaryTab.propTypes = { data: PropTypes.object.isRequired, workLabel: PropTypes.string };
