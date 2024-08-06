import { Link } from 'react-router-dom';
import { Logout } from '@/features/auth/components/Logout';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from './dropdown/Menu';
import Bars from '@/assets/bars.svg?react';
import { useUser } from '@/features/auth/hooks/useUser';

export const Header = () => {
  const { user } = useUser();
  return (
    <header className="flex content-center justify-between">
      <h1 className="text-4xl font-extrabold">
        <Link to="/">Taskify</Link>
      </h1>

      <nav>
        {user && (
          <Menu>
            <MenuButton
              className="size-10"
              variant="outline"
              size="icon"
            >
              <Bars />
            </MenuButton>
            <MenuList>
              <Logout>
                {({ handleLogout }) => (
                  <MenuItem
                    className="w-full justify-start"
                    variant="ghost"
                    onClick={handleLogout}
                  >
                    Logout
                  </MenuItem>
                )}
              </Logout>
            </MenuList>
          </Menu>
        )}
      </nav>
    </header>
  );
};
