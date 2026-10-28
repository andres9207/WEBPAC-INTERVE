# DEC-090 — Con una obra elegida, la ficha del proveedor edita sus tipos en esa obra

**Fecha:** 2026-10-28 · **Tipo:** Obligatoria · **ADR:** [0012](../adr/0012-proveedores.md), [0010](../adr/0010-tipos-proveedor.md), [0014](../adr/0014-permisos.md)

Pedido y aprobado por el usuario el 2026-10-28. Amplía [DEC-066](DEC-066-tipo-proveedor-por-obra-y-contrato.md) sin cambiar sus tres niveles: maestro, asignación a la obra y contrato.

## Contexto

- Un proveedor con «Orden de Servicio» en su maestro no aparecía al crear un contrato de ese tipo: en la obra trabajaba con otros tipos, y los del maestro solo se proponen al asignarlo (DEC-066).
- Cambiar los tipos de la obra exigía entrar a la obra, a su pestaña Proveedores y editar la asignación. El usuario quiere hacerlo desde el menú Proveedores, con la obra elegida en el encabezado, sin tocar el maestro.

## Decisión

- **Editar el proveedor (`save_provider`) según el encabezado** (alcance de DEC-047):
  - **Una obra elegida:** `pvtIds` son los tipos del proveedor **en esa obra**. Van a su asignación (`tbl_work_provider_types`) con las reglas de editarla: diferencial, cualquier tipo activo (o el que ya tenía) y 409 si se quita uno con contratos o facturas en la obra. Exigen el permiso de asignar (66) solo si cambian. El maestro no cambia. La bitácora es la de la asignación, en la obra y en el proveedor.
  - **«Ver todo»:** como antes, todo va al maestro y exige el permiso de editar (62).
  - Los **datos de la empresa** (identidad, nombre, servicio, correo, observación y contactos) van siempre al maestro. Con una obra elegida exigen el 62 solo si cambian; sin él, el formulario los muestra de solo lectura.
  - La ruta admite el 62 o el 66; el service decide según lo que cambia (403 si falta el que corresponde).
  - Bloqueo: obra → proveedor → maestros, como editar la asignación (DEC-066).
- **Crear con una obra elegida:** sin cambios en el servidor (DEC-047): se crea en el maestro y queda asignado a la obra con los mismos tipos. Si el documento ya existe, la verificación devuelve también los tipos de su maestro (`pvtIds`) y el formulario ofrece «Usar este proveedor»: lo abre si ya está en la obra, o lo asigna a ella (`assign_provider_work`) con esos tipos propuestos. El maestro de ese proveedor no cambia.
- **Pantalla:** con una obra elegida, el selector se titula «Tipos en la obra …»; el resumen muestra los tipos de la obra y, aparte, los del maestro.

## Descartado

- **Que cambiar el maestro cambie las obras:** contradice DEC-066, que el usuario confirmó; el maestro no toca obras.
- **Dos peticiones desde el cliente** (datos al maestro y tipos a la asignación): no serían atómicas.
- **Un campo aparte para los tipos de la obra** (`workPvtIds`): el alcance ya dice qué se edita, y el formulario envía un solo selector.

## Dónde

`server/src/modules/work/providers/providers.service.js` (`updateProvider`, `saveProvider`, `toExistingDto`), `providers.routes.js`, `providers.controller.js` · Cliente: `views/work/providers/ProviderDetailPage.jsx`, `components/ProviderDataForm.jsx` · Tests: `providers.service.test.js` («la ficha con una obra elegida edita los tipos de esa obra»).
