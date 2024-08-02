import { useMutation, useQueryClient } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { http } from '../../../lib/axios';

const createTask = ({ description }: { description: string }) => {
  return http.post('/tasks', {
    id: uuidv4(),
    description,
    isCompleted: false,
    createdAt: new Date(),
  });
};

type Options = {
  onSuccess?: () => void;
};

export const useCreateTask = (options?: Options) => {
  const queryClient = useQueryClient();

  const { onSuccess } = options || {};

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      onSuccess?.();
    },
  });
};
