import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/tasks`, () => {
    return HttpResponse.json({
      firstName: 'John',
      lastName: 'Maverick',
    });
  }),
  http.post(`${import.meta.env.VITE_API_URL}/tasks`, () => {
    return HttpResponse.json({
      firstName: 'John',
      lastName: 'Maverick',
    });
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
