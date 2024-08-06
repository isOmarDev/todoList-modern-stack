import { Button } from '@/components/Button';
import TrashIcon from '@/assets/trash.svg?react';

import { useDeleteTask } from '../api/delete-task';

type DeleteTaskProps = {
  taskId: string;
};

export const DeleteTask = ({ taskId }: DeleteTaskProps) => {
  const { mutate } = useDeleteTask();

  const handleDeleteTask = () => {
    mutate({ taskId });
  };

  return (
    <Button
      className="rounded-md"
      variant="text"
      size="icon"
      onClick={handleDeleteTask}
    >
      <TrashIcon />
    </Button>
  );
};
