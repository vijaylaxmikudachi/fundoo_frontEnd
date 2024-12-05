import { AppBar, Toolbar, Typography, IconButton ,Menu, MenuItem,} from '@mui/material';
import React, { useContext, useState} from "react";
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
import { UpdateQueryContext } from '../hooks/SearchHook';


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


 const updateQuery = useContext(UpdateQueryContext)
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

 
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login");
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
                src={`${process.env.PUBLIC_URL}/images/Fundo-img.png`}
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
                onChange={(e)=>{
                  updateQuery(e.currentTarget.value)
                  console.log(e.currentTarget.value)
                }}
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
