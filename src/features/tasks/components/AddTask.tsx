import { Form } from '@/components/Form';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';

import { useAddTask } from '../hooks/useAddTask';

import PlusIcon from '../../../assets/plus.svg?react';

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

        <Button
          className="absolute right-[8px] top-[8px] size-12 rounded-md bg-charcoal hover:bg-black"
          size="icon"
          isLoading={createTaskMutation.isPending}
          icon={<PlusIcon className="h-5 w-5" />}
          type="submit"
          disabled={createTaskMutation.isPending}
        />
      </div>
    </Form>
  );
};
