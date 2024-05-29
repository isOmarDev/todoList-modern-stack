import { useUpdateTask } from '../api/update-task';
import UndoIcon from '../../../assets/undo.svg?react';

type UndoTaskProps = {
  taskId: string;
};

export const UndoTask = ({ taskId }: UndoTaskProps) => {
  const { undoTaskMutation } = useUpdateTask();

  return (
    <button
      className="rounded-full p-2"
      onClick={() => undoTaskMutation.mutate({ taskId })}
    >
      <UndoIcon className="h-5 w-5 stroke-indigo-300" />
    </button>
  );
};
