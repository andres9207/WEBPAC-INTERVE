import Box from '@mui/material/Box';

import logo from 'assets/images/interve.png';

// La imagen (2359 × 1005) trae un margen blanco amplio. Se recorta con CSS para
// que `height` sea la altura del logo visible y no la del lienzo.
const IMAGE = { width: 2359, height: 1005 };
const CONTENT = { left: 160, top: 150, width: 2050, height: 745 };

// ==============================|| LOGO ||============================== //

export default function Logo({ height = 48 }) {
  const scale = height / CONTENT.height;

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', width: CONTENT.width * scale, height }}>
      <img
        src={logo}
        alt="Interve - Interventoría y Supervisión Técnica"
        style={{
          position: 'absolute',
          width: IMAGE.width * scale,
          height: IMAGE.height * scale,
          left: -CONTENT.left * scale,
          top: -CONTENT.top * scale,
          maxWidth: 'none'
        }}
      />
    </Box>
  );
}
