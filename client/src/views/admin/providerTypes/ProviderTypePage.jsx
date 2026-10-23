import { useCallback, useState } from 'react';
import { IconListCheck } from '@tabler/icons-react';

import MasterPage from 'ui-component/extended/MasterPage';
import ProviderTypeFieldsDialog from './components/ProviderTypeFieldsDialog';
import { providerTypesApi } from 'api/requests/providerTypesApi';
import { useAuth } from 'contexts/AuthContext';
import { INVOICE_MODE_OPTIONS, invoiceModeName } from 'utils/constants';

// Maestro de tipos de proveedor (ADR-0010) sobre la vista reutilizable de
// maestro (MAE-FE-01): el nombre, la forma de facturar y la casilla del menú
// de facturas (DEC-074) y, desde cada fila, la configuración de los campos de
// los contratos firmados bajo el tipo (DEC-053). Configurarla exige su
// permiso propio; sin él, la matriz se ve en solo lectura. La forma decide si
// el tipo admite contratos o facturas simples, y no cambia si el tipo ya
// tiene contratos o facturas (409). Con la casilla, el tipo es una entrada
// del menú "Facturas"; quitarla solo oculta la entrada.

const COLUMNS = [
  { id: 'name', label: 'Nombre', sortable: true },
  { id: 'invoiceMode', label: 'Forma de facturar', sortable: true, render: (row) => invoiceModeName(row.invoiceMode) },
  { id: 'invoiceMenu', label: 'Menú de facturas', sortable: true, render: (row) => (row.invoiceMenu ? 'Sí' : 'No') }
];

const FORM_FIELDS = [
  {
    name: 'name',
    type: 'text',
    label: 'Nombre',
    required: true,
    validation: { required: 'El nombre es requerido', maxLength: { value: 100, message: 'Máximo 100 caracteres' } },
    grid: { xs: 12, sm: 7 }
  },
  {
    name: 'invoiceMode',
    type: 'dropdown',
    label: 'Forma de facturar',
    // El selector no se vacía: "No factura" es una opción más (se guarda como NULL).
    options: [{ value: '', label: 'No factura' }, ...INVOICE_MODE_OPTIONS],
    defaultValue: '',
    grid: { xs: 12, sm: 5 }
  },
  {
    name: 'invoiceMenu',
    type: 'checkbox',
    label: 'Va al menú de facturas',
    defaultValue: false,
    // El servidor lo vuelve a verificar (y la BD, con su CHECK).
    validation: { validate: (value, form) => !value || Boolean(form.invoiceMode) || 'Elige la forma de facturar para que vaya al menú' },
    grid: { xs: 12 }
  }
];

// Filtros del listado (DEC-048): los campos `filter` del maestro en el servidor.
const FILTER_FIELDS = [
  { key: 'name', type: 'input', label: 'Nombre', props: { maxLength: 100 }, grid: { xs: 12, sm: 7 } },
  {
    key: 'invoiceMode',
    type: 'dropdown',
    label: 'Forma de facturar',
    props: { options: INVOICE_MODE_OPTIONS },
    grid: { xs: 12, sm: 5 }
  }
];

const rowLabel = (row) => row.name;

export default function ProviderTypePage() {
  const { permissionsCatalog, hasPermission } = useAuth();
  const permissions = permissionsCatalog.admin?.providerTypes;
  const canConfigure = permissions?.configureFields != null && hasPermission(permissions.configureFields);
  const [configuring, setConfiguring] = useState(null);

  const extraActions = useCallback(
    (row) => [
      {
        label: canConfigure ? 'Configurar campos' : 'Ver campos',
        icon: <IconListCheck size={16} />,
        command: () => setConfiguring(row),
        tone: 'info'
      }
    ],
    [canConfigure]
  );
  const closeConfiguring = useCallback(() => setConfiguring(null), []);

  return (
    <>
      <MasterPage
        title="Tipo de proveedor"
        pluralTitle="Tipos de proveedor"
        idField="pvtId"
        api={providerTypesApi}
        permissions={permissions}
        columns={COLUMNS}
        filterFields={FILTER_FIELDS}
        formFields={FORM_FIELDS}
        defaultSort="name"
        rowLabel={rowLabel}
        extraActions={extraActions}
      />
      <ProviderTypeFieldsDialog
        open={Boolean(configuring)}
        providerType={configuring}
        readOnly={!canConfigure}
        onClose={closeConfiguring}
      />
    </>
  );
}
