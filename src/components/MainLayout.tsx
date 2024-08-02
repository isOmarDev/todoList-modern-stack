import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const MainLayout = () => {
  return (
    <div className="mx-auto max-w-[900px] px-6 py-12 sm:px-12">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
