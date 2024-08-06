import { Form } from '@/components/Form';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { GeneralError } from '@/components/GeneralError';
import { useLoginForm } from '../hooks/useLoginForm';

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const {
    nickname,
    password,
    isFetching,
    setNickname,
    setPassword,
    error,
    handleSubmit,
  } = useLoginForm({ onSuccess });

  return (
    <Form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      {error && <GeneralError>{error}</GeneralError>}

      <Input
        label="Nickname"
        type="text"
        name="nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />

      <Input
        label="Password"
        type="password"
        name="nickname"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button size="xlg" type="submit" isLoading={isFetching}>
        Login
      </Button>
    </Form>
  );
};
