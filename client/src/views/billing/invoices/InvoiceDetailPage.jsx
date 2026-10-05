import { useCallback, useEffect, useState } from 'react';
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
import { DataList, Pending } from 'ui-component/extended/DetailBlocks';
import RouteDialog from 'ui-component/extended/RouteDialog';
import StatusChip from 'ui-component/extended/StatusChip';
import ApproveInvoiceDialog from './components/ApproveInvoiceDialog';
import CancelInvoiceDialog from './components/CancelInvoiceDialog';
import { invoicesApi } from 'api/requests/invoicesApi';
import { useAuth } from 'contexts/AuthContext';
import { useSocket } from 'socket/SocketProvider';
import { showError } from 'services/ToastService';
import { fDateOnly, fDateTime } from 'utils/formatTime';
import { INVOICE_STATE_COLORS } from 'utils/constants';

/**
 * Expediente de una factura (DEC-042), en un modal sobre el listado con
 * dirección propia `/billing/invoices/:invId` (DEC-034): identidad, estado,
 * datos del documento e historial de estado. El estado no se edita: lo
 * cambian Aprobar y Anular, cada una con su diálogo y su permiso, ofrecidas
 * según `allowedActions` del servidor. Los importes llegan con la fase B.
 */

const TABS = [
  { key: 'summary', label: 'Resumen' },
  { key: 'history', label: 'Historial de estado' },
  { key: 'amounts', label: 'Importes' }
];

export default function InvoiceDetailPage() {
  const { invId } = useParams();
  const navigate = useNavigate();
  const socket = useSocket();
  const { refresh } = useOutletContext() ?? {};
  const { permissionsCatalog, hasPermission } = useAuth();
  const canDo = (perId) => perId != null && hasPermission(perId);
  const perms = permissionsCatalog.billing?.invoices;

  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('summary');
  const [dialog, setDialog] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await invoicesApi.getById({ invId });
      setInvoice(data);
    } catch (err) {
      showError(err.response?.data?.message || 'Error al cargar la factura');
      if (err.response?.status === 404) navigate('/billing/invoices', { replace: true });
    } finally {
      setLoading(false);
    }
  }, [invId, navigate]);

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

  const close = () => navigate('/billing/invoices');

  if (!invoice) return <RouteDialog onClose={close} loading={loading} />;

  const allows = (action) => invoice.allowedActions.includes(action);
  const canApprove = canDo(perms?.approve) && allows('approve');
  // Anular una aprobada exige además el permiso reforzado (ADR-0020).
  const canCancel = canDo(perms?.cancel) && (allows('cancel') || (allows('cancelApproved') && canDo(perms?.cancelApproved)));
  const canEdit = canDo(perms?.edit) && allows('editNotes');

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
            {invoice.providerName} · {invoice.workCode} {invoice.workName}
            {invoice.contractNumber ? ` · Contrato ${invoice.contractNumber}` : ''}
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
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="outlined" color="inherit" onClick={close}>
            Cerrar
          </Button>
          {canEdit && (
            <Button variant="outlined" color="secondary" onClick={() => navigate(`/billing/invoices/${invoice.invId}/edit`)}>
              {allows('edit') ? 'Editar factura' : 'Editar extracto y descripción'}
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
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <SubCard title="Documento">
                <DataList
                  items={[
                    ['Número', invoice.number],
                    ['Tipo', invoice.typeName],
                    ['Fecha de la factura', fDateOnly(invoice.date)],
                    ['Fecha de aprobación', invoice.approvalDate ? fDateOnly(invoice.approvalDate) : 'Sin aprobar'],
                    ['Número de comprobante', invoice.voucherNumber],
                    ['Extracto', invoice.statement],
                    ['Descripción', invoice.description]
                  ]}
                />
              </SubCard>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <SubCard title="Proveedor, obra y contrato">
                <DataList
                  items={[
                    ['Proveedor', `${invoice.providerName} · ${invoice.providerIdentification}`],
                    ['Obra', `${invoice.workCode} — ${invoice.workName}`],
                    ['Etapa', invoice.stageName],
                    [
                      'Contrato',
                      invoice.contractNumber ? `${invoice.contractNumber} — ${invoice.contractName}` : 'Sin contrato (factura simple)'
                    ],
                    ...(invoice.contractNumber ? [['Estado del contrato', invoice.contractStateName]] : []),
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

      {tab === 'amounts' && (
        <Pending
          title="Los importes de la factura todavía no se registran."
          text="Valor, IVA, retenciones, amortización del anticipo y retenido llegan cuando se defina la composición de cada tipo de factura (decisiones contables pendientes). Hoy la factura registra el documento y su ciclo de vida."
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
    </RouteDialog>
  );
}
