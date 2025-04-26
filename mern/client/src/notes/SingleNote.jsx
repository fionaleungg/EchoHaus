import React from 'react'
import styles from '../styles/SingleNote.module.css'
import {useNavigate} from 'react-router-dom';
import NoteContext from './NoteContext';
import LogoutButton from '../signup-login/LogoutButton';

function SingleNote() {
  const ntx = React.useContext(NoteContext);
  const navigate = useNavigate();
  const [singleNote, setSingleNote] = React.useState(undefined);
  React.useEffect(() => {
    if (ntx.currentNote) {
      fetchSingleNote();
    }
  }, [ntx.currentNote]);
  const fetchSingleNote = async (event) => {
    const token = localStorage.getItem('token');
    const note_id = ntx.currentNote.id;
    await fetch(`http://localhost:5050/api/v0/note/${note_id}`, {
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
        setSingleNote(json);
      })
      .catch((error) => {
        throw(error);
      })
  }
  return (
    <div className = {styles.singleNote}>
      <div className = {styles.container}>
        <h2 className={styles.phase}>Phase 1</h2>
        <h1 className={styles.title}>Study</h1>
        <div className={styles.notebook}>
          {singleNote != undefined ? 
            <div className={styles.textcontainer}>
              <div className={styles.text}>{singleNote.text}</div>
            </div>
            :
            <div>You don't have any notes</div>
          }
        </div>
        <LogoutButton />
        <button className={styles.readyButton} onClick={() => navigate("/intermission")}>
          I'm Ready!
        </button>
      </div>
    </div>
  )
}

export default SingleNote;