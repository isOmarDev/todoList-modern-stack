import { Link } from 'react-router-dom';

type AuthLayoutProps = {
  title: string;
  description: React.ReactNode;
  link: { path: string; text: string };
  children: React.ReactNode;
};

export const AuthLayout = ({
  title,
  description,
  link,
  children,
}: AuthLayoutProps) => {
  return (
    <div className="mt-20 max-w-[700px]">
      <h2 className="text-5xl font-extrabold">{title}</h2>
      <p className="text- mt-3 font-semibold text-stone-300">
        {description}{' '}
        <Link
          className="font-bold text-stone-400 underline"
          to={link.path}
        >
          {link.text}
        </Link>
      </p>
      <div className="mt-8">{children}</div>
    </div>
  );
};
