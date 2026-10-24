import MasterPage from 'ui-component/extended/MasterPage';
import { constructionCompaniesApi } from 'api/requests/constructionCompaniesApi';
import { useAuth } from 'contexts/AuthContext';

// Maestro de constructoras (ADR-0004) sobre la vista reutilizable de maestro
// (MAE-FE-01). Una constructora con obras no se elimina, solo se desactiva: el
// mensaje de bloqueo llega del servidor con la cantidad de obras.

const COLUMNS = [
  { id: 'description', label: 'Descripción', sortable: true },
  { id: 'nit', label: 'NIT', sortable: true }
];

// Máscara del NIT: solo dígitos, y el último va después del guion (el dígito de verificación, libre).
// 9001234568 → 900123456-8. Mismo formato que valida el servidor (constructionCompanies.service.js).
const NIT_PATTERN = /^\d{5,15}-\d$/;
const maskNit = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.length < 2 ? digits : `${digits.slice(0, -1)}-${digits.slice(-1)}`;
};

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
