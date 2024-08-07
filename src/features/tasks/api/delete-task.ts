import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http } from '../../../lib/axios';

const deleteTask = ({ taskId }: { taskId: string }) => {
  return http.delete(`/tasks/${taskId}`);
};

type Options = {
  onSuccess?: () => void;
};

export const useDeleteTask = (options?: Options) => {
  const queryClient = useQueryClient();

  const { onSuccess } = options || {};

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      onSuccess?.();
    },
  });
};
