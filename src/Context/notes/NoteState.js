import React from "react";
import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) => {
  // const s1 = {
  //     "name":"Zaidkhan",
  //     "class":"5b"
  // }
  // const [state, setstate] = useState(s1);
  // const update = () =>
  // {
  //    setTimeout(() => {
  //        setstate({
  //            "name":"SaifKhan",
  //            "class":"10B"
  //        })
  //    }, 1000);
  // }
  const host = "http://localhost:5000";
  const noteInitial = [];
  const [notes, setnotes] = useState(noteInitial);
  //Fetch all note
  const fetchAllNote = async () => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });

    //Logic to add note
    const json = await response.json();
    setnotes(json);
  };
  //Add a note
  const addNote = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/addNotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token'),
      },
      body: JSON.stringify({title,description,tag}),
    });
    const note = await response.json();
    setnotes(notes.concat(note));
    
  };
  //Delete a note
  const deleteNote = async (id) => {
    //API call
    const response = await fetch(`${host}/api/notes/deleteNotes/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token'),
      },
      body: JSON.stringify({id}),
    });
    //logic to delete a note
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNotes);
  };
  //Update a note
  const updateNote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/updateNotes/${id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token'),
      },
      body: JSON.stringify({title,description,tag}),
    });
    const json = response.json();

    let newNotes = JSON.parse(JSON.stringify(notes));
    //Functio  to edit notes
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
       newNotes[index].title = title;
       newNotes[index].description = description;
       newNotes[index].tag = tag;
       break;
      }
    } 
    setnotes(newNotes);
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote ,fetchAllNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
