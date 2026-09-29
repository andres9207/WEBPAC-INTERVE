> ⛔ **NO APLICA A ESTE PROYECTO (WEBPAC-INTERVE).** Esta guía es de CSUR, otro proyecto. Sus rutas (`client/src/pages/admin`, `/management/{module}`, `routes.js`), su stack (PrimeReact, SQL crudo con `executeQuery`) y sus prácticas (autor enviado desde el cliente, valores interpolados en SQL) no existen o están prohibidos aquí. Para un maestro de este proyecto usar [`engineering/standards/CRUD_STANDARD.md`](../engineering/standards/CRUD_STANDARD.md), [`engineering/patterns/SIMPLE_CRUD.md`](../engineering/patterns/SIMPLE_CRUD.md) y los nombres de [DEC-017](../engineering/decisiones/DEC-017-area-idioma-maestros.md).

# AI Module Generation Reference — CSUR

Guía de implementación para agentes de IA que generan **módulos maestros** (CRUD de catálogo)
en el sistema **CSUR** (HR/Nómina, locale español, lógica Colombia).

> Este documento es el equivalente, adaptado al stack **real** de CSUR, del genérico
> `ai-module-generation-reference-example.md`. Aquel describe otro proyecto
> (TypeScript + MUI + `crudFactory` + `MasterView` + multi‑tenant `com_id`).
> **CSUR NO usa nada de eso.** Este archivo describe cómo se hacen los módulos aquí de verdad.

**Módulo de referencia (maestro dorado): `activity` / `Actividades`.**
- Frontend: [client/src/pages/admin/Activiy.jsx](../client/src/pages/admin/Activiy.jsx)
- Modal: [client/src/pages/admin/components/modal/VenActivity.jsx](../client/src/pages/admin/components/modal/VenActivity.jsx)
- Backend: [server/src/modules/admin/activity/](../server/src/modules/admin/activity/)
- Tabla: `tbl_actividad` en [database/bdcsur.sql](../database/bdcsur.sql)

---

# 1. Stack real

| Capa | CSUR (real) | NO usa |
|------|-----------------|--------|
| Lenguaje | JavaScript (ESM) | ~~TypeScript~~ |
| Cliente | React 17 SPA, `HashRouter` | ~~Next.js / sections.tsx~~ |
| UI | **PrimeReact 7.2** + PrimeFlex + PrimeIcons | ~~MUI~~ |
| Estado | `useReducer` + `useContext` (hooks propios) | ~~Redux / React Query~~ |
| Forms | `react-hook-form` 7 + `GenericFormSection` | ~~Zod / MUI TextField~~ |
| HTTP cliente | Axios vía `@api/services/httpCliente` | — |
| Servidor | Express 4, **SQL crudo** con `executeQuery` | ~~ORM / crudFactory / Zod~~ |
| Auth | JWT en cookie httpOnly `tokenMAQUINARIA`, middleware `verifyToken` | ~~requireTenant~~ |
| DB | MySQL2 pool, tablas `tbl_*`, columnas `pfx_*` snake_case | ~~UUID PKs / com_id~~ |
| Soft delete | `est_id = 3` (1 Activo · 2 Inactivo · 3 Eliminado) | ~~deleted boolean~~ |
| Permisos | `tbl_permisos` + `tbl_ventanas` + `permissionsConfig.js` | ~~pages/permissions UUID~~ |
| Real‑time | Socket.IO existe pero los maestros **no** emiten eventos | ~~socket en CRUD~~ |

## Estructura backend de un módulo

```
server/src/modules/admin/{module}/
├── {module}.controller.js   # lógica + SQL crudo (get / pagination / save / delete)
└── {module}.routes.js       # express.Router, cada ruta con verifyToken
```
Se registra en [server/src/modules/main.routes.js](../server/src/modules/main.routes.js).

## Estructura frontend de un módulo

```
client/src/
├── pages/admin/{Module}.jsx                          # página / MasterView
├── pages/admin/components/modal/Ven{Module}.jsx      # modal CRUD (forwardRef)
├── pages/admin/configForms.jsx                       # añadir {module}Form (memoize-one)
├── api/requests/{module}Api.js                       # funciones Axios
├── context/permissions/permissionsConfig.js          # mapear per_id → acción
└── routes.js                                          # registrar la página lazy
```

## Base de datos

- MySQL 8, tablas `tbl_{nombre}` (snake_case singular), PK `INT AUTO_INCREMENT`.
- Columnas con **prefijo de 3 letras** del módulo: `act_`, `pry_`, `soc_`, `car_`, `ent_`…
- **Sin UUID, sin `com_id`.** El alcance por país se hace con `pai_id` (opcional, ver §6.4).
- Soft delete con `est_id` (FK a `tbl_estados`).
- Auditoría: `{pfx}_usu_reg`, `{pfx}_fec_reg`, `{pfx}_usu_act`, `{pfx}_fec_act`.

---

# 2. Anatomía del maestro de referencia (Activity)

Un "maestro" CSUR es un CRUD paginado con: tabla + filtros overlay + modal de alta/edición
+ menú contextual de acciones + confirm de borrado + control de permisos + (opcional) scope por país.

Flujo de datos:

```
usePaginationData(initialFilters, paginationActivityApi, setLoading, sortField)
        │  (dispara fetch al cambiar filtros/paginación)
        ▼
   { datos, totalRecords }  ──►  useHandleData().setInitialState(datos, totalRecords)
                                          │
                        state.datos / state.totalRecords ──► <DataTableComponent/>
   addItem / updateItem / deleteItem  ◄── VenActivity (save) · ConfirmDialog (delete)
```

Contratos clave que **debes respetar** al clonar:
- El backend `pagination_*` responde **`{ results: [...], total: N }`**.
  `usePaginationData` lee `data.results` y `data.total`. No cambies esa forma.
- `save_*` responde `{ message, actId? }` (id solo al crear). El modal usa `data.actId`.
- Cada fila expone su id con el nombre camelCase del PK (`actId`) y `dataKey="actId"`.
- `useHandleData` identifica filas por `idField` (p.ej. `"actId"`) — pásalo en update/delete.

---

# 3. Workflow de generación

1. **Validar tabla** en `bdcsur.sql` (§6.1). Si no existe, escribir el `CREATE TABLE` (§6.2).
2. **Backend**: `controller` → `routes` → registrar en `main.routes.js` (§4).
3. **Frontend**: `api` → `configForms` (form) → `Ven{Module}` (modal) → `{Module}` (página)
   → registrar en `routes.js` (§5).
4. **Permisos**: insertar ventana + permisos en DB y mapear en `permissionsConfig.js` (§6.3).
5. **Verificar** contra el checklist (§8).

Regla de oro: **no inventes patrones.** Copia Activity y renombra. Si algo no calza,
prioriza lo que ya hace Activity sobre lo que dice el genérico `-example.md`.

---

# 4. Backend

Convención de nombres para los ejemplos:
`{module}` = `activity` · `{Pfx}` = `act` · `tbl_{tabla}` = `tbl_actividad`
· `{Display}` = `Actividad` · `{pfx}Id` = `actId`.

## 4.1 Controller — `{module}.controller.js`

Cuatro handlers estándar. SQL inline con `executeQuery(sql, params, connection)`.
`save`/`delete` usan transacción (`beginTransaction` / `commit` / `rollback`).

```js
import {
  getConnection,
  releaseConnection,
  executeQuery,
} from "../../../common/configs/db.config.js";

// GET — lista simple para dropdowns (sin paginar). est_id = 1 (solo activos).
export const get{Module} = async (req, res, next) => {
  let connection = null;
  const { paiId } = req.query; // omitir si el maestro NO es por país
  try {
    connection = await getConnection();
    let wh = "";
    if (paiId && paiId !== "all") wh += ` AND m.pai_id = ${paiId}`;

    const results = await executeQuery(
      `SELECT m.{pfx}_id id, m.{pfx}_codigo codigo, m.{pfx}_nombre nombre
       FROM tbl_{tabla} m WHERE m.est_id = 1 ${wh} ORDER BY nombre`,
      [], connection
    );
    res.status(200).json(results);
  } catch (err) { next(err); } finally { releaseConnection(connection); }
};

// POST — listado paginado. DEBE responder { results, total }.
export const pagination{Module} = async (req, res, next) => {
  const { codigo, nombre, estado, rows, first, sortField, sortOrder, paiId } = req.body;
  let connection = null;
  try {
    connection = await getConnection();
    const order = sortOrder === 1 ? "ASC" : "DESC";

    const fromClause =
      "FROM tbl_{tabla} m LEFT JOIN tbl_estados e ON e.est_id = m.est_id";

    const whereConditions = ["m.est_id != 3"];            // nunca traer eliminados
    if (paiId && paiId !== "all") whereConditions.push(`m.pai_id = ${paiId}`);
    if (codigo) whereConditions.push(`(m.{pfx}_codigo LIKE ('%${codigo}%'))`);
    if (nombre) whereConditions.push(`(m.{pfx}_nombre LIKE ('%${nombre}%'))`);
    if (estado) whereConditions.push(`(m.est_id = ${estado})`);
    const whereClause = `WHERE ${whereConditions.join(" AND ")}`;

    const mainQuery = `SELECT m.{pfx}_id {pfx}Id, m.pai_id paiId, m.{pfx}_codigo codigo,
      m.{pfx}_nombre nombre, m.est_id estado, m.{pfx}_usu_act usuact,
      m.{pfx}_fec_act fecact, e.est_nombre nomestado
      ${fromClause} ${whereClause}
      ORDER BY ${sortField} ${order} LIMIT ${rows} OFFSET ${first}`;

    const countQuery = `SELECT COUNT(DISTINCT m.{pfx}_id) tot ${fromClause} ${whereClause}`;

    const results = await executeQuery(mainQuery, [], connection);
    const rowsc   = await executeQuery(countQuery, [], connection);

    return res.json({ results, total: rowsc[0].tot });
  } catch (err) { next(err); } finally { releaseConnection(connection); }
};

// POST — crear o actualizar (upsert por presencia de {pfx}Id). Valida duplicados.
export const save{Module} = async (req, res, next) => {
  const { {pfx}Id, nombre, codigo, estado, usureg, usuact, paiId } = req.body;
  let connection = null;
  try {
    connection = await getConnection();
    await connection.beginTransaction();

    const wh = {pfx}Id > 0 ? `AND {pfx}_id != ${ {pfx}Id }` : "";
    const dup = await executeQuery(
      `SELECT {pfx}_id FROM tbl_{tabla}
       WHERE ({pfx}_nombre = ? OR {pfx}_codigo = ?) AND est_id != 3 ${wh} LIMIT 1`,
      [nombre, codigo], connection
    );
    if (!{pfx}Id && dup.length > 0) {
      const error = new Error("Ya existe un registro con el nombre o código ingresado. Verificar");
      error.status = 400; throw error;
    }

    if ({pfx}Id > 0) {
      const upd = await executeQuery(
        `UPDATE tbl_{tabla} SET {pfx}_nombre = ?, {pfx}_codigo = ?, est_id = ?, {pfx}_usu_act = ?, pai_id = ?
         WHERE {pfx}_id = ?`,
        [nombre, codigo, estado, usuact, paiId, {pfx}Id], connection
      );
      if (upd.affectedRows === 0) {
        const error = new Error("No se encontró el registro para ser actualizado.");
        error.status = 400; throw error;
      }
      await connection.commit();
      return res.status(200).json({ message: `{Display} ${nombre} Modificada Correctamente` });
    } else {
      const cols = ["{pfx}_nombre", "{pfx}_codigo", "est_id", "{pfx}_usu_reg", "{pfx}_usu_act", "pai_id"];
      const vals = [nombre, codigo, estado, usureg, usuact, paiId];
      const ins = await executeQuery(
        `INSERT INTO tbl_{tabla} (${cols.join(",")}) VALUES(${cols.map(() => "?").join(", ")})`,
        vals, connection
      );
      await connection.commit();
      return res.status(200).json({ message: `{Display} ${nombre} creada correctamente`, {pfx}Id: ins.insertId });
    }
  } catch (err) {
    if (connection) await connection.rollback();
    next(err);
  } finally { releaseConnection(connection); }
};

// PUT — soft delete: est_id = 3. NUNCA borrado físico.
export const delete{Module} = async (req, res, next) => {
  const { {pfx}Id, usuact } = req.body;
  let connection = null;
  try {
    connection = await getConnection();
    await connection.beginTransaction();
    const del = await executeQuery(
      "UPDATE tbl_{tabla} SET est_id = 3, {pfx}_usu_act = ? WHERE {pfx}_id = ?",
      [usuact, {pfx}Id], connection
    );
    if (del.affectedRows === 0) {
      const error = new Error("Error al eliminar el registro."); error.statusCode = 400; throw error;
    }
    await connection.commit();
    return res.status(200).json({ message: "{Display} Eliminada Correctamente." });
  } catch (err) { next(err); } finally { releaseConnection(connection); }
};
```

> Nota de seguridad: Activity interpola valores numéricos (`paiId`, `estado`) directamente en el SQL.
> Los strings (`nombre`, `codigo`) que sí van parametrizados (`?`) — mantén ese criterio. Si el
> maestro es nuevo, se recomienda parametrizar también los numéricos. Errores se propagan con
> `next(error)`; los mapea `error.middleware.js`.

## 4.2 Routes — `{module}.routes.js`

Verbos exactamente como Activity: `get` (GET), `pagination`/`save` (POST), `delete` (PUT).

```js
import express from "express";
import { verifyToken } from "../../../common/middlewares/authjwt.middleware.js";
import { delete{Module}, get{Module}, pagination{Module}, save{Module} } from "./{module}.controller.js";

const {module}Routes = express.Router();

{module}Routes.get("/get_{module}", verifyToken, get{Module});
{module}Routes.post("/pagination_{module}", verifyToken, pagination{Module});
{module}Routes.post("/save_{module}", verifyToken, save{Module});
{module}Routes.put("/delete_{module}", verifyToken, delete{Module});

export default {module}Routes;
```

## 4.3 Registrar en `main.routes.js`

```js
// import (junto a los demás)
import {module}Routes from "./admin/{module}/{module}.routes.js";
// en la sección // Management
mainRoutes.use("/management/{module}", {module}Routes);
```

La URL final que consume el cliente es `api/management/{module}/{accion}_{module}`.

---

# 5. Frontend

## 5.1 API — `client/src/api/requests/{module}Api.js`

Un wrapper Promise por endpoint (idéntico patrón a `activityApi.js`).

```js
import httpCliente from "../services/httpCliente";

export const pagination{Module}Api = (params) =>
  new Promise((resolve, reject) => {
    httpCliente.post(`api/management/{module}/pagination_{module}`, params)
      .then(resolve).catch(reject);
  });

export const save{Module}Api = (params) =>
  new Promise((resolve, reject) => {
    httpCliente.post(`api/management/{module}/save_{module}`, params)
      .then(resolve).catch(reject);
  });

export const delete{Module}Api = (params) =>
  new Promise((resolve, reject) => {
    httpCliente.put(`api/management/{module}/delete_{module}`, params)
      .then(resolve).catch(reject);
  });

export const get{Module}Api = (params) =>
  new Promise((resolve, reject) => {
    httpCliente.get(`api/management/{module}/get_{module}`, params)
      .then(resolve).catch(reject);
  });
```

## 5.2 Form config — añadir a `configForms.jsx`

Se declara con `memoize-one` y describe los campos que consume `GenericFormSection`.
Tipos disponibles en `GenericFormSection`: `text`, `textarea`, `dropdown`, `multiselect`,
`selectButton`, `checkbox`, `inputSwitch`, `date`, `rangeCalendar`, `year`, `password`,
`currency`, `treeSelect`, `upload`, `custom`, `checkGroup`.

```js
export const {module}Form = memoize(({ lists = {} }) => {
  return [
    {
      key: "{pfx}-0", className: "col-12 md:col-4", type: "text", name: "codigo",
      label: "Código", props: { className: "uppercase-text" },
      validation: { required: "El campo código es requerido" }, required: true,
    },
    {
      key: "{pfx}-1", className: "col-12 md:col-4", type: "text", name: "nombre",
      label: "Nombre", props: { className: "uppercase-text" },
      validation: { required: "El campo nombre es requerido" }, required: true,
    },
    {
      key: "{pfx}-2", type: "selectButton", name: "estado", label: "Estado",
      options: estados, validation: { required: "El campo estado es requerido" },
      required: true, className: "col-12 md:col-4",
    },
  ];
});
```

`estados` viene de `@utils/converAndConst` → `[{ nombre:"Activo", id:1 }, { nombre:"Inactivo", id:2 }]`.
Para un campo dropdown de FK (p.ej. Proyecto) usa `options: lists?.projects || []` y
`props: { filterBy:"nombre,codigo", itemTemplate:ItemTemplateDropDown, valueTemplate:SelectedItemTemplateDropDown }`.

## 5.3 Modal — `pages/admin/components/modal/Ven{Module}.jsx`

`forwardRef` + `useImperativeHandle` expone `new{Module}()` y `edit{Module}(item)`.
Usa `FormProvider` + `GenericFormSection`.

```jsx
import React, { forwardRef, useContext, useImperativeHandle, useState } from "react";
import { AuthContext } from "@context/auth/AuthContext";
import { ToastContext } from "@context/toast/ToastContext";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import useHandleApiError from "@hook/useHandleApiError";
import { FormProvider, useForm } from "react-hook-form";
import moment from "moment";
import GenericFormSection from "@components/data/GenericFormSection";
import { save{Module}Api } from "@api/requests/{module}Api";
import PropTypes from "prop-types";
import { {module}Form } from "@pages/admin/configForms";

const defaultValues = { codigo: "", nombre: "", estado: 1 };

const Ven{Module} = forwardRef(({ addItem, updateItem, lists }, ref) => {
  const { nombreusuario, idusuario, selectedCountrie } = useContext(AuthContext);
  const { showSuccess, showInfo } = useContext(ToastContext);
  const handleApiError = useHandleApiError();

  const [visible, setVisible] = useState(false);
  const [{pfx}Id, set{Pfx}Id] = useState(null);
  const [loading, setLoading] = useState(false);
  const [originalData, setOriginalData] = useState(null);
  const methods = useForm({ defaultValues });
  const { handleSubmit, reset, setValue } = methods;

  const new{Module} = () => { setVisible(true); set{Pfx}Id(null); };

  const edit{Module} = (item) => {
    set{Pfx}Id(item.{pfx}Id);
    setOriginalData(item);
    setValue("codigo", item.codigo);
    setValue("nombre", item.nombre);
    setValue("estado", item.estado);
    setValue("paiId", item?.paiId);
    setVisible(true);
  };

  useImperativeHandle(ref, () => ({ new{Module}, edit{Module} }));

  const save{Module} = async (values) => {
    setLoading(true);
    try {
      const nombre = values.nombre.trim().toUpperCase();
      if ({pfx}Id > 0 && values.codigo === originalData.codigo &&
          nombre === originalData.nombre && values.estado === originalData.estado) {
        return showInfo("No has realizado ningún cambio.");
      }
      const params = {
        {pfx}Id, ...values, nombre,
        usureg: idusuario, usuact: nombreusuario,
        paiId: {pfx}Id ? values.paiId : selectedCountrie,
      };
      const { data } = await save{Module}Api(params);
      showSuccess(data.message);

      const item = {
        {pfx}Id: {pfx}Id > 0 ? {pfx}Id : data.{pfx}Id,
        ...values, nombre,
        nomestado: values.estado === 1 ? "Activo" : "Inactivo",
        usuact: nombreusuario,
        paiId: {pfx}Id ? values.paiId : selectedCountrie,
        fecact: moment().format("YYYY-MM-DD HH:mm:ss"),
      };
      {pfx}Id > 0 ? updateItem({ idField: "{pfx}Id", ...item }) : addItem(item);

      reset(defaultValues); set{Pfx}Id(null); setOriginalData(null); setVisible(false);
    } catch (error) {
      handleApiError(error);
    } finally { setLoading(false); }
  };

  return (
    <Dialog
      closeOnEscape={false} maximizable draggable
      header={{pfx}Id ? "Edición {Display}" : "Nueva {Display}"}
      visible={visible}
      onHide={() => { reset(defaultValues); set{Pfx}Id(null); setVisible(false); }}
      breakpoints={{ "1584px": "80vw", "960px": "90vw", "672px": "100vw" }}
      style={{ width: "45vw" }}
      footer={
        <Button className="p-button-info" onClick={handleSubmit(save{Module})}
          label={{pfx}Id ? "Guardar Cambios" : "Guardar"} loading={loading} />
      }
    >
      <FormProvider {...methods}>
        <GenericFormSection fields={ {module}Form({ lists }) } />
      </FormProvider>
    </Dialog>
  );
});

Ven{Module}.propTypes = { addItem: PropTypes.func.isRequired };
export default Ven{Module};
```

> Si el maestro es por país, añade `import DropDownCountries from "@components/generales/DropDownCountries"`
> y renderízalo en el `header` (ver VenActivity). Si es global, quita `paiId` del payload.

## 5.4 Página / MasterView — `pages/admin/{Module}.jsx`

Ensambla: PageHeader + FilterOverlay + DataTableComponent + ConfirmDialog + modal.
Imports **exactamente** los mismos alias que Activity.

```jsx
import React, { useRef, useContext, useState, useEffect, useMemo, useCallback, Suspense } from "react";
// Contexts
import { AuthContext } from "@context/auth/AuthContext";
import { ToastContext } from "@context/toast/ToastContext";
// Hooks
import useHandleApiError from "@hook/useHandleApiError";
import useHandleData from "@hook/useHandleData";
import usePaginationData from "@hook/usePaginationData";
// Components
import PageHeader from "@components/layout/PageHeader";
import { RightToolbar } from "@components/generales";
import ChipStatusComponent from "@components/fields/ChipStatusComponent";
import LoadingComponent from "@components/layout/LoadingComponent";
import SkeletonMasterLoader from "@components/generales/SkeletonMasterLoader";
import ContextMenuActions from "@components/data/ContextMenuActions";
// PrimeReact
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";
// Modal
import Ven{Module} from "./components/modal/Ven{Module}";
// APIs
import { delete{Module}Api, pagination{Module}Api, save{Module}Api } from "@api/requests/{module}Api";
// Utils
import { estados, propsSelect } from "@utils/converAndConst";
import { formatNotificationDateTime } from "@utils/formatTime";
import moment from "moment";
import usePermissions from "@context/permissions/usePermissions";

const LazyDataTable = React.lazy(() => import("@components/data/DataTableComponent"));
const DataTableComponentMemo = React.memo(LazyDataTable);
const LazyFilterComponent = React.lazy(() => import("@components/data/FilterOverlay"));
const FilterComponentMemo = React.memo(LazyFilterComponent);

const generateFiltersConfig = ({ filtros }) => [
  { key: "codigo", type: "input", label: "Código", filtro: filtros.codigo },
  { key: "nombre", type: "input", label: "Nombre", filtro: filtros.nombre },
  { key: "estado", type: "dropdown", label: "Estado", filtro: filtros.estado,
    showClear: true, props: { ...propsSelect, options: estados } },
];

const {Module} = () => {
  const ven{Module} = useRef(null);
  const overlayFiltersRef = useRef(null);
  const showOverlayFilters = (e) => overlayFiltersRef.current.toggle(e);

  const { nombreusuario, selectedCountrie } = useContext(AuthContext);
  const { showSuccess } = useContext(ToastContext);

  const { hasPermission } = usePermissions();
  const canCreate = hasPermission("management", "{module}", "create");
  const canEdit   = hasPermission("management", "{module}", "edit");
  const canDelete = hasPermission("management", "{module}", "delete");

  const handleApiError = useHandleApiError();
  const { state, setInitialState, deleteItem, addItem, updateItem } = useHandleData();

  const [loading, setLoading] = useState({ table: false });
  const [firstLoad, setFirstLoad] = useState(true);
  const [lists] = useState({});

  const initialFilters = useMemo(
    () => ({ codigo: null, nombre: null, estado: null, paiId: selectedCountrie }), []);
  const sortField = "nombre";

  const { filtros, setFiltros, datos, totalRecords, pagination, setPagination, onCustomPage } =
    usePaginationData(initialFilters, pagination{Module}Api, setLoading, sortField, () => true);

  useEffect(() => { setFiltros((p) => ({ ...p, paiId: selectedCountrie })); }, [selectedCountrie]);
  useEffect(() => { if (!loading.table && firstLoad) setTimeout(() => setFirstLoad(false), 400); },
    [loading.table, firstLoad]);
  useEffect(() => { setInitialState(datos, totalRecords); /* eslint-disable-next-line */ },
    [datos, totalRecords, setInitialState]);

  const filtersConfig = useMemo(() => generateFiltersConfig({ filtros }), [filtros]);
  const getActiveFiltersCount = (f) => Object.entries(f)
    .filter(([k, v]) => v != null && v !== "" && k !== "paiId").length;
  const activeFiltersCount = useMemo(() => getActiveFiltersCount(filtros), [filtros]);

  const deleteApi = useCallback(async ({pfx}Id) => {
    try {
      const { data } = await delete{Module}Api({ {pfx}Id, usuact: nombreusuario });
      showSuccess(data.message);
      deleteItem({ id: {pfx}Id, idField: "{pfx}Id" });
    } catch (error) { handleApiError(error); }
  }, [deleteItem, nombreusuario, showSuccess]);

  const columnsConfig = [
    { field: "codigo", header: "Código", style: { flexGrow: 1, flexBasis: "15rem", minWidth: "15rem" } },
    { field: "nombre", header: "Nombre", style: { flexGrow: 1, flexBasis: "15rem", minWidth: "15rem" } },
    { field: "usuact, fecact", header: "Actualizado Por",
      style: { flexGrow: 1, flexBasis: "12rem", minWidth: "12rem" },
      body: ({ usuact, fecact }) => (
        <div>
          <div style={{ fontSize: 11 }}><span style={{ fontWeight: 600 }}>{usuact}</span></div>
          <div style={{ fontSize: 10 }}>{formatNotificationDateTime(fecact)}</div>
        </div>
      ) },
    { field: "nomestado", header: "Estado", style: { maxWidth: "8rem" },
      body: ({ estado, nomestado }) => <ChipStatusComponent id={estado} nameStatus={nomestado} /> },
  ];

  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [current, setCurrent] = useState(null);

  const renderActions = (item) => {
    const { {pfx}Id, nombre } = item;
    const menuItems = [
      { label: "Editar", icon: "pi pi-pencil", command: () => ven{Module}.current.edit{Module}(item),
        disabled: !canEdit, color: "#fda53a", className: "p-button-warning" },
      { label: "Eliminar", icon: "pi pi-trash",
        command: () => { setCurrent({ {pfx}Id, nombre }); setDeleteDialogVisible(true); },
        disabled: !canDelete, color: "#f43f51", className: "p-button-danger" },
    ];
    return <ContextMenuActions menuItems={menuItems} itemId={ {pfx}Id } />;
  };

  const actionsToolbar = useMemo(() => (
    <>
      <div style={{ position: "relative", display: "inline-block" }}>
        <Button icon="pi pi-sliders-h" label="Filtros" iconPos="left"
          className="p-button-rounded p-button-sm ml-2" onClick={showOverlayFilters} />
        {activeFiltersCount > 0 && (
          <span className="fade-in" style={{ position: "absolute", top: "-8px", right: "-8px",
            backgroundColor: "#f44336", color: "#fff", borderRadius: "50%", padding: "4px 8px",
            fontSize: "8px", fontWeight: "bold", zIndex: 1 }}>{activeFiltersCount}</span>
        )}
      </div>
      <RightToolbar label="Nuevo" onClick={() => ven{Module}.current.new{Module}()} disabled={!canCreate} />
    </>
  ), [canCreate, activeFiltersCount]);

  const headerTemplate = useMemo(() => <div style={{ flexShrink: 0 }}>{actionsToolbar}</div>, [actionsToolbar]);

  const handleRowSelect = (e) => {
    const target = e.originalEvent.target;
    if (!canEdit) return;
    if (target.closest(".p-dropdown") || target.closest("input") || target.closest("button")) return;
    ven{Module}.current.edit{Module}(e.value);
  };

  return (
    <>
      {firstLoad ? <SkeletonMasterLoader /> : (
        <div className="fade-in">
          <ConfirmDialog visible={deleteDialogVisible} onHide={() => setDeleteDialogVisible(false)}
            message={`Realmente desea eliminar el registro ${current?.nombre}?`}
            header="Confirmar Eliminación" icon="pi pi-exclamation-triangle" acceptLabel="Sí"
            accept={() => { deleteApi(current?.{pfx}Id); setDeleteDialogVisible(false); }}
            reject={() => setDeleteDialogVisible(false)} acceptClassName="p-button-danger" />

          <Ven{Module} ref={ven{Module}} addItem={addItem} updateItem={updateItem} lists={lists} />

          <PageHeader page="Administración" title="{Display}s" description="Administra {display}s" />

          <Suspense fallback={<LoadingComponent />}>
            <FilterComponentMemo overlayRef={overlayFiltersRef} initialFilters={initialFilters}
              filters={filtersConfig} setFilters={setFiltros} />
            <div className="grid">
              <div className="col-12">
                <DataTableComponentMemo
                  KeyModule={"module_{module}"} dataKey="{pfx}Id" columns={columnsConfig}
                  header={headerTemplate} datos={state.datos} totalRecords={state.totalRecords}
                  loading={loading.table} pagination={pagination} onCustomPage={onCustomPage}
                  setPagination={setPagination} actionBodyTemplate={renderActions}
                  isRowSelectable={true} onSelectionChange={handleRowSelect} countItemsAction={2} />
              </div>
            </div>
          </Suspense>
        </div>
      )}
    </>
  );
};

export default {Module};
```

## 5.5 Registrar la página en `routes.js`

```js
// import (junto a los demás)
import {Module} from '@pages/admin/{Module}';
// dentro del array de rutas privadas del dashboard
{ path: "/{module}", component: {Module} },
```
La URL final es `#/dashboard/{module}` (HashRouter).

---

# 6. Base de datos

## 6.1 Validar estructura (referencia: `tbl_actividad`)

```sql
CREATE TABLE `tbl_actividad`  (
  `act_id` int NOT NULL AUTO_INCREMENT,
  `pry_id` int NULL DEFAULT NULL,
  `act_codigo` varchar(255) ... NULL DEFAULT NULL,
  `act_nombre` varchar(255) ... NULL DEFAULT NULL,
  `act_tipo` tinyint(1) NULL DEFAULT 1,
  `pai_id` int NULL DEFAULT NULL,
  `est_id` int NULL DEFAULT 1,                          -- soft delete: 1/2/3
  `act_usu_reg` int NULL DEFAULT NULL,                  -- auditoría
  `act_fec_reg` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  `act_usu_act` varchar(255) ... NULL DEFAULT NULL,
  `act_fec_act` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`act_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;
```

Checklist de validación de la tabla:
- [ ] PK `{pfx}_id INT AUTO_INCREMENT`.
- [ ] `{pfx}_codigo`, `{pfx}_nombre` VARCHAR(255).
- [ ] `est_id INT DEFAULT 1` (soft delete; FK lógica a `tbl_estados`).
- [ ] Auditoría: `{pfx}_usu_reg INT`, `{pfx}_fec_reg TIMESTAMP DEFAULT CURRENT_TIMESTAMP`,
      `{pfx}_usu_act VARCHAR`, `{pfx}_fec_act TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`.
- [ ] `pai_id INT` **solo** si el maestro es por país.
- [ ] FKs de dominio (`pry_id`, `soc_id`, …) según necesidad.

> Ojo a la mezcla de tipos de la auditoría: `*_usu_reg` es **INT** (id de usuario, `idusuario`)
> pero `*_usu_act` es **VARCHAR** (nombre de usuario, `nombreusuario`). Respeta esa convención.

## 6.2 Crear tabla nueva (plantilla)

```sql
DROP TABLE IF EXISTS `tbl_{tabla}`;
CREATE TABLE `tbl_{tabla}` (
  `{pfx}_id`      int NOT NULL AUTO_INCREMENT,
  `{pfx}_codigo`  varchar(255) NULL DEFAULT NULL,
  `{pfx}_nombre`  varchar(255) NULL DEFAULT NULL,
  `pai_id`        int NULL DEFAULT NULL,               -- opcional (scope país)
  `est_id`        int NULL DEFAULT 1,
  `{pfx}_usu_reg` int NULL DEFAULT NULL,
  `{pfx}_fec_reg` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  `{pfx}_usu_act` varchar(255) NULL DEFAULT NULL,
  `{pfx}_fec_act` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`{pfx}_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;
```

## 6.3 Ventana + permisos (así funcionan los permisos aquí)

CSUR **no** usa las tablas `pages`/`permissions` del genérico. Usa:

- `tbl_ventanas` (`ven_id`, `ven_codigo`, `ven_descripcion`, `ven_padre`, `ven_url`, `ven_icono`, `ven_orden`, `ven_nombre`, `ven_tipo`) — la "página"/menú.
- `tbl_permisos` (`per_id`, `per_nombre`, `per_descripcion`, `ven_id`, `per_orden`) — cada acción.
- `tbl_permisos_perfil` (`per_id`, `prf_id`) — asigna permisos a perfiles.
- Front: `client/src/context/permissions/permissionsConfig.js` mapea `per_id` → `{ create, edit, delete }`.

Migración:

```sql
-- 1) Ventana (si el maestro tiene su propio menú)
INSERT INTO `tbl_ventanas` (`ven_codigo`, `ven_descripcion`, `ven_padre`, `ven_url`, `ven_icono`, `ven_orden`, `ven_nombre`, `ven_tipo`)
VALUES ('{module}', 'Administra {display}s', {ven_padre}, '/{module}', 'pi pi-list', {orden}, '{Display}s', 2);
SET @ven_id = LAST_INSERT_ID();

-- 2) Permisos (per_orden: convención libre; Activity usó create/edit/delete)
INSERT INTO `tbl_permisos` (`per_nombre`, `per_descripcion`, `ven_id`, `per_orden`) VALUES
  ('Crear {Display}',     'Crear nuevos registros de {display}',  @ven_id, 1),
  ('Modificar {Display}', 'Editar registros de {display}',        @ven_id, 2),
  ('Eliminar {Display}',  'Eliminar registros de {display}',      @ven_id, 3);

-- 3) Anota los per_id generados; se usan en permissionsConfig.js
SELECT per_id, per_nombre FROM tbl_permisos WHERE ven_id = @ven_id ORDER BY per_orden;
```

Luego en `permissionsConfig.js`, bajo `management`:

```js
{module}: {
  viewAll: null,
  onlyRead: null,
  create: {PER_ID_CREATE},   // p.ej. Activity → 51
  edit:   {PER_ID_EDIT},     //                 52
  delete: {PER_ID_DELETE},   //                 53
},
```

Referencia real (Activity): `create: 51, edit: 52, delete: 53`.

## 6.4 Maestro por país vs global

- **Por país** (como Activity): tabla tiene `pai_id`; filtros y `save` lo incluyen; el modal usa
  `selectedCountrie` del `AuthContext` y `DropDownCountries`.
- **Global** (como Positions/Reasons): sin `pai_id`. Quita `paiId` del controller, del payload del
  modal, de `initialFilters` y del `getActiveFiltersCount` (que excluye `paiId`).

---

# 7. Convenciones

## Backend / DB
- Soft delete: `est_id = 3` al borrar; listados filtran `est_id != 3`; dropdowns `est_id = 1`.
- Auditoría siempre: `usu_reg`/`fec_reg` al INSERT, `usu_act` al UPDATE (`fec_act` es automático).
- Tablas `tbl_*`, prefijo de 3 letras por módulo. SQL inline (template literals), sin ORM.
- `pagination_*` **debe** responder `{ results, total }`.
- Rutas protegidas siempre con `verifyToken`.

## Frontend
- IDs de API en snake_case se alias-an a camelCase en el SELECT (`act_id actId`) y así viajan al estado.
- `dataKey`/`idField` = nombre camelCase del PK (`{pfx}Id`).
- Permisos: `hasPermission("management", "{module}", "create"|"edit"|"delete")`.
- Toasts vía `useContext(ToastContext)` (`showSuccess`/`showError`/`showInfo`). **Nunca** `alert()`.
- Errores de API vía `useHandleApiError()`.
- `KeyModule="module_{module}"` en DataTableComponent (persiste config de columnas del usuario).

## Nombres
| Elemento | Formato | Ejemplo |
|----------|---------|---------|
| Tabla | `tbl_` + snake singular | `tbl_actividad` |
| Columna | `{pfx}_` snake | `act_nombre` |
| Ruta API | `/management/{module}` + `{accion}_{module}` | `pagination_activity` |
| Carpeta backend | kebab/lower | `admin/activity/` |
| Página React | PascalCase | `Activity` (archivo `Activiy.jsx`) |
| Modal | `Ven{Module}` | `VenActivity` |
| API file | `{module}Api.js` | `activityApi.js` |
| Form config | `{module}Form` | `activityForm` |
| Permiso (front) | `management.{module}.{accion}` | `management.activity.create` |

---

# 8. Checklist por maestro nuevo

**Base de datos**
- [ ] Validar/crear `tbl_{tabla}` con `est_id`, auditoría (y `pai_id` si aplica).
- [ ] `INSERT tbl_ventanas` (menú) + `INSERT tbl_permisos` (create/edit/delete).
- [ ] Anotar `per_id` y mapearlos en `permissionsConfig.js` bajo `management.{module}`.

**Backend**
- [ ] `{module}.controller.js` con `get / pagination / save / delete` (SQL inline, transacciones).
- [ ] `pagination_*` responde `{ results, total }`; `save_*` responde `{ message, {pfx}Id? }`.
- [ ] `{module}.routes.js` con `verifyToken` en cada ruta.
- [ ] Registrado en `main.routes.js` (`mainRoutes.use("/management/{module}", ...)`).

**Frontend**
- [ ] `api/requests/{module}Api.js` (pagination/save/delete/get).
- [ ] `{module}Form` añadido a `configForms.jsx`.
- [ ] `Ven{Module}.jsx` (forwardRef, `new{Module}`/`edit{Module}`, FormProvider + GenericFormSection).
- [ ] `{Module}.jsx` (usePaginationData + useHandleData + DataTableComponent + FilterOverlay + ConfirmDialog + permisos).
- [ ] Registrada en `routes.js` (`{ path: "/{module}", component: {Module} }`).
- [ ] `KeyModule="module_{module}"` y `dataKey="{pfx}Id"`.

---

# 9. Cheatsheet de imports (rutas exactas)

**Página / MasterView**
```js
import { AuthContext } from "@context/auth/AuthContext";       // nombreusuario, idusuario, selectedCountrie, countries
import { ToastContext } from "@context/toast/ToastContext";     // showSuccess, showError, showInfo
import useHandleApiError from "@hook/useHandleApiError";
import useHandleData from "@hook/useHandleData";                // state, setInitialState, addItem, updateItem, deleteItem
import usePaginationData from "@hook/usePaginationData";        // filtros, datos, totalRecords, pagination, onCustomPage...
import usePermissions from "@context/permissions/usePermissions"; // hasPermission(parent, module, action)
import PageHeader from "@components/layout/PageHeader";
import LoadingComponent from "@components/layout/LoadingComponent";
import SkeletonMasterLoader from "@components/generales/SkeletonMasterLoader";
import { RightToolbar } from "@components/generales";
import ChipStatusComponent from "@components/fields/ChipStatusComponent";
import ContextMenuActions from "@components/data/ContextMenuActions";
const DataTable = React.lazy(() => import("@components/data/DataTableComponent"));
const Filter    = React.lazy(() => import("@components/data/FilterOverlay"));
import { estados, propsSelect } from "@utils/converAndConst";
import { formatNotificationDateTime } from "@utils/formatTime";
```

**Modal**
```js
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { FormProvider, useForm } from "react-hook-form";
import GenericFormSection from "@components/data/GenericFormSection";
import DropDownCountries from "@components/generales/DropDownCountries"; // solo maestro por país
import { {module}Form } from "@pages/admin/configForms";
```

**Backend**
```js
import { getConnection, releaseConnection, executeQuery } from "../../../common/configs/db.config.js";
import { verifyToken } from "../../../common/middlewares/authjwt.middleware.js";
```

**Constantes útiles de `@utils/converAndConst`**: `estados`, `propsSelect`, `propsSelectButton`,
`propsSelectGeneric`, `propsCalendar`, `propsCurrencyInput`, `tipoTurno`, `checkStatus`.

---

---

# 10. Maestros en ÁRBOL — la excepción (Catálogo Maestro)

*Añadido el 2026-09-03, tras validar `CatalogoMaestro.jsx` contra esta guía.*

No todo maestro es una lista plana. El **Catálogo Maestro** (`client/src/pages/admin/CatalogoMaestro.jsx`)
es un árbol de tres niveles —capítulo → subcapítulo → ítem— más un diálogo de APU.
Se documenta aquí qué partes de §5.4 **no aplican** y cuáles **sí siguen siendo obligatorias**,
para que la próxima validación no las vuelva a marcar como incumplimientos.

## 10.1 Lo que NO aplica, y por qué

| Elemento de §5.4 | Por qué no aplica en un árbol |
|---|---|
| `usePaginationData` | El árbol se carga ENTERO con `GET /arbol` (tres consultas, una por nivel) y se pagina en el cliente. No hay un `pagination_*` que responda `{ results, total }` |
| `useHandleData` | Su papel lo hace un `useReducer` propio (`useCatalogoArbol`), que parchea por rama en vez de por fila: una edición no puede invalidar las otras dos ramas |
| `ContextMenuActions` | Las acciones incluyen **subir/bajar**, que en un menú contextual obligan a abrirlo dos veces para mover dos posiciones |

## 10.2 Lo que SÍ sigue siendo obligatorio

Un árbol no exime de nada de esto, y **faltaba** en la validación del 2026-09-03:

- **`FilterOverlay` con su badge de filtros activos.** Sin filtro, un catálogo de 18 capítulos
  y 259 ítems solo se recorre a mano. Es el hallazgo que motivó este apartado.
- `PageHeader`, `ConfirmDialog`, `SkeletonMasterLoader`, `RightToolbar`.
- `usePermissions` en cada acción; toasts por `ToastContext`; errores por `useHandleApiError`.
- `dataKey` = nombre camelCase del PK, en **cada** nivel (`capId`, `sucId`, `iteId`, `itaId`).

## 10.3 Cómo se filtra un árbol

El filtro **no** va al servidor: el árbol ya está en memoria. Se acota con una función pura
—`client/src/utils/catalogo/filtrarArbol.js`— y tres reglas:

1. Un nodo que coincide se conserva **con toda su descendencia**.
2. Un ancestro se conserva si alguno de sus descendientes coincide.
3. Las ramas que sobreviven **solo por su descendencia se abren solas**. Sin esto el usuario
   busca un ítem, ve un capítulo cerrado y tiene que dar dos clics para llegar a lo que pidió.

Tres detalles que no son evidentes:

- **Sin filtro hay que devolver la MISMA referencia del árbol**, no una copia. Las ramas anidadas
  son `React.memo`; una copia nueva repintaría todas las expansiones abiertas.
- **El reordenamiento se bloquea mientras haya filtro.** El orden es absoluto (columna `*_orden`):
  con el árbol acotado, la fila de arriba en pantalla no es la vecina real y «subir» movería el
  nodo a un sitio que el usuario no está viendo.
- **Los índices de reorden se calculan sobre el árbol COMPLETO**, no sobre el visible.

## 10.4 Cuando el filtro necesita datos que el árbol no trae

El filtro «Insumo» del catálogo pregunta *«¿en qué ítems se usa este artículo?»*. Los insumos del
APU **no** viajan en `GET /arbol` —son cientos por capítulo y solo se cargan al abrir un ítem—,
así que hace falta un endpoint que devuelva **solo los ids**:

```
GET /management/catalogo/items-por-insumo?busqueda=60410
→ { iteIds: [1, 3], insumos: [{ artId, codigo, nombre }], busqueda }
```

El cliente ya tiene el árbol; con los ids le basta para filtrarlo. Devolver los ítems completos
duplicaría lo que ya está cargado. Dos guardas que conviene copiar:

- **Mínimo de 2 caracteres**: con uno la consulta trae media base y no ayuda a nadie.
- **`LIMIT` en la lista de insumos** (no en los ids: esos mandan el filtro).

---

*Basado en el módulo real `activity`. Para generación de maestros asistida por IA en CSUR.*
*Última actualización: 2026-09-03*
