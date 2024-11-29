import React, { useEffect, useState } from 'react'
import NoteCard from '../noteCard/NoteCard'
import { getAllNotesApiCall } from '../../utils/Api'
import './TrashNote.scss'

function TrashContainer() {
    const [notesList, setNotesList] = useState([]);

    useEffect(() => {
        getAllNotesApiCall(`note`)
        .then((result)=>{
            const {data} = result;
            const trashedNotes = data.data?.filter((note)=> note.isTrash);
            setNotesList(trashedNotes);
            console.log('trashed:',trashedNotes);
        })
        .catch((error)=>{
          console.log(error)
        })
    }, [])

    const handleUpdateList = (data, action) => {
      if (action === "untrash" || action === "delete") {
        setNotesList((prevNotesList) => prevNotesList.filter((note) => note._id !== data._id));
      }
    };
    
      return (
        <div className="trash-main-container-cnt">
          {notesList.length > 0 ? (
            notesList.map((item) => (
              <NoteCard
                key={item._id} 
                noteDetails={item}
                container="trash"
                updateList={handleUpdateList}
              />
            ))
          ) : (
            <div className="empty-trash-message">Trash is empty. No notes here!</div>
          )}
        </div>
      );
    }

export default TrashContainer