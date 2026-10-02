import { useEffect, useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { IconAlertTriangle, IconBuildingCommunity, IconClockHour4, IconCurrencyDollar } from '@tabler/icons-react';

import { getWorksSummaryAPI } from 'api/requests/worksApi';
import { ACTION_TONES } from 'ui-component/extended/ActionButton';
import { showError } from 'services/ToastService';
import { fMoneyText } from 'utils/formatNumber';
import { gridSpacing } from 'store/constant';

/**
 * Indicadores del listado de obras (DEC-033). Todo lo calcula el servidor
 * (FRONTEND_STANDARD, regla 9): conteos, valor vigente total y avance. Son de
 * todas las obras: no cambian con la búsqueda ni con la pestaña.
 */
export default function WorksSummary() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    let active = true;
    getWorksSummaryAPI()
      .then(({ data }) => active && setSummary(data))
      .catch((err) => showError(err.response?.data?.message || 'Error al cargar los indicadores de obras'));
    return () => {
      active = false;
    };
  }, []);

  // Primera carga o error: la estructura se ve igual, con "—" en las cifras.
  const s = summary ?? {};
  const pending = summary === null;
  const items = [
    {
      label: 'Obras',
      value: pending ? '—' : String(s.total),
      hint: pending ? '' : `${s.active} activas · ${s.inactive} inactivas`,
      icon: IconBuildingCommunity,
      tone: ACTION_TONES.info
    },
    {
      label: 'Valor vigente total',
      value: pending ? '—' : fMoneyText(s.currentValueTotal),
      hint: 'Obras activas e inactivas',
      icon: IconCurrencyDollar,
      tone: ACTION_TONES.edit
    },
    {
      label: 'Avance promedio del plazo',
      value: pending || s.averageProgress === null ? '—' : `${s.averageProgress} %`,
      hint: 'Obras activas con fechas',
      icon: IconClockHour4,
      tone: ACTION_TONES.success
    },
    {
      label: 'Cerca de terminar',
      value: pending ? '—' : String(s.closingCount),
      hint: pending ? '' : `Activas con ${s.closingThreshold} % o más del plazo`,
      icon: IconAlertTriangle,
      tone: ACTION_TONES.danger
    }
  ];

  return (
    <Box
      component="section"
      aria-label="Indicadores de obras"
      sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: gridSpacing }}
    >
      {items.map(({ label, value, hint, icon: Icon, tone }) => (
        <Stack key={label} direction="row" spacing={2} alignItems="center" sx={{ bgcolor: 'background.paper', borderRadius: 1, p: 2.5 }}>
          <Avatar variant="rounded" sx={{ width: 48, height: 48, bgcolor: tone.bg, color: tone.fg, borderRadius: 1.5 }} aria-hidden>
            <Icon size={24} stroke={1.8} />
          </Avatar>
          <Stack sx={{ minWidth: 0 }}>
            <Typography variant="caption" color="text.secondary">
              {label}
            </Typography>
            <Typography variant="h3" sx={{ fontVariantNumeric: 'tabular-nums', overflowWrap: 'anywhere' }}>
              {value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {hint}
            </Typography>
          </Stack>
        </Stack>
      ))}
    </Box>
  );
}
