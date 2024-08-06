import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '@/features/auth/hooks/useUser';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useUser();
  const { pathname } = useLocation(); // test

  if (!user) {
    return <Navigate to="/login" replace state={{ from: pathname }} />;
  }

  return children;
};
