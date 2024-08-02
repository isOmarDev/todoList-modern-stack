import { Button } from '@/components/Button';
import { Form } from '@/components/Form';
import { Input } from '@/components/Input';

export const RegisterForm = () => {
  return (
    <Form className="flex flex-col gap-5">
      <Input label="Nickname" type="text" />
      <Input label="Email" type="email" />
      <Input label="Password" type="password" />
      <Button size="xlg">Sign Up</Button>
    </Form>
  );
};
