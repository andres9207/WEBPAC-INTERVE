import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';

import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

import MainCard from 'ui-component/cards/MainCard';
import useSchemePalette from 'hooks/useSchemePalette';

/**
 * Estado de pólizas por contrato (ADR-0002, DEC-052, DEC-064): cada contrato
 * en una sola categoría, por su póliza vigente de mayor valor asegurado; la suma es el
 * total. Una sola serie: barras en un solo color, cada una con su nombre. La
 * lista de al lado es la vista en texto. La barra y la lista abren en el
 * tablero los contratos de la categoría (`onOpen`), con el mismo predicado
 * que produjo la cifra; "Con conceptos sin póliza", `onOpenUncovered`.
 */
export default function PolicyStatusCard({ policies, expiringDays, onOpen, onOpenUncovered }) {
  const theme = useTheme();
  const palette = useSchemePalette();

  const options = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      fontFamily: theme.typography.fontFamily,
      events: { dataPointSelection: (_e, _c, { dataPointIndex }) => onOpen(policies.byStatus[dataPointIndex]) }
    },
    plotOptions: { bar: { horizontal: true, borderRadius: 4, borderRadiusApplication: 'end', barHeight: '60%' } },
    colors: [palette.primary[800]],
    // En oscuro la barra es clara (primary.800): el texto va con el color del fondo.
    dataLabels: { enabled: true, style: { colors: [palette.mode === 'dark' ? palette.background.paper : palette.common.white], fontWeight: 500 } },
    xaxis: {
      categories: policies.byStatus.map((s) => s.name),
      labels: { style: { colors: palette.text.secondary } },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: { labels: { style: { colors: palette.text.primary, fontSize: '12px' }, maxWidth: 200 } },
    grid: { borderColor: palette.divider, strokeDashArray: 3, xaxis: { lines: { show: true } }, yaxis: { lines: { show: false } } },
    tooltip: { theme: palette.mode, y: { formatter: (value) => `${value} contrato${value === 1 ? '' : 's'}`, title: { formatter: () => '' } } },
    states: { hover: { filter: { type: 'darken', value: 0.85 } } }
  };

  return (
    <MainCard title="Estado de pólizas por contrato" sx={{ height: '100%' }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 7 }} aria-hidden>
          <Chart type="bar" height={240} series={[{ name: 'Contratos', data: policies.byStatus.map((s) => s.count) }]} options={options} />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <List dense disablePadding aria-label="Contratos por estado de pólizas">
            {policies.byStatus.map((s) => (
              <ListItem key={s.status} disableGutters sx={{ justifyContent: 'space-between', gap: 1 }}>
                <Link component="button" type="button" onClick={() => onOpen(s)} underline="hover" variant="body2">
                  {s.name}
                </Link>
                <Typography variant="body2" sx={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                  {s.count}
                </Typography>
              </ListItem>
            ))}
            <ListItem disableGutters sx={{ justifyContent: 'space-between', gap: 1, borderTop: 1, borderColor: 'divider', mt: 1, pt: 1 }}>
              <Typography variant="body2">Total de contratos</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                {policies.total}
              </Typography>
            </ListItem>
            <ListItem disableGutters sx={{ justifyContent: 'space-between', gap: 1 }}>
              <Link component="button" type="button" onClick={onOpenUncovered} underline="hover" variant="body2">
                Con conceptos sin póliza
              </Link>
              <Typography variant="body2" sx={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                {policies.uncoveredContracts}
              </Typography>
            </ListItem>
          </List>
          <Typography variant="caption" color="text.secondary">
            Manda la póliza de mayor valor asegurado; si empatan, la de peor estado. «A vencer»: dentro de {expiringDays} días.
          </Typography>
        </Grid>
      </Grid>
    </MainCard>
  );
}

PolicyStatusCard.propTypes = {
  policies: PropTypes.object.isRequired,
  expiringDays: PropTypes.number.isRequired,
  /** Abre el detalle de una categoría (`byStatus[i]`). */
  onOpen: PropTypes.func.isRequired,
  onOpenUncovered: PropTypes.func.isRequired
};
