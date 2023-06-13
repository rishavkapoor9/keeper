import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';
import Axios from "axios";


function CreateArea(props) {
  const [note, setNote] = useState({
    timeString: "",
    time: "",
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }
  const time = new Date().toLocaleString("en-GB",{month: "short", day: "numeric",hour: "2-digit",minute: "2-digit"});
  const timeString = new Date().toString();

  function submitNote(event) {
    note.content.length!==0 &&
    Axios.post("http://localhost:4000/api/insert",{note: {...note,timeString: timeString, time: time}, user: props.user}).then(()=>{});
    note.content.length!==0 &&
    setNote({
      title: "",
      content: ""
    });
    note.content.length!==0 &&
    props.onAdd(note);
    event.preventDefault();
  }

  const [expanded, setExpanded] = useState(false);
  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {expanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={expanded ? "3" : "1"}
          onClick={expand}
        />
        {
        <Zoom in={expanded}><button onClick={submitNote}><AddIcon /></button></Zoom>
        }
      </form>
    </div>
  );
}

export default CreateArea;
