import { createContext, useContext, useState, useEffect } from 'react';
import { mockHomeowner } from '../data/mockHomeowner';

const AuthContext = createContext(null);

const STORAGE_KEY = 'homesorted_homeowner_session';

export function AuthProvider({ children }) {
  const [homeowner, setHomeowner] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setHomeowner(JSON.parse(saved));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    if (email === 'robert@homesorted.ie' && password === 'HomeSorted7642489f') {
      const user = { ...mockHomeowner };
      setHomeowner(user);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      setIsLoading(false);
      return { success: true };
    }
    setIsLoading(false);
    return { success: false, message: 'Invalid email or password.' };
  };

  const logout = () => {
    setHomeowner(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateHomeowner = (updates) => {
    const updated = { ...homeowner, ...updates };
    setHomeowner(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        homeowner,
        isAuthenticated: !!homeowner,
        isLoading,
        login,
        logout,
        updateHomeowner,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
