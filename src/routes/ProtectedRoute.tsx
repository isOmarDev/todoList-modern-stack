import { Navigate, useLocation } from 'react-router-dom';
import { useUserContext } from '@/features/auth/hooks/UserContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useUserContext();
  const { pathname } = useLocation();

  if (!user) {
    return (
      <Navigate to="/login" replace state={{ from: pathname }} />
    );
  }

  return children;
};
