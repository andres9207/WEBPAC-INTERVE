import { contactsToForm, contactsToPayload } from 'utils/contacts';
import { STATUS } from 'utils/constants';

/**
 * Modelo del formulario de una obra (DEC-030): cabecera, responsables, etapas
 * y contactos, editados en memoria y enviados juntos en una sola petición. El
 * servidor guarda las colecciones por diferencial.
 *
 * Plazo ampliado y área no se muestran (DEC-030): se conservan tal como vienen
 * del servidor y se reenvían sin cambios.
 */

export const MONEY = /^\d{1,16}(\.\d{0,2})?$/;

export const EMPTY_FORM = {
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
  stages: [],
  contacts: []
};

/** Pestaña donde se edita cada campo; el resto, en "Datos de la obra". */
export const FIELD_TAB = { managers: 'managers', stages: 'stages', contacts: 'contacts' };

let rowSeq = 0;
export const rowKey = (prefix) => `${prefix}-new-${(rowSeq += 1)}`;
const text = (value) => String(value ?? '').trim();

export const toForm = (work) => ({
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
    .map((s) => ({ key: `s-${s.wksId}`, wksId: s.wksId, name: s.name, order: s.order, staId: s.staId })),
  contacts: contactsToForm(work.contacts)
});

export const toPayload = (wrkId, form) => ({
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
  })),
  contacts: contactsToPayload(form.contacts)
});

export const validateManagers = (rows) => rows.some((row) => row.staId === STATUS.ACTIVE) || 'Agrega al menos un responsable activo.';

export const validateStages = (rows) => {
  if (rows.some((row) => !text(row.name))) return 'Cada etapa necesita nombre.';
  const names = rows.map((row) => text(row.name).toLocaleLowerCase('es'));
  return new Set(names).size === names.length || 'Hay etapas con el mismo nombre.';
};

export const moneyRules = (label, required = false) => ({
  ...(required ? { required: `El ${label} es requerido.` } : {}),
  pattern: { value: MONEY, message: 'Importe no válido.' }
});
