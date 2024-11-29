import React, { useEffect, useState } from 'react';
import NoteCard from '../noteCard/NoteCard';
import { getAllNotesApiCall } from '../../utils/Api';
import './ArchiveNote.scss';

export default function ArchiveContainer() {
  const [notesList, setNotesList] = useState([]);

  useEffect(() => {
    fetchArchivedNotes();
  }, []);

  // Function to fetch archived notes
  const fetchArchivedNotes = () => {
    getAllNotesApiCall('note')
      .then((result) => {
        const { data } = result;
        const archiveNotes = data.data?.filter((item) => (item.isArchive === true));
        setNotesList(archiveNotes);
        console.log('Archive:', archiveNotes);
      })
      .catch((error) => {
        console.error('Error fetching archived notes:', error);
      });
  };

  // Update the list based on the action
  const handleUpdateList = (updatedNote, action) => {
    setNotesList((prevNotesList) => {
      let updatedList;

      switch (action) {
        case 'unarchive':
        case 'trash':
          // Remove the note from the archive list
          updatedList = prevNotesList.filter((note) => note._id !== updatedNote._id);
          break;
        case 'colour':
        case 'update':
          // Update the note in the archive list
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
    <div className="archive-main-container-cnt">
      {notesList.length > 0 ? (
        notesList.map((item) => (
          <NoteCard
            key={item._id}
            noteDetails={item}
            container="archive"
            updateList={handleUpdateList}
          />
        ))
      ) : (
        <div className="no-archive-message">No archived notes available.</div>
      )}
    </div>
  );
}
