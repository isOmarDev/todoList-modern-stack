import { useUpdateTask } from '../api/update-task';
import EditIcon from '../../../assets/edit.svg?react';
import CheckIcon from '../../../assets/check.svg?react';

type EditTaskProps = {
  inputRef: React.RefObject<HTMLInputElement>;
  taskId: string;
  description: string;
  isDescriptionChanged: boolean;
  isEditEnabled: boolean;
  toggleEdit: () => void;
};

export const EditTask = ({
  inputRef,
  taskId,
  description,
  isDescriptionChanged,
  isEditEnabled,
  toggleEdit,
}: EditTaskProps) => {
  const { updateTaskDescriptionMutation } = useUpdateTask();

  const updateTask = () => {
    const isDescriptionEmpty = description.trim() === '';

    if (isDescriptionEmpty) {
      inputRef.current?.focus();
      return;
    }

    if (!isDescriptionChanged) {
      toggleEdit();
      return;
    }

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

  const handleClick = () => {
    if (isEditEnabled) {
      updateTask();
    } else {
      toggleEdit();
    }
  };

  return (
    <button className="rounded-full p-2" onClick={handleClick}>
      {isEditEnabled ? <CheckIcon /> : <EditIcon />}
    </button>
  );
};
