import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Axios from "axios";

function Main(props) {
    const [notes, setNotes] = useState([]);
    const [login, setLogin] = useState(false);
    Axios.defaults.withCredentials = true;
    Axios.defaults.headers = {
        'X-Requested-With': 'XMLHttpRequest',
    };
    Axios.defaults.credentials = 'include';

    useEffect(() => {
        Axios.get(`http://localhost:4000/api/get/${props.user}`).then((response) => {
            setNotes(response.data)
        }, [props.user])
    })
    function addNote(newNote) {
        newNote.content.length !== 0 &&
            setNotes(prevNotes => {
                return [...prevNotes, newNote];
            });
    }

    function deleteNote(title, timeString) {
        setNotes(prevNotes => {
            return prevNotes.filter((noteItem, index) => {
                return noteItem.timeString !== timeString;
            });
        });
        Axios.delete(`http://localhost:4000/api/delete/${title}/${props.user}/${timeString}`).then(() => { });
    }
    
    

    return (
        <div>
            <Header user={props.user} />
            <CreateArea user={props.user} onAdd={addNote} />

            {(notes.length !== 0) ? notes.map((noteItem, index) => {
                return (
                    <Note
                        key={index}
                        id={index}
                        timeString={noteItem.timeString}
                        time={noteItem.time}
                        title={noteItem.title}
                        content={noteItem.content}
                        onDelete={deleteNote}
                    />
                );
            }) :
                <Footer />
            }

        </div>
    )
}

export default Main;