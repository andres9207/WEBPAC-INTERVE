import { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';

import { getDashboardDetailAPI } from 'api/requests/dashboardApi';
import { useWorkScope } from 'contexts/WorkScopeContext';
import { showError } from 'services/ToastService';
import { fDateOnly } from 'utils/formatTime';
import { ALL_WORKS } from 'utils/workScope';

import { DrillDownDialog, invoiceRows } from '../work/DrillDownDialog';
import { dashboardTo } from '../work/workDashboard.utils';

// Detalle de una cifra del tablero general (DEC-052): a diferencia del de la
// obra, las filas no llegan con el resumen (con "Ver todo" pueden ser todas
// las del sistema), sino al abrir el panel, por páginas, con el mismo
// predicado de la cifra en el servidor. Arriba, los filtros: texto y, con
// "Ver todo", la obra (como en los listados, DEC-048). Cada fila abre su
// expediente encima del tablero (dashboardTo).

const PAGE_ROWS = 10;
const SEARCH_DELAY = 400;

const ROWS_BY_KIND = {
  works: (items) =>
    items.map((w) => ({
      key: `wrk-${w.wrkId}`,
      to: dashboardTo.work(w.wrkId),
      primary: `${w.code} · ${w.name}`,
      secondary: `Inicio el ${fDateOnly(w.startDate)}`,
      value: ''
    })),
  providers: (items) =>
    items.map((p) => ({
      key: `prv-${p.prvId}`,
      to: dashboardTo.provider(p.prvId),
      primary: p.name,
      secondary: p.identification,
      value: ''
    })),
  contracts: (items) =>
    items.map((c) => ({
      key: `ctr-${c.ctrId}`,
      to: dashboardTo.contract(c.ctrId),
      primary: `${c.number} · ${c.name}`,
      secondary: [c.workCode, c.providerName, c.stateName].filter(Boolean).join(' · '),
      value: `Fin ${fDateOnly(c.endDate)}`
    })),
  policies: (items) =>
    items.map((p) => ({
      key: `pol-${p.polId}`,
      to: dashboardTo.contract(p.ctrId),
      primary: `${p.number} · ${p.typeName ?? ''}`,
      secondary: [`Contrato ${p.contractNumber}`, p.workCode, p.endDate ? `vence el ${fDateOnly(p.endDate)}` : 'sin fecha de vigencia']
        .filter(Boolean)
        .join(' · '),
      value: p.validityName
    })),
  invoices: (items) => invoiceRows(items, { withWork: true })
};

// Qué busca el texto en cada métrica (lo fija el servidor; aquí solo se dice).
const SEARCH_HINTS = {
  WORKS_ACTIVE: 'Código o nombre',
  PROVIDERS_ACTIVE: 'Nombre o identificación',
  CURRENT_POLICIES: 'Número, tipo o contrato',
  INVOICES_PENDING: 'Número, proveedor o contrato',
  INVOICES_BY_WORK: 'Número, proveedor o contrato'
};
const CONTRACTS_HINT = 'Número, nombre, proveedor u obra';
// La obra no filtra la lista de obras ni las facturas de una barra, que ya son de una obra.
const WITHOUT_WORK_FILTER = ['WORKS_ACTIVE', 'INVOICES_BY_WORK'];

const EMPTY_FILTERS = { page: 0, search: '', wrkId: null };

/** Texto de búsqueda que avisa `onChange` cuando se deja de escribir. */
function SearchField({ value, onChange, placeholder }) {
  const [text, setText] = useState(value);
  useEffect(() => setText(value), [value]);
  useEffect(() => {
    const timer = setTimeout(() => onChange(text), SEARCH_DELAY);
    return () => clearTimeout(timer);
  }, [text, onChange]);
  return (
    <TextField
      size="small"
      fullWidth
      label="Buscar"
      placeholder={placeholder}
      value={text}
      onChange={(e) => setText(e.target.value)}
      slotProps={{ htmlInput: { maxLength: 100 } }}
    />
  );
}

SearchField.propTypes = { value: PropTypes.string.isRequired, onChange: PropTypes.func.isRequired, placeholder: PropTypes.string };

/**
 * `openMetric({ title, noun, params, emptyText })` abre el panel de una cifra
 * en la primera página y sin filtros; `dialog` es el elemento que se dibuja
 * una vez en el tablero.
 */
export default function useSummaryDrill() {
  const { activeWork, works } = useWorkScope();
  const [request, setRequest] = useState(null);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const openMetric = useCallback((next) => {
    setFilters(EMPTY_FILTERS);
    setResult(null);
    setRequest(next);
  }, []);
  const close = useCallback(() => setRequest(null), []);

  // Cada cambio de cifra, página o filtro pide una página; una respuesta que
  // llega después de otro cambio (o de cerrar) se descarta.
  useEffect(() => {
    if (!request) return undefined;
    let active = true;
    setLoading(true);
    getDashboardDetailAPI({
      ...request.params,
      page: filters.page + 1,
      limit: PAGE_ROWS,
      ...(filters.search.trim() ? { search: filters.search.trim() } : {}),
      ...(filters.wrkId ? { wrkId: filters.wrkId } : {})
    })
      .then(({ data }) => {
        if (!active) return;
        setResult({ rows: ROWS_BY_KIND[data.kind](data.results), count: data.total, subtitle: data.subtitle ?? undefined });
      })
      .catch((err) => {
        if (!active) return;
        showError(err.response?.data?.message || 'No se pudo cargar el detalle');
        if (!result) setRequest(null);
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
    // `result` solo decide si cerrar ante un error de la primera carga.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request, filters]);

  const metric = request?.params.metric;
  const filtered = Boolean(filters.search.trim() || filters.wrkId);
  const showWorks = activeWork === ALL_WORKS && !WITHOUT_WORK_FILTER.includes(metric);
  const setSearch = useCallback((search) => setFilters((f) => (f.search === search ? f : { ...f, search, page: 0 })), []);

  const dialog = useMemo(() => {
    const drill = request && {
      title: request.title,
      noun: request.noun,
      subtitle: result?.subtitle,
      count: result?.count ?? 0,
      rows: result?.rows ?? [],
      loading,
      emptyText: filtered ? 'Ningún registro coincide con los filtros.' : request.emptyText
    };
    const toolbar = request && (
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
        <SearchField value={filters.search} onChange={setSearch} placeholder={SEARCH_HINTS[metric] ?? CONTRACTS_HINT} />
        {showWorks && (
          <Autocomplete
            size="small"
            fullWidth
            options={works}
            value={works.find((w) => w.value === filters.wrkId) ?? null}
            onChange={(_e, option) => setFilters((f) => ({ ...f, wrkId: option?.value ?? null, page: 0 }))}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            renderInput={(params) => <TextField {...params} label="Obra" />}
            noOptionsText="Sin obras"
          />
        )}
      </Stack>
    );
    const footer = (result?.count ?? 0) > PAGE_ROWS && (
      <TablePagination
        component="div"
        count={result.count}
        page={filters.page}
        onPageChange={(_e, page) => setFilters((f) => ({ ...f, page }))}
        rowsPerPage={PAGE_ROWS}
        rowsPerPageOptions={[PAGE_ROWS]}
        labelDisplayedRows={({ from, to, count }) => `${from}–${to} de ${count}`}
      />
    );
    return <DrillDownDialog drill={drill} onClose={close} toolbar={toolbar} footer={footer} />;
  }, [request, result, loading, filters, filtered, metric, showWorks, works, setSearch, close]);

  return { openMetric, dialog };
}
