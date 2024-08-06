import { useCallback, useEffect, useState } from 'react';
import { useLogin } from '../api/login';

type UseLoginFormProps = {
  onSuccess?: () => void;
};

export const useLoginForm = ({ onSuccess }: UseLoginFormProps) => {
  // State
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
        const userJSON = JSON.stringify({
          id: user.id,
          nickname: user.nickname,
        });
        localStorage.setItem('user', userJSON);
        onSuccess?.();
      }
    }
  }, [isSuccess, userData, onSuccess]);

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
