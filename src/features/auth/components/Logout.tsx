import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../hooks/UserContext';

type LogoutButton = {
  children: ({ handleLogout }: { handleLogout: () => void }) => void;
};

export const Logout = ({ children }: LogoutButton) => {
  const { user, handleRemoveUser } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (user) {
      handleRemoveUser();
      navigate('/login', { replace: true });
    }
  };

  return <>{children({ handleLogout })}</>;
};
