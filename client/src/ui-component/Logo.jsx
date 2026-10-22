import Box from '@mui/material/Box';

import logo from 'assets/images/interadminpro.png';

// La imagen (1047 × 302) trae un margen transparente. Se recorta con CSS para
// que `height` sea la altura del logo visible y no la del lienzo; se dejan 3 px
// de holgura por lado para que el redondeo al escalar no corte los bordes.
const IMAGE = { width: 1047, height: 302 };
const CONTENT = { left: 36, top: 34, width: 980, height: 222 };

// ==============================|| LOGO ||============================== //

export default function Logo({ height = 48 }) {
  const scale = height / CONTENT.height;

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', width: CONTENT.width * scale, height }}>
      <img
        src={logo}
        alt="interAdmin PRO"
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
