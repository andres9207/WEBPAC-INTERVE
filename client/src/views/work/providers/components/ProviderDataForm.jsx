import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { Controller } from 'react-hook-form';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import FormSection from 'ui-component/extended/FormSection';
import SelectSocket from 'ui-component/extended/SelectSocket';
import { getIdentityDocumentsSelectAPI } from 'api/requests/identityDocumentsApi';
import { getProviderTypesSelectAPI } from 'api/requests/providerTypesApi';
import { identificationFormatError } from 'utils/identification';
import { EMAIL, text } from './providerForm';

/**
 * Pestaña "Datos del proveedor": identidad y datos generales.
 *
 * - La identidad es el par (tipo, número). La página verifica mientras se
 *   escribe si ya existe (`existing`) y aquí se ofrece ir a ese proveedor en
 *   vez de crear otro.
 * - Al editar, cambiar la identificación exige su propio permiso (ADR-0012,
 *   regla 5): sin él, los dos campos quedan de solo lectura (`identityLocked`).
 */
export default function ProviderDataForm({ control, loaded, identityLocked, identityFormat, onIdentityOptions, existing, onViewExisting }) {
  // Estables (useCallback): SelectSocket recarga las opciones cuando cambian.
  // El valor actual se incluye aunque el maestro esté inactivo.
  const fetchIdentityDocuments = useCallback(() => getIdentityDocumentsSelectAPI(loaded?.iddId), [loaded?.iddId]);
  // Tipos (uno o varios, DEC-041): el selector trae los activos y se le suman
  // los que ya tiene el proveedor, aunque estén inactivos.
  const fetchProviderTypes = useCallback(() => getProviderTypesSelectAPI(), []);
  const withCurrentTypes = useCallback(
    (options) => {
      const current = (loaded?.pvtIds ?? []).map((value, i) => ({ value, label: loaded.providerTypes[i] }));
      return [...options, ...current.filter((c) => !options.some((o) => o.value === c.value))];
    },
    [loaded]
  );
  const keepIdentityOptions = useCallback(
    (options) => {
      onIdentityOptions(options);
      return options;
    },
    [onIdentityOptions]
  );

  return (
    <Stack spacing={2}>
      <FormSection
        title="Identidad"
        subtitle={
          identityLocked
            ? 'Cambiar el documento requiere un permiso propio: reasigna el historial de la empresa.'
            : 'Un proveedor por empresa: el tipo y el número de documento no se repiten.'
        }
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 5 }}>
            <Controller
              name="iddId"
              control={control}
              rules={{ required: 'Selecciona el tipo de identificación.' }}
              render={({ field, fieldState }) => (
                <SelectSocket
                  value={field.value}
                  onChange={field.onChange}
                  label="Tipo de identificación"
                  required
                  disabled={identityLocked}
                  error={fieldState.error}
                  fetchApi={fetchIdentityDocuments}
                  mapOptions={keepIdentityOptions}
                  socketEvent="refresh-identity-documents"
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 7 }}>
            <Controller
              name="identification"
              control={control}
              rules={{
                required: 'El número de documento es requerido.',
                // Formato según el tipo (DEC-021); el servidor lo repite.
                validate: (value) => identificationFormatError(identityFormat, value) ?? true
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Número de documento"
                  required
                  size="small"
                  fullWidth
                  disabled={identityLocked}
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                  slotProps={{ htmlInput: { maxLength: 20, autoComplete: 'off' } }}
                />
              )}
            />
          </Grid>
          {existing && (
            <Grid size={{ xs: 12 }}>
              <Alert
                severity="warning"
                role="status"
                action={
                  <Button color="inherit" size="small" onClick={onViewExisting}>
                    Ver proveedor
                  </Button>
                }
              >
                Ya existe un proveedor con ese documento: <strong>{existing.name}</strong>. No se crea otro: úsalo en sus obras.
              </Alert>
            </Grid>
          )}
          <Grid size={{ xs: 12, sm: 7 }}>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'El nombre o razón social es requerido.' }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Nombre o razón social"
                  required
                  size="small"
                  fullWidth
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                  slotProps={{ htmlInput: { maxLength: 255, autoComplete: 'off' } }}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 5 }}>
            <Controller
              name="pvtIds"
              control={control}
              rules={{ validate: (value) => value.length > 0 || 'Selecciona al menos un tipo de proveedor.' }}
              render={({ field, fieldState }) => (
                <SelectSocket
                  multiple
                  value={field.value}
                  onChange={field.onChange}
                  label="Tipos de proveedor"
                  required
                  error={fieldState.error}
                  fetchApi={fetchProviderTypes}
                  mapOptions={withCurrentTypes}
                  socketEvent="refresh-provider-types"
                />
              )}
            />
          </Grid>
        </Grid>
      </FormSection>

      <FormSection title="Datos generales">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="serviceType"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Tipo de servicio"
                  size="small"
                  fullWidth
                  helperText="Qué suministra o qué servicio presta"
                  slotProps={{ htmlInput: { maxLength: 255 } }}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="email"
              control={control}
              rules={{ validate: (value) => !text(value) || EMAIL.test(text(value)) || 'Correo inválido.' }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Correo institucional"
                  type="email"
                  size="small"
                  fullWidth
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                  slotProps={{ htmlInput: { maxLength: 255, autoComplete: 'off' } }}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Controller
              name="observation"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Observación"
                  size="small"
                  fullWidth
                  multiline
                  minRows={2}
                  slotProps={{ htmlInput: { maxLength: 500 } }}
                />
              )}
            />
          </Grid>
        </Grid>
      </FormSection>
    </Stack>
  );
}

ProviderDataForm.propTypes = {
  control: PropTypes.object.isRequired,
  /** El proveedor cargado; null al crear. */
  loaded: PropTypes.object,
  identityLocked: PropTypes.bool,
  /** Formato del número según el tipo elegido (DEC-021). */
  identityFormat: PropTypes.shape({ pattern: PropTypes.string, message: PropTypes.string, checkDigit: PropTypes.string }),
  /** Recibe las opciones del tipo de identificación, con su formato. */
  onIdentityOptions: PropTypes.func.isRequired,
  /** Proveedor que ya tiene ese documento, si hay. */
  existing: PropTypes.object,
  onViewExisting: PropTypes.func
};
