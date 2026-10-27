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
import { invoicePath } from 'utils/constants';

/**
 * Reporte del extracto escrito en las facturas (DEC-084; documento de alcance, punto 7): los totales
 * de sus facturas por menú (tipo de proveedor) y en total, el chequeo de
 * comprobantes de egreso (las aprobadas sin número de comprobante) y sus
 * facturas. Todas las cifras las calcula el servidor; las anuladas se listan
 * pero no suman. Debajo, las glosas levantadas y liberadas en él (DEC-085).
 */

const MENU_COLUMNS = [
  { id: 'name', label: 'Menú' },
  { id: 'count', label: 'Facturas', align: 'right' },
  { id: 'value', label: 'Valor', align: 'right', render: (row) => fMoneyText(row.value) },
  { id: 'vat', label: 'IVA', align: 'right', render: (row) => fMoneyText(row.vat) },
  { id: 'total', label: 'Total', align: 'right', render: (row) => fMoneyText(row.total) }
];

const INVOICE_COLUMNS = [
  {
    id: 'number',
    label: 'Factura',
    render: (row) => (
      <Link component={RouterLink} to={invoicePath(row.pvtId, row.invId)}>
        {row.number}
      </Link>
    )
  },
  { id: 'menuName', label: 'Menú' },
  { id: 'providerName', label: 'Proveedor' },
  { id: 'contractNumber', label: 'Contrato', render: (row) => row.contractNumber ?? '—' },
  { id: 'date', label: 'Fecha', render: (row) => fDateOnly(row.date) },
  { id: 'voucherNumber', label: 'Comprobante', render: (row) => row.voucherNumber ?? '—' },
  { id: 'total', label: 'Total', align: 'right', render: (row) => fMoneyText(row.total) },
  { id: 'stateName', label: 'Estado' }
];

const GLOSS_COLUMNS = [
  {
    id: 'invoiceNumber',
    label: 'Factura',
    render: (row) => (
      <Link component={RouterLink} to={invoicePath(row.pvtId, row.invId)}>
        {row.invoiceNumber}
      </Link>
    )
  },
  { id: 'providerName', label: 'Proveedor' },
  { id: 'code', label: 'Código', render: (row) => row.code ?? '—' },
  { id: 'description', label: 'Descripción' },
  { id: 'value', label: 'Valor', align: 'right', render: (row) => fMoneyText(row.value) },
  { id: 'statement', label: 'Levantada en', render: (row) => row.statement ?? '—' },
  { id: 'releaseStatement', label: 'Liberada en', render: (row) => row.releaseStatement ?? 'Abierta' }
];

/** Glosas del extracto (DEC-085): las que se levantaron en él o las que se liberaron en él. */
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

export default function StatementReportDialog({ statement, canExport, onClose }) {
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
  }, [statement, onClose]);

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
                Total: {totals.count} {totals.count === 1 ? 'factura' : 'facturas'} · Valor {fMoneyText(totals.value)} · IVA {fMoneyText(totals.vat)} ·
                Total {fMoneyText(totals.total)}
              </Typography>
              <Typography variant="h5">Facturas</Typography>
              <DataTable columns={INVOICE_COLUMNS} rows={report.invoices} keyExtractor={(row) => row.invId} />
            </>
          )}
          <GlossesSection title="Glosas levantadas" rows={report.glosses.raised} total={report.glosses.raisedValue} />
          <GlossesSection title="Glosas liberadas" rows={report.glosses.released} total={report.glosses.releasedValue} />
        </Stack>
      )}
    </BaseDialog>
  );
}

StatementReportDialog.propTypes = {
  /** Fila del listado: `{ wrkId, number }`; null, cerrado. */
  statement: PropTypes.object,
  canExport: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};
