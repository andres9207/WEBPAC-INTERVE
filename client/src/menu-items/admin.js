// assets
import { IconSettings, IconId } from '@tabler/icons-react';

// constant
const icons = { IconSettings, IconId };

// ==============================|| ADMIN MENU ITEMS ||============================== //
// Solo alimenta las migas de pan: el sidebar sale de tbl_pages.

const admin = {
  id: 'admin',
  title: 'Administración',
  type: 'group',
  children: [
    {
      id: 'admin-collapse',
      title: 'Administración',
      type: 'collapse',
      icon: icons.IconSettings,
      children: [
        {
          id: 'identityDocuments',
          title: 'Tipos de identificación',
          type: 'item',
          url: '/admin/identityDocuments',
          icon: icons.IconId,
          breadcrumbs: true
        }
      ]
    }
  ]
};

export default admin;
