import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { User } from '../types/api';

type AuthContextType = {
  user: {
    id: string;
    nickname: string;
  } | null;
  handleSetUser: (userData: { id: string; nickname: string }) => void;
  handleRemoveUser: () => void;
};

// Create Auth Context
export const AuthContext = createContext<AuthContextType | null>(
  null,
);

// Auth Context hook
// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
  const userContext = useContext(AuthContext);

  if (!userContext) {
    throw new Error(
      'useUserContext has to be used within <UserContext.Provider>',
    );
  }

  return userContext;
};

// Auth Provider
type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<Pick<
    User,
    'id' | 'nickname'
  > | null>(() => {
    try {
      const userString = localStorage.getItem('user');

      if (!userString) {
        window.history.replaceState({}, '', '/');
      } else {
        const user = JSON.parse(userString);
        return user;
      }
    } catch (error) {
      throw new Error('Error parsing user from localstorage');
    }
  });

  const handleSetUser = useCallback(
    ({ id, nickname }: { id: string; nickname: string }) => {
      setUser({ id, nickname });

      const userJSON = JSON.stringify({
        id,
        nickname,
      });
      localStorage.setItem('user', userJSON);
    },
    [],
  );

  const handleRemoveUser = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  const value = useMemo(
    () => ({ user, handleSetUser, handleRemoveUser }),
    [handleRemoveUser, handleSetUser, user],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
