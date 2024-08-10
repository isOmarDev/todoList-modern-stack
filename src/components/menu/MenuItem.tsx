import { useRef } from 'react';
import { Button, ButtonProps } from '../Button';
import { cn } from '@/utils/cn';

type MenuItemProps = ButtonProps;

export const MenuItem = ({
  className,
  children,
  ...props
}: MenuItemProps) => {
  const menuItemRef = useRef<HTMLButtonElement>(null);

  return (
    <Button
      {...props}
      className={cn(
        'w-full focus-visible:bg-active focus-visible:outline-0 focus-visible:ring-0',
        className,
      )}
      ref={menuItemRef}
      role="menuitem"
    >
      {children}
    </Button>
  );
};
