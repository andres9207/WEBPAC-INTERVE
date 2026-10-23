import { useEffect, useState } from 'react';

import { useAuth } from 'contexts/AuthContext';
import { getInvoiceMenuAPI, getInvoiceMenusAPI } from 'api/requests/invoicesApi';

/**
 * Menús de facturas (DEC-074): uno por tipo de proveedor, que da el servidor.
 * Un solo permiso de ver para todos; el servidor lo vuelve a verificar.
 */

/** ¿El usuario puede ver facturas? Con el catálogo cargando, no. */
export function useCanViewInvoices() {
  const { permissionsCatalog, hasPermission } = useAuth();
  const perId = permissionsCatalog.billing?.invoices?.view;
  return perId != null && hasPermission(perId);
}

/**
 * Un menú por su tipo de proveedor: `{ menu, error }`. `menu` es
 * `{ pvtId, name, mode, menu }` (`mode`: SIMPLE o CONTRACT); null mientras carga.
 */
export function useInvoiceMenu(pvtId) {
  const [state, setState] = useState({ menu: null, error: null });

  useEffect(() => {
    let cancelled = false;
    setState({ menu: null, error: null });
    getInvoiceMenuAPI(pvtId)
      .then(({ data }) => !cancelled && setState({ menu: data, error: null }))
      .catch((err) => !cancelled && setState({ menu: null, error: err.response?.data?.message || 'No se encontró el menú de facturas.' }));
    return () => {
      cancelled = true;
    };
  }, [pvtId]);

  return state;
}

/**
 * Los menús visibles, por nombre (sin permiso de ver facturas, ninguno). Con
 * `mode`, solo los de esa forma de facturar.
 */
export function useInvoiceMenus(mode) {
  const canView = useCanViewInvoices();
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    if (!canView) {
      setMenus([]);
      return undefined;
    }
    let cancelled = false;
    getInvoiceMenusAPI()
      .then(({ data }) => !cancelled && setMenus(data))
      .catch(() => !cancelled && setMenus([]));
    return () => {
      cancelled = true;
    };
  }, [canView]);

  return mode ? menus.filter((menu) => menu.mode === mode) : menus;
}
