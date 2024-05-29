import { useUpdateTask } from '../api/update-task';
import EditIcon from '../../../assets/edit.svg?react';
import CheckIcon from '../../../assets/check.svg?react';

type EditTaskProps = {
  taskId: string;
  description: string;
  isEditEnabled: boolean;
  toggleEdit: () => void;
};

export const EditTask = ({
  taskId,
  description,
  isEditEnabled,
  toggleEdit,
}: EditTaskProps) => {
  const { updateTaskDescriptionMutation } = useUpdateTask();

  const updateTask = () => {
    updateTaskDescriptionMutation.mutate(
      { taskId, description },
      {
        onSuccess: () => {
          toggleEdit();
        },
        onError: () => {
          toggleEdit();
        },
      },
    );
  };

  return (
    <button
      className="rounded-full p-2"
      onClick={isEditEnabled ? updateTask : toggleEdit}
    >
      {isEditEnabled ? <CheckIcon /> : <EditIcon />}
    </button>
  );
};
