import { Form } from '@/components/Form';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';

export const LoginForm = () => {
  return (
    <Form className="flex flex-col gap-5">
      <Input label="Email" type="email" />
      <Input label="Password" type="password" />
      <Button size="xlg">Login</Button>
    </Form>
  );
};
