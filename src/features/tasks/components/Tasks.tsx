import { AddTask } from './AddTask';
import {
  Tabs,
  TabsList,
  TabsPanels,
  Tab,
  TabPanel,
} from '../../../components/Tabs';
import { TasksList } from './TasksList';
import { useFetchTasks } from '../api/get-tasks';
import {
  ALL_TASKS,
  ACTIVE_TASKS,
  COMPLETED_TASKS,
} from '../constants/tasksTypes';

export const Tasks = () => {
  const { isPending, data } = useFetchTasks();

  const activeTasksItems = data?.data.filter(
    (task) => !task.isCompleted,
  );

  const CompletedTasksItems = data?.data.filter(
    (task) => task.isCompleted,
  );

  return (
    <div>
      <AddTask />

      <div className="mt-7">
        <Tabs>
          <TabsList>
            <Tab>{ALL_TASKS}</Tab>
            <Tab>{ACTIVE_TASKS}</Tab>
            <Tab>{COMPLETED_TASKS}</Tab>
          </TabsList>

          <TabsPanels>
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
                tasksItems={activeTasksItems}
              />
            </TabPanel>
            
            <TabPanel>
              <TasksList
                isPending={isPending}
                emptyMsg="No completed tasks"
                tasksItems={CompletedTasksItems}
              />
            </TabPanel>
          </TabsPanels>
        </Tabs>
      </div>
    </div>
  );
};
