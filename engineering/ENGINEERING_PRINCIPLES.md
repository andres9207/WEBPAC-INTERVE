# Principios de ingeniería

## Orden de prioridades

```text
CORRECCIÓN > CONSISTENCIA > MANTENIBILIDAD > SIMPLICIDAD > VELOCIDAD
```

Ante una duda entre dos soluciones, gana la que respeta el valor de más arriba.

## Principios

1. **Las invariantes mandan sobre la implementación.** Una implementación que funciona pero rompe una invariante es incorrecta. Ver [`invariants/`](invariants/README.md).

2. **El backend es la autoridad.** Toda operación de negocio se valida en el servidor, se autoriza con permisos y queda auditada según su nivel de trazabilidad. El frontend controla la experiencia de uso, no la seguridad. La base de datos garantiza lo que se pueda garantizar ahí (FK, `UNIQUE`, `CHECK`) para cerrar carreras y duplicados. Fuente: ADR-0014 y la regla transversal de `docs/prompt_adr.md`.

3. **La identidad sale de la sesión.** Quién actúa y quién es el autor salen siempre de `req.user`, nunca de la petición ([DEC-005](decisiones/DEC-005-identidad-desde-sesion.md)).

4. **Reutilizar antes de crear.** Si existe un patrón, se usa. Si no existe: diseñar → evaluar → documentar → implementar. Nunca inventar → implementar → documentar.

5. **La complejidad sigue al dominio.** Un catálogo sigue siendo un CRUD simple. Un contrato con estados, saldos y liquidación no se disfraza de CRUD.

6. **Estado actual y estado objetivo se separan.** Todo documento distingue lo que el sistema hace hoy de lo que debería hacer, y nombra la brecha. Nada propuesto se presenta como existente.

7. **No inventar.** Ninguna tabla, permiso, endpoint, regla ni fórmula se da por existente sin verificarla. Lo que no se puede determinar se marca como pendiente de validación.

8. **Una regla, un lugar.** Las reglas no se copian entre documentos: se enlazan. Una copia se desactualiza y termina contradiciendo al original.

9. **Los saldos se validan, no se escriben.** Los valores derivados (saldo de anticipo, retenido disponible) se calculan desde los movimientos bajo bloqueo ([ADR-0027](adr/0027-integridad-transaccional.md), regla 7).

10. **Lo financiero es inmutable después de aprobarse.** Se corrige anulando y registrando de nuevo, no editando ([ADR-0020](adr/0020-facturacion.md)).

11. **Cambios chicos y verificables.** Un cambio hace una cosa, tiene su test y deja el repositorio igual de consistente que como lo encontró.

12. **La IA es reemplazable; el sistema de ingeniería no.** Las reglas pertenecen al repositorio, no a un modelo ni a una conversación.
