import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Chart from 'react-apexcharts';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { fMoneyText, fPercentText } from 'utils/formatNumber';
import { fDateOnly } from 'utils/formatTime';

import {
  CONTRACT_STATE_CHART_COLORS,
  INVOICE_TYPE_COLORS,
  barPercent,
  chartAmount,
  fMillions,
  monthLabel,
  paletteColor,
  plural
} from './workDashboard.utils';

// Contratos y facturas de la obra en gráficos (DEC-063). Los importes y
// porcentajes llegan del servidor; aquí solo se dibujan. Cada gráfico lleva
// su vista en texto o una descripción accesible (DESIGN_SYSTEM, "Gráficos").

const num = { fontVariantNumeric: 'tabular-nums' };

function Empty({ children }) {
  return (
    <Typography variant="body2" color="text.secondary">
      {children}
    </Typography>
  );
}

Empty.propTypes = { children: PropTypes.node };

function Swatch({ color }) {
  return (
    <Box
      component="span"
      aria-hidden
      sx={{ display: 'inline-block', width: 12, height: 12, borderRadius: 0.75, flexShrink: 0, bgcolor: color }}
    />
  );
}

Swatch.propTypes = { color: PropTypes.string.isRequired };

/** Título de tarjeta con una línea que dice qué cuenta. */
function CardTitle({ title, sub }) {
  return (
    <Stack spacing={0.25}>
      <Typography variant="h4" component="h2">
        {title}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {sub}
      </Typography>
    </Stack>
  );
}

CardTitle.propTypes = { title: PropTypes.string.isRequired, sub: PropTypes.string };

/** Cifra con su barra (de un porcentaje que ya calculó el servidor). */
function Metric({ label, value, percent, hint, color }) {
  return (
    <Stack spacing={0.75} sx={{ p: 2.5, bgcolor: 'background.paper', border: 1, borderColor: 'divider', borderRadius: 1 }}>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h3" component="p" sx={num}>
        {value}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={barPercent(percent)}
        aria-hidden
        sx={{ height: 6, borderRadius: 3, bgcolor: 'grey.200', '& .MuiLinearProgress-bar': { bgcolor: color, borderRadius: 3 } }}
      />
      <Typography variant="caption" color="text.secondary">
        {hint}
      </Typography>
    </Stack>
  );
}

Metric.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  percent: PropTypes.string,
  hint: PropTypes.string,
  color: PropTypes.string
};

// ─── Línea de tiempo ─────────────────────────────────────────────────────────

const DAY_MS = 86400000;
const dayOf = (text) => (text ? Date.parse(`${text}T00:00:00Z`) : null);
const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const VALIDITY_BAR = {
  EXPIRED: { bg: 'error.light', border: 'error.dark', fg: 'error.dark' },
  EXPIRING: { bg: 'warning.light', border: 'orange.dark', fg: 'grey.900' },
  ACTIVE: { bg: 'success.light', border: 'success.dark', fg: 'grey.900' },
  NO_DATE: { bg: 'grey.100', border: 'grey.500', fg: 'grey.700' }
};

/**
 * Plazo de la obra, contratos (inicio a fin) y sus pólizas vigentes, con las
 * facturas de cada contrato marcadas en su fecha y una línea en la fecha de
 * referencia del servidor. Solo dibuja fechas que manda el servidor.
 */
function Timeline({ work, contracts, policies, marks, referenceDate }) {
  const rows = [];
  if (work?.startDate && work?.endDate) {
    rows.push({
      key: 'work',
      name: `${work.code} · ${work.name}`,
      sub: 'Plazo de la obra',
      from: work.startDate,
      to: work.endDate,
      label: `${fDateOnly(work.startDate)} → ${fDateOnly(work.endDate)}`,
      tone: { bg: 'grey.200', border: 'grey.400', fg: 'grey.800' },
      marks: [],
      bold: true
    });
  }
  for (const c of contracts) {
    rows.push({
      key: `c-${c.ctrId}`,
      name: `${c.number} · ${c.name}`,
      sub: `${c.providerName ?? ''} · ${c.stateName.toLowerCase()}`,
      from: c.startDate,
      to: c.endDate,
      label: c.stateName,
      tone: { bg: 'primary.light', border: 'primary.800', fg: 'primary.dark' },
      marks: marks.filter((m) => m.ctrId === c.ctrId),
      href: `/work/contracts/${c.ctrId}`
    });
    for (const p of (policies ?? []).filter((x) => x.ctrId === c.ctrId)) {
      rows.push({
        key: `p-${p.polId}`,
        name: `Póliza ${p.number}`,
        sub: `${p.typeName ?? ''} de ${c.number} · ${p.validityName.toLowerCase()}`,
        from: p.startDate ?? c.startDate,
        to: p.endDate,
        label: p.endDate ? `${p.validity === 'EXPIRED' ? 'Venció' : 'Vence'} el ${fDateOnly(p.endDate)}` : 'Sin fecha de vigencia',
        tone: VALIDITY_BAR[p.validity] ?? VALIDITY_BAR.NO_DATE,
        marks: [],
        href: `/work/contracts/${c.ctrId}`
      });
    }
  }

  const days = rows
    .flatMap((r) => [dayOf(r.from), dayOf(r.to)])
    .concat(
      marks.map((m) => dayOf(m.date)),
      dayOf(referenceDate)
    )
    .filter((d) => d !== null);
  if (rows.length === 0 || days.length === 0) return <Empty>Sin fechas para dibujar: la obra no tiene contratos con plazo.</Empty>;
  const first = new Date(Math.min(...days));
  const last = new Date(Math.max(...days));
  const t0 = Date.UTC(first.getUTCFullYear(), first.getUTCMonth(), 1);
  const t1 = Date.UTC(last.getUTCFullYear(), last.getUTCMonth() + 1, 1);
  const pos = (t) => ((t - t0) / (t1 - t0)) * 100;
  const months = [];
  for (let d = new Date(t0); d.getTime() < t1; d = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1))) {
    months.push({
      key: d.toISOString().slice(0, 7),
      left: pos(d.getTime()),
      label: `${MONTHS[d.getUTCMonth()]}${d.getUTCMonth() === 0 ? ` ${String(d.getUTCFullYear()).slice(2)}` : ''}`
    });
  }
  const today = pos(dayOf(referenceDate));
  const step = Math.max(1, Math.ceil(months.length / 16));

  return (
    <Box sx={{ overflowX: 'auto' }}>
      <Box sx={{ minWidth: 900 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '240px minmax(0, 1fr)', gap: 2, pb: 0.75 }}>
          <span />
          <Box sx={{ position: 'relative', height: 18 }}>
            {months
              .filter((_m, i) => i % step === 0)
              .map((m) => (
                <Typography
                  key={m.key}
                  variant="caption"
                  color="text.secondary"
                  sx={{ position: 'absolute', left: `${m.left}%`, pl: 0.5, whiteSpace: 'nowrap' }}
                >
                  {m.label}
                </Typography>
              ))}
          </Box>
        </Box>
        {rows.map((r, i) => {
          const a = dayOf(r.from) ?? dayOf(r.to);
          const b = dayOf(r.to) ?? a;
          const left = a !== null ? pos(a) : 0;
          const width = a !== null && b !== null ? Math.max(pos(b + DAY_MS) - left, 0.6) : 0;
          return (
            <Box
              key={r.key}
              sx={{
                display: 'grid',
                gridTemplateColumns: '240px minmax(0, 1fr)',
                gap: 2,
                alignItems: 'center',
                py: 0.5,
                borderTop: i === 0 ? 0 : 1,
                borderColor: 'grey.100'
              }}
            >
              <Stack sx={{ minWidth: 0 }}>
                {r.href ? (
                  <Link
                    component={RouterLink}
                    to={r.href}
                    underline="hover"
                    variant="body2"
                    noWrap
                    sx={{ fontWeight: 500, color: 'text.primary' }}
                  >
                    {r.name}
                  </Link>
                ) : (
                  <Typography variant="body2" noWrap sx={{ fontWeight: r.bold ? 600 : 500 }}>
                    {r.name}
                  </Typography>
                )}
                <Typography variant="caption" color="text.secondary" noWrap>
                  {r.sub}
                </Typography>
              </Stack>
              <Box sx={{ position: 'relative', height: 40 }}>
                {months.map((m) => (
                  <Box
                    key={m.key}
                    aria-hidden
                    sx={{ position: 'absolute', top: 0, bottom: 0, width: '1px', bgcolor: 'grey.100', left: `${m.left}%` }}
                  />
                ))}
                {width > 0 && (
                  <Tooltip title={`${r.name} · ${r.from ? fDateOnly(r.from) : 'sin inicio'} → ${r.to ? fDateOnly(r.to) : 'sin fin'}`}>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        height: 24,
                        left: `${left}%`,
                        width: `${width}%`,
                        boxSizing: 'border-box',
                        borderRadius: 1,
                        border: 1,
                        bgcolor: r.tone.bg,
                        borderColor: r.tone.border,
                        display: 'flex',
                        alignItems: 'center',
                        overflow: 'hidden'
                      }}
                    >
                      <Typography variant="caption" sx={{ px: 1, whiteSpace: 'nowrap', fontWeight: 500, color: r.tone.fg }}>
                        {r.label}
                      </Typography>
                    </Box>
                  </Tooltip>
                )}
                {r.marks.map((m) => (
                  <Tooltip
                    key={m.invId}
                    title={`${m.typeName} ${m.number} · ${fDateOnly(m.date)}${m.value ? ` · ${fMoneyText(m.value)}` : ''} · ${m.stateName.toLowerCase()}`}
                  >
                    <Box
                      tabIndex={0}
                      aria-label={`${m.typeName} ${m.number}, ${fDateOnly(m.date)}`}
                      sx={{
                        position: 'absolute',
                        top: 12,
                        width: 14,
                        height: 14,
                        ml: '-7px',
                        borderRadius: '50%',
                        border: 2,
                        borderColor: 'background.paper',
                        bgcolor: INVOICE_TYPE_COLORS[m.type],
                        opacity: m.state === 'APPROVED' ? 1 : 0.55,
                        left: `${pos(dayOf(m.date))}%`
                      }}
                    />
                  </Tooltip>
                ))}
                <Box aria-hidden sx={{ position: 'absolute', top: -4, bottom: -4, width: 2, bgcolor: 'error.dark', left: `${today}%` }} />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

Timeline.propTypes = {
  work: PropTypes.object,
  contracts: PropTypes.arrayOf(PropTypes.object).isRequired,
  policies: PropTypes.arrayOf(PropTypes.object),
  marks: PropTypes.arrayOf(PropTypes.object).isRequired,
  referenceDate: PropTypes.string.isRequired
};

// ─── Facturas ────────────────────────────────────────────────────────────────

function InvoicedByMonth({ byMonth }) {
  const theme = useTheme();
  const options = {
    chart: { type: 'bar', stacked: true, toolbar: { show: false }, fontFamily: theme.typography.fontFamily },
    plotOptions: { bar: { borderRadius: 4, borderRadiusApplication: 'end', borderRadiusWhenStacked: 'last', columnWidth: '50%' } },
    colors: [theme.palette.primary[800], theme.palette.orange.dark],
    stroke: { show: true, width: 2, colors: [theme.palette.background.paper] },
    dataLabels: { enabled: false },
    legend: { position: 'top', horizontalAlign: 'left', labels: { colors: theme.palette.text.primary } },
    xaxis: {
      categories: byMonth.map((m) => monthLabel(m.month)),
      labels: { style: { colors: theme.palette.text.secondary } },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: { labels: { formatter: (v) => fMillions(String(v)), style: { colors: theme.palette.text.secondary } } },
    grid: { borderColor: theme.palette.divider, strokeDashArray: 3 },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (_v, { seriesIndex, dataPointIndex }) =>
          fMoneyText(seriesIndex === 0 ? byMonth[dataPointIndex].approved : byMonth[dataPointIndex].registered)
      }
    }
  };
  const withValue = byMonth.filter((m) => m.approved !== '0.00' || m.registered !== '0.00');
  return (
    <MainCard
      title={<CardTitle title="Facturado por mes" sub="Últimos 12 meses, por fecha de la factura · sin las anuladas" />}
      sx={{ height: '100%' }}
    >
      {withValue.length === 0 ? (
        <Empty>Ninguna factura con importes en los últimos 12 meses.</Empty>
      ) : (
        <div
          role="img"
          aria-label={`Facturado por mes: ${withValue.map((m) => `${monthLabel(m.month)}, aprobado ${fMoneyText(m.approved)} y por aprobar ${fMoneyText(m.registered)}`).join('; ')}`}
        >
          <Chart
            type="bar"
            height={260}
            series={[
              { name: 'Aprobado', data: byMonth.map((m) => chartAmount(m.approved)) },
              { name: 'Por aprobar', data: byMonth.map((m) => chartAmount(m.registered)) }
            ]}
            options={options}
          />
        </div>
      )}
    </MainCard>
  );
}

InvoicedByMonth.propTypes = { byMonth: PropTypes.arrayOf(PropTypes.object).isRequired };

/** Segmentos proporcionales a importes del servidor (solo la escala usa número). */
function SegmentBar({ segments, height = 22, scale }) {
  const total = scale ?? segments.reduce((sum, s) => sum + chartAmount(s.value), 0);
  return (
    <Box sx={{ display: 'flex', gap: '2px', height, borderRadius: 1, overflow: 'hidden' }}>
      {segments
        .filter((s) => chartAmount(s.value) > 0)
        .map((s) => (
          <Tooltip key={s.key} title={s.tip}>
            <Box
              sx={{
                height: '100%',
                minWidth: 4,
                width: `${total > 0 ? (chartAmount(s.value) / total) * 100 : 0}%`,
                bgcolor: s.color,
                borderRadius: 1
              }}
            />
          </Tooltip>
        ))}
    </Box>
  );
}

SegmentBar.propTypes = { segments: PropTypes.arrayOf(PropTypes.object).isRequired, height: PropTypes.number, scale: PropTypes.number };

function InvoicesByType({ invoices }) {
  const withValue = invoices.byType.filter((t) => t.value !== null);
  return (
    <MainCard
      title={
        <CardTitle title="Facturas por tipo" sub={`${fMoneyText(invoices.total)} en ${plural(invoices.count, 'factura', 'facturas')}`} />
      }
      sx={{ height: '100%' }}
    >
      {invoices.byType.length === 0 ? (
        <Empty>Todavía no hay facturas registradas o aprobadas.</Empty>
      ) : (
        <Stack spacing={2}>
          {withValue.length > 0 && (
            <Box role="img" aria-label={`Facturas por tipo: ${withValue.map((t) => `${t.name} ${fMoneyText(t.value)}`).join(', ')}`}>
              <SegmentBar
                height={28}
                segments={withValue.map((t) => ({
                  key: t.type,
                  value: t.value,
                  color: INVOICE_TYPE_COLORS[t.type],
                  tip: `${t.name} · ${fMoneyText(t.value)}`
                }))}
              />
            </Box>
          )}
          <Stack component="ul" spacing={1.25} sx={{ listStyle: 'none', m: 0, p: 0 }}>
            {invoices.byType.map((t) => (
              <Stack component="li" key={t.type} direction="row" spacing={1.25} alignItems="center">
                <Swatch color={INVOICE_TYPE_COLORS[t.type]} />
                <Typography variant="body2" sx={{ flexGrow: 1 }}>
                  {t.name}{' '}
                  <Typography component="span" variant="caption" color="text.secondary">
                    · {plural(t.count, 'factura', 'facturas')}
                  </Typography>
                </Typography>
                <Typography variant="body2" sx={{ ...num, fontWeight: 600 }}>
                  {t.value === null ? 'Sin importes' : fMoneyText(t.value)}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ width: 52, textAlign: 'right' }}>
                  {t.value === null ? '' : fPercentText(t.pct, 1)}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      )}
    </MainCard>
  );
}

InvoicesByType.propTypes = { invoices: PropTypes.object.isRequired };

function InvoicedByContract({ byContract, contracts }) {
  const names = new Map((contracts ?? []).map((c) => [c.ctrId, c]));
  const scale = Math.max(0, ...byContract.map((c) => chartAmount(c.total)));
  const types = [...new Map(byContract.flatMap((c) => c.byType).map((t) => [t.type, t])).values()];
  return (
    <MainCard title={<CardTitle title="Facturado por contrato" sub="Por tipo de factura · sin las anuladas" />} sx={{ height: '100%' }}>
      {byContract.length === 0 ? (
        <Empty>Ningún contrato tiene facturas todavía.</Empty>
      ) : (
        <Stack spacing={2.25}>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap aria-hidden>
            {types.map((t) => (
              <Stack key={t.type} direction="row" spacing={0.75} alignItems="center">
                <Swatch color={INVOICE_TYPE_COLORS[t.type]} />
                <Typography variant="caption">{t.name}</Typography>
              </Stack>
            ))}
          </Stack>
          {byContract.map((c) => {
            const contract = names.get(c.ctrId);
            return (
              <Stack key={c.ctrId} spacing={0.75}>
                <Stack direction="row" justifyContent="space-between" spacing={1}>
                  <Link
                    component={RouterLink}
                    to={`/work/contracts/${c.ctrId}`}
                    underline="hover"
                    variant="body2"
                    sx={{ fontWeight: 500, color: 'text.primary' }}
                  >
                    {c.number}
                    {contract ? ` · ${contract.name}` : ''}
                  </Link>
                  <Typography variant="body2" sx={{ ...num, fontWeight: 600 }}>
                    {fMoneyText(c.total)}
                  </Typography>
                </Stack>
                <Box
                  role="img"
                  aria-label={`${c.number}: ${c.byType.map((t) => `${t.name} ${fMoneyText(t.value)}`).join(', ')}`}
                  sx={{ width: `${scale > 0 ? Math.max((chartAmount(c.total) / scale) * 100, 1) : 0}%` }}
                >
                  <SegmentBar
                    segments={c.byType.map((t) => ({
                      key: t.type,
                      value: t.value,
                      color: INVOICE_TYPE_COLORS[t.type],
                      tip: `${t.name} · ${fMoneyText(t.value)}`
                    }))}
                  />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {[
                    contract && `Valor vigente ${fMoneyText(contract.currentValue)}`,
                    c.pending !== '0.00' && `${fMoneyText(c.pending)} por aprobar`
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      )}
    </MainCard>
  );
}

InvoicedByContract.propTypes = {
  byContract: PropTypes.arrayOf(PropTypes.object).isRequired,
  contracts: PropTypes.arrayOf(PropTypes.object)
};

function Advances({ contracts }) {
  const theme = useTheme();
  const list = contracts.filter((c) => c.advance.agreed !== '0.00');
  const row = (label, value, percent, color) => (
    <Box sx={{ display: 'grid', gridTemplateColumns: '90px minmax(0, 1fr) 150px', gap: 1.25, alignItems: 'center' }}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={barPercent(percent)}
        aria-label={`${label}: ${fPercentText(percent, 1)}`}
        sx={{
          height: 10,
          borderRadius: 1,
          bgcolor: 'grey.100',
          '& .MuiLinearProgress-bar': { bgcolor: paletteColor(theme, color), borderRadius: 1 }
        }}
      />
      <Typography variant="caption" sx={{ ...num, textAlign: 'right', fontWeight: 500 }}>
        {fMillions(value)} · {fPercentText(percent, 1)}
      </Typography>
    </Box>
  );
  return (
    <MainCard title={<CardTitle title="Anticipos" sub="Facturado y amortizado frente al anticipo pactado" />} sx={{ height: '100%' }}>
      {list.length === 0 ? (
        <Empty>Ningún contrato de la obra pacta anticipo.</Empty>
      ) : (
        <Stack spacing={2.5}>
          {list.map((c) => (
            <Stack key={c.ctrId} spacing={1}>
              <Stack direction="row" justifyContent="space-between" spacing={1}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {c.number} · {c.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Pactado {fMoneyText(c.advance.agreed)}
                </Typography>
              </Stack>
              {row('Facturado', c.advance.invoiced, c.advance.invoicedPct, 'primary.800')}
              {row('Amortizado', c.advance.amortized, c.advance.amortizedPct, 'secondary.dark')}
            </Stack>
          ))}
        </Stack>
      )}
    </MainCard>
  );
}

Advances.propTypes = { contracts: PropTypes.arrayOf(PropTypes.object).isRequired };

function ContractsByState({ contracts }) {
  const theme = useTheme();
  const present = contracts.byState.filter((s) => s.count > 0);
  const options = {
    chart: { type: 'donut', fontFamily: theme.typography.fontFamily },
    labels: present.map((s) => s.name),
    colors: present.map((s) => paletteColor(theme, CONTRACT_STATE_CHART_COLORS[s.state])),
    legend: { show: false },
    dataLabels: { enabled: false },
    stroke: { width: 2, colors: [theme.palette.background.paper] },
    plotOptions: {
      pie: {
        donut: {
          size: '68%',
          labels: {
            show: true,
            total: { show: true, label: 'contratos', formatter: () => String(contracts.total) },
            value: { fontSize: '28px', fontWeight: 700 }
          }
        }
      }
    },
    tooltip: { y: { formatter: (v) => plural(v, 'contrato', 'contratos') } }
  };
  return (
    <MainCard
      title={<CardTitle title="Contratos por estado" sub="Cantidad de contratos de la obra y su valor vigente" />}
      secondary={
        <Link component={RouterLink} to="/work/contracts" underline="hover" variant="body2">
          Ver contratos
        </Link>
      }
    >
      {contracts.total === 0 ? (
        <Empty>La obra todavía no tiene contratos.</Empty>
      ) : (
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center">
          <Box
            role="img"
            aria-label={`Contratos por estado: ${contracts.byState.map((s) => `${s.name} ${s.count}`).join(', ')}`}
            sx={{ width: 240, flexShrink: 0 }}
          >
            <Chart type="donut" height={240} series={present.map((s) => s.count)} options={options} />
          </Box>
          <Stack component="ul" sx={{ listStyle: 'none', m: 0, p: 0, flex: '1 1 320px', width: '100%' }}>
            {contracts.byState.map((s) => (
              <Box
                component="li"
                key={s.state}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '14px minmax(0, 1fr) 40px minmax(120px, auto) 56px',
                  gap: 1.5,
                  alignItems: 'center',
                  py: 1.25,
                  borderBottom: 1,
                  borderColor: 'grey.100'
                }}
              >
                <Box
                  aria-hidden
                  sx={{
                    width: 14,
                    height: 14,
                    borderRadius: 1,
                    boxSizing: 'border-box',
                    border: 2,
                    borderColor: CONTRACT_STATE_CHART_COLORS[s.state],
                    bgcolor: s.count ? CONTRACT_STATE_CHART_COLORS[s.state] : 'background.paper'
                  }}
                />
                <Link
                  component={RouterLink}
                  to={`/work/contracts?status=${s.state}`}
                  underline="hover"
                  variant="body2"
                  sx={{ fontWeight: s.count ? 500 : 400, color: s.count ? 'text.primary' : 'text.secondary' }}
                >
                  {s.name}
                </Link>
                <Typography variant="body2" sx={{ ...num, textAlign: 'right', fontWeight: 600 }}>
                  {s.count}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ ...num, textAlign: 'right' }}>
                  {s.count ? fMoneyText(s.value) : '—'}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'right' }}>
                  {s.count ? fPercentText(s.countPct, 0) : ''}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Stack>
      )}
    </MainCard>
  );
}

ContractsByState.propTypes = { contracts: PropTypes.object.isRequired };

export default function WorkChartsTab({ data }) {
  const { work, contracts, invoices, referenceDate } = data;
  const metrics = [];
  if (contracts) {
    metrics.push({
      label: 'Contratado',
      value: fMillions(contracts.contracted),
      percent: contracts.contractedPct ?? '0',
      hint: contracts.contractedPct
        ? `${fPercentText(contracts.contractedPct, 1)} del valor vigente de la obra`
        : plural(contracts.total, 'contrato', 'contratos'),
      color: 'primary.800'
    });
  }
  if (invoices) {
    metrics.push({
      label: 'Facturado aprobado',
      value: fMillions(invoices.approvedValue),
      percent: invoices.approvedPct ?? '0',
      hint: [
        invoices.approvedPct && `${fPercentText(invoices.approvedPct, 1)} de lo contratado`,
        plural(invoices.approvedCount, 'factura', 'facturas'),
        invoices.pendingValue !== '0.00' && `${fMoneyText(invoices.pendingValue)} por aprobar`
      ]
        .filter(Boolean)
        .join(' · '),
      color: 'primary.800'
    });
  }
  if (contracts) {
    metrics.push(
      {
        label: 'Anticipo amortizado',
        value: fMillions(contracts.advance.amortized),
        percent: contracts.advance.amortizedPct,
        hint: `De ${fMoneyText(contracts.advance.invoiced)} de anticipo facturado (${fPercentText(contracts.advance.amortizedPct, 1)})`,
        color: 'secondary.dark'
      },
      {
        label: 'Retenido por devolver',
        value: fMillions(contracts.retention.balance),
        percent: contracts.retention.balancePct,
        hint: `De ${fMoneyText(contracts.retention.retained)} retenidos`,
        color: 'orange.dark'
      }
    );
  }

  return (
    <Stack spacing={gridSpacing}>
      {metrics.length > 0 && (
        <Box
          component="section"
          aria-label="Cifras de contratos y facturas"
          sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: gridSpacing }}
        >
          {metrics.map((m) => (
            <Metric key={m.label} {...m} />
          ))}
        </Box>
      )}

      {contracts && (
        <MainCard
          title={
            <CardTitle
              title="Línea de tiempo de contratos y pólizas"
              sub={`La línea vertical marca el ${fDateOnly(referenceDate)}; los puntos son las facturas de cada contrato (atenuados, por aprobar)`}
            />
          }
        >
          <Timeline
            work={work}
            contracts={contracts.items}
            policies={contracts.policies}
            marks={invoices?.marks ?? []}
            referenceDate={referenceDate}
          />
        </MainCard>
      )}

      {invoices && (
        <Grid container spacing={gridSpacing}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <InvoicedByMonth byMonth={invoices.byMonth} />
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }}>
            <InvoicesByType invoices={invoices} />
          </Grid>
        </Grid>
      )}

      {(invoices || contracts) && (
        <Grid container spacing={gridSpacing}>
          {invoices && (
            <Grid size={{ xs: 12, lg: contracts ? 7 : 12 }}>
              <InvoicedByContract byContract={invoices.byContract} contracts={contracts?.items} />
            </Grid>
          )}
          {contracts && (
            <Grid size={{ xs: 12, lg: invoices ? 5 : 12 }}>
              <Advances contracts={contracts.items} />
            </Grid>
          )}
        </Grid>
      )}

      {contracts && <ContractsByState contracts={contracts} />}
    </Stack>
  );
}

WorkChartsTab.propTypes = { data: PropTypes.object.isRequired };
