# DEC-013 — Paginación con helper único y tope de 100 filas

**Fecha:** 2026-09-25 · **Tipo:** Obligatoria · **ADR:** —

## Contexto

Cada listado calculaba `skip`/`take` a su manera. El de documentos aceptaba `paginate: false` en el body, y con eso devolvía la tabla completa sin límite. Notificaciones devolvía un arreglo suelto, sin total.

## Decisión

- **Un solo helper**: `paginate(model, queryArgs, pagination)` en `common/utils/pagination.utils.js`.
- **Acepta las dos entradas que ya usa el cliente**: `{ first, rows }` (tablas con paginador) o `{ page, limit }` (página desde 1).
- **Tope fijo**: entre 1 y 100 filas. Ningún parámetro del cliente lo quita. Se eliminó `paginate: false`.
- **Respuesta**: `{ results, total, page, limit, totalPages }`.
- Lo usan usuarios, perfiles, documentos y notificaciones.

## Descartado

- **Devolver `data` en lugar de `results`**, como en la propuesta original. `results` es lo que ya leen las pantallas, y `data` quedaría como `response.data.data` con axios.
- **Paginar dentro de una transacción**: los listados son solo lectura. Si alguna vez hace falta, se pasa `tx.tbl_x` como `model`.

## Qué implica

- Todo listado nuevo usa `paginate`, con el orden tomado de una lista de campos permitidos (`*_SORT_FIELDS`), nunca directo del `sortField` del cliente.

## Dónde

`server/src/common/utils/pagination.utils.js` · `server/ENDPOINT_STANDARD.md`, "Listados paginados"
