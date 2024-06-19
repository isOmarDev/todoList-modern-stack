import {
  render,
  userEvent,
  screen,
  waitForElementToBeRemoved,
} from '@/tests/test-utils';

import { AddTask } from '../AddTask';

test('should add new task successfully and focus on add task input', async () => {
  const user = userEvent.setup();

  render(<AddTask />);

  const addTaskInput = screen.getByRole('textbox');
  const addTaskButton = screen.getByRole('button', {
    name: 'add task',
  });

  await user.type(addTaskInput, 'go to gym');
  await user.click(addTaskButton);

  await waitForElementToBeRemoved(() =>
    screen.queryByRole('img', {
      name: 'spinner icon',
    }),
  );

  expect(
    await screen.findByRole('img', {
      name: 'plus icon',
    }),
  ).toBeInTheDocument();

  expect(addTaskInput).toHaveFocus();
});

test('should fail if added empty task', async () => {
  const user = userEvent.setup();

  render(<AddTask />);

  const addTaskInput = screen.getByRole('textbox');
  const addTaskButton = screen.getByRole('button', {
    name: 'add task',
  });

  await user.click(addTaskButton);

  expect(screen.getByRole('alert')).toBeInTheDocument();
  expect(addTaskInput).toHaveFocus();
});
