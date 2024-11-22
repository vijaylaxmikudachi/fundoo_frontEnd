// import React from 'react'

// export default function NoteCard({noteDetails}) {
//   return (
//     <div>{noteDetails}</div>
//   )
// }
import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import PaletteIcon from "@mui/icons-material/Palette";
import ArchiveIcon from "@mui/icons-material/Archive";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const NoteCard = ({ noteDetails }) => {
  return (
    <Card sx={{ minWidth: 275, marginBottom: 2, boxShadow: 3 }}>
      <CardContent>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            {noteDetails.title || "Untitled"}
          </Typography>
          <IconButton aria-label="pin">
            <PushPinIcon />
          </IconButton>
        </div>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
          {noteDetails.description || "No description available"}
        </Typography>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton aria-label="alert">
            <AddAlertIcon />
          </IconButton>
          <IconButton aria-label="color">
            <PaletteIcon />
          </IconButton>
          <IconButton aria-label="archive">
            <ArchiveIcon />
          </IconButton>
          <IconButton aria-label="more">
            <MoreVertIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
