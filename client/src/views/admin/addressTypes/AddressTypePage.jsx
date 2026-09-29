import MasterPage from 'ui-component/extended/MasterPage';
import { addressTypesApi } from 'api/requests/addressTypesApi';
import { useAuth } from 'contexts/AuthContext';

// Maestro de tipos de dirección (ADR-0009) sobre la vista reutilizable de
// maestro (MAE-FE-01). Catálogo compartido por los contactos de obra y de
// proveedor; el mensaje de bloqueo por uso llega del servidor con la cantidad.

const COLUMNS = [{ id: 'name', label: 'Nombre', sortable: true }];

const FILTERS = [{ key: 'name', label: 'Nombre' }];

const FORM_FIELDS = [
  {
    name: 'name',
    type: 'text',
    label: 'Nombre',
    required: true,
    validation: { required: 'El nombre es requerido', maxLength: { value: 100, message: 'Máximo 100 caracteres' } },
    grid: { xs: 12 }
  }
];

const rowLabel = (row) => row.name;

export default function AddressTypePage() {
  const { permissionsCatalog } = useAuth();

  return (
    <MasterPage
      title="Tipo de dirección"
      idField="adtId"
      api={addressTypesApi}
      permissions={permissionsCatalog.admin?.addressTypes}
      columns={COLUMNS}
      filters={FILTERS}
      formFields={FORM_FIELDS}
      defaultSort="name"
      rowLabel={rowLabel}
    />
  );
}
