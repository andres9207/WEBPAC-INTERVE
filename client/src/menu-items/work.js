// assets
import { IconBuilding, IconContract, IconFileDescription, IconHome, IconTruck } from '@tabler/icons-react';

import { contractPath } from 'utils/constants';

// ==============================|| WORK MENU ITEMS ||============================== //
// Solo alimenta las migas de pan: el sidebar sale de tbl_pages. Obras,
// proveedores y contratos están en el grupo Inicio (migración 0111). Con
// menús de contratos (DEC-077), Contratos es un desplegable con "Todos" y una
// entrada por tipo de proveedor; las fija el sidebar (`setContractMenus`).

const contracts = {
  id: 'contracts',
  title: 'Contratos',
  type: 'item',
  url: '/work/contracts',
  icon: IconFileDescription,
  breadcrumbs: true
};

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
        contracts
      ]
    }
  ]
};

/** Entradas del menú Contratos: `[{ pvtId, name }]`, en el orden del sidebar. Sin ninguna, una página. */
export const setContractMenus = (menus) => {
  if (menus.length === 0) {
    Object.assign(contracts, { type: 'item', url: '/work/contracts', children: undefined });
    return;
  }
  Object.assign(contracts, {
    type: 'collapse',
    url: undefined,
    children: [
      { id: 'contracts-all', title: 'Todos', type: 'item', url: contractPath(), icon: IconFileDescription, breadcrumbs: true },
      ...menus.map(({ pvtId, name }) => ({
        id: `contracts-${pvtId}`,
        title: name,
        type: 'item',
        url: contractPath(pvtId),
        icon: IconContract,
        breadcrumbs: true
      }))
    ]
  });
};

export default work;
