import { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm, useWatch } from 'react-hook-form';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { IconChevronLeft, IconPlus } from '@tabler/icons-react';

import SubCard from 'ui-component/cards/SubCard';
import ConfirmDialog from 'ui-component/extended/ConfirmDialog';
import DateField from 'ui-component/extended/DateField';
import EditableList from 'ui-component/extended/EditableList';
import MoneyField from 'ui-component/extended/MoneyField';
import SearchSelect from 'ui-component/extended/SearchSelect';
import SelectSocket from 'ui-component/extended/SelectSocket';
import ManagerDialog from './components/ManagerDialog';
import ManagersTable from './components/ManagersTable';
import { useAuth } from 'contexts/AuthContext';
import { getConstructionCompaniesSelectAPI } from 'api/requests/constructionCompaniesApi';
import { getContractTypesSelectAPI } from 'api/requests/contractTypesApi';
import { getSupervisionTypesSelectAPI } from 'api/requests/supervisionTypesApi';
import { getWorkManagersSelectAPI, worksApi } from 'api/requests/worksApi';
import { showError, showSuccess } from 'services/ToastService';
import { newIdempotencyKey } from 'utils/idempotency';
import { STATUS_OPTIONS, TERM_UNIT_OPTIONS } from 'utils/constants';

/**
 * Alta y edición de una obra a página completa (DEC-030): cabecera,
 * responsables y etapas, editados en memoria y enviados juntos en una sola
 * petición. El servidor guarda las colecciones por diferencial.
 *
 * - Importes como texto con punto decimal (MoneyField, DEC-028). El cliente no
 *   compara ni calcula: ampliado ≥ inicial, valor vigente y fecha final los
 *   decide el servidor (FRONTEND_STANDARD, regla 9). Si cambian la fecha de
 *   inicio o el plazo, la fecha final dice "Se calcula al guardar".
 * - Plazo ampliado y área no se muestran (DEC-030): se conservan tal como
 *   vienen del servidor y se reenvían sin cambios.
 * - Crear lleva clave de idempotencia (FRONTEND_STANDARD, regla 7).
 * - Los permisos de responsables y etapas solo ocultan o deshabilitan: el
 *   servidor los exige según lo que cambia.
 */

const MONEY = /^\d{1,16}(\.\d{0,2})?$/;

const EMPTY_FORM = {
  code: '',
  name: '',
  cncId: '',
  cttId: '',
  sptId: '',
  initialValue: '',
  extendedValue: '',
  maxServiceOrderValue: '',
  directCost: '',
  startDate: '',
  initialTerm: '',
  termUnit: 'MES',
  extendedTerm: '',
  area: '',
  managers: [],
  stages: []
};

let rowSeq = 0;
const rowKey = (prefix) => `${prefix}-new-${(rowSeq += 1)}`;
const text = (value) => String(value ?? '').trim();

const toForm = (work) => ({
  ...Object.fromEntries(Object.keys(EMPTY_FORM).map((field) => [field, work[field] ?? EMPTY_FORM[field]])),
  initialTerm: work.initialTerm === null || work.initialTerm === undefined ? '' : String(work.initialTerm),
  extendedTerm: work.extendedTerm === null || work.extendedTerm === undefined ? '' : String(work.extendedTerm),
  managers: work.managers.map((m) => ({
    key: `m-${m.wkmId}`,
    useId: m.useId,
    name: m.name,
    userStaId: m.userStaId,
    role: m.role,
    staId: m.staId
  })),
  stages: [...work.stages]
    .sort((a, b) => a.order - b.order)
    .map((s) => ({ key: `s-${s.wksId}`, wksId: s.wksId, name: s.name, order: s.order, staId: s.staId }))
});

const toPayload = (wrkId, form) => ({
  wrkId,
  code: text(form.code),
  name: text(form.name),
  cncId: form.cncId,
  cttId: form.cttId,
  sptId: form.sptId,
  initialValue: text(form.initialValue),
  extendedValue: text(form.extendedValue),
  maxServiceOrderValue: text(form.maxServiceOrderValue),
  directCost: text(form.directCost),
  startDate: form.startDate,
  initialTerm: text(form.initialTerm),
  termUnit: form.termUnit,
  extendedTerm: text(form.extendedTerm),
  area: text(form.area),
  managers: form.managers.map(({ useId, role, staId }) => ({ useId, role, staId })),
  stages: form.stages.map(({ wksId, name, order, staId }) => ({
    ...(wksId ? { wksId } : {}),
    name: text(name),
    order: Number(order),
    staId
  }))
});

const validateManagers = (rows) => rows.some((row) => row.staId === 1) || 'Agrega al menos un responsable activo.';

const validateStages = (rows) => {
  if (rows.some((row) => !text(row.name))) return 'Cada etapa necesita nombre.';
  const names = rows.map((row) => text(row.name).toLocaleLowerCase('es'));
  return new Set(names).size === names.length || 'Hay etapas con el mismo nombre.';
};

const moneyRules = (label, required = false) => ({
  ...(required ? { required: `El ${label} es requerido.` } : {}),
  pattern: { value: MONEY, message: 'Importe no válido.' }
});

function Section({ title, subtitle, action, children }) {
  return (
    <SubCard
      title={
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1.5, alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h5" component="h2">
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          {action}
        </Stack>
      }
    >
      {children}
    </SubCard>
  );
}

Section.propTypes = { title: PropTypes.string.isRequired, subtitle: PropTypes.string, action: PropTypes.node, children: PropTypes.node };

export default function WorkFormPage() {
  const { wrkId: wrkIdParam } = useParams();
  const wrkId = Number(wrkIdParam) || 0;
  const isEdit = wrkId > 0;
  const navigate = useNavigate();

  const { permissionsCatalog, hasPermission } = useAuth();
  const canDo = (perId) => perId != null && hasPermission(perId);
  const perms = permissionsCatalog.work?.works;
  const canAssign = canDo(perms?.assignManager);
  const canRemoveManager = canDo(perms?.removeManager);
  const canManageStages = canDo(perms?.manageStages);

  const [idempotencyKey] = useState(() => (isEdit ? null : newIdempotencyKey()));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(null);
  const [userOptions, setUserOptions] = useState([]);
  const [managerDialog, setManagerDialog] = useState(null);
  const [confirmLeave, setConfirmLeave] = useState(false);

  const { control, handleSubmit, reset, setValue, getValues, formState } = useForm({ defaultValues: EMPTY_FORM });
  const { errors, isDirty, isSubmitted } = formState;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [{ data: candidates }, work] = await Promise.all([
          getWorkManagersSelectAPI(),
          isEdit ? worksApi.getById({ wrkId }).then((res) => res.data) : Promise.resolve(null)
        ]);
        // Candidatos activos, más los responsables actuales aunque su usuario esté inactivo.
        const current = (work?.managers ?? [])
          .filter((m) => !candidates.some((c) => c.value === m.useId))
          .map((m) => ({ value: m.useId, label: `${m.name ?? `Usuario ${m.useId}`} (usuario inactivo)` }));
        setUserOptions([...candidates, ...current]);
        setLoaded(work);
        reset(work ? toForm(work) : EMPTY_FORM);
      } catch (err) {
        showError(err.response?.data?.message || 'Error al cargar la obra');
        navigate('/work/works', { replace: true });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [isEdit, wrkId, reset, navigate]);

  // Estables (useCallback): SelectSocket recarga las opciones cuando cambian.
  // El valor actual se incluye aunque el maestro esté inactivo.
  const fetchCompanies = useCallback(() => getConstructionCompaniesSelectAPI(loaded?.cncId), [loaded?.cncId]);
  const fetchContractTypes = useCallback(() => getContractTypesSelectAPI(loaded?.cttId), [loaded?.cttId]);
  const fetchSupervisionTypes = useCallback(() => getSupervisionTypesSelectAPI(loaded?.sptId), [loaded?.sptId]);

  const managers = useWatch({ control, name: 'managers' });
  const [startDate, initialTerm, termUnit] = useWatch({ control, name: ['startDate', 'initialTerm', 'termUnit'] });

  // Fecha final: la del servidor mientras el plazo no cambie (FRONTEND_STANDARD, regla 9).
  const termChanged =
    !loaded || startDate !== loaded.startDate || String(initialTerm) !== String(loaded.initialTerm) || termUnit !== loaded.termUnit;
  const endDate = termChanged ? '' : loaded.endDate;

  const dialogUserOptions = useMemo(() => {
    const taken = new Set(managers.filter((m) => m.key !== managerDialog?.manager?.key).map((m) => m.useId));
    return userOptions.filter((o) => !taken.has(o.value));
  }, [userOptions, managers, managerDialog]);

  const saveManager = (row) => {
    const list = getValues('managers');
    const next = row.key ? list.map((m) => (m.key === row.key ? row : m)) : [...list, { ...row, key: rowKey('m') }];
    setValue('managers', next, { shouldDirty: true, shouldValidate: isSubmitted });
    setManagerDialog(null);
  };

  const removeManager = (row) =>
    setValue(
      'managers',
      getValues('managers').filter((m) => m.key !== row.key),
      { shouldDirty: true, shouldValidate: isSubmitted }
    );

  const addStage = () => {
    const list = getValues('stages');
    setValue('stages', [...list, { key: rowKey('s'), name: '', order: list.length + 1, staId: 1 }], { shouldDirty: true });
  };

  const leave = () => navigate(isEdit ? `/work/works/${wrkId}` : '/work/works');

  const onSubmit = async (form) => {
    setSaving(true);
    try {
      const { data } = await worksApi.save(toPayload(wrkId, form), isEdit ? undefined : idempotencyKey);
      showSuccess(data.message || 'Guardado correctamente.');
      navigate(`/work/works/${data.wrkId ?? wrkId}`);
    } catch (err) {
      showError(err.response?.data?.message || 'Error al guardar la obra');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" sx={{ py: 8 }} role="status" aria-label="Cargando">
        <CircularProgress />
      </Box>
    );
  }

  const title = isEdit ? `Editar ${loaded?.code ?? 'obra'}` : 'Nueva obra';
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Link
          component={RouterLink}
          to={isEdit ? `/work/works/${wrkId}` : '/work/works'}
          underline="hover"
          sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, alignSelf: 'flex-start' }}
        >
          <IconChevronLeft size={16} aria-hidden="true" />
          {isEdit ? loaded?.code : 'Obras'}
        </Link>
        <Typography variant="h3" component="h1">
          {title}
        </Typography>

        {hasErrors && (
          <Alert severity="error" role="alert">
            Revisa los campos marcados antes de guardar.
          </Alert>
        )}

        <Section title="Datos generales">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 4, md: 3 }}>
              <Controller
                name="code"
                control={control}
                rules={{ required: 'El código es requerido.' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Código"
                    required
                    size="small"
                    fullWidth
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                    slotProps={{ htmlInput: { maxLength: 30, autoComplete: 'off' } }}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 8, md: 9 }}>
              <Controller
                name="name"
                control={control}
                rules={{ required: 'El nombre es requerido.' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Nombre"
                    required
                    size="small"
                    fullWidth
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                    slotProps={{ htmlInput: { maxLength: 200, autoComplete: 'off' } }}
                  />
                )}
              />
            </Grid>
            {[
              ['cncId', 'Constructora', fetchCompanies, 'refresh-construction-companies'],
              ['cttId', 'Tipo de contrato', fetchContractTypes, 'refresh-contract-types'],
              ['sptId', 'Tipo de interventoría', fetchSupervisionTypes, 'refresh-supervision-types']
            ].map(([name, label, fetchApi, socketEvent]) => (
              <Grid key={name} size={{ xs: 12, md: 4 }}>
                <Controller
                  name={name}
                  control={control}
                  rules={{ required: `Selecciona ${label.toLowerCase()}.` }}
                  render={({ field, fieldState }) => (
                    <SelectSocket
                      value={field.value}
                      onChange={field.onChange}
                      label={label}
                      required
                      error={fieldState.error}
                      fetchApi={fetchApi}
                      socketEvent={socketEvent}
                    />
                  )}
                />
              </Grid>
            ))}
          </Grid>
        </Section>

        <Section title="Valores y plazos">
          <Grid container spacing={2}>
            {[
              ['initialValue', 'Valor inicial', true, ''],
              ['extendedValue', 'Valor ampliado', false, 'Vacío si no hay ampliación'],
              ['maxServiceOrderValue', 'Valor máx. orden de servicio', false, 'No mayor que el valor vigente'],
              ['directCost', 'Costo directo', false, '']
            ].map(([name, label, required, help]) => (
              <Grid key={name} size={{ xs: 12, sm: 6, md: 3 }}>
                <Controller
                  name={name}
                  control={control}
                  rules={moneyRules(label.toLowerCase(), required)}
                  render={({ field, fieldState }) => (
                    <MoneyField
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      label={label}
                      required={required}
                      error={fieldState.error?.message}
                      helperText={help}
                    />
                  )}
                />
              </Grid>
            ))}

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Controller
                name="startDate"
                control={control}
                rules={{ required: 'La fecha de inicio es requerida.' }}
                render={({ field, fieldState }) => (
                  <DateField
                    value={field.value}
                    onChange={field.onChange}
                    label="Fecha de inicio"
                    required
                    error={fieldState.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Stack direction="row">
                <Controller
                  name="initialTerm"
                  control={control}
                  rules={{ required: 'El plazo inicial es requerido.', pattern: { value: /^\d+$/, message: 'Solo números enteros.' } }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      onChange={(e) => field.onChange(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      label="Plazo inicial"
                      required
                      size="small"
                      fullWidth
                      error={Boolean(fieldState.error)}
                      helperText={fieldState.error?.message}
                      sx={{ '& .MuiOutlinedInput-root': { borderTopRightRadius: 0, borderBottomRightRadius: 0 } }}
                      slotProps={{
                        htmlInput: {
                          inputMode: 'numeric',
                          autoComplete: 'off',
                          style: { textAlign: 'right', fontVariantNumeric: 'tabular-nums' }
                        }
                      }}
                    />
                  )}
                />
                <Box sx={{ width: 150, flexShrink: 0, '& .MuiOutlinedInput-root': { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } }}>
                  <Controller
                    name="termUnit"
                    control={control}
                    render={({ field }) => (
                      <SearchSelect
                        value={field.value}
                        onChange={(value) => field.onChange(value || 'MES')}
                        options={TERM_UNIT_OPTIONS}
                        label="Unidad del plazo"
                        hideLabel
                        disableClearable
                      />
                    )}
                  />
                </Box>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <DateField
                value={endDate}
                label="Fecha final"
                readOnly
                helperText={termChanged ? 'Se calcula al guardar: fecha de inicio + plazo inicial' : 'Fecha de inicio + plazo inicial'}
              />
            </Grid>
          </Grid>
        </Section>

        <Section
          title="Responsables"
          subtitle="Usuarios del sistema. Si falta alguien, se crea antes en Usuarios."
          action={
            canAssign && (
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<IconPlus size={16} />}
                onClick={() => setManagerDialog({ manager: null })}
              >
                Agregar responsable
              </Button>
            )
          }
        >
          <Controller
            name="managers"
            control={control}
            rules={{ validate: validateManagers }}
            render={({ field, fieldState }) => (
              <>
                <ManagersTable
                  rows={field.value}
                  canEdit={canAssign}
                  canRemove={canRemoveManager}
                  onEdit={(row) => setManagerDialog({ manager: row })}
                  onRemove={removeManager}
                />
                {fieldState.error && <FormHelperText error>{fieldState.error.message}</FormHelperText>}
              </>
            )}
          />
        </Section>

        <Section
          title="Etapas"
          subtitle="El orden es la posición en la lista. Una etapa con contratos no se puede quitar."
          action={
            canManageStages && (
              <Button variant="outlined" color="inherit" startIcon={<IconPlus size={16} />} onClick={addStage}>
                Agregar etapa
              </Button>
            )
          }
        >
          <Controller
            name="stages"
            control={control}
            rules={{ validate: validateStages }}
            render={({ field, fieldState }) => (
              <EditableList
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error}
                columns={[
                  { name: 'name', label: 'Nombre', type: 'text', maxLength: 100, grid: { xs: 12, sm: 'grow' } },
                  { name: 'staId', label: 'Estado', type: 'select', options: STATUS_OPTIONS, grid: { xs: 12, sm: 3 } }
                ]}
                newRow={() => ({ key: rowKey('s'), name: '', order: 0, staId: 1 })}
                orderField="order"
                disabled={!canManageStages}
                canAdd={false}
                emptyText="Sin etapas."
                rowLabel="Etapa"
              />
            )}
          />
        </Section>

        <Paper
          elevation={0}
          sx={{
            position: 'sticky',
            bottom: 0,
            zIndex: 2,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            px: 2,
            py: 1.5,
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 1,
            boxShadow: '0 -4px 16px rgb(18 25 38 / 8%)'
          }}
        >
          <Button onClick={() => (isDirty ? setConfirmLeave(true) : leave())} disabled={saving}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="secondary" disabled={saving}>
            {saving ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Guardar'}
          </Button>
        </Paper>
      </Stack>

      <ManagerDialog
        open={Boolean(managerDialog)}
        manager={managerDialog?.manager}
        userOptions={dialogUserOptions}
        onClose={() => setManagerDialog(null)}
        onSave={saveManager}
      />

      <ConfirmDialog
        open={confirmLeave}
        onClose={() => setConfirmLeave(false)}
        onConfirm={leave}
        title="Descartar cambios"
        message="Hay cambios sin guardar en la obra. ¿Salir sin guardarlos?"
        confirmLabel="Descartar"
        confirmColor="warning"
      />
    </Box>
  );
}
