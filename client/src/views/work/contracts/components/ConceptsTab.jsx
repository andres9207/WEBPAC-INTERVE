import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { IconEdit, IconFileCheck, IconPlus } from '@tabler/icons-react';

import DataTable from 'ui-component/extended/DataTable';
import ConceptDialog from './ConceptDialog';
import { useAuth } from 'contexts/AuthContext';
import { fMoneyText } from 'utils/formatNumber';
import { fDateOnly } from 'utils/formatTime';
import { fTerm } from 'utils/constants';

/**
 * Valor del contrato (PRO-FE-07): sus conceptos en orden cronológico, cada
 * uno con su valor y el valor vigente acumulado hasta él. Todos los importes
 * los calcula el servidor; aquí solo se formatean.
 *
 * Registrar otrosí, registrar el de liquidación y modificar un concepto se
 * ofrecen si el permiso y el estado del contrato lo admiten (`allowedActions`,
 * que manda el servidor). Ocultar es experiencia de uso: el servidor decide.
 */

const pct = (value) => (value === null || value === undefined ? '—' : `${String(Number(value)).replace('.', ',')} %`);
const money = (value) => <span style={{ fontVariantNumeric: 'tabular-nums' }}>{fMoneyText(value)}</span>;

export default function ConceptsTab({ contract, onChanged }) {
  const { permissionsCatalog, hasPermission } = useAuth();
  const canDo = (perId) => perId != null && hasPermission(perId);
  const perms = permissionsCatalog.work?.contracts;
  const allows = (action) => contract.allowedActions.includes(action);

  const [dialog, setDialog] = useState(null);

  const canAmend = canDo(perms?.createAmendment) && allows('createAmendment');
  const canLiquidate = canDo(perms?.createLiquidation) && allows('createLiquidation') && !contract.hasLiquidation;
  const canEditConcept = (row) =>
    canDo(perms?.editConcept) && (row.type === 'LIQUIDATION' ? allows('editLiquidationConcept') : allows('editConcept'));

  const lastConceptDate = contract.concepts.at(-1)?.startDate ?? contract.startDate;

  const columns = [
    {
      id: 'act',
      label: 'Acto',
      render: (row) => (
        <>
          <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.dark' }}>
            {row.typeName}
            {row.number ? ` N.º ${row.number}` : ''}
          </Typography>
          {row.description && (
            <Typography variant="caption" color="text.secondary">
              {row.description}
            </Typography>
          )}
        </>
      ),
      cardRender: (row) => `${row.typeName}${row.number ? ` N.º ${row.number}` : ''}`
    },
    { id: 'startDate', label: 'Inicio', render: (row) => fDateOnly(row.startDate) },
    { id: 'directCost', label: 'Costo directo', align: 'right', render: (row) => money(row.directCost) },
    {
      id: 'aiu',
      label: 'A · I · U',
      render: (row) => `${pct(row.adminPct)} · ${pct(row.contingencyPct)} · ${pct(row.profitPct)}`
    },
    { id: 'vat', label: 'IVA', align: 'right', render: (row) => money(row.vat) },
    { id: 'value', label: 'Valor', align: 'right', render: (row) => <strong>{money(row.value)}</strong> },
    { id: 'cumulativeValue', label: 'Valor vigente acumulado', align: 'right', render: (row) => money(row.cumulativeValue) },
    {
      id: 'advance',
      label: 'Anticipo',
      align: 'right',
      render: (row) => (
        <>
          {money(row.advance)} ({pct(row.advancePct)})
        </>
      )
    },
    { id: 'extension', label: 'Prórroga', render: (row) => (row.extension ? fTerm(row.extension, contract.termUnit) : '—') }
  ];

  const actions = (row) =>
    canEditConcept(row)
      ? [{ label: 'Modificar', icon: <IconEdit size={16} />, command: () => setDialog({ mode: 'edit', concept: row }), tone: 'edit' }]
      : [];

  const saved = () => {
    setDialog(null);
    onChanged();
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
          Valor vigente: <strong>{fMoneyText(contract.currentValue)}</strong> · suma de los conceptos, calculada por el sistema.
        </Typography>
        {canLiquidate && (
          <Button
            variant="outlined"
            color="warning"
            startIcon={<IconFileCheck size={16} />}
            onClick={() => setDialog({ mode: 'liquidation' })}
          >
            Otrosí de liquidación
          </Button>
        )}
        {canAmend && (
          <Button variant="contained" color="secondary" startIcon={<IconPlus size={16} />} onClick={() => setDialog({ mode: 'amendment' })}>
            Registrar otrosí
          </Button>
        )}
      </Stack>

      <DataTable
        columns={columns}
        rows={contract.concepts}
        keyExtractor={(row) => row.ccpId}
        cardTitleRender={(row) => `${row.typeName}${row.number ? ` N.º ${row.number}` : ''}`}
        actions={actions}
        emptyMessage="El contrato no tiene conceptos."
      />

      <ConceptDialog
        open={Boolean(dialog)}
        mode={dialog?.mode}
        contract={{ ctrId: contract.ctrId, number: contract.number, termUnit: contract.termUnit, lastConceptDate }}
        concept={dialog?.concept}
        onClose={() => setDialog(null)}
        onSaved={saved}
      />
    </Stack>
  );
}

ConceptsTab.propTypes = {
  /** Detalle del contrato (get_contract). */
  contract: PropTypes.object.isRequired,
  /** Recarga el detalle (valor, fecha fin, estado). */
  onChanged: PropTypes.func.isRequired
};
