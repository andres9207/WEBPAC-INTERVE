import { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
  IconAlertTriangle,
  IconBuildingCommunity,
  IconCalendarX,
  IconChecklist,
  IconClockHour4,
  IconFilePlus,
  IconFileText,
  IconFlag,
  IconPlayerPause,
  IconReceipt,
  IconShieldCheck,
  IconShieldX,
  IconTruck,
  IconUsers
} from '@tabler/icons-react';

import { getDashboardSummaryAPI } from 'api/requests/dashboardApi';
import { useAuth } from 'contexts/AuthContext';
import { useWorkScope } from 'contexts/WorkScopeContext';
import { ALL_WORKS } from 'utils/workScope';
import { ACTION_TONES } from 'ui-component/extended/ActionButton';
import { showError } from 'services/ToastService';
import { gridSpacing } from 'store/constant';
import { fDateOnly } from 'utils/formatTime';
import { invoicePath } from 'utils/constants';
import { useInvoiceMenus } from 'hooks/useInvoiceMenus';

import DashboardCards from './components/DashboardCards';
import PolicyStatusCard from './components/PolicyStatusCard';
import InvoicesByWorkCard from './components/InvoicesByWorkCard';
import { AlertsCard, LatestInvoicesCard, QuickAccessCard, UpcomingPoliciesCard, WorksActivityCard } from './components/DashboardLists';
import useSummaryDrill from './components/useSummaryDrill';
import { daysOpenText, followUpsDrill, useDrillDown } from './work/DrillDownDialog';
import { dashboardTo } from './work/workDashboard.utils';

/**
 * Tablero general (ADR-0002, DEC-052), con "Ver todo" en el encabezado; con
 * una obra elegida se ve el de la obra (WorkDashboard, DEC-063). Todas las cifras las calcula el servidor
 * (FRONTEND_STANDARD, regla 9) en el alcance de la obra elegida en el
 * encabezado: cambiar de obra vuelve a montar la vista y recarga. Cada bloque
 * llega en null si el usuario no puede ver su módulo, y entonces no se
 * dibuja. El clic en una cifra, una barra o una alerta abre su detalle en el
 * tablero (DEC-052, "Detalle de cada cifra"): las filas las pide al servidor
 * con el mismo predicado que la produjo (useSummaryDrill), y cada una abre su
 * expediente encima del tablero.
 *
 * Estilo Berry, solo tema claro (DEC-052): los colores salen de la paleta.
 */

const countOf = (list, key, value) => list?.find((item) => item[key] === value)?.count ?? 0;

// `reloadKey`: sube cuando un expediente abierto encima cambia algo (p. ej. un seguimiento); se recarga.
export default function GeneralDashboard({ reloadKey = 0 }) {
  const { user, permissionsCatalog, hasPermission } = useAuth();
  const { activeWork, works } = useWorkScope();
  const [summary, setSummary] = useState(null);
  const [failed, setFailed] = useState(false);
  // Detalle de cada cifra, sin salir del tablero: las de seguimientos (DEC-076)
  // y contratos por liquidar llegan con el resumen; las demás, al abrirlo.
  const { openDrill, dialog } = useDrillDown();
  const { openMetric, dialog: metricDialog } = useSummaryDrill();

  useEffect(() => {
    let active = true;
    getDashboardSummaryAPI()
      .then(({ data }) => active && setSummary(data))
      .catch((err) => {
        if (!active) return;
        setFailed(true);
        showError(err.response?.data?.message || 'Error al cargar el tablero');
      });
    return () => {
      active = false;
    };
  }, [reloadKey]);

  const scopeLabel =
    activeWork === ALL_WORKS ? 'Todas las obras' : (works.find((w) => w.value === activeWork)?.label ?? 'Sin obra seleccionada');

  const s = summary ?? {};
  // Menús de facturas visibles (DEC-074): los enlaces generales van al primero.
  const invoiceMenus = useInvoiceMenus();
  const firstMenu = invoiceMenus[0]?.pvtId;
  const openContracts = useCallback((title, params) => openMetric({ title, noun: ['contrato', 'contratos'], params }), [openMetric]);
  const openPolicyStatus = useCallback(
    (policyStatus, title) => openContracts(title, { metric: 'CONTRACTS_POLICY_STATUS', policyStatus }),
    [openContracts]
  );
  const openUncovered = useCallback(
    () => openContracts('Contratos con conceptos sin póliza', { metric: 'CONTRACTS_UNCOVERED' }),
    [openContracts]
  );
  const openWorkInvoices = useCallback(
    (work, invoiceState) =>
      openMetric({
        title: `Facturas de ${work.workCode}`,
        noun: ['factura', 'facturas'],
        params: { metric: 'INVOICES_BY_WORK', wrkId: work.wrkId, ...(invoiceState ? { invoiceState } : {}) },
        emptyText: 'La obra no tiene facturas registradas ni aprobadas.'
      }),
    [openMetric]
  );
  const cards = useMemo(() => {
    if (!summary) return [];
    const items = [];
    if (s.works) {
      items.push({
        label: 'Obras activas',
        value: String(s.works.active),
        hint: 'Proyectos en curso',
        icon: IconBuildingCommunity,
        tone: ACTION_TONES.info,
        onClick: () => openMetric({ title: 'Obras activas', noun: ['obra', 'obras'], params: { metric: 'WORKS_ACTIVE' } })
      });
    }
    if (s.providers) {
      items.push({
        label: 'Proveedores activos',
        value: String(s.providers.active),
        hint: 'Asignados a las obras',
        icon: IconTruck,
        tone: ACTION_TONES.edit,
        onClick: () =>
          openMetric({ title: 'Proveedores activos', noun: ['proveedor', 'proveedores'], params: { metric: 'PROVIDERS_ACTIVE' } })
      });
    }
    if (s.contracts) {
      items.push({
        label: 'Contratos en ejecución',
        value: String(countOf(s.contracts.byState, 'state', 'IN_PROGRESS')),
        hint: `De ${s.contracts.total} contratos`,
        icon: IconFileText,
        tone: ACTION_TONES.success,
        onClick: () => openContracts('Contratos en ejecución', { metric: 'CONTRACTS_BY_STATE', state: 'IN_PROGRESS' })
      });
    }
    if (s.invoices?.followUps) {
      const { count, items: followUps } = s.invoices.followUps;
      const oldest = followUps[0];
      items.push({
        label: 'Seguimientos abiertos',
        value: String(count),
        hint: oldest
          ? `El más antiguo: ${oldest.typeName} ${oldest.number}, ${daysOpenText(oldest.daysOpen).toLowerCase()}`
          : 'Ninguna factura en seguimiento',
        icon: IconFlag,
        tone: ACTION_TONES.edit,
        onClick: () => openDrill(followUpsDrill(s.invoices.followUps, { withWork: true }))
      });
    }
    if (s.policies) {
      items.push({
        label: 'Pólizas vigentes',
        value: String(s.policies.currentPolicies),
        hint: 'Sin contar versiones anteriores ni anuladas',
        icon: IconShieldCheck,
        tone: ACTION_TONES.neutral,
        onClick: () => openMetric({ title: 'Pólizas vigentes', noun: ['póliza', 'pólizas'], params: { metric: 'CURRENT_POLICIES' } })
      });
    }
    return items;
  }, [summary, s.works, s.providers, s.contracts, s.policies, s.invoices, openDrill, openMetric, openContracts]);

  const alerts = useMemo(() => {
    if (!summary) return [];
    const list = [];
    if (s.policies) {
      list.push(
        {
          key: 'expired',
          count: countOf(s.policies.byStatus, 'status', 'EXPIRED'),
          label: 'contrato(s) con póliza vencida',
          hint: 'Renovar o anular desde el expediente',
          icon: IconShieldX,
          tone: ACTION_TONES.danger,
          onClick: () => openPolicyStatus('EXPIRED', 'Contratos con póliza vencida')
        },
        {
          key: 'expiring',
          count: countOf(s.policies.byStatus, 'status', 'EXPIRING'),
          label: 'contrato(s) con póliza por vencer',
          hint: `En los próximos ${s.expiringDays} días`,
          icon: IconClockHour4,
          tone: ACTION_TONES.danger,
          onClick: () => openPolicyStatus('EXPIRING', 'Contratos con póliza por vencer')
        },
        {
          key: 'uncovered',
          count: s.policies.uncoveredContracts,
          label: 'contrato(s) con conceptos sin póliza',
          hint: 'Algún concepto sin póliza vigente',
          icon: IconAlertTriangle,
          tone: ACTION_TONES.info,
          onClick: openUncovered
        }
      );
    }
    if (s.invoices) {
      // Una sola alerta con las de todos los menús (DEC-074): el detalle las
      // junta, y el texto dice cuántas son de cada menú.
      const pending = (s.invoices.pendingByMenu ?? []).filter((p) => p.count > 0);
      list.push({
        key: 'pending',
        count: s.invoices.pendingApproval,
        label: 'factura(s) por aprobar',
        hint: pending.length > 1 ? pending.map((p) => `${p.name}: ${p.count}`).join(' · ') : 'Registradas, pendientes de aprobación',
        icon: IconReceipt,
        tone: ACTION_TONES.edit,
        onClick: () => openMetric({ title: 'Facturas por aprobar', noun: ['factura', 'facturas'], params: { metric: 'INVOICES_PENDING' } })
      });
    }
    if (s.contracts) {
      list.push({
        key: 'expired-contracts',
        count: s.contracts.expired,
        label: 'contrato(s) vencido(s)',
        hint: 'En ejecución con la fecha fin ya pasada',
        icon: IconCalendarX,
        tone: ACTION_TONES.danger,
        onClick: () => openContracts('Contratos vencidos', { metric: 'CONTRACTS_EXPIRED' })
      });
      list.push({
        key: 'suspended',
        count: countOf(s.contracts.byState, 'state', 'SUSPENDED'),
        label: 'contrato(s) suspendido(s)',
        hint: 'Esperan el otrosí que los reanuda',
        icon: IconPlayerPause,
        tone: ACTION_TONES.neutral,
        onClick: () => openContracts('Contratos suspendidos', { metric: 'CONTRACTS_BY_STATE', state: 'SUSPENDED' })
      });
      // Obras finalizadas con contratos por liquidar (DEC-083): el detalle lista cada contrato con su obra.
      const finished = s.contracts.finishedWorksToLiquidate;
      if (finished?.contracts > 0) {
        list.push({
          key: 'to-liquidate',
          count: finished.contracts,
          label: 'contrato(s) por liquidar en obras finalizadas',
          hint: finished.works.map((w) => w.code).join(', '),
          icon: IconChecklist,
          tone: ACTION_TONES.danger,
          onClick: () =>
            openDrill({
              title: 'Contratos por liquidar en obras finalizadas',
              noun: ['contrato', 'contratos'],
              rows: finished.works.flatMap((w) =>
                w.contracts.map((c) => ({
                  key: `ctr-${c.ctrId}`,
                  to: dashboardTo.contract(c.ctrId),
                  primary: `${c.number} · ${c.name}`,
                  secondary: [`${w.code} (finalizada el ${fDateOnly(w.finishDate)})`, c.providerName, c.stateName]
                    .filter(Boolean)
                    .join(' · '),
                  value: ''
                }))
              )
            })
        });
      }
    }
    return list;
  }, [summary, s.policies, s.invoices, s.contracts, s.expiringDays, openDrill, openMetric, openContracts, openPolicyStatus, openUncovered]);

  // Accesos rápidos según permisos (experiencia de uso: el servidor vuelve a verificar).
  const canDo = (perId) => perId != null && hasPermission(perId);
  const quickLinks = [
    {
      label: 'Registrar factura',
      to: invoicePath(firstMenu, 'new'),
      perId: firstMenu ? permissionsCatalog.billing?.invoices?.create : null,
      icon: IconFilePlus,
      tone: ACTION_TONES.edit
    },
    {
      label: 'Nuevo contrato',
      to: '/work/contracts/new',
      perId: permissionsCatalog.work?.contracts?.create,
      icon: IconFileText,
      tone: ACTION_TONES.info
    },
    {
      label: 'Nueva obra',
      to: '/work/works/new',
      perId: permissionsCatalog.work?.works?.create,
      icon: IconBuildingCommunity,
      tone: ACTION_TONES.success
    },
    {
      label: 'Nuevo proveedor',
      to: '/work/providers/new',
      perId: permissionsCatalog.work?.providers?.create,
      icon: IconTruck,
      tone: ACTION_TONES.edit
    },
    {
      label: 'Usuarios',
      to: '/security/users',
      perId: permissionsCatalog.security?.users?.view,
      icon: IconUsers,
      tone: ACTION_TONES.neutral
    }
  ].filter((link) => canDo(link.perId));

  const nothingVisible = summary && !s.works && !s.providers && !s.contracts && !s.policies && !s.invoices;

  return (
    <Stack spacing={gridSpacing}>
      <Stack spacing={0.5}>
        <Typography variant="h3" component="h1">
          Bienvenido{user?.fullName ? `, ${user.fullName}` : ''}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {scopeLabel}
          {summary ? ` · cifras al ${fDateOnly(summary.referenceDate)}` : ''}
        </Typography>
      </Stack>

      {!summary && !failed && (
        <Typography variant="body2" color="text.secondary">
          Cargando…
        </Typography>
      )}
      {failed && !summary && (
        <Typography variant="body2" color="text.secondary">
          No se pudo cargar el tablero. Recarga la página para intentarlo de nuevo.
        </Typography>
      )}
      {nothingVisible && (
        <Typography variant="body2" color="text.secondary">
          Tu perfil no tiene permiso para ver obras, proveedores, contratos ni facturas: el tablero no tiene cifras que mostrarte.
        </Typography>
      )}

      {summary && (
        <>
          <DashboardCards items={cards} />

          {(s.policies || alerts.length > 0) && (
            <Grid container spacing={gridSpacing}>
              {s.policies && (
                <Grid size={{ xs: 12, lg: 8 }}>
                  <PolicyStatusCard
                    policies={s.policies}
                    expiringDays={s.expiringDays}
                    onOpen={(category) => openPolicyStatus(category.status, `Contratos: ${category.name.toLowerCase()}`)}
                    onOpenUncovered={openUncovered}
                  />
                </Grid>
              )}
              {alerts.length > 0 && (
                <Grid size={{ xs: 12, lg: s.policies ? 4 : 12 }}>
                  <AlertsCard alerts={alerts} />
                </Grid>
              )}
            </Grid>
          )}

          {(s.worksActivity || s.invoices) && (
            <Grid container spacing={gridSpacing}>
              {s.worksActivity && (
                <Grid size={{ xs: 12, lg: s.invoices ? 5 : 12 }}>
                  <WorksActivityCard works={s.worksActivity} />
                </Grid>
              )}
              {s.invoices && (
                <Grid size={{ xs: 12, lg: s.worksActivity ? 7 : 12 }}>
                  <InvoicesByWorkCard byWork={s.invoices.byWork} onOpen={openWorkInvoices} />
                </Grid>
              )}
            </Grid>
          )}

          <Grid container spacing={gridSpacing}>
            {s.invoices && (
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <LatestInvoicesCard invoices={s.invoices.latest} allPath={invoiceMenus.length === 1 ? invoicePath(firstMenu) : undefined} />
              </Grid>
            )}
            {s.policies && (
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <UpcomingPoliciesCard policies={s.policies.upcoming} expiringDays={s.expiringDays} />
              </Grid>
            )}
            {quickLinks.length > 0 && (
              <Grid size={{ xs: 12, lg: 4 }}>
                <QuickAccessCard links={quickLinks} />
              </Grid>
            )}
          </Grid>
        </>
      )}
      {dialog}
      {metricDialog}
    </Stack>
  );
}

GeneralDashboard.propTypes = { reloadKey: PropTypes.number };
