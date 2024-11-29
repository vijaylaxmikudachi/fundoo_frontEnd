import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Header from '../header/Header';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import './Dashboard.scss';

export default function Dashboard() {
    const [drawerState, setDrawerState] = useState(false);
    const navigate = useNavigate();

    const toggleDrawer = (action = 'demo') => {
        setDrawerState(!drawerState);
        if (action !== 'demo') {
            navigate(action);
        }
    };

    return (
        <div className='dashboard-main-container'>
            <Header className="header" toggleDrawer={toggleDrawer} />
            <Drawer
  className="db-drawer-main-container"
  anchor="left"
  open={drawerState}
  onClose={() => toggleDrawer()}
  PaperProps={{
    sx: {
      top: '63px', // Ensures it starts below the header
      height: 'calc(100% - 63px)', // Adjust height to avoid overlapping
      boxShadow: 'none', 
      
    },
    elevation: 0, // Another way to remove shadow
  }}
  ModalProps={{
    BackdropProps: { style: { backgroundColor: 'transparent' } },
  }}
>
    <div className='db-drawer-content'>
        <div className='db-drawer-left-icon' onClick={() => toggleDrawer("notes")}>
            <LightbulbOutlinedIcon />
            <span className='db-drawer-icon'>Notes</span>
        </div>
        <div className='db-drawer-left-icon' onClick={() => toggleDrawer("archive")}>
            <ArchiveOutlinedIcon />
            <span className='db-drawer-icon'>Archive</span>
        </div>
        <div className='db-drawer-left-icon' onClick={() => toggleDrawer("trash")}>
            <DeleteOutlineOutlinedIcon />
            <span className='db-drawer-icon'>Trash</span>
        </div>
        <div className='db-drawer-left-icon'>
            <NotificationsNoneOutlinedIcon />
            <span className='db-drawer-icon'>Notifications</span>
        </div>
    </div>
</Drawer>

            <div className={`db-main-container ${drawerState ? 'drawer-open' : ''}`}>
                <div className='db-left-main-container'>
                    <div className='db-left-icon' onClick={() => navigate('notes')}>
                        <LightbulbOutlinedIcon />
                    </div>
                    <div className='db-left-icon' onClick={() => navigate('archive')}>
                        <ArchiveOutlinedIcon />
                    </div>
                    <div className='db-left-icon' onClick={() => navigate('trash')}>
                        <DeleteOutlineOutlinedIcon />
                    </div>
                    <div className='db-left-icon'>
                        <NotificationsNoneOutlinedIcon />
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    );
}
