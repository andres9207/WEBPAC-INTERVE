import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { IconPlus } from '@tabler/icons-react';

import SubCard from 'ui-component/cards/SubCard';

/**
 * Sección de un formulario (DESIGN_SYSTEM, "Secciones de formulario"):
 * título, subtítulo y, a la derecha del encabezado, la acción de la sección.
 *
 * Una colección (responsables, etapas, contactos…) se agrega **siempre**
 * desde el encabezado de su sección, a la derecha: `onAdd` + `addLabel`
 * dibujan el botón estándar. Nunca un botón "Agregar" debajo de la lista.
 * `action` queda para otra acción que no sea agregar.
 */
export default function FormSection({ title, subtitle, onAdd, addLabel, action, children }) {
  const headerAction =
    action ??
    (onAdd && (
      <Button variant="outlined" color="inherit" startIcon={<IconPlus size={16} />} onClick={onAdd}>
        {addLabel}
      </Button>
    ));

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
          {headerAction}
        </Stack>
      }
    >
      {children}
    </SubCard>
  );
}

FormSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  /** Agregar a la colección de la sección; sin permiso, no se pasa y el botón no aparece. */
  onAdd: PropTypes.func,
  /** Texto del botón: "Agregar contacto", "Agregar etapa"… */
  addLabel: PropTypes.string,
  /** Otra acción del encabezado, en vez del botón de agregar. */
  action: PropTypes.node,
  children: PropTypes.node
};
