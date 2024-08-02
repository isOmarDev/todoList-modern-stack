import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { RestrictedRoute } from './RestrictedRoute';
import { MainLayout } from '@/components/MainLayout';

export const createRouter = () => {
  return createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          lazy: async () => {
            const { Tasks } = await import(
              '@/features/tasks/components/Tasks'
            );
            return { Component: Tasks };
          },
        },
      ],
    },
    {
      element: (
        <RestrictedRoute>
          <MainLayout />
        </RestrictedRoute>
      ),
      children: [
        {
          path: '/register',
          lazy: async () => {
            const { RegisterRoute } = await import(
              '@/features/auth/routes/Register'
            );
            return { Component: RegisterRoute };
          },
        },
        {
          path: '/login',
          lazy: async () => {
            const { LoginRoute } = await import(
              '@/features/auth/routes/Login'
            );
            return { Component: LoginRoute };
          },
        },
      ],
    },
    {
      path: '*',
      lazy: async () => {
        const { NotFoundRoute } = await import('./NotFound');
        return { Component: NotFoundRoute };
      },
    },
  ]);
};
