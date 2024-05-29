import { Input } from '../../../components/Input';
import { useUpdateTask } from '../api/update-task';

import { cn } from '../../../utils/cn';

type CheckTaskProps = {
  taskId: string;
  isCompleted: boolean;
};

export const CheckTask = ({
  taskId,
  isCompleted,
}: CheckTaskProps) => {
  const { completeTaskMutation } = useUpdateTask();

  return (
    <Input
      className={cn(isCompleted && 'checked:opacity-50')}
      type="checkbox"
      checked={isCompleted}
      disabled={isCompleted}
      onChange={() => {
        completeTaskMutation.mutate({ taskId });
      }}
    />
  );
};
