# DEC-032 — Identidad del proveedor: única entre no eliminados, y el duplicado responde 409 con el proveedor existente

**Fecha:** 2026-10-01 · **Tipo:** Vigente · **ADR:** [0012](../adr/0012-proveedores.md), [0008](../adr/0008-tipos-identificacion.md), [0009](../adr/0009-tipos-direccion.md)

Backlog PRO-BD-05 a PRO-BD-07, PRO-BE-05 a PRO-BE-08, PRO-FE-03 y PRO-FE-04.

## Contexto

ADR-0012 pide que el par (tipo de identificación, número) sea único con un `UNIQUE` en la BD, que el servicio traduzca el duplicado a una respuesta clara y que "crear nuevo" converja en "asignar el existente". Quedaban abiertos el alcance de la unicidad frente a proveedores eliminados, cómo llega el proveedor existente al cliente y qué es el "tipo de servicio".

## Decisión

- **Única entre no eliminados**, con el patrón de columna generada de los maestros: `prv_identification_active` vale el número mientras `sta_id <> 3`, con `UNIQUE (idd_id, prv_identification_active)`. Un proveedor eliminado no tiene obras (no se puede eliminar con obras), así que volver a registrar la empresa no rompe ningún expediente.
- **El duplicado responde 409 con el proveedor existente** en `data.existing` (`prvId`, nombre, tipo, número, estado). Lo mismo si lo detecta la verificación previa o si salta el `UNIQUE` (`P2002`) porque otro usuario ganó la carrera. Para eso `error.middleware.js` devuelve `err.data` cuando el error tiene estado explícito.
- **Verificación reactiva** (`check_provider_identification`): coincidencia exacta del par, nunca parcial, con el permiso de ver proveedores (que ya da el listado, así que no revela nada nuevo).
- **El número se valida con el formato de su tipo** ([DEC-021](DEC-021-formato-numero-documento.md)), igual que en usuarios.
- **Cambiar la identificación** de un proveedor existente exige el permiso 65 y se audita (ADR-0012, regla 5). Sin él, el formulario muestra el documento de solo lectura.
- **Tipo de servicio: texto libre** (`prv_service_type`, hasta 150), mientras el negocio no defina un catálogo (ADR-0012, "Pendiente de validación").
- **Contactos** en `tbl_provider_contacts`, con la estructura de ADR-0009 más persona de contacto y cargo (opcionales). A lo sumo un principal por proveedor, garantizado por una columna generada con `UNIQUE`, y al menos un medio de contacto, por `CHECK`. Se guardan con el proveedor, por diferencial; quitar uno borra la fila (auditoría técnica).
- **Bitácora funcional** (entidad `PROVEEDOR`): tipo y número de documento, nombre, tipo de proveedor, estado, y la asignación y desasignación a obras (también en la entidad `OBRA`). El número de documento se guarda completo: es el de una empresa o persona que contrata con la organización; si se clasifica como dato sensible, se oculta con `SENSITIVE_FIELDS`.

## Descartado

- **Única en todo el sistema, también frente a eliminados** (como el código de obra): impediría registrar de nuevo una empresa eliminada por error, sin ganancia, porque un proveedor eliminado no tiene obras.
- **Responder 409 sin datos** y que el cliente busque el existente: dos peticiones y una ventana más para la carrera.
- **Maestro de tipos de servicio**: ningún requisito define sus valores todavía.

## Qué implica

- Un proveedor creado antes de esta regla no existe: la tabla se creó limpia (PRO-BD-05 y PRO-BD-26 sin datos que migrar). Si algún día se importan los ~5.292 proveedores del esquema de origen, hay que depurar duplicados antes.
- Si "tipo de servicio" pasa a catálogo, se migra la columna a una FK.

## Dónde

`database/migrations/0044`, `0045` · `server/src/modules/work/providers/providers.service.js` (`findByIdentity`, `duplicateError`, `translateDuplicate`) · `server/src/common/middlewares/error.middleware.js` · `client/src/views/work/providers/components/useIdentityCheck.js` · `client/src/ui-component/extended/ContactsEditor.jsx`
