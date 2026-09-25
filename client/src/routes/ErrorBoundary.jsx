import { useEffect } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

// material-ui
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';

// ==============================|| ELEMENT ERROR - COMMON ||============================== //

/**
 * Un deploy nuevo cambia el hash de los chunks de Vite; una pestaña que
 * quedó abierta desde antes intenta cargar un chunk que ya no existe en el
 * servidor. No es un bug de la app — se resuelve solo con un reload.
 */
function isStaleDeployError(error) {
  if (!(error instanceof Error)) return false;
  const msg = error.message.toLowerCase();
  return (
    msg.includes('failed to fetch dynamically imported module') ||
    msg.includes('importing a module script failed') ||
    msg.includes('load module script') ||
    error.name === 'ChunkLoadError'
  );
}

export default function ErrorBoundary() {
  const error = useRouteError();

  useEffect(() => {
    if (isStaleDeployError(error)) {
      window.location.reload();
    }
  }, [error]);

  // isRouteErrorResponse solo es true para un 404 real de React Router (ruta
  // que no matchea ninguna definida) — esta app no tiene loaders/actions que
  // lancen un Response con otro status. Los errores de la API (401/403/409/
  // 503, con el mensaje real del servidor) NUNCA llegan hasta acá: viajan
  // por axios dentro de un componente, se atrapan en su propio try/catch y
  // se muestran con showError() de services/ToastService.js — ver
  // "Mensajes de error al usuario" en client/CLAUDE.md. No dupliques esa
  // ruta agregando casos por status acá, quedarían siempre inalcanzables.
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <ErrorMessage title="Página no encontrada">La página que buscas no existe.</ErrorMessage>;
    }
    return <ErrorMessage title={`Error ${error.status}`}>{error.statusText || 'Ha ocurrido un error.'}</ErrorMessage>;
  }

  if (isStaleDeployError(error)) {
    return <ErrorMessage title="Actualizando la aplicación">Hay una nueva versión disponible, recargando…</ErrorMessage>;
  }

  // Excepción no clasificada durante el render/loader de una ruta. Igual que
  // el criterio adoptado en error.middleware.js del servidor: nunca se
  // expone el mensaje/stack real de un error inesperado en producción, solo
  // en desarrollo (conveniencia de depuración) — ver SECURITY.md.
  return (
    <ErrorMessage title="Ha ocurrido un error inesperado">
      Intenta recargar la página. Si el problema persiste, contacta a sistemas.
      {import.meta.env.DEV && error instanceof Error && (
        <Box component="pre" sx={{ mt: 2, whiteSpace: 'pre-wrap', fontSize: 12 }}>
          {error.name}: {error.message}
          {'\n'}
          {error.stack}
        </Box>
      )}
    </ErrorMessage>
  );
}

function ErrorMessage({ title, children }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
      <Alert severity="error" sx={{ maxWidth: 640, width: '100%' }}>
        <AlertTitle>{title}</AlertTitle>
        {children}
      </Alert>
    </Box>
  );
}
