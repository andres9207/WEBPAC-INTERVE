import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Controller, useWatch } from 'react-hook-form';

import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import FormSection from 'ui-component/extended/FormSection';
import { invoiceGlossesApi } from 'api/requests/invoicesApi';
import { fDateOnly } from 'utils/formatTime';
import { fMoneyText } from 'utils/formatNumber';

/**
 * Glosas por liberar al registrar una factura (DEC-085, "Liberación al
 * registrar"): las abiertas del proveedor en la obra de la factura, de
 * cualquier tipo, contrato y extracto. Se eligen en un desplegable que dice
 * de dónde viene cada una (factura, contrato, extracto y fecha) y sobre qué
 * campos y por cuánto se hizo; las elegidas se repiten debajo en una frase,
 * para confirmar antes de registrar. Se liberan con la factura, en su misma
 * transacción, con una observación (prellenada y editable) y la fecha de hoy.
 *
 * Solo al registrar y con el permiso de gestionar glosas; sin glosas
 * abiertas, la sección no aparece. El servidor revalida todo bajo bloqueo.
 */

const TEXT_MAX = 1000;

/** "IVA por $ 4.000,00 y RTE FUENTE por -$ 1.000,00". */
const fieldsSentence = (fields) => {
  const parts = fields.map((line) => `${line.fieldName} por ${fMoneyText(line.value)}`);
  return parts.length > 1 ? `${parts.slice(0, -1).join(', ')} y ${parts.at(-1)}` : (parts[0] ?? '');
};

/** De dónde viene la glosa: "Factura F-1 · Normal · contrato C-15 · extracto 18 · 20/10/2026". */
const originText = (gloss) =>
  [
    `Factura ${gloss.invoiceNumber}`,
    gloss.invoiceTypeName,
    gloss.contractNumber && `contrato ${gloss.contractNumber}`,
    gloss.statement ? `extracto ${gloss.statement}` : 'sin extracto',
    gloss.raisedDate && `levantada el ${fDateOnly(gloss.raisedDate)}`
  ]
    .filter(Boolean)
    .join(' · ');

export default function ReleaseGlossesSection({ control, setValue, ctrId, wrkId, prvId, invoiceNumber, enabled }) {
  const [items, setItems] = useState([]);
  const [selected = [], observation = ''] = useWatch({ control, name: ['releaseGlosses', 'releaseObservation'] });

  // Las glosas abiertas del proveedor en la obra: por el contrato (factura de contrato) o por obra y proveedor (simple).
  useEffect(() => {
    let params = null;
    if (ctrId) params = { ctrId };
    else if (wrkId && prvId) params = { wrkId, prvId };
    if (!enabled || !params) {
      setItems([]);
      return undefined;
    }
    let cancelled = false;
    invoiceGlossesApi
      .releasable(params)
      .then(({ data }) => !cancelled && setItems(data))
      // Sin la lista, la factura se registra igual: las glosas se liberan desde su pestaña.
      .catch(() => !cancelled && setItems([]));
    return () => {
      cancelled = true;
    };
  }, [enabled, ctrId, wrkId, prvId]);

  // Otro contrato o proveedor: las elegidas que ya no están en la lista se quitan.
  useEffect(() => {
    const ids = new Set(items.map((item) => item.value));
    const kept = selected.filter((id) => ids.has(id));
    if (kept.length !== selected.length) setValue('releaseGlosses', kept, { shouldDirty: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  // Observación prellenada con el número de la factura; si el usuario la cambió, se respeta.
  const autoObservation = useRef('');
  const number = String(invoiceNumber ?? '').trim();
  useEffect(() => {
    const next = number ? `Liberada con la factura ${number}` : 'Liberada con esta factura';
    if (selected.length > 0 && (observation === '' || observation === autoObservation.current)) {
      setValue('releaseObservation', next, { shouldDirty: true, shouldValidate: observation !== '' });
    }
    autoObservation.current = next;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number, selected.length]);

  if (!enabled || items.length === 0) return null;

  const chosen = items.filter((item) => selected.includes(item.value));

  return (
    <FormSection
      title="Glosas por liberar"
      subtitle={`El proveedor tiene ${items.length} glosa${items.length === 1 ? '' : 's'} abierta${items.length === 1 ? '' : 's'} en esta obra. Elige las que corrige esta factura: se liberan al registrarla, con la fecha de hoy. Si no corrige ninguna, déjalo vacío.`}
    >
      <Stack spacing={2}>
        <Controller
          name="releaseGlosses"
          control={control}
          render={({ field }) => (
            <Autocomplete
              multiple
              disableCloseOnSelect
              options={items}
              value={chosen}
              onChange={(_event, value) => field.onChange(value.map((item) => item.value))}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              getOptionLabel={(option) => `${option.invoiceNumber} · ${fMoneyText(option.glossValue)}`}
              filterOptions={(options, { inputValue }) => {
                const term = inputValue.trim().toLowerCase();
                if (!term) return options;
                return options.filter((option) =>
                  [originText(option), option.description, ...option.fields.map((line) => line.fieldName)]
                    .join(' ')
                    .toLowerCase()
                    .includes(term)
                );
              }}
              renderOption={({ key, ...props }, option) => (
                <Box component="li" key={key} {...props}>
                  <Stack spacing={0.25} sx={{ py: 0.5 }}>
                    <Typography variant="subtitle2">
                      {originText(option)} · {fMoneyText(option.glossValue)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Sobre {fieldsSentence(option.fields)}. {option.description}
                    </Typography>
                  </Stack>
                </Box>
              )}
              renderValue={(value, getItemProps) =>
                value.map((option, index) => {
                  const { key, ...itemProps } = getItemProps({ index });
                  return (
                    <Chip key={key} size="small" label={`${option.invoiceNumber} · ${fMoneyText(option.glossValue)}`} {...itemProps} />
                  );
                })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  label="Glosas que libera esta factura"
                  placeholder={chosen.length ? '' : 'Elige una o varias'}
                  helperText="Busca por factura, contrato, extracto, campo o descripción."
                />
              )}
              noOptionsText="Ninguna glosa coincide"
            />
          )}
        />

        {chosen.map((gloss) => (
          <Box key={gloss.value} sx={{ pl: 1.5, borderLeft: '3px solid', borderColor: 'success.light' }}>
            <Stack direction="row" sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 0.75 }}>
              <Typography variant="subtitle2">{originText(gloss)}</Typography>
              {gloss.creditNote && <Chip size="small" label="Nota crédito" color="info" variant="outlined" />}
              {!gloss.affectsTotal && <Chip size="small" label="No suma al total" variant="outlined" />}
              {gloss.invoiceCancelled && <Chip size="small" label="Factura anulada" color="warning" variant="outlined" />}
            </Stack>
            <Typography variant="body2">
              Esta glosa se hizo sobre {fieldsSentence(gloss.fields)}: total {fMoneyText(gloss.glossValue)}.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
              {gloss.description}
            </Typography>
          </Box>
        ))}

        {chosen.length > 0 && (
          <Controller
            name="releaseObservation"
            control={control}
            rules={{
              validate: (value) => String(value ?? '').trim() !== '' || 'La observación de la liberación es requerida.',
              maxLength: { value: TEXT_MAX, message: `Máximo ${TEXT_MAX} caracteres.` }
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Observación de la liberación"
                size="small"
                fullWidth
                multiline
                minRows={2}
                required
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message ?? 'Queda en cada glosa liberada.'}
                slotProps={{ htmlInput: { maxLength: TEXT_MAX } }}
              />
            )}
          />
        )}
      </Stack>
    </FormSection>
  );
}

ReleaseGlossesSection.propTypes = {
  control: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  /** Factura de contrato: sus glosas salen de la obra y el proveedor del contrato. */
  ctrId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Factura simple: obra y proveedor elegidos. */
  wrkId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  prvId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Número de la factura, para la observación prellenada. */
  invoiceNumber: PropTypes.string,
  /** Al registrar y con el permiso de gestionar glosas. */
  enabled: PropTypes.bool
};
