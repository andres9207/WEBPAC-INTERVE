// assets
import { IconFileInvoice, IconReceipt } from '@tabler/icons-react';

import { INVOICE_VIEWS, invoicePath } from 'utils/constants';

// ==============================|| BILLING MENU ITEMS ||============================== //
// Solo alimenta las migas de pan: el sidebar sale de tbl_pages (DEC-042). Una
// entrada por vista de facturas (DEC-054).

const billing = {
  id: 'billing',
  title: 'Facturas',
  type: 'group',
  children: [
    {
      id: 'billing-collapse',
      title: 'Facturas',
      type: 'collapse',
      icon: IconReceipt,
      children: Object.entries(INVOICE_VIEWS).map(([view, { title }]) => ({
        id: `invoices-${view.toLowerCase()}`,
        title,
        type: 'item',
        url: invoicePath(view),
        icon: IconFileInvoice,
        breadcrumbs: true
      }))
    }
  ]
};

export default billing;
