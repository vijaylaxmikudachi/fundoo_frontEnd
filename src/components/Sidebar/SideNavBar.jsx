import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { LightbulbOutlined as Lightbulb, ArchiveOutlined as Archive, DeleteOutlineOutlined as Delete } from '@mui/icons-material';
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Link , useLocation } from 'react-router-dom';

const SideNavBar = () => {
    const location = useLocation();
    const navList = [
        { id: 1, name: 'Notes', icon: <Lightbulb />, route: '/dashboard/notes' },
        { id: 2, name: 'Notifactions', icon: <NotificationsNoneOutlinedIcon />, route: '/dashboard/important'},
        { id: 3, name: 'Archives', icon: <Archive />, route: '/dashboard/archive' },
        { id: 4, name: 'Bin', icon: <Delete />, route: '/dashboard/trash' },
        
    ]
    
    return (
        <div>
            <List sx={{
                cursor: "pointer",
            }}>
                {
                    navList.map(list => {
                        const isActive = location.pathname === list.route; 
                        return (
                            <ListItem
                                button
                                key={list.id}
                                sx={{
                                    backgroundColor: isActive ? "rgb(254, 239, 195)" : "inherit",
                                    borderRadius: '6px',
                                    '&:hover': {
                                        backgroundColor: "#f1f3f4",
                                        transition: 'background-color 0.3s',
                                    },
                                }}
                            >
                                <Link
                                    to={list.route}
                                    style={{
                                        textDecoration: 'none',
                                        display: 'flex',
                                        color: 'inherit',
                                        width: '100%', 
                                    }}
                                >
                                    <ListItemIcon style={{ alignItems: 'center' }}>
                                        {list.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={list.name} />
                                </Link>
                            </ListItem>
                        );
                    })
                }
            </List>
        </div>
        
    )
}

export default SideNavBar;