// assets
import { IconFileInvoice, IconReceipt } from '@tabler/icons-react';

// ==============================|| BILLING MENU ITEMS ||============================== //
// Solo alimenta las migas de pan: el sidebar sale de tbl_pages (DEC-042).

const billing = {
  id: 'billing',
  title: 'Facturación',
  type: 'group',
  children: [
    {
      id: 'billing-collapse',
      title: 'Facturación',
      type: 'collapse',
      icon: IconReceipt,
      children: [
        {
          id: 'invoices',
          title: 'Facturas',
          type: 'item',
          url: '/billing/invoices',
          icon: IconFileInvoice,
          breadcrumbs: true
        }
      ]
    }
  ]
};

export default billing;
