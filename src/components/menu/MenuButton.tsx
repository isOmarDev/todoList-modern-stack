import { Button, ButtonProps } from '../Button';
import { useMenuContext } from './MenuContext';

type MenuButtonProps = ButtonProps;

export const MenuButton = ({
  children,
  ...props
}: MenuButtonProps) => {
  const { isOpen, toggle, buttonRef } = useMenuContext();

  return (
    <Button
      {...props}
      // className="focus:outline focus:outline-2 focus:outline-red-600"
      ref={buttonRef}
      aria-expanded={isOpen}
      aria-haspopup="menu"
      onClick={toggle}
    >
      {children}
    </Button>
  );
};
