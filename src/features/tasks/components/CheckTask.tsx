import React from 'react';

import { Input } from '../../../components/Input';
import { useUpdateTask } from '../api/update-task';

import { cn } from '../../../utils/cn';

type CheckTaskProps = {
  taskId: string;
  isCompleted: boolean;
};

export const CheckTask = React.memo(
  ({ taskId, isCompleted }: CheckTaskProps) => {
    const { completeTaskMutation } = useUpdateTask();

    const handleCompleteTask = () => {
      completeTaskMutation.mutate({ taskId });
    };

    return (
      <Input
        className={cn(isCompleted && 'checked:opacity-50')}
        type="checkbox"
        checked={isCompleted}
        disabled={isCompleted}
        onChange={handleCompleteTask}
      />
    );
  },
);
