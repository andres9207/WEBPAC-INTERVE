// assets
import { IconFileInvoice, IconReceipt } from '@tabler/icons-react';

import { invoicePath } from 'utils/constants';

// ==============================|| BILLING MENU ITEMS ||============================== //
// Solo alimenta las migas de pan: el sidebar sale de tbl_pages (DEC-042). Los
// menús de facturas son dinámicos (DEC-074): una entrada por tipo de
// proveedor con la casilla del menú. Las fija el sidebar con las que le da el
// servidor (`setBillingMenus`), así que las migas no repiten esa lista.

const collapse = {
  id: 'billing-collapse',
  title: 'Facturas',
  type: 'collapse',
  icon: IconReceipt,
  children: []
};

const billing = {
  id: 'billing',
  title: 'Facturas',
  type: 'group',
  children: [collapse]
};

/** Entradas del grupo Facturas: `[{ pvtId, name }]`, en el orden del sidebar. */
export const setBillingMenus = (menus) => {
  collapse.children = menus.map(({ pvtId, name }) => ({
    id: `invoices-${pvtId}`,
    title: name,
    type: 'item',
    url: invoicePath(pvtId),
    icon: IconFileInvoice,
    breadcrumbs: true
  }));
};

export default billing;
