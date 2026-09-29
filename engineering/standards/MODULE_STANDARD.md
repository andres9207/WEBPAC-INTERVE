# Estándar de módulos: clasificación

Todo módulo nuevo se clasifica **antes** de diseñarlo. La clase decide qué estándares y patrones aplican. Sale del dominio (qué reglas tiene la entidad), no del nombre del pedido.

## Niveles

| Nivel | Qué lo define | Módulos de este proyecto | Aplica |
| --- | --- | --- | --- |
| **1 · CRUD simple** | Catálogo con pocas reglas, sin ciclo de vida, sin hijos. Auditoría técnica | Existentes: notificaciones. Previstos: aseguradoras (ADR-0003), constructoras (0004), tipos de interventoría (0007), de identificación (0008), de dirección (0009), de proveedor (0010) | [`CRUD_STANDARD`](CRUD_STANDARD.md), [`SIMPLE_CRUD`](../patterns/SIMPLE_CRUD.md) |
| **2 · CRUD complejo** | CRUD con colecciones hijas, dependencias que bloquean la eliminación, reglas propias, o auditoría funcional | Existentes: usuarios, perfiles, permisos, documentos. Previstos: obras (0011), proveedores (0012), tipos de contrato (0006), tipos de póliza (0019) | [`CRUD_STANDARD`](CRUD_STANDARD.md), [`COMPLEX_CRUD`](../patterns/COMPLEX_CRUD.md) |
| **3 · Workflow** | La entidad tiene estados y transiciones con reglas; hay acciones que no son "editar" (aprobar, anular, suspender) | Previstos: contratos (0015, 0017), facturas (0020), pólizas versionadas (0018) | [`WORKFLOW_STANDARD`](WORKFLOW_STANDARD.md), [`STATE_MACHINE`](../patterns/STATE_MACHINE.md) |
| **4 · Operación entre módulos** | Una operación cambia varios agregados o valida saldos derivados | Previstos: crear contrato con su valor inicial y pólizas, crear otrosí de liquidación, aprobar factura (anticipo, amortización, retenido, liquidación) | [`TRANSACTIONAL_WORKFLOW`](../patterns/TRANSACTIONAL_WORKFLOW.md), [`CROSS_MODULE_OPERATION`](../patterns/CROSS_MODULE_OPERATION.md), ADR-0027 |

## Cómo decidir

```text
¿La entidad tiene estados con transiciones que no son "activo/inactivo"?  → nivel 3 como mínimo
¿Alguna operación cambia otra entidad o un saldo?                         → esa operación es nivel 4
¿Tiene colecciones hijas, bloqueos por uso o auditoría funcional?          → nivel 2
Si no                                                                      → nivel 1
```

`activo / inactivo / eliminado` (`sta_id` 1/2/3) **no** es un workflow: es el estado estándar de todo registro.

Un módulo puede mezclar niveles: el contrato es nivel 3 y algunas de sus operaciones son nivel 4. Se documenta cada operación con su nivel.

## Qué exige cada nivel

| Exigencia | 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- |
| Pipeline de [`ENDPOINT_STANDARD`](ENDPOINT_STANDARD.md) | ✔ | ✔ | ✔ | ✔ |
| Seis columnas de autoría + eliminación lógica | ✔ | ✔ | ✔ | ✔ |
| Idempotencia al crear | ✔ | ✔ | ✔ | ✔ |
| Bloqueo del registro al editar o eliminar (`withLockedTransaction`) | ✔ | ✔ | ✔ | ✔ |
| Bitácora funcional (`writeAudit`) | según ADR-0013 dec. 9 | según ADR-0013 dec. 9 | ✔ | ✔ |
| Bloqueo de eliminación por uso | si el ADR lo pide | ✔ | ✔ | ✔ |
| Tabla de historial de estados + transiciones idempotentes | — | — | ✔ | ✔ |
| Spec con estados, transiciones y guardas ([`WORKFLOW_TEMPLATE`](../templates/WORKFLOW_TEMPLATE.md)) | — | — | ✔ | ✔ |
| Catálogo de invariantes que toca y su mecanismo | — | si tiene | ✔ | ✔ |
| Aprobación explícita antes de implementar | recomendada | ✔ | ✔ | ✔ |

## Dónde vive un módulo

- Servidor: `server/src/modules/<área>/<módulo>/` con `*.routes.js`, `*.validation.js`, `*.controller.js`, `*.service.js`. Montado en `modules/main.routes.js` bajo `/api/<área>/<módulo>`.
- Cliente: `client/src/views/<área>/<módulo>/` con `<Modulo>Page.jsx` y `components/<Modulo>Dialog.jsx`; API en `client/src/api/requests/<módulo>Api.js`.
- Tests: `server/test/` espejando `server/src/`.

El área para el dominio (p. ej. `config/` para maestros, `contracts/`, `billing/`) **REQUIERE DECISIÓN** con el primer módulo; los ADR no la fijan. Una vez elegida, se agrega aquí.
