import { useDeleteTask } from '../api/delete-task';
import TrashIcon from '../../../assets/trash.svg?react';

type DeleteTaskProps = {
  taskId: string;
};

export const DeleteTask = ({ taskId }: DeleteTaskProps) => {
  const { mutate } = useDeleteTask();

  return (
    <button
      className="rounded-full p-2"
      onClick={() => mutate({ taskId })}
    >
      <TrashIcon />
    </button>
  );
};
