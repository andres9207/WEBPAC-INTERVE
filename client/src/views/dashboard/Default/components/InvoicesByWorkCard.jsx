import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Chart from 'react-apexcharts';

import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import MainCard from 'ui-component/cards/MainCard';

/**
 * Facturas recibidas por obra (DEC-052): registradas y aprobadas, sin las
 * anuladas, apiladas por obra. Por cantidad: la factura simple todavía no
 * tiene importes. Dos series con leyenda; colores validados contra el fondo
 * claro (orange.dark y primary.800, contraste ≥ 3:1 y separables con
 * daltonismo). El clic en una barra lleva a las facturas de esa obra.
 */
export default function InvoicesByWorkCard({ byWork }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const open = (index) => {
    const work = byWork[index];
    if (work) navigate(`/billing/invoices?wrkId=${work.wrkId}&label=${encodeURIComponent(work.workCode ?? '')}`);
  };

  const options = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: { show: false },
      fontFamily: theme.typography.fontFamily,
      events: {
        dataPointSelection: (_e, _c, { dataPointIndex }) => open(dataPointIndex),
        xAxisLabelClick: (_e, _c, { labelIndex }) => open(labelIndex)
      }
    },
    plotOptions: { bar: { borderRadius: 4, borderRadiusApplication: 'end', borderRadiusWhenStacked: 'last', columnWidth: '45%' } },
    colors: [theme.palette.orange.dark, theme.palette.primary[800]],
    stroke: { show: true, width: 2, colors: [theme.palette.background.paper] },
    dataLabels: { enabled: false },
    legend: { position: 'top', horizontalAlign: 'left', labels: { colors: theme.palette.text.primary } },
    xaxis: {
      categories: byWork.map((w) => w.workCode ?? '—'),
      labels: { style: { colors: theme.palette.text.secondary }, rotate: -30, hideOverlappingLabels: true },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: { forceNiceScale: true, labels: { formatter: (v) => String(Math.round(v)), style: { colors: theme.palette.text.secondary } } },
    grid: { borderColor: theme.palette.divider, strokeDashArray: 3 },
    tooltip: {
      shared: true,
      intersect: false,
      x: { formatter: (_v, { dataPointIndex }) => `${byWork[dataPointIndex]?.workCode} — ${byWork[dataPointIndex]?.workName ?? ''}` },
      y: { formatter: (value) => `${value} factura${value === 1 ? '' : 's'}` }
    }
  };

  return (
    <MainCard title="Facturas recibidas por obra" sx={{ height: '100%' }}>
      {byWork.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          Todavía no hay facturas registradas o aprobadas.
        </Typography>
      ) : (
        <div role="img" aria-label={byWork.map((w) => `${w.workCode}: ${w.registered} registradas y ${w.approved} aprobadas`).join('; ')}>
          <Chart
            type="bar"
            height={260}
            series={[
              { name: 'Registradas', data: byWork.map((w) => w.registered) },
              { name: 'Aprobadas', data: byWork.map((w) => w.approved) }
            ]}
            options={options}
          />
        </div>
      )}
    </MainCard>
  );
}

InvoicesByWorkCard.propTypes = { byWork: PropTypes.arrayOf(PropTypes.object).isRequired };
