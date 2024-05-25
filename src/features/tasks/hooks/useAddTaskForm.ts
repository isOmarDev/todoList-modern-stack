import { useRef, useState } from 'react';
import { useCreateTask } from '../api/create-task';

export const useAddTaskForm = () => {
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string>('');

  const mutation = useCreateTask();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
    if (e.target.value.trim() !== '') {
      setError('');
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (description.trim() === '') {
      setError('Field is empty');
      return;
    }

    mutation.mutate(
      { description },
      {
        onSuccess: () => {
          setDescription('');
          inputRef.current?.focus();
        },
      },
    );
  };

  return {
    description,
    error,
    inputRef,
    mutation,
    handleOnChange,
    handleSubmit,
  };
};
