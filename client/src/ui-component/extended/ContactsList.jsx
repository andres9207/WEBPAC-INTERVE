import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Pending } from 'ui-component/extended/DetailBlocks';
import { contactChannels } from 'utils/contacts';

/**
 * Contactos de una entidad en su detalle (ADR-0009), de solo lectura: una
 * tarjeta por contacto, el principal marcado. Lo usan el proveedor y la
 * obra; se editan en el formulario de cada uno, con ContactsEditor.
 */
export default function ContactsList({ contacts, emptyText }) {
  if (contacts.length === 0) return <Pending title="Sin contactos." text={emptyText} />;

  return (
    <Grid container spacing={1.5} component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
      {contacts.map((c) => (
        <Grid key={c.contactId} size={{ xs: 12, md: 6 }} component="li">
          <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, px: 2, py: 1.5, height: '100%' }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
              <Typography variant="subtitle1">{c.name || c.addressType}</Typography>
              {c.main && <Chip label="Principal" size="small" color="primary" />}
            </Stack>
            <Typography variant="caption" color="text.secondary" component="p">
              {c.addressType}
              {c.position ? ` · ${c.position}` : ''}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, wordBreak: 'break-word' }}>
              {contactChannels(c).join(' · ')}
            </Typography>
            {c.observation && (
              <Typography variant="caption" color="text.secondary" component="p" sx={{ mt: 0.5 }}>
                {c.observation}
              </Typography>
            )}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

ContactsList.propTypes = {
  /** Contactos tal como los devuelve el servidor (`contactId`, `addressType`, `main`…). */
  contacts: PropTypes.array.isRequired,
  /** Qué hacer cuando no hay ninguno. */
  emptyText: PropTypes.string
};
