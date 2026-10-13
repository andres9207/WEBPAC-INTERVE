import { useCallback, useRef, useState } from 'react';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import BaseDialog from 'ui-component/extended/BaseDialog';
import { providerInvoiceViewName } from 'utils/constants';

/** Código del 409 con que el servidor pide la decisión (DEC-056). */
const INVOICE_VIEW_CHANGE = 'INVOICE_VIEW_CHANGE';

/**
 * Cambio de menú de facturas de un proveedor (DEC-056): cambiar sus tipos, o
 * el menú de un tipo de proveedor, mueve el menú de sus facturas nuevas. Si
 * ya tiene facturas de contrato, el servidor responde 409 con
 * `code: INVOICE_VIEW_CHANGE` y el usuario decide moverlas todas al menú
 * nuevo o dejarlas como histórico en el que se registraron.
 *
 * `withInvoiceMove(save)` envuelve una función `save(payload, key)`: ante ese
 * 409 pregunta y reintenta con `invoiceMove` (`MOVE` o `KEEP`). Cancelar
 * rechaza con un error cuyo mensaje dice que no se guardó. `dialog` se monta
 * en la pantalla.
 */
export default function useInvoiceViewChange() {
  const [pending, setPending] = useState(null);
  const resolver = useRef(null);

  const ask = useCallback(
    (data) =>
      new Promise((resolve) => {
        resolver.current = resolve;
        setPending(data);
      }),
    []
  );

  const answer = (choice) => {
    resolver.current?.(choice);
    resolver.current = null;
    setPending(null);
  };

  const withInvoiceMove = useCallback(
    (save) => async (payload, key) => {
      try {
        return await save(payload, key);
      } catch (err) {
        const data = err.response?.status === 409 ? err.response?.data?.data : null;
        if (data?.code !== INVOICE_VIEW_CHANGE) throw err;
        const choice = await ask(data);
        if (!choice) {
          const cancelled = new Error('Cambio cancelado: no se guardó.');
          cancelled.response = { data: { message: 'Cambio cancelado: no se guardó.' } };
          throw cancelled;
        }
        return save({ ...payload, invoiceMove: choice }, key);
      }
    },
    [ask]
  );

  const dialog = (
    <BaseDialog
      open={Boolean(pending)}
      onClose={() => answer(null)}
      title="Facturas en otro menú"
      maxWidth="sm"
      actions={
        <>
          <Button onClick={() => answer(null)}>Cancelar</Button>
          <Button variant="outlined" color="secondary" onClick={() => answer('KEEP')}>
            Dejarlas como histórico
          </Button>
          <Button variant="contained" color="secondary" onClick={() => answer('MOVE')} disabled={!pending?.canMove}>
            Mover todas
          </Button>
        </>
      }
    >
      {pending && (
        <Stack spacing={2}>
          <Typography>
            El cambio mueve el menú de facturas de{' '}
            {pending.providers.length === 1 ? 'un proveedor' : `${pending.providers.length} proveedores`} que ya{' '}
            {pending.invoices === 1 ? 'tiene 1 factura' : `tienen ${pending.invoices} facturas`} de contrato:
          </Typography>
          <Stack component="ul" spacing={0.5} sx={{ m: 0, pl: 3 }}>
            {pending.providers.map((p) => (
              <Typography component="li" key={p.prvId} variant="body2">
                <strong>{p.name ?? `Proveedor ${p.prvId}`}</strong>: {p.invoices} factura(s), de «{providerInvoiceViewName(p.from)}» a «
                {providerInvoiceViewName(p.to)}»
              </Typography>
            ))}
          </Stack>
          <Typography variant="body2" color="text.secondary">
            <strong>Mover todas</strong> las pasa al menú nuevo y queda en la bitácora de cada factura.{' '}
            <strong>Dejarlas como histórico</strong> las mantiene en el menú en que se registraron. Las facturas nuevas van al menú nuevo.
          </Typography>
          {!pending.canMove && (
            <Alert severity="info">Algún proveedor queda sin menú de facturas: sus facturas solo pueden quedar como histórico.</Alert>
          )}
        </Stack>
      )}
    </BaseDialog>
  );

  return { withInvoiceMove, dialog };
}
