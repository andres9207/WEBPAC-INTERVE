import { useCallback, useMemo, useState } from 'react';
import { IconReportAnalytics } from '@tabler/icons-react';

import MasterPage from 'ui-component/extended/MasterPage';
import StatementReportDialog from './components/StatementReportDialog';
import { statementsApi } from 'api/requests/statementsApi';
import { useAuth } from 'contexts/AuthContext';
import { useWorkFilterField, useWorkScope } from 'contexts/WorkScopeContext';
import { fDateOnly } from 'utils/formatTime';
import { ALL_WORKS } from 'utils/workScope';

// Extractos de la obra (DEC-084), el acta de WebPAC, sobre la vista
// reutilizable de maestro. Con una obra elegida en el encabezado, los de esa
// obra, y el extracto nuevo es de ella; con "Ver todo", todos, con la columna
// y el filtro de obra, y el formulario pide la obra. "Reporte" abre los
// totales de sus facturas por menú y el chequeo de comprobantes de egreso.

const BASE_COLUMNS = [
  { id: 'number', label: 'Número', sortable: true },
  { id: 'date', label: 'Fecha', sortable: true, render: (row) => fDateOnly(row.date) },
  { id: 'communication', label: 'Comunicado', sortable: true, render: (row) => row.communication ?? '—' },
  { id: 'invoicesCount', label: 'Facturas', align: 'right' },
  { id: 'description', label: 'Descripción', render: (row) => row.description ?? '—' }
];
const WORK_COLUMN = { id: 'workCode', label: 'Obra', sortable: true, render: (row) => `${row.workCode} — ${row.workName}` };

const FIELDS = [
  {
    name: 'number',
    type: 'text',
    label: 'Número',
    required: true,
    validation: { required: 'El número es requerido', maxLength: { value: 20, message: 'Máximo 20 caracteres' } },
    grid: { xs: 12, sm: 6 }
  },
  {
    name: 'date',
    type: 'date',
    label: 'Fecha',
    required: true,
    validation: { required: 'La fecha es requerida' },
    grid: { xs: 12, sm: 6 }
  },
  {
    name: 'communication',
    type: 'text',
    label: 'Comunicado',
    validation: { maxLength: { value: 50, message: 'Máximo 50 caracteres' } },
    grid: { xs: 12 }
  },
  {
    name: 'description',
    type: 'textarea',
    label: 'Descripción',
    validation: { maxLength: { value: 500, message: 'Máximo 500 caracteres' } },
    grid: { xs: 12 }
  }
];

const BASE_FILTERS = [
  { key: 'number', type: 'input', label: 'Número', props: { maxLength: 20 } },
  { key: 'communication', type: 'input', label: 'Comunicado', props: { maxLength: 50 } }
];

const rowLabel = (row) => `Extracto ${row.number}`;

export default function StatementsPage() {
  const { permissionsCatalog, hasPermission } = useAuth();
  const { activeWork, works } = useWorkScope();
  const workFilter = useWorkFilterField();
  const perms = permissionsCatalog.billing?.statements;
  const allWorks = activeWork === ALL_WORKS;
  const [reporting, setReporting] = useState(null);

  // Con una obra elegida, el extracto nuevo es de ella; con "Ver todo", la elige el formulario (no se edita después).
  const api = useMemo(
    () => ({ ...statementsApi, save: (params, key) => statementsApi.save(allWorks ? params : { ...params, wrkId: activeWork }, key) }),
    [allWorks, activeWork]
  );
  const columns = useMemo(() => (allWorks ? [WORK_COLUMN, ...BASE_COLUMNS] : BASE_COLUMNS), [allWorks]);
  const formFields = useMemo(
    () =>
      allWorks
        ? [
            {
              name: 'wrkId',
              type: 'dropdown',
              label: 'Obra',
              required: true,
              editable: false,
              options: works,
              validation: { required: 'Selecciona la obra' },
              grid: { xs: 12 }
            },
            ...FIELDS
          ]
        : FIELDS,
    [allWorks, works]
  );
  const filterFields = useMemo(() => (workFilter ? [workFilter, ...BASE_FILTERS] : BASE_FILTERS), [workFilter]);

  const extraActions = useCallback(
    (row) => [{ label: 'Reporte', icon: <IconReportAnalytics size={16} />, command: () => setReporting(row), tone: 'info' }],
    []
  );
  const closeReport = useCallback(() => setReporting(null), []);

  return (
    <>
      <MasterPage
        title="Extracto"
        pluralTitle="Extractos"
        idField="stmId"
        api={api}
        permissions={perms}
        columns={columns}
        filterFields={filterFields}
        formFields={formFields}
        defaultSort="date"
        rowLabel={rowLabel}
        extraActions={extraActions}
      />
      <StatementReportDialog statement={reporting} canExport={perms?.export != null && hasPermission(perms.export)} onClose={closeReport} />
    </>
  );
}
