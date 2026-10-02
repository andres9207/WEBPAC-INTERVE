import { useCallback, useMemo, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import MasterPage from 'ui-component/extended/MasterPage';
import { worksApi } from 'api/requests/worksApi';
import { useAuth } from 'contexts/AuthContext';
import { fMoneyText } from 'utils/formatNumber';
import { fTerm } from 'utils/constants';
import WorkCard from './components/WorkCard';
import WorksSummary from './components/WorksSummary';

// Obras (ADR-0011, DEC-026, DEC-030). Reutiliza el listado de MasterPage
// (búsqueda, pestañas por estado). Detalle, alta y edición son rutas hijas
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

const rowLabel = (row) => `${row.code} — ${row.name}`;

export default function WorksPage() {
  const { permissionsCatalog } = useAuth();
  const navigate = useNavigate();
  const [reloadKey, setReloadKey] = useState(0);
  const outletContext = useMemo(() => ({ refresh: () => setReloadKey((k) => k + 1) }), []);

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
        searchPlaceholder="Buscar por código, nombre o constructora"
        defaultSort="code"
        rowLabel={rowLabel}
        navigation={navigation}
        header={<WorksSummary reloadKey={reloadKey} />}
        renderCard={renderCard}
        reloadKey={reloadKey}
      />
      <Outlet context={outletContext} />
    </>
  );
}
