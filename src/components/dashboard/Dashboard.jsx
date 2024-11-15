import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import NoteIcon from "@mui/icons-material/Note";
import LabelIcon from "@mui/icons-material/Label";
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";

const drawerWidth = 240;

const Dashboard = () => {
  const menuItems = [
    { text: "Notes", icon: <NoteIcon />, path: "/" },
    { text: "Edit Labels", icon: <LabelIcon />, path: "/edit-labels" },
    { text: "Archive", icon: <ArchiveIcon />, path: "/archive" },
    { text: "Trash", icon: <DeleteIcon />, path: "/trash" },
  ];

  return (
    <div style={{ display: "flex" }}>
      {/* Side Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <List>
          {menuItems.map((item, index) => (
            <ListItem button component={Link} to={item.path} key={index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <main style={{ flexGrow: 1, padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
