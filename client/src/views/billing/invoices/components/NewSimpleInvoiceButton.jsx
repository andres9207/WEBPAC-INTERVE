import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconChevronDown, IconPlus } from '@tabler/icons-react';

import { useAuth } from 'contexts/AuthContext';
import { useInvoiceMenus } from 'hooks/useInvoiceMenus';
import { INVOICE_MODES, invoicePath } from 'utils/constants';

/**
 * Registrar una factura simple desde el expediente de una obra o de un
 * proveedor (DEC-058). La factura se registra en un menú de forma simple
 * (DEC-074): con uno, el botón lleva a él; con varios, se elige en cuál.
 * Sin permiso de registrar, o sin menús simples visibles, no se muestra.
 * `query`: lo que el formulario recibe ya elegido (`{ wrkId }` o `{ prvId }`).
 */
export default function NewSimpleInvoiceButton({ query }) {
  const navigate = useNavigate();
  const { permissionsCatalog, hasPermission } = useAuth();
  const createId = permissionsCatalog.billing?.invoices?.create;
  const menus = useInvoiceMenus(INVOICE_MODES.SIMPLE);
  const [anchor, setAnchor] = useState(null);

  if (createId == null || !hasPermission(createId) || menus.length === 0) return null;

  const search = new URLSearchParams(Object.entries(query).map(([key, value]) => [key, String(value)])).toString();
  const open = (pvtId) => navigate(`${invoicePath(pvtId, 'new')}?${search}`);

  if (menus.length === 1) {
    return (
      <Button size="small" variant="outlined" color="secondary" startIcon={<IconPlus size={16} />} onClick={() => open(menus[0].pvtId)}>
        Factura {menus[0].name.toLowerCase()}
      </Button>
    );
  }

  return (
    <>
      <Button
        size="small"
        variant="outlined"
        color="secondary"
        startIcon={<IconPlus size={16} />}
        endIcon={<IconChevronDown size={16} />}
        onClick={(event) => setAnchor(event.currentTarget)}
      >
        Factura sin contrato
      </Button>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
        {menus.map((menu) => (
          <MenuItem key={menu.pvtId} onClick={() => open(menu.pvtId)}>
            {menu.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

NewSimpleInvoiceButton.propTypes = {
  query: PropTypes.object.isRequired
};
