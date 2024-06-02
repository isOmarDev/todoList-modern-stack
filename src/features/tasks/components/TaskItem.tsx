import { DeleteTask } from './DeleteTask';
import { EditTask } from './EditTask';
import { CheckTask } from './CheckTask';
import { UndoTask } from './UndoTask';
import { Input } from '../../../components/Input';

import { useEditTask } from '../hooks/useEditTask';

import { cn } from '../../../utils/cn';
import { Task } from './TasksList';

export type TaskItemProps = {
  task: Task;
};

export const TaskItem = ({ task }: TaskItemProps) => {
  const { id, description, isCompleted } = task;

  const {
    state,
    isDescriptionChanged,
    inputRef,
    handleChange,
    toggleEdit,
  } = useEditTask({
    initialValue: description,
  });

  return (
    <li
      id={id}
      className={cn(
        `group mb-5 flex items-center rounded-lg bg-charcoal px-3 
        transition-colors duration-150 ease-in-out 
        last:mb-0 hover:bg-[#333333]`,
        isCompleted &&
          'bg-[rgba(41,41,41,0.5)] hover:bg-[rgba(51,51,51,0.5)]',
      )}
    >
      <div className="flex grow items-center">
        <CheckTask taskId={id} isCompleted={isCompleted} />

        <div className="grow">
          <Input
            className={cn(
              'bg-transparent hover:bg-transparent',
              isCompleted && 'text-opacity-50',
            )}
            ref={inputRef}
            type="text"
            name="description"
            value={state.description}
            readOnly={isCompleted || !state.isEditEnabled}
            onChange={handleChange}
          />
        </div>
      </div>

      <div
        className={cn(
          'flex items-center py-[20px]',
          isCompleted &&
            'opacity-50 transition-opacity duration-150 ease-in-out group-hover:opacity-100',
        )}
      >
        {isCompleted ? (
          <UndoTask taskId={id} />
        ) : (
          <EditTask
            taskId={id}
            inputRef={inputRef}
            isDescriptionChanged={isDescriptionChanged}
            description={state.description}
            isEditEnabled={state.isEditEnabled}
            toggleEdit={toggleEdit}
          />
        )}

        <DeleteTask taskId={id} />
      </div>
    </li>
  );
};
