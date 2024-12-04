// import React, { useState } from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';
// import Drawer from '@mui/material/Drawer';
// import Header from '../header/Header';
// import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
// import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
// import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
// import './Dashboard.scss';
// import SideNavBar from '../Sidebar/SideNavBar';

// export default function Dashboard() {
//     const [drawerState, setDrawerState] = useState(false);
//     const [activeMenu, setActiveMenu] = useState('notes');
//     const navigate = useNavigate();

//     const handleNavigation = (menu) => {
//         setActiveMenu(menu);
//         navigate(menu);
//     };

//     return (
//         <div className="dashboard-main-container">
//             <Header className="header" toggleDrawer={() => setDrawerState(!drawerState)} />
         
//             {/* <Drawer
//                 className="db-drawer-main-container"
//                 anchor="left"
//                 open={drawerState}
//                 onClose={() => setDrawerState(false)}
//                 PaperProps={{
//                     sx: {
//                         top: '63px',
//                         height: 'calc(100% - 63px)',
//                         boxShadow: 'none',
//                     },
//                 }}
//                 ModalProps={{
//                     BackdropProps: { style: { backgroundColor: 'transparent' } },
//                 }}
//             >
//                 <div className="db-drawer-content">
//                     <div
//                         className={`db-drawer-left-icon ${activeMenu === 'notes' ? 'active' : ''}`}
//                         onClick={() => handleNavigation('notes')}
//                     >
//                         <LightbulbOutlinedIcon />
//                         <span className="db-drawer-icon">Notes</span>
//                     </div>
//                     <div
//                         className={`db-drawer-left-icon ${activeMenu === 'archive' ? 'active' : ''}`}
//                         onClick={() => handleNavigation('archive')}
//                     >
//                         <ArchiveOutlinedIcon />
//                         <span className="db-drawer-icon">Archive</span>
//                     </div>
//                     <div
//                         className={`db-drawer-left-icon ${activeMenu === 'trash' ? 'active' : ''}`}
//                         onClick={() => handleNavigation('trash')}
//                     >
//                         <DeleteOutlineOutlinedIcon />
//                         <span className="db-drawer-icon">Trash</span>
//                     </div>
//                     <div
//                         className={`db-drawer-left-icon ${activeMenu === 'notifications' ? 'active' : ''}`}
//                         onClick={() => handleNavigation('notifications')}
//                     >
//                         <NotificationsNoneOutlinedIcon />
//                         <span className="db-drawer-icon">Notifications</span>
//                     </div>
//                 </div>
//             </Drawer> */}

//             <div className={`db-main-container ${drawerState ? 'drawer-open' : ''}`}>
//                 {/* <div className="db-left-main-container">
//                     <div
//                         className={`db-left-icon ${activeMenu === 'notes' ? 'active' : ''}`}
//                         onClick={() => handleNavigation('notes')}
//                     >
//                         <LightbulbOutlinedIcon />
//                     </div>
//                     <div
//                         className={`db-left-icon ${activeMenu === 'archive' ? 'active' : ''}`}
//                         onClick={() => handleNavigation('archive')}
//                     >
//                         <ArchiveOutlinedIcon />
//                     </div>
//                     <div
//                         className={`db-left-icon ${activeMenu === 'trash' ? 'active' : ''}`}
//                         onClick={() => handleNavigation('trash')}
//                     >
//                         <DeleteOutlineOutlinedIcon />
//                     </div>
//                     <div
//                         className={`db-left-icon ${activeMenu === 'notifications' ? 'active' : ''}`}
//                         onClick={() => handleNavigation('notifications')}
//                     >
//                         <NotificationsNoneOutlinedIcon />
//                     </div>
//                 </div> */}
//                 <Outlet />
//             </div>
//         </div>
//     );
// }


import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import { Outlet} from "react-router-dom";
import SideNavBar from '../Sidebar/SideNavBar';
import HeaderBar from '../header/Header'

//components



const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

function Dashboard() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawer = () => {
        setOpen(prevState => !prevState);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <HeaderBar
                open={open}
                handleDrawer={handleDrawer}
            />
            <Drawer variant="permanent" open={open}>
                <DrawerHeader></DrawerHeader>
                <SideNavBar />
                
            </Drawer>
            <Outlet/>
        </Box>

    );
}

export default Dashboard;