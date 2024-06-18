import { renderHook, act } from '@/tests/test-utils';
import { useEditTask } from '../useEditTask';
import { createWrapper } from '@/tests/utils/createWrapper';

test('should initialize with default values', () => {
  const { result } = renderHook(
    () => useEditTask({ initialValue: 'go to gym' }),
    {
      wrapper: createWrapper(),
    },
  );

  expect(result.current.state.description).toBe('go to gym');
  expect(result.current.state.isEditEnabled).toBe(false);
  expect(result.current.inputRef.current).toBeNull();
  expect(result.current.isDescriptionChanged).toBe(false);
});

test('should update description on handleChange', () => {
  const { result } = renderHook(
    () => useEditTask({ initialValue: 'go to gym' }),
    {
      wrapper: createWrapper(),
    },
  );

  act(() =>
    result.current.handleChange({
      target: { value: 'go to school' },
    } as React.ChangeEvent<HTMLInputElement>),
  );

  expect(result.current.state.description).toBe('go to school');
  expect(result.current.isDescriptionChanged).toBe(true);
});

test('should toggle enable edit state', () => {
  const { result } = renderHook(
    () => useEditTask({ initialValue: 'go to gym' }),
    {
      wrapper: createWrapper(),
    },
  );

  // Spy on the focus method of the inputRef
  vi.spyOn(result.current.inputRef, 'current', 'get').mockReturnValue(
    {
      focus: vi.fn(),
    } as unknown as HTMLInputElement,
  );

  act(() => result.current.toggleEdit());

  expect(result.current.state.isEditEnabled).toBe(true);
  expect(result.current.inputRef.current?.focus).toHaveBeenCalled();

  act(() => result.current.toggleEdit());

  expect(result.current.state.isEditEnabled).toBe(false);
  expect(result.current.inputRef.current?.focus).toHaveBeenCalled();
});
