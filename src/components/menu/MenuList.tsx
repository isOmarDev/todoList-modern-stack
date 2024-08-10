import { useMenuContext } from './MenuContext';

type MenuListProps = {
  children: React.ReactNode;
};

export const MenuList = ({ children }: MenuListProps) => {
  const { isOpen, close, menuListRef } = useMenuContext();

  const handleMenuClose = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    if (target !== menuListRef.current) {
      close();
    }
  };

  return isOpen ? (
    <div
      className="absolute right-0 top-[calc(100%+10px)] z-10 w-52 rounded-2xl border border-gray bg-black p-2 shadow-lg"
      ref={menuListRef}
      role="menu"
      onClick={handleMenuClose}
    >
      {children}
    </div>
  ) : null;
};
