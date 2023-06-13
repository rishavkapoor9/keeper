import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

function Note(props) {
  function handleClick() {
    props.onDelete(props.title,props.timeString);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p className="note-para">{props.content}</p>
      <p className="note-time">{props.time}</p>
      <button onClick={handleClick}><DeleteIcon /></button>
    </div>
  );
}

export default Note;
