import MasterPage from 'ui-component/extended/MasterPage';
import { worksApi } from 'api/requests/worksApi';
import { useAuth } from 'contexts/AuthContext';
import { fMoneyText } from 'utils/formatNumber';
import WorkDialog from './components/WorkDialog';

// Obras (ADR-0011, DEC-026). Reutiliza el listado de MasterPage (búsqueda,
// pestañas por estado, activar/desactivar y eliminar) con un diálogo propio,
// porque la obra se guarda con sus responsables y etapas. Una obra no
// desaparece del listado si su constructora o su tipo están inactivos: el
// servidor no filtra por el estado de los maestros.

const COLUMNS = [
  { id: 'code', label: 'Código', sortable: true },
  { id: 'name', label: 'Nombre', sortable: true },
  { id: 'constructionCompany', label: 'Constructora', sortable: true },
  { id: 'supervisionType', label: 'Interventoría', sortable: true },
  // Valor vigente: el ampliado si existe. Lo calcula el servidor (FRONTEND_STANDARD, regla 9).
  { id: 'currentValue', label: 'Valor vigente', render: (row) => fMoneyText(row.currentValue) }
];

const rowLabel = (row) => `${row.code} — ${row.name}`;

export default function WorksPage() {
  const { permissionsCatalog } = useAuth();

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
      dialog={WorkDialog}
    />
  );
}
