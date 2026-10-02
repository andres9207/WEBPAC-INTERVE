import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { IconEye } from '@tabler/icons-react';

import DataTable from 'ui-component/extended/DataTable';
import { Pending } from 'ui-component/extended/DetailBlocks';
import StatusChip from 'ui-component/extended/StatusChip';
import { CONTRACT_COLUMNS } from '../ContractsPage';
import { contractsApi } from 'api/requests/contractsApi';
import { useAuth } from 'contexts/AuthContext';
import { showError } from 'services/ToastService';
import { CONTRACT_STATE_COLORS } from 'utils/constants';

/**
 * Contratos de una obra, en su detalle (ADR-0011): el mismo listado de
 * contratos filtrado por la obra (`wrkId`), paginado en el servidor. Abrir un
 * contrato lleva a su expediente. Los contratos se crean desde Contratos.
 */
const COLUMNS = [
  ...CONTRACT_COLUMNS.filter((column) => column.id !== 'work'),
  { id: 'stageName', label: 'Etapa' },
  {
    id: 'state',
    label: 'Estado',
    render: (row) => <StatusChip staId={row.state} label={row.stateName} scope={null} colorMap={CONTRACT_STATE_COLORS} />
  }
];

export default function WorkContractsTab({ wrkId }) {
  const navigate = useNavigate();
  const { permissionsCatalog, hasPermission } = useAuth();
  const perms = permissionsCatalog.work?.contracts;
  const canView = perms?.view != null && hasPermission(perms.view);

  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!canView) return;
    setLoading(true);
    try {
      const { data } = await contractsApi.pagination({
        wrkId,
        first: page * rowsPerPage,
        rows: rowsPerPage,
        sortField: 'number',
        sortOrder: 1
      });
      setRows(data.results);
      setTotal(data.total);
    } catch (err) {
      showError(err.response?.data?.message || 'Error al cargar los contratos de la obra');
    } finally {
      setLoading(false);
    }
  }, [canView, wrkId, page, rowsPerPage]);

  useEffect(() => {
    load();
  }, [load]);

  if (!canView) return <Pending title="Sin acceso a contratos." text="Tu perfil no tiene el permiso de ver contratos." />;

  if (!loading && total === 0) {
    return (
      <Pending
        title="Todavía no hay contratos en esta obra."
        text="Los contratos se registran en Obras › Contratos, eligiendo esta obra. Una obra con contratos no se puede eliminar."
      />
    );
  }

  return (
    <Stack spacing={1}>
      <Typography variant="caption" color="text.secondary">
        El valor vigente de cada contrato es la suma de sus conceptos, calculada por el sistema.
      </Typography>
      <DataTable
        columns={COLUMNS}
        rows={rows}
        total={total}
        loading={loading}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, p) => setPage(p)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(+e.target.value);
          setPage(0);
        }}
        keyExtractor={(row) => row.ctrId}
        cardTitleRender={(row) => `${row.number} — ${row.name}`}
        actions={(row) => [
          { label: 'Ver contrato', icon: <IconEye size={16} />, command: () => navigate(`/work/contracts/${row.ctrId}`), tone: 'info' }
        ]}
        emptyMessage="Sin contratos."
      />
    </Stack>
  );
}

WorkContractsTab.propTypes = { wrkId: PropTypes.number.isRequired };
