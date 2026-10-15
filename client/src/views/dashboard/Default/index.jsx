import { useWorkScope } from 'contexts/WorkScopeContext';
import { ALL_WORKS } from 'utils/workScope';

import GeneralDashboard from './GeneralDashboard';
import WorkDashboard from './work/WorkDashboard';

/**
 * Pantalla de inicio (ADR-0002). Con una obra elegida en el encabezado, el
 * tablero de esa obra (DEC-063); con "Ver todo" o sin obra, el tablero
 * general (DEC-052), hasta que exista el diseño del tablero de todas las
 * obras. Cambiar de obra vuelve a montar la vista (WorkScopeContext).
 */
export default function Dashboard() {
  const { activeWork } = useWorkScope();
  if (activeWork !== null && activeWork !== ALL_WORKS) return <WorkDashboard />;
  return <GeneralDashboard />;
}
