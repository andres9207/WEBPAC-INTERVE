import { useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { useWorkScope } from 'contexts/WorkScopeContext';
import { ALL_WORKS } from 'utils/workScope';

import GeneralDashboard from './GeneralDashboard';
import WorkDashboard from './work/WorkDashboard';
import { DASHBOARD_PATH } from './work/workDashboard.utils';

/**
 * Pantalla de inicio (ADR-0002). Con una obra elegida en el encabezado, el
 * tablero de esa obra (DEC-063); con "Ver todo" o sin obra, el tablero
 * general (DEC-052), hasta que exista el diseño del tablero de todas las
 * obras. Cambiar de obra vuelve a montar la vista (WorkScopeContext).
 *
 * Los expedientes que se abren desde el tablero son rutas hijas: se dibujan
 * en el `Outlet`, encima, y al cerrar vuelven aquí. Lo que cambien en ellos
 * (aprobar, anular) recarga el tablero de la obra.
 */
export default function Dashboard() {
  const { activeWork } = useWorkScope();
  const [reloadKey, setReloadKey] = useState(0);
  const outletContext = useMemo(() => ({ returnTo: DASHBOARD_PATH, refresh: () => setReloadKey((k) => k + 1) }), []);
  const byWork = activeWork !== null && activeWork !== ALL_WORKS;
  return (
    <>
      {byWork ? <WorkDashboard reloadKey={reloadKey} /> : <GeneralDashboard reloadKey={reloadKey} />}
      <Outlet context={outletContext} />
    </>
  );
}
