import { useEffect, useState } from 'react';

import { checkProviderIdentificationAPI } from 'api/requests/providersApi';
import { showError } from 'services/ToastService';
import { identificationFormatError } from 'utils/identification';

/**
 * Verificación reactiva del documento (ADR-0012, "Frontend"): mientras el
 * usuario escribe, avisa si ya hay un proveedor con ese tipo y número, antes
 * de completar el formulario. Solo pregunta con un número de formato válido
 * para su tipo, y espera a que deje de escribir.
 *
 * Es un aviso: el servidor repite la verificación al guardar y responde 409
 * con el proveedor existente si otro usuario lo registró entretanto.
 *
 * @returns {{ checking: boolean, existing: object | null }}  `existing`: { prvId, name, identityCode, identification, staId }
 */
export default function useIdentityCheck({ iddId, identification, format, excludeId, enabled = true }) {
  const [state, setState] = useState({ checking: false, existing: null });

  useEffect(() => {
    const number = String(identification ?? '').trim();
    if (!enabled || !iddId || !number || !format || identificationFormatError(format, number)) {
      setState({ checking: false, existing: null });
      return undefined;
    }

    let cancelled = false;
    setState((s) => ({ ...s, checking: true }));
    const timer = setTimeout(async () => {
      try {
        const { data } = await checkProviderIdentificationAPI({ iddId, identification: number, ...(excludeId ? { excludeId } : {}) });
        if (!cancelled) setState({ checking: false, existing: data.provider });
      } catch (err) {
        if (!cancelled) setState({ checking: false, existing: null });
        showError(err.response?.data?.message || 'No se pudo verificar el documento');
      }
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [iddId, identification, format, excludeId, enabled]);

  return state;
}
