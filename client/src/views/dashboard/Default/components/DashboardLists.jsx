import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import MainCard from 'ui-component/cards/MainCard';
import { fDateOnly } from 'utils/formatTime';
import { INVOICE_STATE_COLORS } from 'utils/constants';

// Bloques de lista del tablero (DEC-052). Todo lo cuenta el servidor; aquí
// solo se presenta y se enlaza al registro o al listado filtrado.

const VALIDITY_COLORS = { NO_DATE: 'default', ACTIVE: 'success', EXPIRING: 'warning', EXPIRED: 'error' };
const num = { fontVariantNumeric: 'tabular-nums' };

function Empty({ children }) {
  return (
    <Typography variant="body2" color="text.secondary">
      {children}
    </Typography>
  );
}

Empty.propTypes = { children: PropTypes.node };

/** Obras activas con más movimiento: contratos y facturas (las cifras que el usuario puede ver). */
export function WorksActivityCard({ works }) {
  const navigate = useNavigate();
  const showContracts = works.some((w) => w.contracts !== null);
  const showInvoices = works.some((w) => w.invoices !== null);
  return (
    <MainCard title="Obras en seguimiento" sx={{ height: '100%' }} contentSX={{ px: 0 }}>
      {works.length === 0 ? (
        <Stack sx={{ px: 3 }}>
          <Empty>Ninguna obra activa tiene contratos ni facturas todavía.</Empty>
        </Stack>
      ) : (
        <Table size="small" aria-label="Obras en seguimiento">
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>Obra</TableCell>
              {showContracts && <TableCell align="right">Contratos</TableCell>}
              {showInvoices && (
                <TableCell align="right" sx={{ pr: 3 }}>
                  Facturas
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {works.map((w) => (
              <TableRow key={w.wrkId} hover sx={{ cursor: 'pointer' }} onClick={() => navigate(`/work/works/${w.wrkId}`)}>
                <TableCell sx={{ pl: 3 }}>
                  <Link component={RouterLink} to={`/work/works/${w.wrkId}`} underline="hover" onClick={(e) => e.stopPropagation()}>
                    {w.workCode}
                  </Link>
                  <Typography variant="caption" color="text.secondary" component="div">
                    {w.workName}
                  </Typography>
                </TableCell>
                {showContracts && (
                  <TableCell align="right" sx={num}>
                    {w.contracts ?? '—'}
                  </TableCell>
                )}
                {showInvoices && (
                  <TableCell align="right" sx={{ ...num, pr: 3 }}>
                    {w.invoices ?? '—'}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </MainCard>
  );
}

WorksActivityCard.propTypes = { works: PropTypes.arrayOf(PropTypes.object).isRequired };

/** Alertas calculadas (no notificaciones): cada una con su cifra y su listado. Solo las que tienen algo. */
export function AlertsCard({ alerts }) {
  const active = alerts.filter((a) => a.count > 0);
  return (
    <MainCard title="Alertas" sx={{ height: '100%' }} contentSX={{ px: 1.5 }}>
      {active.length === 0 ? (
        <Stack sx={{ px: 1.5 }}>
          <Empty>Sin alertas: no hay pólizas vencidas ni por vencer, facturas por aprobar ni contratos suspendidos.</Empty>
        </Stack>
      ) : (
        <List disablePadding aria-label="Alertas">
          {active.map(({ key, count, label, hint, icon: Icon, tone, to }) => (
            <ListItemButton key={key} component={RouterLink} to={to} sx={{ borderRadius: 1, gap: 1.5 }}>
              <Avatar variant="rounded" sx={{ width: 36, height: 36, bgcolor: tone.bg, color: tone.fg, borderRadius: 1.5 }} aria-hidden>
                <Icon size={20} stroke={1.8} />
              </Avatar>
              <ListItemText
                primary={`${count} ${label}`}
                secondary={hint}
                slotProps={{ primary: { variant: 'subtitle1' }, secondary: { variant: 'caption' } }}
              />
            </ListItemButton>
          ))}
        </List>
      )}
    </MainCard>
  );
}

AlertsCard.propTypes = { alerts: PropTypes.arrayOf(PropTypes.object).isRequired };

/** Últimas facturas registradas, de cualquier estado. */
export function LatestInvoicesCard({ invoices }) {
  return (
    <MainCard
      title="Últimas facturas registradas"
      secondary={
        <Link component={RouterLink} to="/billing/invoices" underline="hover" variant="body2">
          Ver todas
        </Link>
      }
      sx={{ height: '100%' }}
      contentSX={{ px: 1.5 }}
    >
      {invoices.length === 0 ? (
        <Stack sx={{ px: 1.5 }}>
          <Empty>Todavía no hay facturas.</Empty>
        </Stack>
      ) : (
        <List disablePadding aria-label="Últimas facturas registradas">
          {invoices.map((inv) => (
            <ListItemButton key={inv.invId} component={RouterLink} to={`/billing/invoices/${inv.invId}`} sx={{ borderRadius: 1, gap: 1 }}>
              <ListItemText
                primary={`${inv.typeName} ${inv.number}`}
                secondary={[inv.providerName, inv.workCode, fDateOnly(inv.date)].filter(Boolean).join(' · ')}
                slotProps={{ primary: { variant: 'subtitle1' }, secondary: { variant: 'caption' } }}
              />
              <Chip size="small" label={inv.stateName} color={INVOICE_STATE_COLORS[inv.state]} variant="outlined" />
            </ListItemButton>
          ))}
        </List>
      )}
    </MainCard>
  );
}

LatestInvoicesCard.propTypes = { invoices: PropTypes.arrayOf(PropTypes.object).isRequired };

/** Pólizas vigentes vencidas o por vencer, las más próximas primero. */
export function UpcomingPoliciesCard({ policies, expiringDays }) {
  return (
    <MainCard title="Pólizas vencidas o por vencer" sx={{ height: '100%' }} contentSX={{ px: 1.5 }}>
      {policies.length === 0 ? (
        <Stack sx={{ px: 1.5 }}>
          <Empty>Ninguna póliza vigente vence en los próximos {expiringDays} días.</Empty>
        </Stack>
      ) : (
        <List disablePadding aria-label="Pólizas vencidas o por vencer">
          {policies.map((p) => (
            <ListItemButton key={p.polId} component={RouterLink} to={`/work/contracts/${p.ctrId}`} sx={{ borderRadius: 1, gap: 1 }}>
              <ListItemText
                primary={`${p.number} · ${p.typeName ?? ''}`}
                secondary={`Contrato ${p.contractNumber} · ${p.workCode} · vence ${fDateOnly(p.endDate)}`}
                slotProps={{ primary: { variant: 'subtitle1' }, secondary: { variant: 'caption' } }}
              />
              <Chip size="small" label={p.validityName} color={VALIDITY_COLORS[p.validity]} variant="outlined" />
            </ListItemButton>
          ))}
        </List>
      )}
    </MainCard>
  );
}

UpcomingPoliciesCard.propTypes = { policies: PropTypes.arrayOf(PropTypes.object).isRequired, expiringDays: PropTypes.number.isRequired };

/** Accesos rápidos: solo los que el usuario puede usar (el servidor vuelve a verificar). */
export function QuickAccessCard({ links }) {
  if (links.length === 0) return null;
  return (
    <MainCard title="Accesos rápidos" sx={{ height: '100%' }}>
      <Stack
        component="nav"
        aria-label="Accesos rápidos"
        sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 1.5 }}
      >
        {links.map(({ label, to, icon: Icon, tone }) => (
          <ButtonBase
            key={to}
            component={RouterLink}
            to={to}
            focusRipple
            sx={{
              flexDirection: 'column',
              gap: 1,
              p: 1.5,
              minHeight: 88,
              borderRadius: 1,
              border: 1,
              borderColor: 'divider',
              '&:hover': { borderColor: 'primary.main' }
            }}
          >
            <Avatar variant="rounded" sx={{ width: 36, height: 36, bgcolor: tone.bg, color: tone.fg, borderRadius: 1.5 }} aria-hidden>
              <Icon size={20} stroke={1.8} />
            </Avatar>
            <Typography variant="body2" sx={{ textAlign: 'center', fontWeight: 500 }}>
              {label}
            </Typography>
          </ButtonBase>
        ))}
      </Stack>
    </MainCard>
  );
}

QuickAccessCard.propTypes = { links: PropTypes.arrayOf(PropTypes.object).isRequired };
