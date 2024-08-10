import React, {
  createContext,
  useContext,
  useMemo,
  useRef,
} from 'react';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useOnClickOutside } from '@/hooks/useClickOutside';

export type MenuContextType = {
  isOpen: boolean;
  open(): void;
  close(): void;
  toggle(): void;
  buttonRef: React.RefObject<HTMLButtonElement>;
  menuListRef: React.RefObject<HTMLDivElement>;
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
  // Hooks
  const { isOpen, open, close, toggle } = useDisclosure();

  // Refs
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuListRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(
    [buttonRef, menuListRef] as React.RefObject<HTMLElement>[],
    close,
  );

  // Context
  const value = useMemo(
    () => ({
      isOpen,
      open,
      close,
      toggle,
      buttonRef,
      menuListRef,
    }),
    [isOpen, open, close, toggle],
  );

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
};
