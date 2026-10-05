import MasterPage from 'ui-component/extended/MasterPage';
import { reasonsApi } from 'api/requests/reasonsApi';
import { useAuth } from 'contexts/AuthContext';
import { REASON_SCOPE_OPTIONS, reasonScopeName } from 'utils/constants';

// Maestro de motivos (ADR-0017, DEC-039) sobre la vista reutilizable de
// maestro (MAE-FE-01). Cada motivo es de un acto (hoy, suspender un
// contrato): se elige al crear y no cambia. El nombre es único dentro del acto.

const COLUMNS = [
  { id: 'name', label: 'Nombre', sortable: true },
  { id: 'scope', label: 'Acto', sortable: true, render: (row) => reasonScopeName(row.scope) }
];

const FORM_FIELDS = [
  {
    name: 'scope',
    type: 'dropdown',
    label: 'Acto',
    required: true,
    options: REASON_SCOPE_OPTIONS,
    defaultValue: REASON_SCOPE_OPTIONS[0].value,
    // El acto se fija al crear: un motivo ya usado no cambia de acto.
    editable: false,
    validation: { required: 'El acto es requerido' },
    grid: { xs: 12, sm: 5 }
  },
  {
    name: 'name',
    type: 'text',
    label: 'Nombre',
    required: true,
    validation: { required: 'El nombre es requerido', maxLength: { value: 100, message: 'Máximo 100 caracteres' } },
    grid: { xs: 12, sm: 7 }
  }
];

const rowLabel = (row) => row.name;

export default function ReasonPage() {
  const { permissionsCatalog } = useAuth();

  return (
    <MasterPage
      title="Motivo"
      pluralTitle="Motivos"
      idField="reaId"
      api={reasonsApi}
      permissions={permissionsCatalog.admin?.reasons}
      columns={COLUMNS}
      searchPlaceholder="Buscar por nombre"
      formFields={FORM_FIELDS}
      defaultSort="name"
      rowLabel={rowLabel}
    />
  );
}
