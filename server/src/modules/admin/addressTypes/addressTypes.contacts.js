import { addressTypesService } from "./addressTypes.service.js";

/**
 * Contactos tipificados por el tipo de dirección (ADR-0009): la misma
 * estructura y las mismas reglas para los de proveedor y los de obra, cada
 * uno en su tabla (decisión 3: sin tabla polimórfica). No es un módulo: los
 * contactos son parte de su dueño y se guardan con él, por diferencial
 * (MAE-BE-06). Cada service declara su tabla con `defineContacts`.
 *
 * - "Principal" es una marca, a lo sumo una por dueño (decisión 7): lo
 *   garantiza el UNIQUE sobre la columna generada; aquí, el mensaje.
 * - Al menos un medio de contacto: lo exige el CHECK; aquí, el mensaje.
 * - Un tipo de dirección inactivo se conserva en el contacto que ya lo tenía,
 *   pero no se asigna (decisión 9). Con los tipos ya bloqueados.
 * - Hacia el cliente, una sola forma (`contactId`), sea cual sea la tabla.
 */

const httpError = (statusCode, message) => Object.assign(new Error(message), { statusCode });
const optionalText = (value) => String(value ?? "").trim() || null;

const FIELDS = ["name", "position", "address", "phone", "mobile", "fax", "email", "observation"];

/**
 * @param {{ model: string, prefix: string, ownerColumn: string, ownerLabel: string }} config
 *   p. ej. `{ model: "tbl_work_contacts", prefix: "wkc", ownerColumn: "wrk_id", ownerLabel: "esta obra" }`
 */
export const defineContacts = ({ model, prefix, ownerColumn, ownerLabel }) => {
  const ID = `${prefix}_id`;
  const MAIN = `${prefix}_main`;
  const col = (field) => `${prefix}_${field}`;
  const COLUMNS = ["adt_id", ...FIELDS.map(col), MAIN];
  const SELECT = { [ID]: true, ...Object.fromEntries(COLUMNS.map((column) => [column, true])) };

  /** Contactos para el detalle del dueño, con el nombre de su tipo. */
  const detailSelect = {
    select: { ...SELECT, tbl_address_types: { select: { adt_name: true } } },
    orderBy: [{ [MAIN]: "desc" }, { [ID]: "asc" }],
  };

  const toDto = (row) => ({
    contactId: row[ID],
    adtId: row.adt_id,
    addressType: row.tbl_address_types?.adt_name ?? null,
    ...Object.fromEntries(FIELDS.map((field) => [field, row[col(field)]])),
    main: Boolean(row[MAIN]),
  });

  /** Lo que pidió el cliente, en columnas. */
  const fromInput = (input) =>
    (input ?? []).map((c) => ({
      [ID]: Number(c.contactId) > 0 ? Number(c.contactId) : null,
      adt_id: Number(c.adtId),
      ...Object.fromEntries(FIELDS.map((field) => [col(field), optionalText(c[field])])),
      [MAIN]: c.main === true || c.main === 1 || c.main === "1" || c.main === "true",
    }));

  /** Reglas de la lista, sin BD. */
  const assertList = (contacts) => {
    if (contacts.filter((c) => c[MAIN]).length > 1) throw httpError(400, "Solo un contacto puede ser el principal.");
    contacts.forEach((c, i) => {
      if (!c[col("address")] && !c[col("phone")] && !c[col("mobile")] && !c[col("email")]) {
        throw httpError(400, `El contacto ${i + 1} necesita al menos una dirección, un teléfono, un celular o un correo.`);
      }
    });
    const ids = contacts.filter((c) => c[ID]).map((c) => c[ID]);
    if (new Set(ids).size !== ids.length) throw httpError(400, "Un contacto aparece dos veces en la lista.");
  };

  /** Bloqueos de los tipos de dirección usados (LOCK_ORDER: TIPO_DIRECCION). */
  const locksOf = (contacts) => {
    const addressTypes = [...new Set(contacts.map((c) => c.adt_id))];
    return addressTypes.length > 0 ? { TIPO_DIRECCION: addressTypes } : {};
  };

  /** Contactos actuales del dueño, leídos en la transacción (para el diferencial). */
  const findCurrent = (tx, ownerId) => tx[model].findMany({ where: { [ownerColumn]: ownerId }, select: SELECT });

  const assertAddressTypes = async (tx, contacts, current = []) => {
    const currentById = new Map(current.map((c) => [c[ID], c]));
    for (const contact of contacts) {
      await addressTypesService.assertAssignable(tx, contact.adt_id, currentById.get(contact[ID])?.adt_id);
    }
  };

  /** Diferencial contra la BD, nunca contra una lista anterior del cliente. */
  const diff = (current, desired) => {
    const currentById = new Map(current.map((c) => [c[ID], c]));
    for (const contact of desired) {
      // Un id de contacto ajeno a este dueño no se acepta.
      if (contact[ID] && !currentById.has(contact[ID])) throw httpError(400, `Uno de los contactos no pertenece a ${ownerLabel}.`);
    }
    const keptIds = new Set(desired.filter((c) => c[ID]).map((c) => c[ID]));
    return {
      toInsert: desired.filter((c) => !c[ID]),
      toDelete: current.filter((c) => !keptIds.has(c[ID])),
      toUpdate: desired.filter((c) => {
        const before = c[ID] && currentById.get(c[ID]);
        return before && COLUMNS.some((column) => (before[column] ?? null) !== (c[column] ?? null));
      }),
    };
  };

  const hasChanges = (d) => d.toInsert.length > 0 || d.toDelete.length > 0 || d.toUpdate.length > 0;

  // Primero bajas y quitar la marca de principal, después altas: el UNIQUE de
  // la columna generada no admite dos principales ni por un instante.
  const apply = async (tx, { ownerId, diff: d, useBy }) => {
    if (d.toDelete.length > 0) {
      await tx[model].deleteMany({ where: { [ownerColumn]: ownerId, [ID]: { in: d.toDelete.map((c) => c[ID]) } } });
    }
    const ordered = [...d.toUpdate].sort((a, b) => Number(a[MAIN]) - Number(b[MAIN]));
    for (const { [ID]: id, ...contact } of ordered) {
      await tx[model].updateMany({ where: { [ID]: id, [ownerColumn]: ownerId }, data: { ...contact, [col("update_by")]: useBy } });
    }
    if (d.toInsert.length > 0) {
      await tx[model].createMany({
        data: d.toInsert.map(({ [ID]: _id, ...contact }) => ({
          [ownerColumn]: ownerId,
          ...contact,
          [col("create_by")]: useBy,
          [col("update_by")]: useBy,
        })),
      });
    }
  };

  return { detailSelect, toDto, fromInput, assertList, locksOf, findCurrent, assertAddressTypes, diff, hasChanges, apply };
};
