import { Button } from '@/components/Button';
import UndoIcon from '../../../assets/undo.svg?react';

import { useUpdateTask } from '../api/update-task';

type UndoTaskProps = {
  taskId: string;
};

export const UndoTask = ({ taskId }: UndoTaskProps) => {
  const { undoTaskMutation } = useUpdateTask();

  const handleUndoTask = () => undoTaskMutation.mutate({ taskId });

  return (
    <Button
      className="rounded-md"
      variant="text"
      size="icon"
      isLoading={undoTaskMutation.isPending}
      icon={<UndoIcon className="h-5 w-5 stroke-indigo-300" />}
      onClick={handleUndoTask}
    />
  );
};
