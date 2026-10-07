import PropTypes from 'prop-types';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import Loader from 'ui-component/Loader';
import { getMyWorksSelectAPI } from 'api/requests/worksApi';
import { useAuth } from 'contexts/AuthContext';
import { useSocket } from 'socket/SocketProvider';
import { showError } from 'services/ToastService';
import { ALL_WORKS, readStoredWork, setActiveWorkHeader, storeWork } from 'utils/workScope';

/**
 * Obra activa (DEC-047): el selector del encabezado y el valor que viaja en
 * `X-Work-Id`. Siempre hay una sola obra elegida; con el permiso de ver
 * todas, además la opción "Ver todo". Sin obras y sin el permiso, no hay
 * obra y los módulos de obras, proveedores, contratos y facturas quedan
 * vacíos (lo decide el servidor).
 *
 * El contenido de la página se monta después de decidir la obra, con
 * `scopeKey` como clave: cambiar de obra vuelve a montar la vista y sus
 * listados se piden otra vez con el alcance nuevo.
 */

const WorkScopeContext = createContext(undefined);

/** Obra a usar: la guardada si sigue disponible; si no, "Ver todo" o la primera. */
const pickWork = ({ viewAll, works }, stored) => {
  if (stored === ALL_WORKS && viewAll) return ALL_WORKS;
  if (stored && works.some((w) => String(w.value) === String(stored))) return Number(stored);
  if (viewAll) return ALL_WORKS;
  return works[0]?.value ?? null;
};

export function WorkScopeProvider({ children }) {
  const { user } = useAuth();
  const socket = useSocket();
  const useId = user?.useId;
  const [state, setState] = useState({ loaded: false, viewAll: false, works: [], activeWork: null });

  const load = useCallback(async () => {
    if (!useId) return;
    try {
      const { data } = await getMyWorksSelectAPI();
      setState((current) => {
        const activeWork = pickWork(data, current.loaded ? current.activeWork : readStoredWork(useId));
        // El encabezado se fija antes de montar el contenido: sus primeras
        // peticiones ya viajan con la obra.
        setActiveWorkHeader(activeWork);
        storeWork(useId, activeWork);
        return { loaded: true, viewAll: data.viewAll, works: data.works, activeWork };
      });
    } catch (err) {
      showError(err.response?.data?.message || 'Error al cargar tus obras');
      setActiveWorkHeader(null);
      setState({ loaded: true, viewAll: false, works: [], activeWork: null });
    }
  }, [useId]);

  useEffect(() => {
    load();
  }, [load]);

  // Se asignó o se retiró un responsable, o cambió una obra: la lista puede cambiar.
  useEffect(() => {
    if (!socket) return undefined;
    socket.on('refresh-works', load);
    return () => socket.off('refresh-works', load);
  }, [socket, load]);

  const selectWork = useCallback(
    (value) => {
      const next = value === ALL_WORKS || value === null || value === '' ? value || null : Number(value);
      setActiveWorkHeader(next);
      storeWork(useId, next);
      setState((current) => ({ ...current, activeWork: next }));
    },
    [useId]
  );

  const value = useMemo(
    () => ({ ...state, selectWork, scopeKey: String(state.activeWork ?? 'none') }),
    [state, selectWork]
  );

  if (!state.loaded) return <Loader />;
  return <WorkScopeContext.Provider value={value}>{children}</WorkScopeContext.Provider>;
}

WorkScopeProvider.propTypes = { children: PropTypes.node };

export const useWorkScope = () => {
  const context = useContext(WorkScopeContext);
  if (!context) throw new Error('useWorkScope debe usarse dentro de WorkScopeProvider');
  return context;
};

/**
 * Filtro "Obra" de un listado (DEC-048), en el formato de FilterPopper. Solo
 * con "Ver todo": con una obra elegida en el encabezado, el listado ya es de
 * esa obra. Las opciones son las del selector del encabezado; el servidor
 * suma el filtro al alcance, nunca lo reemplaza.
 */
export const useWorkFilterField = () => {
  const { activeWork, works } = useWorkScope();
  return useMemo(
    () => (activeWork === ALL_WORKS ? { key: 'wrkId', type: 'dropdown', label: 'Obra', props: { options: works } } : null),
    [activeWork, works]
  );
};
