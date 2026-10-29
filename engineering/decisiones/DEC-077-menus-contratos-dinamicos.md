# DEC-077 — Menús de contratos dinámicos: "Todos" y uno por tipo de proveedor

**Fecha:** 2026-10-23 · **Tipo:** Obligatoria · **ADR:** [0010](../adr/0010-tipos-proveedor.md), [0015](../adr/0015-contratos.md), [0014](../adr/0014-autorizacion-permisos.md)

Decidido por el usuario el 2026-10-23: el menú "Contratos" funciona igual que el de facturas ([DEC-074](DEC-074-menus-facturas-dinamicos.md)).

## Contexto

- "Contratos" era una página fija del menú (página 16, `work/contracts`) con todos los contratos y un filtro por tipo de contrato.
- Desde [DEC-066](DEC-066-tipo-proveedor-por-obra-y-contrato.md), el contrato guarda el tipo de proveedor bajo el que se firma (`tbl_contracts.pvt_id`). Desde DEC-074, solo un tipo de forma `CONTRACT` admite contratos.
- El tablero lleva al listado general con filtros (estado, pólizas, conceptos sin póliza, nuevo contrato): ese listado tiene que seguir existiendo.

## Decisión

- **Casilla propia** en el tipo de proveedor (migración `0114`): `pvt_contract_menu`, "Aplica para contratos", independiente de la del menú de facturas. Solo la admite un tipo de forma `CONTRACT` (`CHECK`, y 400 en `assertValues` con mensaje). Datos: la reciben los tipos de forma `CONTRACT` que ya iban al menú de facturas.
- **Menú lateral:** con algún tipo **activo** con la casilla, la página 16 se dibuja como desplegable con **"Todos"** primero (el listado general, `work/contracts`) y una entrada por tipo, por nombre (`work/contracts/menu/:pvtId`). Sin ninguno, sigue siendo una página. Las entradas no son páginas: las arma `app.service.js` (`withContractMenus`, con `listContractMenus`), y quien tiene la página 16 las ve. `tbl_pages` no cambia.
- **Desmarcar la casilla** solo oculta la entrada: los contratos siguen en "Todos", en los expedientes y en su dirección.
- **Rutas:** `/work/contracts/menu/:pvtId`, con `/new`, `/:ctrId` y `/:ctrId/edit`, sobre la misma pantalla del listado. La dirección de un contrato (`/work/contracts/:ctrId`) no cambia. El nombre del menú se lee con `get_contract_menu` (también de uno oculto o inactivo; 404 si el tipo no admite contratos o está eliminado).
- **Listado de un menú:** filtra por `pvt_id` (`pvtId` en el listado y en los reportes, que lo nombran en sus filtros); pestañas, filtros y conteos se calculan dentro de él. Índice `idx_contracts_provider_type`.
- **Crear desde un menú:** el tipo de proveedor queda fijo en el del menú y solo se ofrecen los proveedores que trabajan en la obra con ese tipo. El servidor valida como siempre (`assertContractType`).
- **Un solo permiso de ver:** el 68 (`work.contracts.view`) para "Todos" y para todos los menús, como el 115 en facturas.
- **Sidebar y migas de pan:** se vuelven a pedir con `refresh-provider-types`; las migas siguen las entradas del servidor (`setContractMenus`).

## Descartado

- **Reutilizar la casilla del menú de facturas:** el usuario eligió una propia, para separar los dos menús.
- **Quitar el listado general, como en facturas:** el tablero lo usa con sus filtros; el usuario eligió conservarlo como "Todos".
- **Un permiso por menú:** como en DEC-074, el catálogo de permisos sigue fijo en el código.
- **Convertir la página 16 en desplegable en la BD (`pag_type` 3):** sin menús quedaría vacía; se resuelve al armar el menú.

## Qué implica

- Ningún código escribe una lista fija de menús de contratos: los menús son los tipos de proveedor (`contractMenus.js`).
- Un filtro o reporte nuevo del listado de contratos respeta `pvtId`.
- Un tipo de proveedor nuevo, también desde scripts, define la casilla si debe verse en el menú de contratos.
- Desplegar: aplicar `0114`, `schema.prisma` versionado, `npx prisma generate` y reiniciar el servidor. Sin el cliente regenerado, la consulta de los menús falla y el sidebar queda vacío.

## Dónde

`database/migrations/0114_dynamic_contract_menus.sql` · `server/src/modules/work/contracts/contractMenus.js`, `contracts.service.js` (`contractListQuery`, `exportFilterLines`), `contracts.controller.js`, `contracts.routes.js`, `contracts.validation.js` · `admin/providerTypes/providerTypes.service.js` · `app/general/app.service.js` · `server/prisma/schema.prisma`, `seed.js` · Cliente: `routes/MainRoutes.jsx`, `layout/MainLayout/MenuList/index.jsx`, `menu-items/work.js` (`setContractMenus`), `utils/constants.js` (`contractPath`), `api/requests/contractsApi.js`, `views/work/contracts/` (`ContractsPage`, `ContractDetailPage`, `components/useContractForm.js`, `components/ContractDataForm.jsx`), `views/admin/providerTypes/ProviderTypePage.jsx` · Tests: `contractMenus.test.js`, `app.service.test.js`, `providerTypes.service.test.js`, `contracts.service.test.js`, `workScope.guard.test.js`.
