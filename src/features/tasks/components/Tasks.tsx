import { useMemo } from 'react';
import { AddTask } from './AddTask';
import {
  Tabs,
  TabsList,
  TabsPanels,
  Tab,
  TabPanel,
} from '@/components/Tabs';
import { TasksList } from './TasksList';
import { useFetchTasks } from '../api/get-tasks';
import { useUserContext } from '@/features/auth/hooks/UserContext';
import {
  ALL_TASKS,
  ACTIVE_TASKS,
  COMPLETED_TASKS,
} from '../constants/tasksTypes';

export const Tasks = () => {
  const { user } = useUserContext();

  const { isPending, data } = useFetchTasks({ userId: user?.id });

  const activeTasks = useMemo(
    () => data?.data.filter((task) => !task.isCompleted),
    [data?.data],
  );

  const CompletedTasks = useMemo(
    () => data?.data.filter((task) => task.isCompleted),
    [data?.data],
  );

  return (
    <div className="mt-[50px]">
      <AddTask />

      <div className="mt-7">
        <Tabs>
          <TabsList>
            <Tab>{ALL_TASKS}</Tab>
            <Tab>{ACTIVE_TASKS}</Tab>
            <Tab>{COMPLETED_TASKS}</Tab>
          </TabsList>

          <TabsPanels className="mt-5">
            <TabPanel>
              <TasksList
                isPending={isPending}
                emptyMsg="No tasks"
                tasksItems={data?.data}
              />
            </TabPanel>

            <TabPanel>
              <TasksList
                isPending={isPending}
                emptyMsg="No active tasks"
                tasksItems={activeTasks}
              />
            </TabPanel>

            <TabPanel>
              <TasksList
                isPending={isPending}
                emptyMsg="No completed tasks"
                tasksItems={CompletedTasks}
              />
            </TabPanel>
          </TabsPanels>
        </Tabs>
      </div>
    </div>
  );
};
