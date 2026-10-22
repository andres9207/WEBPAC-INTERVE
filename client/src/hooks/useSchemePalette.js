import { useColorScheme, useTheme } from '@mui/material/styles';

// ==============================|| PALETA DEL TEMA ACTIVO (DEC-073) ||============================== //

// `theme.palette` es siempre la del tema claro; `theme.vars` da variables CSS,
// que no sirven donde se necesita el color resuelto (gráficos de ApexCharts,
// contraste calculado). Este hook devuelve la paleta del tema activo.
export default function useSchemePalette() {
  const theme = useTheme();
  const { colorScheme } = useColorScheme();
  return theme.colorSchemes[colorScheme]?.palette ?? theme.palette;
}
