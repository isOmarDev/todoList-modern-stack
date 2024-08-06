import React from 'react';
import { Button, ButtonProps } from '../Button';
import { MenuProvider, useMenuContext } from './MenuContext';

/* Menu */
type MenuProps = {
  children: React.ReactNode;
};

export const Menu = ({ children }: MenuProps) => {
  return (
    <MenuProvider>
      <div className="relative">{children}</div>
    </MenuProvider>
  );
};

/* Menu Button */
type MenuButtonProps = ButtonProps;

export const MenuButton = ({
  children,
  ...props
}: MenuButtonProps) => {
  const { isOpen, open, toggle } = useMenuContext();

  return (
    <Button {...props} onClick={toggle}>
      {children}
    </Button>
  );
};

/* Menu List */
type MenuListProps = {
  children: React.ReactNode;
};

export const MenuList = ({ children }: MenuListProps) => {
  const { isOpen, close } = useMenuContext();
  return isOpen ? (
    <div
      className="absolute right-0 top-[calc(100%+10px)] z-10 w-40 rounded-xl border border-gray bg-black p-2 shadow-lg"
      onClick={close}
    >
      {children}
    </div>
  ) : null;
};

/* Menu Item */
type MenuItemProps = ButtonProps;

export const MenuItem = ({ children, ...props }: MenuItemProps) => {
  return <Button {...props}>{children}</Button>;
};
