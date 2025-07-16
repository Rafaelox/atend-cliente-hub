
import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';

interface User {
  id: string;
  name: string;
  username: string;
  role: string;
}

interface LoginResponse {
  token: string;
  user: User;
  expiresAt?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
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
    try {
      // Verificar se API está configurada
      if (!apiClient.isConfigured()) {
        throw new Error('API não configurada. Configure a API primeiro em Configurações.');
      }

      // Fazer login via API
      const response = await apiClient.login(credentials) as LoginResponse;
      
      if (response.token && response.user) {
        setUser(response.user);
        setToken(response.token);
        
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('authUser', JSON.stringify(response.user));
      } else {
        throw new Error('Resposta inválida da API');
      }
    } catch (error) {
      // Fallback para credenciais locais se API falhar
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        const mockUser: User = {
          id: '1',
          name: 'Administrador Local',
          username: 'admin',
          role: 'Admin'
        };
        const mockToken = 'local-mock-token-12345';
        
        setUser(mockUser);
        setToken(mockToken);
        
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('authUser', JSON.stringify(mockUser));
      } else {
        throw error;
      }
    }
  };

  const logout = async () => {
    try {
      // Tentar fazer logout via API se configurada
      if (apiClient.isConfigured()) {
        await apiClient.logout();
      }
    } catch (error) {
      console.error('Erro no logout da API:', error);
    } finally {
      // Sempre limpar dados locais
      setUser(null);
      setToken(null);
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
    }
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
