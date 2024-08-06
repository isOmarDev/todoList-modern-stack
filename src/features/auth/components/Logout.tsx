import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

type LogoutButton = {
  children: ({ handleLogout }: { handleLogout: () => void }) => void;
};

export const Logout = ({ children }: LogoutButton) => {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (user) {
      localStorage.removeItem('user');
      navigate('/login', { replace: true });
    }
  };

  return <>{children({ handleLogout })}</>;
};
