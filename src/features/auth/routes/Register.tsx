import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { RegisterForm } from '../components/RegisterForm';

export const RegisterRoute = () => {
  const navigate = useNavigate();

  const onSuccess = useCallback(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  return (
    <AuthLayout
      title="Create new account"
      description="Already have an account?"
      link={{ path: '/login', text: 'Log in' }}
    >
      <RegisterForm onSuccess={onSuccess} />
    </AuthLayout>
  );
};
