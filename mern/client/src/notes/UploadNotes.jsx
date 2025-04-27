import React from 'react'
import styles from '../styles/UploadNotes.module.css'
import LogoutButton from '../signup-login/LogoutButton';

function UploadNotes() {
  const [name, setName] = React.useState("");
  const [text, setText] = React.useState("");
  const uploadNotes = async (event) => {
    const token = localStorage.getItem('token');
    const content = {
      name: name,
      text: text
    };
    await fetch('https://echohaus-backend.onrender.com/api/v0/note', {
      method: 'POST',
      body: JSON.stringify(content),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        setName("");
        setText("");
      })
      .catch((error) => {
        throw(error);
      })
  }
  return (
    <div className={styles.uploadNotes}>
      <div className={styles.container}>
        <h1 className={styles.title}>Upload Notes</h1>
  
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name your notes"
          className={styles.nameInput}
        />
        
        <div className={styles.notebook}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste notes here"
            className={styles.textarea}
          />
        </div>

        <LogoutButton />
        <button onClick={uploadNotes} className={styles.submitButton}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default UploadNotes;