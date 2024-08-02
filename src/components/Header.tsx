import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header>
      <h1 className="text-4xl font-extrabold">
        <Link to="/">Taskify</Link>
      </h1>
    </header>
  );
};
