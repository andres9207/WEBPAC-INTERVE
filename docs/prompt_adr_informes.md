# Generación de ADR — Arquitectura de Reportes, Control y Seguimiento

## 1. Rol

Actúa como:

- Arquitecto de Software Senior.
- Arquitecto de soluciones.
- Especialista en sistemas administrativos y financieros.
- Especialista en contratos de construcción.
- Especialista en reporting y explotación de información.
- Especialista en Architecture Decision Records (ADR).
- Especialista en integridad de datos, trazabilidad, auditoría y seguridad.

Debes analizar el código fuente actual del sistema y generar una arquitectura documental mediante ADR para los REPORTES relacionados con:

- Contratos.
- Información del valor contractual.
- Otrosí.
- Pólizas.
- Anticipos.
- Retenciones.
- Liquidaciones.
- Facturación.
- Facturas simples.
- Contratos mayores.
- Subcontratistas.
- Actas.
- Ejecución contractual.

El objetivo NO es implementar cambios.

El objetivo es:

> Analizar la implementación actual, documentar las decisiones arquitectónicas existentes, identificar brechas, establecer decisiones recomendadas y proponer nuevos informes de relevancia para el CORE del sistema.

---

# 2. Regla principal

NO asumir que los reportes descritos en este documento están implementados exactamente de esta manera.

Primero analizar:

Frontend
    ↓
Backend / API
    ↓
Servicios
    ↓
Consultas SQL
    ↓
Base de datos
    ↓
Reglas de negocio
    ↓
Permisos
    ↓
Auditoría
    ↓
Exportaciones

Determinar qué existe realmente.

No inventar:

- tablas.
- campos.
- relaciones.
- fórmulas.
- estados.
- permisos.
- reglas de negocio.

Cuando algo no exista actualmente:

> documentarlo como "No implementado".

Cuando exista parcialmente:

> documentarlo como "Implementación parcial".

Cuando exista una diferencia:

> documentar "Brecha".

---

# 3. No modificar código

Durante esta tarea:

- NO modificar frontend.
- NO modificar backend.
- NO modificar base de datos.
- NO crear migraciones.
- NO alterar consultas.
- NO implementar reportes.
- NO ejecutar refactorizaciones.

Únicamente:

> ANALIZAR + DOCUMENTAR + IDENTIFICAR BRECHAS + PROPONER.

---

# 4. Relación con ADR anteriores

Estos reportes dependen directamente de las decisiones arquitectónicas de:

- Contratos.
- Información del valor del contrato.
- Otrosí.
- Otrosí de liquidación.
- Estados de contrato.
- Pólizas.
- Facturación.
- Anticipos.
- Amortización.
- Retenciones.
- Liquidaciones.
- Auditoría.
- Permisos.

Por lo tanto, analizar las relaciones con los ADR existentes.

Si los ADR anteriores no existen, documentar la dependencia conceptual.

---

# 5. Arquitectura general de reportes

Crear un ADR transversal:

0001-arquitectura-reportes.md

Debe analizar:

```text
                  CONTRATOS
                      │
                      ▼
            INFORMACIÓN CONTRACTUAL
                      │
          ┌───────────┼───────────┐
          ▼           ▼           ▼
       PÓLIZAS     ANTICIPOS    RETENIDOS
          │           │           │
          └───────────┼───────────┘
                      ▼
                 FACTURACIÓN
                      │
          ┌───────────┼───────────┐
          ▼           ▼           ▼
       SIMPLE      MAYOR     SUBCONTRATISTA
                      │
                      ▼
                 LIQUIDACIÓN
                      │
                      ▼
                  REPORTES



    Proceder con lo indicado en @docs/prompt_adr_informes.md   y basado en @database/bdintervewebpack.sql   resultado en @docs/ y basado en  los adr de facturacion y contratos