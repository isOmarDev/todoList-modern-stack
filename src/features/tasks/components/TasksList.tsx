import { useState } from 'react';
import { TaskItem } from './TaskItem';

export type Task = {
  id: string;
  description: string;
  isComplete: boolean;
};

export const TasksList = () => {
  const [tasks] = useState<Task[]>([
    { id: 'ad2123', description: 'Go to gym', isComplete: false },
  ]);

  return (
    <ul>
      {/* {tasks.map((task) => (
        <TaskItem {...task} key={task.id} />
      ))} */}
    </ul>
  );
};
