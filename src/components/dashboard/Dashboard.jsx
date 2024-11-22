import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

//components
import SwipeDrawer from './SwipeDrawer';

const Dashboard = () => {
    return (
        <Box style={{ display: 'flex', width: '100%' }}>
          
            <SwipeDrawer />
            <Box style={{ flexGrow: 1, padding: '16px' }}>
                <Outlet /> 
            </Box>
        </Box>
    )
}

export default Dashboard;