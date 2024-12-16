import React, { useEffect, useState } from 'react'
import NoteCard from '../noteCard/NoteCard'
import { getAllNotesApiCall } from '../../utils/Api'
function TrashContainer() {
    const [notesList, setNotesList] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        getAllNotesApiCall(`note`)
        .then((result)=>{
            const {data} = result;
            const trashedNotes = data.data?.filter((note)=> note.isTrash);
            setNotesList(trashedNotes);
            console.log('trashed:',trashedNotes);
        })
        .catch((error) => {
          console.error('Error fetching notes:', error);
          setError('Failed to load notes.');
        })
    }, [])

    
    const handleUpdateList = (updatedNote, action) => {
      if (action === "delete") {
         setNotesList((prevNotesList) =>
          prevNotesList.filter((note) => note._id !== updatedNote._id)
        );
      }
      if (action === "restore") {
        setNotesList((prevNotesList) =>
          prevNotesList.filter((note) => note._id !== updatedNote._id)
        );
      }
    };
    
      return (
       
      <div className="notes-main-container-cnt">
      <div className="notes-addnotes-container-cnt">
        <h2>Trash Container</h2>
      </div>

      <div className="notes-container-cnt">
        {error ? (
          <div className="error-message">{error}</div>
        ) : notesList.length > 0 ? (
          notesList.map((item) => (
            <NoteCard
            key={item._id} 
            noteDetails={item}
            container="trash"
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

export default TrashContainer