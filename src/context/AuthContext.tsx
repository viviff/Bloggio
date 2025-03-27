import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/airtable';

export type UserRole = 'visitor' | 'user' | 'admin';

export interface User {
  id: string;
  idUser: string;
  name: string;
  email: string;
  role: UserRole;
  credits: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  clearErrors: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const userData = await authService.login(email, password);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      // Note: L'authentification Google devra être implémentée séparément
      // Pour l'instant, on utilise un mock
      const userData: User = {
        id: '2',
        idUser: '2',
        name: 'Google User',
        email: 'google@example.com',
        role: 'user',
        credits: 100
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (err) {
      setError('La connexion Google a échoué. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const userData = await authService.register(name, email, password);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur d\'inscription');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const clearErrors = () => {
    setError(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        loginWithGoogle,
        register,
        logout,
        isAuthenticated,
        isAdmin,
        clearErrors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
