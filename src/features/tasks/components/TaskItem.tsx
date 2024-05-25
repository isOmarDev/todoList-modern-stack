import { Task } from './TasksList';

export type TaskItemProps = Task;

export const TaskItem = ({ id, description }: TaskItemProps) => {
  return <li id={id}>{description}</li>;
};
