import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const RestrictedRoute = ({
  children,
}: ProtectedRouteProps) => {
  const { state } = useLocation(); // test
  
  if (state) {
    return <Navigate to="/" replace />;
  }

  return children;
};
