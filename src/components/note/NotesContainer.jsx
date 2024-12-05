import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import AddNotes from '../addNote/AddNote';
import NoteCard from '../noteCard/NoteCard';
import { getAllNotesApiCall } from '../../utils/Api';
import './NotesContainer.scss';

export default function NotesContainer() {
  const [notesList, setNotesList] = useState([]);
  const [error, setError] = useState(null);
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    getAllNotesApiCall('note')
      .then((result) => {
        const { data } = result;
      
        const filteredNotes = data.data.filter(
          (note) => !note.isArchive && !note.isTrash
        );
        setNotesList(filteredNotes);
      })
      .catch((error) => {
        console.error('Error fetching notes:', error);
        setError('Failed to load notes.');
      })
      .finally(()=>setLoading(false))
  }, []);
  

  const handleUpdateList = (updatedNote, action) => {
    setNotesList((prevNotesList) => {
      let updatedNotes = [...prevNotesList];
  
      switch (action) {
        case 'add':
                updatedNotes = [updatedNote,...notesList]
                break;
        case 'archive':
        case 'trash':
    
          updatedNotes = updatedNotes.filter((note) => note._id !== updatedNote._id);
          break;
  
        case 'unarchive':
        case 'restore':
        
          updatedNotes = updatedNotes.filter((note) => note._id !== updatedNote._id);
  
          
          updatedNotes = [updatedNote, ...updatedNotes];
          break;
  
        case 'colour':
        case 'update':
        
          updatedNotes = updatedNotes.map((note) =>
            note._id === updatedNote._id ? { ...note, ...updatedNote } : note
          );
          break;
  
        default:
          return prevNotesList;
      }
      console.log('Update list and action',updatedNotes,action);
      return updatedNotes;
      
    });
  
  };
  
  
  return (
    <div className="notes-main-container-cnt">
      <div className="notes-addnotes-container-cnt">
        <AddNotes updateList={handleUpdateList} />
      </div>

      <div className="notes-container-cnt">
        {loading ? (
          <div className="loading-container">
            <CircularProgress /> {/* Material UI Loader */}
          </div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : notesList.length > 0 ? (
          notesList.map((item) => (
            <NoteCard
              key={item._id}
              noteDetails={item}
              container="notes"
              updateList={handleUpdateList}
            />
          ))
        ) : (
          <div className="no-notes-message">
            <img
              src={`${process.env.PUBLIC_URL}/images/NoNotes.png`}
              alt="Logo"
              style={{ height: '140px', width: 'auto' }}
            />
            <p>No notes available.</p>
          </div>
        )}
      </div>
    </div>
  );
}
