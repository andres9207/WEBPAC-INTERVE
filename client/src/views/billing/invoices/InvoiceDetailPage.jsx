import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import SubCard from 'ui-component/cards/SubCard';
import { DataList, Figure, Pending } from 'ui-component/extended/DetailBlocks';
import RouteDialog from 'ui-component/extended/RouteDialog';
import StatusChip from 'ui-component/extended/StatusChip';
import ApproveInvoiceDialog from './components/ApproveInvoiceDialog';
import CancelInvoiceDialog from './components/CancelInvoiceDialog';
import DeleteInvoiceDialog from './components/DeleteInvoiceDialog';
import { invoicesApi } from 'api/requests/invoicesApi';
import { useAuth } from 'contexts/AuthContext';
import { useSocket } from 'socket/SocketProvider';
import { showError } from 'services/ToastService';
import { fDateOnly, fDateTime } from 'utils/formatTime';
import { fMoneyText, fPercentText } from 'utils/formatNumber';
import { INVOICE_STATE_COLORS, invoicePath, isBillingInvoiceType } from 'utils/constants';
import InvoiceDetailPanel from './components/InvoiceDetailPanel';
import InvoiceFollowUpsTab from './components/InvoiceFollowUpsTab';
import InvoiceGlossesTab from './components/InvoiceGlossesTab';

/**
 * Expediente de una factura (DEC-042), en un modal sobre el listado de su
 * menú con dirección propia `/billing/invoices/:pvtId/:invId` (DEC-034,
 * DEC-074). Abierta desde otro menú, se lleva al suyo. Identidad, estado,
 * datos del documento e historial de estado. El estado no se edita: lo
 * cambian Aprobar y Anular, cada una con su diálogo y su permiso, ofrecidas
 * según `allowedActions` del servidor. Importes: los del anticipo, la
 * liquidación (DEC-044) y el retenido (DEC-051); IVA y retenciones
 * tributarias llegan con la fase B.
 */

const pct = fPercentText;

const CONTRACT_TYPES = ['ADVANCE', 'NORMAL', 'LIQUIDATION', 'RETENTION_REFUND'];

function FigureRow({ figures }) {
  return (
    <Grid container spacing={2}>
      {figures.map((figure) => (
        <Grid key={figure.label} size={{ xs: 12, sm: 6, md: 4 }}>
          <Figure {...figure} />
        </Grid>
      ))}
    </Grid>
  );
}

FigureRow.propTypes = { figures: PropTypes.array.isRequired };

/**
 * Retenido contractual de una liquidación (DEC-051), aparte de los demás
 * importes: es una garantía, no una retención tributaria. Una liquidación
 * registrada antes del retenido no lo tiene.
 */
function LiquidationRetention({ amounts, approved }) {
  if (amounts.retention == null) {
    return (
      <Alert severity="info" variant="outlined">
        {approved
          ? 'Esta liquidación se aprobó antes de que existiera el retenido: no retuvo nada.'
          : 'Esta liquidación no tiene su retenido calculado. Edítala para calcularlo: sin él no se puede aprobar.'}
      </Alert>
    );
  }
  return (
    <FigureRow
      figures={[
        { label: 'Retenido', value: fMoneyText(amounts.retention), hint: `${pct(amounts.retentionAppliedPct)} del VALOR` },
        {
          label: 'Retenido por defecto',
          value: fMoneyText(amounts.defaultRetention),
          hint: `% efectivo del contrato: ${pct(amounts.retentionDefaultPct)}`
        }
      ]}
    />
  );
}

LiquidationRetention.propTypes = { amounts: PropTypes.object.isRequired, approved: PropTypes.bool };

/**
 * Panel Detalle de la factura guardada (DEC-065): la composición que manda el
 * servidor. null si la factura no tiene importes.
 */
const detailPanelOf = ({ type, amounts }) => {
  if (!amounts) return null;
  const isLiquidation = isBillingInvoiceType(type);
  // Normal y liquidación con IVA y retenciones (DEC-075).
  if (isLiquidation && amounts.lines) {
    return {
      lines: amounts.lines,
      total: amounts.total,
      note: 'TOTAL es el neto a pagar: descuenta las retenciones, la amortización, el retenido y el descuento de materiales.'
    };
  }
  if (amounts.lines) {
    return {
      lines: amounts.lines,
      total: amounts.total,
      note: 'TOTAL es el neto a pagar: descuenta las retenciones y el pronto pago.'
    };
  }
  return {
    lines: [
      { key: 'value', label: isLiquidation ? 'VALOR' : type === 'ADVANCE' ? 'ANTICIPO' : 'DEVOLUCIÓN RETENIDO', value: amounts.value },
      ...(isLiquidation
        ? [
            { key: 'amortization', label: 'AMORTIZACIÓN', value: amounts.amortization },
            { key: 'retention', label: 'RETENIDO', value: amounts.retention }
          ]
        : [])
    ],
    total: isLiquidation ? undefined : amounts.value,
    note: isLiquidation
      ? 'Registrada antes de que estas facturas tuvieran IVA y retenciones (DEC-075): no tiene total a pagar.'
      : 'El anticipo y la devolución de retenido no llevan IVA ni retenciones tributarias.'
  };
};

// Lo capturado de la simple (DEC-065), con su unidad: tasa o valor.
const SIMPLE_CAPTURED = [
  ['value', 'Valor', 'money'],
  ['withholdingPct', 'Retención en la fuente', 'pct'],
  ['discount', 'Descuento AI', 'money'],
  ['vatPct', 'IVA', 'pct'],
  ['vatWithholdingPct', 'Retención de IVA', 'pct'],
  ['icaWithholding', 'Retención de ICA', 'money'],
  ['freight', 'Flete', 'money'],
  ['earlyPaymentDiscount', 'Descuento por pronto pago', 'money']
];

// IVA, retenciones y descuento de materiales de la normal y la liquidación (DEC-075).
const CONTRACT_CAPTURED = [
  ['utilityPct', 'Utilidad', 'pct'],
  ['vatPct', 'IVA', 'pct'],
  ['withholdingPct', 'Retención en la fuente', 'pct'],
  ['vatWithholdingPct', 'Retención de IVA', 'pct'],
  ['icaWithholding', 'Retención de ICA', 'money'],
  ['materialsDiscount', 'Descuento de materiales', 'money']
];

/** Importes de una factura, como los guardó el servidor. */
function InvoiceAmounts({ invoice }) {
  const { amounts, type } = invoice;
  if (!amounts) {
    return CONTRACT_TYPES.includes(type) ? (
      <Pending
        title="La factura no tiene sus importes registrados."
        text="Se registró antes de que existieran los importes. Edítala para registrar el valor: sin él no se puede aprobar."
      />
    ) : (
      <Pending
        title="La factura no tiene sus importes registrados."
        text="Se registró antes de que la factura simple tuviera importes (DEC-065). Mientras esté registrada, se pueden capturar al editarla; también se puede aprobar sin ellos."
      />
    );
  }
  if (amounts.captured && !isBillingInvoiceType(type)) {
    return (
      <Stack spacing={2}>
        <DataList
          items={SIMPLE_CAPTURED.map(([key, label, unit]) => [
            label,
            unit === 'pct' ? pct(amounts.captured[key]) : fMoneyText(amounts.captured[key])
          ])}
        />
        <Typography variant="caption" color="text.secondary">
          Tasas congeladas al registrar. Subtotal, IVA, retenciones y totales se calculan con la fórmula v{amounts.formulaVersion} (DEC-065)
          y no se guardan.
        </Typography>
      </Stack>
    );
  }
  const approved = invoice.state === 'APPROVED';
  const isLiquidation = isBillingInvoiceType(type);
  const figures = {
    ADVANCE: [{ label: 'Valor del anticipo', value: fMoneyText(amounts.value) }],
    RETENTION_REFUND: [{ label: 'Valor devuelto', value: fMoneyText(amounts.value), hint: 'Devolución del retenido contractual' }],
    LIQUIDATION: [
      { label: 'VALOR', value: fMoneyText(amounts.value), hint: 'Antes de IVA, con AIU' },
      { label: 'Amortización del anticipo', value: fMoneyText(amounts.amortization), hint: `${pct(amounts.appliedPct)} del VALOR` },
      {
        label: 'Amortización por defecto',
        value: fMoneyText(amounts.defaultAmortization),
        hint: `% efectivo del contrato: ${pct(amounts.defaultPct)}`
      }
    ]
  }[isLiquidation ? 'LIQUIDATION' : type];
  return (
    <Stack spacing={2}>
      <FigureRow figures={figures} />
      {amounts.adjustmentObservation && (
        <Alert severity="warning">Amortización ajustada respecto del valor por defecto: {amounts.adjustmentObservation}</Alert>
      )}
      {isLiquidation && (
        <>
          <Typography variant="subtitle2">Retenido contractual</Typography>
          <LiquidationRetention amounts={amounts} approved={approved} />
          {amounts.retentionObservation && (
            <Alert severity="warning">Retenido ajustado respecto del valor por defecto: {amounts.retentionObservation}</Alert>
          )}
          <Typography variant="subtitle2">IVA y retenciones</Typography>
          {amounts.captured ? (
            <>
              <DataList
                items={CONTRACT_CAPTURED.map(([key, label, unit]) => [
                  label,
                  unit === 'pct' ? pct(amounts.captured[key]) : fMoneyText(amounts.captured[key])
                ])}
              />
              <Typography variant="caption" color="text.secondary">
                Tasas congeladas al registrar. IVA, retenciones y total se calculan con la fórmula v{amounts.formulaVersion} (DEC-075) y no
                se guardan. El % de utilidad se guarda, pero no entra en el cálculo.
              </Typography>
            </>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Se registró antes de que estas facturas tuvieran IVA y retenciones. Mientras esté registrada, se capturan al editarla.
            </Typography>
          )}
        </>
      )}
      <Typography variant="caption" color="text.secondary">
        {approved
          ? 'Aprobada: estos importes cuentan en los saldos del contrato.'
          : 'Solo las facturas aprobadas cuentan en los saldos del contrato. Al aprobar se revalidan contra los saldos vigentes.'}
      </Typography>
    </Stack>
  );
}

InvoiceAmounts.propTypes = { invoice: PropTypes.object.isRequired };

const TABS = [
  { key: 'summary', label: 'Resumen' },
  { key: 'history', label: 'Historial de estado' },
  { key: 'amounts', label: 'Importes' },
  // Lo que se está trabajando sobre la factura (DEC-076).
  { key: 'followUps', label: 'Seguimiento' },
  // Errores hallados al registrarla, hasta su liberación en un extracto posterior (DEC-085).
  { key: 'glosses', label: 'Glosas' }
];

export default function InvoiceDetailPage() {
  const { invId } = useParams();
  const navigate = useNavigate();
  const socket = useSocket();
  // `returnTo`: abierto sobre otra pantalla (el tablero), sin menú propio;
  // cerrar vuelve a ella. Sin él, la factura vive en el listado de su menú.
  const { refresh, pvtId, returnTo } = useOutletContext() ?? {};
  const listPath = returnTo ?? invoicePath(pvtId);
  const { permissionsCatalog, hasPermission } = useAuth();
  const canDo = (perId) => perId != null && hasPermission(perId);
  const perms = permissionsCatalog.billing?.invoices;

  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('summary');
  const [dialog, setDialog] = useState(null);
  // Cuántos seguimientos tiene: lo cuenta la pestaña al cargarlos (antes, sin número).
  const [followUpCount, setFollowUpCount] = useState(null);
  const [openGlosses, setOpenGlosses] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await invoicesApi.getById({ invId });
      // Cada factura vive en su menú (DEC-074): una dirección de otro menú se corrige.
      if (!returnTo && data.pvtId && String(data.pvtId) !== String(pvtId)) {
        navigate(invoicePath(data.pvtId, data.invId), { replace: true });
        return;
      }
      setInvoice(data);
    } catch (err) {
      showError(err.response?.data?.message || 'Error al cargar la factura');
      if (err.response?.status === 404) navigate(listPath, { replace: true });
    } finally {
      setLoading(false);
    }
  }, [invId, navigate, pvtId, returnTo, listPath]);

  useEffect(() => {
    load();
  }, [load]);

  // Otro usuario aprobó, anuló o editó la factura: se recarga.
  useEffect(() => {
    if (!socket) return undefined;
    socket.on('refresh-invoices', load);
    return () => socket.off('refresh-invoices', load);
  }, [socket, load]);

  const closeDialog = useCallback(() => setDialog(null), []);
  const changed = useCallback(() => {
    setDialog(null);
    load();
    refresh?.();
  }, [load, refresh]);

  const close = () => navigate(listPath);
  // Eliminada: ya no se puede leer; vuelve al listado.
  const deleted = () => {
    setDialog(null);
    refresh?.();
    close();
  };

  if (!invoice) return <RouteDialog onClose={close} loading={loading} />;

  const panel = detailPanelOf(invoice);
  const allows = (action) => invoice.allowedActions.includes(action);
  const canApprove = canDo(perms?.approve) && allows('approve');
  // Anular una aprobada exige además el permiso reforzado (ADR-0020).
  const canCancel = canDo(perms?.cancel) && (allows('cancel') || (allows('cancelApproved') && canDo(perms?.cancelApproved)));
  const canEdit = canDo(perms?.edit) && allows('editNotes');
  // Eliminar una aprobada exige además el permiso reforzado (DEC-068).
  const canDelete = canDo(perms?.delete) && (allows('delete') || (allows('deleteApproved') && canDo(perms?.deleteApproved)));

  return (
    <RouteDialog
      onClose={close}
      labelledBy="invoice-title"
      header={
        <>
          <Stack direction="row" sx={{ flexWrap: 'wrap', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <Typography id="invoice-title" variant="h3" component="h2">
              Factura {invoice.number}
            </Typography>
            <StatusChip staId={invoice.state} label={invoice.stateName} scope={null} colorMap={INVOICE_STATE_COLORS} />
            <Chip size="small" variant="outlined" label={invoice.typeName} />
          </Stack>
          <Typography variant="body2" color="text.secondary">
            {[
              invoice.providerName,
              invoice.workCode && `${invoice.workCode} ${invoice.workName}`,
              invoice.contractNumber && `Contrato ${invoice.contractNumber}`
            ]
              .filter(Boolean)
              .join(' · ')}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Modificada el {fDateTime(invoice.updatedAt)} por {invoice.updatedByName ?? '—'}
          </Typography>
        </>
      }
      tabs={
        <Tabs
          value={tab}
          onChange={(_, value) => setTab(value)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Partes de la factura"
        >
          {TABS.map((t) => (
            <Tab
              key={t.key}
              value={t.key}
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <span>{t.label}</span>
                  {t.key === 'history' && <Chip label={invoice.history.length} size="small" color="default" />}
                  {t.key === 'followUps' && followUpCount !== null && <Chip label={followUpCount} size="small" color="default" />}
                  {t.key === 'glosses' && openGlosses > 0 && <Chip label={openGlosses} size="small" color="warning" />}
                </Stack>
              }
            />
          ))}
        </Tabs>
      }
      footer={
        <>
          {canCancel && (
            <Button variant="outlined" color="error" onClick={() => setDialog('cancel')}>
              Anular
            </Button>
          )}
          {canDelete && (
            <Button variant="text" color="error" onClick={() => setDialog('delete')}>
              Eliminar
            </Button>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="outlined" color="inherit" onClick={close}>
            Cerrar
          </Button>
          {canEdit && (
            <Button variant="outlined" color="secondary" onClick={() => navigate(invoicePath(invoice.pvtId, invoice.invId, 'edit'))}>
              {allows('edit') ? 'Editar factura' : 'Editar extracto, descripción y comprobante'}
            </Button>
          )}
          {canApprove && (
            <Button variant="contained" color="success" onClick={() => setDialog('approve')} disabled={!invoice.contractAdmits}>
              Aprobar
            </Button>
          )}
        </>
      }
    >
      {tab === 'summary' && (
        <Stack spacing={2}>
          {invoice.state === 'REGISTERED' && !invoice.contractAdmits && (
            <Alert severity="warning">
              El contrato está {invoice.contractStateName?.toLowerCase()}: hoy no admite facturas de {invoice.typeName.toLowerCase()}. No se
              puede aprobar mientras siga así; se puede anular.
            </Alert>
          )}
          {invoice.state === 'CANCELLED' && (
            <Alert severity="info">Factura anulada: queda en el historial, fuera de todo cálculo, y su número sigue ocupado.</Alert>
          )}
          <Grid container spacing={2} sx={{ alignItems: 'flex-start' }}>
            <Grid size={{ xs: 12, md: panel ? 8 : 12 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: panel ? 12 : 6 }}>
                  <SubCard title="Documento">
                    <DataList
                      items={[
                        ['Número', invoice.number],
                        ['Tipo', invoice.typeName],
                        ['Fecha de la factura', fDateOnly(invoice.date)],
                        ['Fecha de aprobación', invoice.approvalDate ? fDateOnly(invoice.approvalDate) : 'Sin aprobar'],
                        ['Número de comprobante', invoice.voucherNumber],
                        // Texto libre (DEC-084); la fecha, si ya existe el extracto de la obra con ese número.
                        [
                          'Extracto',
                          invoice.statement &&
                            [invoice.statement, invoice.statementDate && fDateOnly(invoice.statementDate)].filter(Boolean).join(' · ')
                        ],
                        ['Descripción', invoice.description]
                      ]}
                    />
                  </SubCard>
                </Grid>
                <Grid size={{ xs: 12, md: panel ? 12 : 6 }}>
                  <SubCard title={invoice.ctrId ? 'Proveedor, obra y contrato' : 'Proveedor y obra'}>
                    <DataList
                      items={[
                        ['Proveedor', `${invoice.providerName} · ${invoice.providerIdentification}`],
                        // La simple se imputa a una etapa de la obra, sin contrato (DEC-058).
                        ['Obra', `${invoice.workCode} — ${invoice.workName}`],
                        ['Etapa', invoice.stageName],
                        ...(invoice.ctrId
                          ? [
                              ['Contrato', `${invoice.contractNumber} — ${invoice.contractName}`],
                              ['Estado del contrato', invoice.contractStateName],
                              // La liquidación se asocia al otrosí de liquidación del contrato (DEC-059).
                              ...(invoice.amounts?.liquidationConcept
                                ? [
                                    [
                                      'Otrosí de liquidación',
                                      [
                                        invoice.amounts.liquidationConcept.number && `N.º ${invoice.amounts.liquidationConcept.number}`,
                                        `desde ${fDateOnly(invoice.amounts.liquidationConcept.startDate)}`
                                      ]
                                        .filter(Boolean)
                                        .join(' · ')
                                    ]
                                  ]
                                : [])
                            ]
                          : [['Contrato', 'Sin contrato (factura simple)']]),
                        ['Registrada', `${fDateTime(invoice.createdAt)} por ${invoice.createdByName ?? '—'}`]
                      ]}
                    />
                    {invoice.ctrId && (
                      <Button size="small" sx={{ mt: 1 }} onClick={() => navigate(`/work/contracts/${invoice.ctrId}`)}>
                        Ver contrato
                      </Button>
                    )}
                  </SubCard>
                </Grid>
              </Grid>
            </Grid>
            {panel && (
              <Grid size={{ xs: 12, md: 4 }}>
                <InvoiceDetailPanel {...panel} />
              </Grid>
            )}
          </Grid>
        </Stack>
      )}

      {tab === 'history' && (
        <Box
          component="ol"
          sx={{ listStyle: 'none', p: 0, m: 0, border: '1px solid', borderColor: 'divider', borderRadius: 2, bgcolor: 'background.paper' }}
        >
          {invoice.history.map((h, i) => (
            <Stack
              key={h.ishId}
              component="li"
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 0.5, sm: 2 }}
              sx={{ px: 2, py: 1.5, borderBottom: i < invoice.history.length - 1 ? '1px solid' : 'none', borderColor: 'divider' }}
            >
              <Typography variant="caption" color="text.secondary" sx={{ minWidth: 150 }}>
                {fDateTime(h.createdAt)}
              </Typography>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1">
                  {h.fromStateName ? `${h.fromStateName} → ${h.toStateName}` : `Creada en ${h.toStateName.toLowerCase()}`}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {h.origin === 'AUTOMATIC' ? 'Automática' : 'Manual'} · {h.createdByName ?? '—'}
                  {h.reasonName ? ` · Motivo: ${h.reasonName}` : ''}
                  {h.observation ? ` · ${h.observation}` : ''}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Box>
      )}

      {tab === 'amounts' && <InvoiceAmounts invoice={invoice} />}

      {tab === 'followUps' && (
        <InvoiceFollowUpsTab
          invId={invoice.invId}
          cancelled={invoice.state === 'CANCELLED'}
          canManage={canDo(perms?.manageFollowUps)}
          onCount={setFollowUpCount}
          onChanged={refresh}
        />
      )}

      {tab === 'glosses' && (
        <InvoiceGlossesTab
          invoice={{ invId: invoice.invId, wrkId: invoice.wrkId, stmId: invoice.stmId, state: invoice.state }}
          canManage={canDo(perms?.manageGlosses)}
          onCount={setOpenGlosses}
        />
      )}

      <ApproveInvoiceDialog
        open={dialog === 'approve'}
        invoice={{ invId: invoice.invId, number: invoice.number, date: invoice.date }}
        onClose={closeDialog}
        onSaved={changed}
      />
      <CancelInvoiceDialog
        open={dialog === 'cancel'}
        invoice={{ invId: invoice.invId, number: invoice.number, state: invoice.state }}
        onClose={closeDialog}
        onSaved={changed}
      />
      <DeleteInvoiceDialog
        open={dialog === 'delete'}
        invoice={{ invId: invoice.invId, number: invoice.number, state: invoice.state }}
        onClose={closeDialog}
        onDeleted={deleted}
      />
    </RouteDialog>
  );
}
