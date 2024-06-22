import { randTodo, randUuid } from '@ngneat/falso';

export function generateRandTask() {
  return {
    id: randUuid(),
    description: randTodo().title,
    isCompleted: randTodo().completed,
    createdAt: '2024-06-19T21:50:55.671Z',
  };
}

export function generateActiveTask() {
  return {
    id: randUuid(),
    description: randTodo().title,
    isCompleted: false,
    createdAt: '2024-06-19T21:50:55.671Z',
  };
}

export function generateCompletedTask() {
  return {
    id: randUuid(),
    description: randTodo().title,
    isCompleted: true,
    createdAt: '2024-06-19T21:50:55.671Z',
  };
}
