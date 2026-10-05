# Sistema de diseño

Cómo se ve y se comporta la interfaz. Vale para toda pantalla nueva. El *cómo se programa* (anatomía de página y diálogo, permisos, errores) está en [`FRONTEND_STANDARD`](FRONTEND_STANDARD.md); este documento no lo repite.

**Base:** template Berry v5 sobre MUI 7. No se cambia la marca de Berry; se usa con criterio. Documentación de Berry: <https://codedthemes.gitbook.io/berry> (configuración, paleta, `MainCard`, `SubCard`).

**Carácter del producto:** herramienta interna de registro y control de contratos, usada a diario por personal administrativo y contable. Prioridades, en orden: **exactitud** (los importes y estados se leen sin ambigüedad), **densidad legible** (mucha información por pantalla sin apretarla), **accesibilidad** (WCAG 2.1 AA) y **consistencia** (una misma cosa se ve igual en todas partes). No es un sitio de marketing: sin animaciones decorativas, sin degradados, sin ilustraciones.

## Tokens

Todos salen del tema (`client/src/themes/`, `client/src/config.js`). **Nunca un hex en un componente**: se usa la clave de la paleta (`'secondary.dark'`, `'divider'`, `'grey.100'`).

### Color

| Rol | Clave del tema | Valor | Uso |
| --- | --- | --- | --- |
| Primario | `primary.main` / `.light` / `.800` | `#2196f3` / `#e3f2fd` / `#1565c0` | Enlaces, foco, pestaña activa, fondos suaves de información |
| Secundario | `secondary.main` / `.light` / `.dark` | `#673ab7` / `#ede7f6` / `#5e35b1` | **Botón de guardar** de los diálogos, acción de editar |
| Éxito | `success.light` / `.dark` | `#b9f6ca` / `#00c853` | Estado activo, aprobado, cumplido |
| Advertencia | `warning.light` / `.dark` | `#fff8e1` / `#ffc107` | Fondos de aviso. **No como color de texto** (ver "Problemas conocidos") |
| Error | `error.main` / `.dark` | `#f44336` / `#c62828` | Errores, eliminar, anular. Texto de error: `error.dark` |
| Lila | `lilac.main` / `.contrastText` / `.200` / `.dark` | `#ede7f6` / `#4527a0` / `#b39ddb` / `#d1c4e9` | Contrato suspendido: chip, pestaña, botón Suspender (`color="lilac"` con borde `lilac.200`) y aviso (`<Alert severity="warning" color="lilac">`). Fondo lila claro con texto morado oscuro (8,5:1); `.dark` es el fondo al pasar el cursor |
| Naranja | `orange.light` | `#fbe9e7` | Fondo suave de acciones destructivas |
| Grises | `grey.50` … `grey.900` | `#f8fafc` … `#121926` | Fondos de sección (`grey.50`), bordes (`divider` = `grey.200`), texto secundario (`grey.500`) |
| Texto | `text.primary` / `text.secondary` | `#364152` / `#697586` | Contraste sobre blanco: 10,4:1 y 4,7:1 |

**Modo oscuro: no existe.** El tema solo define el esquema claro (`themes/index.jsx`, `colorSchemes.light`). PRO-FE-16 pide gráficos "legibles en ambos temas": **REQUIERE DECISIÓN** si se agrega antes del dashboard. Mientras tanto, usar claves de paleta (y no hex) deja la puerta abierta sin costo.

### Tipografía

Roboto (`config.js`). Escala de Berry, más compacta que la de MUI: el texto de cuerpo es **14 px**, no 16. Es correcto para una herramienta de trabajo densa; no se baja de ahí.

| Variante | Tamaño / peso | Uso |
| --- | --- | --- |
| `h2` | 24 / 700 | Cifra principal de un indicador |
| `h3` | 20 / 600 | Título de diálogo, título de página de detalle |
| `h4` | 16 / 600 | Título de sección importante |
| `h5` | 14 / 500 | Título de `SubCard` |
| `body1` / `body2` | 14 / 400 | Texto general, celdas |
| `subtitle1` | 14 / 500 | Etiqueta destacada, título de tarjeta en móvil |
| `caption` | 12 / 400 | Etiquetas de dato (`Valor inicial:`), fechas de autoría. Mínimo permitido |

**Cifras:** importes y cantidades alineados a la derecha en tablas, con `fontVariantNumeric: 'tabular-nums'` para que los dígitos se alineen en columna.

### Espaciado, forma y elevación

- Unidad de MUI: **8 px** (`spacing(1)`). Entre campos de formulario: 16 px (`spacing={2}`). Entre secciones: 16 px (`Stack spacing={2}`). Separación entre tarjetas de página: `gridSpacing` (`store/constant`).
- Radio de borde: **8 px** (`config.borderRadius`) en tarjetas y campos. Botones de acción por fila: 12 px (`borderRadius: 1.5`).
- Elevación: plana. Las tarjetas se separan con borde (`divider`), no con sombra. `SubCard` agrega una sombra leve solo al pasar el mouse.
- Densidad: tablas con `size="small"`. Áreas táctiles de al menos **44 × 44 px** en teléfono (botones de las tarjetas de `DataTable`).

### Formatos (es-CO)

| Dato | Formato | Función |
| --- | --- | --- |
| Importe | `$ 1.234.567,50` (punto de miles, coma decimal, siempre dos decimales) | `fMoneyText` (sobre el texto del servidor, sin `Number`, [DEC-028](../decisiones/DEC-028-convencion-monetaria.md)) |
| Porcentaje | `12,5 %` | `fPercent` |
| Fecha | `30 sep 2026` | `fDate`; una fecha sin hora (`AAAA-MM-DD`), con `fDateOnly` |
| Fecha y hora | `30 sep 2026 16:28` (hora local del navegador; el servidor entrega UTC) | `fDateTime` |
| Plazo | `6 meses`, `180 días`: siempre con su unidad | — |

Al **capturar** un importe: `MoneyField`. Se escribe con punto de miles y coma decimal (`1.234.567,50`) y el valor del formulario es el texto que recibe el servidor (`1234567.50`). Una fecha: `DateField` (DD/MM/AAAA, calendario en español). Un plazo: número + unidad (días, meses, años), y `fTerm` para mostrarlo.

## Componentes y cuándo usar cada uno

| Necesidad | Componente | Regla |
| --- | --- | --- |
| Contenedor de página | `MainCard` | Uno por página. Búsqueda y botones en `title` |
| Grupo dentro de un formulario o detalle | `SubCard` | Título corto en sustantivo ("Valores y plazos"). Un formulario con más de ~8 campos o con colecciones se divide en `SubCard` |
| Listado | `DataTable` | Paginado y ordenado en el servidor. Se convierte en tarjetas por debajo de `md` |
| Estado de un registro | `StatusChip` | Siempre con texto, nunca solo color |
| Acción por fila | `ActionButton` / `TableActions` | Color por `tone` (`edit`, `info`, `danger`, `neutral`, `success`). Hasta 2 acciones, botones visibles; desde 3, menú ⋮ |
| Crear o editar | `BaseDialog` (+ `MasterDialog` en maestros) | Ver comportamiento abajo. Un agregado que crece (obra, contrato) usa páginas propias: ver "Página de detalle" |
| Elegir una opción de una lista | `SearchSelect` (en maestros, `SelectSocket`, que lo usa) | Siempre con buscador; filtra sin distinguir tildes ni mayúsculas |
| Fecha o importe | `DateField` / `MoneyField` | Ver "Formatos" |
| Colección dentro de un registro | Tabla + modal para agregar y editar (responsables de obra), o `EditableList` para filas cortas (etapas) | En memoria, se guardan con el padre. El botón "Agregar" va en el encabezado de la sección, a la derecha. `orderField` si el orden importa |
| Confirmar | `ConfirmDialog` | Toda acción destructiva o irreversible. El texto nombra el registro: `¿Eliminar "Obra 012"?` |
| Avisos | `ToastService` (`showSuccess`, `showError`) | Toda escritura avisa el resultado. Los errores muestran el mensaje del servidor |

### Botones

- **Un solo botón principal por vista o diálogo.** En diálogos: Cancelar (texto) a la izquierda, Guardar (contenido, `secondary`) a la derecha.
- Texto con mayúscula solo al inicio: "Guardar cambios", "Nueva obra".
- Mientras la acción corre: deshabilitado y con el gerundio ("Guardando…", "Procesando…"). Nunca un clic sin respuesta.
- Género gramatical correcto en títulos y botones: "Nueva aseguradora", "Crear la primera" (`feminine` en `MasterPage`).

### Estados de una pantalla

Toda pantalla con datos resuelve cuatro estados:

| Estado | Cómo se ve |
| --- | --- |
| Primera carga | Texto "Cargando…" o indicador centrado |
| Recarga | Los datos siguen visibles, atenuados, con barra de progreso arriba. Nada salta |
| Vacío | Mensaje que explica por qué ("No hay resultados para «x»", "Todavía no hay obras") y, si aplica, la acción para salir de ahí ("Crear la primera") |
| Error | `showError` con el mensaje del servidor; los datos anteriores no se borran |

### Diálogos de formulario

- Un clic fuera **no** cierra (perdería lo escrito). Se cierra con Cancelar, ✕ o Esc.
- Ancho: `sm` para maestros, `md` para formularios con secciones. En teléfono, los largos ocupan la pantalla completa (`fullScreenOnMobile`).
- Errores de validación junto al campo, no solo arriba. Los de una colección completa (p. ej. "Agrega al menos un responsable activo") debajo de la colección.
- Obligatorios marcados con `*` en la etiqueta.

## Accesibilidad (mínimo exigido)

- Contraste: texto **4,5:1**; íconos, bordes de controles y estados **3:1** (WCAG 1.4.3 y 1.4.11).
- Todo botón de solo ícono tiene `aria-label` (el tooltip no basta en teclado táctil).
- La información nunca se transmite solo por color: el estado lleva texto, el error lleva mensaje.
- Foco visible en todo control. No se quita el contorno de foco sin reemplazo.
- Navegable con teclado: Tab recorre en orden visual; Esc cierra diálogos y menús.

## Problemas conocidos del tema base

Heredados de Berry; registrados en [deuda](../debt/TECHNICAL_DEBT.md). Cambiarlos toca todas las pantallas: **REQUIERE DECISIÓN**.

| Problema | Contraste | Propuesta |
| --- | --- | --- |
| Chip "Inactivo" (`warning`): texto `#ffc107` sobre `#fff8e1` | ~1,5:1 | Texto `grey.700` u `orange.dark` sobre `warning.light` |
| Chip "Activo" (`success`): texto `#00c853` sobre verde claro | ~2:1 | Texto `grey.900` o un verde oscuro nuevo en la paleta |
| Chip "Eliminado" (`error`): texto `#f44336` sobre rosado claro | ~3,3:1 | Texto `error.dark` |
| Botón contenido `primary` ("Nuevo"): blanco sobre `#2196f3` | ~3,1:1 | Usar `primary.800` como fondo, o `secondary` |

La corrección va en `themes/overrides/Chip.jsx` y en la paleta, no en cada pantalla.

## Patrones de las pantallas que vienen

### Detalle y formulario en modal (aprobado, DEC-030 y DEC-034)

Referencia: `ui-component/extended/RouteDialog.jsx`, `views/work/works/WorkDetailPage.jsx` y `WorkFormPage.jsx`, y sus pares de proveedores.

- **Listado → detalle → edición**, sin salir del listado: cada uno es un modal grande (`maxWidth="lg"`, pantalla completa en móvil) con su propia ruta. El listado (`MasterPage` con `navigation`) ofrece *Ver detalle* y *Editar*; activar, desactivar y eliminar están en el detalle.
- **Detalle**: encabezado con código, nombre, estado y autoría, y una X para cerrar; pestañas por parte del agregado, con conteo; en Resumen, primero las cifras clave calculadas por el servidor. Pie: Eliminar y Desactivar a la izquierda; Cerrar y Editar (el único botón contenido) a la derecha. Una parte que todavía no existe tiene su pestaña con un estado vacío que explica cuándo llega.
- **Formulario**: título y una línea de ayuda arriba; secciones con `SubCard` y alerta de errores en el cuerpo; Cancelar y Guardar en el pie. Cerrar con la X, Escape, el fondo o Cancelar pide confirmación si hay cambios sin guardar.

### Listado con indicadores y tarjetas (aprobado, DEC-033)

Referencia: `views/work/works/WorksPage.jsx`, `components/WorksSummary.jsx` y `WorkCard.jsx`.

- **Indicadores** arriba del listado (`MasterPage`, prop `header`): hasta 4, cada uno con ícono en un tono de `ACTION_TONES`, etiqueta, cifra y una línea que explica qué cuenta. Todas las cifras las calcula el servidor; mientras cargan, "—".
- **Tarjetas** (`renderCard`): selector Tarjetas | Tabla junto a las pestañas, recordado por listado. Mismas búsqueda, pestañas, paginación y acciones que la tabla. La tarjeta de obra lleva una franja de estado arriba, el nombre como enlace al detalle, el importe principal en `h3` con `tabular-nums`, la barra de avance (color por el nivel que manda el servidor: `primary.800`, `orange.dark`, `error.dark`; gris si está inactiva) y las acciones abajo.
- Un importe en un indicador va completo (`fMoneyText`), nunca abreviado.

## Patrones que vienen

El CORE necesita patrones que todavía no existen; se diseñan antes de programarlos y se registran aquí al aprobarse.

| Patrón | Para | Estado |
| --- | --- | --- |
| **Página de expediente**: encabezado con identidad, estado y cifras clave; pestañas por parte del agregado | Contrato (PRO-FE-05) | La base está aprobada y aplicada en obras y proveedores (arriba, en modal con dirección propia); el expediente de contrato agrega estados y condiciones |
| **Estado y transiciones**: chip de estado, acciones de transición con motivo, historial en línea de tiempo, lista de condiciones (C1–C8) | Contrato (PRO-FE-08), facturas | Incluido en el prototipo del expediente |
| **Formulario con resumen financiero**: captura a la izquierda, saldos y vista previa calculada por el servidor a la derecha | Facturas (PRO-FE-12 a 14) | Pendiente; depende de DEC-02 y DEC-03 |
| **Buscar o crear**: selector con búsqueda remota que ofrece crear si no encuentra | Proveedor en obra (PRO-FE-04), responsables con más de 100 usuarios | **Primera versión en proveedores de obra, pendiente de revisión** (2026-10-01): dos botones ("Agregar proveedor existente" con búsqueda remota, "Crear proveedor nuevo"); si el documento ya existe, el alta ofrece "Asignar este proveedor". `views/work/providers/components/WorkProvidersTab.jsx` |
| **Matriz de configuración**: filas = campos, columnas = aplica / visible / obligatorio | Tipos de contrato (MAE-FE-08) | Pendiente |
| **Filtros de listado** además de la búsqueda única de [DEC-024](../decisiones/DEC-024-busqueda-listados.md) | Obras, contratos, facturas (PRO-FE-01) | **REQUIERE DECISIÓN**: DEC-024 fijó un solo campo de búsqueda |
| **Adjuntos por entidad** | PRO-FE-18 | Pendiente; `DocumentManagement` está deshabilitado |

## Antes de entregar una pantalla

- [ ] Sin hex en el componente; colores por clave de paleta.
- [ ] Importes con `fMoneyText`, alineados a la derecha, con `tabular-nums`.
- [ ] Los cuatro estados resueltos (primera carga, recarga, vacío, error).
- [ ] Botones de solo ícono con `aria-label`; estados con texto.
- [ ] Revisada a 375 px de ancho (tarjetas, diálogo a pantalla completa, sin scroll horizontal de página).
- [ ] Textos en español, mayúscula solo al inicio, género correcto.
- [ ] Toda escritura avisa el resultado; toda acción destructiva confirma.
