import { Button } from '@/components/Button';
import { Form } from '@/components/Form';
import { Input } from '@/components/Input';
import { GeneralError } from '@/components/GeneralError';
import { useRegisterForm, TYPES } from '../hooks/useRegisterForm';

type RegisterFormProps = {
  onSuccess?: () => void;
};

const registerInputs = [
  {
    label: 'Nickname',
    type: 'text',
    name: 'nickname',
    action: TYPES.SET_NICKNAME,
  },
  {
    label: 'Email',
    type: 'email',
    name: 'email',
    action: TYPES.SET_EMAIL,
  },
  {
    label: 'Password',
    type: 'password',
    name: 'password',
    action: TYPES.SET_PASSWORD,
  },
];

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const { state, error, isPending, handleChange, handleSubmit } =
    useRegisterForm({ onSuccess });

  return (
    <Form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      {error && <GeneralError>{error}</GeneralError>}

      {registerInputs.map(({ label, type, name, action }) => (
        <Input
          key={name}
          label={label}
          type={type}
          name={name}
          value={state[name as keyof typeof state]}
          onChange={(e) => handleChange(e, action)}
        />
      ))}

      <Button size="xlg" type="submit" isLoading={isPending}>
        Sign Up
      </Button>
    </Form>
  );
};
