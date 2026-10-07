import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { IconBan, IconEdit, IconHistory, IconPlus } from '@tabler/icons-react';

import BaseDialog from 'ui-component/extended/BaseDialog';
import DataTable from 'ui-component/extended/DataTable';
import { Pending } from 'ui-component/extended/DetailBlocks';
import CancelPolicyDialog from './CancelPolicyDialog';
import PolicyDialog from './PolicyDialog';
import { contractPoliciesApi } from 'api/requests/contractsApi';
import { useAuth } from 'contexts/AuthContext';
import { showError } from 'services/ToastService';
import { fMoneyText, fPercentText } from 'utils/formatNumber';
import { fDateOnly, fDateTime } from 'utils/formatTime';

/**
 * Pólizas del contrato (PRO-FE-09; ADR-0018, DEC-050). Cada fila es una
 * póliza con su versión más reciente: el concepto amparado, la base con que
 * se emitió y el valor asegurado, que calcula el servidor (base del concepto ×
 * porcentaje). Arriba, los conceptos sin póliza vigente: un hallazgo, no un
 * error. Modificar emite una versión nueva; el historial de versiones se
 * consulta desde cada fila.
 *
 * Registrar, modificar y anular se ofrecen si el permiso y el estado del
 * contrato lo admiten (`allowedActions`, ADR-0017): en liquidación solo se
 * renueva y se ampara el otrosí de liquidación. Ocultar es experiencia de
 * uso: el servidor decide.
 */

const VALIDITY_COLORS = { NO_DATE: 'default', ACTIVE: 'success', EXPIRING: 'warning', EXPIRED: 'error' };

const money = (value) => <span style={{ fontVariantNumeric: 'tabular-nums' }}>{fMoneyText(value)}</span>;

const validityText = (row) => {
  if (!row.startDate && !row.endDate) return 'Sin fechas';
  return `${row.startDate ? fDateOnly(row.startDate) : '…'} – ${row.endDate ? fDateOnly(row.endDate) : '…'}`;
};

const VERSION_COLUMNS = [
  { id: 'version', label: 'Versión', render: (row) => `${row.version}${row.isCurrent ? ' (vigente)' : ''}` },
  { id: 'typeName', label: 'Tipo · aseguradora', render: (row) => `${row.typeName} · ${row.insurerName}` },
  { id: 'number', label: 'Número' },
  { id: 'base', label: 'Base', render: (row) => `${fPercentText(row.percentage)} de ${row.baseName}` },
  { id: 'insuredValue', label: 'Valor asegurado', align: 'right', render: (row) => money(row.insuredValue) },
  { id: 'validity', label: 'Vigencia', render: validityText },
  {
    id: 'closedAt',
    label: 'Emitida · cerrada',
    render: (row) => (
      <>
        <Typography variant="caption" sx={{ display: 'block' }}>
          {fDateTime(row.createdAt)} por {row.createdByName ?? '—'}
        </Typography>
        {row.closedAt && (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
            {row.cancelReasonName ? `Anulada: ${row.cancelReasonName}. ${row.cancelObservation}` : 'Cerrada'} · {fDateTime(row.closedAt)}{' '}
            por {row.closedByName ?? '—'}
          </Typography>
        )}
      </>
    )
  }
];

export default function PoliciesTab({ contract, onChanged }) {
  const { permissionsCatalog, hasPermission } = useAuth();
  const canDo = (perId) => perId != null && hasPermission(perId);
  const perms = permissionsCatalog.work?.policies;
  const allows = (action) => contract.allowedActions.includes(action);

  const [data, setData] = useState(null);
  const [dialog, setDialog] = useState(null);

  const load = useCallback(
    () =>
      contractPoliciesApi
        .list(contract.ctrId)
        .then(({ data: result }) => setData(result))
        .catch((err) => showError(err.response?.data?.message || 'Error al cargar las pólizas')),
    [contract.ctrId]
  );

  useEffect(() => {
    load();
  }, [load]);

  const saved = () => {
    setDialog(null);
    load();
    onChanged();
  };

  if (!data) return <Typography color="text.secondary">Cargando pólizas…</Typography>;

  // En liquidación solo se ampara el otrosí de liquidación.
  const insurable = allows('createPolicy')
    ? data.concepts
    : allows('createLiquidationPolicy')
      ? data.concepts.filter((c) => c.type === 'LIQUIDATION')
      : [];
  const canCreate = canDo(perms?.create) && insurable.length > 0;
  const columns = [
    {
      id: 'concept',
      label: 'Concepto amparado',
      render: (row) => (
        <>
          <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.dark' }}>
            {row.conceptLabel}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Valor del concepto {fMoneyText(row.conceptValue)}
          </Typography>
        </>
      ),
      cardRender: (row) => row.conceptLabel
    },
    {
      id: 'type',
      label: 'Tipo · aseguradora',
      render: (row) => (
        <>
          <Typography variant="body2">{row.typeName}</Typography>
          <Typography variant="caption" color="text.secondary">
            {row.insurerName} · N.º {row.number}
            {row.version > 1 ? ` · versión ${row.version}` : ''}
          </Typography>
        </>
      ),
      cardRender: (row) => `${row.typeName} · ${row.insurerName}`
    },
    {
      id: 'insuredValue',
      label: 'Valor asegurado',
      align: 'right',
      render: (row) => (
        <>
          <strong>{money(row.insuredValue)}</strong>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
            {fPercentText(row.percentage)} de {row.baseName} ({fMoneyText(row.baseValue)})
          </Typography>
        </>
      )
    },
    { id: 'validityDates', label: 'Vigencia', render: validityText },
    {
      id: 'status',
      label: 'Estado',
      render: (row) =>
        row.status === 'CANCELLED' ? (
          <Chip size="small" color="error" variant="outlined" label="Anulada" />
        ) : (
          <Chip size="small" color={VALIDITY_COLORS[row.validity]} label={row.validityName} />
        )
    }
  ];

  const actions = (row) => {
    const current = row.status === 'CURRENT';
    return [
      ...(current && allows('renewPolicy') && canDo(perms?.edit)
        ? [{ label: 'Modificar', icon: <IconEdit size={16} />, command: () => setDialog({ mode: 'version', policy: row }), tone: 'edit' }]
        : []),
      ...(row.versions.length > 1 || !current
        ? [
            {
              label: 'Historial',
              icon: <IconHistory size={16} />,
              command: () => setDialog({ mode: 'history', policy: row }),
              tone: 'info'
            }
          ]
        : []),
      ...(current && allows('cancelPolicy') && canDo(perms?.cancel)
        ? [{ label: 'Anular', icon: <IconBan size={16} />, command: () => setDialog({ mode: 'cancel', policy: row }), tone: 'danger' }]
        : [])
    ];
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
          El valor asegurado lo calcula el sistema: porcentaje de la póliza sobre la base de su tipo, evaluada en el concepto amparado. «A
          vencer»: dentro de {data.expiringDays} días.
        </Typography>
        {canCreate && (
          <Button variant="contained" color="secondary" startIcon={<IconPlus size={16} />} onClick={() => setDialog({ mode: 'create' })}>
            Registrar póliza
          </Button>
        )}
      </Stack>

      {data.uncoveredConcepts.length > 0 && (
        <Alert severity="warning">
          Sin póliza vigente: {data.uncoveredConcepts.map((c) => `${c.label} (${fMoneyText(c.value)})`).join(', ')}.
        </Alert>
      )}

      {data.policies.length === 0 ? (
        <Pending
          title="El contrato no tiene pólizas."
          text="Cada póliza ampara un concepto: el valor inicial, un otrosí o el otrosí de liquidación."
        />
      ) : (
        <DataTable
          columns={columns}
          rows={data.policies}
          keyExtractor={(row) => row.rootId}
          cardTitleRender={(row) => `${row.conceptLabel} · ${row.typeName}`}
          actions={actions}
          emptyMessage="El contrato no tiene pólizas."
        />
      )}

      <PolicyDialog
        open={dialog?.mode === 'create' || dialog?.mode === 'version'}
        contract={{ ctrId: contract.ctrId, number: contract.number }}
        concepts={dialog?.mode === 'version' ? data.concepts : insurable}
        policy={dialog?.mode === 'version' ? dialog.policy : null}
        onClose={() => setDialog(null)}
        onSaved={saved}
      />
      <CancelPolicyDialog open={dialog?.mode === 'cancel'} policy={dialog?.policy} onClose={() => setDialog(null)} onSaved={saved} />
      <BaseDialog
        open={dialog?.mode === 'history'}
        onClose={() => setDialog(null)}
        title={`Versiones · póliza ${dialog?.policy?.number ?? ''}`}
        maxWidth="lg"
        fullScreenOnMobile
        actions={<Button onClick={() => setDialog(null)}>Cerrar</Button>}
      >
        <DataTable
          columns={VERSION_COLUMNS}
          rows={dialog?.policy?.versions ?? []}
          keyExtractor={(row) => row.polId}
          cardTitleRender={(row) => `Versión ${row.version}`}
          emptyMessage="Sin versiones."
        />
      </BaseDialog>
    </Stack>
  );
}

PoliciesTab.propTypes = {
  /** Detalle del contrato (get_contract): `ctrId`, `number`, `allowedActions`. */
  contract: PropTypes.object.isRequired,
  /** Recarga el detalle (conteo de la pestaña). */
  onChanged: PropTypes.func.isRequired
};
