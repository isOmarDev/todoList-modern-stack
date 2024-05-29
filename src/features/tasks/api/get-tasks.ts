import { useQuery } from '@tanstack/react-query';
import { AxiosPromise } from 'axios';
import { http } from '../../../lib/axios';
import { Task } from '../components/TasksList';

const getTask = (): AxiosPromise<Task[]> => {
  return http.get('/tasks?_sort=-isCompleted,-createdAt');
};

export const useFetchTasks = () => {
  return useQuery({ queryKey: ['tasks'], queryFn: getTask });
};
