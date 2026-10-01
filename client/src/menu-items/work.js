// assets
import { IconBuilding, IconTruck } from '@tabler/icons-react';

// ==============================|| WORK MENU ITEMS ||============================== //
// Solo alimenta las migas de pan: el sidebar sale de tbl_pages.

const work = {
  id: 'work',
  title: 'Obras',
  type: 'group',
  children: [
    {
      id: 'work-collapse',
      title: 'Obras',
      type: 'collapse',
      icon: IconBuilding,
      children: [
        {
          id: 'works',
          title: 'Obras',
          type: 'item',
          url: '/work/works',
          icon: IconBuilding,
          breadcrumbs: true
        },
        {
          id: 'providers',
          title: 'Proveedores',
          type: 'item',
          url: '/work/providers',
          icon: IconTruck,
          breadcrumbs: true
        }
      ]
    }
  ]
};

export default work;
