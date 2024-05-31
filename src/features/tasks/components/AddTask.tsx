import { Form } from '../../../components/Form';
import { Input } from '../../../components/Input';
import { useAddTask } from '../hooks/useAddTask';
import PlusIcon from '../../../assets/plus.svg?react';
import SpinnerIcon from '../../../assets/spinner.svg?react';

export const AddTask = () => {
  const {
    description,
    error,
    inputRef,
    createTaskMutation,
    handleChange,
    handleSubmit,
  } = useAddTask();

  return (
    <Form onSubmit={handleSubmit}>
      <div className="relative">
        <Input
          className="pr-16"
          ref={inputRef}
          type="text"
          name="description"
          value={description}
          errorMsg={error || createTaskMutation.error?.message}
          placeholder="Add a task"
          maxLength={50}
          onChange={handleChange}
        />

        <button
          className="absolute right-[8px] top-[8px] h-12 rounded-md bg-charcoal px-4 transition-colors duration-100 ease-in-out hover:bg-black"
          type="submit"
          disabled={createTaskMutation.isPending}
        >
          {createTaskMutation.isPending ? (
            <SpinnerIcon className="h-5 w-5" />
          ) : (
            <PlusIcon className="h-5 w-5" />
          )}
        </button>
      </div>
    </Form>
  );
};
