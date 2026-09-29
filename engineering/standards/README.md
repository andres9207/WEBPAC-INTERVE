# Estándares

Reglas **obligatorias** por capa. Un estándar dice qué se debe cumplir; el *cómo*, con código de referencia, está en [`../patterns/`](../patterns/README.md).

| Estándar | Cuándo aplica | Resumen |
| --- | --- | --- |
| [`ENDPOINT_STANDARD.md`](ENDPOINT_STANDARD.md) | Todo endpoint o service nuevo o modificado | Pipeline de middlewares, transacciones y bloqueo, idempotencia, paginación, prohibiciones y checklist. **El más importante** |
| [`MODULE_STANDARD.md`](MODULE_STANDARD.md) | Módulo nuevo | Cómo clasificar (niveles 1–4) y qué exige cada nivel |
| [`CRUD_STANDARD.md`](CRUD_STANDARD.md) | Maestros y CRUD complejos | Receta de punta a punta: BD → permisos → backend → cliente |
| [`WORKFLOW_STANDARD.md`](WORKFLOW_STANDARD.md) | Entidades con estados | Máquina de estados, historial, transiciones idempotentes |
| [`DOMAIN_STANDARD.md`](DOMAIN_STANDARD.md) | Reglas de negocio del dominio | Dónde viven las reglas, dinero, fechas, vocabulario |
| [`API_STANDARD.md`](API_STANDARD.md) | Contrato HTTP | URLs, verbos, formas de respuesta, encabezados, códigos |
| [`DATABASE_STANDARD.md`](DATABASE_STANDARD.md) | Migraciones y tablas | Prefijos, auditoría, eliminación lógica, UTC, Prisma |
| [`BACKEND_STANDARD.md`](BACKEND_STANDARD.md) | Código del servidor | Capas, servicios transversales, dónde va cada cosa |
| [`FRONTEND_STANDARD.md`](FRONTEND_STANDARD.md) | Código del cliente | Anatomía de página y diálogo, permisos en UI, errores |
| [`SECURITY_STANDARD.md`](SECURITY_STANDARD.md) | Todo | Índice de las reglas de seguridad y dónde viven |
| [`TESTING_STANDARD.md`](TESTING_STANDARD.md) | Todo cambio con lógica | Qué se prueba y cómo |
| [`ERROR_HANDLING_STANDARD.md`](ERROR_HANDLING_STANDARD.md) | Todo | Cómo se lanza, se traduce y se muestra un error |

`ENDPOINT_STANDARD.md` conserva su nombre y su contenido: los demás estándares del servidor lo enlazan en vez de repetirlo.
