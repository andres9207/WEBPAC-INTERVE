import MasterPage from 'ui-component/extended/MasterPage';
import { identityDocumentsApi } from 'api/requests/identityDocumentsApi';
import { useAuth } from 'contexts/AuthContext';

// Maestro de tipos de identificación (ADR-0008) sobre la vista reutilizable
// de maestro (MAE-FE-01). Todo se declara aquí; el comportamiento está en MasterPage.

const COLUMNS = [
  { id: 'code', label: 'Código', sortable: true },
  { id: 'name', label: 'Nombre', sortable: true }
];

const FORM_FIELDS = [
  {
    name: 'code',
    type: 'text',
    label: 'Código',
    required: true,
    // Clave estable del tipo: se fija al crear (ADR-0008).
    editable: false,
    validation: {
      required: 'El código es requerido',
      maxLength: { value: 10, message: 'Máximo 10 caracteres' },
      pattern: { value: /^[A-Za-z0-9]+$/, message: 'Solo letras y números, sin espacios' }
    },
    grid: { xs: 12, sm: 4 }
  },
  {
    name: 'name',
    type: 'text',
    label: 'Nombre',
    required: true,
    validation: { required: 'El nombre es requerido', maxLength: { value: 100, message: 'Máximo 100 caracteres' } },
    grid: { xs: 12, sm: 8 }
  }
];

const rowLabel = (row) => row.name;

export default function IdentityDocumentPage() {
  const { permissionsCatalog } = useAuth();

  return (
    <MasterPage
      title="Tipo de identificación"
      idField="iddId"
      api={identityDocumentsApi}
      permissions={permissionsCatalog.admin?.identityDocuments}
      columns={COLUMNS}
      searchPlaceholder="Buscar por código o nombre"
      formFields={FORM_FIELDS}
      defaultSort="name"
      rowLabel={rowLabel}
    />
  );
}
