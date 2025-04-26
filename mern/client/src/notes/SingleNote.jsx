import React from 'react'
import styles from '../styles/SingleNote.module.css'

function SingleNote() {
  const [singleNote, setSingleNote] = React.useState(undefined);
  React.useEffect(() => {
    fetchSingleNote();
  }, []);
  const fetchSingleNote = async (event) => {
    const token = localStorage.getItem('token');
    const note_id = '680cf39acef054f0904ba33e';
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
            <div>
              <div>Name: {singleNote.name}</div>
              <div>Content: {singleNote.text}</div>
            </div>
            :
            <div>You don't have any notes</div>
          }
        </div>
        <button className={styles.readyButton}>
          I'm Ready!
        </button>
      </div>
    </div>
  )
}

export default SingleNote;