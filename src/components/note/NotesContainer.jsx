import React, { useState } from "react";
import { Card, IconButton } from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import PaletteIcon from "@mui/icons-material/Palette";
import ArchiveIcon from "@mui/icons-material/Archive";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const NotesContainer = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div>
      <h2>Notes</h2>
      <Card
        style={{
          padding: "10px",
          marginBottom: "10px",
          border: "1px solid #ddd",
          position: "relative",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <p>This is a note</p>
        {hovered && (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton>
              <PushPinIcon />
            </IconButton>
            <IconButton>
              <AddAlertIcon />
            </IconButton>
            <IconButton>
              <PaletteIcon />
            </IconButton>
            <IconButton>
              <ArchiveIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        )}
      </Card>
    </div>
  );
};

export default NotesContainer;
