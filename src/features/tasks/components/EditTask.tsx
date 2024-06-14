import { useUpdateTask } from '../api/update-task';
import EditIcon from '../../../assets/edit.svg?react';
import CheckIcon from '../../../assets/check.svg?react';
import { Button } from '@/components/Button';

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

  const handleUpdateTask = () => {
    if (isEditEnabled) {
      updateTask();
    } else {
      toggleEdit();
    }
  };

  return (
    <Button
      className="rounded-md hover:bg-[rgba(51,51,51)]"
      size="icon"
      icon={isEditEnabled ? <CheckIcon strokeWidth={1.8} /> : <EditIcon />}
      isLoading={updateTaskDescriptionMutation.isPending}
      onClick={handleUpdateTask}
    />
  );
};
