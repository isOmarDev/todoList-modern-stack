import { renderHook, act, waitFor } from '@/tests/test-utils';
import { useAddTask } from '../useAddTask';
import { server } from '@/tests/mocks/node';
import { createWrapper } from '@/tests/utils/createWrapper';

test('should initialize with default values', () => {
  const { result } = renderHook(() => useAddTask(), {
    wrapper: createWrapper(),
  });

  expect(result.current.description).toBe('');
  expect(result.current.error).toBe('');
  expect(result.current.inputRef.current).toBeNull();
});

test('should update description on handleChange', () => {
  const { result } = renderHook(() => useAddTask(), {
    wrapper: createWrapper(),
  });
  expect(result.current.description).toBe('');
  expect(result.current.error).toBe('');

  act(() =>
    result.current.handleChange({
      target: { value: 'go to gym' },
    } as React.ChangeEvent<HTMLInputElement>),
  );

  expect(result.current.description).toBe('go to gym');
  expect(result.current.error).toBe('');
});

test('should set error if description is empty on handleSubmit', () => {
  const { result } = renderHook(() => useAddTask(), {
    wrapper: createWrapper(),
  });

  act(() => {
    result.current.handleSubmit({
      preventDefault: vi.fn(),
    } as unknown as React.SyntheticEvent);
  });

  expect(result.current.error).toBe('Field is empty');

  act(() =>
    result.current.handleChange({
      target: { value: 'go to gym' },
    } as React.ChangeEvent<HTMLInputElement>),
  );

  expect(result.current.error).toBe('');
});

test('should clear input on successful task creation', async () => {
  const { result } = renderHook(() => useAddTask(), {
    wrapper: createWrapper(),
  });

  act(() => {
    result.current.handleChange({
      target: { value: 'new description' },
    } as React.ChangeEvent<HTMLInputElement>);
  });

  act(() => {
    result.current.handleSubmit({
      preventDefault: vi.fn(),
    } as unknown as React.SyntheticEvent);
  });

  await waitFor(() => expect(result.current.description).toBe(''));
});
