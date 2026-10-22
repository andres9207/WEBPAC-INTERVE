import { useState } from 'react';

// material-ui
import { useColorScheme, useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

// project imports
import { updateThemeModeAPI } from 'api/requests/authAPI';
import { showError } from 'services/ToastService';

// assets
import { IconMoon, IconSun } from '@tabler/icons-react';

// ==============================|| HEADER - MODO CLARO / OSCURO (DEC-073) ||============================== //

export default function ThemeModeSection() {
  const theme = useTheme();
  const { colorScheme, setMode } = useColorScheme();
  const [saving, setSaving] = useState(false);

  const isDark = colorScheme === 'dark';
  const label = isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';

  // Cambia de inmediato y lo guarda en el usuario; si no se guarda, vuelve atrás.
  const handleToggle = async () => {
    if (saving) return;
    const previous = isDark ? 'dark' : 'light';
    const next = isDark ? 'light' : 'dark';
    setMode(next);
    setSaving(true);
    try {
      await updateThemeModeAPI(next);
    } catch (err) {
      setMode(previous);
      showError(err.response?.data?.message || 'No se pudo guardar el tema');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ ml: 2 }}>
      <Tooltip title={label}>
        <Avatar
          variant="rounded"
          component="button"
          type="button"
          aria-label={label}
          aria-pressed={isDark}
          onClick={handleToggle}
          sx={{
            ...theme.typography.commonAvatar,
            ...theme.typography.mediumAvatar,
            border: 'none',
            transition: 'all .2s ease-in-out',
            color: theme.vars.palette.secondary.dark,
            background: theme.vars.palette.secondary.light,
            '&:hover, &:focus-visible': {
              color: theme.vars.palette.secondary.light,
              background: theme.vars.palette.secondary.dark
            }
          }}
        >
          {isDark ? <IconSun stroke={1.5} size="20px" /> : <IconMoon stroke={1.5} size="20px" />}
        </Avatar>
      </Tooltip>
    </Box>
  );
}
