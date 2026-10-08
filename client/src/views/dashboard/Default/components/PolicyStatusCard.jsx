import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Chart from 'react-apexcharts';

import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

import MainCard from 'ui-component/cards/MainCard';

/**
 * Estado de pólizas por contrato (ADR-0002, DEC-052): cada contrato en una
 * sola categoría, por el peor estado de sus pólizas vigentes; la suma es el
 * total. Una sola serie: barras en un solo color, cada una con su nombre. La
 * lista de al lado es la vista en texto y lleva al listado de contratos con
 * el mismo predicado que produjo la cifra.
 */
export default function PolicyStatusCard({ policies, expiringDays }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const linkTo = (status) => `/work/contracts?policyStatus=${status}`;

  const options = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      fontFamily: theme.typography.fontFamily,
      events: { dataPointSelection: (_e, _c, { dataPointIndex }) => navigate(linkTo(policies.byStatus[dataPointIndex].status)) }
    },
    plotOptions: { bar: { horizontal: true, borderRadius: 4, borderRadiusApplication: 'end', barHeight: '60%' } },
    colors: [theme.palette.primary[800]],
    dataLabels: { enabled: true, style: { colors: [theme.palette.common.white], fontWeight: 500 } },
    xaxis: {
      categories: policies.byStatus.map((s) => s.name),
      labels: { style: { colors: theme.palette.text.secondary } },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: { labels: { style: { colors: theme.palette.text.primary, fontSize: '12px' }, maxWidth: 200 } },
    grid: { borderColor: theme.palette.divider, strokeDashArray: 3, xaxis: { lines: { show: true } }, yaxis: { lines: { show: false } } },
    tooltip: { y: { formatter: (value) => `${value} contrato${value === 1 ? '' : 's'}`, title: { formatter: () => '' } } },
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
                <Link component={RouterLink} to={linkTo(s.status)} underline="hover" variant="body2">
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
              <Link component={RouterLink} to="/work/contracts?uncovered=true" underline="hover" variant="body2">
                Con conceptos sin póliza
              </Link>
              <Typography variant="body2" sx={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                {policies.uncoveredContracts}
              </Typography>
            </ListItem>
          </List>
          <Typography variant="caption" color="text.secondary">
            Manda la póliza en peor estado. «A vencer»: dentro de {expiringDays} días.
          </Typography>
        </Grid>
      </Grid>
    </MainCard>
  );
}

PolicyStatusCard.propTypes = { policies: PropTypes.object.isRequired, expiringDays: PropTypes.number.isRequired };
