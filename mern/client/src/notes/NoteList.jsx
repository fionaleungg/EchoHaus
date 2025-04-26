import React from 'react'
import styles from '../styles/NoteList.module.css'

function NoteList() {
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
      <h1 className={styles.title}>Upload Notes</h1>
      <div className = {styles.notebook}>
        <div className = {styles.notes}>
          {notearray.map((note, index) => (
            <div key={index}>{note.name} {note.id}</div>
          ))}
        </div>
      </div>
    </div>
  )
  
}

export default NoteList;