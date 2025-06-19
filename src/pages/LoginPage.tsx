
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/Auth/LoginForm';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (credentials: { username: string; password: string }) => {
    setIsLoading(true);
    try {
      await login(credentials);
      toast.success('Login realizado com sucesso!');
      navigate('/clientes');
    } catch (error) {
      toast.error('Credenciais inválidas. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return <LoginForm onLogin={handleLogin} isLoading={isLoading} />;
};

export default LoginPage;
