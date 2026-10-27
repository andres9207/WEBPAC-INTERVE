import { CONTRACT_ALERTS, POLICY_ALERTS } from "./contractTerms.js";
import {
  contractsWithExpiredPoliciesWhere,
  contractsWithExpiringPoliciesWhere,
  expiredContractsWhere,
  expiringContractsWhere,
} from "./expirationNotice.service.js";
import { contractsWithoutPoliciesWhere } from "./policyTerms.js";

/**
 * Predicado de cada alerta del listado de contratos (CONTRACT_ALERTS), con la
 * fecha del servidor y los días de cada regla de negocio (DEC-072). Uno solo
 * para el listado, su reporte y el tablero de la obra: la cifra y el listado
 * al que lleva cuentan lo mismo. Las de pólizas, solo con `withPolicies`.
 * Devuelve `[[alerta, where]]`, en el orden en que se muestran.
 */
export const contractAlertWheres = ({ today, contractDays, policyDays, withPolicies }) =>
  [
    [CONTRACT_ALERTS.EXPIRING, expiringContractsWhere({ today, days: contractDays })],
    [CONTRACT_ALERTS.EXPIRED, expiredContractsWhere({ today })],
    [CONTRACT_ALERTS.POLICIES_EXPIRING, contractsWithExpiringPoliciesWhere({ today, days: policyDays })],
    [CONTRACT_ALERTS.POLICIES_EXPIRED, contractsWithExpiredPoliciesWhere({ today })],
    [CONTRACT_ALERTS.NO_POLICIES, contractsWithoutPoliciesWhere()],
  ].filter(([alert]) => withPolicies || !POLICY_ALERTS.includes(alert));
