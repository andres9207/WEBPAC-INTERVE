# Spec de maestro: `{module}`

> Plantilla para especificar **un** maestro concreto en CSUR.
> Copia este archivo a `specs/modules/{module}.md`, rellena los `{placeholders}` y sigue el checklist.
> Referencia completa del patrón: [../ai-module-generation-reference-csur.md](../ai-module-generation-reference-csur.md)
> Maestro dorado a clonar: `activity` / `Actividades`.

---

## 1. Identidad del módulo

| Campo | Valor | Ejemplo (activity) |
|-------|-------|--------------------|
| Nombre máquina `{module}` | `______` | `activity` |
| Display singular `{Display}` | `______` | `Actividad` |
| Display plural | `______` | `Actividades` |
| Tabla `tbl_{tabla}` | `tbl_______` | `tbl_actividad` |
| Prefijo columnas `{pfx}` | `___` | `act` |
| PK camel `{pfx}Id` | `______` | `actId` |
| Componente página `{Module}` | `______` | `Activity` |
| Ruta cliente | `/{module}` | `/activity` |
| Ruta API base | `/management/{module}` | `/management/activity` |
| ¿Scope por país (`pai_id`)? | Sí / No | Sí |
| FKs de dominio | `______` | `pry_id` (proyecto) |

## 2. Campos del formulario

Lista de campos que van en `{module}Form` (`configForms.jsx`) y en la tabla:

| name | type (GenericFormSection) | required | columna DB | notas |
|------|---------------------------|----------|-----------|-------|
| `codigo` | `text` | sí | `{pfx}_codigo` | uppercase |
| `nombre` | `text` | sí | `{pfx}_nombre` | uppercase |
| `estado` | `selectButton` (`estados`) | sí | `est_id` | — |
| `______` | `______` | — | `{pfx}_______` | — |

Tipos disponibles: `text · textarea · dropdown · multiselect · selectButton · checkbox ·
inputSwitch · date · rangeCalendar · year · password · currency · treeSelect · upload · custom`.

## 3. Columnas de la tabla (DataTableComponent)

| field | header | render especial |
|-------|--------|-----------------|
| `codigo` | Código | — |
| `nombre` | Nombre | — |
| `usuact, fecact` | Actualizado Por | usuario + `formatNotificationDateTime(fecact)` |
| `nomestado` | Estado | `<ChipStatusComponent id={estado} nameStatus={nomestado}/>` |

## 4. Filtros (FilterOverlay)

| key | type | notas |
|-----|------|-------|
| `codigo` | `input` | — |
| `nombre` | `input` | — |
| `estado` | `dropdown` | `options: estados` |
| `______` | `______` | — |

## 5. Permisos (DB → permissionsConfig.js)

| Acción | per_id (DB) | Mapeo en `management.{module}` |
|--------|-------------|-------------------------------|
| create | `____` | `create: ____` |
| edit   | `____` | `edit: ____` |
| delete | `____` | `delete: ____` |

`ven_id` de la ventana: `____`.

## 6. SQL de migración

```sql
-- Tabla (ajusta columnas de dominio)
DROP TABLE IF EXISTS `tbl_{tabla}`;
CREATE TABLE `tbl_{tabla}` (
  `{pfx}_id`      int NOT NULL AUTO_INCREMENT,
  `{pfx}_codigo`  varchar(255) NULL DEFAULT NULL,
  `{pfx}_nombre`  varchar(255) NULL DEFAULT NULL,
  `pai_id`        int NULL DEFAULT NULL,               -- quitar si es global
  `est_id`        int NULL DEFAULT 1,
  `{pfx}_usu_reg` int NULL DEFAULT NULL,
  `{pfx}_fec_reg` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  `{pfx}_usu_act` varchar(255) NULL DEFAULT NULL,
  `{pfx}_fec_act` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`{pfx}_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- Ventana
INSERT INTO `tbl_ventanas` (`ven_codigo`,`ven_descripcion`,`ven_padre`,`ven_url`,`ven_icono`,`ven_orden`,`ven_nombre`,`ven_tipo`)
VALUES ('{module}','Administra {plural}', {ven_padre}, '/{module}', 'pi pi-list', {orden}, '{plural}', 2);
SET @ven_id = LAST_INSERT_ID();

-- Permisos
INSERT INTO `tbl_permisos` (`per_nombre`,`per_descripcion`,`ven_id`,`per_orden`) VALUES
  ('Crear {Display}',     'Crear {plural}',    @ven_id, 1),
  ('Modificar {Display}', 'Editar {plural}',   @ven_id, 2),
  ('Eliminar {Display}',  'Eliminar {plural}', @ven_id, 3);
SELECT per_id, per_nombre FROM tbl_permisos WHERE ven_id = @ven_id ORDER BY per_orden;
```

## 7. Archivos a crear / editar

**Crear**
- [ ] `server/src/modules/admin/{module}/{module}.controller.js`
- [ ] `server/src/modules/admin/{module}/{module}.routes.js`
- [ ] `client/src/api/requests/{module}Api.js`
- [ ] `client/src/pages/admin/components/modal/Ven{Module}.jsx`
- [ ] `client/src/pages/admin/{Module}.jsx`

**Editar**
- [ ] `server/src/modules/main.routes.js` → `mainRoutes.use("/management/{module}", {module}Routes)`
- [ ] `client/src/routes.js` → `{ path: "/{module}", component: {Module} }`
- [ ] `client/src/pages/admin/configForms.jsx` → `export const {module}Form = memoize(...)`
- [ ] `client/src/context/permissions/permissionsConfig.js` → bloque `management.{module}`

## 8. Contratos a respetar (no cambiar)

- `pagination_{module}` responde `{ results: [...], total: N }`.
- `save_{module}` responde `{ message, {pfx}Id? }` (id solo al crear).
- `delete_{module}` es **PUT**, soft delete `est_id = 3`.
- `dataKey="{pfx}Id"`, `idField: "{pfx}Id"`, `KeyModule="module_{module}"`.
- Listados backend filtran `est_id != 3`; el `get_` para dropdowns usa `est_id = 1`.
