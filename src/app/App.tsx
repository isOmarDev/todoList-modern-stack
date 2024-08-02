import { useMemo } from 'react';
import { AppProvider } from './AppProvider';
import { RouterProvider } from 'react-router-dom';
import { createRouter } from '../routes';
import { Spinner } from '@/components/Spinner';

const AppRouter = () => {
  // const queryClient = useQueryClient();
  const router = useMemo(() => createRouter(), []);

  return (
    <RouterProvider
      router={router}
      fallbackElement={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner />
        </div>
      }
    />
  );
};

export const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};
