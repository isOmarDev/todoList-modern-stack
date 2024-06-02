import { AppProvider } from './AppProvider';
import { Header } from '../components/Header';
import { Main } from '../components/Main';
import { Tasks } from '../features/tasks/components/Tasks';

export const App = () => {
  return (
    <AppProvider>
      <div className="mx-auto max-w-[900px] px-6 py-12 sm:px-12">
        <Header />
        <Main>
          <Tasks />
        </Main>
      </div>
    </AppProvider>
  );
};
