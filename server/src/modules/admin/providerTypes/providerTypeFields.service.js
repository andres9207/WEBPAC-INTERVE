import { prisma } from "../../../common/configs/prismaClient.js";
import { withLockedTransaction } from "../../../common/services/transaction.service.js";
import { AUDIT_ENTITIES, AUDIT_OPERATIONS, writeAudit } from "../../../common/services/audit.service.js";
import { mergeTypeRows, resolveFields } from "./contractFields.js";
import { DELETED_STATUS } from "../../../common/constants/status.constants.js";

/**
 * Configuración de los campos del contrato por tipo de proveedor (DEC-053,
 * que reemplaza a DEC-037; ADR-0006 sigue rigiendo el modelo).
 *
 * - `resolveProviderFields` es la única lectura de la configuración para el
 *   formulario de contrato y para su guardado (contracts.service.js y
 *   contractConcepts.service.js la usan dentro de su transacción). Resuelve
 *   la unión de los tipos del proveedor (mergeTypeRows).
 * - Guardar es un diferencial (altas, cambios, bajas) en una transacción,
 *   con el tipo bloqueado, como updateProfilePermissions. Solo se guardan los
 *   campos que aplican: la ausencia de fila es "no aplica".
 * - Si algo cambió: sube pvt_config_version, copia la configuración completa
 *   al historial de versiones y deja en la bitácora cada campo con su valor
 *   anterior y nuevo. Los contratos existentes no se tocan: un valor que deja
 *   de aplicar queda como heredado.
 */

const httpError = (statusCode, message) => Object.assign(new Error(message), { statusCode });

const CATALOG_SELECT = { cfd_id: true, cfd_key: true, cfd_label: true, cfd_data_type: true, cfd_group: true, cfd_order: true };

const loadCatalog = (db) => db.tbl_contract_fields.findMany({ select: CATALOG_SELECT, orderBy: [{ cfd_group: "asc" }, { cfd_order: "asc" }] });

/** Filas de configuración de uno o varios tipos, normalizadas. */
const currentRows = async (db, pvtIds) => {
  const rows = await db.tbl_provider_type_fields.findMany({
    where: { pvt_id: { in: pvtIds } },
    select: { cfd_id: true, ptf_applies: true, ptf_visible: true, ptf_required: true, ptf_order: true },
  });
  return rows.map((r) => ({ cfd_id: r.cfd_id, applies: r.ptf_applies, visible: r.ptf_visible, required: r.ptf_required, order: r.ptf_order }));
};

/** Descriptores de campo de un solo tipo, para su editor. `db` es `prisma` o el `tx`. */
const resolveTypeFields = async (db, pvtId) => {
  const [catalog, rows] = await Promise.all([loadCatalog(db), currentRows(db, [Number(pvtId)])]);
  return resolveFields(catalog, rows);
};

/**
 * Descriptores de campo del contrato de un proveedor: la unión de la
 * configuración de todos sus tipos (DEC-041: uno o varios). Un campo aplica,
 * se ve o es obligatorio si lo es en alguno de ellos. Los tipos del proveedor
 * no cambian mientras quien llama tenga bloqueado el PROVEEDOR: se guardan
 * con él (DEC-041).
 */
export const resolveProviderFields = async (db, prvId) => {
  const classifications = await db.tbl_provider_classifications.findMany({ where: { prv_id: Number(prvId) }, select: { pvt_id: true } });
  const pvtIds = classifications.map((c) => c.pvt_id);
  const [catalog, rows] = await Promise.all([loadCatalog(db), pvtIds.length > 0 ? currentRows(db, pvtIds) : []]);
  return resolveFields(catalog, mergeTypeRows(rows));
};

const findType = async (db, pvtId) => {
  const type = await db.tbl_provider_types.findUnique({
    where: { pvt_id: Number(pvtId) },
    select: { pvt_id: true, pvt_name: true, pvt_config_version: true, sta_id: true },
  });
  if (!type || type.sta_id === DELETED_STATUS) throw httpError(404, "No se encontró el tipo de proveedor.");
  return type;
};

/** Tipo con su versión vigente y su configuración, para el editor. */
export const getProviderTypeFields = async ({ pvtId }) => {
  const type = await findType(prisma, pvtId);
  return {
    pvtId: type.pvt_id,
    name: type.pvt_name,
    configVersion: type.pvt_config_version,
    fields: await resolveTypeFields(prisma, type.pvt_id),
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
export const saveProviderTypeFields = ({ pvtId, fields, useBy, ctx = { useId: useBy } }) =>
  withLockedTransaction(
    { TIPO_PROVEEDOR: pvtId },
    async (tx) => {
      const type = await findType(tx, pvtId);
      const catalog = await loadCatalog(tx);
      const desired = desiredRows(catalog, fields ?? []);
      const current = await currentRows(tx, [type.pvt_id]);

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
        return { message: "La configuración no cambió.", pvtId: type.pvt_id, configVersion: type.pvt_config_version, changed: false };
      }

      const by = Number(useBy);
      if (toDelete.length > 0) {
        await tx.tbl_provider_type_fields.deleteMany({ where: { pvt_id: type.pvt_id, cfd_id: { in: toDelete } } });
      }
      if (toCreate.length > 0) {
        await tx.tbl_provider_type_fields.createMany({
          data: toCreate.map((r) => ({
            pvt_id: type.pvt_id,
            cfd_id: r.cfd_id,
            ptf_applies: r.applies,
            ptf_visible: r.visible,
            ptf_required: r.required,
            ptf_order: r.order,
            ptf_create_by: by,
            ptf_update_by: by,
          })),
        });
      }
      for (const r of toUpdate) {
        await tx.tbl_provider_type_fields.update({
          where: { pvt_id_cfd_id: { pvt_id: type.pvt_id, cfd_id: r.cfd_id } },
          data: { ptf_applies: r.applies, ptf_visible: r.visible, ptf_required: r.required, ptf_order: r.order, ptf_update_by: by },
        });
      }

      const version = type.pvt_config_version + 1;
      await tx.tbl_provider_types.update({ where: { pvt_id: type.pvt_id }, data: { pvt_config_version: version, pvt_update_by: by } });
      if (desired.length > 0) {
        await tx.tbl_provider_type_field_versions.createMany({
          data: desired.map((r) => ({
            pvt_id: type.pvt_id,
            pfv_version: version,
            cfd_id: r.cfd_id,
            pfv_applies: r.applies,
            pfv_visible: r.visible,
            pfv_required: r.required,
            pfv_order: r.order,
            pfv_create_by: by,
          })),
        });
      }

      await writeAudit(tx, {
        entity: AUDIT_ENTITIES.PROVIDER_TYPE,
        recordId: type.pvt_id,
        operation: AUDIT_OPERATIONS.UPDATE,
        ctx,
        changes: [...changes, { field: "pvt_config_version", oldValue: String(type.pvt_config_version), newValue: String(version) }],
      });

      return { message: `Configuración guardada (versión ${version}).`, pvtId: type.pvt_id, configVersion: version, changed: true };
    },
    { idempotent: true }
  );
