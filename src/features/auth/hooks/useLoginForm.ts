import { useCallback, useEffect, useState } from 'react';
import { useLogin } from '../api/login';
import { useUserContext } from './UserContext';

type UseLoginFormProps = {
  onSuccess?: () => void;
};

export const useLoginForm = ({ onSuccess }: UseLoginFormProps) => {
  // State
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { handleSetUser } = useUserContext();

  // Mutation
  const {
    isFetching,
    data: userData,
    refetch,
    isSuccess,
  } = useLogin({ nickname, password });

  // Handlers
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (nickname && password) {
        setError('');
        refetch();
      } else {
        setError('Some fields are empty');
      }
    },
    [nickname, password, refetch],
  );

  // Set user in locale storage
  useEffect(() => {
    if (isSuccess) {
      const user = userData?.data[0];

      if (!user) {
        setError('Wrong nickname or password');
      } else {
        handleSetUser({ id: user.id, nickname: user.nickname });
        onSuccess?.();
      }
    }
  }, [isSuccess, userData, onSuccess, handleSetUser]);

  return {
    nickname,
    password,
    isFetching,
    error,
    setNickname,
    setPassword,
    handleSubmit,
  };
};
