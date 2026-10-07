import { PERMISSIONS } from "../../../common/constants/permissions.constants.js";
import { DELETED_STATUS } from "../../../common/constants/status.constants.js";
import { defineMaster, createMasterService } from "../../../common/services/master.service.js";
import { withLockedTransaction } from "../../../common/services/transaction.service.js";
import { AUDIT_ENTITIES, AUDIT_OPERATIONS, newOperationId, writeAudit } from "../../../common/services/audit.service.js";
import { POLICY_BASES, POLICY_BASE_NAMES } from "./policyBases.js";

const httpError = (statusCode, message) => Object.assign(new Error(message), { statusCode });

// Maestro de tipos de póliza (ADR-0019, DEC-050). Maestro con efecto
// funcional: la base de cálculo decide sobre qué importe del concepto se
// aplica el porcentaje de cada póliza del tipo. Nivel 2: bitácora funcional.
//
// - La clave simbólica se fija al crear y no se edita (la referencian el
//   código y las pólizas).
// - La base se elige al crear. Después solo la cambia configureBase, con su
//   propio permiso: el formulario de edición no la toca.
// - Sin semillas: los tipos y sus bases los define quien tenga el permiso
//   (backlog DEC-04 pendiente).
export const policyTypesConfig = defineMaster({
  model: "tbl_policy_types",
  prefix: "plt",
  idField: "pltId",
  lockEntity: "TIPO_POLIZA",
  label: "tipo de póliza",
  routes: { entity: "policy_type", plural: "policy_types" },
  permissions: PERMISSIONS.admin.policyTypes,
  fields: [
    {
      name: "key",
      column: "plt_key",
      label: "clave",
      feminine: true,
      maxLength: 30,
      unique: true,
      uppercase: true,
      editable: false,
      pattern: {
        regex: /^[A-Za-z][A-Za-z0-9_]*$/,
        message: "La clave empieza con una letra y solo admite letras, dígitos y guion bajo.",
      },
      filter: true,
      sortable: true,
    },
    { name: "name", column: "plt_name", label: "nombre", maxLength: 100, unique: true, filter: true, sortable: true },
    {
      name: "base",
      column: "plt_base",
      label: "base de cálculo",
      feminine: true,
      maxLength: 20,
      options: Object.values(POLICY_BASES),
      editable: false,
      filter: true,
      sortable: true,
    },
  ],
  defaultSort: "name",
  selectOrder: "name",
  selectLabel: (row) => row.plt_name,
  selectExtra: (row) => ({ base: row.plt_base, baseName: POLICY_BASE_NAMES[row.plt_base] }),
  // Las pólizas no se eliminan (anuladas y versiones cerradas son evidencia):
  // cuentan todas.
  dependents: [{ model: "tbl_policies", column: "plt_id", label: "póliza(s)", countDeleted: true }],
  socketEvent: "refresh-policy-types",
  audit: { entity: AUDIT_ENTITIES.POLICY_TYPE },
});

export const policyTypesService = createMasterService(policyTypesConfig);

/**
 * Cambiar la base de cálculo de un tipo (ADR-0019, decisiones 7 y 10). No
 * recalcula nada: cada versión de póliza guarda la base con que se emitió.
 * La bitácora conserva cuántas pólizas vigentes tenía el tipo, para
 * dimensionar después el alcance del cambio. Fija un estado final:
 * reintentable.
 */
export const configurePolicyTypeBase = async ({ pltId, base, useBy, ctx = { useId: useBy } }) => {
  if (!Object.values(POLICY_BASES).includes(base)) throw httpError(400, "La base de cálculo no es válida.");

  return withLockedTransaction(
    { TIPO_POLIZA: pltId },
    async (tx) => {
      const before = await tx.tbl_policy_types.findUnique({
        where: { plt_id: Number(pltId) },
        select: { plt_base: true, sta_id: true },
      });
      if (!before || before.sta_id === DELETED_STATUS) throw httpError(404, "No se encontró el tipo de póliza.");
      if (before.plt_base === base) return { message: "La base de cálculo no cambió.", base };

      const currentPolicies = await tx.tbl_policies.count({ where: { plt_id: Number(pltId), pol_is_current: true } });
      await tx.tbl_policy_types.update({ where: { plt_id: Number(pltId) }, data: { plt_base: base, plt_update_by: Number(useBy) } });
      await writeAudit(tx, {
        operationId: newOperationId(),
        entity: AUDIT_ENTITIES.POLICY_TYPE,
        recordId: Number(pltId),
        operation: AUDIT_OPERATIONS.UPDATE,
        ctx,
        changes: [
          { field: "plt_base", oldValue: before.plt_base, newValue: base },
          { field: "polizas_vigentes_al_cambio", oldValue: null, newValue: currentPolicies },
        ],
      });
      return { message: `Base de cálculo cambiada a ${POLICY_BASE_NAMES[base]}. Las pólizas ya emitidas conservan la suya.`, base };
    },
    { idempotent: true }
  );
};
