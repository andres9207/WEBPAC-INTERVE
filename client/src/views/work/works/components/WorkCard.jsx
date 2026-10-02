import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import ActionButton from 'ui-component/extended/ActionButton';
import StatusChip from 'ui-component/extended/StatusChip';
import { fMoneyText } from 'utils/formatNumber';
import { fDateOnly } from 'utils/formatTime';
import { fTerm } from 'utils/constants';

// Color de la barra según el nivel que manda el servidor (DEC-033). Una obra
// inactiva va en gris: su avance es informativo.
const LEVEL_COLORS = { NORMAL: 'primary.800', WARNING: 'orange.dark', CRITICAL: 'error.dark' };

const initialsOf = (name) =>
  String(name ?? '')
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();

/**
 * Tarjeta de una obra en el listado (DEC-033): estado, valor vigente, avance
 * del plazo, etapas y responsable principal. Las cifras, fechas y el avance
 * vienen calculados del servidor (FRONTEND_STANDARD, regla 9).
 */
export default function WorkCard({ row, actions, onOpen }) {
  const isActive = row.staId === 1;
  const percent = row.progressPercent;
  const barColor = isActive ? (LEVEL_COLORS[row.progressLevel] ?? 'primary.800') : 'grey.500';
  const stages = row.stages ?? [];
  const activeStages = stages.filter((stage) => stage.staId === 1).length;
  const managers = row.activeManagers ?? 0;

  return (
    <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 1.5, overflow: 'hidden' }}>
      <Box sx={{ height: 6, bgcolor: isActive ? 'primary.800' : 'grey.300' }} aria-hidden />

      <Stack spacing={1.75} sx={{ p: 2.25, flexGrow: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
          <Typography variant="caption" sx={{ fontWeight: 600, color: 'grey.700', letterSpacing: '0.04em' }}>
            {row.code} · {row.supervisionType}
          </Typography>
          <StatusChip staId={row.staId} label={row.statusName} />
        </Stack>

        <Box>
          <Link
            component="button"
            type="button"
            variant="h4"
            underline="hover"
            onClick={onOpen}
            sx={{ textAlign: 'left', color: 'text.dark' }}
          >
            {row.name}
          </Link>
          <Typography variant="body2" color="text.secondary">
            {row.constructionCompany}
          </Typography>
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary">
            Valor vigente
          </Typography>
          <Typography variant="h3" sx={{ fontVariantNumeric: 'tabular-nums' }}>
            {fMoneyText(row.currentValue)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {row.extendedValue ? `Ampliado desde ${fMoneyText(row.initialValue)}` : 'Sin ampliación'}
          </Typography>
        </Box>

        <Stack spacing={0.75}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="caption" color="text.secondary">
              Avance del plazo
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.dark' }}>
              {percent === null || percent === undefined ? 'Sin fechas' : `${percent} %`}
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={percent ?? 0}
            aria-label={percent === null || percent === undefined ? 'Avance del plazo: sin fechas' : `Avance del plazo: ${percent} %`}
            sx={{ height: 8, borderRadius: 4, bgcolor: 'grey.200', '& .MuiLinearProgress-bar': { bgcolor: barColor, borderRadius: 4 } }}
          />
          <Stack direction="row" justifyContent="space-between" spacing={1}>
            <Typography variant="caption" color="text.secondary">
              {fDateOnly(row.startDate) || '—'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {fTerm(row.initialTerm, row.termUnit)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {fDateOnly(row.endDate) || '—'}
            </Typography>
          </Stack>
        </Stack>

        <Stack spacing={0.75}>
          <Typography variant="caption" color="text.secondary">
            {stages.length ? `Etapas · ${activeStages} de ${stages.length} activas` : 'Sin etapas'}
          </Typography>
          {stages.length > 0 && (
            <Stack direction="row" spacing={0.5} aria-hidden>
              {stages.map((stage, index) => (
                <Tooltip key={`${index}-${stage.name}`} title={`${index + 1}. ${stage.name}${stage.staId === 1 ? '' : ' (inactiva)'}`}>
                  <Box sx={{ flex: 1, height: 10, borderRadius: 0.5, bgcolor: stage.staId === 1 ? 'secondary.main' : 'grey.200' }} />
                </Tooltip>
              ))}
            </Stack>
          )}
        </Stack>
      </Stack>

      <Divider />
      <Stack direction="row" alignItems="center" spacing={1.25} sx={{ px: 2.25, py: 1.5 }}>
        <Avatar sx={{ width: 36, height: 36, fontSize: 13, fontWeight: 600, bgcolor: 'primary.light', color: 'primary.800' }} aria-hidden>
          {row.mainManagerName ? initialsOf(row.mainManagerName) : '?'}
        </Avatar>
        <Stack sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.dark' }} noWrap>
            {row.mainManagerName ?? 'Sin principal'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Principal · {managers} {managers === 1 ? 'responsable activo' : 'responsables activos'}
          </Typography>
        </Stack>
        {actions.map((item) => (
          <ActionButton key={item.label} item={item} onClick={() => item.command()} size="small" />
        ))}
      </Stack>
    </Card>
  );
}

WorkCard.propTypes = {
  /** Fila del listado de obras, con el avance y las etapas que manda el servidor. */
  row: PropTypes.object.isRequired,
  /** Acciones de la fila (las de MasterPage): ver detalle y editar. */
  actions: PropTypes.array.isRequired,
  /** Abre el detalle de la obra. */
  onOpen: PropTypes.func.isRequired
};
