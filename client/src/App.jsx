import { RouterProvider } from 'react-router-dom';
import { useColorScheme } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { esES } from '@mui/x-date-pickers/locales';
import { es } from 'date-fns/locale';

// routing
import router from 'routes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import ThemeCustomization from 'themes';

// auth provider
import { AuthContext, AuthProvider } from 'contexts/AuthContext';
import { SocketProvider } from 'socket/SocketProvider';

// Los avisos siguen el tema activo (DEC-073).
function ThemedToastContainer() {
  const { colorScheme } = useColorScheme();
  return <ToastContainer position="top-right" autoClose={3000} theme={colorScheme === 'dark' ? 'dark' : 'light'} />;
}

// ==============================|| APP ||============================== //

export default function App() {
  return (
    <ThemeCustomization>
      {/* Fechas en español (DateField): DD/MM/AAAA, semana desde el lunes. */}
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={es}
        localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}
      >
        <AuthProvider>
          <AuthContext.Consumer>
            {({ user }) => (
              <SocketProvider userId={user?.useId}>
                <NavigationScroll>
                  <>
                    <RouterProvider router={router} />
                    <ThemedToastContainer />
                  </>
                </NavigationScroll>
              </SocketProvider>
            )}
          </AuthContext.Consumer>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeCustomization>
  );
}
