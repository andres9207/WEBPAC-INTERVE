import httpCliente from 'api/services/httpCliente';

/**
 * Reglas de negocio (DEC-072): días de aviso de vencimiento de contratos y
 * pólizas. Leer y guardar exigen el permiso de configurarlas.
 * @returns {Promise<{ data: { contractExpiringDays: number, policyExpiringDays: number } }>}
 */
export const getBusinessRulesAPI = () => httpCliente.get('admin/businessRules/get_business_rules');

/**
 * Guarda los días de las dos reglas (enteros entre 1 y 365). Si cambian, el
 * servidor avisa enseguida lo que ya entró en el plazo nuevo.
 * @param {{ contractExpiringDays: number, policyExpiringDays: number }} params
 */
export const saveBusinessRulesAPI = (params) => httpCliente.put('admin/businessRules/save_business_rules', params);
