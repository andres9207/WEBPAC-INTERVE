# DEC-087 — La fecha de inicio del contrato cae dentro del plazo de su obra

**Fecha:** 2026-10-27 · **Tipo:** Obligatoria · **ADR:** [0015](../adr/0015-contratos.md)

Decidido por el usuario el 2026-10-27: la fecha de inicio del contrato no puede ser anterior al inicio de la obra ni posterior a su fin.

## Contexto

- El contrato admitía cualquier fecha de inicio, aunque cayera fuera del plazo de la obra.

## Decisión

- **Inicio de la obra ≤ inicio del contrato ≤ fin de la obra**, con los dos extremos admitidos. El fin de la obra es inicio + plazo inicial, el mismo que muestra el listado de obras (`addTerm`); el plazo ampliado, oculto en la interfaz, no entra.
- El servidor lo valida al crear y, al editar, **solo si la fecha de inicio cambia**: un contrato anterior a la regla se sigue editando sin tocar su fecha. Fuera de rango responde 400 con la fecha límite.
- El formulario recibe el plazo de la obra en sus opciones (`work: { startDate, endDate }`), limita el calendario y avisa antes de guardar.
- Solo la fecha de inicio: la fecha fin del contrato (con otrosíes y suspensiones) puede pasar el fin de la obra.

## Descartado

- Validar también la fecha fin del contrato: no se pidió, y las prórrogas la mueven.
- Validar siempre al editar: bloquearía la edición de los contratos ya registrados fuera de rango.

## Qué implica

- Un cambio en el inicio o el plazo de una obra no revisa sus contratos: la regla se aplica al guardar el contrato.

## Dónde

`server/src/modules/work/contracts/contracts.service.js` (`assertStartWithinWork`, `workTermOf`, `getContractFormOptions`) · Cliente: `views/work/contracts/components/ContractDataForm.jsx`, `ui-component/extended/DateField.jsx` (`maxDate`) · Tests: `contracts.service.test.js` ("fecha de inicio dentro del plazo de la obra").
