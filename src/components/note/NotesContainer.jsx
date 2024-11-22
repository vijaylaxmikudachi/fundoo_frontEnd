// import React, { useEffect, useState } from "react";
// import "./NotesContainer.scss";
// import NoteCard from "../noteCard/NoteCard";
// import { getNotes } from "../../utils/Api";

// const NotesContainer = () => {
//   const [notesList, setNotesList] = useState([]);

//   useEffect(() => {
//     const fetchNotes = async () => {
//       try {
//         const notes = await getNotes();
//         console.log("Fetched Notes:", notes); // Debugging log
//         setNotesList(notes);
//       } catch (err) {
//         console.error("Error fetching notes:", err);
//       }
//     };

//     fetchNotes();
//   }, []);

//   return (
//     <div className="notes-container">
//       {notesList.length > 0 ? (
//         notesList.map((note) => (
//           <NoteCard key={note.id} noteDetails={note} />
//         ))
//       ) : ( 

//         <p>No notes available.</p>
//       )}
//     </div>
//   );
// };

// export default NotesContainer;


import React, { useEffect, useState } from "react";
import "./NotesContainer.scss";
import NoteCard from "../noteCard/NoteCard";
import { getNotes } from "../../utils/Api";

const NotesContainer = () => {
  const [notesList, setNotesList] = useState([]);
  const [loading, setLoading] = useState(true); // Optional: To show a loading indicator

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notes = await getNotes();
        console.log(notes.data);
        setNotesList(notes.data); // Update state with fetched notes
      } catch (err) {
        console.error("Error fetching notes:", err);
      } finally {
        setLoading(false); // Stop the loading indicator
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="notes-container">
      {loading ? (
        <p>Loading notes...</p>
      ) : notesList.length > 0 ? (
        notesList.map((note) => (
          <NoteCard key={note._id} noteDetails={note} />
        ))
      ) : (
        <>        <img src={`${process.env.PUBLIC_URL}/images/NoNotes.png`} alt="Logo" style={{ height: "140px", width: "auto" }}/>
        <p>No notes available.</p>
        </>
      )}
    </div>
  );
};

export default NotesContainer;
