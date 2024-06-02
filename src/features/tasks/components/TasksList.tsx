import { TaskItem } from './TaskItem';
import SpinnerIcon from '../../../assets/spinner.svg?react';

export type Task = {
  id: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
};

export type TasksListProps = {
  emptyMsg: string;
  isPending: boolean;
  tasksItems: Task[] | undefined;
};

export const TasksList = ({
  emptyMsg,
  isPending,
  tasksItems,
}: TasksListProps) => {
  if (isPending) {
    return (
      <div>
        <SpinnerIcon className="mx-auto" />
      </div>
    );
  }

  if (!tasksItems?.length) {
    return <div>{emptyMsg}</div>;
  }

  return (
    <ul className="-mx-4">
      {tasksItems.map((task) => (
        <TaskItem task={task} key={task.id} />
      ))}
    </ul>
  );
};
