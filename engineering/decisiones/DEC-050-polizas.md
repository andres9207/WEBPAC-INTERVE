# DEC-050 — Pólizas: submódulo de contratos con versiones, y tipos de póliza sin semillas mientras DEC-04 siga abierta

**Fecha:** 2026-10-07 · **Tipo:** Vigente · **ADR:** [0018](../adr/0018-polizas.md), [0019](../adr/0019-tipos-poliza.md)

Lo decidió el usuario el 2026-10-07. Resuelve la parte de pólizas de PD-05 y adelanta ADR-0018 y ADR-0019 sin esperar la decisión de negocio DEC-04.

## Contexto

Los dos ADR pedían no implementar nada antes de DEC-04: qué base de cálculo usa cada tipo de póliza y qué significan "subtotal" e "IVA". Pólizas era el módulo que más tareas destrababa (expediente, creación del contrato, condición C8 y tablero). Faltaba también decidir su área en el código (PD-05).

## Decisión

- **Se construye sin semillas.**
  - Las cuatro bases del ADR-0019 se declaran como un dominio cerrado (`CHECK`): `DIRECT_COST` (costo directo), `TAXABLE_BASE` (costo directo + AIU), `TOTAL_VALUE` (más IVA) y `VAT_ONLY` (solo IVA).
  - No se siembra ningún tipo. Los crea quien tenga el permiso y elige la base al crearlo; el selector muestra qué compone cada una. El sistema no supone ninguna lectura de "subtotal" ni de "IVA".
  - Sembrar los tipos confirmados (MAE-BD-14) sigue esperando a DEC-04.
- **Tipos de póliza:** maestro `admin/policyTypes` (`tbl_policy_types`, `plt_`, DEC-017).
  - La clave simbólica se fija al crear y no se edita.
  - Cambiar la base después exige el permiso 98, separado de modificar (95). Queda en la bitácora con la base anterior y cuántas pólizas vigentes tenía el tipo. No recalcula nada.
- **Pólizas: submódulo de `work/contracts`** (`tbl_policies`, `pol_`, rutas en `/api/work/contracts/`), como los conceptos y las suspensiones.
  - Ampara **un** concepto de su contrato. Lo garantiza una FK compuesta (`ccp_id`, `ctr_id`), apoyada en el índice de la migración 0079. El concepto no cambia entre versiones.
  - **El valor asegurado no se guarda.** Se calcula en cada consulta: porcentaje × base evaluada sobre el concepto (`policyBaseValue`, `insuredValue`, con el redondeo único de DEC-045). La base se copia del tipo al emitir cada versión.
  - **Versiones.** Modificar cierra la vigente y crea la siguiente en la misma transacción. Todas las versiones comparten `pol_root_id`, y hay una sola vigente por póliza (`UNIQUE` sobre una columna generada, invariante I10). **Una versión nueva copia la base vigente del tipo**: es una emisión nueva.
  - **Anular** cierra la versión vigente con un motivo del catálogo (ámbito nuevo `POLICY_CANCEL`) y una observación obligatoria. Nada se elimina, así que la tabla no lleva `sta_id`.
  - **Estado del contrato** (tabla de efectos de ADR-0017, que precisa la decisión 10 de ADR-0018; confirmado por el usuario):
    - En ejecución y suspendido: registrar, renovar (emitir una versión nueva) y anular.
    - En liquidación: renovar las vigentes y registrar la póliza del otrosí de liquidación, que nace en ese estado. No se registran pólizas de otros conceptos ni se anula.
    - Liquidado: solo consulta.
    - Acciones `createPolicy`, `createLiquidationPolicy`, `renewPolicy` y `cancelPolicy` en `STATE_ALLOWS`.
  - **Vigencia** (`policyTerms.js`): se calcula con la fecha del servidor en cuatro categorías: sin fecha de vigencia, vigente, a vencer y vencida. El umbral de "a vencer" sale de `POLICY_EXPIRING_DAYS` (por defecto 30) y se devuelve con las pólizas. Los conceptos sin póliza vigente se muestran como un hallazgo.
  - **Una póliza vigente por concepto y tipo** (2026-10-08, lo decidió el usuario). Un concepto admite varias pólizas, de tipos distintos. Registrar una de un tipo que el concepto ya tiene vigente, o cambiar a ese tipo al emitir una versión, responde 409. La verifica el service (`assertTypeFree`) bajo el bloqueo del contrato, que toman todas las operaciones de pólizas; la BD todavía no la garantiza (ver deuda).
  - **Creación con el contrato** (2026-10-08, PRO-BE-09). Crear el contrato acepta `policies[]`, opcional, hasta 20. Se crean en la misma transacción, sobre el valor inicial, con la misma emisión que el expediente (`insertPolicy`) y el mismo `operationId` del contrato. Sin el permiso 100, si llegan pólizas, responde 403: crear el contrato no da el de registrar pólizas. Dos del mismo tipo en el envío responden 400.
  - **Eliminaciones bloqueadas.** Un contrato con pólizas no se elimina (409). Un tipo, una aseguradora o un motivo con pólizas tampoco: cuentan todas, también las anuladas y las versiones cerradas.
- **Permisos:** tipos de póliza 93 a 98 (página 20, "Administración > Tipos de póliza"); pólizas 99 (ver), 100 (registrar), 101 (modificar) y 102 (anular), en la página Contratos. Los de ver se dan a todos los perfiles.
- **Bloqueo:** contrato → póliza → maestros (`TIPO_POLIZA` al final de `LOCK_ORDER`).

## Descartado

- **Esperar DEC-04:** dejaba bloqueado todo lo que depende de pólizas, aunque lo único que la decisión fija son los datos de los tipos.
- **Un módulo `work/policies` aparte:** el usuario prefirió el submódulo de contratos.
- **Gestionar todo en liquidación, como decía ADR-0018:** la tabla de efectos de ADR-0017 limita ese estado a la renovación.
- **Solo renovar en liquidación, al pie de la letra de ADR-0017:** el otrosí de liquidación quedaría sin póliza posible.
- **Conservar la base anterior al emitir una versión nueva:** una versión es una emisión, y usa la regla vigente de su tipo.

## Qué implica

- Quien siembre los tipos cuando se resuelva DEC-04 lo hace con una migración y con `seed.js`, sin cambiar código.
- El tablero (ADR-0002) y la condición C8 deben usar `policyValidity` y `uncoveredConcepts`, no volver a calcular la vigencia.
- Crear el contrato con sus pólizas reutiliza `insertPolicy`: cualquier regla nueva de emisión vale para los dos caminos.

## Dónde

Migraciones `0078` a `0082` · `server/src/modules/admin/policyTypes/` · `server/src/modules/work/contracts/contractPolicies.service.js` y `policyTerms.js` · `client/src/views/admin/policyTypes/` · `client/src/views/work/contracts/components/` (`PoliciesTab`, `PolicyDialog`, `CancelPolicyDialog`, `PoliciesDraftEditor`) · tests en `test/modules/admin/policyTypes/` y `test/modules/work/contracts/` (`contractPolicies`, `policyTerms`)
