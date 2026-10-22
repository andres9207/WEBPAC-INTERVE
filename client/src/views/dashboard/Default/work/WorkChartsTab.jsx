import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Chart from 'react-apexcharts';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
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

import { contractRows, invoiceRows, useDrillDown } from './DrillDownDialog';
import {
  CONTRACT_STATE_CHART_COLORS,
  INVOICE_TYPE_COLORS,
  barPercent,
  chartAmount,
  fMillions,
  monthLabel,
  dashboardTo,
  monthName,
  paletteColor,
  plural
} from './workDashboard.utils';
import useSchemePalette from 'hooks/useSchemePalette';

// Contratos y facturas de la obra en gráficos (DEC-063). Los importes y
// porcentajes llegan del servidor; aquí solo se dibujan. Cada gráfico lleva
// su vista en texto o una descripción accesible (DESIGN_SYSTEM, "Gráficos").
// Un clic en una cifra, una barra o un segmento abre su detalle
// (DrillDownDialog) con las filas de las que sale.

const num = { fontVariantNumeric: 'tabular-nums' };
const INVOICE_NOUN = ['factura', 'facturas'];
const CONTRACT_NOUN = ['contrato', 'contratos'];
const INVOICE_STATE_TITLES = { APPROVED: 'aprobadas', REGISTERED: 'por aprobar' };
// Estado de cada serie de "Facturado por mes", en el orden de `series`.
const MONTH_SERIES_STATES = ['APPROVED', 'REGISTERED'];
// Un nombre que abre el detalle: se ve como enlace y se usa con el teclado.
const drillLinkSx = { fontWeight: 500, color: 'text.primary', textAlign: 'left', verticalAlign: 'baseline' };
// Barras y segmentos de ApexCharts que abren su detalle.
const clickableChartSx = { '& .apexcharts-bar-area, & .apexcharts-pie-area': { cursor: 'pointer' } };

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

/** Cifra con su barra (de un porcentaje que ya calculó el servidor). Con `onClick`, abre su detalle. */
function Metric({ label, value, percent, hint, color, onClick }) {
  return (
    <Stack
      spacing={0.75}
      {...(onClick && { component: ButtonBase, onClick })}
      sx={{
        p: 2.5,
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        textAlign: 'left',
        ...(onClick && { '&:hover, &.Mui-focusVisible': { borderColor: 'primary.main' } })
      }}
    >
      {/* Dentro de un botón, solo texto en línea (span), no párrafos ni títulos. */}
      <Typography variant="subtitle2" component="span" display="block" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h3" component="span" display="block" sx={num}>
        {value}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={barPercent(percent)}
        aria-hidden
        sx={{ height: 6, borderRadius: 3, bgcolor: 'grey.200', '& .MuiLinearProgress-bar': { bgcolor: color, borderRadius: 3 } }}
      />
      <Typography variant="caption" component="span" display="block" color="text.secondary">
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
  color: PropTypes.string,
  onClick: PropTypes.func
};

// ─── Línea de tiempo ─────────────────────────────────────────────────────────

const DAY_MS = 86400000;
// Nombres a la izquierda; en el teléfono, más angostos para que se vean las barras.
const TIMELINE_COLUMNS = { xs: '128px minmax(0, 1fr)', sm: '240px minmax(0, 1fr)' };
const dayOf = (text) => (text ? Date.parse(`${text}T00:00:00Z`) : null);
const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const VALIDITY_BAR = {
  EXPIRED: { bg: 'error.light', border: 'error.dark', fg: 'grey.900' },
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
      tone: { bg: 'primary.light', border: 'primary.800', fg: 'primary.800' },
      marks: marks.filter((m) => m.ctrId === c.ctrId),
      href: dashboardTo.contract(c.ctrId)
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
        href: dashboardTo.contract(c.ctrId)
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
      <Box sx={{ minWidth: { xs: 640, sm: 900 } }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: TIMELINE_COLUMNS, gap: 2, pb: 0.75 }}>
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
                gridTemplateColumns: TIMELINE_COLUMNS,
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
                        top: 4,
                        height: 22,
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
                      component={RouterLink}
                      to={dashboardTo.invoice(m.invId)}
                      aria-label={`${m.typeName} ${m.number}, ${fDateOnly(m.date)}, ${m.stateName.toLowerCase()}. Abrir la factura`}
                      sx={{
                        display: 'block',
                        position: 'absolute',
                        top: 25, // Debajo de la barra: no tapa su texto.
                        width: 14,
                        height: 14,
                        ml: '-7px',
                        borderRadius: '50%',
                        border: 2,
                        // Aprobada: relleno con aro del fondo. Registrada: hueca, con el
                        // borde en el color del tipo (la opacidad bajaba de 3:1).
                        ...(m.state === 'APPROVED'
                          ? { borderColor: 'background.paper', bgcolor: INVOICE_TYPE_COLORS[m.type] }
                          : { borderColor: INVOICE_TYPE_COLORS[m.type], bgcolor: 'background.paper' }),
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

/** Facturas de un mes por la fecha de la factura, y de un estado si se elige (el criterio de `byMonth`). */
const monthDrill = (items, entry, state) => ({
  title: `Facturas ${state ? `${INVOICE_STATE_TITLES[state]} ` : ''}de ${monthName(entry.month)}`,
  subtitle: state ? null : 'Registradas y aprobadas',
  total: state === 'APPROVED' ? entry.approved : state === 'REGISTERED' ? entry.registered : null,
  noun: INVOICE_NOUN,
  rows: invoiceRows(items.filter((inv) => inv.date.startsWith(entry.month) && (!state || inv.state === state)))
});

function InvoicedByMonth({ byMonth, items, onDrill }) {
  const theme = useTheme();
  const palette = useSchemePalette();
  const options = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: { show: false },
      fontFamily: theme.typography.fontFamily,
      events: {
        dataPointSelection: (_e, _c, { seriesIndex, dataPointIndex }) =>
          onDrill(monthDrill(items, byMonth[dataPointIndex], MONTH_SERIES_STATES[seriesIndex])),
        xAxisLabelClick: (_e, _c, { labelIndex }) => byMonth[labelIndex] && onDrill(monthDrill(items, byMonth[labelIndex]))
      }
    },
    plotOptions: { bar: { borderRadius: 4, borderRadiusApplication: 'end', borderRadiusWhenStacked: 'last', columnWidth: '50%' } },
    colors: [palette.primary[800], palette.orange.dark],
    stroke: { show: true, width: 2, colors: [palette.background.paper] },
    dataLabels: { enabled: false },
    legend: { position: 'top', horizontalAlign: 'left', labels: { colors: palette.text.primary } },
    xaxis: {
      categories: byMonth.map((m) => monthLabel(m.month)),
      labels: { style: { colors: palette.text.secondary } },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: { labels: { formatter: (v) => fMillions(String(v)), style: { colors: palette.text.secondary } } },
    grid: { borderColor: palette.divider, strokeDashArray: 3 },
    tooltip: {
      theme: palette.mode,
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
        <Box
          role="img"
          aria-label={`Facturado por mes: ${withValue.map((m) => `${monthLabel(m.month)}, aprobado ${fMoneyText(m.approved)} y por aprobar ${fMoneyText(m.registered)}`).join('; ')}`}
          sx={{ ...clickableChartSx, '& .apexcharts-xaxis-label': { cursor: 'pointer' } }}
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
        </Box>
      )}
    </MainCard>
  );
}

InvoicedByMonth.propTypes = {
  byMonth: PropTypes.arrayOf(PropTypes.object).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDrill: PropTypes.func.isRequired
};

/**
 * Segmentos proporcionales a importes del servidor (solo la escala usa número).
 * Con `onSelect`, un clic en un segmento abre su detalle; con el teclado se
 * llega por la lista que acompaña la barra.
 */
function SegmentBar({ segments, height = 22, scale, onSelect }) {
  const total = scale ?? segments.reduce((sum, s) => sum + chartAmount(s.value), 0);
  return (
    <Box sx={{ display: 'flex', gap: '2px', height, borderRadius: 1, overflow: 'hidden' }}>
      {segments
        .filter((s) => chartAmount(s.value) > 0)
        .map((s) => (
          <Tooltip key={s.key} title={s.tip}>
            <Box
              onClick={onSelect && (() => onSelect(s))}
              sx={{
                height: '100%',
                minWidth: 4,
                width: `${total > 0 ? (chartAmount(s.value) / total) * 100 : 0}%`,
                bgcolor: s.color,
                borderRadius: 1,
                ...(onSelect && { cursor: 'pointer', '&:hover': { opacity: 0.85 } })
              }}
            />
          </Tooltip>
        ))}
    </Box>
  );
}

SegmentBar.propTypes = {
  segments: PropTypes.arrayOf(PropTypes.object).isRequired,
  height: PropTypes.number,
  scale: PropTypes.number,
  onSelect: PropTypes.func
};

/** Facturas de un tipo, de toda la obra o de un contrato (el criterio de `byType` y `byContract`). */
const typeDrill = (items, entry, contract) => ({
  title: contract ? `${entry.name} · contrato ${contract.number}` : `Facturas de tipo ${entry.name.toLowerCase()}`,
  subtitle: 'Registradas y aprobadas',
  total: entry.value,
  noun: INVOICE_NOUN,
  rows: invoiceRows(items.filter((inv) => inv.type === entry.type && (!contract || inv.ctrId === contract.ctrId)))
});

function InvoicesByType({ invoices, onDrill }) {
  const withValue = invoices.byType.filter((t) => t.value !== null);
  const drill = (t) => onDrill(typeDrill(invoices.items, t));
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
                onSelect={(s) => drill(s.entry)}
                segments={withValue.map((t) => ({
                  key: t.type,
                  entry: t,
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
                  <Link component="button" type="button" variant="body2" underline="hover" onClick={() => drill(t)} sx={drillLinkSx}>
                    {t.name}
                  </Link>{' '}
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

InvoicesByType.propTypes = { invoices: PropTypes.object.isRequired, onDrill: PropTypes.func.isRequired };

function InvoicedByContract({ byContract, contracts, items, onDrill }) {
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
                    to={dashboardTo.contract(c.ctrId)}
                    underline="hover"
                    variant="body2"
                    sx={{ fontWeight: 500, color: 'text.primary' }}
                  >
                    {c.number}
                    {contract ? ` · ${contract.name}` : ''}
                  </Link>
                  <Link
                    component="button"
                    type="button"
                    variant="body2"
                    underline="hover"
                    aria-label={`Facturas del contrato ${c.number}: ${fMoneyText(c.total)}`}
                    onClick={() =>
                      onDrill({
                        title: `Facturas del contrato ${c.number}`,
                        subtitle: 'Registradas y aprobadas',
                        total: c.total,
                        noun: INVOICE_NOUN,
                        rows: invoiceRows(items.filter((inv) => inv.ctrId === c.ctrId))
                      })
                    }
                    sx={{ ...drillLinkSx, ...num, fontWeight: 600 }}
                  >
                    {fMoneyText(c.total)}
                  </Link>
                </Stack>
                <Box
                  role="img"
                  aria-label={`${c.number}: ${c.byType.map((t) => `${t.name} ${fMoneyText(t.value)}`).join(', ')}`}
                  sx={{ width: `${scale > 0 ? Math.max((chartAmount(c.total) / scale) * 100, 1) : 0}%` }}
                >
                  <SegmentBar
                    onSelect={(s) => onDrill(typeDrill(items, s.entry, c))}
                    segments={c.byType.map((t) => ({
                      key: t.type,
                      entry: t,
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
  contracts: PropTypes.arrayOf(PropTypes.object),
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDrill: PropTypes.func.isRequired
};

function Advances({ contracts }) {
  const palette = useSchemePalette();
  const list = contracts.filter((c) => c.advance.agreed !== '0.00');
  const row = (label, value, percent, color) => (
    // En el teléfono la cifra baja a su propia línea: la barra conserva el ancho.
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '80px minmax(0, 1fr)', sm: '90px minmax(0, 1fr) 150px' },
        columnGap: 1.25,
        rowGap: 0.25,
        alignItems: 'center'
      }}
    >
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
          '& .MuiLinearProgress-bar': { bgcolor: paletteColor(palette, color), borderRadius: 1 }
        }}
      />
      <Typography variant="caption" sx={{ ...num, textAlign: 'right', fontWeight: 500, gridColumn: { xs: 2, sm: 'auto' } }}>
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
                <Link component={RouterLink} to={dashboardTo.contract(c.ctrId)} underline="hover" variant="body2" sx={drillLinkSx}>
                  {c.number} · {c.name}
                </Link>
                <Typography variant="caption" color="text.secondary">
                  Pactado {fMoneyText(c.advance.agreed)}
                </Typography>
              </Stack>
              {row('Facturado', c.advance.invoiced, c.advance.invoicedPct, 'primary.800')}
              {row('Amortizado', c.advance.amortized, c.advance.amortizedPct, 'cyan.main')}
            </Stack>
          ))}
        </Stack>
      )}
    </MainCard>
  );
}

Advances.propTypes = { contracts: PropTypes.arrayOf(PropTypes.object).isRequired };

function ContractsByState({ contracts, onDrill }) {
  const theme = useTheme();
  const palette = useSchemePalette();
  const present = contracts.byState.filter((s) => s.count > 0);
  const drill = (s) =>
    onDrill({
      title: `Contratos ${s.name.toLowerCase()}`,
      subtitle: 'Valor vigente',
      total: s.value,
      noun: CONTRACT_NOUN,
      rows: contractRows(contracts.items.filter((c) => c.state === s.state)),
      emptyText: 'Ningún contrato de la obra está en este estado.'
    });
  const options = {
    chart: {
      type: 'donut',
      fontFamily: theme.typography.fontFamily,
      events: { dataPointSelection: (_e, _c, { dataPointIndex }) => present[dataPointIndex] && drill(present[dataPointIndex]) }
    },
    labels: present.map((s) => s.name),
    colors: present.map((s) => paletteColor(palette, CONTRACT_STATE_CHART_COLORS[s.state])),
    legend: { show: false },
    dataLabels: { enabled: false },
    stroke: { width: 2, colors: [palette.background.paper] },
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
    tooltip: { theme: palette.mode, y: { formatter: (v) => plural(v, 'contrato', 'contratos') } }
  };
  return (
    <MainCard
      title={<CardTitle title="Contratos por estado" sub="Cantidad de contratos de la obra y su valor vigente" />}
      secondary={
        <Link
          component="button"
          type="button"
          underline="hover"
          variant="body2"
          onClick={() =>
            onDrill({
              title: 'Contratos de la obra',
              subtitle: 'Valor vigente',
              total: contracts.contracted,
              noun: CONTRACT_NOUN,
              rows: contractRows(contracts.items),
              emptyText: 'La obra todavía no tiene contratos.'
            })
          }
        >
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
            sx={{ width: 240, flexShrink: 0, ...clickableChartSx }}
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
                  component="button"
                  type="button"
                  underline="hover"
                  variant="body2"
                  onClick={() => drill(s)}
                  sx={{ ...drillLinkSx, fontWeight: s.count ? 500 : 400, color: s.count ? 'text.primary' : 'text.secondary' }}
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

ContractsByState.propTypes = { contracts: PropTypes.object.isRequired, onDrill: PropTypes.func.isRequired };

export default function WorkChartsTab({ data }) {
  const { work, contracts, invoices, referenceDate } = data;
  const { openDrill, dialog } = useDrillDown();
  const metrics = [];
  if (contracts) {
    metrics.push({
      label: 'Contratado',
      value: fMillions(contracts.contracted),
      percent: contracts.contractedPct ?? '0',
      hint: contracts.contractedPct
        ? `${fPercentText(contracts.contractedPct, 1)} del valor vigente de la obra`
        : plural(contracts.total, 'contrato', 'contratos'),
      color: 'primary.800',
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
      color: 'primary.800',
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
  if (contracts) {
    // Por contrato, el mismo saldo que suma la cifra de la obra (contractBalances, DEC-061).
    metrics.push(
      {
        label: 'Anticipo amortizado',
        value: fMillions(contracts.advance.amortized),
        percent: contracts.advance.amortizedPct,
        hint: `De ${fMoneyText(contracts.advance.invoiced)} de anticipo facturado (${fPercentText(contracts.advance.amortizedPct, 1)})`,
        color: 'cyan.main',
        onClick: () =>
          openDrill({
            title: 'Anticipo amortizado por contrato',
            subtitle: 'Contratos con anticipo facturado',
            total: contracts.advance.amortized,
            noun: CONTRACT_NOUN,
            rows: contractRows(
              contracts.items.filter((c) => c.advance.invoiced !== '0.00'),
              (c) => c.advance.amortized
            ),
            emptyText: 'Ningún contrato de la obra tiene anticipo facturado.'
          })
      },
      {
        label: 'Retenido por devolver',
        value: fMillions(contracts.retention.balance),
        percent: contracts.retention.balancePct,
        hint: `De ${fMoneyText(contracts.retention.retained)} retenidos`,
        color: 'orange.dark',
        onClick: () =>
          openDrill({
            title: 'Retenido por devolver por contrato',
            total: contracts.retention.balance,
            noun: CONTRACT_NOUN,
            rows: contractRows(
              contracts.items.filter((c) => c.retention.balance !== '0.00'),
              (c) => c.retention.balance
            ),
            emptyText: 'Ningún contrato de la obra tiene retenido por devolver.'
          })
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
              sub={`La línea vertical marca el ${fDateOnly(referenceDate)}; los puntos son las facturas de cada contrato (huecos, por aprobar)`}
            />
          }
        >
          <Timeline
            work={work}
            contracts={contracts.items}
            policies={contracts.policies}
            marks={invoices?.items.filter((inv) => inv.ctrId) ?? []}
            referenceDate={referenceDate}
          />
        </MainCard>
      )}

      {invoices && (
        <Grid container spacing={gridSpacing}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <InvoicedByMonth byMonth={invoices.byMonth} items={invoices.items} onDrill={openDrill} />
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }}>
            <InvoicesByType invoices={invoices} onDrill={openDrill} />
          </Grid>
        </Grid>
      )}

      {(invoices || contracts) && (
        <Grid container spacing={gridSpacing}>
          {invoices && (
            <Grid size={{ xs: 12, lg: contracts ? 7 : 12 }}>
              <InvoicedByContract
                byContract={invoices.byContract}
                contracts={contracts?.items}
                items={invoices.items}
                onDrill={openDrill}
              />
            </Grid>
          )}
          {contracts && (
            <Grid size={{ xs: 12, lg: invoices ? 5 : 12 }}>
              <Advances contracts={contracts.items} />
            </Grid>
          )}
        </Grid>
      )}

      {contracts && <ContractsByState contracts={contracts} onDrill={openDrill} />}
      {dialog}
    </Stack>
  );
}

WorkChartsTab.propTypes = { data: PropTypes.object.isRequired };
