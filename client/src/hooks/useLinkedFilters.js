import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Filtro con el que llega un listado desde el tablero (ADR-0002, decisión 2;
 * DEC-052): `/work/contracts?policyStatus=EXPIRED`. Se lee de la URL una sola
 * vez y queda en el estado del listado, así sobrevive a abrir y cerrar el
 * detalle en su modal (que cambia la dirección). El filtro viaja en la
 * petición: el servidor aplica el mismo predicado que produjo la cifra.
 *
 * - `keys`: parámetros que el listado acepta como filtro (los demás se
 *   ignoran). `status` no es un filtro: es la pestaña inicial.
 * - `describe(params)`: texto del aviso ("contratos con póliza vencida"). Recibe
 *   todos los parámetros: alguno puede ser solo para el aviso (`label`).
 *
 * Devuelve `filters` (para MasterPage), `initialStatus`, `label` y `clear`.
 */
export default function useLinkedFilters(keys, describe) {
  const [searchParams] = useSearchParams();
  const [linked, setLinked] = useState(() => {
    const filters = Object.fromEntries(keys.filter((key) => searchParams.get(key)).map((key) => [key, searchParams.get(key)]));
    return { filters, params: Object.fromEntries(searchParams), status: searchParams.get('status') };
  });

  const clear = useCallback(() => setLinked((current) => ({ ...current, filters: {} })), []);
  const hasFilters = Object.keys(linked.filters).length > 0;
  const label = useMemo(() => (hasFilters ? describe(linked.params) : null), [hasFilters, describe, linked.params]);

  return { filters: linked.filters, initialStatus: linked.status, label, clear };
}
