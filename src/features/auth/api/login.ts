import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http } from '../../../lib/axios';

type LoginProps = {
  data: {
    email: string;
    password: string;
  };
};

const login = ({ data }: LoginProps) => {
  return http.post('/login', data);
};

type Options = {
  onSuccess?: () => void;
};

export const useLogin = (options?: Options) => {
  const queryClient = useQueryClient();

  const { onSuccess } = options || {};

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      onSuccess?.();
    },
  });
};
