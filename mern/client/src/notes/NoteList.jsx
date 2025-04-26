import React from 'react'

function NoteList() {
  const [notearray, setNoteArray] = React.useState([]);
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
  
}

export default NoteList;