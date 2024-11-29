import React, { useState } from 'react';
import DehazeTwoToneIcon from '@mui/icons-material/DehazeTwoTone';
import RefreshIcon from '@mui/icons-material/Refresh';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Menu, MenuItem, IconButton } from '@mui/material';
import './Header.scss'; 
import { useNavigate } from 'react-router-dom';

function KeepHeader(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { toggleDrawer } = props;
  const navigate = useNavigate();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  
  const handleLogout = () => {

    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className='keep-header'>
      <div className='keep-header-left'>
        <IconButton onClick={() => toggleDrawer()}>
          <DehazeTwoToneIcon />
        </IconButton>
        <img
          src='https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png'
          alt='Google Keep'
          className='keep-logo'
        />
        <span className='keep-title'>Fundo-Note</span>
      </div>

      <div className='keep-header-mid'>
        <div className='search-bar'>
          <SearchIcon />
          <input className='search-bar-input' type='text' placeholder='Search' />
        </div>
      </div>

      <div className='keep-header-right'>
        <div className='keep-leftdiv-header-right'>
          <IconButton>
            <RefreshIcon />
          </IconButton>
          <IconButton>
            <ViewAgendaIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </div>
        <div className='keep-rightdiv-header-right'>
          <IconButton onClick={handleMenuClick}>
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem> {/* Add logout functionality here */}
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default KeepHeader;
