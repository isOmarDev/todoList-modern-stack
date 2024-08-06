import React, { createContext, useContext, useMemo } from 'react';
import { useDisclosure } from '@/hooks/useDisclosure';

export type MenuContextType = {
  isOpen: boolean;
  open(): void;
  toggle(): void;
  close(): void;
};

// Create Menu context
export const MenuContext = createContext<MenuContextType | null>(
  null,
);

// Reusable menu context hook
// eslint-disable-next-line react-refresh/only-export-components
export const useMenuContext = () => {
  const menuContext = useContext(MenuContext);

  if (!menuContext) {
    throw new Error(
      'useMenuContext has to be used within <MenuContext.Provider>',
    );
  }

  return menuContext;
};

type MenuProviderProps = {
  children: React.ReactNode;
};

export const MenuProvider = ({ children }: MenuProviderProps) => {
  const { isOpen, toggle, open, close } = useDisclosure();

  const value = useMemo(
    () => ({
      isOpen,
      open,
      toggle,
      close,
    }),
    [close, isOpen, toggle, open],
  );

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
};
