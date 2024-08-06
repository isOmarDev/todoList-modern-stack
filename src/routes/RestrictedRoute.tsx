import { useUser } from '@/features/auth/hooks/useUser';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const RestrictedRoute = ({
  children,
}: ProtectedRouteProps) => {
  const { user } = useUser();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};
