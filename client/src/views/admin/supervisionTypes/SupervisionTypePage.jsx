import MasterPage from 'ui-component/extended/MasterPage';
import { supervisionTypesApi } from 'api/requests/supervisionTypesApi';
import { useAuth } from 'contexts/AuthContext';

// Maestro de tipos de interventoría (ADR-0007) sobre la vista reutilizable
// de maestro (MAE-FE-01). El mensaje de bloqueo por uso llega del servidor con
// la cantidad de obras.

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

export default function SupervisionTypePage() {
  const { permissionsCatalog } = useAuth();

  return (
    <MasterPage
      title="Tipo de interventoría"
      pluralTitle="Tipos de interventoría"
      idField="sptId"
      api={supervisionTypesApi}
      permissions={permissionsCatalog.admin?.supervisionTypes}
      columns={COLUMNS}
      searchPlaceholder="Buscar por nombre"
      formFields={FORM_FIELDS}
      defaultSort="name"
      rowLabel={rowLabel}
    />
  );
}
