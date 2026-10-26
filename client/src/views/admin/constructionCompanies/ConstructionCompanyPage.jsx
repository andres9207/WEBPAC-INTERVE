import MasterPage from 'ui-component/extended/MasterPage';
import { constructionCompaniesApi } from 'api/requests/constructionCompaniesApi';
import { useAuth } from 'contexts/AuthContext';
import { NIT_PATTERN, maskNit } from 'utils/identification';

// Maestro de constructoras (ADR-0004) sobre la vista reutilizable de maestro
// (MAE-FE-01). Una constructora con obras no se elimina, solo se desactiva: el
// mensaje de bloqueo llega del servidor con la cantidad de obras.

const COLUMNS = [
  { id: 'description', label: 'Descripción', sortable: true },
  { id: 'nit', label: 'NIT', sortable: true }
];

// El NIT es obligatorio y único (migración 0115); el duplicado lo avisa el servidor.
const FORM_FIELDS = [
  {
    name: 'description',
    type: 'text',
    label: 'Descripción',
    required: true,
    validation: { required: 'La descripción es requerida', maxLength: { value: 150, message: 'Máximo 150 caracteres' } },
    grid: { xs: 12, sm: 8 }
  },
  {
    name: 'nit',
    type: 'text',
    label: 'NIT',
    required: true,
    maxLength: 17,
    transform: maskNit,
    props: { placeholder: '900123456-8', slotProps: { htmlInput: { inputMode: 'numeric' } } },
    validation: {
      required: 'El NIT es requerido',
      pattern: { value: NIT_PATTERN, message: 'De 5 a 15 dígitos y el dígito de verificación' }
    },
    grid: { xs: 12, sm: 4 }
  }
];

// Filtros del listado (DEC-048): los campos `filter` del maestro en el servidor. El NIT, con la misma máscara;
// el servidor lo busca también sin el guion, así que un NIT a medias encuentra el completo.
const FILTER_FIELDS = [
  { key: 'description', type: 'input', label: 'Descripción', props: { maxLength: 150 } },
  { key: 'nit', type: 'input', label: 'NIT', transform: maskNit, props: { maxLength: 17, inputMode: 'numeric' } }
];

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
