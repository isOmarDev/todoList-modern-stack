import { useCallback, useRef, useState } from 'react';
import { useCreateTask } from '../api/create-task';

type UseAddTaskProps = {
  userId: string | undefined;
};

export const useAddTask = ({ userId }: UseAddTaskProps) => {
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
      if (e.target.value.trim() !== '' && error) {
        setError('');
      }
    },
    [error],
  );

  // Submit new task
  const handleSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();

      const isDescriptionEmpty = description.trim() === '';

      if (isDescriptionEmpty) {
        setError('Field is empty');
        inputRef.current?.focus();
        return;
      }

      createTaskMutation.mutate(
        { userId, description },
        {
          onSuccess: () => {
            clearInput();
            inputRef.current?.focus();
          },
        },
      );
    },
    [description, createTaskMutation, userId],
  );

  const clearInput = () => {
    setDescription('');
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
