import { visiblePayload, withContractAiu } from './configurableFields';
import { EMPTY_CONCEPT } from './ConceptFields';

/**
 * Modelo del formulario de un contrato (ADR-0015, DEC-035): la cabecera y, al
 * crear, el valor inicial y las pólizas, enviados juntos en una sola petición
 * (PRO-BE-09). Editar solo cambia la cabecera; el valor y las pólizas de un
 * contrato guardado se cambian con sus actos, en sus pestañas.
 *
 * Campos configurables (ADR-0006, DEC-053): se envían solo los visibles para
 * el tipo de proveedor; el resto lo resuelve el servidor.
 */

export const EMPTY_FORM = {
  wrkId: '',
  wksId: '',
  prvId: '',
  pvtId: '',
  cttId: '',
  number: '',
  name: '',
  startDate: '',
  term: '',
  termUnit: 'MES',
  observation: '',
  // Solicitud de AIU (DEC-046): al crear, la da el tipo elegido.
  aiuRequested: true,
  initialConcept: EMPTY_CONCEPT,
  // Solo al crear (PoliciesDraftEditor).
  policies: []
};

/** Pestaña donde se edita cada campo al crear; el resto, en "Datos del contrato". */
export const FIELD_TAB = { initialConcept: 'value', policies: 'policies' };

export const NO_DESCRIPTION = { skip: ['CONCEPT_DESCRIPTION'] };

const text = (value) => String(value ?? '').trim();

export const toForm = (contract) => ({
  ...EMPTY_FORM,
  ...Object.fromEntries(Object.keys(EMPTY_FORM).map((field) => [field, contract[field] ?? EMPTY_FORM[field]])),
  term: String(contract.term ?? ''),
  observation: contract.observation ?? '',
  aiuRequested: contract.aiuRequested !== false
});

// Parámetros de la vista previa (preview_contract_end_date): con la fecha fin, sin plazo, pide el plazo.
export const contractEndParams = ({ ctrId, startDate, term, termUnit, endDate }) => ({
  ...(ctrId ? { ctrId } : {}),
  startDate,
  termUnit,
  ...(endDate ? { endDate } : { term })
});

export const toPayload = (ctrId, form, descriptors) => {
  const configured = visiblePayload(descriptors, 'CONTRACT', form);
  if ('observation' in configured) configured.observation = text(configured.observation);
  return {
    ctrId,
    ...(ctrId ? {} : { wrkId: form.wrkId }),
    prvId: form.prvId,
    pvtId: form.pvtId,
    cttId: form.cttId,
    number: text(form.number),
    name: text(form.name),
    startDate: form.startDate,
    term: text(form.term),
    termUnit: form.termUnit,
    aiuRequested: Boolean(form.aiuRequested),
    ...configured,
    ...(ctrId
      ? {}
      : {
          initialConcept: {
            directCost: form.initialConcept.directCost,
            ...visiblePayload(withContractAiu(descriptors, Boolean(form.aiuRequested)), 'CONCEPT', form.initialConcept, NO_DESCRIPTION)
          },
          ...(form.policies.length > 0 && {
            policies: form.policies.map(({ pltId, insId, number, percentage, startDate, endDate, observation }) => ({
              pltId,
              insId,
              number,
              percentage,
              startDate,
              endDate,
              observation
            }))
          })
        })
  };
};
