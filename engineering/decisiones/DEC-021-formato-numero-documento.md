# DEC-021 — El formato del número de documento se valida por tipo, con la regla en el código del servidor

**Fecha:** 2026-09-29 · **Tipo:** Obligatoria · **ADR:** [0008](../adr/0008-tipos-identificacion.md) (decisión 5)

Backlog MAE-BE-07 (criterios 3 y 4) y MAE-FE-07 (criterio 3).

## Contexto

ADR-0008 pide validar el formato del número según el tipo, en frontend y backend, con la regla en el código (alternativa 3) y no en la BD ni editable desde la interfaz (alternativa 2, riesgo de ReDoS).

## Decisión

- **Formatos** (definidos por el negocio el 2026-09-29):

  | Código | Formato |
  | --- | --- |
  | CC | 6 a 10 dígitos, sin puntos ni espacios |
  | CE | 3 a 7 dígitos |
  | NIT | 9 dígitos, guion y dígito de verificación (`900123456-7`); el dígito se verifica con el algoritmo módulo 11 de la DIAN |
  | PA | 5 a 20 letras o números |
  | PPT | 6 a 15 dígitos |
  | Otro código (creado desde la interfaz) | Genérico: 3 a 20 letras, números o guiones |

- **Una sola fuente:** `identityDocuments.formats.js` (`identificationError(code, number)`). `saveUser` la aplica al crear y al editar, con el tipo ya bloqueado, y responde 400 nombrando el tipo y el motivo. El número se guarda sin espacios de borde.
- **El cliente no copia la regla:** el selector de tipos entrega `format: { pattern, message, checkDigit }` con cada opción, y `client/src/utils/identification.js` avisa antes de enviar. Lo único duplicado es el algoritmo del dígito de verificación, marcado con `checkDigit: "DIAN"`.

## Descartado

- **Regla en la BD o editable desde la interfaz:** ADR-0008, alternativa 2.
- **Copia de la tabla de formatos en el cliente:** se desincronizaría con el servidor.

## Qué implica

- Darle formato propio a un tipo nuevo exige cambiar `IDENTIFICATION_FORMATS` y desplegar.
- Un usuario guardado antes de esta regla con un número que no la cumple tiene que corregirlo la próxima vez que se edite.
- Proveedores (ADR-0012) usan la misma función cuando existan.

## Dónde

`server/src/modules/admin/identityDocuments/identityDocuments.formats.js` · `identityDocuments.service.js` (`selectExtra`) · `security/users/users.service.js` (`assertIdentification`) · `client/src/utils/identification.js` · `client/src/views/security/users/components/UserDialog.jsx` · tests en `server/test/modules/admin/identityDocuments/identityDocuments.formats.test.js` y `security/users/users.service.test.js`
