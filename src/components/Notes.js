import React, { useContext, useEffect, useRef ,useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import noteContext from "../Context/notes/NoteContext";
import AddNotes from "./AddNotes";
import Noteitem from "./Noteitem";
const Notes = (props) => {
 
  const context = useContext(noteContext);
  const { notes, fetchAllNote , updateNote } = context;
  let history = useHistory();
    useEffect(() => {
    if(localStorage.getItem('token'))
    {
      fetchAllNote();
    }
    else
    {
      history.push("/login");
    }
    
  }, []);
  const [note, setnote] = useState({id:"",etitle:"",edescription:"",etag:""})
  const ref = useRef(null);
  const updateNotes = (currentnote) => {
    ref.current.click();
    setnote({id:currentnote._id,etitle:currentnote.title , edescription:currentnote.description , etag:currentnote.tag });
  };
  const refClose = useRef(null);
  const onChange = (e) => {
    setnote({...note,[e.target.name]: e.target.value}) 
  };
  const handleClick = (e) => {
    refClose.current.click();
    e.preventDefault();
    updateNote(note.id,note.etitle,note.edescription,note.etag);
    props.showAlert("Note Updated Successfully","success");
  };
  return (
    <>
      <AddNotes showAlert={props.showAlert}/>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Edit note
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form className="my-3 mx-3">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label" >
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  required
                  minLength={5}
                  id="etitle"
                  name="etitle"
                  value={note.etitle}
                  aria-describedby="emailHelp"
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label" >
                  Description
                </label>
                <input
                  type="text"
                  value={note.edescription}
                  className="form-control"
                  required
                  minLength={5}
                  id="edescription"
                  name="edescription"
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label" >
                  Tag
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etag"
                  value={note.etag}
                  required
                  minLength={5}
                  name="etag"
                  onChange={onChange}
                />
              </div>

            </form>
            <div className="modal-footer">
              <button
                type="button"
                ref={refClose}
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" onClick={handleClick} className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <h3>Your notes</h3>
        <div className="container mx-2">
        {notes.length===0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} note={note} updateNotes={updateNotes} showAlert={props.showAlert}/>
          );
        })}
      </div>
    </>
  );
};

export default Notes;
