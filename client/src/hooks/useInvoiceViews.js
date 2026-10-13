import { useMemo } from 'react';

import { useAuth } from 'contexts/AuthContext';
import { INVOICE_VIEWS } from 'utils/constants';

/**
 * Vistas de facturas que el usuario ve (DEC-054), en el orden del menú:
 * `['SIMPLE', 'MAJOR']`. Cada una exige su permiso de ver; el servidor lo
 * vuelve a verificar. Con el catálogo cargando, ninguna.
 */
export default function useInvoiceViews() {
  const { permissionsCatalog, hasPermission } = useAuth();
  const perms = permissionsCatalog.billing?.invoices;
  return useMemo(
    () =>
      Object.keys(INVOICE_VIEWS).filter((view) => {
        const perId = perms?.[INVOICE_VIEWS[view].permission];
        return perId != null && hasPermission(perId);
      }),
    [perms, hasPermission]
  );
}
