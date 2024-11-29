import React, { useState } from 'react';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import './AddNote.scss';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import Menu from '@mui/material/Menu';
import { craeteNoteApiCall, updateNotesApiCall,archiveApiCall ,getAllNotesApiCall} from '../../utils/Api';
import { Tooltip } from '@mui/material';

export default function AddNotes(props) {
  const { container, handleModal, updateList, noteDetails } = props;

  const [color, setColour] = useState(noteDetails ? noteDetails.color : '#ffffff');
  const [conditional, setConditional] = useState(false);  
  const [anchorEl, setAnchorEl] = useState(null);  
  const open = Boolean(anchorEl);  
  const [title, setTitle] = useState(noteDetails ? noteDetails.title : '');
  const [description, setDescription] = useState(noteDetails ? noteDetails.description : '');

  
  const handleConditional = () => {
    setConditional(!conditional);
  };

  
  const handleSubmit = async () => {
    if (!title.trim()) {
      return alert('Title is required!');
    }
    if (!description.trim()) {
      return alert('Description is required!');
    }

    try {
      if (noteDetails) {
        handleModal();
        const result = await updateNotesApiCall(`note/${noteDetails._id}`, {
          title,
          description,
          color,
        });
        const updatedNote = { ...noteDetails, title, description, color };
        updateList(updatedNote, 'update');
        console.log('Note updated:', result);
      } else {
        handleConditional();  
        const result = await craeteNoteApiCall({ title, description, color }, `note`);
        const newNote = result.data.data;
        setTitle('');
        setDescription('');
        updateList(newNote, 'add');
        console.log('Note created:', newNote);
      }
    } catch (error) {
      console.error('Error submitting note:', error);
    }
  };
  const archiveNote = async () => {
    if (!noteDetails) {
      return alert('No note to archive!');
    }
  
    try {
      const archiveResult = await archiveApiCall(`/note/${noteDetails._id}/archive`);
      if (archiveResult.data.success) {
        console.log('Note archived successfully:', archiveResult);
        updateList(noteDetails, 'archive');  
      } else {
        alert('Failed to archive the note.');
      }
    } catch (error) {
      console.error('Error archiving note:', error);
      alert('An error occurred while archiving the note.');
    }
  };
  

  
  const colourChange = (selectedColour) => {
    setColour(selectedColour);
    setAnchorEl(null);  
  };

  
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="addNotes-container-main-cnt">
    
      {!conditional && container !== 'notecard' ? (
        <div className="addNotes-container-cnt">
          <div className="addNotes-container-dash-cnt" onClick={handleConditional}>
            <input
              type="text"
              className="addNotes-container-input-cnt"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Take a note ..."
            />
            <div className="addNotes-dash-icon-cnt">
              <CheckBoxOutlinedIcon className="dash-icon-cnt" />
              <BrushOutlinedIcon className="dash-icon-cnt" />
              <PhotoOutlinedIcon className="dash-icon-cnt" />
            </div>
          </div>
        </div>
      ) : (
        <div className="noteUI-wrapper-cnt" style={{ backgroundColor: color }}>
          <div className="noteInput-inputCnt-cnt">
            <input
              type="text"
              value={title}
              className="noteInput-titleInput-cnt"
              style={{ backgroundColor: color }}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <textarea
              value={description}
              className="noteInput-titleInput-cnt"
              style={{ backgroundColor: color }}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Take a note ..."
            />
          </div>
          <div className="dashbd-icon-ct">
            <div className="noteUI-iconsactions-cnt">
              <Tooltip title="notifications">
                <NotificationsNoneOutlinedIcon className="dashbd-iconAt-cnt" />
              </Tooltip>
              <Tooltip title="collaborator">
                <PersonAddOutlinedIcon className="dashbd-iconAt-cnt" />
              </Tooltip>
              <Tooltip title="background options">
                <ColorLensOutlinedIcon
                  className="dashbd-iconAt-cnt"
                  onClick={handleMenuClick} 
                />
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}  
                className="addNote-colour-menu"
              >
                <div className="color-palate-cnt">
                  {[
                    '#FFFFFF', '#FAAFA8', '#F39F76', '#FFF8B8', '#E2F6D3', '#B4DDD3',
                    '#D4E4ED', '#AECCDC', '#D3BFDB', '#F6E2DD', '#E9E3D4', '#EFEFF1'
                  ].map((color) => (
                    <div
                      key={color}
                      className="color-swatch"
                      style={{ backgroundColor: color }}
                      onClick={() => colourChange(color)} 
                    />
                  ))}
                </div>
              </Menu>
              <Tooltip title="add image">
                <PhotoOutlinedIcon className="dashbd-iconAt-cnt" />
              </Tooltip>
              <Tooltip title="archive">
                <ArchiveOutlinedIcon className="dashbd-iconAt-cnt" onClick={archiveNote} />
              </Tooltip>
              <Tooltip title="options">
                <MoreVertOutlinedIcon className="dashbd-iconAt-cnt" />
              </Tooltip>
            </div>
            <button className="noteInput-closeBtn-cnt" onClick={handleSubmit}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
