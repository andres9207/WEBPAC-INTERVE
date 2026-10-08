import { useCallback, useMemo, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import MasterPage from 'ui-component/extended/MasterPage';
import useLinkedFilters from 'hooks/useLinkedFilters';
import { worksApi } from 'api/requests/worksApi';
import { getConstructionCompaniesSelectAPI } from 'api/requests/constructionCompaniesApi';
import { getSupervisionTypesSelectAPI } from 'api/requests/supervisionTypesApi';
import { useAuth } from 'contexts/AuthContext';
import { fMoneyText } from 'utils/formatNumber';
import { fTerm } from 'utils/constants';
import WorkCard from './components/WorkCard';
import WorksSummary from './components/WorksSummary';

// Obras (ADR-0011, DEC-026, DEC-030). Reutiliza el listado de MasterPage
// (filtros, pestañas por estado). Detalle, alta y edición son rutas hijas
// que se abren en un modal sobre el listado (DEC-034); `refresh` les permite
// recargar el listado y los indicadores después de un cambio. Una obra no desaparece del listado si su constructora o su tipo
// están inactivos: el servidor no filtra por el estado de los maestros.
// Indicadores arriba y vista de tarjetas por defecto (DEC-033).

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
  { id: 'term', label: 'Plazo', render: (row) => fTerm(row.initialTerm, row.termUnit) }
];

// Filtros del listado (DEC-048). Constructora e interventoría, entre las activas.
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
    key: 'sptId',
    type: 'socketDropdown',
    label: 'Tipo de interventoría',
    fetchApi: () => getSupervisionTypesSelectAPI(),
    socketEvent: 'refresh-supervision-types',
    grid: { xs: 12, sm: 6 }
  }
];

const rowLabel = (row) => `${row.code} — ${row.name}`;

// Desde el tablero (DEC-052) llega solo con la pestaña inicial (`?status=1`).
const NO_LINKED_KEYS = [];
const describeNothing = () => null;

export default function WorksPage() {
  const { permissionsCatalog } = useAuth();
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
        filterFields={FILTER_FIELDS}
        defaultSort="code"
        rowLabel={rowLabel}
        navigation={navigation}
        header={<WorksSummary reloadKey={reloadKey} />}
        renderCard={renderCard}
        initialStatus={linked.initialStatus}
        reloadKey={reloadKey}
      />
      <Outlet context={outletContext} />
    </>
  );
}
