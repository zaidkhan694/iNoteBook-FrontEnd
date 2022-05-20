import React, { useContext} from 'react'
import noteContext from "../Context/notes/NoteContext";
const Noteitem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context;
  const { note , updateNotes } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="fa-solid fa-trash mx-2"onClick={()=>
          {
            deleteNote(note._id);
            
          }
          }></i>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>
          {
          updateNotes(note);
          }}></i>
        </div>
      </div>
    </div>
  );
};
export default Noteitem;
