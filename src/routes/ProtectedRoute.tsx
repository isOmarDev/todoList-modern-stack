import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { pathname, state } = useLocation(); // test

  if (state) {
    return (
      <Navigate to="/login" replace state={{ from: pathname }} />
    );
  }

  return children;
};
