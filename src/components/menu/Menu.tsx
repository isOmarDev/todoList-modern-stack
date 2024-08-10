import React from 'react';
import { MenuProvider } from './MenuContext';

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
