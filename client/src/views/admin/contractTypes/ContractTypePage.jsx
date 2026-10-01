import MasterPage from 'ui-component/extended/MasterPage';
import { contractTypesApi } from 'api/requests/contractTypesApi';
import { useAuth } from 'contexts/AuthContext';

// Maestro de tipos de contrato (ADR-0006, versión mínima) sobre la vista
// reutilizable de maestro (MAE-FE-01). Solo el nombre: el editor de
// configuración de campos por tipo llega con contratos (MAE-FE-08).

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
      searchPlaceholder="Buscar por nombre"
      formFields={FORM_FIELDS}
      defaultSort="name"
      rowLabel={rowLabel}
    />
  );
}
