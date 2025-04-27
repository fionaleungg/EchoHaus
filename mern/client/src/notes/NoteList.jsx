import React from 'react'
import styles from '../styles/NoteList.module.css'
import {useNavigate} from 'react-router-dom';
import NoteContext from './NoteContext';
import LogoutButton from '../signup-login/LogoutButton';

function NoteList() {
  const ntx = React.useContext(NoteContext);
  const navigate = useNavigate();
  const [notearray, setNoteArray] = React.useState([]);
  React.useEffect(() => {
    fetchNotes();
  }, []);
  const fetchNotes = async (event) => {
    const token = localStorage.getItem('token');
    await fetch('https://echohaus-backend.onrender.com/api/v0/note', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((json) => {
        setNoteArray(json);
      })
      .catch((error) => {
        throw(error);
      })
  }
  const chooseNote = (note_id, note_name) => {
    navigate("/study");
    ntx.setCurrentNote({name: note_name, id: note_id})
  }

  return (
    <div className = {styles.noteList}>
      <h1 className={styles.title}>My Notes</h1>
      <div className = {styles.notebook}>
        <div className = {styles.notes}>
          {notearray.map((note, index) => (
            <div key={index} className={styles.note} onClick={() => chooseNote(note.id, note.name)}>
              {note.name}
            </div>
          ))}
        </div>
      </div>
      <LogoutButton />
      <button className = {styles.addButton} onClick={() => navigate("/uploadnotes")}>
      <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  )
  
}

export default NoteList;