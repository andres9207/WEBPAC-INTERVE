import MasterPage from 'ui-component/extended/MasterPage';
import { providerTypesApi } from 'api/requests/providerTypesApi';
import { useAuth } from 'contexts/AuthContext';

// Maestro de tipos de proveedor (ADR-0010) sobre la vista reutilizable de
// maestro (MAE-FE-01). El tipo es una clasificación (DEC-10 del backlog): no
// condiciona campos, así que no hay reglas por tipo en el cliente.

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

export default function ProviderTypePage() {
  const { permissionsCatalog } = useAuth();

  return (
    <MasterPage
      title="Tipo de proveedor"
      pluralTitle="Tipos de proveedor"
      idField="pvtId"
      api={providerTypesApi}
      permissions={permissionsCatalog.admin?.providerTypes}
      columns={COLUMNS}
      filterFields={FILTER_FIELDS}
      formFields={FORM_FIELDS}
      defaultSort="name"
      rowLabel={rowLabel}
    />
  );
}
