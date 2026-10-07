import MasterPage from 'ui-component/extended/MasterPage';
import { constructionCompaniesApi } from 'api/requests/constructionCompaniesApi';
import { useAuth } from 'contexts/AuthContext';

// Maestro de constructoras (ADR-0004) sobre la vista reutilizable de maestro
// (MAE-FE-01). Una constructora con obras no se elimina, solo se desactiva: el
// mensaje de bloqueo llega del servidor con la cantidad de obras.

const COLUMNS = [{ id: 'description', label: 'Descripción', sortable: true }];

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

// Filtros del listado (DEC-048): los campos `filter` del maestro en el servidor.
const FILTER_FIELDS = [{ key: 'description', type: 'input', label: 'Descripción', props: { maxLength: 150 } }];

const rowLabel = (row) => row.description;

export default function ConstructionCompanyPage() {
  const { permissionsCatalog } = useAuth();

  return (
    <MasterPage
      title="Constructora"
      feminine
      idField="cncId"
      api={constructionCompaniesApi}
      permissions={permissionsCatalog.admin?.constructionCompanies}
      columns={COLUMNS}
      filterFields={FILTER_FIELDS}
      formFields={FORM_FIELDS}
      defaultSort="description"
      rowLabel={rowLabel}
    />
  );
}
