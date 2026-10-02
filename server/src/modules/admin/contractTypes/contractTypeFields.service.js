import { prisma } from "../../../common/configs/prismaClient.js";
import { withLockedTransaction } from "../../../common/services/transaction.service.js";
import { AUDIT_ENTITIES, AUDIT_OPERATIONS, writeAudit } from "../../../common/services/audit.service.js";
import { resolveFields } from "./contractFields.js";
import { DELETED_STATUS } from "../../../common/constants/status.constants.js";

/**
 * Configuración de campos por tipo de contrato (ADR-0006, DEC-037).
 *
 * - `resolveContractFields` es la única lectura de la configuración para el
 *   formulario de contrato y para su guardado (contracts.service.js y
 *   contractConcepts.service.js la usan dentro de su transacción).
 * - Guardar es un diferencial (altas, cambios, bajas) en una transacción,
 *   con el tipo bloqueado, como updateProfilePermissions. Solo se guardan los
 *   campos que aplican: la ausencia de fila es "no aplica".
 * - Si algo cambió: sube ctt_config_version, copia la configuración completa
 *   al historial de versiones y deja en la bitácora cada campo con su valor
 *   anterior y nuevo (ADR-0006, decisiones 9 y 10). Los contratos existentes
 *   no se tocan (decisión 7).
 */

const httpError = (statusCode, message) => Object.assign(new Error(message), { statusCode });

const CATALOG_SELECT = { cfd_id: true, cfd_key: true, cfd_label: true, cfd_data_type: true, cfd_group: true, cfd_order: true };

const loadCatalog = (db) => db.tbl_contract_fields.findMany({ select: CATALOG_SELECT, orderBy: [{ cfd_group: "asc" }, { cfd_order: "asc" }] });

const currentRows = async (db, cttId) => {
  const rows = await db.tbl_contract_type_fields.findMany({
    where: { ctt_id: cttId },
    select: { cfd_id: true, ctf_applies: true, ctf_visible: true, ctf_required: true, ctf_order: true },
  });
  return rows.map((r) => ({ cfd_id: r.cfd_id, applies: r.ctf_applies, visible: r.ctf_visible, required: r.ctf_required, order: r.ctf_order }));
};

const versionRows = async (db, cttId, version) => {
  const rows = await db.tbl_contract_type_field_versions.findMany({
    where: { ctt_id: cttId, cfv_version: version },
    select: { cfd_id: true, cfv_applies: true, cfv_visible: true, cfv_required: true, cfv_order: true },
  });
  return rows.map((r) => ({ cfd_id: r.cfd_id, applies: r.cfv_applies, visible: r.cfv_visible, required: r.cfv_required, order: r.cfv_order }));
};

/**
 * Descriptores de campo de un tipo: los de su configuración actual o, con
 * `version`, los de esa versión (para reconstruir el formulario con que se
 * capturó un contrato). `db` es `prisma` o el `tx` de la transacción.
 */
export const resolveContractFields = async (db, cttId, { version } = {}) => {
  const id = Number(cttId);
  const [catalog, rows] = await Promise.all([loadCatalog(db), version ? versionRows(db, id, Number(version)) : currentRows(db, id)]);
  return resolveFields(catalog, rows);
};

const findType = async (db, cttId) => {
  const type = await db.tbl_contract_types.findUnique({
    where: { ctt_id: Number(cttId) },
    select: { ctt_id: true, ctt_name: true, ctt_config_version: true, sta_id: true },
  });
  if (!type || type.sta_id === DELETED_STATUS) throw httpError(404, "No se encontró el tipo de contrato.");
  return type;
};

/** Tipo con su versión vigente y su configuración, para el editor (MAE-FE-08). */
export const getContractTypeFields = async ({ cttId }) => {
  const type = await findType(prisma, cttId);
  return {
    cttId: type.ctt_id,
    name: type.ctt_name,
    configVersion: type.ctt_config_version,
    fields: await resolveContractFields(prisma, type.ctt_id),
  };
};

/** Estado de un campo, legible en la bitácora. */
const stateText = (row) => {
  if (!row?.applies) return "no aplica";
  return ["aplica", row.visible ? "visible" : "oculto", ...(row.required ? ["obligatorio"] : []), `orden ${row.order}`].join(", ");
};

/**
 * Lo que pide el editor → filas a guardar. Valida que cada campo sea del
 * catálogo, que no se repita y la jerarquía (también la exige un CHECK).
 */
const desiredRows = (catalog, fields) => {
  const catalogById = new Map(catalog.map((f) => [f.cfd_id, f]));
  const seen = new Set();
  const rows = [];
  for (const field of fields) {
    const cfdId = Number(field.cfdId);
    const entry = catalogById.get(cfdId);
    if (!entry) throw httpError(400, `El campo ${cfdId} no existe en el catálogo de campos configurables.`);
    if (seen.has(cfdId)) throw httpError(400, `El campo "${entry.cfd_label}" está repetido.`);
    seen.add(cfdId);

    const applies = field.applies === true;
    const visible = field.visible === true;
    const required = field.required === true;
    if (visible && !applies) throw httpError(400, `"${entry.cfd_label}": un campo que no aplica no puede ser visible.`);
    if (required && !visible) throw httpError(400, `"${entry.cfd_label}": un campo obligatorio debe aplicar y ser visible.`);
    if (applies) rows.push({ cfd_id: cfdId, applies, visible, required, order: Number(field.order) });
  }
  return rows;
};

const sameRow = (a, b) => a.applies === b.applies && a.visible === b.visible && a.required === b.required && a.order === b.order;

/**
 * Guarda la configuración completa de un tipo. `fields` trae los campos del
 * catálogo con aplica, visible, obligatorio y orden; uno ausente no aplica.
 * Fija un estado final: repetirlo no cambia nada (sin cambios, no sube la
 * versión), así que es reintentable.
 */
export const saveContractTypeFields = ({ cttId, fields, useBy, ctx = { useId: useBy } }) =>
  withLockedTransaction(
    { TIPO_CONTRATO: cttId },
    async (tx) => {
      const type = await findType(tx, cttId);
      const catalog = await loadCatalog(tx);
      const desired = desiredRows(catalog, fields ?? []);
      const current = await currentRows(tx, type.ctt_id);

      const desiredById = new Map(desired.map((r) => [r.cfd_id, r]));
      const currentById = new Map(current.map((r) => [r.cfd_id, r]));
      const toCreate = desired.filter((r) => !currentById.has(r.cfd_id));
      const toUpdate = desired.filter((r) => currentById.has(r.cfd_id) && !sameRow(r, currentById.get(r.cfd_id)));
      const toDelete = current.filter((r) => !desiredById.has(r.cfd_id)).map((r) => r.cfd_id);

      const changes = catalog
        .map((field) => ({ field, before: stateText(currentById.get(field.cfd_id)), after: stateText(desiredById.get(field.cfd_id)) }))
        .filter(({ before, after }) => before !== after)
        .map(({ field, before, after }) => ({ field: `campo:${field.cfd_key}`, oldValue: before, newValue: after }));

      if (changes.length === 0) {
        return { message: "La configuración no cambió.", cttId: type.ctt_id, configVersion: type.ctt_config_version, changed: false };
      }

      const by = Number(useBy);
      if (toDelete.length > 0) {
        await tx.tbl_contract_type_fields.deleteMany({ where: { ctt_id: type.ctt_id, cfd_id: { in: toDelete } } });
      }
      if (toCreate.length > 0) {
        await tx.tbl_contract_type_fields.createMany({
          data: toCreate.map((r) => ({
            ctt_id: type.ctt_id,
            cfd_id: r.cfd_id,
            ctf_applies: r.applies,
            ctf_visible: r.visible,
            ctf_required: r.required,
            ctf_order: r.order,
            ctf_create_by: by,
            ctf_update_by: by,
          })),
        });
      }
      for (const r of toUpdate) {
        await tx.tbl_contract_type_fields.update({
          where: { ctt_id_cfd_id: { ctt_id: type.ctt_id, cfd_id: r.cfd_id } },
          data: { ctf_applies: r.applies, ctf_visible: r.visible, ctf_required: r.required, ctf_order: r.order, ctf_update_by: by },
        });
      }

      const version = type.ctt_config_version + 1;
      await tx.tbl_contract_types.update({ where: { ctt_id: type.ctt_id }, data: { ctt_config_version: version, ctt_update_by: by } });
      if (desired.length > 0) {
        await tx.tbl_contract_type_field_versions.createMany({
          data: desired.map((r) => ({
            ctt_id: type.ctt_id,
            cfv_version: version,
            cfd_id: r.cfd_id,
            cfv_applies: r.applies,
            cfv_visible: r.visible,
            cfv_required: r.required,
            cfv_order: r.order,
            cfv_create_by: by,
          })),
        });
      }

      await writeAudit(tx, {
        entity: AUDIT_ENTITIES.CONTRACT_TYPE,
        recordId: type.ctt_id,
        operation: AUDIT_OPERATIONS.UPDATE,
        ctx,
        changes: [...changes, { field: "ctt_config_version", oldValue: String(type.ctt_config_version), newValue: String(version) }],
      });

      return { message: `Configuración guardada (versión ${version}).`, cttId: type.ctt_id, configVersion: version, changed: true };
    },
    { idempotent: true }
  );
