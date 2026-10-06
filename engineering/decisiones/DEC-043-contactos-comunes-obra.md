# DEC-043 — Contactos de obra, con las reglas de contacto en un solo lugar para obra y proveedor

**Fecha:** 2026-10-06 · **Tipo:** Obligatoria · **ADR:** [0009](../adr/0009-tipos-direccion.md), [0011](../adr/0011-obras.md)

Backlog PRO-BD-04. Aprobado por el usuario el 2026-10-06.

## Contexto

La obra tenía la pestaña Contactos vacía. Los contactos de proveedor ([DEC-032](DEC-032-identidad-proveedor.md)) ya resolvían las mismas reglas (ADR-0009, decisiones 3 a 7): un tipo de dirección obligatorio, al menos un medio de contacto, a lo sumo un principal, guardado por diferencial con su dueño. Copiar esa lógica en obras la habría duplicado.

## Decisión

- **Tabla propia** `tbl_work_contacts`, prefijo `wkc_`, misma estructura que `tbl_provider_contacts` (ADR-0009, decisión 3: sin tabla polimórfica). FK a la obra en `CASCADE` y al tipo de dirección en `RESTRICT`. Un solo principal por obra con `UNIQUE` sobre la columna generada `wkc_main_work`; `CHECK` de al menos un medio.
- **Reglas en un solo lugar del servidor:** `defineContacts({ model, prefix, ownerColumn, ownerLabel })` en `admin/addressTypes/addressTypes.contacts.js`. Lo usan `providers.service.js` y `works.service.js`. Vive junto al maestro de tipos de dirección (dueño de la estructura, ADR-0009) y no en `common/`, que no importa de `modules/`. No es un módulo: los contactos siguen siendo partes de su dueño (MAE-BE-06).
- **Una sola forma hacia el cliente:** `contactId` (no `prcId` ni `wkcId`), `adtId`, `addressType`, campos de texto y `main`. Cambió el contrato de los contactos de proveedor: el cliente se actualizó en el mismo cambio.
- **Validación común:** `contactsRules()` en `common/utils/validation.utils.js`.
- **Cliente:** `ContactsEditor` edita, `ContactsList` muestra y `utils/contacts.js` convierte entre detalle, formulario y payload, para los dos dueños. "Agregar contacto" va en el encabezado de la sección, a la derecha, como toda colección (`FormSection` con `onAdd`, [DESIGN_SYSTEM](../standards/DESIGN_SYSTEM.md)): el editor abre su diálogo con `adding` / `onAddingChange`.
- **Permisos:** sin uno propio. Los contactos de obra van con el de crear (53) o editar (54) la obra, como los de proveedor con los suyos.
- **Auditoría técnica** (ADR-0011, "Auditoría"): columnas de autoría, sin bitácora.
- **Bloqueo:** obra → usuarios → maestros, con los tipos de dirección de los contactos (`TIPO_DIRECCION`) entre los maestros.
- La huella de idempotencia de crear una obra incluye los contactos solo si hay alguno: sin contactos, la misma de antes.

## Descartado

- **Copiar las funciones de contacto en `works.service.js`:** dos copias de las mismas reglas que se separarían con el tiempo.
- **Un módulo `contacts` con endpoints propios:** el backlog (MAE-BE-06) y ADR-0011 (decisión 1) los quieren como parte del agregado, guardados con él.
- **Mantener `prcId` en proveedor y `wkcId` en obra:** el editor y la lista compartidos necesitarían saber de qué tabla vienen.

## Qué implica

- Un dueño nuevo de contactos declara su tabla con `defineContacts`, usa `contactsRules()` y, en el cliente, `ContactsEditor`, `ContactsList` y `utils/contacts.js`. Su tabla se agrega a los `dependents` de `addressTypes.service.js` y su `UNIQUE` a `uniqueConstraints.constants.js`.

## Dónde

`database/migrations/0070_create_work_contacts.sql` · `server/src/modules/admin/addressTypes/addressTypes.contacts.js`, `addressTypes.service.js` (dependientes) · `server/src/modules/work/works/` y `work/providers/` (service, validation) · `server/src/common/utils/validation.utils.js` (`contactsRules`) · `client/src/ui-component/extended/ContactsEditor.jsx`, `ContactsList.jsx`, `client/src/utils/contacts.js`, `views/work/works/WorkFormPage.jsx`, `WorkDetailPage.jsx` · tests `works.service.test.js` ("contactos"), `providers.service.test.js`, `addressTypes.service.test.js`.
