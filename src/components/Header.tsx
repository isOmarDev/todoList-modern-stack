import { Link } from 'react-router-dom';
import { Logout } from '@/features/auth/components/Logout';
import { Menu, MenuButton, MenuList, MenuItem } from './menu';
import Bars from '@/assets/bars.svg?react';
import LogoutIcon from '@/assets/logout.svg?react';
import SettingsIcon from '@/assets/settings.svg?react';
import ProfileIcon from '@/assets/profile.svg?react';
import { useUserContext } from '@/features/auth/hooks/UserContext';

const menuItems = [
  {
    label: 'Profile',
    icon: <ProfileIcon className="size-5" />,
  },
  {
    label: 'Settings',
    icon: <SettingsIcon className="size-5" />,
  },
];

export const Header = () => {
  const { user } = useUserContext();

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
              {menuItems.map((item) => (
                <MenuItem
                  key={item.label}
                  className="justify-start font-normal"
                  variant="ghost"
                  size="lg"
                  icon={item.icon}
                >
                  {item.label}
                </MenuItem>
              ))}
              <Logout>
                {({ handleLogout }) => (
                  <MenuItem
                    className="justify-start font-normal"
                    variant="ghost"
                    size="lg"
                    icon={<LogoutIcon className="size-5" />}
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
