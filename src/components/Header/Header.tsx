import { useState, ChangeEvent, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from 'src/store/user/userSlice';
import { useAppDispatch, useAppSelector } from 'src/hooks/useApp';
import React from 'react';
// import { useTranslation } from 'react-i18next';
import { Avatar, Collapse, List, ListItemButton, ListItemText } from '@mui/material';

import { TitleMenu } from './TitleMenu';
import { LanguageSwitcher } from './LanguageSwitcher';
import { AuthContext } from 'src/auth/AuthContext';
import jwtService from 'src/auth/jwtService';
import { useGetUserIsLogged } from 'src/hooks/useGetUserIsLogged';
import { CiSun } from 'react-icons/ci';
import { changeTheme } from 'src/store/settingsSlice';
import { RxHamburgerMenu } from 'react-icons/rx';
import { DropDownMenu } from './DropDownMenu';

const fontSizeMenu = { fontSize: 17 };

function Header() {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector((state) => state.settings);
  console.log({ mode });
  const isLogged = useGetUserIsLogged();
  const navigate = useNavigate();
  // const { t } = useTranslation('translation', { keyPrefix: 'translation.header' });
  const [openCallApi, setOpenCallApi] = React.useState(false);
  const [openTable, setOpenTable] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleTables = () => {
    setOpenTable(!openTable);
  };

  const handleCallApi = () => {
    setOpenCallApi(!openCallApi);
  };

  const handleMenu = (event: { currentTarget: React.SetStateAction<HTMLElement | null> }) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(logout());
    // setToken('');
    navigate('/');
  };

  const handleTheme = () => {
    const theme = mode === 'light' ? 'dark' : 'light';
    dispatch(changeTheme(theme));
  };
  const user = true;
  const pathname = '/';

  return (
    <>
      <header>
        <nav className='  h-20 flex flex-nowrap items-center bg-theme-primary justify-between px-40 '>
          <div className='text-theme-primary'>
            <p
              className='title text-theme-primary cursor-pointer text-3xl'
              onClick={() => navigate('/')}
            >
              Lifeguard
            </p>
          </div>

          <div className='  justify-between items-center  '>
            <ul className='flex font-medium space-x-8 mt-0 gap-12 '>
              <li>
                {/* <Link
                    href='/servicios'
                    className='font-light block py-2 pr-4 pl-3 text-fifth hover:bg-second hover:rounded-xl transition md:text-2xl  lg:hover:bg-transparent lg:hover:text-primary-700 lg:p-0 uppercase '
                  >
                    servicios
                  </Link> */}
                {isLogged ? (
                  <DropDownMenu />
                ) : (
                  <button className='text-theme-primary text-xl' onClick={() => navigate('/login')}>
                    Login
                  </button>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
