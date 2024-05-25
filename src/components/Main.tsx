type MainProps = {
  children: React.ReactNode;
};

export const Main = ({ children }: MainProps) => {
  return <main className="mt-[30px]">{children}</main>;
};
