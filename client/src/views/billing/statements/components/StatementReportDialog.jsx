import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import BaseDialog from 'ui-component/extended/BaseDialog';
import DataTable from 'ui-component/extended/DataTable';
import ExportButton from 'ui-component/extended/ExportButton';
import { Pending } from 'ui-component/extended/DetailBlocks';
import { exportStatementGroupAPI, getStatementGroupReportAPI } from 'api/requests/statementsApi';
import { showError } from 'services/ToastService';
import { fMoneyText } from 'utils/formatNumber';
import { fDateOnly } from 'utils/formatTime';
import { statementsPath } from 'utils/constants';

/**
 * Reporte del extracto escrito en las facturas (DEC-084; documento de alcance, punto 7): los totales
 * de sus facturas por menú (tipo de proveedor) y en total, el chequeo de
 * comprobantes de egreso (las aprobadas sin número de comprobante) y sus
 * facturas. Todas las cifras las calcula el servidor; las anuladas se listan
 * pero no suman. Debajo, las glosas levantadas en él y las que liberó una
 * factura suya, por campo de la factura y una por una; la negativa es una
 * nota crédito (DEC-085). Al total pagado solo suman las levantadas que
 * suman; las liberadas no restan, porque la factura que las libera ya cuenta.
 */

const MENU_COLUMNS = [
  { id: 'name', label: 'Menú' },
  { id: 'count', label: 'Facturas', align: 'right' },
  { id: 'value', label: 'Valor', align: 'right', render: (row) => fMoneyText(row.value) },
  { id: 'vat', label: 'IVA', align: 'right', render: (row) => fMoneyText(row.vat) },
  { id: 'total', label: 'Total', align: 'right', render: (row) => fMoneyText(row.total) }
];

// Filas de la tabla de facturas que no son una factura: el subtotal de cada
// proveedor y el total; sus sumas (sin las anuladas) las da el servidor.
const isTotal = (row) => row.kind === 'subtotal' || row.kind === 'total';
const isInvoice = (row) => !row.kind;
const onlyInvoice = (render) => (row) => (isInvoice(row) ? render(row) : '');

/**
 * Facturas por proveedor (`byProvider` del servidor), como el listado del
 * sistema que se migra: el proveedor en la primera columna, una sola vez para
 * todas sus facturas (en la primera), y su subtotal; al final, el total.
 */
const invoiceRowsOf = (report) => {
  const byId = new Map(report.invoices.map((invoice) => [invoice.invId, invoice]));
  return [
    ...report.byProvider.flatMap((group, index) => [
      // La primera factura lleva el proveedor y ocupa todas las filas del grupo (`groupSpan`); las demás, 0.
      ...group.invIds.map((invId, i) => ({
        ...byId.get(invId),
        groupLabel: group.providerName,
        groupSpan: i === 0 ? group.invIds.length : 0
      })),
      { kind: 'subtotal', invId: `subtotal-${index}`, label: 'Subtotal', ...group.subtotal }
    ]),
    { kind: 'total', invId: 'total', label: 'Total', amounts: report.amountTotals, glossesValue: report.invoiceGlossesTotal }
  ];
};

const amountCell = (row, amount) => {
  if (amount == null) return '';
  return isTotal(row) ? <strong>{fMoneyText(amount)}</strong> : fMoneyText(amount);
};

/**
 * Columnas de la tabla de facturas: su identificación, un importe por columna
 * que da el servidor (`amountColumns`: todos los que alguna factura del
 * extracto tiene) y el estado.
 */
const invoiceColumnsOf = (amountColumns) => [
  {
    id: 'providerName',
    label: 'Proveedor',
    // Una sola celda para todas las facturas del proveedor, como en el Excel (DEC-070).
    rowSpan: (row) => (isInvoice(row) ? row.groupSpan : 1),
    render: onlyInvoice((row) =>
      row.groupLabel ? (
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {row.groupLabel}
        </Typography>
      ) : (
        ''
      )
    )
  },
  {
    id: 'number',
    label: 'Factura',
    render: (row) =>
      isTotal(row) ? (
        <strong>{row.label}</strong>
      ) : (
        <Link component={RouterLink} to={statementsPath(row.invId)}>
          {row.number}
        </Link>
      )
  },
  { id: 'menuName', label: 'Menú', render: onlyInvoice((row) => row.menuName) },
  { id: 'contractNumber', label: 'Contrato', render: onlyInvoice((row) => row.contractNumber ?? '—') },
  { id: 'date', label: 'Fecha', render: onlyInvoice((row) => fDateOnly(row.date)) },
  { id: 'voucherNumber', label: 'Comprobante', render: onlyInvoice((row) => row.voucherNumber ?? '—') },
  ...amountColumns.map(({ key, label }) => ({
    id: `amount-${key}`,
    label,
    align: 'right',
    render: (row) => amountCell(row, row.amounts?.[key])
  })),
  // Glosas levantadas en el extracto sobre la factura (DEC-085); el detalle, abajo.
  { id: 'glossesValue', label: 'Glosas', align: 'right', render: (row) => amountCell(row, row.glossesValue) },
  { id: 'stateName', label: 'Estado', render: onlyInvoice((row) => row.stateName) }
];

const GLOSS_COLUMNS = [
  {
    id: 'invoiceNumber',
    label: 'Factura',
    render: (row) => (
      <Link component={RouterLink} to={statementsPath(row.invId)}>
        {row.invoiceNumber}
      </Link>
    )
  },
  { id: 'providerName', label: 'Proveedor' },
  { id: 'fieldName', label: 'Campos' },
  { id: 'creditNote', label: 'Tipo', render: (row) => (row.creditNote ? 'Nota crédito' : 'Glosa') },
  { id: 'description', label: 'Descripción' },
  { id: 'value', label: 'Valor', align: 'right', render: (row) => fMoneyText(row.value) },
  { id: 'affectsTotal', label: 'Suma al total', render: (row) => (row.affectsTotal ? 'Sí' : 'No') },
  { id: 'statement', label: 'Levantada en', render: (row) => row.statement ?? '—' },
  { id: 'raisedDate', label: 'Levantada el', render: (row) => fDateOnly(row.raisedDate) },
  { id: 'createdByName', label: 'Levantada por', render: (row) => row.createdByName ?? '—' },
  {
    id: 'releaseInvoiceNumber',
    label: 'Liberada con',
    render: (row) =>
      row.releaseInvId ? (
        <Link component={RouterLink} to={statementsPath(row.releaseInvId)}>
          {row.releaseInvoiceNumber}
        </Link>
      ) : (
        'Abierta'
      )
  },
  { id: 'releaseStatement', label: 'Liberada en', render: (row) => row.releaseStatement ?? '—' },
  { id: 'releaseDate', label: 'Liberada el', render: (row) => (row.releaseDate ? fDateOnly(row.releaseDate) : '—') },
  { id: 'releasedByName', label: 'Liberada por', render: (row) => row.releasedByName ?? '—' }
];

const GLOSS_FIELD_COLUMNS = [
  { id: 'name', label: 'Campo' },
  { id: 'raised', label: 'Levantadas', align: 'right', render: (row) => fMoneyText(row.raised) },
  { id: 'released', label: 'Liberadas', align: 'right', render: (row) => fMoneyText(row.released) },
  { id: 'net', label: 'Suma al total', align: 'right', render: (row) => fMoneyText(row.net) }
];

/** Glosas del extracto (DEC-085): las que se levantaron en él o las que liberó una factura suya. */
function GlossesSection({ title, rows, total }) {
  if (rows.length === 0) return null;
  return (
    <>
      <Typography variant="h5">
        {title} · {fMoneyText(total)}
      </Typography>
      <DataTable columns={GLOSS_COLUMNS} rows={rows} keyExtractor={(row) => row.iglId} />
    </>
  );
}

GlossesSection.propTypes = { title: PropTypes.string.isRequired, rows: PropTypes.array.isRequired, total: PropTypes.string };

export default function StatementReportDialog({ statement, canExport, reloadKey = 0, onClose }) {
  const [report, setReport] = useState(null);

  useEffect(() => {
    if (!statement) return undefined;
    let cancelled = false;
    setReport(null);
    getStatementGroupReportAPI(statement)
      .then(({ data }) => !cancelled && setReport(data))
      .catch((err) => {
        showError(err.response?.data?.message || 'Error al cargar el reporte del extracto');
        onClose();
      });
    return () => {
      cancelled = true;
    };
    // `reloadKey`: la factura abierta encima cambió (aprobar, anular, glosas).
  }, [statement, reloadKey, onClose]);

  const totals = report?.totals;

  return (
    <BaseDialog
      open={Boolean(statement)}
      onClose={onClose}
      title={statement ? `Extracto ${statement.number}` : ''}
      maxWidth="lg"
      fullScreenOnMobile
      loading={!report}
      actions={
        <>
          {canExport && statement && (
            <ExportButton request={(format) => exportStatementGroupAPI(statement, format)} fileName={`extracto-${statement.number}`} />
          )}
          <Button onClick={onClose}>Cerrar</Button>
        </>
      }
    >
      {report && (
        <Stack spacing={2}>
          <Typography variant="body2" color="text.secondary">
            {[
              `${report.statement.workCode} — ${report.statement.workName}`,
              report.statement.firstDate === report.statement.lastDate
                ? fDateOnly(report.statement.firstDate)
                : `Facturas del ${fDateOnly(report.statement.firstDate)} al ${fDateOnly(report.statement.lastDate)}`
            ]
              .filter(Boolean)
              .join(' · ')}
          </Typography>
          {report.withoutVoucher.length > 0 && (
            <Alert severity="warning">
              Aprobadas sin comprobante de egreso: {report.withoutVoucher.map((i) => `${i.number} (${i.providerName})`).join(', ')}.
            </Alert>
          )}
          {report.cancelled > 0 && (
            <Alert severity="info">
              {report.cancelled === 1 ? 'Una factura anulada se lista' : `${report.cancelled} facturas anuladas se listan`} pero no suma.
            </Alert>
          )}
          {report.invoices.length === 0 ? (
            <Pending title="El extracto no tiene facturas." text="Se asigna un extracto a una factura desde su formulario." />
          ) : (
            <>
              <Typography variant="h5">Totales por menú</Typography>
              <DataTable columns={MENU_COLUMNS} rows={report.byMenu} keyExtractor={(row) => row.pvtId} />
              <Typography variant="subtitle1" sx={{ textAlign: 'right' }}>
                Total: {totals.count} {totals.count === 1 ? 'factura' : 'facturas'} · Valor {fMoneyText(totals.value)} · IVA{' '}
                {fMoneyText(totals.vat)} · Total {fMoneyText(totals.total)}
              </Typography>
              <Typography variant="h5">Facturas</Typography>
              <DataTable columns={invoiceColumnsOf(report.amountColumns)} rows={invoiceRowsOf(report)} keyExtractor={(row) => row.invId} />
            </>
          )}
          {report.glosses.byField.length > 0 && (
            <>
              <Typography variant="h5">Glosas por campo · {fMoneyText(totals.glossesNet)}</Typography>
              <DataTable columns={GLOSS_FIELD_COLUMNS} rows={report.glosses.byField} keyExtractor={(row) => row.field} />
            </>
          )}
          <GlossesSection title="Glosas levantadas" rows={report.glosses.raised} total={report.glosses.raisedValue} />
          <GlossesSection title="Glosas liberadas" rows={report.glosses.released} total={report.glosses.releasedValue} />
          {/* Total pagado (DEC-085): el de las facturas más las glosas levantadas en el extracto que suman al total. */}
          <Typography variant="h5" sx={{ textAlign: 'right' }}>
            Total pagado {fMoneyText(totals.paidTotal)}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'right' }}>
            Facturas {fMoneyText(totals.total)} + glosas que suman al total {fMoneyText(totals.glossesNet)}
          </Typography>
        </Stack>
      )}
    </BaseDialog>
  );
}

StatementReportDialog.propTypes = {
  /** Fila del listado: `{ wrkId, number }`; null, cerrado. */
  statement: PropTypes.object,
  canExport: PropTypes.bool,
  reloadKey: PropTypes.number,
  onClose: PropTypes.func.isRequired
};
