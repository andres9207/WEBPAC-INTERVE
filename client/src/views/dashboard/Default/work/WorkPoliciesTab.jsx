import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { IconCalendarOff, IconClockExclamation, IconEye, IconFileOff, IconShieldCheck, IconShieldX, IconTrash } from '@tabler/icons-react';

import MainCard from 'ui-component/cards/MainCard';
import DataTable from 'ui-component/extended/DataTable';
import FilterButton from 'ui-component/extended/FilterButton';
import { ACTION_TONES } from 'ui-component/extended/ActionButton';
import useListFilters from 'hooks/useListFilters';
import { gridSpacing } from 'store/constant';
import { fDateOnly } from 'utils/formatTime';

import DashboardCards from '../components/DashboardCards';
import { POLICY_STATUS_COLORS, dashboardTo } from './workDashboard.utils';

/**
 * Pestaña "Pólizas" del tablero de la obra (DEC-063): las pólizas vigentes de
 * la obra por vigencia y los contratos sin ninguna póliza, en cifras y en una
 * tabla. Vigencia, conteos y concepto amparado llegan del servidor
 * (`policyValidity`, con el umbral de DEC-072); el cliente solo filtra filas.
 * Cada cifra filtra la tabla, y el ojo abre el expediente del contrato encima
 * del tablero.
 */

// Estado de la fila: la vigencia de la póliza, o NONE si es un contrato sin póliza.
const WITHOUT_POLICY = 'NONE';
const STATUS_OPTIONS = [
  { value: 'EXPIRED', label: 'Vencida' },
  { value: 'EXPIRING', label: 'A vencer' },
  { value: 'ACTIVE', label: 'Vigente' },
  { value: 'NO_DATE', label: 'Sin fecha de vigencia' },
  { value: WITHOUT_POLICY, label: 'Sin póliza' }
];
const EXPIRING_TONE = { bg: 'warning.light', fg: 'orange.dark' };

const optionsOf = (rows, key) => [...new Set(rows.map((r) => r[key]).filter(Boolean))].sort().map((value) => ({ value, label: value }));
const includesText = (value, text) =>
  String(value ?? '')
    .toLowerCase()
    .includes(text.trim().toLowerCase());

export default function WorkPoliciesTab({ data }) {
  const { contracts, expiringDays } = data;
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const rows = useMemo(() => {
    const byId = new Map(contracts.items.map((c) => [c.ctrId, c]));
    const contractOf = (c) => ({ ctrId: c.ctrId, contractTypeName: c.contractTypeName, contractName: c.name, contractNumber: c.number });
    return [
      ...contracts.policies.map((p) => ({
        key: `p${p.polId}`,
        ...contractOf(byId.get(p.ctrId)),
        conceptLabel: p.conceptLabel,
        policyTypeName: p.typeName,
        endDate: p.endDate,
        status: p.validity,
        statusName: p.validityName
      })),
      ...contracts.items
        .filter((c) => c.policies.status === WITHOUT_POLICY)
        .map((c) => ({ key: `c${c.ctrId}`, ...contractOf(c), status: WITHOUT_POLICY, statusName: 'Sin póliza' }))
    ];
  }, [contracts]);

  const filterFields = useMemo(
    () => [
      { key: 'status', type: 'dropdown', label: 'Estado', props: { options: STATUS_OPTIONS }, grid: { xs: 12, sm: 6 } },
      {
        key: 'contractTypeName',
        type: 'dropdown',
        label: 'Tipo de contrato',
        props: { options: optionsOf(rows, 'contractTypeName') },
        grid: { xs: 12, sm: 6 }
      },
      { key: 'contract', type: 'input', label: 'Nombre o número del contrato', props: { maxLength: 200 }, grid: { xs: 12 } },
      {
        key: 'conceptLabel',
        type: 'dropdown',
        label: 'Tipo de valor',
        props: { options: optionsOf(rows, 'conceptLabel') },
        grid: { xs: 12, sm: 6 }
      },
      {
        key: 'policyTypeName',
        type: 'dropdown',
        label: 'Tipo de póliza',
        props: { options: optionsOf(rows, 'policyTypeName') },
        grid: { xs: 12, sm: 6 }
      },
      { key: 'endDate', type: 'calendar-range', label: 'Fecha de vencimiento', grid: { xs: 12 } }
    ],
    [rows]
  );
  const filters = useListFilters(filterFields, () => setPage(0));
  const { status, contractTypeName, contract, conceptLabel, policyTypeName, endDateFrom, endDateTo } = filters.params;

  const filtered = rows.filter(
    (r) =>
      (!status || r.status === status) &&
      (!contractTypeName || r.contractTypeName === contractTypeName) &&
      (!contract || includesText(r.contractName, contract) || includesText(r.contractNumber, contract)) &&
      (!conceptLabel || r.conceptLabel === conceptLabel) &&
      (!policyTypeName || r.policyTypeName === policyTypeName) &&
      (!endDateFrom || (r.endDate && r.endDate >= endDateFrom)) &&
      (!endDateTo || (r.endDate && r.endDate <= endDateTo))
  );

  const showStatus = (value) => {
    filters.setValues({ status: value });
    setPage(0);
  };

  const counts = contracts.policyCounts;
  const cards = [
    {
      status: 'EXPIRED',
      label: 'Pólizas vencidas',
      value: counts.EXPIRED,
      hint: 'Su fecha de vencimiento ya pasó',
      icon: IconShieldX,
      tone: ACTION_TONES.danger
    },
    {
      status: 'EXPIRING',
      label: 'Próximas a vencer',
      value: counts.EXPIRING,
      hint: `Vencen en ${expiringDays} días o menos`,
      icon: IconClockExclamation,
      tone: EXPIRING_TONE
    },
    {
      status: 'ACTIVE',
      label: 'Pólizas vigentes',
      value: counts.ACTIVE,
      hint: 'Con vencimiento más adelante',
      icon: IconShieldCheck,
      tone: ACTION_TONES.success
    },
    {
      status: 'NO_DATE',
      label: 'Sin fecha de vigencia',
      value: counts.NO_DATE,
      hint: 'Sin fecha de vencimiento',
      icon: IconCalendarOff,
      tone: ACTION_TONES.info
    },
    {
      status: WITHOUT_POLICY,
      label: 'Contratos sin póliza',
      value: counts.withoutPolicy,
      hint: 'Sin ninguna póliza vigente',
      icon: IconFileOff,
      tone: ACTION_TONES.neutral
    }
  ].map(({ status: value, value: count, ...card }) => ({ ...card, value: String(count), onClick: () => showStatus(value) }));

  const columns = [
    { id: 'contractTypeName', label: 'Tipo de contrato' },
    { id: 'contractName', label: 'Nombre del contrato' },
    { id: 'contractNumber', label: 'Número de contrato' },
    { id: 'conceptLabel', label: 'Tipo de valor', render: (r) => r.conceptLabel ?? '—' },
    { id: 'policyTypeName', label: 'Tipo de póliza', render: (r) => r.policyTypeName ?? '—' },
    { id: 'endDate', label: 'Fecha de vencimiento', render: (r) => (r.endDate ? fDateOnly(r.endDate) : '—') },
    {
      id: 'status',
      label: 'Estado',
      render: (r) => <Chip size="small" label={r.statusName} color={POLICY_STATUS_COLORS[r.status]} variant="outlined" />
    }
  ];

  return (
    <Stack spacing={gridSpacing}>
      <DashboardCards items={cards} label="Pólizas de la obra" />
      <MainCard>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" flexWrap="wrap" useFlexGap>
            <Typography variant="subtitle1" component="h2">
              {filters.hasFilters ? `${filtered.length} de ${rows.length} filas` : `${rows.length} filas`}
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              {filters.active > 0 && (
                <Button size="small" color="inherit" startIcon={<IconTrash size={16} />} onClick={() => filters.setValues({})}>
                  Borrar filtros
                </Button>
              )}
              <FilterButton fields={filterFields} values={filters.values} setValues={filters.setValues} active={filters.active} />
            </Stack>
          </Stack>
          <DataTable
            columns={columns}
            rows={filtered.slice(page * rowsPerPage, (page + 1) * rowsPerPage)}
            total={filtered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={(_e, next) => setPage(next)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setPage(0);
            }}
            keyExtractor={(r) => r.key}
            cardTitleRender={(r) => `${r.contractNumber} · ${r.contractName}`}
            emptyMessage={rows.length === 0 ? 'La obra todavía no tiene contratos.' : 'Ninguna fila cumple los filtros.'}
            actions={(r) => [
              { label: 'Ver contrato', icon: <IconEye size={16} />, command: () => navigate(dashboardTo.contract(r.ctrId)), tone: 'info' }
            ]}
          />
        </Stack>
      </MainCard>
    </Stack>
  );
}

WorkPoliciesTab.propTypes = { data: PropTypes.object.isRequired };
