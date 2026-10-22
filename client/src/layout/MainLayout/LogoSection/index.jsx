import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Link from '@mui/material/Link';

// project imports
import { DASHBOARD_PATH } from 'config';
import Logo from 'ui-component/Logo';

// ==============================|| MAIN LOGO ||============================== //

export default function LogoSection() {
  return (
    <Link component={RouterLink} to={DASHBOARD_PATH} aria-label="theme-logo">
      {/* 40 px: así el logo (≈ 177 px de ancho) cabe junto al botón del menú en los 228 px del encabezado */}
      <Logo height={40} />
    </Link>
  );
}
