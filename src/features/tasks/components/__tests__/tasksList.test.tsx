import { HttpResponse, delay, http } from 'msw';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@/tests/test-utils';
import { server } from '@/tests/mocks/node';

import { Tasks } from '../Tasks';

import {
  generateActiveTask,
  generateCompletedTask,
} from '@/tests/utils/data-generator';

test('should render no tasks message if tasks fetched is empty', async () => {
  server.use(
    http.get(`${import.meta.env.VITE_API_URL}/tasks`, async () => {
      await delay(50);
      return HttpResponse.json([]);
    }),
  );

  render(<Tasks />);

  await waitForElementToBeRemoved(() =>
    screen.queryByRole('img', {
      name: 'spinner icon',
    }),
  );

  expect(await screen.findByText(/No tasks/)).toBeInTheDocument();
  expect(
    await screen.findByText(/No active tasks/),
  ).toBeInTheDocument();
  expect(
    await screen.findByText(/No completed tasks/),
  ).toBeInTheDocument();
});

test('should render all tasks and active task if tasks fetched are not completed', async () => {
  server.use(
    http.get(`${import.meta.env.VITE_API_URL}/tasks`, async () => {
      await delay(50);
      return HttpResponse.json([
        generateActiveTask(),
        generateActiveTask(),
      ]);
    }),
  );

  render(<Tasks />);

  await waitForElementToBeRemoved(() =>
    screen.queryByRole('img', {
      name: 'spinner icon',
    }),
  );

  const [allTasks, activeTasks] = await screen.findAllByRole('list', {
    hidden: true,
  });

  expect(allTasks.children).length(2);
  expect(activeTasks.children).length(2);
});

test('should render all tasks and complete task if tasks fetched are completed', async () => {
  server.use(
    http.get(`${import.meta.env.VITE_API_URL}/tasks`, async () => {
      await delay(50);
      return HttpResponse.json([
        generateCompletedTask(),
        generateCompletedTask(),
      ]);
    }),
  );

  render(<Tasks />);

  await waitForElementToBeRemoved(() =>
    screen.queryByRole('img', {
      name: 'spinner icon',
    }),
  );

  const [allTasks, completedTasks] = await screen.findAllByRole(
    'list',
    {
      hidden: true,
    },
  );

  expect(allTasks.children).length(2);
  expect(completedTasks.children).length(2);
});

test('should render all tasks, active and completed task if fetched tasks have active and completed tasks', async () => {
  server.use(
    http.get(`${import.meta.env.VITE_API_URL}/tasks`, async () => {
      await delay(50);
      return HttpResponse.json([
        generateActiveTask(),
        generateCompletedTask(),
      ]);
    }),
  );

  render(<Tasks />);

  await waitForElementToBeRemoved(() =>
    screen.queryByRole('img', {
      name: 'spinner icon',
    }),
  );

  const [allTasks, activeTasks, completedTasks] =
    await screen.findAllByRole('list', {
      hidden: true,
    });

  expect(allTasks.children).length(2);
  expect(activeTasks.children).length(1);
  expect(completedTasks.children).length(1);
});
