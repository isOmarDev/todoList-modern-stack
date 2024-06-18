import '@testing-library/jest-dom/vitest';

import { server } from './mocks/node';
import { queryClient } from '@/lib/react-query';

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

afterEach(() => {
  server.resetHandlers();
  queryClient.clear();
});
