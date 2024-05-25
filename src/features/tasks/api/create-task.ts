import { useMutation } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { http } from '../../../lib/axios';

type UseAddTask = {
  onSuccess?: () => void;
};

const createTask = ({ description }: { description: string }) => {
  return http.post('/tasks', {
    id: uuidv4(),
    description,
    isCompleted: false,
  });
};

export const useCreateTask = (options?: UseAddTask) => {
  const { onSuccess } = options || {};
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      onSuccess?.();
    },
  });
};
