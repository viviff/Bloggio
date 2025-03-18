
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'visitor' | 'user' | 'admin';

export interface User {
  id: string;
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

// Mock authentication function - would be replaced with real backend
const mockAuth = async (email: string, password: string): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // This is just for demonstration - in a real app, this would verify credentials
      resolve({
        id: '1',
        name: 'Demo User',
        email: email,
        role: email.includes('admin') ? 'admin' : 'user',
        credits: 100
      });
    }, 1000);
  });
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
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
      const userData = await mockAuth(email, password);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      // In a real implementation, this would integrate with Google Auth
      const userData: User = {
        id: '2',
        name: 'Google User',
        email: 'google@example.com',
        role: 'user',
        credits: 100
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (err) {
      setError('Google login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      // Mock registration - would be replaced with a real API call
      const userData: User = {
        id: '3',
        name: name,
        email: email,
        role: 'user',
        credits: 50 // New users get 50 credits
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (err) {
      setError('Registration failed. Please try again.');
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
