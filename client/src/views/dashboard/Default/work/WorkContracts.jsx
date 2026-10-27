import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { IconChevronDown, IconLayoutGrid, IconList, IconSearch } from '@tabler/icons-react';

import MainCard from 'ui-component/cards/MainCard';
import StatusTabs from 'ui-component/extended/StatusTabs';
import AlertChips from 'ui-component/extended/AlertChips';
import { fMoneyText, fPercentText } from 'utils/formatNumber';
import { fDateOnly } from 'utils/formatTime';
import { CONTRACT_STATE_COLORS, CONTRACT_STATE_TABS, contractAlertOptions } from 'utils/constants';

import { ADVANCE_LEVELS, AdvanceBar, AdvanceFilter, AdvanceLegend, matchesAdvanceFilter, matchesAdvanceLegend } from './AdvanceBars';
import { POLICY_STATUS_COLORS, barPercent, chartAmount, dashboardTo, plural } from './workDashboard.utils';

// Contratos del resumen de la obra (DEC-063): pestañas de estado y alertas del listado, búsqueda,
// orden y dos vistas (tarjetas y tabla). Cifras, días y niveles llegan del
// servidor; aquí solo se filtra, se ordena y se dibuja.

const num = { fontVariantNumeric: 'tabular-nums' };
const VIEW_KEY = 'workDashboard.contractsView';
const TABLE_ROWS = 10;
// Estados con plazo corriendo: los únicos en que importa cuánto falta.
const RUNNING_STATES = ['IN_PROGRESS', 'SUSPENDED'];

const normalize = (text) =>
  String(text ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

// El orden solo compara: los importes se leen siempre desde el texto (chartAmount es solo para escalas y orden).
const SORTS = [
  { id: 'number', name: 'Número', compare: (a, b) => String(a.number).localeCompare(String(b.number), 'es', { numeric: true }) },
  { id: 'value', name: 'Mayor valor vigente', compare: (a, b) => chartAmount(b.currentValue) - chartAmount(a.currentValue) },
  {
    id: 'endDate',
    name: 'Fecha fin más próxima',
    compare: (a, b) => String(a.endDate ?? '9999').localeCompare(String(b.endDate ?? '9999'))
  },
  {
    id: 'progress',
    name: 'Mayor avance facturado',
    needsProgress: true,
    compare: (a, b) => chartAmount(b.progress?.pct) - chartAmount(a.progress?.pct)
  }
];

const readView = () => {
  try {
    return window.localStorage.getItem(VIEW_KEY) === 'table' ? 'table' : 'cards';
  } catch {
    return 'cards';
  }
};

const saveView = (view) => {
  try {
    window.localStorage.setItem(VIEW_KEY, view);
  } catch {
    // Sin almacenamiento, la vista vuelve a tarjetas: no es un error.
  }
};

/** "faltan 34 días", "vence hoy", "vencido hace 3 días"; nada si el plazo ya no corre. */
const remainingText = (contract) => {
  const days = contract.remainingDays;
  if (days === null || !RUNNING_STATES.includes(contract.state)) return null;
  if (days > 0) return `faltan ${plural(days, 'día', 'días')}`;
  if (days === 0) return 'vence hoy';
  return `vencido hace ${plural(-days, 'día', 'días')}`;
};

const remainingColor = (contract) =>
  contract.remainingDays !== null && contract.remainingDays < 0 && RUNNING_STATES.includes(contract.state)
    ? 'error.dark'
    : 'text.secondary';

/** Barra del avance facturado (I5), con el color de la escala del anticipo. */
function ProgressBar({ progress }) {
  const level = ADVANCE_LEVELS[progress.level] ?? ADVANCE_LEVELS.LOW;
  return (
    <Tooltip title={`Avance facturado: ${fMoneyText(progress.value)}, ${fPercentText(progress.pct, 1)} de la base antes de IVA`}>
      <LinearProgress
        variant="determinate"
        value={barPercent(progress.pct)}
        aria-label={`Avance facturado ${fPercentText(progress.pct, 1)}`}
        sx={{ height: 6, borderRadius: 3, bgcolor: 'grey.200', '& .MuiLinearProgress-bar': { bgcolor: level.color, borderRadius: 3 } }}
      />
    </Tooltip>
  );
}

ProgressBar.propTypes = { progress: PropTypes.object.isRequired };

/** Póliza de mayor exposición y conceptos sin póliza, en una línea (DEC-064). */
const policyHintOf = (policies) => {
  const deciding = policies?.deciding;
  return [
    deciding?.endDate && `${deciding.number} ${deciding.validity === 'EXPIRED' ? 'venció' : 'vence'} el ${fDateOnly(deciding.endDate)}`,
    policies?.uncovered.length > 0 && `${policies.uncovered.map((c) => c.label).join(', ')} sin póliza`
  ]
    .filter(Boolean)
    .join(' · ');
};

/** Tarjeta compacta: cifras en una fila, plazo en una línea y el anticipo plegable. */
function ContractCard({ contract }) {
  const [open, setOpen] = useState(false);
  const policies = contract.policies;
  const policyHint = policyHintOf(policies);
  const hasAdvance = contract.advance.agreed !== '0.00';
  const remaining = remainingText(contract);
  return (
    <Card variant="outlined" sx={{ height: '100%', borderRadius: 1.5, p: 1.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Stack direction="row" justifyContent="space-between" spacing={1} alignItems="flex-start">
        <Stack sx={{ minWidth: 0 }}>
          <Link
            component={RouterLink}
            to={dashboardTo.contract(contract.ctrId)}
            underline="hover"
            variant="subtitle1"
            color="text.primary"
            noWrap
          >
            {contract.number} · {contract.name}
          </Link>
          <Typography variant="caption" color="text.secondary" noWrap>
            {[contract.providerName, contract.stageName].filter(Boolean).join(' · ')}
          </Typography>
        </Stack>
        <Chip size="small" label={contract.stateName} color={CONTRACT_STATE_COLORS[contract.state]} variant="outlined" />
      </Stack>

      <Box sx={{ display: 'grid', gridTemplateColumns: contract.progress ? '1fr 1fr' : '1fr', gap: 1.5 }}>
        <Stack>
          <Typography variant="caption" color="text.secondary">
            Valor vigente
          </Typography>
          <Typography variant="h4" component="p" sx={num}>
            {fMoneyText(contract.currentValue)}
          </Typography>
        </Stack>
        {contract.progress && (
          <Stack spacing={0.5}>
            <Stack direction="row" justifyContent="space-between" spacing={1}>
              <Typography variant="caption" color="text.secondary">
                Avance facturado
              </Typography>
              <Typography variant="caption" sx={{ ...num, fontWeight: 600 }}>
                {fPercentText(contract.progress.pct, 1)}
              </Typography>
            </Stack>
            <ProgressBar progress={contract.progress} />
            <Typography variant="caption" color="text.secondary" sx={num}>
              {fMoneyText(contract.progress.value)}
            </Typography>
          </Stack>
        )}
      </Box>

      <Typography variant="caption" color="text.secondary" sx={num}>
        {fDateOnly(contract.startDate)} → {fDateOnly(contract.endDate)}
        {contract.endDateProvisional && ' (provisional)'}
        {remaining && (
          <Box component="span" sx={{ color: remainingColor(contract), fontWeight: 500 }}>
            {` · ${remaining}`}
          </Box>
        )}
      </Typography>

      {(policies || contract.retention.balance !== '0.00') && (
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
          {policies && (
            <Tooltip title={policyHint || ''} disableHoverListener={!policyHint}>
              <Chip
                size="small"
                label={`Pólizas: ${policies.statusName}`}
                color={POLICY_STATUS_COLORS[policies.status]}
                variant="outlined"
              />
            </Tooltip>
          )}
          {contract.retention.balance !== '0.00' && (
            <Typography variant="caption" color="text.secondary" sx={num}>
              Retenido por devolver {fMoneyText(contract.retention.balance)}
            </Typography>
          )}
        </Stack>
      )}

      {/* Las barras de anticipo del tablero (DEC-079), plegadas: el resumen muestra el porcentaje facturado. */}
      {hasAdvance && (
        <Box sx={{ mt: 'auto', pt: 0.5, borderTop: 1, borderColor: 'divider' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            <Typography variant="caption" color="text.secondary" sx={num}>
              Anticipo {fMoneyText(contract.advance.agreed)} · facturado {fPercentText(contract.advance.invoicedPct, 0)} · amortizado{' '}
              {fPercentText(contract.advance.amortizedPct, 0)}
            </Typography>
            <IconButton
              size="small"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Ocultar el detalle del anticipo' : 'Ver el detalle del anticipo'}
            >
              <IconChevronDown size={16} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 150ms' }} />
            </IconButton>
          </Stack>
          <Collapse in={open} unmountOnExit>
            <Stack spacing={0.75} sx={{ pt: 0.5 }}>
              <AdvanceBar label="Facturado" bar={contract.advance.bars.invoiced} />
              <AdvanceBar label="Amortizado" bar={contract.advance.bars.amortized} />
              {contract.advance.toAmortize !== '0.00' && (
                <Typography variant="caption" color="text.secondary">
                  Por amortizar: {fMoneyText(contract.advance.toAmortize)}
                </Typography>
              )}
            </Stack>
          </Collapse>
        </Box>
      )}
    </Card>
  );
}

ContractCard.propTypes = { contract: PropTypes.object.isRequired };

/** Tabla compacta, paginada en el cliente: las filas ya llegaron con el tablero. */
function ContractsTable({ items }) {
  const [page, setPage] = useState(0);
  const withProgress = items.some((c) => c.progress);
  const withPolicies = items.some((c) => c.policies);
  const last = Math.max(0, Math.ceil(items.length / TABLE_ROWS) - 1);
  const current = Math.min(page, last);
  return (
    <Box>
      <TableContainer sx={{ overflowX: 'auto' }}>
        <Table size="small" aria-label="Contratos de la obra">
          <TableHead>
            <TableRow>
              <TableCell>Contrato</TableCell>
              <TableCell>Proveedor</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="right">Valor vigente</TableCell>
              {withProgress && <TableCell sx={{ minWidth: 140 }}>Avance facturado</TableCell>}
              <TableCell>Fecha fin</TableCell>
              {withPolicies && <TableCell>Pólizas</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.slice(current * TABLE_ROWS, (current + 1) * TABLE_ROWS).map((c) => {
              const remaining = remainingText(c);
              return (
                <TableRow key={c.ctrId} hover>
                  <TableCell sx={{ maxWidth: 260 }}>
                    <Link component={RouterLink} to={dashboardTo.contract(c.ctrId)} underline="hover" sx={{ fontWeight: 500 }}>
                      {c.number}
                    </Link>
                    <Typography variant="caption" color="text.secondary" display="block" noWrap>
                      {c.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{c.providerName}</Typography>
                    {c.stageName && (
                      <Typography variant="caption" color="text.secondary">
                        {c.stageName}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip size="small" label={c.stateName} color={CONTRACT_STATE_COLORS[c.state]} variant="outlined" />
                  </TableCell>
                  <TableCell align="right" sx={{ ...num, whiteSpace: 'nowrap' }}>
                    {fMoneyText(c.currentValue)}
                  </TableCell>
                  {withProgress && (
                    <TableCell>
                      {c.progress && (
                        <Stack spacing={0.25}>
                          <Typography variant="caption" sx={{ ...num, fontWeight: 600 }}>
                            {fPercentText(c.progress.pct, 1)}
                          </Typography>
                          <ProgressBar progress={c.progress} />
                        </Stack>
                      )}
                    </TableCell>
                  )}
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    <Typography variant="body2" sx={num}>
                      {fDateOnly(c.endDate)}
                    </Typography>
                    {remaining && (
                      <Typography variant="caption" sx={{ color: remainingColor(c) }}>
                        {remaining}
                      </Typography>
                    )}
                  </TableCell>
                  {withPolicies && (
                    <TableCell>
                      {c.policies && (
                        <Tooltip title={policyHintOf(c.policies) || ''} disableHoverListener={!policyHintOf(c.policies)}>
                          <Chip
                            size="small"
                            label={c.policies.statusName}
                            color={POLICY_STATUS_COLORS[c.policies.status]}
                            variant="outlined"
                          />
                        </Tooltip>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {items.length > TABLE_ROWS && (
        <TablePagination
          component="div"
          count={items.length}
          page={current}
          onPageChange={(_e, value) => setPage(value)}
          rowsPerPage={TABLE_ROWS}
          rowsPerPageOptions={[TABLE_ROWS]}
          labelDisplayedRows={({ from, to, count }) => `${from}–${to} de ${count}`}
        />
      )}
    </Box>
  );
}

ContractsTable.propTypes = { items: PropTypes.arrayOf(PropTypes.object).isRequired };

export default function WorkContracts({ contracts }) {
  const [tab, setTab] = useState('all');
  const [alert, setAlert] = useState('');
  const [advanceFilter, setAdvanceFilter] = useState('');
  const [advanceLegend, setAdvanceLegend] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('number');
  const [view, setView] = useState(readView);

  // Como en el listado de contratos: pestañas de estado y alertas, combinables; cada una cuenta dentro de la otra. Las
  // alertas de pólizas, si el servidor las trae (permiso de verlas).
  const inTab = (c) => tab === 'all' || c.state === tab;
  const inAlert = (c) => !alert || c.alerts.includes(alert);
  const tabs = CONTRACT_STATE_TABS.map((t) => ({ ...t, total: contracts.items.filter((c) => c.state === t.id && inAlert(c)).length }));
  const alertOptions = contractAlertOptions(Boolean(contracts.policies));
  const alertCounts = Object.fromEntries(
    alertOptions.map((a) => [a.id, contracts.items.filter((c) => inTab(c) && c.alerts.includes(a.id)).length])
  );
  const sorts = SORTS.filter((s) => !s.needsProgress || contracts.items.some((c) => c.progress));
  const terms = normalize(search).split(/\s+/).filter(Boolean);
  const matchesSearch = (c) => {
    const text = normalize([c.number, c.name, c.providerName, c.stageName].join(' '));
    return terms.every((term) => text.includes(term));
  };
  const shown = contracts.items
    .filter(inTab)
    .filter(inAlert)
    .filter(matchesSearch)
    .filter(matchesAdvanceFilter(advanceFilter))
    .filter(matchesAdvanceLegend(advanceLegend))
    .sort((sorts.find((s) => s.id === sort) ?? SORTS[0]).compare);

  const changeView = (_e, value) => {
    if (!value) return;
    setView(value);
    saveView(value);
  };

  return (
    <MainCard
      title="Contratos de la obra"
      secondary={contracts.items.length > 0 && <AdvanceFilter value={advanceFilter} onChange={setAdvanceFilter} />}
      sx={{ height: '100%' }}
    >
      {contracts.items.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          La obra todavía no tiene contratos.
        </Typography>
      ) : (
        <Stack spacing={2}>
          <StatusTabs statusTabs={tabs} selectedStatus={tab} onChange={(_e, value) => setTab(value)} />
          <AlertChips options={alertOptions} counts={alertCounts} value={alert} onChange={setAlert} />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ xs: 'stretch', sm: 'center' }}>
            <TextField
              size="small"
              placeholder="Buscar por número, nombre, proveedor o etapa"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ flex: 1, minWidth: 0 }}
              slotProps={{
                htmlInput: { 'aria-label': 'Buscar contratos' },
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch size={18} />
                    </InputAdornment>
                  )
                }
              }}
            />
            <TextField
              select
              size="small"
              label="Ordenar por"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              sx={{ minWidth: 220 }}
            >
              {sorts.map((s) => (
                <MenuItem key={s.id} value={s.id}>
                  {s.name}
                </MenuItem>
              ))}
            </TextField>
            <ToggleButtonGroup size="small" exclusive value={view} onChange={changeView} aria-label="Vista de los contratos">
              <ToggleButton value="cards" aria-label="Tarjetas">
                <IconLayoutGrid size={18} />
              </ToggleButton>
              <ToggleButton value="table" aria-label="Tabla">
                <IconList size={18} />
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
          {contracts.items.some((c) => c.advance.agreed !== '0.00') && <AdvanceLegend value={advanceLegend} onChange={setAdvanceLegend} />}
          <Typography variant="caption" color="text.secondary">
            {plural(shown.length, 'contrato', 'contratos')}
            {shown.length !== contracts.items.length && ` de ${contracts.items.length}`}
          </Typography>
          {shown.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Ningún contrato cumple el filtro.
            </Typography>
          ) : view === 'table' ? (
            <ContractsTable items={shown} />
          ) : (
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, gap: 1.5 }}>
              {shown.map((c) => (
                <ContractCard key={c.ctrId} contract={c} />
              ))}
            </Box>
          )}
        </Stack>
      )}
    </MainCard>
  );
}

WorkContracts.propTypes = { contracts: PropTypes.object.isRequired };
