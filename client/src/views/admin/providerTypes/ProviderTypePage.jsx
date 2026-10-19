import { useCallback, useState } from 'react';
import { IconListCheck } from '@tabler/icons-react';

import MasterPage from 'ui-component/extended/MasterPage';
import ProviderTypeFieldsDialog from './components/ProviderTypeFieldsDialog';
import { providerTypesApi } from 'api/requests/providerTypesApi';
import { useAuth } from 'contexts/AuthContext';
import { PROVIDER_INVOICE_VIEW_OPTIONS, providerInvoiceViewName } from 'utils/constants';

// Maestro de tipos de proveedor (ADR-0010) sobre la vista reutilizable de
// maestro (MAE-FE-01): el nombre, el menú de facturas (DEC-066) y, desde cada
// fila, la configuración de los campos de los contratos firmados bajo el tipo
// (DEC-053). Configurarla exige su permiso propio; sin él, la matriz se ve en
// solo lectura. El menú decide si el tipo admite contratos (contrato mayor,
// subcontratistas) o facturas simples; cambiarlo no mueve contratos ni
// facturas: cada contrato guardó el suyo.

const COLUMNS = [
  { id: 'name', label: 'Nombre', sortable: true },
  { id: 'invoiceView', label: 'Menú de facturas', sortable: true, render: (row) => providerInvoiceViewName(row.invoiceView) }
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
    name: 'invoiceView',
    type: 'dropdown',
    label: 'Menú de facturas',
    // El selector no se vacía: "sin menú" es una opción más (se guarda como NULL).
    options: [{ value: '', label: 'Sin menú' }, ...PROVIDER_INVOICE_VIEW_OPTIONS],
    defaultValue: '',
    grid: { xs: 12, sm: 5 }
  }
];

// Filtros del listado (DEC-048): los campos `filter` del maestro en el servidor.
const FILTER_FIELDS = [
  { key: 'name', type: 'input', label: 'Nombre', props: { maxLength: 100 }, grid: { xs: 12, sm: 7 } },
  {
    key: 'invoiceView',
    type: 'dropdown',
    label: 'Menú de facturas',
    props: { options: PROVIDER_INVOICE_VIEW_OPTIONS },
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
