import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { base44 } from "@/api/base44Client";
import { currentUrl } from "@/lib/authReturnTo";

const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoadingAuth, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const refresh = async () => {
    if (!base44.auth.hasToken()) { setUser(null); setLoading(false); return null; }
    try { const current = await base44.auth.me(); setUser(current); setAuthError(null); return current; }
    catch (error) { setUser(null); setAuthError({ type: "unknown", message: error.message }); return null; }
    finally { setLoading(false); }
  };
  useEffect(() => { refresh(); }, []);
  const value = useMemo(() => ({
    user, isAuthenticated: Boolean(user), isLoadingAuth, authError, refresh,
    logout: async () => { await base44.auth.logout(); setUser(null); },
    navigateToLogin: () => base44.auth.redirectToLogin(currentUrl()),
  }), [user, isLoadingAuth, authError]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within <AuthProvider>");
  return context;
}
