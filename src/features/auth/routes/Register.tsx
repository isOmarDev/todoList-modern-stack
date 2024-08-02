import { AuthLayout } from '../layouts/AuthLayout';
import { RegisterForm } from '../components/RegisterForm';

export const RegisterRoute = () => {
  return (
    <AuthLayout
      title="Create new account"
      description="Already have an account?"
      link={{ path: '/login', text: 'Log in' }}
    >
      <RegisterForm />
    </AuthLayout>
  );
};
