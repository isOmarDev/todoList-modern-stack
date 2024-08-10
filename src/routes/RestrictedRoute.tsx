import { useUserContext } from '@/features/auth/hooks/UserContext';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const RestrictedRoute = ({
  children,
}: ProtectedRouteProps) => {
  const { user } = useUserContext();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};
