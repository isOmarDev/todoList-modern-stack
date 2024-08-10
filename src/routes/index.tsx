import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { RestrictedRoute } from './RestrictedRoute';
import { MainLayout } from '@/components/MainLayout';
import { AuthProvider } from '@/features/auth/hooks/UserContext';

export const createRouter = () => {
  return createBrowserRouter([
    {
      path: '/',
      element: (
        <AuthProvider>
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        </AuthProvider>
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
        <AuthProvider>
          <RestrictedRoute>
            <MainLayout />
          </RestrictedRoute>
        </AuthProvider>
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
