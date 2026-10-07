import MasterPage from 'ui-component/extended/MasterPage';
import { addressTypesApi } from 'api/requests/addressTypesApi';
import { useAuth } from 'contexts/AuthContext';

// Maestro de tipos de dirección (ADR-0009) sobre la vista reutilizable de
// maestro (MAE-FE-01). Catálogo compartido por los contactos de obra y de
// proveedor; el mensaje de bloqueo por uso llega del servidor con la cantidad.

const COLUMNS = [{ id: 'name', label: 'Nombre', sortable: true }];

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

// Filtros del listado (DEC-048): los campos `filter` del maestro en el servidor.
const FILTER_FIELDS = [{ key: 'name', type: 'input', label: 'Nombre', props: { maxLength: 100 } }];

const rowLabel = (row) => row.name;

export default function AddressTypePage() {
  const { permissionsCatalog } = useAuth();

  return (
    <MasterPage
      title="Tipo de dirección"
      pluralTitle="Tipos de dirección"
      idField="adtId"
      api={addressTypesApi}
      permissions={permissionsCatalog.admin?.addressTypes}
      columns={COLUMNS}
      filterFields={FILTER_FIELDS}
      formFields={FORM_FIELDS}
      defaultSort="name"
      rowLabel={rowLabel}
    />
  );
}
