import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { IconChartBar, IconLayoutDashboard } from '@tabler/icons-react';

import { getWorkDashboardAPI } from 'api/requests/dashboardApi';
import { useWorkScope } from 'contexts/WorkScopeContext';
import { showError } from 'services/ToastService';
import { gridSpacing } from 'store/constant';

import WorkSummaryTab from './WorkSummaryTab';
import WorkChartsTab from './WorkChartsTab';

/**
 * Tablero de la obra elegida en el encabezado (DEC-063, propuesta B del
 * tablero). Dos pestañas: el resumen de la obra y sus contratos y facturas
 * en gráficos. Todo lo calcula el servidor, en el alcance de la obra
 * (DEC-047); cada bloque llega en null si el usuario no puede ver su módulo.
 * Estilo Berry, solo tema claro (DEC-052).
 */

const TABS = [
  { value: 'summary', label: 'Resumen de la obra', icon: IconLayoutDashboard },
  { value: 'charts', label: 'Contratos y facturas', icon: IconChartBar }
];

// `reloadKey`: sube cuando un expediente abierto encima cambia algo; se
// recarga sin quitar lo que ya se ve.
export default function WorkDashboard({ reloadKey = 0 }) {
  const { activeWork, works } = useWorkScope();
  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(false);
  const [tab, setTab] = useState('summary');

  useEffect(() => {
    let active = true;
    getWorkDashboardAPI()
      .then(({ data: summary }) => active && setData(summary))
      .catch((err) => {
        if (!active) return;
        setFailed(true);
        showError(err.response?.data?.message || 'Error al cargar el tablero de la obra');
      });
    return () => {
      active = false;
    };
  }, [reloadKey]);

  const workLabel = works.find((w) => w.value === activeWork)?.label ?? 'Obra';
  const nothingVisible = data && !data.work && !data.contracts && !data.invoices && !data.providers;

  return (
    <Stack spacing={gridSpacing}>
      <Box sx={{ bgcolor: 'background.paper', borderRadius: 1, px: 2 }}>
        <Tabs
          value={tab}
          onChange={(_e, value) => setTab(value)}
          aria-label="Vistas del tablero de la obra"
          variant="scrollable"
          allowScrollButtonsMobile
        >
          {TABS.map(({ value, label, icon: Icon }) => (
            <Tab
              key={value}
              value={value}
              label={label}
              icon={<Icon size={18} stroke={1.8} aria-hidden />}
              iconPosition="start"
              sx={{ minHeight: 52, textTransform: 'none', fontSize: '0.875rem' }}
            />
          ))}
        </Tabs>
      </Box>

      {!data && !failed && (
        <Typography variant="body2" color="text.secondary">
          Cargando…
        </Typography>
      )}
      {failed && !data && (
        <Typography variant="body2" color="text.secondary">
          No se pudo cargar el tablero de la obra. Recarga la página para intentarlo de nuevo.
        </Typography>
      )}
      {data && !data.wrkId && (
        <Typography variant="body2" color="text.secondary">
          No tienes acceso a la obra elegida. Elige otra en el encabezado.
        </Typography>
      )}
      {data?.wrkId && nothingVisible && (
        <Typography variant="body2" color="text.secondary">
          Tu perfil no tiene permiso para ver obras, proveedores, contratos ni facturas: el tablero no tiene cifras que mostrarte.
        </Typography>
      )}

      {data?.wrkId && !nothingVisible && tab === 'summary' && <WorkSummaryTab data={data} workLabel={workLabel} />}
      {data?.wrkId && !nothingVisible && tab === 'charts' && <WorkChartsTab data={data} />}
    </Stack>
  );
}

WorkDashboard.propTypes = { reloadKey: PropTypes.number };
