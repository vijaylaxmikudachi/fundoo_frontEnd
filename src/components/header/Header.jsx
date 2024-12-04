// import React, { useState } from 'react';
// import DehazeTwoToneIcon from '@mui/icons-material/DehazeTwoTone';
// import RefreshIcon from '@mui/icons-material/Refresh';
// import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
// import SearchIcon from '@mui/icons-material/Search';
// import SettingsIcon from '@mui/icons-material/Settings';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { Menu, MenuItem, IconButton } from '@mui/material';
// import './Header.scss'; 
// import { useNavigate } from 'react-router-dom';

// function KeepHeader(props) {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const { toggleDrawer } = props;
//   const navigate = useNavigate();

//   const handleMenuClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

  
//   const handleLogout = () => {

//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <div className='keep-header'>
//       <div className='keep-header-left'>
//         <IconButton onClick={() => toggleDrawer()}>
//           <DehazeTwoToneIcon />
//         </IconButton>
//         <img
//           src='https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png'
//           alt='Google Keep'
//           className='keep-logo'
//         />
//         <span className='keep-title'>Fundo-Note</span>
//       </div>

//       <div className='keep-header-mid'>
//         <div className='search-bar'>
//           <SearchIcon />
//           <input className='search-bar-input' type='text' placeholder='Search' />
//         </div>
//       </div>

//       <div className='keep-header-right'>
//         <div className='keep-leftdiv-header-right'>
//           <IconButton>
//             <RefreshIcon />
//           </IconButton>
//           <IconButton>
//             <ViewAgendaIcon />
//           </IconButton>
//           <IconButton>
//             <SettingsIcon />
//           </IconButton>
//         </div>
//         <div className='keep-rightdiv-header-right'>
//           <IconButton onClick={handleMenuClick}>
//             <AccountCircleIcon />
//           </IconButton>
//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={handleClose}
//           >
//             <MenuItem onClick={handleClose}>Profile</MenuItem>
//             <MenuItem onClick={handleClose}>Settings</MenuItem>
//             <MenuItem onClick={handleLogout}>Logout</MenuItem> {/* Add logout functionality here */}
//           </Menu>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default KeepHeader;



import { AppBar, Toolbar, Typography, IconButton ,Menu, MenuItem,} from '@mui/material';
import React, { useState} from "react";
import {
  InputBase,
  Box,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import RefreshIcon from "@mui/icons-material/Refresh";
import ViewListIcon from "@mui/icons-material/ViewList";
import SettingsIcon from "@mui/icons-material/Settings";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

const Header = styled(AppBar)`
  z-index: 1201;
  background: #fff;
  height: 70px;
  box-shadow: inset 0 -1px 0 0 #dadce0;
  border: #fff
`

const Heading = styled(Typography)`
  color: #5F6368;
  font-size: 24px;
  margin-left: 25px;
`


const HeaderBar = ({ open, handleDrawer }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  //menu handling
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/login"); // Redirect to login page
  };
  
  return (
    <Header open={open}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
               <IconButton
          onClick={() => handleDrawer()}
          sx={{ marginRight: '20px'}}
          edge="start"
        >
                <MenuIcon />
              </IconButton>
              <img
                src={`${process.env.PUBLIC_URL}/images/logo-main.png`}
                alt="Logo"
                style={{ height: "40px", width: "auto" }}
              />
              <Typography variant="h6" color="#5f6368" sx={{ fontWeight: "bold" }}>
                Fundoo-Notes
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flex: 1,
                marginLeft: 3,
                marginRight: 3,
                maxWidth: 500,
                backgroundColor: "#f1f3f4",
                borderRadius: "8px",
                paddingLeft: 2,
              }}
            >
              <SearchIcon sx={{color:'black' }}/>
              <InputBase
                placeholder="Search"
                fullWidth
                sx={{ paddingLeft: 1, fontSize: "0.9rem",height:"50px" }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton>
                <RefreshIcon />
              </IconButton>
              <IconButton>
                <ViewListIcon />
              </IconButton>
              <IconButton>
                <SettingsIcon />
              </IconButton>
              <IconButton>
                <MoreHorizIcon />
              </IconButton>
              <Avatar
            alt="User Profile"
            src={`${process.env.PUBLIC_URL}/images/pavan.jpeg`}
            sx={{ width: 32, height: 32, cursor: "pointer" }}
            onClick={handleMenuOpen}
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem >View Profile</MenuItem>
            <MenuItem >Dark Theam</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
            </Box>
          </Toolbar>
    </Header>
  )
}

export default HeaderBar;
