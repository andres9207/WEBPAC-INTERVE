/**
 * Catálogo de estados de visibilidad (tbl_status, DEC-038). Único lugar del
 * servidor donde aparece el número de un estado: el resto del código importa
 * estas constantes, nunca escribe `1` o `3` a mano.
 *
 * La clave (`sta_key`) es la identidad del estado; el id es fijo y lo siembra
 * la migración 0058. Al arrancar, verifyStatusCatalog (status.service.js)
 * comprueba que cada clave tenga en la BD el id de aquí. Un test cruza esta
 * tabla con la migración y con prisma/seed.js.
 *
 * Solo visibilidad y eliminación lógica: el ciclo de vida de un agregado va
 * en su propia columna de estado (WORKFLOW_STANDARD, regla 2; DEC-035).
 */
export const STATUS_IDS = Object.freeze({
  ACTIVE: 1,
  INACTIVE: 2,
  DELETED: 3,
});

export const ACTIVE_STATUS = STATUS_IDS.ACTIVE;
export const INACTIVE_STATUS = STATUS_IDS.INACTIVE;
export const DELETED_STATUS = STATUS_IDS.DELETED;

/** Claves válidas, para validar filtros que llegan por la API. */
export const STATUS_KEYS = Object.freeze(Object.keys(STATUS_IDS));

/**
 * Lo que acepta un campo `staId` editable: activo o inactivo, como número o
 * como texto. Eliminar tiene su propio endpoint, nunca llega por aquí.
 */
export const EDITABLE_STATUS_VALUES = Object.freeze([ACTIVE_STATUS, INACTIVE_STATUS].flatMap((id) => [id, String(id)]));
