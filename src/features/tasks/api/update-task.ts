import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http } from '../../../lib/axios';

const completeTask = ({ taskId }: { taskId: string }) => {
  return http.patch(`/tasks/${taskId}`, { isCompleted: true });
};

const undoTask = ({ taskId }: { taskId: string }) => {
  return http.patch(`/tasks/${taskId}`, { isCompleted: false });
};

const updateTaskDescription = ({
  taskId,
  description,
}: {
  taskId: string;
  description: string;
}) => {
  return http.patch(`/tasks/${taskId}`, { description });
};

type Options = {
  onSuccess?: () => void;
};

export const useUpdateTask = (options?: Options) => {
  const queryClient = useQueryClient();

  const { onSuccess } = options || {};

  const mutationConfig = {
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['tasks'],
      });
      onSuccess?.();
    },
  };

  const completeTaskMutation = useMutation({
    ...mutationConfig,
    mutationFn: completeTask,
  });

  const undoTaskMutation = useMutation({
    ...mutationConfig,
    mutationFn: undoTask,
  });

  const updateTaskDescriptionMutation = useMutation({
    ...mutationConfig,
    mutationFn: updateTaskDescription,
  });

  return {
    completeTaskMutation,
    undoTaskMutation,
    updateTaskDescriptionMutation,
  };
};
