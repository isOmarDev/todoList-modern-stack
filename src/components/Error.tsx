type ErrorProps = {
  errorMsg?: string;
};

export const Error = ({ errorMsg }: ErrorProps) => {
  if (!errorMsg) return null;

  return (
    <div
      role="alert"
      className="mt-1 text-sm font-semibold text-red-500 transition-colors duration-150 ease-in-out"
    >
      {errorMsg}
    </div>
  );
};
