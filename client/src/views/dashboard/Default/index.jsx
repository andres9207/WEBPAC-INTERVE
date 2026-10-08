import { useEffect, useMemo, useState } from 'react';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
  IconAlertTriangle,
  IconBuildingCommunity,
  IconClockHour4,
  IconFilePlus,
  IconFileText,
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
import { STATUS } from 'utils/constants';

import DashboardCards from './components/DashboardCards';
import PolicyStatusCard from './components/PolicyStatusCard';
import InvoicesByWorkCard from './components/InvoicesByWorkCard';
import { AlertsCard, LatestInvoicesCard, QuickAccessCard, UpcomingPoliciesCard, WorksActivityCard } from './components/DashboardLists';

/**
 * Tablero (ADR-0002, DEC-052). Todas las cifras las calcula el servidor
 * (FRONTEND_STANDARD, regla 9) en el alcance de la obra elegida en el
 * encabezado: cambiar de obra vuelve a montar la vista y recarga. Cada bloque
 * llega en null si el usuario no puede ver su módulo, y entonces no se
 * dibuja. El clic en una cifra lleva al listado con el mismo filtro que la
 * produjo, aplicado en la petición (useLinkedFilters).
 *
 * Estilo Berry, solo tema claro (DEC-052): los colores salen de la paleta.
 */

const countOf = (list, key, value) => list?.find((item) => item[key] === value)?.count ?? 0;

export default function Dashboard() {
  const { user, permissionsCatalog, hasPermission } = useAuth();
  const { activeWork, works } = useWorkScope();
  const [summary, setSummary] = useState(null);
  const [failed, setFailed] = useState(false);

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
  }, []);

  const scopeLabel =
    activeWork === ALL_WORKS ? 'Todas las obras' : (works.find((w) => w.value === activeWork)?.label ?? 'Sin obra seleccionada');

  const s = summary ?? {};
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
        to: `/work/works?status=${STATUS.ACTIVE}`
      });
    }
    if (s.providers) {
      items.push({
        label: 'Proveedores activos',
        value: String(s.providers.active),
        hint: 'Asignados a las obras',
        icon: IconTruck,
        tone: ACTION_TONES.edit,
        to: `/work/providers?status=${STATUS.ACTIVE}`
      });
    }
    if (s.contracts) {
      items.push({
        label: 'Contratos en ejecución',
        value: String(countOf(s.contracts.byState, 'state', 'IN_PROGRESS')),
        hint: `De ${s.contracts.total} contratos`,
        icon: IconFileText,
        tone: ACTION_TONES.success,
        to: '/work/contracts?status=IN_PROGRESS'
      });
    }
    if (s.policies) {
      items.push({
        label: 'Pólizas vigentes',
        value: String(s.policies.currentPolicies),
        hint: 'Sin contar versiones anteriores ni anuladas',
        icon: IconShieldCheck,
        tone: ACTION_TONES.neutral
      });
    }
    return items;
  }, [summary, s.works, s.providers, s.contracts, s.policies]);

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
          to: '/work/contracts?policyStatus=EXPIRED'
        },
        {
          key: 'expiring',
          count: countOf(s.policies.byStatus, 'status', 'EXPIRING'),
          label: 'contrato(s) con póliza por vencer',
          hint: `En los próximos ${s.expiringDays} días`,
          icon: IconClockHour4,
          tone: ACTION_TONES.danger,
          to: '/work/contracts?policyStatus=EXPIRING'
        },
        {
          key: 'uncovered',
          count: s.policies.uncoveredContracts,
          label: 'contrato(s) con conceptos sin póliza',
          hint: 'Algún concepto sin póliza vigente',
          icon: IconAlertTriangle,
          tone: ACTION_TONES.info,
          to: '/work/contracts?uncovered=true'
        }
      );
    }
    if (s.invoices) {
      list.push({
        key: 'pending',
        count: s.invoices.pendingApproval,
        label: 'factura(s) por aprobar',
        hint: 'Registradas, pendientes de aprobación',
        icon: IconReceipt,
        tone: ACTION_TONES.edit,
        to: '/billing/invoices?status=REGISTERED'
      });
    }
    if (s.contracts) {
      list.push({
        key: 'suspended',
        count: countOf(s.contracts.byState, 'state', 'SUSPENDED'),
        label: 'contrato(s) suspendido(s)',
        hint: 'Esperan el otrosí que los reanuda',
        icon: IconPlayerPause,
        tone: ACTION_TONES.neutral,
        to: '/work/contracts?status=SUSPENDED'
      });
    }
    return list;
  }, [summary, s.policies, s.invoices, s.contracts, s.expiringDays]);

  // Accesos rápidos según permisos (experiencia de uso: el servidor vuelve a verificar).
  const canDo = (perId) => perId != null && hasPermission(perId);
  const quickLinks = [
    {
      label: 'Registrar factura',
      to: '/billing/invoices/new',
      perId: permissionsCatalog.billing?.invoices?.create,
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
                  <PolicyStatusCard policies={s.policies} expiringDays={s.expiringDays} />
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
                  <InvoicesByWorkCard byWork={s.invoices.byWork} />
                </Grid>
              )}
            </Grid>
          )}

          <Grid container spacing={gridSpacing}>
            {s.invoices && (
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <LatestInvoicesCard invoices={s.invoices.latest} />
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
    </Stack>
  );
}
