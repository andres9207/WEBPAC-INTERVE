import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { EMPTY_FORM, NO_DESCRIPTION, contractEndParams } from './contractForm';
import { shownFields, withContractAiu } from './configurableFields';
import {
  getContractFieldsAPI,
  getContractFormOptionsAPI,
  getContractWorksSelectAPI,
  previewContractEndDateAPI
} from 'api/requests/contractsApi';
import { getContractTypesSelectAPI } from 'api/requests/contractTypesApi';
import useEndDatePreview from 'hooks/useEndDatePreview';
import { useAuth } from 'contexts/AuthContext';
import { useWorkScope } from 'contexts/WorkScopeContext';
import { showError } from 'services/ToastService';
import { ALL_WORKS } from 'utils/workScope';

/**
 * Estado del formulario de un contrato, compartido por las pestañas del
 * expediente que lo editan (DEC-057): "Datos del contrato" y, al crear,
 * "Valor" (valor inicial) y "Pólizas".
 *
 * - La obra es la del selector del encabezado (DEC-047): el contrato nace en
 *   ella y el formulario no la pide. Solo con "Ver todo" se elige aquí.
 *   Etapa y proveedor se filtran por esa obra (y el servidor lo exige). La
 *   obra no cambia después de crear el contrato.
 * - Plazo y fecha fin se calculan en los dos sentidos, siempre en el
 *   servidor (inicio + plazo + prórrogas + días suspendidos; FRONTEND_STANDARD,
 *   regla 9): al salir del plazo, al cambiar la unidad o la fecha de inicio se
 *   pide la fecha fin; al escribir la fecha fin, el plazo que la produce, en la
 *   unidad elegida o en días si no cae exacta (useEndDatePreview). Se guarda
 *   el plazo; la fecha fin la vuelve a derivar el servidor.
 * - Tipo de proveedor (DEC-066): el contrato se firma bajo uno de los tipos
 *   con que el proveedor trabaja en la obra, de menú contrato mayor o
 *   subcontratistas; si tiene uno solo, se elige solo. Decide el menú de sus
 *   facturas, que el contrato guarda al crearse. Con facturas, el servidor no
 *   deja cambiar el proveedor ni el tipo.
 * - Campos configurables (ADR-0006, DEC-053): etapa, observaciones y los
 *   porcentajes del valor inicial dependen del tipo de proveedor elegido. Sus
 *   descriptores los entrega el servidor al elegir el tipo. Al editar, un
 *   valor guardado en un campo que dejó de aplicar se muestra en solo
 *   lectura, marcado como heredado.
 *
 * `contract` es el contrato guardado (null al crear).
 */
export default function useContractForm({ ctrId, isNew, contract }) {
  const { activeWork, works: scopeWorks } = useWorkScope();
  // Obra fija del encabezado; null con "Ver todo" (se elige en el formulario).
  const headerWork = activeWork === ALL_WORKS ? null : (scopeWorks.find((work) => work.value === activeWork) ?? null);
  const headerWrkId = headerWork?.value ?? '';

  const methods = useForm({ defaultValues: EMPTY_FORM });
  const { control, reset, setValue, getValues } = methods;
  const endPreview = useEndDatePreview(previewContractEndDateAPI, contractEndParams);
  const resetEndDate = endPreview.reset;

  const [workOptions, setWorkOptions] = useState([]);
  const [options, setOptions] = useState({ stages: [], providers: [] });
  const [loadingOptions, setLoadingOptions] = useState(false);
  // Descriptores de los campos configurables del tipo de proveedor elegido (`pvtId` dice de cuál son).
  const [fieldConfig, setFieldConfig] = useState({ pvtId: null, fields: [], typeAppliesAiu: false });
  const [loadingFields, setLoadingFields] = useState(false);

  // Al crear: la obra del encabezado y las obras elegibles con "Ver todo".
  useEffect(() => {
    if (!isNew) return;
    reset({ ...EMPTY_FORM, wrkId: headerWrkId });
    resetEndDate(undefined);
    if (headerWrkId) return;
    getContractWorksSelectAPI()
      .then(({ data }) => setWorkOptions(data))
      .catch((err) => showError(err.response?.data?.message || 'Error al cargar las obras'));
  }, [isNew, headerWrkId, reset, resetEndDate]);

  const [wrkId, prvId, pvtId, aiuRequested] = useWatch({ control, name: ['wrkId', 'prvId', 'pvtId', 'aiuRequested'] });

  const { permissionsCatalog, hasPermission } = useAuth();
  const aiuPermission = permissionsCatalog.work?.contracts?.changeAiu;
  const canChangeAiu = aiuPermission != null && hasPermission(aiuPermission);

  // Configuración vigente del tipo de proveedor elegido (ADR-0006 decisión 5,
  // DEC-066). Cambiar de tipo la vuelve a pedir.
  useEffect(() => {
    if (!prvId || !pvtId) {
      setFieldConfig({ pvtId: null, fields: [], typeAppliesAiu: false });
      return undefined;
    }
    let cancelled = false;
    setLoadingFields(true);
    getContractFieldsAPI({ prvId, pvtId })
      .then(({ data }) => {
        if (cancelled) return;
        setFieldConfig({ pvtId: data.pvtId, fields: data.fields, typeAppliesAiu: data.typeAppliesAiu });
        // Al crear, la solicitud de AIU la da el tipo de proveedor (DEC-046).
        if (isNew) setValue('aiuRequested', data.typeAppliesAiu);
      })
      .catch((err) => showError(err.response?.data?.message || 'Error al cargar los campos del tipo de proveedor'))
      .finally(() => !cancelled && setLoadingFields(false));
    return () => {
      cancelled = true;
    };
  }, [prvId, pvtId, isNew, setValue]);

  // Etapas y proveedores de la obra elegida; al editar, también los actuales aunque estén inactivos.
  const { wksId: storedWksId, prvId: storedPrvId, pvtId: storedPvtId } = contract ?? {};
  useEffect(() => {
    if (!wrkId) {
      setOptions({ stages: [], providers: [] });
      return undefined;
    }
    let cancelled = false;
    setLoadingOptions(true);
    getContractFormOptionsAPI({
      wrkId,
      ...(isNew ? {} : { includeWksId: storedWksId, includePrvId: storedPrvId, includePvtId: storedPvtId })
    })
      .then(({ data }) => !cancelled && setOptions(data))
      .catch((err) => showError(err.response?.data?.message || 'Error al cargar las etapas y proveedores de la obra'))
      .finally(() => !cancelled && setLoadingOptions(false));
    return () => {
      cancelled = true;
    };
  }, [wrkId, isNew, storedWksId, storedPrvId, storedPvtId]);

  // Tipos con que el proveedor elegido trabaja en la obra y admiten contratos (DEC-066).
  const providerOption = useMemo(() => options.providers.find((p) => p.value === Number(prvId)) ?? null, [options.providers, prvId]);
  const providerTypes = useMemo(() => providerOption?.types ?? [], [providerOption]);
  // Si el tipo elegido no es del proveedor (cambió el proveedor), se limpia;
  // si el proveedor tiene uno solo, se elige solo. Espera a tener las opciones.
  useEffect(() => {
    if (loadingOptions || !providerOption) return;
    if (providerTypes.some((t) => t.value === Number(pvtId))) return;
    const next = providerTypes.length === 1 ? providerTypes[0].value : '';
    if (String(next) !== String(pvtId ?? '')) setValue('pvtId', next, { shouldDirty: true });
  }, [providerOption, providerTypes, pvtId, loadingOptions, setValue]);

  const storedCttId = contract?.cttId;
  const fetchContractTypes = useCallback(() => getContractTypesSelectAPI(storedCttId), [storedCttId]);

  const changeWork = (value) => {
    setValue('wrkId', value ?? '', { shouldDirty: true });
    setValue('wksId', '', { shouldDirty: true });
    setValue('prvId', '', { shouldDirty: true });
    setValue('pvtId', '', { shouldDirty: true });
  };

  // Plazo desde la fecha fin escrita: el servidor lo calcula y se pone en el formulario.
  const recalcTerm = async (values) => {
    const data = await endPreview.fromEndDate(values);
    if (!data) return;
    setValue('term', String(data.term), { shouldDirty: true, shouldValidate: true });
    setValue('termUnit', data.termUnit, { shouldDirty: true });
  };

  // Fecha fin: al salir del plazo, al cambiar la unidad o la fecha de inicio;
  // sin plazo pero con fecha fin, el plazo. Al editar, el servidor suma además
  // las prórrogas y los días suspendidos.
  const recalcEndDate = (changed = {}) => {
    const [startDate, term, termUnit] = getValues(['startDate', 'term', 'termUnit']);
    const values = { ctrId, startDate, term, termUnit, ...changed };
    if (!/^\d+$/.test(values.term) && endPreview.endDate)
      recalcTerm({ ctrId, startDate: values.startDate, termUnit: values.termUnit, endDate: endPreview.endDate });
    else endPreview.recalc(values);
  };

  const fieldsReady = Boolean(prvId) && Boolean(pvtId) && Number(fieldConfig.pvtId) === Number(pvtId) && !loadingFields;
  const descriptors = fieldsReady ? fieldConfig.fields : [];
  const stored = contract ? { wksId: contract.wksId, observation: contract.observation } : null;
  const contractFields = shownFields(descriptors, 'CONTRACT', stored);
  const conceptFields = shownFields(withContractAiu(descriptors, Boolean(aiuRequested)), 'CONCEPT', null, NO_DESCRIPTION);
  // Cambiar la solicitud de AIU respecto de la del tipo de proveedor (al crear) o la guardada (al editar) exige permiso.
  const aiuDefault = isNew ? fieldConfig.typeAppliesAiu : contract?.aiuRequested !== false;
  const showAiu = fieldsReady && (fieldConfig.typeAppliesAiu || (!isNew && contract?.aiuRequested !== false));

  return {
    methods,
    endPreview,
    resetEndDate,
    headerWork,
    workOptions,
    options,
    loadingOptions,
    providerTypes,
    fetchContractTypes,
    changeWork,
    recalcTerm,
    recalcEndDate,
    fieldsReady,
    descriptors: fieldConfig.fields,
    contractFields,
    conceptFields,
    canChangeAiu,
    aiuDefault,
    showAiu
  };
}
