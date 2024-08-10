import { useCallback, useEffect, useReducer, useState } from 'react';
import { useRegister } from '../api/register';
import { useUserContext } from './UserContext';

export const TYPES = {
  SET_NICKNAME: 'SET_NICKNAME',
  SET_EMAIL: 'SET_EMAIL',
  SET_PASSWORD: 'SET_PASSWORD',
} as const;

type ActionTypes = (typeof TYPES)[keyof typeof TYPES];

type Action =
  | { type: typeof TYPES.SET_NICKNAME; payload: string }
  | { type: typeof TYPES.SET_EMAIL; payload: string }
  | { type: typeof TYPES.SET_PASSWORD; payload: string };

const initialState = {
  nickname: '',
  email: '',
  password: '',
};

function reducer(
  state: {
    [k in keyof typeof initialState]: (typeof initialState)[k];
  },
  action: Action,
) {
  switch (action.type) {
    case TYPES.SET_NICKNAME:
      return { ...state, nickname: action.payload };
    case TYPES.SET_EMAIL:
      return { ...state, email: action.payload };
    case TYPES.SET_PASSWORD:
      return { ...state, password: action.payload };
    default:
      return state;
  }
}

type UseRegisterFormProps = {
  onSuccess?: () => void;
};

export const useRegisterForm = ({
  onSuccess,
}: UseRegisterFormProps) => {
  // State
  const [state, dispatch] = useReducer(reducer, initialState);
  const { nickname, email, password } = state;
  const [error, setError] = useState('');

  // Mutation
  const {
    mutate,
    isPending,
    data: registerData,
    isSuccess,
  } = useRegister();

  const { handleSetUser } = useUserContext();

  // Handlers
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, type: ActionTypes) => {
      dispatch({ type, payload: e.target.value });
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (nickname && email && password) {
        setError('');
        mutate({
          data: {
            nickname,
            email,
            password,
          },
        });
      } else {
        setError('Some fields are empty');
      }
    },
    [mutate, nickname, email, password],
  );

  // Set user in locale storage
  useEffect(() => {
    if (isSuccess) {
      const user = registerData.data;

      if (!user) {
        setError('Something went wrong.');
      } else {
        handleSetUser({ id: user.id, nickname: user.nickname });
        onSuccess?.();
      }
    }
  }, [isSuccess, registerData, onSuccess, handleSetUser]);

  return {
    state,
    isPending,
    error,
    handleChange,
    handleSubmit,
  };
};
