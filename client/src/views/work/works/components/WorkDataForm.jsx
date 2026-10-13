import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import FormSection from 'ui-component/extended/FormSection';
import DateField from 'ui-component/extended/DateField';
import MoneyField from 'ui-component/extended/MoneyField';
import SearchSelect from 'ui-component/extended/SearchSelect';
import SelectSocket from 'ui-component/extended/SelectSocket';
import { getConstructionCompaniesSelectAPI } from 'api/requests/constructionCompaniesApi';
import { getContractTypesSelectAPI } from 'api/requests/contractTypesApi';
import { getSupervisionTypesSelectAPI } from 'api/requests/supervisionTypesApi';
import { TERM_UNIT_OPTIONS } from 'utils/constants';
import { moneyRules } from './workForm';

/**
 * Pestaña "Datos de la obra": datos generales y valores y plazos.
 *
 * Importes como texto con punto decimal (MoneyField, DEC-028). El cliente no
 * compara ni calcula: ampliado ≥ inicial, valor vigente y fecha final los
 * decide el servidor (FRONTEND_STANDARD, regla 9). La fecha final se le pide
 * al servidor al salir del plazo, al cambiar la unidad o la fecha de inicio
 * (`endPreview`, de useEndDatePreview).
 */
export default function WorkDataForm({ control, getValues, endPreview, loaded }) {
  // Estables (useCallback): SelectSocket recarga las opciones cuando cambian.
  // El valor actual se incluye aunque el maestro esté inactivo.
  const fetchCompanies = useCallback(() => getConstructionCompaniesSelectAPI(loaded?.cncId), [loaded?.cncId]);
  const fetchContractTypes = useCallback(() => getContractTypesSelectAPI(loaded?.cttId), [loaded?.cttId]);
  const fetchSupervisionTypes = useCallback(() => getSupervisionTypesSelectAPI(loaded?.sptId), [loaded?.sptId]);

  // Fecha final: al salir del plazo, al cambiar la unidad o la fecha de inicio.
  const recalcEndDate = (changed = {}) => {
    const [startDate, initialTerm, termUnit] = getValues(['startDate', 'initialTerm', 'termUnit']);
    endPreview.recalc({ startDate, term: initialTerm, termUnit, ...changed });
  };

  return (
    <Stack spacing={2}>
      <FormSection title="Datos generales">
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
      </FormSection>

      <FormSection title="Valores y plazos">
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
                  onChange={(value) => {
                    field.onChange(value);
                    recalcEndDate({ startDate: value });
                  }}
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
                    onBlur={() => {
                      field.onBlur();
                      recalcEndDate();
                    }}
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
                      onChange={(value) => {
                        field.onChange(value || 'MES');
                        recalcEndDate({ termUnit: value || 'MES' });
                      }}
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
              value={endPreview.endDate}
              label="Fecha final"
              readOnly
              helperText={endPreview.loading ? 'Calculando…' : 'Fecha de inicio + plazo inicial'}
            />
          </Grid>
        </Grid>
      </FormSection>
    </Stack>
  );
}

WorkDataForm.propTypes = {
  control: PropTypes.object.isRequired,
  getValues: PropTypes.func.isRequired,
  /** Resultado de useEndDatePreview. */
  endPreview: PropTypes.shape({ endDate: PropTypes.string, loading: PropTypes.bool, recalc: PropTypes.func }).isRequired,
  /** La obra cargada; null al crear. */
  loaded: PropTypes.object
};
