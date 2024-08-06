import { useMutation } from '@tanstack/react-query';
import { AxiosPromise } from 'axios';
import { http } from '../../../lib/axios';
import { User } from '../types/api';

type RegisterProps = {
  data: {
    nickname: string;
    email: string;
    password: string;
  };
};

const register = ({ data }: RegisterProps): AxiosPromise<User> => {
  return http.post(`/users`, { ...data, createdAt: new Date() });
};

type Options = {
  onSuccess?: () => void;
};

export const useRegister = (options?: Options) => {
  const { onSuccess } = options || {};

  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      onSuccess?.();
    },
  });
};
