import PropTypes from 'prop-types';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Cookies from 'js-cookie';
import { loginAPI, logoutAPI, verifyTokenAPI } from 'api/requests/authAPI';

// ==============================|| AUTH CONTEXT ||============================== //

export const AuthContext = createContext(undefined);

// ─── Helpers para leer cookies ────────────────────────────────────────────────
const getStoredUser = () => {
  try {
    const raw = Cookies.get('id');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

// ==============================|| AUTH PROVIDER ||============================== //

export function AuthProvider({ children }) {
  const [user, setUser]                   = useState(getStoredUser);
  const [permissions, setPermissions]     = useState([]);
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState(null);
  const [initializing, setInitializing]   = useState(true); // ✅

const isAuthenticated = useMemo(
  () => !!user,
  [user]
);

  // ── Verificar sesión al montar ─────────────────────────────────────────────
  // La cookie de sesión es httpOnly (no legible desde JS), así que no hay forma
  // de saber de antemano si existe: siempre se pregunta al backend, que la
  // recibe automáticamente (withCredentials) si el navegador la tiene.
  useEffect(() => {
    const verifySession = async () => {
      try {
        const { data } = await verifyTokenAPI();
        setUser({
          useId: data.useId,
          username: data.username,
          fullName: data.fullName,
          useEmail: data.email,
          proId: data.proId,
          proName: data.profileName,
        });
        setPermissions(data.permissions ?? []);
        Cookies.set('id', JSON.stringify({
          useId: data.useId,
          username: data.username,
          fullName: data.fullName,
          useEmail: data.email,
          proId: data.proId,
          proName: data.profileName,
        }), { expires: 1 });
      } catch {
        Cookies.remove('id');
        setUser(null);
        setPermissions([]);
      } finally {
        setInitializing(false); // ✅ siempre se ejecuta, tanto en éxito como en error
      }
    };

    verifySession();
  }, []);

  // ── Login ──────────────────────────────────────────────────────────────────
  const login = useCallback(async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await loginAPI(credentials);

      // El backend fija la sesión vía cookie httpOnly; el body solo trae los
      // datos del usuario: { useId, username, fullName, email, proId, profileName, permissions }
      const { permissions, ...user } = data;

      Cookies.set('id', JSON.stringify(user), { expires: 1 });

      setUser(user);
      setPermissions(permissions ?? []);

      return data;
    } catch (err) {
      const msg = err.response?.data?.message ?? 'Error al iniciar sesión';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  // ── Logout ─────────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    try { await logoutAPI(); } catch { /* silencioso */ }
    Cookies.remove('id');
    setUser(null);
    setPermissions([]);
  }, []);

  // ── Verificar permiso puntual ──────────────────────────────────────────────
  const hasPermission = useCallback(
    (perId) => {
      if (perId === null || perId === undefined) return true;
      if (!user) return false;
      if (user.useId === 1) return true; // superadmin     
      return permissions.includes(perId);
    },
    [permissions, user]
  );

  const value = useMemo(
    () => ({
      user,
      permissions,
      loading,
      error,
      isAuthenticated,
      initializing,
      login,
      logout,
      hasPermission,
    }),
    [user, permissions, loading, error, isAuthenticated, initializing, login, logout, hasPermission]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = { children: PropTypes.node };

// ── Hook de acceso rápido ──────────────────────────────────────────────────────
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
};