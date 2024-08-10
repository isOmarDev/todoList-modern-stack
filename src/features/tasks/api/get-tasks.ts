import { useQuery } from '@tanstack/react-query';
import { AxiosPromise } from 'axios';
import { http } from '../../../lib/axios';
import { Task } from '../components/TasksList';

const getTasks = (userId?: string): AxiosPromise<Task[]> => {
  return http.get(
    `/tasks?userId=${userId}&_sort=-isCompleted,-createdAt`,
  );
};

type useFetchTasksProps = {
  userId?: string;
};

export const useFetchTasks = ({ userId }: useFetchTasksProps) => {
  return useQuery({
    queryKey: ['tasks', { userId }],
    queryFn: () => getTasks(userId),
  });
};
