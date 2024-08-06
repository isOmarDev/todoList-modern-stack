type GeneralErrorProps = { children: React.ReactNode };

export const GeneralError = ({ children }: GeneralErrorProps) => {
  return (
    <div className="rounded-lg bg-red-500 p-3 font-medium">
      {children}
    </div>
  );
};
