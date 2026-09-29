// assets
import { IconSettings, IconId, IconTruck, IconMapPin, IconUmbrella } from '@tabler/icons-react';

// constant
const icons = { IconSettings, IconId, IconTruck, IconMapPin, IconUmbrella };

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
        },
        {
          id: 'providerTypes',
          title: 'Tipos de proveedor',
          type: 'item',
          url: '/admin/providerTypes',
          icon: icons.IconTruck,
          breadcrumbs: true
        },
        {
          id: 'addressTypes',
          title: 'Tipos de dirección',
          type: 'item',
          url: '/admin/addressTypes',
          icon: icons.IconMapPin,
          breadcrumbs: true
        },
        {
          id: 'insurers',
          title: 'Aseguradoras',
          type: 'item',
          url: '/admin/insurers',
          icon: icons.IconUmbrella,
          breadcrumbs: true
        }
      ]
    }
  ]
};

export default admin;
