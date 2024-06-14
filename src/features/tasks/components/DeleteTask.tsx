import TrashIcon from '../../../assets/trash.svg?react';
import { Button } from '@/components/Button';

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
      className="rounded-md hover:bg-[rgba(51,51,51)]"
      size="icon"
      onClick={handleDeleteTask}
    >
      <TrashIcon />
    </Button>
  );
};
