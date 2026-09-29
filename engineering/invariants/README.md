# Invariantes

Una invariante es una regla que **siempre** debe ser verdad. Mandan sobre la implementación: un cambio que funciona pero rompe una invariante es incorrecto.

| Archivo | Qué cubre | Estado general |
| --- | --- | --- |
| [`SYSTEM_INVARIANTS.md`](SYSTEM_INVARIANTS.md) | Acceso a datos, transacciones, listados, bitácora | Aplicadas |
| [`SECURITY_INVARIANTS.md`](SECURITY_INVARIANTS.md) | Identidad, permisos, sesiones, secretos | Aplicadas |
| [`DATA_INVARIANTS.md`](DATA_INVARIANTS.md) | Esquema: autoría, eliminación, unicidad, ids estables | Aplicadas en lo existente |
| [`DOMAIN_INVARIANTS.md`](DOMAIN_INVARIANTS.md) | Contratos, conceptos, facturas, saldos, maestros | **Propuestas**: el dominio no está implementado |

## Formato

Cada invariante tiene un ID estable, el enunciado, su estado, **el mecanismo que la hace cumplir** y la fuente.

- **APLICADA**: hay un mecanismo en el código o en la BD, idealmente con un test.
- **CONVENCIÓN**: se cumple hoy, pero nada lo impide salvo la revisión. Candidata a tener mecanismo.
- **PROPUESTA**: definida en un ADR, sin implementar.

Una invariante sin mecanismo es una intención. Al implementar una propuesta, se cambia su estado y se anota el mecanismo real.

## Al cambiar código

1. Identificar qué invariantes toca el cambio.
2. Verificar que siguen siendo verdad, con un test cuando se puede.
3. Si una invariante tiene que cambiar, es una decisión de arquitectura: ADR o DEC, con aprobación.
