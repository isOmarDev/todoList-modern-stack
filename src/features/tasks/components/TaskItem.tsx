import { useReducer, useRef } from 'react';

import { DeleteTask } from './DeleteTask';
import { EditTask } from './EditTask';
import { CheckTask } from './CheckTask';
import { UndoTask } from './UndoTask';
import { Input } from '../../../components/Input';

import { cn } from '../../../utils/cn';
import { Task } from './TasksList';

type ACTIONTYPE =
  | { type: 'enable-edit' }
  | { type: 'change'; payload: string };

const initalState = {
  description: '',
  isEditEnabled: false,
};

function reducer(
  state: { [k in keyof typeof initalState]: (typeof initalState)[k] },
  action: ACTIONTYPE,
) {
  switch (action.type) {
    case 'enable-edit':
      return { ...state, isEditEnabled: !state.isEditEnabled };
    case 'change':
      return { ...state, description: action.payload };
    default:
      return state;
  }
}

export type TaskItemProps = {
  task: Task;
};

export const TaskItem = ({ task }: TaskItemProps) => {
  const { id, description, isCompleted } = task;

  const [state, dispatch] = useReducer(reducer, {
    ...initalState,
    description,
  });

  const toggleEdit = () => {
    dispatch({ type: 'enable-edit' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'change', payload: e.target.value });
  };

  return (
    <li
      id={id}
      className={cn(
        'mb-5 flex items-center rounded-lg bg-charcoal px-3 transition-colors duration-150 ease-in-out first:mt-4 last:mb-0 hover:bg-[#333333]',
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
            type="text"
            name="description"
            value={state.description}
            readOnly={isCompleted || !state.isEditEnabled}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex items-center px-[15px] py-[20px]">
        {isCompleted ? (
          <>
            <UndoTask taskId={id} />
            <DeleteTask taskId={id} />
          </>
        ) : (
          <>
            <EditTask
              taskId={id}
              description={state.description}
              isEditEnabled={state.isEditEnabled}
              toggleEdit={toggleEdit}
            />
            <DeleteTask taskId={id} />
          </>
        )}
      </div>
    </li>
  );
};
