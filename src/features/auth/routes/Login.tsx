import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import { AuthLayout } from '../layouts/AuthLayout';

export const LoginRoute = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const redirectTo = state?.from;

  const onSuccess = useCallback(() => {
    navigate(`${redirectTo ? `${redirectTo}` : '/'}`, {
      replace: true,
    });
  }, [navigate, redirectTo]);

  return (
    <AuthLayout
      title="Welcome back!"
      description="Don't have an account?"
      link={{ path: '/register', text: 'Create one' }}
    >
      <LoginForm onSuccess={onSuccess} />
    </AuthLayout>
  );
};
