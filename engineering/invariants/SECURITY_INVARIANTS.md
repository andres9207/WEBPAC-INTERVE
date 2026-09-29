# Invariantes de seguridad

La historia de cada una está en [`../anti-patterns/SECURITY.md`](../anti-patterns/SECURITY.md).

| ID | Invariante | Estado | Mecanismo | Fuente |
| --- | --- | --- | --- | --- |
| SEC-01 | El sujeto y el autor de toda operación salen de `req.user`, nunca de la petición | APLICADA | Controllers + tests de regresión de controllers (autor falsificado se ignora) | DEC-005 |
| SEC-02 | Toda ruta que no es pública a propósito exige `verifyToken`, y la sesión (`sid`) debe seguir viva en `tbl_sessions` | APLICADA | `authjwt.middleware.js`, con test | DEC-002 |
| SEC-03 | Toda ruta que opera sobre datos ajenos, también de lectura, exige `requirePermission` | CONVENCIÓN | Checklist de `ENDPOINT_STANDARD`; no hay test que recorra todas las rutas | ADR-0014 |
| SEC-04 | El permiso efectivo es perfil ∪ excepciones del usuario, resuelto en cada petición | APLICADA | `effectivePermissions.service.js`, con test | ADR-0014 |
| SEC-05 | No existe ningún caso especial de código por id de usuario o de perfil | CONVENCIÓN | Revisión | `anti-patterns/SECURITY.md` |
| SEC-06 | Nadie se asigna permisos a sí mismo ni a su propio perfil | APLICADA | `permissions.service.js` responde 403, con test | ADR-0014 |
| SEC-07 | Un usuario tiene como máximo una sesión | APLICADA | `UNIQUE(use_id)` en `tbl_sessions` | DEC-002 |
| SEC-08 | Tokens, contraseñas y códigos nunca viajan en el body de una respuesta ni quedan en logs; en la bitácora quedan como `[oculto]` | APLICADA en la bitácora (`SENSITIVE_FIELDS`); CONVENCIÓN en respuestas y logs | `audit.service.js` | ADR-0001, ADR-0013 |
| SEC-09 | La recuperación de contraseña responde igual, en status, cuerpo y tiempo, exista o no la cuenta | APLICADA | `forgotPassword`: piso de tiempo + envío desacoplado, con test | ADR-0001 |
| SEC-10 | El servidor no arranca sin `JWT_SECRET` | APLICADA | `server.js` | ADR-0001 |
| SEC-11 | Un socket solo se une a salas después de verificar el JWT del handshake | APLICADA | `authenticateHandshake` en `socket.js` | `anti-patterns/SECURITY.md` |
| SEC-12 | La bitácora nunca se modifica ni se borra | CONVENCIÓN: ningún código lo hace, pero el usuario de BD todavía tiene el privilegio | Pendiente: restringir a `INSERT`/`SELECT` ([deuda](../debt/TECHNICAL_DEBT.md)) | ADR-0013 |
| SEC-13 | El código de recuperación admite como máximo 5 intentos, contados antes de comparar | APLICADA | Incremento condicionado en `auth.service.js`, con test | DEC-004 |
