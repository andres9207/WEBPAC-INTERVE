import MasterPage from 'ui-component/extended/MasterPage';
import { contractTypesApi } from 'api/requests/contractTypesApi';
import { useAuth } from 'contexts/AuthContext';

// Maestro de tipos de contrato (ADR-0006) sobre la vista reutilizable de
// maestro (MAE-FE-01): solo el nombre. La configuración de los campos del
// contrato es del tipo de proveedor (DEC-053).

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
