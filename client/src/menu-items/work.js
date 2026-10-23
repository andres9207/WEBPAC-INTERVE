// assets
import { IconBuilding, IconFileDescription, IconHome, IconTruck } from '@tabler/icons-react';

// ==============================|| WORK MENU ITEMS ||============================== //
// Solo alimenta las migas de pan: el sidebar sale de tbl_pages. Obras,
// proveedores y contratos están en el grupo Inicio (migración 0111).

const work = {
  id: 'work',
  title: 'Inicio',
  type: 'group',
  children: [
    {
      id: 'work-collapse',
      title: 'Inicio',
      type: 'collapse',
      icon: IconHome,
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
        },
        {
          id: 'contracts',
          title: 'Contratos',
          type: 'item',
          url: '/work/contracts',
          icon: IconFileDescription,
          breadcrumbs: true
        }
      ]
    }
  ]
};

export default work;
