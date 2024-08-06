import { AxiosPromise } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { http } from '../../../lib/axios';
import { User } from '../types/api';

type LoginProps = {
  nickname: string;
  password: string;
};

const login = ({
  nickname,
  password,
}: LoginProps): AxiosPromise<User[]> => {
  const encodedNickName = encodeURIComponent(nickname);
  const encodedpassword = encodeURIComponent(password);

  return http.get(`/users`, {
    params: {
      nickname: encodedNickName,
      password: encodedpassword,
    },
  });
};

type UseLoginProps = {
  nickname: string;
  password: string;
};

export const useLogin = ({ nickname, password }: UseLoginProps) => {
  return useQuery({
    queryKey: ['users', { nickname, password }],
    queryFn: () => login({ nickname, password }),
    enabled: false,
    gcTime: 0,
  });
};
