# DEC-016 — Idempotencia por clave en creación (y transición)

**Fecha:** 2026-09-25 · **Tipo:** Obligatoria · **ADR:** [0027](../adr/0027-integridad-transaccional.md) (decisión 7, B3)

## Contexto

Ninguna operación era idempotente. Un doble clic, un reenvío manual o el reintento automático de `httpCliente` después de renovar la sesión ejecutaban dos veces la creación: dos usuarios, dos perfiles o dos documentos iguales.

## Decisión

- **El cliente genera una clave** (UUID) **al abrir el formulario de creación**. La envía en el encabezado estándar **`Idempotency-Key`** en cada intento de guardar ese formulario. Formulario nuevo, clave nueva.
- **La clave se guarda en la propia entidad**, no en una tabla central. Son dos columnas (migración `0016`):
  - `<pre>_idempotency_key` `char(36)`, `UNIQUE`;
  - `<pre>_idempotency_hash` `char(64)`: SHA-256 del contenido de la petición, **sin contraseñas**, para detectar la misma clave usada con otro contenido.
- **Reglas**, en `runIdempotent` (`common/services/idempotency.service.js`):

  | Situación | Respuesta |
  | --- | --- |
  | Clave nueva | Se ejecuta la operación y la clave queda en la fila creada |
  | Misma clave, mismo contenido, mismo autor | La **misma respuesta** que la creación original, sin ejecutar nada |
  | Misma clave con otro contenido, o de otro autor | **422**, sin revelar la entidad ajena |
  | Dos peticiones con la misma clave a la vez | El `UNIQUE` deja crear solo una; la otra choca, encuentra la creada y la devuelve |

- **La clave se busca antes que todo**, incluido el control de duplicados del service. Si no, el reintento de una creación exitosa respondería "ya existe" en vez de devolver lo creado.
- **Validación**: `idempotencyKeyRule` exige el encabezado (UUID) al crear; al editar no, porque editar ya es idempotente. Una clave en el body se ignora.
- **Aplicada a**: crear usuario, crear perfil y registrar un documento. En el cliente: `UserDialog`, `ProfileDialog` (clave al abrir "nuevo") y la subida de archivos (una clave por archivo).
- **Transiciones** (aprobar, anular…): el mismo `runIdempotent`, con la clave en la fila del **historial de estado** del agregado y la precondición leída bajo bloqueo. Se aplica cuando existan esas tablas (CORE); hoy ninguna tabla tiene historial de estado.

## Descartado

- **Tabla central de claves**: se evaluó y se descartó a favor de lo que dice el ADR, con la clave en la propia entidad. Se agregó la columna de huella para poder cumplir "misma clave con otro contenido se rechaza" sin comparar campo por campo.
- **Incluir la contraseña en la huella**: la huella se guarda en la BD y permitiría probar contraseñas por fuerza bruta. Consecuencia aceptada: un reintento que solo cambie la contraseña se trata como el mismo contenido.
- **Clave en el body**: el encabezado `Idempotency-Key` es el estándar de facto, no se mezcla con los datos del formulario y el reintento de `httpCliente` lo conserva solo.

## Qué implica

- **Todo endpoint nuevo que cree un registro** exige el encabezado y usa `runIdempotent` con un `target` que apunte a su tabla. Toda tabla nueva que reciba creaciones lleva las dos columnas.
- **Toda transición nueva** guarda la clave en su tabla de historial de estado.
- **Despliegue**: aplicar `0016` antes de desplegar este código. Sin las columnas, crear falla.

## Dónde

`server/src/common/services/idempotency.service.js` · `server/src/common/utils/validation.utils.js` (`idempotencyKeyRule`) · `database/migrations/0016_idempotency_keys.sql` · `client/src/utils/idempotency.js`
