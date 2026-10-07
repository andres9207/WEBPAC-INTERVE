import { useEffect, useMemo, useState } from 'react';

// Espera después del último cambio de un filtro: una petición por filtro, no por letra.
const FILTER_DELAY_MS = 300;
const NO_FILTERS = {};

const isEmptyValue = (value) =>
  value == null || (typeof value === 'string' && value.trim() === '') || (Array.isArray(value) && value.every((v) => isEmptyValue(v)));

/**
 * Valores del popper → parámetros de la petición. Un rango (`calendar-range`)
 * viaja como `<key>From` y `<key>To`; el texto, recortado; lo vacío no viaja.
 */
const filterParams = (fields, values) =>
  Object.fromEntries(
    fields.flatMap(({ key, type }) => {
      const value = values[key];
      if (isEmptyValue(value)) return [];
      if (type === 'calendar-range') {
        const [from, to] = value;
        return [...(from ? [[`${key}From`, from]] : []), ...(to ? [[`${key}To`, to]] : [])];
      }
      return [[key, typeof value === 'string' ? value.trim() : value]];
    })
  );

/**
 * Estado de los filtros de un listado (DEC-048), para FilterButton.
 *
 * - `values` / `setValues`: lo que muestra el popper, al instante.
 * - `params`: lo que viaja en la petición. Se actualiza 300 ms después del
 *   último cambio y entonces avisa `onApply` (p. ej. volver a la página 0).
 * - `active`: cuántos filtros tienen valor (el número del botón).
 *
 * `fields` debe ser estable (constante o useMemo).
 */
export default function useListFilters(fields, onApply) {
  const [values, setValues] = useState(NO_FILTERS);
  const [applied, setApplied] = useState(NO_FILTERS);

  useEffect(() => {
    if (values === applied) return undefined;
    const timer = setTimeout(() => {
      setApplied(values);
      onApply?.();
    }, FILTER_DELAY_MS);
    return () => clearTimeout(timer);
  }, [values, applied, onApply]);

  const params = useMemo(() => filterParams(fields, applied), [fields, applied]);
  const active = fields.filter((field) => !isEmptyValue(values[field.key])).length;

  return { values, setValues, params, active, hasFilters: Object.keys(params).length > 0 };
}
