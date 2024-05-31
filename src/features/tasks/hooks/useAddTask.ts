import { useCallback, useRef, useState } from 'react';
import { useCreateTask } from '../api/create-task';

export const useAddTask = () => {
  // States
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);

  // Mutation
  const createTaskMutation = useCreateTask();

  // On change handler
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDescription(e.target.value);
      if (e.target.value.trim() !== '') {
        setError('');
      }
    },
    [],
  );

  // Submit new task
  const handleSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();

      const isDescriptionEmpty = description.trim() === '';

      if (isDescriptionEmpty) {
        setError('Field is empty');
        return;
      }

      createTaskMutation.mutate(
        { description },
        {
          onSuccess: () => {
            clearInput();
          },
        },
      );
    },
    [description, createTaskMutation],
  );

  const clearInput = () => {
    setDescription('');
    inputRef.current?.focus();
  };

  return {
    description,
    error,
    inputRef,
    createTaskMutation,
    handleChange,
    handleSubmit,
  };
};
