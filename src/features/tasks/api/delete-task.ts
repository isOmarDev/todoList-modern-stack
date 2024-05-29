import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http } from '../../../lib/axios';

type UseAddTask = {
  onSuccess?: () => void;
};

const deleteTask = ({ taskId }: { taskId: string }) => {
  console.log(taskId);

  return http.delete(`/tasks/${taskId}`);
};

export const useDeleteTask = (options?: UseAddTask) => {
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
