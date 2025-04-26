import React from 'react'
import styles from '../styles/NoteList.module.css'
import {useNavigate} from 'react-router-dom';

function NoteList() {
  const navigate = useNavigate();
  const [notearray, setNoteArray] = React.useState([]);
  React.useEffect(() => {
    fetchNotes();
  }, []);
  const fetchNotes = async (event) => {
    const token = localStorage.getItem('token');
    await fetch('http://localhost:5050/api/v0/note', {
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

  return (
    <div className = {styles.noteList}>
      <h1 className={styles.title}>My Notes</h1>
      <div className = {styles.notebook}>
        <div className = {styles.notes}>
          {notearray.map((note, index) => (
            <div key={index} onClick={() => navigate("/study")}>{note.name} {note.id}</div>
          ))}
        </div>
      </div>
      <button className = {styles.addButton} onClick={() => navigate("/uploadnotes")}>
      <i class="fa-solid fa-plus"></i>
      </button>
    </div>
  )
  
}

export default NoteList;