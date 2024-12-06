import React, { useState } from "react";
import { List, ListItem, ListItemIcon, ListItemText, Modal, TextField, IconButton } from "@mui/material";
import { Lightbulb, Archive, Edit as EditIcon, Delete, Label, Check } from "@mui/icons-material";
import { useLocation, Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const SideNavBar = () => {
  const location = useLocation();
  const [labels, setLabels] = useState([]); 
  const [isModalOpen, setModalOpen] = useState(false); 
  const [newLabel, setNewLabel] = useState(""); 
  const [editingLabelIndex, setEditingLabelIndex] = useState(null); 

  
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  
  const handleModalClose = () => {
    setModalOpen(false);
    setNewLabel("");
    setEditingLabelIndex(null); 
  };

  
  const handleAddOrUpdateLabel = () => {
    if (newLabel.trim()) {
      if (editingLabelIndex !== null) {
        const updatedLabels = [...labels];
        updatedLabels[editingLabelIndex] = newLabel.trim();
        setLabels(updatedLabels);
      } else {
        setLabels((prev) => [...prev, newLabel.trim()]);
      }
      setNewLabel("");
      setEditingLabelIndex(null);
    }
  };

  
  const handleEditLabel = (index) => {
    setNewLabel(labels[index]);
    setEditingLabelIndex(index);
  };

  
  const handleDeleteLabel = (index) => {
    setLabels((prev) => prev.filter((_, i) => i !== index));
  };

  const navList = [
    { id: 1, name: "Notes", icon: <Lightbulb />, route: "/dashboard/notes" },
    { id: 2, name: "Archives", icon: <Archive />, route: "/dashboard/archive" },
    { id: 3, name: "Bin", icon: <Delete />, route: "/dashboard/trash" },
  ];

  
  const updatedNavList = [
    ...navList,
    { id: "edit-labels", name: "Edit labels", icon: <EditIcon />, route: "#", onClick: handleModalOpen }, 
    ...labels.map((label, index) => ({
      id: `label-${index}`,
      name: label,
      icon: <Label />,
      route: `#`, 
    })),
  ];

  return (
    <div>
      <List
        sx={{
          cursor: "pointer",
        }}
      >
        
        {updatedNavList.map((list) => {
          const isActive = location.pathname === list.route;

          return (
            <ListItem
              button
              key={list.id}
              sx={{
                backgroundColor: isActive ? "rgb(254, 239, 195)" : "inherit",
                borderRadius: "6px",
                "&:hover": {
                  backgroundColor: "#f1f3f4",
                  transition: "background-color 0.3s",
                },
              }}
              onClick={list.onClick}
            >
              <Link
                to={list.route}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  color: "inherit",
                  width: "100%",
                }}
              >
                <ListItemIcon style={{ alignItems: "center" }}>{list.icon}</ListItemIcon>
                <ListItemText primary={list.name} />
              </Link>
            </ListItem>
          );
        })}
      </List>

      
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="edit-labels-modal"
        aria-describedby="edit-labels-modal-description"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: 24,
            padding: "16px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3>Edit Labels</h3>
            <IconButton onClick={handleModalClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Create new label"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddOrUpdateLabel()}
            />
            <IconButton
              size="large"
              color="primary"
              onClick={handleAddOrUpdateLabel}
              style={{ marginLeft: "8px" }}
            >
              <Check />
            </IconButton>
          </div>
          <div>
            {labels.map((label, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                  padding: "8px",
                  backgroundColor: "#f1f3f4",
                  borderRadius: "6px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Label style={{ marginRight: "8px" }} />
                  <span>{label}</span>
                </div>
                <div>
                  <IconButton size="small" onClick={() => handleEditLabel(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDeleteLabel(index)}>
                    <Delete />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SideNavBar;
