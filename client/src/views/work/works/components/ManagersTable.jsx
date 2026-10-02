import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { IconEdit, IconTrash } from '@tabler/icons-react';

import ActionButton from 'ui-component/extended/ActionButton';
import StatusChip from 'ui-component/extended/StatusChip';
import { MANAGER_ROLE_OPTIONS } from './ManagerDialog';
import { STATUS } from 'utils/constants';

const roleLabel = (role) => MANAGER_ROLE_OPTIONS.find((o) => o.value === role)?.label ?? role;

/** Responsables de la obra como tabla; agregar y editar abren ManagerDialog. */
export default function ManagersTable({ rows, canEdit, canRemove, onEdit, onRemove }) {
  return (
    <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Usuario</TableCell>
            <TableCell>Rol</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell align="center" sx={{ width: 120 }}>
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                  Sin responsables. Agrega al menos uno activo.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow key={row.key}>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.dark' }}>
                    {row.name}
                  </Typography>
                  {row.userStaId !== undefined && row.userStaId !== 1 && (
                    <Typography variant="caption" color="text.secondary">
                      Usuario inactivo
                    </Typography>
                  )}
                </TableCell>
                <TableCell>{roleLabel(row.role)}</TableCell>
                <TableCell>
                  <StatusChip staId={row.staId} label={row.staId === STATUS.ACTIVE ? 'Activo' : 'Inactivo'} />
                </TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={0.5} justifyContent="center">
                    {canEdit && (
                      <ActionButton
                        item={{ label: `Editar responsable ${row.name}`, icon: <IconEdit size={16} />, tone: 'edit' }}
                        onClick={() => onEdit(row)}
                        size="small"
                      />
                    )}
                    {canRemove && (
                      <ActionButton
                        item={{ label: `Quitar responsable ${row.name}`, icon: <IconTrash size={16} />, tone: 'danger' }}
                        onClick={() => onRemove(row)}
                        size="small"
                      />
                    )}
                    {!canEdit && !canRemove && <Box component="span">—</Box>}
                  </Stack>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

ManagersTable.propTypes = {
  rows: PropTypes.array.isRequired,
  canEdit: PropTypes.bool,
  canRemove: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};
