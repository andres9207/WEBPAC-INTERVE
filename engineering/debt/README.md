# Deuda técnica

[`TECHNICAL_DEBT.md`](TECHNICAL_DEBT.md) es la **lista única** de lo pendiente: despliegue, funcionalidad abierta, hallazgos de seguridad sin corregir, deriva entre código y documentos, y limpieza. Antes estaba repartida entre `SECURITY.md` ("Pendientes"), `decisiones/README.md` y varios `CLAUDE.md`.

## Cómo se usa

- **Agregar:** cuando se detecta algo que no se corrige en la tarea actual. Una línea con qué es, dónde está, por qué importa y de dónde sale.
- **Cerrar:** cuando se corrige, se borra de la lista. Si era de seguridad, la corrección se registra en [`../anti-patterns/SECURITY.md`](../anti-patterns/SECURITY.md).
- **Prioridad:** Alta (riesgo de datos o seguridad, o bloquea trabajo), Media (inconsistencia que confunde o puede fallar), Baja (limpieza).
- No se agrega "deuda" que en realidad es una decisión de negocio pendiente: esas van en `docs/backlog/BACKLOG.md`.
