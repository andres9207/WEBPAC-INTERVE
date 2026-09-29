import MasterPage from 'ui-component/extended/MasterPage';
import { insurersApi } from 'api/requests/insurersApi';
import { useAuth } from 'contexts/AuthContext';

// Maestro de aseguradoras (ADR-0003) sobre la vista reutilizable de maestro
// (MAE-FE-01). Una aseguradora con pólizas no se elimina, solo se desactiva:
// el mensaje de bloqueo llega del servidor con la cantidad de pólizas.

const COLUMNS = [{ id: 'description', label: 'Descripción', sortable: true }];

const FILTERS = [{ key: 'description', label: 'Descripción' }];

const FORM_FIELDS = [
  {
    name: 'description',
    type: 'text',
    label: 'Descripción',
    required: true,
    validation: { required: 'La descripción es requerida', maxLength: { value: 150, message: 'Máximo 150 caracteres' } },
    grid: { xs: 12 }
  }
];

const rowLabel = (row) => row.description;

export default function InsurerPage() {
  const { permissionsCatalog } = useAuth();

  return (
    <MasterPage
      title="Aseguradora"
      idField="insId"
      api={insurersApi}
      permissions={permissionsCatalog.admin?.insurers}
      columns={COLUMNS}
      filters={FILTERS}
      formFields={FORM_FIELDS}
      defaultSort="description"
      rowLabel={rowLabel}
    />
  );
}
