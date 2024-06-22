import {
  render,
  userEvent,
  screen,
  waitForElementToBeRemoved,
} from '@/tests/test-utils';

import { AddTask } from '../AddTask';

test('should clear and focus back on add task input after adding task successfully', async () => {
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

test('should show field is empty error if added an empty task', async () => {
  const user = userEvent.setup();

  render(<AddTask />);

  const addTaskInput = screen.getByRole('textbox');
  const addTaskButton = screen.getByRole('button', {
    name: 'add task',
  });

  await user.click(addTaskButton);

  expect(screen.getByRole('alert')).toHaveTextContent(
    /field is empty/i,
  );
  expect(addTaskInput).toHaveFocus();
});
