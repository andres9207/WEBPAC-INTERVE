import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import MainCard from 'ui-component/cards/MainCard';
import useSchemePalette from 'hooks/useSchemePalette';
import { gridSpacing } from 'store/constant';
import { fMoneyText, fPercentText } from 'utils/formatNumber';

import { invoiceRows } from './DrillDownDialog';
import { chartAmount, paletteColor, plural } from './workDashboard.utils';

// Analítica del resumen de la obra (ADR-0002): el costo ejecutado por menú de
// facturas y el estado de costos frente al valor vigente de la obra. Las
// cifras llegan del servidor (`invoices.executed`); cada menú y lo ejecutado
// abren sus facturas aprobadas (DrillDownDialog).

const num = { fontVariantNumeric: 'tabular-nums' };
const INVOICE_NOUN = ['factura', 'facturas'];
const drillLinkSx = { fontWeight: 500, color: 'text.primary', textAlign: 'left', verticalAlign: 'baseline' };
const clickableChartSx = { '& .apexcharts-pie-area': { cursor: 'pointer' } };

// Los menús son dinámicos (DEC-074): se colorean por posición, con las claves
// validadas en DEC-063.
const MENU_COLORS = ['primary.800', 'success.dark', 'orange.dark', 'cyan.main', 'secondary.main', 'grey.600'];
const EXECUTED_COLOR = 'primary.800';
const PENDING_COLOR = 'cyan.main';
const EXCEEDED_COLOR = 'error.main';

const menuColor = (index) => MENU_COLORS[index % MENU_COLORS.length];

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

/** Dona con su lista: cada fila con color, nombre (enlace si abre detalle), valor y porcentaje. */
function DonutWithLegend({ label, slices, onSelect }) {
  const theme = useTheme();
  const palette = useSchemePalette();
  // `legendOnly`: una fila que ya está dentro de otra porción (el exceso, dentro de lo ejecutado).
  const present = slices.filter((s) => !s.legendOnly && chartAmount(s.value) > 0);
  const options = {
    chart: {
      type: 'donut',
      fontFamily: theme.typography.fontFamily,
      events: { dataPointSelection: (_e, _c, { dataPointIndex }) => present[dataPointIndex]?.onClick?.() }
    },
    labels: present.map((s) => s.name),
    colors: present.map((s) => paletteColor(palette, s.color)),
    legend: { show: false },
    dataLabels: { enabled: false },
    stroke: { width: 2, colors: [palette.background.paper] },
    plotOptions: { pie: { donut: { size: '68%' } } },
    tooltip: { theme: palette.mode, y: { formatter: (_v, { seriesIndex }) => fMoneyText(present[seriesIndex].value) } }
  };
  return (
    <Stack spacing={2} alignItems="center">
      <Box
        role="img"
        aria-label={`${label}: ${slices.map((s) => `${s.name} ${fMoneyText(s.value)}`).join(', ')}`}
        sx={{ width: 240, maxWidth: '100%', ...(onSelect && clickableChartSx) }}
      >
        <Chart type="donut" height={240} series={present.map((s) => chartAmount(s.value))} options={options} />
      </Box>
      <Stack component="ul" sx={{ listStyle: 'none', m: 0, p: 0, width: '100%' }}>
        {slices.map((s) => (
          <Box
            component="li"
            key={s.key}
            sx={{
              display: 'grid',
              gridTemplateColumns: '12px minmax(0, 1fr) minmax(120px, auto) 56px',
              gap: 1.5,
              alignItems: 'center',
              py: 1.25,
              borderBottom: 1,
              borderColor: 'grey.100'
            }}
          >
            <Box aria-hidden sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: s.color }} />
            {s.onClick ? (
              <Link component="button" type="button" underline="hover" variant="body2" onClick={s.onClick} sx={drillLinkSx} noWrap>
                {s.name}
              </Link>
            ) : (
              <Typography variant="body2" noWrap>
                {s.name}
              </Typography>
            )}
            <Typography variant="body2" sx={{ ...num, textAlign: 'right', fontWeight: 600 }}>
              {fMoneyText(s.value)}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ ...num, textAlign: 'right' }}>
              {s.pct === null ? '' : fPercentText(s.pct, 2)}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}

DonutWithLegend.propTypes = {
  label: PropTypes.string.isRequired,
  slices: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.bool
};

export default function WorkCosts({ invoices, onDrill }) {
  const { executed } = invoices;
  const approved = invoices.items.filter((inv) => inv.state === 'APPROVED');
  const drillExecuted = () =>
    onDrill({
      title: 'Costo ejecutado',
      subtitle: 'Facturas aprobadas',
      total: executed.value,
      noun: INVOICE_NOUN,
      rows: invoiceRows(approved),
      emptyText: 'La obra todavía no tiene facturas aprobadas.'
    });
  const unpriced = executed.byMenu.reduce((sum, m) => sum + m.unpriced, 0);

  const menuSlices = executed.byMenu.map((m, index) => ({
    key: `menu-${m.pvtId}`,
    name: m.name,
    value: m.value,
    pct: m.pct,
    color: menuColor(index),
    onClick: () =>
      onDrill({
        title: `Costo ejecutado · ${m.name}`,
        subtitle: 'Facturas aprobadas',
        total: m.value,
        noun: INVOICE_NOUN,
        rows: invoiceRows(approved.filter((inv) => inv.pvtId === m.pvtId))
      })
  }));

  const { status } = executed;
  const statusSlices = status && [
    { key: 'pending', name: 'Pendiente por ejecutar', value: status.pending, pct: status.pendingPct, color: PENDING_COLOR },
    { key: 'executed', name: 'Ejecutado', value: executed.value, pct: status.executedPct, color: EXECUTED_COLOR, onClick: drillExecuted },
    ...(chartAmount(status.exceeded) > 0
      ? [{ key: 'exceeded', name: 'Excede el valor vigente', value: status.exceeded, pct: null, color: EXCEEDED_COLOR, legendOnly: true }]
      : [])
  ];

  return (
    <Stack spacing={1.5}>
      <Stack spacing={0.25}>
        <Typography variant="h3" component="h2">
          Analítica
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Costo ejecutado de la obra: sus facturas aprobadas, de todos los tipos.
        </Typography>
      </Stack>
      <Grid container spacing={gridSpacing}>
        <Grid size={{ xs: 12, md: status ? 6 : 12 }}>
          <MainCard
            title={<CardTitle title="Costo de la obra ejecutado por tipo" sub="Por menú de facturas" />}
            secondary={
              <Link component="button" type="button" underline="hover" variant="body2" onClick={drillExecuted}>
                {plural(executed.count, 'factura', 'facturas')}
              </Link>
            }
            sx={{ height: '100%' }}
          >
            {executed.count === 0 ? (
              <Typography variant="body2" color="text.secondary">
                La obra todavía no tiene facturas aprobadas.
              </Typography>
            ) : (
              <Stack spacing={1}>
                <DonutWithLegend label="Costo ejecutado por menú" slices={menuSlices} onSelect />
                {unpriced > 0 && (
                  <Typography variant="caption" color="text.secondary">
                    {plural(unpriced, 'factura simple sin importes no suma', 'facturas simples sin importes no suman')} (anteriores a la
                    fórmula de la simple).
                  </Typography>
                )}
              </Stack>
            )}
          </MainCard>
        </Grid>
        {status && (
          <Grid size={{ xs: 12, md: 6 }}>
            <MainCard
              title={<CardTitle title="Estado de costos" sub={`Frente al valor vigente de la obra, ${fMoneyText(status.budget)}`} />}
              sx={{ height: '100%' }}
            >
              <DonutWithLegend label="Estado de costos" slices={statusSlices} onSelect />
            </MainCard>
          </Grid>
        )}
      </Grid>
    </Stack>
  );
}

WorkCosts.propTypes = { invoices: PropTypes.object.isRequired, onDrill: PropTypes.func.isRequired };
