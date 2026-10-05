import { useState, forwardRef, useImperativeHandle, useEffect, useMemo, useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { showSuccess, showInfo, showError } from 'services/ToastService';
import { getProfilesAPI } from 'api/requests/profilesApi';
import { saveUserAPI } from 'api/requests/usersApi';
import { getIdentityDocumentsSelectAPI } from 'api/requests/identityDocumentsApi';
import { identificationFormatError } from 'utils/identification';
import { newIdempotencyKey } from 'utils/idempotency';
import httpCliente from 'api/services/httpCliente';
import { useAuth } from 'contexts/AuthContext';

import BaseDialog from 'ui-component/extended/BaseDialog';
import Button from '@mui/material/Button';

import GenericFormSection from 'ui-component/extended/GenericFormSection';
import ChipMultiSelect from 'ui-component/extended/ChipMultiSelect';
import { STATUS, STATUS_OPTIONS } from 'utils/constants';
// import DocumentManagement from 'ui-component/DocumentManagement';

const UserDialog = forwardRef(({ addItem, updateItem }, ref) => {
  const [visible, setVisible] = useState(false);
  const [useId, setUseId] = useState(0);
  const { user } = useAuth();
  // La contraseña propia se cambia con "Cambiar contraseña", que pide la
  // actual (ADR-0001, regla 11): editándose a sí mismo, el campo no se ofrece.
  const editingSelf = useId > 0 && useId === user?.useId;
  // Una clave por formulario de creación (utils/idempotency.js).
  const [idempotencyKey, setIdempotencyKey] = useState(null);
  const [loading, setLoading] = useState(false);

  const [allPages, setAllPages] = useState([]);
  const [profileName, setProfileName] = useState('');
  // Tipo que ya tenía el usuario: el selector lo incluye aunque esté inactivo
  // (ADR-0008, decisión 7).
  const [originalIddId, setOriginalIddId] = useState(null);
  const [identityDocumentCode, setIdentityDocumentCode] = useState(null);
  // Opciones del selector de tipos: cada una trae el formato de su número.
  const [identityDocuments, setIdentityDocuments] = useState([]);

  const methods = useForm({
    defaultValues: {
      proId: '',
      name: '',
      lastName: '',
      iddId: '',
      identification: '',
      username: '',
      email: '',
      password: '',
      access: true,
      changePassword: false,
      staId: STATUS.ACTIVE,
      usePages: [],
    },
  });

  const { handleSubmit, reset, watch } = methods;

  const access = watch('access');

  const fetchIdentityDocuments = useCallback(() => getIdentityDocumentsSelectAPI(originalIddId), [originalIddId]);
  // Estable (useCallback): SelectSocket recarga las opciones cuando cambia.
  const keepIdentityDocuments = useCallback((options) => {
    setIdentityDocuments(options);
    return options;
  }, []);

  const fields = useMemo(() => {
    const list = [
      { key: 'proId', name: 'proId', type: 'socketDropdown', label: 'Perfil', required: true, validation: { required: 'El perfil es requerido' }, fetchApi: getProfilesAPI, socketEvent: 'refresh-profiles', grid: { xs: 12 }, props: { onOptionChange: (opt) => setProfileName(opt.label) } },
      // Número y tipo van juntos, o ninguno (el servidor repite la regla).
      {
        key: 'iddId',
        name: 'iddId',
        type: 'socketDropdown',
        label: 'Tipo de identificación',
        validation: {
          validate: (value, form) => (String(form.identification ?? '').trim() && !value ? 'Selecciona el tipo de identificación' : true)
        },
        fetchApi: fetchIdentityDocuments,
        mapOptions: keepIdentityDocuments,
        socketEvent: 'refresh-identity-documents',
        grid: { xs: 12, sm: 6 },
        props: { onOptionChange: (opt) => setIdentityDocumentCode(opt.code) }
      },
      {
        key: 'identification',
        name: 'identification',
        type: 'text',
        label: 'Número de identificación',
        validation: {
          maxLength: { value: 20, message: 'Máximo 20 caracteres' },
          validate: (value, form) => {
            if (!form.iddId) return true;
            if (!String(value ?? '').trim()) return 'Ingresa el número de identificación';
            // Formato según el tipo elegido (ADR-0008, decisión 5); el servidor lo repite.
            const format = identityDocuments.find((opt) => opt.value === form.iddId)?.format;
            return identificationFormatError(format, value) ?? true;
          }
        },
        grid: { xs: 12, sm: 6 }
      },
      { key: 'name', name: 'name', type: 'text', label: 'Nombre(s)', required: true, validation: { required: 'El nombre es requerido' }, grid: { xs: 12, sm: 6 } },
      { key: 'lastName', name: 'lastName', type: 'text', label: 'Apellido(s)', required: true, validation: { required: 'El apellido es requerido' }, grid: { xs: 12, sm: 6 } },
      { key: 'email', name: 'email', type: 'text', label: 'Correo Electrónico', required: true, validation: { required: 'El correo es requerido', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Correo inválido' } }, grid: { xs: 12 }, props: { type: 'email' } },
      { key: 'access', name: 'access', type: 'inputSwitch', label: 'Acceso al sistema', grid: { xs: 12, sm: 6 } },
      { key: 'staId', name: 'staId', type: 'selectButton', label: 'Estado', options: STATUS_OPTIONS, grid: { xs: 12, sm: 6 } },
    ];

    if (access) {
      list.push(
        { key: 'changePassword', name: 'changePassword', type: 'inputSwitch', label: 'Pedir cambio de contraseña', grid: { xs: 6 } },
        { key: 'username', name: 'username', type: 'text', label: 'Usuario', grid: { xs: 12, sm: 6 } },
        ...(editingSelf ? [] : [{ key: 'password', name: 'password', type: 'password', label: 'Contraseña', grid: { xs: 12, sm: 6 } }]),
        {
          key: 'usePages',
          name: 'usePages',
          type: 'custom',
          component: ChipMultiSelect,
          hideLabel: true,
          grid: { xs: 12 },
          props: {
            label: 'Páginas autorizadas',
            options: allPages.map((p) => ({ value: p.id, label: p.description })),
            searchPlaceholder: 'Buscar página',
            emptyText: 'Ninguna página coincide'
          }
        },
      );
    }

    return list;
  }, [access, allPages, fetchIdentityDocuments, keepIdentityDocuments, identityDocuments, editingSelf]);

  const fetchLists = async () => {
    setLoading(true);
    try {
      const { data } = await httpCliente.get('security/permissions/get_all_pages');
      setAllPages(data || []);
    } catch (err) {
      console.error('Error fetching lists:', err);
    } finally {
      setLoading(false);
    }
  };

  const getPagesByProfile = async (profileId) => {
    if (!profileId || useId > 0) return;
    try {
      const { data } = await httpCliente.get('auth/get_windows_by_profile', { proId: profileId });
      reset((prev) => ({ ...prev, usePages: data.map((p) => p.pagId) }));
    } catch (err) {
      console.error('Error fetching profile pages:', err);
    }
  };

  useEffect(() => {
    if (visible) {
      fetchLists();
    }
  }, [visible]);

  const proIdValue = watch('proId');
  useEffect(() => {
    if (proIdValue && useId === 0) {
      getPagesByProfile(proIdValue);
    }
  }, [proIdValue]);

  const newUser = () => {
    setUseId(0);
    setIdempotencyKey(newIdempotencyKey());
    setProfileName('');
    setOriginalIddId(null);
    setIdentityDocumentCode(null);
    reset({
      proId: '',
      name: '',
      lastName: '',
      iddId: '',
      identification: '',
      username: '',
      email: '',
      password: '',
      access: true,
      changePassword: false,
      staId: STATUS.ACTIVE,
      usePages: [],
    });
    setVisible(true);
  };

  const editUser = (item) => {
    setIdempotencyKey(null);
    setUseId(item.useId);
    setProfileName(item.profileName || '');
    setOriginalIddId(item.iddId || null);
    setIdentityDocumentCode(item.identityDocumentCode || null);
    reset({
      proId: item.proId || '',
      name: item.name || '',
      lastName: item.lastName || '',
      iddId: item.iddId || '',
      identification: item.identification || '',
      username: item.username || '',
      email: item.email || '',
      password: '',
      access: item.access === 1 || item.access === true,
      changePassword: item.changePassword === 1 || item.changePassword === true,
      staId: item.staId || STATUS.ACTIVE,
      usePages: item.usePages ? item.usePages.split(',').map(Number) : [],
    });
    setVisible(true);
  };

  useImperativeHandle(ref, () => ({
    newUser,
    editUser,
  }));

  const onSubmit = async (formData) => {
    if (useId === 0 && !formData.password) {
      showInfo('La contraseña es requerida para nuevos usuarios.');
      return;
    }

    const identification = formData.identification.trim() || null;
    const payload = {
      useId,
      proId: formData.proId,
      name: formData.name,
      lastName: formData.lastName,
      identification,
      iddId: identification ? formData.iddId : null,
      username: formData.access ? (formData.username || formData.email.split('@')[0]) : null,
      email: formData.email,
      password: editingSelf ? null : formData.password || null,
      access: formData.access ? 1 : 0,
      changePassword: formData.access ? (formData.changePassword ? 1 : 0) : 0,
      staId: formData.staId,
      usePages: formData.access ? formData.usePages.join(',') : '',
    };

    setLoading(true);
    try {
      const { data } = await saveUserAPI(payload, useId > 0 ? undefined : idempotencyKey);

      const userItem = {
        useId: useId > 0 ? useId : data.useId,
        proId: formData.proId,
        name: formData.name,
        lastName: formData.lastName,
        identification,
        iddId: payload.iddId,
        identityDocumentCode: identification ? identityDocumentCode : null,
        username: payload.username,
        email: formData.email,
        access: payload.access,
        changePassword: payload.changePassword,
        staId: formData.staId,
        statusName: formData.staId === STATUS.ACTIVE ? 'Activo' : 'Inactivo',
        profileName,
        usePages: payload.usePages,
      };

      if (useId > 0) {
        updateItem({ idField: 'useId', ...userItem });
      } else {
        addItem(userItem);
      }

      setVisible(false);
      showSuccess(data.message || 'Usuario guardado con éxito.');
    } catch (err) {
      console.error('Error saving user:', err);
      showError(err.response?.data?.message || 'Error al guardar el usuario');
    } finally {
      setLoading(false);
    }
  };

  // const docConfig = useMemo(() => ({ modulo: 'USERS', moduloId: useId }), [useId]);

  return (
    <BaseDialog
      open={visible}
      onClose={() => setVisible(false)}
      title={useId ? 'Editar Usuario' : 'Nuevo Usuario'}
      maxWidth="sm"
      loading={loading}
      actions={
        <>
          <Button onClick={() => setVisible(false)}>Cancelar</Button>
          <Button variant="contained" color="secondary" onClick={handleSubmit(onSubmit)} disabled={loading}>
            {useId ? 'Guardar cambios' : 'Guardar'}
          </Button>
        </>
      }
    >
      {!loading && (
        <FormProvider {...methods}>
          <GenericFormSection fields={fields} />
        </FormProvider>
      )}

      {/* {useId > 0 && (
        <DocumentManagement
          docConfig={docConfig}
          multipleFiles={false}
        />
      )} */}
    </BaseDialog>
  );
});

export default UserDialog;
