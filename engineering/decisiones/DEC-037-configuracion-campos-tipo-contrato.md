# DEC-037 — Configuración de campos por tipo de contrato: catálogo cerrado, jerarquía estricta, versión con historial

**Fecha:** 2026-10-02 · **Tipo:** Obligatoria · **ADR:** [0006](../adr/0006-tipos-contrato.md), [0013](../adr/0013-auditoria-trazabilidad.md), [0027](../adr/0027-integridad-transaccional.md)

> **Reemplazada por [DEC-053](DEC-053-campos-contrato-por-tipo-proveedor.md)** (2026-10-08): la configuración pasó al tipo de proveedor, con la unión de sus tipos. Se retiraron `tbl_contract_type_fields`, `tbl_contract_type_field_versions`, `ctt_config_version`, `ctr_config_version` y el permiso 75. El modelo de abajo (catálogo cerrado, jerarquía, ausencia = no aplica, heredados) sigue vigente sobre el tipo de proveedor.

Implementa ADR-0006 (decisiones 1 a 10) y el backlog MAE-BD-07 a MAE-BD-09, MAE-BE-08 y MAE-FE-08. Decidido por el usuario el 2026-10-02.

## Decisión

- **Tres tablas nuevas y una versión:**

  | Parte | Tabla | Prefijo |
  | --- | --- | --- |
  | Catálogo cerrado de campos | `tbl_contract_fields` | `cfd_` |
  | Configuración por tipo (una fila por tipo y campo) | `tbl_contract_type_fields` | `ctf_` |
  | Historial de versiones (solo inserción) | `tbl_contract_type_field_versions` | `cfv_` |

  `tbl_contract_types.ctt_config_version` es la versión vigente; `tbl_contracts.ctr_config_version`, la que se aplicó al capturar el contrato.
- **Catálogo cerrado y versionado con el código.** Lo siembran la migración `0053` y `seed.js`. Cada clave tiene su columna real en `contractFields.js` (`CONFIGURABLE_FIELDS`), y un test verifica que las claves coinciden. No se edita desde la interfaz. Un campo nuevo es una migración (columna + fila del catálogo) más su entrada en el código.
- **Solo entran los campos que varían por tipo:**
  - etapa
  - observaciones
  - descripción del otrosí
  - los seis porcentajes del concepto: administración, imprevistos, utilidad, IVA, anticipo y retenido

  Los estructurales aplican siempre y no se configuran: obra, proveedor, tipo, número, nombre, fecha de inicio, plazo, costo directo, fecha del concepto y prórroga. Sin ellos no hay contrato, fecha fin ni valor.
- **La etapa pasa a ser opcional en la BD** (`0056`). La FK compuesta `(wks_id, wrk_id)` sigue protegiendo los contratos que la tienen.
- **Jerarquía estricta, obligatorio ⇒ visible ⇒ aplica**:
  - se exige con un `CHECK` en la configuración y en el historial;
  - el service la valida (400);
  - el editor no deja marcar una casilla sin la anterior.

  Un campo oculto no puede ser obligatorio, porque nadie podría llenarlo.
- **Por defecto restrictivo:** sin fila, el campo no aplica. Solo se guardan los campos que aplican. Un tipo nuevo nace sin configuración.
- **Los tipos existentes** (migración `0057`) recibieron todos los campos aplicables y visibles, con la etapa obligatoria, como su versión 1. Así se comportan igual que antes.
- **Resolución única** (`resolveContractFields` → `resolveFields`). La misma función entrega los descriptores al formulario (`GET /work/contracts/get_contract_fields`) y valida el guardado con `enforceFields`, dentro de la transacción de:
  - crear o editar el contrato;
  - crear un otrosí o el otrosí de liquidación;
  - modificar un concepto.
- **Lo que hace el guardado según la configuración:**

  | Situación | Resultado |
  | --- | --- |
  | Campo que no aplica, con valor | 400: se rechaza, no se ignora |
  | Campo que no aplica, sin valor | Queda vacío; 0 en un porcentaje |
  | Campo que dejó de aplicar, con valor guardado | Es un valor **heredado**: se conserva, y cambiarlo es 400 |
  | Aplica y no se muestra | Al crear, el valor por defecto (IVA 19, anticipo 15, el resto 0); al editar, el guardado |
  | Obligatorio | Debe venir con valor (400). En un porcentaje, 0 es un valor |
- **Los contratos existentes no cambian** al reconfigurar (ADR-0006, decisión 7). El formulario usa la configuración vigente del tipo y muestra en solo lectura, marcado "(heredado)", el valor de un campo que dejó de aplicar (decisión 8).
- **Versión:**
  - Guardar la configuración con cambios sube `ctt_config_version` y copia la configuración completa al historial, en la misma transacción. Sin cambios no sube nada (reintentable).
  - El contrato guarda la versión con que se creó. Si se le cambia el tipo, pasa a la versión vigente del nuevo.
  - `get_contract_fields?version=N` reconstruye los descriptores de esa versión.
- **Guardado por diferencial** (altas, cambios y bajas), como `updateProfilePermissions`, bajo el bloqueo del tipo (`TIPO_CONTRATO`).
- **Bitácora funcional:**
  - una fila por campo que cambió, con el estado anterior y el nuevo en texto (por ejemplo "aplica, visible, obligatorio, orden 3", o "no aplica");
  - una fila con el cambio de `ctt_config_version`;
  - todas con la entidad `TIPO_CONTRATO`.
- **Permiso 75, "Configurar campos del tipo de contrato"**, aparte de modificar. Ver la configuración exige solo ver tipos de contrato (47).
- **Interfaz:**
  - En el listado de tipos de contrato, cada fila tiene la acción "Configurar campos", o "Ver campos" sin el permiso. Abre una matriz con las casillas aplica, visible y obligatorio, y el orden (`ContractTypeFieldsDialog`).
  - `MasterPage` acepta `extraActions(row)` para acciones propias de un maestro.
  - En el formulario de contrato y en el diálogo de otrosí, los campos configurables los dibuja `GenericFormSection` a partir de los descriptores (`components/configurableFields.jsx`). Se envían solo los visibles.
  - `GenericFormSection` muestra ahora los errores de campos anidados (`initialConcept.vatPct`).

## Descartado

- **Configuración serializada (JSON o CSV)** y **una columna por campo y atributo**: ADR-0006, alternativas 1 y 2.
- **Que la configuración gobierne también los campos estructurales**: un tipo podría dejar un contrato sin plazo o sin costo directo.
- **Reconstruir una versión desde la bitácora**: obliga a reproducir el historial de cambios. Se eligió el historial de versiones.
- **Rellenar la configuración de los tipos existentes con "no aplica"**: los formularios actuales habrían perdido los porcentajes de un día para otro.

## Dónde

`database/migrations/0053`–`0057` · `server/src/modules/admin/contractTypes/` (`contractFields.js`, `contractTypeFields.service.js`, su controller, validación y rutas) · `contracts.service.js` y `contractConcepts.service.js` (`enforceFields`) · `client/src/views/admin/contractTypes/` · `client/src/views/work/contracts/components/configurableFields.jsx`
