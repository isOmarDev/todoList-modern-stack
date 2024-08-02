import { LoginForm } from '../components/LoginForm';
import { AuthLayout } from '../layouts/AuthLayout';

export const LoginRoute = () => {
  return (
    <AuthLayout
      title="Welcome back!"
      description="Don't have an account?"
      link={{ path: '/register', text: 'Create one' }}
    >
      <LoginForm />
    </AuthLayout>
  );
};
