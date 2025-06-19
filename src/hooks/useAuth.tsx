
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Verificar se há token salvo no localStorage ao inicializar
    const savedToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('authUser');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (credentials: { username: string; password: string }) => {
    // Simular autenticação - em produção, fazer chamada para API
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      const mockUser: User = {
        id: '1',
        name: 'Administrador',
        username: 'admin',
        role: 'Admin'
      };
      const mockToken = 'mock-jwt-token-12345';
      
      setUser(mockUser);
      setToken(mockToken);
      
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('authUser', JSON.stringify(mockUser));
    } else {
      throw new Error('Credenciais inválidas');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      logout,
      isAuthenticated: !!user && !!token
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
