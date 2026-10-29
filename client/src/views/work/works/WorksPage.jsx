import { useCallback, useMemo, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

import MasterPage from 'ui-component/extended/MasterPage';
import useLinkedFilters from 'hooks/useLinkedFilters';
import { exportWorksAPI, getWorkFilterManagersAPI, getWorkFilterProvidersAPI, worksApi } from 'api/requests/worksApi';
import { getConstructionCompaniesSelectAPI } from 'api/requests/constructionCompaniesApi';
import { getContractTypesSelectAPI } from 'api/requests/contractTypesApi';
import { getSupervisionTypesSelectAPI } from 'api/requests/supervisionTypesApi';
import { useAuth } from 'contexts/AuthContext';
import { useWorkScope } from 'contexts/WorkScopeContext';
import { ALL_WORKS } from 'utils/workScope';
import { fMoneyText } from 'utils/formatNumber';
import { WORK_STATE_OPTIONS, fTerm } from 'utils/constants';
import { fDateOnly } from 'utils/formatTime';
import WorkCard from './components/WorkCard';
import WorksSummary from './components/WorksSummary';

// Obras (ADR-0011, DEC-026, DEC-030). Reutiliza el listado de MasterPage
// (filtros, pestañas por estado). Detalle, alta y edición son rutas hijas
// que se abren en un modal sobre el listado (DEC-034); `refresh` les permite
// recargar el listado y los indicadores después de un cambio. Una obra no desaparece del listado si su constructora o su tipo
// están inactivos: el servidor no filtra por el estado de los maestros.
// Indicadores arriba; la tabla por defecto y la vista elegida se recuerda (DEC-033).

const COLUMNS = [
  { id: 'code', label: 'Código', sortable: true },
  {
    id: 'name',
    label: 'Obra',
    sortable: true,
    render: (row) => (
      <>
        <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.dark' }}>
          {row.name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {row.constructionCompany}
        </Typography>
      </>
    ),
    cardRender: (row) => `${row.name} · ${row.constructionCompany ?? ''}`
  },
  { id: 'supervisionType', label: 'Interventoría', sortable: true },
  { id: 'mainManagerName', label: 'Responsable principal', render: (row) => row.mainManagerName ?? 'Sin principal' },
  // Valor vigente: el ampliado si existe. Lo calcula el servidor (FRONTEND_STANDARD, regla 9).
  { id: 'currentValue', label: 'Valor vigente', align: 'right', render: (row) => fMoneyText(row.currentValue) },
  { id: 'term', label: 'Plazo', render: (row) => fTerm(row.initialTerm, row.termUnit) },
  // Ciclo de vida (DEC-083): en curso o finalizada, con su fecha.
  {
    id: 'stateName',
    label: 'Ciclo',
    sortable: true,
    render: (row) =>
      row.state === 'FINISHED' ? (
        <Chip size="small" variant="outlined" label={`Finalizada · ${fDateOnly(row.finishDate)}`} />
      ) : (
        row.stateName
      )
  }
];

// Filtros del listado (DEC-048). Constructora, tipo de contrato e interventoría,
// entre los activos; proveedor, entre los asignados a obras del alcance, buscado
// en el servidor (tiene tope, DEC-018). Importes y fecha de inicio, por rango.
const FILTER_FIELDS = [
  { key: 'code', type: 'input', label: 'Código', props: { maxLength: 30 }, grid: { xs: 12, sm: 4 } },
  { key: 'name', type: 'input', label: 'Nombre', props: { maxLength: 200 }, grid: { xs: 12, sm: 8 } },
  {
    key: 'cncId',
    type: 'socketDropdown',
    label: 'Constructora',
    fetchApi: () => getConstructionCompaniesSelectAPI(),
    socketEvent: 'refresh-construction-companies',
    grid: { xs: 12, sm: 6 }
  },
  {
    key: 'cttId',
    type: 'socketDropdown',
    label: 'Tipo de contrato',
    fetchApi: () => getContractTypesSelectAPI(),
    socketEvent: 'refresh-contract-types',
    grid: { xs: 12, sm: 6 }
  },
  {
    key: 'sptId',
    type: 'socketDropdown',
    label: 'Tipo de interventoría',
    fetchApi: () => getSupervisionTypesSelectAPI(),
    socketEvent: 'refresh-supervision-types',
    grid: { xs: 12, sm: 6 }
  },
  { key: 'state', type: 'dropdown', label: 'Ciclo', props: { options: WORK_STATE_OPTIONS }, grid: { xs: 12, sm: 6 } },
  {
    key: 'prvId',
    type: 'remoteDropdown',
    label: 'Proveedor',
    fetchOptions: ({ search, includeId }) =>
      getWorkFilterProvidersAPI({ ...(search ? { search } : {}), ...(includeId ? { includePrvId: includeId } : {}) }).then(
        (res) => res.data
      )
  },
  { key: 'initialValue', type: 'number-range', label: 'Valor inicial', grid: { xs: 12, sm: 6 } },
  { key: 'extendedValue', type: 'number-range', label: 'Valor ampliado', grid: { xs: 12, sm: 6 } },
  { key: 'maxServiceOrderValue', type: 'number-range', label: 'Valor máximo orden de servicio', grid: { xs: 12, sm: 6 } },
  { key: 'directCost', type: 'number-range', label: 'Costo directo', grid: { xs: 12, sm: 6 } },
  { key: 'startDate', type: 'calendar-range', label: 'Fecha de inicio' }
];
// Responsable: solo con "Ver todo", donde se ven varias obras y sirve saber
// de cuáles es responsable cada uno. Entre los responsables de obras del alcance.
const MANAGER_FILTER = {
  key: 'useId',
  type: 'remoteDropdown',
  label: 'Responsable',
  fetchOptions: ({ search, includeId }) =>
    getWorkFilterManagersAPI({ ...(search ? { search } : {}), ...(includeId ? { includeUseId: includeId } : {}) }).then((res) => res.data)
};
const ALL_WORKS_FILTER_FIELDS = [...FILTER_FIELDS, MANAGER_FILTER];

const rowLabel = (row) => `${row.code} — ${row.name}`;

// Desde el tablero (DEC-052) llega solo con la pestaña inicial (`?status=1`).
const NO_LINKED_KEYS = [];
const describeNothing = () => null;

export default function WorksPage() {
  const { permissionsCatalog } = useAuth();
  const { activeWork } = useWorkScope();
  const navigate = useNavigate();
  const [reloadKey, setReloadKey] = useState(0);
  const outletContext = useMemo(() => ({ refresh: () => setReloadKey((k) => k + 1) }), []);
  const linked = useLinkedFilters(NO_LINKED_KEYS, describeNothing);

  const navigation = useMemo(
    () => ({
      create: () => navigate('/work/works/new'),
      view: (row) => navigate(`/work/works/${row.wrkId}`),
      edit: (row) => navigate(`/work/works/${row.wrkId}/edit`)
    }),
    [navigate]
  );

  // Reporte de lo que muestra la tabla, sin paginar (DEC-070).
  const exportOptions = useMemo(
    () => ({ permission: permissionsCatalog.work?.works?.export, request: exportWorksAPI, fileName: 'obras' }),
    [permissionsCatalog]
  );

  const renderCard = useCallback(
    (row, actions) => <WorkCard row={row} actions={actions} onOpen={() => navigation.view(row)} />,
    [navigation]
  );

  return (
    <>
      <MasterPage
        title="Obra"
        feminine
        idField="wrkId"
        api={worksApi}
        permissions={permissionsCatalog.work?.works}
        columns={COLUMNS}
        filterFields={activeWork === ALL_WORKS ? ALL_WORKS_FILTER_FIELDS : FILTER_FIELDS}
        defaultSort="code"
        rowLabel={rowLabel}
        navigation={navigation}
        header={<WorksSummary reloadKey={reloadKey} />}
        renderCard={renderCard}
        initialStatus={linked.initialStatus}
        reloadKey={reloadKey}
        exportOptions={exportOptions}
      />
      <Outlet context={outletContext} />
    </>
  );
}
