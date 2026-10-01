import { useState, forwardRef, useImperativeHandle, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useForm, FormProvider } from 'react-hook-form';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';

import SubCard from 'ui-component/cards/SubCard';
import BaseDialog from 'ui-component/extended/BaseDialog';
import GenericFormSection from 'ui-component/extended/GenericFormSection';
import EditableList from 'ui-component/extended/EditableList';
import { useAuth } from 'contexts/AuthContext';
import { getConstructionCompaniesSelectAPI } from 'api/requests/constructionCompaniesApi';
import { getContractTypesSelectAPI } from 'api/requests/contractTypesApi';
import { getSupervisionTypesSelectAPI } from 'api/requests/supervisionTypesApi';
import { getWorkManagersSelectAPI } from 'api/requests/worksApi';
import { showSuccess, showError } from 'services/ToastService';
import { newIdempotencyKey } from 'utils/idempotency';
import { STATUS_OPTIONS } from 'utils/constants';

/**
 * Formulario de obra (ADR-0011): cabecera, responsables y etapas, editados en
 * memoria y enviados juntos en una sola petición. El servidor guarda las
 * colecciones por diferencial, en una transacción.
 *
 * - Responsables: solo usuarios existentes (DEC-029).
 * - Importes como texto con punto decimal; el servidor redondea a dos
 *   decimales (DEC-028). El cliente no compara ni calcula importes: las
 *   reglas de ampliado y valor vigente las valida el servidor.
 * - Crear: clave de idempotencia nueva al abrir (FRONTEND_STANDARD, regla 7).
 * - Los permisos de responsables y etapas solo deshabilitan: el servidor los
 *   exige según lo que cambia.
 * - Secciones con SubCard (Berry): datos generales, valores y plazos,
 *   responsables y etapas. En teléfono ocupa toda la pantalla.
 * - El orden de las etapas es su posición en la lista (flechas); se envía
 *   renumerado 1, 2, 3…
 */

const MONEY = { value: /^\d{1,16}(\.\d+)?$/, message: 'Solo números, con punto decimal' };
const INTEGER = { value: /^\d+$/, message: 'Solo números enteros' };

const ROLE_OPTIONS = [
  { value: 'MAIN', label: 'Principal' },
  { value: 'SUPPORT', label: 'Apoyo' }
];

const EMPTY_FORM = {
  code: '',
  name: '',
  cncId: '',
  cttId: '',
  sptId: '',
  initialValue: '',
  extendedValue: '',
  initialTerm: '',
  extendedTerm: '',
  directCost: '',
  maxServiceOrderValue: '',
  area: '',
  managers: [],
  stages: []
};

const SECTIONS = [
  { key: 'general', title: 'Datos generales' },
  { key: 'values', title: 'Valores y plazos' },
  { key: 'managers', title: 'Responsables' },
  { key: 'stages', title: 'Etapas' }
];

let rowSeq = 0;
const rowKey = (prefix) => `${prefix}-new-${(rowSeq += 1)}`;

const toForm = (work) => ({
  ...Object.fromEntries(Object.keys(EMPTY_FORM).map((field) => [field, work[field] ?? ''])),
  managers: work.managers.map((m) => ({ key: `m-${m.wkmId}`, useId: m.useId, role: m.role, staId: m.staId })),
  stages: [...work.stages]
    .sort((a, b) => a.order - b.order)
    .map((s) => ({ key: `s-${s.wksId}`, wksId: s.wksId, name: s.name, order: s.order, staId: s.staId }))
});

const text = (value) => String(value ?? '').trim();

const toPayload = (wrkId, form) => ({
  wrkId,
  code: text(form.code),
  name: text(form.name),
  cncId: form.cncId,
  cttId: form.cttId,
  sptId: form.sptId,
  initialValue: text(form.initialValue),
  extendedValue: text(form.extendedValue),
  initialTerm: text(form.initialTerm),
  extendedTerm: text(form.extendedTerm),
  directCost: text(form.directCost),
  maxServiceOrderValue: text(form.maxServiceOrderValue),
  area: text(form.area),
  managers: form.managers.map(({ useId, role, staId }) => ({ useId, role, staId })),
  stages: form.stages.map(({ wksId, name, order, staId }) => ({
    ...(wksId ? { wksId } : {}),
    name: text(name),
    order: Number(order),
    staId
  }))
});

const validateManagers = (rows) => {
  if (rows.some((row) => !row.useId || !row.role)) return 'Cada responsable necesita usuario y rol';
  return rows.some((row) => row.staId === 1) || 'Agrega al menos un responsable activo';
};

const validateStages = (rows) => {
  if (rows.some((row) => !text(row.name))) return 'Cada etapa necesita nombre';
  if (rows.some((row) => !(Number(row.order) > 0))) return 'El orden de cada etapa debe ser un entero positivo';
  const names = rows.map((row) => text(row.name).toLocaleLowerCase('es'));
  return new Set(names).size === names.length || 'Hay etapas con el mismo nombre';
};

const WorkDialog = forwardRef(({ title, idField, api, onSaved, feminine = true }, ref) => {
  const { permissionsCatalog, hasPermission } = useAuth();
  const canDo = (perId) => perId != null && hasPermission(perId);
  const perms = permissionsCatalog.work?.works;
  const canAssign = canDo(perms?.assignManager);
  const canRemoveManager = canDo(perms?.removeManager);
  const canManageStages = canDo(perms?.manageStages);

  const [visible, setVisible] = useState(false);
  const [wrkId, setWrkId] = useState(0);
  const [idempotencyKey, setIdempotencyKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  // Valores que ya tenía la obra: los selectores los incluyen aunque estén inactivos.
  const [original, setOriginal] = useState({});
  // Candidatos (usuarios activos) más los responsables actuales, aunque estén inactivos.
  const [userOptions, setUserOptions] = useState([]);

  const methods = useForm({ defaultValues: EMPTY_FORM });
  const { handleSubmit, reset } = methods;
  const isEdit = wrkId > 0;

  const loadUserOptions = async (currentManagers = []) => {
    const { data } = await getWorkManagersSelectAPI();
    const current = currentManagers
      .filter((m) => !data.some((option) => option.value === m.useId))
      .map((m) => ({ value: m.useId, label: `${m.name ?? `Usuario ${m.useId}`} (inactivo)` }));
    setUserOptions([...data, ...current]);
  };

  useImperativeHandle(ref, () => ({
    open: async (row) => {
      setVisible(true);
      setLoading(true);
      try {
        if (row) {
          const { data } = await api.getById({ [idField]: row[idField] });
          setWrkId(data.wrkId);
          setIdempotencyKey(null);
          setOriginal({ cncId: data.cncId, cttId: data.cttId, sptId: data.sptId });
          reset(toForm(data));
          await loadUserOptions(data.managers);
        } else {
          setWrkId(0);
          setIdempotencyKey(newIdempotencyKey());
          setOriginal({});
          reset({ ...EMPTY_FORM, managers: [{ key: rowKey('m'), useId: '', role: 'MAIN', staId: 1 }] });
          await loadUserOptions();
        }
      } catch (err) {
        showError(err.response?.data?.message || 'Error al cargar la obra');
        setVisible(false);
      } finally {
        setLoading(false);
      }
    }
  }));

  // Estables (useCallback): SelectSocket recarga las opciones cuando cambian.
  const fetchCompanies = useCallback(() => getConstructionCompaniesSelectAPI(original.cncId), [original.cncId]);
  const fetchContractTypes = useCallback(() => getContractTypesSelectAPI(original.cttId), [original.cttId]);
  const fetchSupervisionTypes = useCallback(() => getSupervisionTypesSelectAPI(original.sptId), [original.sptId]);

  const fields = useMemo(() => {
    const money = (name, label, { required = false, grid = { xs: 12, sm: 6, md: 4 } } = {}) => ({
      key: name,
      name,
      type: 'text',
      label,
      required,
      maxLength: 20,
      validation: { ...(required ? { required: `El ${label.toLowerCase()} es requerido` } : {}), pattern: MONEY },
      grid,
      props: {
        placeholder: '0.00',
        slotProps: {
          input: { startAdornment: <InputAdornment position="start">$</InputAdornment> },
          htmlInput: { inputMode: 'decimal' }
        }
      }
    });
    const integer = (name, label, { required = false } = {}) => ({
      key: name,
      name,
      type: 'text',
      label,
      required,
      maxLength: 6,
      validation: { ...(required ? { required: `El ${label.toLowerCase()} es requerido` } : {}), pattern: INTEGER },
      grid: { xs: 12, sm: 6, md: 4 },
      props: { slotProps: { htmlInput: { inputMode: 'numeric' } } }
    });
    const master = (name, label, fetchApi, socketEvent) => ({
      key: name,
      name,
      type: 'socketDropdown',
      label,
      required: true,
      validation: { required: `Selecciona ${label.toLowerCase()}` },
      fetchApi,
      socketEvent,
      grid: { xs: 12, md: 4 }
    });

    const userSelect = (row, rows) =>
      userOptions.filter((option) => option.value === row.useId || !rows.some((r) => r.useId === option.value));

    return {
      general: [
        {
          key: 'code',
          name: 'code',
          type: 'text',
          label: 'Código',
          required: true,
          maxLength: 30,
          validation: { required: 'El código es requerido' },
          grid: { xs: 12, sm: 4 }
        },
        {
          key: 'name',
          name: 'name',
          type: 'text',
          label: 'Nombre',
          required: true,
          maxLength: 200,
          validation: { required: 'El nombre es requerido' },
          grid: { xs: 12, sm: 8 }
        },
        master('cncId', 'Constructora', fetchCompanies, 'refresh-construction-companies'),
        master('cttId', 'Tipo de contrato', fetchContractTypes, 'refresh-contract-types'),
        master('sptId', 'Tipo de interventoría', fetchSupervisionTypes, 'refresh-supervision-types')
      ],
      values: [
        money('initialValue', 'Valor inicial', { required: true }),
        money('extendedValue', 'Valor ampliado'),
        money('maxServiceOrderValue', 'Valor máximo de orden de servicio'),
        integer('initialTerm', 'Plazo inicial', { required: true }),
        integer('extendedTerm', 'Plazo ampliado'),
        money('directCost', 'Costo directo'),
        // Área: cantidad con decimales, no importe (sin "$").
        {
          key: 'area',
          name: 'area',
          type: 'text',
          label: 'Área total',
          maxLength: 20,
          validation: { pattern: MONEY },
          grid: { xs: 12, sm: 6, md: 4 },
          props: { placeholder: '0.00', slotProps: { htmlInput: { inputMode: 'decimal' } } }
        }
      ],
      managers: [
        {
          key: 'managers',
          name: 'managers',
          type: 'custom',
          label: 'Responsables',
          hideLabel: true,
          required: true,
          component: EditableList,
          validation: { validate: validateManagers },
          grid: { xs: 12 },
          props: {
            columns: [
              { name: 'useId', label: 'Usuario', type: 'select', options: userSelect, grid: { xs: 12, sm: 6 } },
              { name: 'role', label: 'Rol', type: 'select', options: ROLE_OPTIONS, grid: { xs: 6, sm: 3 } },
              { name: 'staId', label: 'Estado', type: 'select', options: STATUS_OPTIONS, grid: { xs: 6, sm: true } }
            ],
            newRow: () => ({ key: rowKey('m'), useId: '', role: 'SUPPORT', staId: 1 }),
            canAdd: canAssign,
            canEdit: canAssign,
            canRemove: canRemoveManager,
            addLabel: 'Agregar responsable',
            emptyText: 'Sin responsables.',
            rowLabel: 'Responsable'
          }
        }
      ],
      stages: [
        {
          key: 'stages',
          name: 'stages',
          type: 'custom',
          label: 'Etapas',
          hideLabel: true,
          component: EditableList,
          validation: { validate: validateStages },
          grid: { xs: 12 },
          props: {
            columns: [
              { name: 'name', label: 'Nombre', type: 'text', maxLength: 100, grid: { xs: 12, sm: true } },
              { name: 'staId', label: 'Estado', type: 'select', options: STATUS_OPTIONS, grid: { xs: 12, sm: 3 } }
            ],
            newRow: () => ({ key: rowKey('s'), name: '', order: 0, staId: 1 }),
            orderField: 'order',
            disabled: !canManageStages,
            addLabel: 'Agregar etapa',
            emptyText: 'Sin etapas.',
            rowLabel: 'Etapa'
          }
        }
      ]
    };
  }, [fetchCompanies, fetchContractTypes, fetchSupervisionTypes, userOptions, canAssign, canRemoveManager, canManageStages]);

  const onSubmit = async (form) => {
    setSaving(true);
    try {
      const { data } = await api.save(toPayload(wrkId, form), isEdit ? undefined : idempotencyKey);
      setVisible(false);
      showSuccess(data.message || 'Guardado correctamente.');
      onSaved?.();
    } catch (err) {
      showError(err.response?.data?.message || 'Error al guardar la obra');
    } finally {
      setSaving(false);
    }
  };

  return (
    <BaseDialog
      open={visible}
      onClose={() => setVisible(false)}
      title={`${isEdit ? 'Editar' : feminine ? 'Nueva' : 'Nuevo'} ${title.toLowerCase()}`}
      maxWidth="md"
      fullScreenOnMobile
      loading={loading}
      actions={
        <>
          <Button onClick={() => setVisible(false)} disabled={saving}>
            Cancelar
          </Button>
          <Button variant="contained" color="secondary" onClick={handleSubmit(onSubmit)} disabled={loading || saving}>
            {saving ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Guardar'}
          </Button>
        </>
      }
    >
      <FormProvider {...methods}>
        <Stack spacing={2}>
          {SECTIONS.map(({ key, title: sectionTitle }) => (
            <SubCard key={key} title={sectionTitle} contentSX={{ pt: 0.5 }}>
              <GenericFormSection fields={fields[key]} />
            </SubCard>
          ))}
        </Stack>
      </FormProvider>
    </BaseDialog>
  );
});

WorkDialog.propTypes = {
  title: PropTypes.string.isRequired,
  idField: PropTypes.string.isRequired,
  api: PropTypes.shape({ getById: PropTypes.func.isRequired, save: PropTypes.func.isRequired }).isRequired,
  onSaved: PropTypes.func,
  feminine: PropTypes.bool
};

export default WorkDialog;
