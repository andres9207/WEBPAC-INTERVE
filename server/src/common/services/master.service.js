import { prisma } from "../configs/prismaClient.js";
import { paginate, MAX_ROWS, searchWhere, countByStatus } from "../utils/pagination.utils.js";
import { USER_NAME_SELECT, userFullName } from "../utils/user.utils.js";
import { runIdempotent } from "./idempotency.service.js";
import { withLockedTransaction, withTransaction } from "./transaction.service.js";
import { AUDIT_OPERATIONS, diffFields, newOperationId, writeAudit } from "./audit.service.js";
import { ACTIVE_STATUS, INACTIVE_STATUS, DELETED_STATUS } from "../constants/status.constants.js";

/**
 * Patrón reutilizable de maestro (MAE-BE-01). Un maestro se declara con
 * `defineMaster(config)` y se obtiene su service con `createMasterService`.
 * Reúne en un solo lugar lo que CRUD_STANDARD exige a todo catálogo:
 *
 *   - Listado con `paginate`, filtros y orden solo sobre columnas declaradas
 *     (la lista blanca es la propia config; nada del cliente llega a Prisma
 *     como nombre de columna).
 *   - Crear idempotente (DEC-016), editar, cambiar estado y eliminar con el
 *     registro bloqueado primero (ADR-0027, DEC-019).
 *   - Unicidad entre no eliminados en el service, respaldada por la columna
 *     generada `<pre>_<columna>_active` + UNIQUE en la BD (CRUD_STANDARD).
 *   - Eliminación lógica (DEC-006) bloqueada si hay dependientes, con un
 *     mensaje que dice cuántos y de qué.
 *   - Selector de activos sin paginar con tope fijo (DEC-018).
 *   - Autor siempre recibido del controller (req.user); nunca del body.
 *   - Bitácora funcional opcional (`audit`), para los maestros que ADR-0013
 *     la exige (tipos de contrato, tipos de póliza).
 *
 * Estado: `save` no toca `sta_id`. Un registro nace activo y cambia de estado
 * solo con `changeStatus`, que tiene su propio permiso (ADR-0003 y
 * siguientes: desactivar tiene otro impacto que corregir un nombre).
 */

const httpError = (statusCode, message) => Object.assign(new Error(message), { statusCode });

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

/**
 * Valida y completa la declaración de un maestro. Falla al cargar el módulo
 * (no en una petición) si falta algo.
 *
 * @param {object} config
 * @param {string} config.model        Tabla/modelo de Prisma (`tbl_identity_documents`).
 * @param {string} config.prefix       Prefijo de columnas (`idd`).
 * @param {string} config.idField      Nombre del id en la API (`iddId`).
 * @param {string} config.lockEntity   Entidad de LOCK_ORDER (`TIPO_IDENTIFICACION`).
 * @param {string} config.label        Nombre del registro en minúsculas, para mensajes.
 * @param {boolean} [config.feminine]  "creada" en vez de "creado".
 * @param {{ entity: string, plural: string }} config.routes  Nombres snake_case de las acciones.
 * @param {object} config.permissions  `{ view, create, edit, delete, changeStatus }` (per_id).
 * @param {Array<object>} config.fields Columnas del dominio (ver FIELD_DEFAULTS). Un campo con
 *   `options` (lista cerrada de valores) se valida contra ella y se filtra por igualdad.
 * @param {string} [config.scopeField] Campo con `options` que divide el catálogo en ámbitos
 *   (el acto al que aplica un motivo, DEC-039): la unicidad se verifica dentro del ámbito y el
 *   selector filtra por él. Debe ser no editable.
 * @param {string} [config.defaultSort] Campo de orden por defecto (el primero ordenable).
 * @param {(row) => string} [config.selectLabel] Texto de la opción del selector.
 * @param {(row) => object} [config.selectExtra] Campos extra de la opción.
 * @param {Array<{ model, column, label, countDeleted? }>} [config.dependents] Referencias que impiden
 *   eliminar. Por defecto cuentan solo las no eliminadas; `countDeleted: true` cuenta también las
 *   eliminadas lógicamente, para dependientes que son historial (obras de una constructora, ADR-0004).
 * @param {string} [config.socketEvent] Evento que recarga los selectores.
 * @param {{ entity: string }} [config.audit] Bitácora funcional (AUDIT_ENTITIES).
 */
export const defineMaster = (config) => {
  const required = ["model", "prefix", "idField", "lockEntity", "label", "routes", "permissions", "fields"];
  const missing = required.filter((key) => config[key] == null);
  if (missing.length > 0) throw new Error(`[master] faltan en la config: ${missing.join(", ")}`);
  for (const action of ["view", "create", "edit", "delete", "changeStatus"]) {
    if (config.permissions[action] == null) throw new Error(`[master] ${config.model}: falta el permiso "${action}"`);
  }

  const fields = config.fields.map((field) => ({
    required: true,
    editable: true,
    unique: false,
    filter: false,
    sortable: false,
    uppercase: false,
    feminine: false, // "esa descripción" en vez de "ese nombre"
    maxLength: 255,
    ...field,
  }));
  const sortable = fields.filter((f) => f.sortable);
  if (config.scopeField) {
    const scope = fields.find((f) => f.name === config.scopeField);
    if (!scope?.options || scope.editable) {
      throw new Error(`[master] ${config.model}: scopeField "${config.scopeField}" debe ser un campo con options y no editable`);
    }
  }

  return Object.freeze({
    feminine: false,
    dependents: [],
    selectLabel: (row) => row[fields[0].column],
    selectExtra: () => ({}),
    defaultSort: sortable[0]?.name ?? "updatedAt",
    ...config,
    fields,
    column: (suffix) => `${config.prefix}_${suffix}`,
  });
};

export const createMasterService = (config) => {
  const { model, idField, lockEntity, fields, dependents } = config;
  const col = config.column;
  const ID = col("id");
  const Label = capitalize(config.label);
  const a = config.feminine ? "a" : "o"; // creado / creada
  const article = config.feminine ? "una" : "un";
  const the = config.feminine ? "la" : "el";
  const The = capitalize(the);

  const byName = Object.fromEntries(fields.map((f) => [f.name, f]));
  const uniqueFields = fields.filter((f) => f.unique);
  const scope = config.scopeField ? byName[config.scopeField] : null;
  const scopeWhere = (value) => (scope && value ? { [scope.column]: String(value) } : {});

  // Lista blanca de orden: campos declarados `sortable`, más estado y fecha.
  const SORT_FIELDS = {
    ...Object.fromEntries(fields.filter((f) => f.sortable).map((f) => [f.name, (order) => ({ [f.column]: order })])),
    statusName: (order) => ({ tbl_status: { sta_name: order } }),
    updatedAt: (order) => ({ [col("update_at")]: order }),
  };

  const fieldSelect = Object.fromEntries(fields.map((f) => [f.column, true]));

  const toDto = (row) => ({
    [idField]: row[ID],
    ...Object.fromEntries(fields.map((f) => [f.name, row[f.column]])),
    staId: row.sta_id,
    statusName: row.tbl_status?.sta_name ?? null,
    updatedAt: row[col("update_at")],
    updatedByName: userFullName(row.updated_by_user),
  });

  const LIST_SELECT = {
    [ID]: true,
    ...fieldSelect,
    sta_id: true,
    [col("update_at")]: true,
    tbl_status: { select: { sta_name: true } },
    updated_by_user: USER_NAME_SELECT,
  };

  // Texto: sin espacios de borde y, si el campo lo pide, en mayúsculas.
  const normalize = (field, value) => {
    if (value == null) return null;
    const text = String(value).trim();
    return field.uppercase ? text.toUpperCase() : text;
  };

  const valuesOf = (input, { isEdit }) =>
    Object.fromEntries(
      fields
        .filter((f) => !isEdit || f.editable)
        .map((f) => [f.column, normalize(f, input[f.name])])
    );

  // Búsqueda general de la vista (DEC-024): el mismo texto en cualquiera de
  // los campos `filter`. Se suma a los filtros por campo.
  const searchColumns = fields.filter((f) => f.filter).map((f) => f.column);

  const pagination = async ({ filters = {}, search, staId, rows, first, sortField, sortOrder }) => {
    const order = Number(sortOrder) === 1 ? "asc" : "desc";
    const orderBy = (SORT_FIELDS[sortField] ?? SORT_FIELDS[config.defaultSort])(order);

    const baseWhere = {
      sta_id: { not: DELETED_STATUS },
      ...Object.fromEntries(
        fields
          .filter((f) => f.filter && filters[f.name])
          .map((f) => [f.column, f.options ? String(filters[f.name]) : { contains: String(filters[f.name]) }])
      ),
      ...searchWhere(searchColumns, search),
    };
    const where = { ...baseWhere, ...(staId ? { AND: [{ sta_id: Number(staId) }] } : {}) };

    // statusCounts: cuántos hay por estado con los mismos filtros de texto,
    // para las pestañas por estado de la vista (sin el filtro de estado, o
    // todas las pestañas menos la elegida mostrarían 0).
    const [page, statusCounts] = await Promise.all([
      paginate(prisma[model], { where, select: LIST_SELECT, orderBy }, { first, rows }),
      countByStatus(prisma[model], baseWhere),
    ]);
    return { ...page, results: page.results.map(toDto), statusCounts };
  };

  const getById = async ({ id }) => {
    const row = await prisma[model].findFirst({
      where: { [ID]: Number(id), sta_id: { not: DELETED_STATUS } },
      select: {
        ...LIST_SELECT,
        [col("create_at")]: true,
        created_by_user: USER_NAME_SELECT,
      },
    });
    if (!row) throw httpError(404, `No se encontró ${the} ${config.label}.`);
    return {
      ...toDto(row),
      createdAt: row[col("create_at")],
      createdByName: userFullName(row.created_by_user),
    };
  };

  /**
   * Opciones del selector (DEC-018): activos, más `includeId` si no está
   * eliminado. Con `scopeField`, solo las del ámbito pedido.
   */
  const select = async ({ includeId, scope: scopeValue } = {}) => {
    const rows = await prisma[model].findMany({
      where: {
        ...scopeWhere(scopeValue),
        OR: [
          { sta_id: ACTIVE_STATUS },
          ...(Number(includeId) > 0 ? [{ [ID]: Number(includeId), sta_id: { not: DELETED_STATUS } }] : []),
        ],
      },
      select: { [ID]: true, ...fieldSelect, sta_id: true },
      orderBy: { [byName[config.selectOrder ?? fields[0].name].column]: "asc" },
      take: MAX_ROWS,
    });
    return rows.map((row) => ({
      value: row[ID],
      label: config.selectLabel(row),
      staId: row.sta_id,
      ...config.selectExtra(row),
    }));
  };

  // Duplicado entre no eliminados (y dentro del ámbito, si lo hay). La
  // colación de la columna decide la igualdad; el mensaje nombra el primer
  // campo que coincide.
  const assertUnique = async (tx, values, excludeId, scopeValue) => {
    const checks = uniqueFields.filter((f) => values[f.column] != null);
    if (checks.length === 0) return;
    const duplicate = await tx[model].findFirst({
      where: {
        sta_id: { not: DELETED_STATUS },
        ...scopeWhere(scopeValue),
        OR: checks.map((f) => ({ [f.column]: values[f.column] })),
        ...(excludeId ? { [ID]: { not: Number(excludeId) } } : {}),
      },
      select: Object.fromEntries(checks.map((f) => [f.column, true])),
    });
    if (!duplicate) return;
    const same = (x, y) => String(x ?? "").localeCompare(String(y ?? ""), "es", { sensitivity: "base" }) === 0;
    const field = checks.find((f) => same(duplicate[f.column], values[f.column])) ?? checks[0];
    throw httpError(400, `Ya existe ${article} ${config.label} con ${field.feminine ? "esa" : "ese"} ${field.label}.`);
  };

  const auditColumns = [...fields.map((f) => f.column), "sta_id"];

  const audit = (tx, { operation, recordId, ctx, before, after }) => {
    if (!config.audit) return null;
    const changes = diffFields(before, after, auditColumns);
    if (changes.length === 0) return null;
    return writeAudit(tx, { operationId: newOperationId(), entity: config.audit.entity, recordId, operation, ctx, changes });
  };

  // Lee el registro ya bloqueado. Eliminado o inexistente: 404 (DEC-006).
  const findLocked = async (tx, id) => {
    const row = await tx[model].findUnique({
      where: { [ID]: Number(id) },
      select: { ...fieldSelect, sta_id: true },
    });
    if (!row || row.sta_id === DELETED_STATUS) throw httpError(404, `No se encontró ${the} ${config.label}.`);
    return row;
  };

  const create = ({ values, useBy, ctx, idempotencyData = {} }) =>
    withTransaction(async (tx) => {
      await assertUnique(tx, values, null, scope && values[scope.column]);
      const data = {
        ...values,
        sta_id: ACTIVE_STATUS,
        [col("create_by")]: Number(useBy),
        [col("update_by")]: Number(useBy),
      };
      const created = await tx[model].create({ data: { ...data, ...idempotencyData } });
      await audit(tx, { operation: AUDIT_OPERATIONS.CREATE, recordId: created[ID], ctx, before: {}, after: data });
      return { message: `${Label} cread${a} correctamente`, [idField]: created[ID] };
    });

  // Editar fija los campos editables: se puede reintentar ante un interbloqueo.
  const update = ({ id, values, useBy, ctx }) =>
    withLockedTransaction(
      { [lockEntity]: id },
      async (tx) => {
        const before = await findLocked(tx, id);
        // El ámbito no es editable: se toma del registro.
        await assertUnique(tx, values, id, scope && before[scope.column]);
        await tx[model].update({ where: { [ID]: Number(id) }, data: { ...values, [col("update_by")]: Number(useBy) } });
        await audit(tx, { operation: AUDIT_OPERATIONS.UPDATE, recordId: Number(id), ctx, before, after: values });
        return { message: `${Label} modificad${a} correctamente` };
      },
      { idempotent: true }
    );

  const IDEMPOTENCY_TARGET = {
    model: prisma[model],
    keyField: col("idempotency_key"),
    hashField: col("idempotency_hash"),
    ownerField: col("create_by"),
    select: { [ID]: true },
    toResult: (row) => ({ message: `${Label} cread${a} correctamente`, [idField]: row[ID] }),
  };

  /**
   * Crear (id vacío o 0) o editar. En la edición se ignoran los campos no
   * editables. El estado no se toca: ver changeStatus.
   */
  const save = ({ id, input, useBy, ctx = { useId: useBy }, idempotencyKey }) => {
    const isEdit = Number(id) > 0;
    const values = valuesOf(input, { isEdit });
    if (isEdit) return update({ id, values, useBy, ctx });

    // La clave se busca antes que el duplicado: el reintento de una creación
    // exitosa devuelve lo creado y no "ya existe".
    return runIdempotent({
      target: IDEMPOTENCY_TARGET,
      key: idempotencyKey,
      ownerId: useBy,
      payload: Object.fromEntries(fields.map((f) => [f.name, values[f.column]])),
      execute: (idempotencyData) => create({ values, useBy, ctx, idempotencyData }),
    });
  };

  /** Activar o desactivar. Fija un estado final: reintentable. */
  const changeStatus = ({ id, staId, useBy, ctx = { useId: useBy } }) =>
    withLockedTransaction(
      { [lockEntity]: id },
      async (tx) => {
        const before = await findLocked(tx, id);
        const next = Number(staId);
        if (next !== ACTIVE_STATUS && next !== INACTIVE_STATUS) {
          throw httpError(400, "El estado debe ser activo o inactivo.");
        }
        if (before.sta_id !== next) {
          await tx[model].update({ where: { [ID]: Number(id) }, data: { sta_id: next, [col("update_by")]: Number(useBy) } });
          await audit(tx, { operation: AUDIT_OPERATIONS.UPDATE, recordId: Number(id), ctx, before, after: { sta_id: next } });
        }
        return { message: `${Label} ${next === ACTIVE_STATUS ? "activad" : "desactivad"}${a} correctamente`, staId: next };
      },
      { idempotent: true }
    );

  /**
   * Eliminación lógica. El registro se bloquea primero: quien asigna el
   * maestro también lo bloquea (DEC-019), así que contar los dependientes y
   * eliminar no se cruza con una asignación.
   */
  const remove = ({ id, useBy, ctx = { useId: useBy } }) =>
    withLockedTransaction({ [lockEntity]: id }, async (tx) => {
      const before = await findLocked(tx, id);

      for (const dependent of dependents) {
        const count = await tx[dependent.model].count({
          where: {
            [dependent.column]: Number(id),
            ...(dependent.countDeleted ? {} : { sta_id: { not: DELETED_STATUS } }),
          },
        });
        if (count > 0) {
          throw httpError(
            400,
            `No se puede eliminar ${the} ${config.label}: l${a} usan ${count} ${dependent.label}. Puedes desactivarl${a} para que no se asigne en registros nuevos.`
          );
        }
      }

      await tx[model].update({
        where: { [ID]: Number(id) },
        data: {
          sta_id: DELETED_STATUS,
          [col("update_by")]: Number(useBy),
          [col("delete_by")]: Number(useBy),
          [col("delete_at")]: new Date(),
        },
      });
      await audit(tx, { operation: AUDIT_OPERATIONS.DELETE, recordId: Number(id), ctx, before, after: { sta_id: DELETED_STATUS } });
      return { message: `${Label} eliminad${a} correctamente` };
    });

  /**
   * Para los services que ASIGNAN este maestro a otro registro, dentro de su
   * transacción y con el maestro ya bloqueado (DEC-019). Un valor inactivo
   * no se asigna, salvo que sea el que el registro ya tenía (DOM-21).
   * Devuelve la fila (campos declarados y estado) para quien necesite sus
   * datos, p. ej. el código de un tipo para validar un formato.
   */
  const assertAssignable = async (tx, id, currentId = null) => {
    if (!id) return null;
    const row = await tx[model].findUnique({ where: { [ID]: Number(id) }, select: { ...fieldSelect, sta_id: true } });
    if (!row || row.sta_id === DELETED_STATUS) {
      throw httpError(400, `${The} ${config.label} seleccionad${a} no existe.`);
    }
    if (row.sta_id !== ACTIVE_STATUS && Number(id) !== Number(currentId)) {
      throw httpError(400, `${The} ${config.label} seleccionad${a} está inactiv${a}.`);
    }
    return row;
  };

  return { pagination, getById, select, save, changeStatus, remove, assertAssignable };
};
