import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import NoteCard from '../noteCard/NoteCard';
import { getAllNotesApiCall } from '../../utils/Api';

export default function ArchiveContainer() {
  const [notesList, setNotesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 

  useEffect(() => {
    fetchArchivedNotes();
  }, []);

  const fetchArchivedNotes = () => {
    setLoading(true);
    getAllNotesApiCall('note')
      .then((result) => {
        const { data } = result;
        const archiveNotes = data.data?.filter((item) => (item.isArchive === true));
        setNotesList(archiveNotes);
        console.log('Archive:', archiveNotes);
      })
      .catch((error) => {
        console.error('Error fetching archived notes:', error);
        setError(error)
      })
      .finally(() => setLoading(false));
  };


  const handleUpdateList = (updatedNote, action) => {
    setNotesList((prevNotesList) => {
      let updatedList;

      switch (action) {
        case 'unarchive':
        case 'trash':
          updatedList = prevNotesList.filter((note) => note._id !== updatedNote._id);
          break;
        case 'colour':
        case 'update':
          updatedList = prevNotesList.map((note) =>
            note._id === updatedNote._id ? { ...note, ...updatedNote } : note
          );
          break;
        default:
          updatedList = prevNotesList;
          break;
      }

      console.log('Updated Notes List:', updatedList);
      return updatedList;
    });
  };

  return (
       
    <div className="notes-main-container-cnt">
    <div className="notes-addnotes-container-cnt">
      <h2>Archive Container</h2>
    </div>

    <div className="notes-container-cnt">
      {error ? (
        <div className="error-message">{error}</div>
      ) : notesList.length > 0 ? (
        notesList.map((item) => (
          <NoteCard
          key={item._id} 
          noteDetails={item}
          container="archive"
          updateList={handleUpdateList}
          />
        ))
      ) : (
        <div className="no-notes-message"><img src={`${process.env.PUBLIC_URL}/images/NoNotes.png`} alt="Logo" style={{ height: "140px", width: "auto" }}/>
      <p>No notes available.</p></div>
      )}
    </div>
  </div>
    );
}
