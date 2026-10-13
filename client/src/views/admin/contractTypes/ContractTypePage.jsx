import MasterPage from 'ui-component/extended/MasterPage';
import { contractTypesApi } from 'api/requests/contractTypesApi';
import { useAuth } from 'contexts/AuthContext';
import { CONTRACT_INVOICE_VIEW_OPTIONS, contractInvoiceViewName } from 'utils/constants';

// Maestro de tipos de contrato (ADR-0006) sobre la vista reutilizable de
// maestro (MAE-FE-01): el nombre y el menú de facturas (DEC-054), que decide
// en qué vista aparecen las facturas de sus contratos. Sin definir, sus
// contratos no admiten facturas; con facturas, el servidor no deja cambiarlo.
// La configuración de los campos del contrato es del tipo de proveedor (DEC-053).

const COLUMNS = [
  { id: 'name', label: 'Nombre', sortable: true },
  { id: 'invoiceView', label: 'Menú de facturas', sortable: true, render: (row) => contractInvoiceViewName(row.invoiceView) }
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
    // El selector no se vacía: "sin definir" es una opción más (se guarda como NULL).
    options: [{ value: '', label: 'Sin definir: no admite facturas' }, ...CONTRACT_INVOICE_VIEW_OPTIONS],
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
    props: { options: CONTRACT_INVOICE_VIEW_OPTIONS },
    grid: { xs: 12, sm: 5 }
  }
];

const rowLabel = (row) => row.name;

export default function ContractTypePage() {
  const { permissionsCatalog } = useAuth();

  return (
    <MasterPage
      title="Tipo de contrato"
      pluralTitle="Tipos de contrato"
      idField="cttId"
      api={contractTypesApi}
      permissions={permissionsCatalog.admin?.contractTypes}
      columns={COLUMNS}
      filterFields={FILTER_FIELDS}
      formFields={FORM_FIELDS}
      defaultSort="name"
      rowLabel={rowLabel}
    />
  );
}
