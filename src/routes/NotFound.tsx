import { Link } from 'react-router-dom';

export const NotFoundRoute = () => {
  return (
    <div className="mt-52 flex flex-col items-center font-semibold text-center">
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>

      <Link className="rounded-lg px-4 py-2 bg-active m-5" to="/" replace>
        Go to Home
      </Link>
    </div>
  );
};
