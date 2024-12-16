import React, { useState } from 'react';
import './NoteCard.scss';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined'; 
import EditIcon from '@mui/icons-material/Edit'; 
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import UnarchiveTwoToneIcon from '@mui/icons-material/UnarchiveTwoTone';
import { Menu, MenuItem, Tooltip } from '@mui/material';
import { archiveApiCall, colourApiCall, deleteApiCall, trashApiCall } from '../../utils/Api';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import RestoreFromTrashTwoToneIcon from '@mui/icons-material/RestoreFromTrashTwoTone';
import Modal from '@mui/material/Modal';
import AddNotes from '../addNote/AddNote';

function NoteCard(props) {
  const { noteDetails, container, updateList } = props;
  console.log(noteDetails.color);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const open1 = Boolean(anchorEl);
  const open2 = Boolean(anchorE2);
  const [openModal, setOpenModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState(noteDetails.color || "#FFFFFF");

  const handleModalClose = () => setOpenModal(false);
  const handleModalOpen = () => setOpenModal(true);

  const handleColorChange = async (color) => {
    setAnchorEl(null); 
    setSelectedColor(color); 
    try {
      const response = await colourApiCall(`note/${noteDetails._id}`, {title:noteDetails.title,description:noteDetails.description, color });
      if (response && response.data) {
        const updatedNote = response.data.data;
        updateList(updatedNote, 'colour');
        setSelectedColor(color); 
      }
    } catch (error) {
      console.error("Error updating color:", error);
    }
  };

  const handleNoteIconsClick = async (action, selectedColour = "#ffffff") => {
    try {
      let response;
  
      if (action === 'trash') {
        response = await trashApiCall(`note/${noteDetails._id}/trash`);
      } else if (action === 'delete') {
        response = await deleteApiCall(`note/${noteDetails._id}`);
      } else if (action === 'restore') {
        response = await trashApiCall(`note/${noteDetails._id}/trash`, { isTrash: false });
        console.log(response.data)
      } else if (action === 'archive' || action === 'unarchive') {
        response = await archiveApiCall(`note/${noteDetails._id}/archive`);
        console.log('archive',response.data);
      } else if (action === 'colour') {
        response = await colourApiCall(`note/${noteDetails._id}`, { colour: selectedColour });
      }
  
      if (response && response.data) {
        const updatedNote = response.data.data;
        updateList(updatedNote, action);
        if(action === 'colour'){
          noteDetails.color = selectedColour;
        }
        updateList(updatedNote, action); 
        console.log("Updating list after restore:", updatedNote, action);

      }
    } catch (error) {
      console.error(`Error performing ${action} action:`, error);
    }
  };

  const renderActions = () => {
    if (container === 'trash') {
      return (
        <>
          <Tooltip title="Delete Forever">
            <DeleteForeverTwoToneIcon className='dashbd-iconAt-cnt' onClick={() => handleNoteIconsClick('delete')} />
          </Tooltip>
          <Tooltip title="Restore">
            <RestoreFromTrashTwoToneIcon className='dashbd-iconAt-cnt' onClick={() => handleNoteIconsClick('restore')} />
          </Tooltip>
        </>
      );
    } else {
      return (
        <>
          <Tooltip title="notification">
            <NotificationsNoneOutlinedIcon className='dashbd-iconAt-cnt' />
          </Tooltip>
          <Tooltip title="Edit">
            <EditIcon className='dashbd-iconAt-cnt' onClick={handleModalOpen} /> 
          </Tooltip>
          <Tooltip title="Background Option">
            <ColorLensOutlinedIcon className='dashbd-iconAt-cnt' onClick={(event) => setAnchorE2(event.currentTarget)} />
          </Tooltip>
          {container === 'notes' ? (
            <Tooltip title="Archive">
              <ArchiveOutlinedIcon className='dashbd-iconAt-cnt' onClick={() => handleNoteIconsClick('archive')} />
            </Tooltip>
          ) : (
            <Tooltip title="Unarchive">
              <UnarchiveTwoToneIcon onClick={() => handleNoteIconsClick('unarchive')} className='dashbd-iconAt-cnt' />
            </Tooltip>
          )}
          <Tooltip title="options">
            <MoreVertOutlinedIcon className='dashbd-iconAt-cnt' onClick={(event) => setAnchorEl(event.currentTarget)} />
          </Tooltip>
        </>
      );
    }
  };

  return (
    <div className='notecard-container-cnt' style={{ backgroundColor: selectedColor }}>
      <div className='notecard-container-title-cnt'>
        <span onClick={handleModalOpen}>{noteDetails.title}</span>
      </div>
      <div className='notecard-container-des-cnt'>
        <span onClick={handleModalOpen}>{noteDetails.description}</span>
      </div>

      <div className='notecard-container-icon-cnt'>
        {renderActions()}

        <Menu
          anchorEl={anchorEl}
          open={open1}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={() => handleNoteIconsClick('trash')}>Move to Trash</MenuItem>
        </Menu>
      </div>

      <Menu
        anchorEl={anchorE2}
        open={open2}
        onClose={() => setAnchorE2(null)}
        className="notecard-colour-menu"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <div className="color-palate-cnt">
          {["#FFFFFF", "#FAAFA8", "#F39F76", "#FFF8B8", "#E2F6D3", "#B4DDD3", "#D4E4ED", "#AECCDC"].map((color) => (
            <div
              key={color}
              className="color-box"
              style={{
                backgroundColor: color,
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                margin: "5px",
                border: "1px solid #ccc",
                cursor: "pointer",
              }}
              onClick={() => handleColorChange(color)}
            />
          ))}
        </div>
      </Menu>

      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="notecard-modal-container"
      >
        <AddNotes
          className="notecard-modal"
          noteDetails={noteDetails}
          container="notecard"
          handleModal={handleModalClose}
          updateList={updateList}
        />
      </Modal>
    </div>
  );
}

export default NoteCard;
