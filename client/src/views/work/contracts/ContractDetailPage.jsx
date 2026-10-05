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
import ConfirmDialog from 'ui-component/extended/ConfirmDialog';
import { DataList, Figure, Pending } from 'ui-component/extended/DetailBlocks';
import RouteDialog from 'ui-component/extended/RouteDialog';
import StatusChip from 'ui-component/extended/StatusChip';
import ConceptsTab from './components/ConceptsTab';
import SuspendDialog from './components/SuspendDialog';
import ContractInvoicesTab from 'views/billing/invoices/components/ContractInvoicesTab';
import { contractsApi } from 'api/requests/contractsApi';
import { useAuth } from 'contexts/AuthContext';
import { useSocket } from 'socket/SocketProvider';
import { showError, showSuccess } from 'services/ToastService';
import { fMoneyText } from 'utils/formatNumber';
import { fDateOnly, fDateTime } from 'utils/formatTime';
import { CONTRACT_STATE_COLORS, fTerm } from 'utils/constants';

/**
 * Expediente de un contrato (PRO-FE-05), en un modal sobre el listado con
 * dirección propia `/work/contracts/:ctrId` (DEC-034): encabezado con
 * identidad y estado del ciclo de vida, cifras clave y pestañas por parte del
 * agregado. Todo lo calculado (valor vigente, fecha fin, anticipo y retenido
 * pactados) viene del servidor.
 *
 * Pólizas y documentos ya tienen su pestaña, aunque todavía no existen. La
 * de facturas lista las del contrato y registra las que su estado admite
 * (DEC-042). El estado no se edita: lo cambian los actos. Suspender tiene su
 * botón; la suspensión se levanta registrando un otrosí en la pestaña Valor
 * (DEC-039). Reabrir llega con la liquidación.
 */

const TABS = [
  { key: 'summary', label: 'Resumen' },
  { key: 'value', label: 'Valor' },
  { key: 'history', label: 'Historial de estado' },
  { key: 'suspensions', label: 'Suspensiones' },
  { key: 'policies', label: 'Pólizas' },
  { key: 'invoices', label: 'Facturas' },
  { key: 'documents', label: 'Documentos' }
];

export default function ContractDetailPage() {
  const { ctrId } = useParams();
  const navigate = useNavigate();
  const socket = useSocket();
  const { refresh } = useOutletContext() ?? {};
  const { permissionsCatalog, hasPermission } = useAuth();
  const canDo = (perId) => perId != null && hasPermission(perId);
  const perms = permissionsCatalog.work?.contracts;

  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('summary');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [suspending, setSuspending] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await contractsApi.getById({ ctrId });
      setContract(data);
    } catch (err) {
      showError(err.response?.data?.message || 'Error al cargar el contrato');
      if (err.response?.status === 404) navigate('/work/contracts', { replace: true });
    } finally {
      setLoading(false);
    }
  }, [ctrId, navigate]);

  useEffect(() => {
    load();
  }, [load]);

  // Otro usuario registró un otrosí o cambió el contrato: se recarga.
  useEffect(() => {
    if (!socket) return undefined;
    socket.on('refresh-contracts', load);
    return () => socket.off('refresh-contracts', load);
  }, [socket, load]);

  const close = () => navigate('/work/contracts');

  if (!contract) return <RouteDialog onClose={close} loading={loading} />;

  const editable = contract.allowedActions.includes('editContract');
  const amendments = contract.concepts.filter((c) => c.type === 'AMENDMENT').length;

  const changed = () => {
    load();
    refresh?.();
  };

  const suspended = () => {
    setSuspending(false);
    changed();
  };

  const remove = async () => {
    try {
      const { data } = await contractsApi.remove({ ctrId: contract.ctrId });
      showSuccess(data.message);
      refresh?.();
      close();
    } catch (err) {
      showError(err.response?.data?.message || 'No se pudo eliminar el contrato');
    }
  };

  const figures = [
    { label: 'Valor vigente', value: fMoneyText(contract.currentValue), hint: `Suma de ${contract.concepts.length} concepto(s)` },
    {
      label: 'Fecha fin',
      value: fDateOnly(contract.endDate),
      hint: 'Calculada: inicio + plazo + prórrogas + días suspendidos'
    },
    {
      label: 'Plazo',
      value: fTerm(contract.term, contract.termUnit),
      hint: contract.totalExtensions ? `+ ${fTerm(contract.totalExtensions, contract.termUnit)} de prórrogas` : 'Sin prórrogas'
    },
    { label: 'Anticipo pactado', value: fMoneyText(contract.advance), hint: 'Suma del anticipo de cada concepto' },
    { label: 'Retenido pactado', value: fMoneyText(contract.retention), hint: 'Suma del retenido de cada concepto' },
    {
      label: 'Otrosí',
      value: String(amendments),
      hint: contract.hasLiquidation ? 'Con otrosí de liquidación' : 'Sin otrosí de liquidación'
    }
  ];

  const tabBadge = {
    value: contract.concepts.length,
    history: contract.history.length,
    suspensions: contract.suspensions.length,
    policies: 0,
    documents: 0
  };
  const open = contract.openSuspension;

  return (
    <RouteDialog
      onClose={close}
      labelledBy="contract-title"
      header={
        <>
          <Stack direction="row" sx={{ flexWrap: 'wrap', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <Typography id="contract-title" variant="h3" component="h2">
              {contract.number} · {contract.name}
            </Typography>
            <StatusChip staId={contract.state} label={contract.stateName} scope={null} colorMap={CONTRACT_STATE_COLORS} />
          </Stack>
          <Typography variant="body2" color="text.secondary">
            {contract.workCode} {contract.workName} · {contract.providerName} · {contract.contractType}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Modificado el {fDateTime(contract.updatedAt)} por {contract.updatedByName ?? '—'}
          </Typography>
        </>
      }
      tabs={
        <Tabs value={tab} onChange={(_, value) => setTab(value)} variant="scrollable" scrollButtons="auto" aria-label="Partes del contrato">
          {TABS.map((t) => (
            <Tab
              key={t.key}
              value={t.key}
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <span>{t.label}</span>
                  {tabBadge[t.key] !== undefined && <Chip label={tabBadge[t.key]} size="small" color="default" />}
                </Stack>
              }
            />
          ))}
        </Tabs>
      }
      footer={
        <>
          {canDo(perms?.delete) && (
            <Button variant="outlined" color="error" onClick={() => setConfirmDelete(true)}>
              Eliminar
            </Button>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="outlined" color="inherit" onClick={close}>
            Cerrar
          </Button>
          {canDo(perms?.suspend) && contract.allowedActions.includes('suspend') && (
            <Button variant="contained" color="lilac" sx={{ border: 1, borderColor: 'lilac.200' }} onClick={() => setSuspending(true)}>
              Suspender
            </Button>
          )}
          {canDo(perms?.edit) && editable && (
            <Button variant="contained" color="secondary" onClick={() => navigate(`/work/contracts/${contract.ctrId}/edit`)}>
              Editar contrato
            </Button>
          )}
        </>
      }
    >
      {tab === 'summary' && (
        <Stack spacing={2}>
          {open && (
            <Alert severity="warning" color="lilac">
              <strong>Suspendido desde el {fDateOnly(open.suspensionDate)}</strong> · {open.reasonName}. Condición para reanudar:{' '}
              {open.liftCondition}. Se reanuda registrando un otrosí en la pestaña Valor.
            </Alert>
          )}
          <Grid container spacing={1.5}>
            {figures.map((figure) => (
              <Grid key={figure.label} size={{ xs: 12, sm: 6, md: 4 }}>
                <Figure {...figure} />
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <SubCard title="Datos contractuales">
                <DataList
                  items={[
                    ['Número', contract.number],
                    ['Nombre', contract.name],
                    ['Obra', `${contract.workCode} — ${contract.workName}`],
                    ['Etapa', contract.stageName],
                    ['Proveedor', `${contract.providerName} · ${contract.providerIdentification}`],
                    ['Tipo de contrato', contract.contractType],
                    ['Observaciones', contract.observation]
                  ]}
                />
              </SubCard>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <SubCard title="Plazo">
                <DataList
                  items={[
                    ['Fecha de inicio', fDateOnly(contract.startDate)],
                    ['Plazo', fTerm(contract.term, contract.termUnit)],
                    [
                      'Prórrogas de otrosí',
                      contract.totalExtensions ? fTerm(contract.totalExtensions, contract.termUnit) : 'Sin prórrogas'
                    ],
                    ['Días suspendidos', String(contract.suspendedDays)],
                    ['Fecha fin', `${fDateOnly(contract.endDate)} (calculada por el sistema)`],
                    ['Estado', contract.stateName],
                    ['Creado', `${fDateTime(contract.createdAt)} por ${contract.createdByName ?? '—'}`]
                  ]}
                />
              </SubCard>
            </Grid>
          </Grid>
        </Stack>
      )}

      {tab === 'value' && <ConceptsTab contract={contract} onChanged={changed} />}

      {tab === 'history' && (
        <Box
          component="ol"
          sx={{ listStyle: 'none', p: 0, m: 0, border: '1px solid', borderColor: 'divider', borderRadius: 2, bgcolor: 'background.paper' }}
        >
          {contract.history.map((h, i) => (
            <Stack
              key={h.cshId}
              component="li"
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 0.5, sm: 2 }}
              sx={{ px: 2, py: 1.5, borderBottom: i < contract.history.length - 1 ? '1px solid' : 'none', borderColor: 'divider' }}
            >
              <Typography variant="caption" color="text.secondary" sx={{ minWidth: 150 }}>
                {fDateTime(h.createdAt)}
              </Typography>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1">
                  {h.fromStateName ? `${h.fromStateName} → ${h.toStateName}` : `Creado en ${h.toStateName.toLowerCase()}`}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {h.origin === 'AUTOMATIC' ? 'Automática' : 'Manual'} · {h.createdByName ?? '—'}
                  {h.observation ? ` · ${h.observation}` : ''}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Box>
      )}

      {tab === 'suspensions' &&
        (contract.suspensions.length === 0 ? (
          <Pending
            title="El contrato no ha tenido suspensiones."
            text="Aquí se verá cada suspensión con su motivo, sus fechas y los días que sumó al plazo."
          />
        ) : (
          <Stack spacing={1.5}>
            {contract.suspensions.map((s) => (
              <SubCard
                key={s.cspId}
                title={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <span>{s.reasonName}</span>
                    <Chip size="small" color={s.open ? 'warning' : 'default'} label={s.open ? 'Abierta' : `${s.days} día(s)`} />
                  </Stack>
                }
              >
                <DataList
                  items={[
                    ['Suspendido el', fDateOnly(s.suspensionDate)],
                    ['Reanudado el', s.liftDate ? `${fDateOnly(s.liftDate)} con el otrosí N.º ${s.amendmentNumber}` : 'Sigue suspendido'],
                    ['Condición de levantamiento', s.liftCondition],
                    ['Genera informe de interventoría', s.requiresReport ? 'Sí' : 'No'],
                    ['Observación', s.observation],
                    ['Registrada', `${fDateTime(s.createdAt)} por ${s.createdByName ?? '—'}`]
                  ]}
                />
              </SubCard>
            ))}
          </Stack>
        ))}

      {tab === 'policies' && (
        <Pending
          title="Todavía no hay pólizas en este contrato."
          text="Aquí se verán las pólizas que amparan cada concepto, con su vigencia y los conceptos sin amparo. Llega con el módulo de pólizas."
        />
      )}
      {tab === 'invoices' && <ContractInvoicesTab contract={contract} />}
      {tab === 'documents' && (
        <Pending
          title="Todavía no hay documentos en este contrato."
          text="Aquí se adjuntarán los soportes del contrato. Llega con los adjuntos por entidad (PRO-FE-18)."
        />
      )}

      <SuspendDialog
        open={suspending}
        contract={{ ctrId: contract.ctrId, number: contract.number, startDate: contract.startDate }}
        onClose={() => setSuspending(false)}
        onSaved={suspended}
      />

      <ConfirmDialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={remove}
        title="Eliminar contrato"
        message={`¿Eliminar el contrato "${contract.number} — ${contract.name}"? Se conserva en el historial con sus conceptos, y su número queda libre en la obra.`}
        confirmLabel="Eliminar"
        confirmColor="error"
      />
    </RouteDialog>
  );
}
