# Documento de módulo: `<módulo>`

> Ficha corta de un módulo **ya implementado**, para que otro agente lo entienda sin leer todo el código. Se crea al terminar el primer entregable y se actualiza cuando cambia. La spec previa a implementar es [`CRUD_TEMPLATE`](CRUD_TEMPLATE.md) o [`WORKFLOW_TEMPLATE`](WORKFLOW_TEMPLATE.md).

## Resumen

Qué hace, en dos líneas. Nivel. ADR y DEC que aplica.

## Dónde está

| Capa | Ruta |
| --- | --- |
| Servidor | `server/src/modules/<área>/<módulo>/` |
| Tests | `server/test/modules/<área>/<módulo>/` |
| Cliente | `client/src/views/<área>/<módulo>/` |
| API del cliente | `client/src/api/requests/<módulo>Api.js` |
| Migraciones | |

## Endpoints

| Ruta | Permiso | Qué hace |
| --- | --- | --- |
| | | |

## Tablas

Tablas propias, a qué otras referencia y quién la referencia.

## Reglas no obvias

Lo que alguien rompería sin darse cuenta: bloqueos, dependencias, validaciones cruzadas.

## Invariantes

IDs de [`invariants/`](../invariants/README.md) que este módulo hace cumplir, y con qué.

## Deuda conocida

Enlaces a [`debt/TECHNICAL_DEBT.md`](../debt/TECHNICAL_DEBT.md).
