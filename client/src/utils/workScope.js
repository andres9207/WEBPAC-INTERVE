/**
 * Obra activa del encabezado (DEC-047). La elige el usuario en el selector
 * (`WorkScopeContext`) y viaja en cada petición con el encabezado
 * `X-Work-Id` (interceptor de `httpCliente`). Solo PROPONE el alcance: el
 * servidor verifica que el usuario sea responsable de esa obra o tenga el
 * permiso de ver todas, y responde solo con lo que le corresponde.
 *
 * - Un id de obra: solo esa obra.
 * - `ALL_WORKS`: "Ver todo" (solo sirve con el permiso de ver todas).
 * - null: sin obra; el servidor no devuelve nada de obras, proveedores,
 *   contratos ni facturas.
 */

export const WORK_HEADER = 'X-Work-Id';
export const ALL_WORKS = 'ALL';

let activeWork = null;

/** Valor del encabezado para las próximas peticiones. */
export const setActiveWorkHeader = (value) => {
  activeWork = value === null || value === undefined || value === '' ? null : String(value);
};

export const activeWorkHeader = () => activeWork;

// Última obra elegida, por usuario y en este navegador (preferencia, no
// seguridad: el servidor la vuelve a verificar). Puede fallar en modo privado.
const storageKey = (useId) => `activeWork:${useId}`;

export const readStoredWork = (useId) => {
  try {
    return localStorage.getItem(storageKey(useId));
  } catch {
    return null;
  }
};

export const storeWork = (useId, value) => {
  try {
    if (value === null || value === undefined) localStorage.removeItem(storageKey(useId));
    else localStorage.setItem(storageKey(useId), String(value));
  } catch {
    // Sin almacenamiento: la elección dura lo que la pestaña.
  }
};
