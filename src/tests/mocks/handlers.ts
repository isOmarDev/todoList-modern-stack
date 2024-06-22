import { delay, http, HttpResponse } from 'msw';
import { generateActiveTask } from '../utils/data-generator';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/tasks`, async () => {
    await delay(50);
    return HttpResponse.json([]);
  }),
  http.post(`${import.meta.env.VITE_API_URL}/tasks`, async () => {
    await delay(50);
    return HttpResponse.json(generateActiveTask());
  }),
  http.patch(`${import.meta.env.VITE_API_URL}/tasks/:taskId`, () => {
    return HttpResponse.json({
      firstName: 'John',
      lastName: 'Maverick',
    });
  }),
  http.delete(`${import.meta.env.VITE_API_URL}/tasks/:taskId`, () => {
    return HttpResponse.json({
      firstName: 'John',
      lastName: 'Maverick',
    });
  }),
];
