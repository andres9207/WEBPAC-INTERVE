import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';

import TableActions from './TableActions';
import ConfirmDialog from './ConfirmDialog';
import ActionButton, { toneOf } from './ActionButton';

export default function DataTable({
  columns,
  rows,
  total = 0,
  loading = false,
  page = 0,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [5, 10, 25, 50],
  sortField,
  sortOrder = 1,
  onSort,
  keyExtractor = (row) => row?.id ?? row?.invId,
  emptyMessage = 'Sin resultados',
  emptyAction,
  loadingMessage = 'Cargando…',
  cardTitleRender,
  actions,
  footerRender,
  selectedRows,
  onSelectionChange
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [confirmItem, setConfirmItem] = useState(null);

  const isSelectionEnabled = Array.isArray(selectedRows) && onSelectionChange;

  const selectedKeys = useMemo(
    () => (isSelectionEnabled ? new Set(selectedRows.map((r) => keyExtractor(r))) : new Set()),
    [selectedRows, isSelectionEnabled, keyExtractor]
  );

  const allSelected = isSelectionEnabled && rows.length > 0 && rows.every((row) => selectedKeys.has(keyExtractor(row)));
  const someSelected = isSelectionEnabled && rows.some((row) => selectedKeys.has(keyExtractor(row)));

  const handleToggleAll = () => {
    if (allSelected) {
      const pageKeys = new Set(rows.map((r) => keyExtractor(r)));
      onSelectionChange(selectedRows.filter((r) => !pageKeys.has(keyExtractor(r))));
    } else {
      const existing = new Set(selectedRows.map((r) => keyExtractor(r)));
      const toAdd = rows.filter((r) => !existing.has(keyExtractor(r)));
      onSelectionChange([...selectedRows, ...toAdd]);
    }
  };

  const handleToggleRow = (row) => {
    const key = keyExtractor(row);
    if (selectedKeys.has(key)) {
      onSelectionChange(selectedRows.filter((r) => keyExtractor(r) !== key));
    } else {
      onSelectionChange([...selectedRows, row]);
    }
  };

  // Con confirmación, la acción corre desde ConfirmDialog, que espera a que termine.
  const runAction = (item) => {
    if (item.confirm) setConfirmItem(item);
    else item.command?.();
  };

  const renderInlineActions = (row) => actions(row).map((item, i) => <ActionButton key={i} item={item} onClick={runAction} size="small" />);

  const allColumns = useMemo(() => {
    if (!actions) return columns;
    return [
      ...columns,
      {
        id: '__actions__',
        label: 'Acciones',
        align: 'center',
        cardFooter: true,
        render: (row) => {
          const actionItems = actions(row);
          return actionItems.length < 3 ? (
            <Stack direction="row" spacing={0.5} justifyContent="center">
              {renderInlineActions(row)}
            </Stack>
          ) : (
            <TableActions items={actionItems} />
          );
        }
      }
    ];
  }, [columns, actions]);

  const visibleColumns = allColumns.filter((col) => (isMobile ? !col.hideInCard : !col.hideInTable));

  const getCellValue = (row, col, index) => {
    if (isMobile) {
      return col.cardRender?.(row, index) ?? col.render?.(row, index) ?? row[col.id] ?? '-';
    }
    return col.tableRender?.(row, index) ?? col.render?.(row, index) ?? row[col.id] ?? '-';
  };

  const renderPagination = () =>
    total > 0 && (
      <TablePagination
        component="div"
        count={total}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={rowsPerPageOptions}
        labelRowsPerPage="Filas:"
        labelDisplayedRows={({ from, to, count }) => `${from}–${to} de ${count}`}
      />
    );

  // Al recargar, las filas siguen visibles (atenuadas) bajo una barra de
  // progreso: la pantalla no salta. El texto de carga solo aparece la primera vez.
  const firstLoad = loading && rows.length === 0;
  const reloading = loading && rows.length > 0;

  const renderMessage = () => (
    <Stack spacing={1.5} alignItems="center" sx={{ py: 3 }}>
      <Typography align="center" color="text.secondary">
        {firstLoad ? loadingMessage : emptyMessage}
      </Typography>
      {!firstLoad && emptyAction}
    </Stack>
  );

  const confirmDialog = (
    <ConfirmDialog
      open={!!confirmItem}
      onClose={() => setConfirmItem(null)}
      onConfirm={() => confirmItem?.command?.()}
      title={confirmItem?.confirmTitle || 'Confirmar'}
      message={confirmItem?.confirm || '¿Está seguro de realizar esta acción?'}
      confirmLabel={confirmItem?.confirmLabel || 'Eliminar'}
      confirmColor={confirmItem?.confirmColor || 'error'}
    />
  );

  if (isMobile) {
    const cardFields = visibleColumns.filter((col) => !col.cardFooter);
    const cardActionsList = visibleColumns.filter((col) => col.cardFooter);

    return (
      <>
        {reloading && <LinearProgress sx={{ mb: 1 }} aria-label={loadingMessage} />}
        <Stack spacing={1.5} sx={{ opacity: reloading ? 0.6 : 1, transition: 'opacity 150ms' }} aria-busy={loading}>
          {rows.length === 0 ? (
            <Card variant="outlined">
              <CardContent>{renderMessage()}</CardContent>
            </Card>
          ) : (
            rows.map((row, index) => (
              <Card key={keyExtractor(row)} variant="outlined">
                <CardContent sx={{ '&:last-child': { pb: cardActionsList.length ? 1.5 : 2 } }}>
                  {cardTitleRender && (
                    <>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {cardTitleRender(row)}
                      </Typography>
                      <Divider sx={{ mb: 1.5, mt: 0.5 }} />
                    </>
                  )}
                  <Stack spacing={1}>
                    {cardFields.map((col) => (
                      <Box key={col.id} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap', fontWeight: 500 }}>
                          {col.label}:
                        </Typography>
                        <Typography variant="body2" component="div" sx={{ flex: 1 }}>
                          {getCellValue(row, col, index)}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
                {cardActionsList.length > 0 && (
                  <>
                    <Divider />
                    <CardActions sx={{ justifyContent: 'center', flexWrap: 'wrap', gap: 1, py: 1 }}>
                      {cardActionsList.map((col) => {
                        if (col.id === '__actions__' && actions) {
                          const actionItems = actions(row);
                          // Con más de tres, solo íconos (con nombre accesible); si no, ícono y texto.
                          if (actionItems.length > 3) {
                            return actionItems.map((item, i) => <ActionButton key={i} item={item} onClick={runAction} size="large" />);
                          }
                          return actionItems.map((item, i) => {
                            const tone = toneOf(item);
                            return (
                              <Button
                                key={i}
                                startIcon={item.icon}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  runAction(item);
                                }}
                                disabled={item.disabled}
                                sx={{
                                  minHeight: 44,
                                  bgcolor: tone.bg,
                                  color: tone.fg,
                                  '&:hover': { bgcolor: tone.hoverBg, color: tone.hoverFg }
                                }}
                              >
                                {item.label}
                              </Button>
                            );
                          });
                        }
                        return <Box key={col.id}>{getCellValue(row, col, index)}</Box>;
                      })}
                    </CardActions>
                  </>
                )}
              </Card>
            ))
          )}
          {footerRender && !loading && rows.length > 0 && (
            <Card variant="outlined" sx={{ bgcolor: 'grey.50' }}>
              <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 } }}>{footerRender(rows, visibleColumns)}</CardContent>
            </Card>
          )}
        </Stack>
        {renderPagination()}
        {confirmDialog}
      </>
    );
  }

  return (
    <>
      <TableContainer component={Paper} variant="outlined" sx={{ overflowX: 'auto', position: 'relative' }} aria-busy={loading}>
        {reloading && <LinearProgress sx={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1 }} aria-label={loadingMessage} />}
        <Table size="small">
          <TableHead>
            <TableRow>
              {isSelectionEnabled && (
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={someSelected && !allSelected}
                    checked={allSelected}
                    onChange={handleToggleAll}
                    size="small"
                    slotProps={{ input: { 'aria-label': 'Seleccionar todas las filas de la página' } }}
                  />
                </TableCell>
              )}
              {visibleColumns.map((col) => (
                <TableCell
                  key={col.id}
                  align={col.align || 'left'}
                  sx={{ whiteSpace: 'nowrap', ...(col.width ? { width: col.width } : {}) }}
                  sortDirection={col.sortable && sortField === col.id ? (sortOrder === 1 ? 'asc' : 'desc') : false}
                >
                  {col.sortable ? (
                    <TableSortLabel
                      active={sortField === col.id}
                      direction={sortOrder === 1 ? 'asc' : 'desc'}
                      onClick={() => onSort?.(col.id)}
                    >
                      {col.label}
                    </TableSortLabel>
                  ) : (
                    col.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{ opacity: reloading ? 0.6 : 1, transition: 'opacity 150ms' }}>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={(isSelectionEnabled ? 1 : 0) + visibleColumns.length} align="center">
                  {renderMessage()}
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, index) => (
                <TableRow key={keyExtractor(row)} hover selected={isSelectionEnabled && selectedKeys.has(keyExtractor(row))}>
                  {isSelectionEnabled && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedKeys.has(keyExtractor(row))}
                        onChange={() => handleToggleRow(row)}
                        size="small"
                        slotProps={{ input: { 'aria-label': 'Seleccionar fila' } }}
                      />
                    </TableCell>
                  )}
                  {visibleColumns.map((col) => (
                    <TableCell key={col.id} align={col.align || 'left'}>
                      {getCellValue(row, col, index)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
          {footerRender && !loading && rows.length > 0 && <tfoot>{footerRender(rows, visibleColumns)}</tfoot>}
        </Table>
      </TableContainer>
      {renderPagination()}
      {confirmDialog}
    </>
  );
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      align: PropTypes.oneOf(['left', 'center', 'right']),
      sortable: PropTypes.bool,
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      hideInCard: PropTypes.bool,
      hideInTable: PropTypes.bool,
      cardFooter: PropTypes.bool,
      render: PropTypes.func,
      cardRender: PropTypes.func,
      tableRender: PropTypes.func
    })
  ).isRequired,
  rows: PropTypes.array.isRequired,
  total: PropTypes.number,
  loading: PropTypes.bool,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  sortField: PropTypes.string,
  sortOrder: PropTypes.oneOf([1, -1]),
  onSort: PropTypes.func,
  keyExtractor: PropTypes.func,
  emptyMessage: PropTypes.string,
  /** Acción bajo el mensaje de tabla vacía (p. ej. el botón de crear). */
  emptyAction: PropTypes.node,
  loadingMessage: PropTypes.string,
  cardTitleRender: PropTypes.func,
  actions: PropTypes.func,
  footerRender: PropTypes.func,
  selectedRows: PropTypes.array,
  onSelectionChange: PropTypes.func
};
