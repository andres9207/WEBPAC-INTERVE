import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import MasterPage from 'ui-component/extended/MasterPage';
import { worksApi } from 'api/requests/worksApi';
import { useAuth } from 'contexts/AuthContext';
import { fMoneyText } from 'utils/formatNumber';
import { fTerm } from 'utils/constants';

// Obras (ADR-0011, DEC-026, DEC-030). Reutiliza el listado de MasterPage
// (búsqueda, pestañas por estado) y navega a páginas propias: detalle y
// edición. Una obra no desaparece del listado si su constructora o su tipo
// están inactivos: el servidor no filtra por el estado de los maestros.

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

  const navigation = useMemo(
    () => ({
      create: () => navigate('/work/works/new'),
      view: (row) => navigate(`/work/works/${row.wrkId}`),
      edit: (row) => navigate(`/work/works/${row.wrkId}/edit`)
    }),
    [navigate]
  );

  return (
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
    />
  );
}
