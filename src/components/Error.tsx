type ErrorProps = {
  errorMsg?: string;
};

export const Error = ({ errorMsg }: ErrorProps) => {
  if (!errorMsg) return null;

  return (
    <div
      role="alert"
      className="text-red-500 mt-1 text-sm font-semibold transition-colors duration-150 ease-in-out"
    >
      {errorMsg}
    </div>
  );
};
