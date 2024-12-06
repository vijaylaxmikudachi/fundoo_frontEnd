import React, { useState } from "react";
import "./SideNavBar.scss";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  TextField,
  IconButton,
} from "@mui/material";
import {
  LightbulbOutlined,
  ArchiveOutlined,
  EditOutlined,
  DeleteOutlined,
  LabelOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@mui/icons-material";
import { useLocation, Link } from "react-router-dom";

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
    { id: 1, name: "Notes", icon: <LightbulbOutlined />, route: "/dashboard/notes" },
    { id: 2, name: "Archives", icon: <ArchiveOutlined />, route: "/dashboard/archive" },
    { id: 3, name: "Bin", icon: <DeleteOutlined />, route: "/dashboard/trash" },
  ];

  const updatedNavList = [
    ...navList,
    { id: "edit-labels", name: "Edit labels", icon: <EditOutlined />, route: "#", onClick: handleModalOpen },
    ...labels.map((label, index) => ({
      id: `label-${index}`,
      name: label,
      icon: <LabelOutlined />,
      route: `#`,
    })),
  ];

  return (
    <div>
      <List className="sidenav-list">
        {updatedNavList.map((list) => {
          const isActive = location.pathname === list.route;

          return (
            <ListItem
              button
              key={list.id}
              className={`sidenav-list-item ${isActive ? "active" : ""}`}
              onClick={list.onClick}
            >
              <Link to={list.route} className="sidenav-link">
                <ListItemIcon className="sidenav-icon">{list.icon}</ListItemIcon>
                <ListItemText primary={list.name} />
              </Link>
            </ListItem>
          );
        })}
      </List>

      <Modal open={isModalOpen} onClose={handleModalClose} className="sidenav-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h3>Edit Labels</h3>
            <IconButton onClick={handleModalClose}>
              <CloseOutlined />
            </IconButton>
          </div>
          <div className="modal-body">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Create new label"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddOrUpdateLabel()}
            />
            <IconButton size="large" color="primary" onClick={handleAddOrUpdateLabel}>
              <CheckOutlined />
            </IconButton>
          </div>
          <div className="modal-label-list">
            {labels.map((label, index) => (
              <div key={index} className="label-item">
                <div className="label-text">
                  <LabelOutlined />
                  <span>{label}</span>
                </div>
                <div className="label-actions">
                  <IconButton size="small" onClick={() => handleEditLabel(index)}>
                    <EditOutlined />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDeleteLabel(index)}>
                    <DeleteOutlined />
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
