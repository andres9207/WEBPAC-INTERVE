import { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import BaseDialog from 'ui-component/extended/BaseDialog';
import { fMoneyText } from 'utils/formatNumber';
import { fDateOnly } from 'utils/formatTime';

import { dashboardTo, plural } from './workDashboard.utils';

// Detalle de una cifra o de un punto de un gráfico del tablero de la obra
// (DEC-063): las facturas o los contratos de los que sale, sin salir del
// tablero. Las filas son las que mandó el servidor y se filtran con el mismo
// criterio que produjo la cifra; el total es el de la cifra, no una suma del
// cliente (FRONTEND_STANDARD, regla 9). Cada fila abre su expediente encima
// del tablero (dashboardTo); al cerrarlo, el panel sigue abierto.

const num = { fontVariantNumeric: 'tabular-nums' };

/**
 * Facturas del tablero (`invoices.items`) como filas del detalle. `withWork`:
 * con el código de la obra (el tablero general junta varias).
 */
export const invoiceRows = (items, { withWork = false } = {}) =>
  items.map((inv) => ({
    key: `inv-${inv.invId}`,
    to: dashboardTo.invoice(inv.invId),
    primary: `${inv.typeName} ${inv.number}`,
    secondary: [withWork && inv.workCode, inv.contractNumber, inv.providerName, fDateOnly(inv.date), inv.stateName]
      .filter(Boolean)
      .join(' · '),
    value: inv.value === null ? 'Sin importes' : fMoneyText(inv.value)
  }));

/**
 * Glosas del tablero (`invoices.glosses.items`, DEC-085) como filas: la
 * factura glosada y lo que se glosó, el campo y, si se liberó, con qué
 * factura. Abrir una lleva a su factura.
 */
export const glossRows = (items) =>
  items.map((g) => ({
    key: `igl-${g.iglId}`,
    to: dashboardTo.invoice(g.invId),
    primary: `${g.invoiceTypeName} ${g.invoiceNumber} · ${g.description}`,
    secondary: [
      g.fieldName,
      g.contractNumber,
      g.providerName,
      g.statement && `levantada en el extracto ${g.statement}`,
      g.open
        ? 'abierta'
        : [
            `liberada el ${fDateOnly(g.releaseDate)}`,
            g.releaseInvoiceNumber && `con la factura ${g.releaseInvoiceNumber}`,
            g.releaseStatement && `del extracto ${g.releaseStatement}`
          ]
            .filter(Boolean)
            .join(' ')
    ]
      .filter(Boolean)
      .join(' · '),
    value: fMoneyText(g.value)
  }));

/** Días que lleva abierto un seguimiento (los calcula el servidor). */
export const daysOpenText = (days) => (days === 0 ? 'Desde hoy' : `${plural(days, 'día', 'días')}`);

/**
 * Seguimientos abiertos (`invoices.followUps.items`, DEC-076) como filas: la
 * factura, lo que se le sigue y cuántos días lleva abierto. `withWork`: con
 * el código de la obra (el tablero general junta varias).
 */
export const followUpRows = (items, { withWork = false } = {}) =>
  items.map((f) => ({
    key: `ifu-${f.ifuId}`,
    to: dashboardTo.invoice(f.invId),
    primary: `${f.typeName} ${f.number} · ${f.description}`,
    secondary: [
      withWork && f.workCode,
      f.contractNumber,
      f.providerName,
      `abierto el ${fDateOnly(f.openDate)} por ${f.createdByName ?? '—'}`
    ]
      .filter(Boolean)
      .join(' · '),
    value: daysOpenText(f.daysOpen)
  }));

/** El detalle de la cifra "Seguimientos abiertos": las filas que mandó el servidor (las más antiguas, con tope). */
export const followUpsDrill = (followUps, options) => ({
  title: 'Facturas con seguimiento abierto',
  subtitle:
    followUps.count > followUps.items.length
      ? `Los ${followUps.items.length} más antiguos de ${followUps.count}`
      : 'Del más antiguo al más reciente',
  noun: ['seguimiento', 'seguimientos'],
  rows: followUpRows(followUps.items, options),
  emptyText: 'No hay facturas con seguimiento abierto.'
});

/** Contratos del tablero (`contracts.items`) como filas, con el importe que muestra la cifra. */
export const contractRows = (items, valueOf = (c) => c.currentValue) =>
  items.map((c) => ({
    key: `ctr-${c.ctrId}`,
    to: dashboardTo.contract(c.ctrId),
    primary: `${c.number} · ${c.name}`,
    secondary: [c.providerName, c.stageName, c.stateName].filter(Boolean).join(' · '),
    value: fMoneyText(valueOf(c))
  }));

// Tablero general (DEC-052): las filas llegan del servidor por páginas.
// `loading`: se está pidiendo una página; las filas anteriores siguen a la
// vista, atenuadas, hasta que llega. `count`: el total de la cifra (el de
// todas las páginas). `toolbar` (filtros) va arriba de la lista y `footer`
// (la paginación), debajo.
export function DrillDownDialog({ drill, onClose, toolbar = null, footer = null }) {
  const shown = drill?.rows.length ?? 0;
  const count = drill?.count ?? shown;
  const noun = drill?.noun ?? ['registro', 'registros'];
  return (
    <BaseDialog open={Boolean(drill)} onClose={onClose} title={drill?.title} maxWidth={toolbar ? 'md' : 'sm'}>
      {drill && (
        <Stack spacing={1.5}>
          <Typography variant="body2" color="text.secondary">
            {[drill.subtitle, !(drill.loading && shown === 0) && plural(count, ...noun), drill.total && fMoneyText(drill.total)]
              .filter(Boolean)
              .join(' · ')}
          </Typography>
          {toolbar}
          {drill.loading && <LinearProgress aria-label="Cargando" />}
          {drill.loading && shown === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Cargando…
            </Typography>
          ) : shown === 0 ? (
            <Typography variant="body2" color="text.secondary">
              {drill.emptyText ?? 'No hay registros para mostrar.'}
            </Typography>
          ) : (
            <List disablePadding aria-label={drill.title} sx={{ opacity: drill.loading ? 0.5 : 1 }}>
              {drill.rows.map((r) => (
                <ListItemButton key={r.key} component={RouterLink} to={r.to} divider sx={{ gap: 1.5, px: 1, alignItems: 'flex-start' }}>
                  <ListItemText
                    primary={r.primary}
                    secondary={r.secondary}
                    slotProps={{ primary: { variant: 'body2', sx: { fontWeight: 500 } }, secondary: { variant: 'caption' } }}
                  />
                  <Typography variant="body2" sx={{ ...num, fontWeight: 600, whiteSpace: 'nowrap', pt: 0.25 }}>
                    {r.value}
                  </Typography>
                </ListItemButton>
              ))}
            </List>
          )}
          {footer}
        </Stack>
      )}
    </BaseDialog>
  );
}

DrillDownDialog.propTypes = {
  drill: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    total: PropTypes.string,
    count: PropTypes.number,
    loading: PropTypes.bool,
    noun: PropTypes.arrayOf(PropTypes.string),
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
    emptyText: PropTypes.string
  }),
  onClose: PropTypes.func.isRequired,
  toolbar: PropTypes.node,
  footer: PropTypes.node
};

/**
 * Estado del detalle de una pestaña: `openDrill(drill)` lo abre y `dialog` es
 * el elemento que se dibuja una vez en la pestaña.
 */
export function useDrillDown() {
  const [drill, setDrill] = useState(null);
  const close = useCallback(() => setDrill(null), []);
  const dialog = useMemo(() => <DrillDownDialog drill={drill} onClose={close} />, [drill, close]);
  return { openDrill: setDrill, dialog };
}
