import { useCallback, useState } from 'react';
import { IconCalculator } from '@tabler/icons-react';

import MasterPage from 'ui-component/extended/MasterPage';
import ConfigureBaseDialog from './components/ConfigureBaseDialog';
import { policyTypesApi } from 'api/requests/policyTypesApi';
import { useAuth } from 'contexts/AuthContext';
import { POLICY_BASE_OPTIONS, policyBaseName } from 'utils/constants';

// Maestro de tipos de póliza (ADR-0019, DEC-050) sobre la vista reutilizable
// de maestro (MAE-FE-01). La clave y la base se eligen al crear y el
// formulario de edición no las cambia: la base solo se cambia con "Configurar
// base", que exige su permiso propio. Sin tipos sembrados: qué base usa cada
// tipo es una decisión de negocio (backlog DEC-04).

const COLUMNS = [
  { id: 'key', label: 'Clave', sortable: true },
  { id: 'name', label: 'Nombre', sortable: true },
  { id: 'base', label: 'Base de cálculo', sortable: true, render: (row) => policyBaseName(row.base) }
];

const BASE_CHOICES = POLICY_BASE_OPTIONS.map((o) => ({ value: o.value, label: `${o.label}: ${o.description}` }));

const FORM_FIELDS = [
  {
    name: 'key',
    type: 'text',
    label: 'Clave',
    required: true,
    // La referencian el código y las pólizas: se fija al crear.
    editable: false,
    validation: {
      required: 'La clave es requerida',
      maxLength: { value: 30, message: 'Máximo 30 caracteres' },
      pattern: { value: /^[A-Za-z][A-Za-z0-9_]*$/, message: 'Empieza con una letra; solo letras, dígitos y guion bajo' }
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
  },
  {
    name: 'base',
    type: 'dropdown',
    label: 'Base de cálculo',
    required: true,
    options: BASE_CHOICES,
    // Después de crear se cambia con "Configurar base" (permiso propio).
    editable: false,
    validation: { required: 'La base de cálculo es requerida' },
    grid: { xs: 12 }
  }
];

// Filtros del listado (DEC-048): los campos `filter` del maestro en el servidor.
const FILTER_FIELDS = [
  { key: 'key', type: 'input', label: 'Clave', props: { maxLength: 30 }, grid: { xs: 12, sm: 4 } },
  { key: 'name', type: 'input', label: 'Nombre', props: { maxLength: 100 }, grid: { xs: 12, sm: 8 } },
  { key: 'base', type: 'dropdown', label: 'Base de cálculo', props: { options: POLICY_BASE_OPTIONS }, grid: { xs: 12 } }
];

const rowLabel = (row) => row.name;

export default function PolicyTypePage() {
  const { permissionsCatalog, hasPermission } = useAuth();
  const permissions = permissionsCatalog.admin?.policyTypes;
  const canConfigure = permissions?.configureBase != null && hasPermission(permissions.configureBase);
  const [configuring, setConfiguring] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const extraActions = useCallback(
    (row) =>
      canConfigure
        ? [{ label: 'Configurar base', icon: <IconCalculator size={16} />, command: () => setConfiguring(row), tone: 'info' }]
        : [],
    [canConfigure]
  );
  const closeConfiguring = useCallback(() => setConfiguring(null), []);
  const baseSaved = useCallback(() => {
    setConfiguring(null);
    setReloadKey((key) => key + 1);
  }, []);

  return (
    <>
      <MasterPage
        title="Tipo de póliza"
        pluralTitle="Tipos de póliza"
        idField="pltId"
        api={policyTypesApi}
        permissions={permissions}
        columns={COLUMNS}
        filterFields={FILTER_FIELDS}
        formFields={FORM_FIELDS}
        defaultSort="name"
        rowLabel={rowLabel}
        extraActions={extraActions}
        reloadKey={reloadKey}
      />
      <ConfigureBaseDialog open={Boolean(configuring)} policyType={configuring} onClose={closeConfiguring} onSaved={baseSaved} />
    </>
  );
}
