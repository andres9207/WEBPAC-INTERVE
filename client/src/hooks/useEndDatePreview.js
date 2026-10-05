import { useCallback, useRef, useState } from 'react';

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Fecha final mientras se edita un plazo (inicio + número + unidad). La cuenta
 * la hace el servidor (FRONTEND_STANDARD, regla 9): el formulario llama a
 * `recalc` al salir del campo del plazo, al cambiar la unidad o al cambiar la
 * fecha de inicio, y muestra `endDate`. No se guarda nada: el servidor la
 * vuelve a calcular al guardar.
 *
 * - `previewApi(params)` → `{ data: { endDate } }`; `buildParams(values)`
 *   arma esos params con los nombres de cada endpoint. Las dos, estables
 *   (definidas fuera del componente).
 * - `recalc({ startDate, term, termUnit, ...extra })`: sin fecha de inicio o
 *   sin plazo, deja la fecha vacía sin llamar al servidor. `extra` llega a
 *   `buildParams` (p. ej. `ctrId`).
 * - Si llegan dos respuestas fuera de orden, gana la última pedida.
 * - `reset(endDate)`: el valor guardado al cargar el registro.
 */
export default function useEndDatePreview(previewApi, buildParams) {
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const lastRequest = useRef(0);

  const recalc = useCallback(
    async (values) => {
      const request = ++lastRequest.current;
      const { startDate, term, termUnit } = values;
      if (!ISO_DATE.test(startDate ?? '') || !/^\d+$/.test(String(term ?? '')) || !termUnit) {
        setEndDate('');
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const { data } = await previewApi(buildParams(values));
        if (request === lastRequest.current) setEndDate(data?.endDate ?? '');
      } catch {
        if (request === lastRequest.current) setEndDate('');
      } finally {
        if (request === lastRequest.current) setLoading(false);
      }
    },
    [previewApi, buildParams]
  );

  const reset = useCallback((value) => {
    lastRequest.current += 1;
    setEndDate(value ?? '');
    setLoading(false);
  }, []);

  return { endDate, loading, recalc, reset };
}
