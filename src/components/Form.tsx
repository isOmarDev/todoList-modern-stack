type FormProps = {
  children: React.ReactNode;
} & React.FormHTMLAttributes<HTMLFormElement>;

export const Form = ({ children, ...props }: FormProps) => {
  return <form {...props}>{children}</form>;
};
